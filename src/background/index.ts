import BackgroundEventManager from '@/src/common/kits/BackgroundEventManager';
import type { IMessageType } from '@/src/common/types';
import browser from 'webextension-polyfill';

browser.runtime.onInstalled.addListener((): void => {
  // 默认先禁止Page Action。如果不加这一句，则无法生效下面的规则
  if (browser.action && browser.action.disable) {
    browser.action.disable();
  }

  // Chrome 特有的 sidePanel API
  if ((browser as any).sidePanel?.setPanelBehavior) {
    (browser as any).sidePanel.setPanelBehavior({
      openPanelOnActionClick: true,
    });
  }

  // if (browser.runtime.openOptionsPage) {
  //   // Chrome 42+ 支持
  //   browser.runtime.openOptionsPage();
  // } else {
  //   // 较旧版本的回退方案
  //   window.open(browser.runtime.getURL('options.html'));
  // }

  let num: number = 80;

  setInterval(() => {
    num++;
    browser.action.setBadgeText({ text: num > 99 ? '99+' : num.toString() });
    browser.action.setBadgeBackgroundColor({ color: '#FF0000' });
    browser.action.setBadgeTextColor({ color: '#FFFFFF' });
  }, 1000);
});

browser.runtime.onMessage.addListener(
  (
    request: unknown,
    sender: browser.Runtime.MessageSender,
    sendResponse: (_response: unknown) => void
  ) => {
    BackgroundEventManager.onMessage(
      request as IMessageType,
      sender,
      sendResponse
    );
    return true; // Indicates we will send a response asynchronously
  }
);

browser.tabs.onUpdated.addListener(BackgroundEventManager.onTabsUpdated);

browser.tabs.onActivated.addListener(BackgroundEventManager.onTabsActivated);

browser.tabs.onRemoved.addListener(BackgroundEventManager.onTabsRemoved);

// browser.contextMenus.onClicked.addListener(
//   BackgroundEventManager.onContextMenusClick
// );

// // browser.commands.onCommand.addListener(
// //   BackgroundEventManager.onCommandsCommand
// // );

// // // 拦截 web request 场景
// // browser.webRequest.onBeforeRequest.addListener(
// //   BackgroundEventManager.onWebRequestBeforeRequest,
// //   { urls: ['<all_urls>'] },
// //   ['blocking']
// // );

// browser.webRequest.onCompleted.addListener(
//   BackgroundEventManager.onWebRequestCompleted,
//   { urls: ['<all_urls>'] }
// );

browser.runtime.onConnect.addListener((port: browser.Runtime.Port) => {
  // 监听连接断开
  port.onDisconnect.addListener(port => {
    // console.log("[xshuliner] Background port.onDisconnect", port);
    BackgroundEventManager.connectPortMap.delete(port.name);

    const lastError = browser.runtime.lastError;
    if (lastError) {
      console.log(
        '[xshuliner] Background port.onDisconnect lastError:',
        lastError.message
      );
    }
  });

  // 添加连接到连接列表
  BackgroundEventManager.connectPortMap.set(port.name, port);

  // 监听消息
  port.onMessage.addListener((message: unknown) => {
    try {
      BackgroundEventManager.onConnectCommon(message as IMessageType, port);
    } catch (error) {
      const lastError = browser.runtime.lastError;
      console.log(
        '[xshuliner] Background port.onMessage error:',
        error,
        lastError
      );
    }
  });
});
