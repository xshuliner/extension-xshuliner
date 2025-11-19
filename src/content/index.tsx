console.log('Content load...');

// 监听来自 devtools 的消息
import browser from 'webextension-polyfill';

interface DevToolsMessage {
  type: string;
  command?: string;
}

browser.runtime.onMessage.addListener(
  (message: unknown, _sender, sendResponse) => {
    const devToolsMessage = message as DevToolsMessage;
    if (devToolsMessage.type === 'devtools-command') {
      if (devToolsMessage.command === 'ping') {
        sendResponse({
          success: true,
          message: 'Pong from content script!',
          timestamp: Date.now(),
        });
        // return true; // 保持消息通道开放以支持异步响应
      }
    }
    // return undefined;
    return true;
  }
);
