console.log('Content load...')

// 监听来自 devtools 的消息
import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'devtools-command') {
    if (message.command === 'ping') {
      sendResponse({ success: true, message: 'Pong from content script!', timestamp: Date.now() });
      return true; // 保持消息通道开放以支持异步响应
    }
  }
  return false;
});


