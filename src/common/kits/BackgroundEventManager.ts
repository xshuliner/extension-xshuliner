import BrowserManager from '@/src/common/kits/BrowserManager';
import CacheManager from '@/src/common/kits/CacheManager';
// import FetchManager from '@/src/common/kits/FetchManager';
import GlobalManager from '@/src/common/kits/GlobalManager';
import type { IMessageType } from '@/src/types';
import browser from 'webextension-polyfill';

/**
 * @description background事件管理器
 */
class BackgroundEventManager {
  static instance: BackgroundEventManager | null = null;

  connectPortMap: Map<string, browser.Runtime.Port> = new Map();

  static getInstance(): BackgroundEventManager {
    if (!this.instance) {
      this.instance = new BackgroundEventManager();
    }
    return this.instance;
  }

  // 接收广播消息
  onMessage = async (
    request: IMessageType,
    sender: browser.Runtime.MessageSender,
    sendResponse: (_response?: unknown) => void
  ) => {
    const { type } = request;
    // console.debug("BackgroundEventManager onMessage", request);

    switch (type) {
      case 'console': {
        const { msg } = request;
        // console.log("BackgroundEventManager console", msg);
        sendResponse(msg);
        return true;
      }
      case 'createTab': {
        const { createProperties, cbName } = request;
        BrowserManager.createTab(createProperties).then(tab => {
          if (cbName) {
            BrowserManager.executeScript(tab, request);
          }
          sendResponse(true);
        });
        return true;
      }
      case 'sendRequest': {
        // const { config } = request;
        // const res = await FetchManager.sendRequest(config);
        // sendResponse(res);
        return true;
      }
      case 'setSyncStorage': {
        const { cbParams } = request;
        const res = await CacheManager.setSyncStorage(
          cbParams as Record<
            string,
            string | number | boolean | Record<string, unknown>
          >
        );
        sendResponse(res);
        return true;
      }
      case 'getSyncStorage': {
        const { cbParams } = request;
        const res = await CacheManager.getSyncStorage(cbParams as string[]);
        sendResponse(res);
        return true;
      }
      default: {
        sendResponse(true);
        return true;
      }
    }
  };

  onTabsUpdated = async (
    tabId: number,
    changeInfo: browser.Tabs.OnUpdatedChangeInfoType,
    tab: browser.Tabs.Tab
  ) => {
    if (changeInfo?.status === 'complete') {
      if (!GlobalManager.g_activeTabInfo) {
        GlobalManager.g_activeTabInfo = {
          tabId: tab.id ?? 0,
          windowId: tab.windowId ?? 0,
        };
      }

      // 发送 tab 完成事件
      this.postConnectMessage({
        type: 'xshuliner-background-all-tab-complete',
        tabInfo: tab,
      });
    }
  };

  onTabsActivated = async (
    activeInfo: browser.Tabs.OnActivatedActiveInfoType
  ) => {
    const { tabId, windowId } = activeInfo || {};

    if (tabId) {
      GlobalManager.g_activeTabInfo = activeInfo;
      const resTabInfo = await BrowserManager.getTabInfo(tabId);
      const resWindowInfo = await BrowserManager.getWindowInfo(windowId);

      this.postConnectMessage({
        type: 'xshuliner-background-all-tab-activated',
        tabInfo: resTabInfo,
        windowInfo: resWindowInfo,
      });
    }
  };

  onTabsRemoved = (
    tabId: number,
    removeInfo: { windowId: number; isWindowClosing: boolean }
  ) => {
    // Tab Remove
  };

  onContextMenusClick = (menuInfo: any, tabInfo: browser.Tabs.Tab) => {
    const { menuItemId } = menuInfo || {};

    switch (menuItemId) {
      default: {
        break;
      }
    }
  };

  onCommandsCommand = (command: string) => {
    // console.log("User triggered command: " + command);

    switch (command) {
      default: {
        break;
      }
    }
    return true;
  };

  // onWebRequestBeforeRequest = (details: any) => {
  //   console.log('onWebRequestBeforeRequest detail:', details);
  // };

  onWebRequestCompleted = (details: any) => {
    // console.debug("请求 URL:", details.url);
    console.debug('onWebRequestCompleted detail:', details);
    // const { tabId, url } = details || {};
  };

  onConnectCommon = async (message: any, port: browser.Runtime.Port) => {
    const { type, ...otherInfo } = message || {};
    // console.log("onConnectCommon", type, otherInfo);
    switch (type) {
      case 'xshuliner-sidepanel-background-tab-query': {
        // const activeTabInfo = await BrowserManager.getActiveTabInfo();
        // this.postConnectMessage({
        //   type: `xshuliner-background-all-tab-query`,
        //   value: activeTabInfo,
        // });
        break;
      }
      default: {
        console.log(
          '[xshuliner] BackgroundEventManager onConnectCommon',
          type,
          otherInfo,
          port
        );
        break;
      }
    }

    return true;
  };

  // cleanDisconnectedPort(port: browser.runtime.Port): void {
  //   this.connectPortMap.delete(port.name);
  // }

  // postConnectMessageByName = (message: IMessageType, name: string) => {
  //   const port = this.connectPortMap.get(name);
  //   try {
  //     port?.postMessage(message);
  //   } catch (error) {
  //     console.debug('[Debug] Port disconnected, cleaning up:', port);
  //   }
  // };

  postConnectMessage = (message: IMessageType) => {
    const { type } = message || {};
    const [_, source, target] = type?.split('-') || [];

    for (const [name, port] of this.connectPortMap) {
      const clientName = name?.split('-')[1];
      if (target === clientName || target === 'all') {
        try {
          // console.log("[Debug] BackgroundEventManager postConnectMessage", client, message);
          port?.postMessage(message);
        } catch (error) {
          console.debug('[Debug] Port disconnected, cleaning up:', port);
        }
      }
    }
  };
}

export default BackgroundEventManager.getInstance();
