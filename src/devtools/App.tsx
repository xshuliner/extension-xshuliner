import React, { useState, useEffect } from 'react';
import browser from 'webextension-polyfill';

export default function DevtoolsPanelApp() {
  const [inspectedTab, setInspectedTab] = useState<number | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // 获取当前被检查的标签页
    if (browser.devtools && browser.devtools.inspectedWindow && browser.devtools.inspectedWindow.tabId) {
      setInspectedTab(browser.devtools.inspectedWindow.tabId);
    }

    // 监听来自 content script 的消息
    const messageListener = (message: any, sender: browser.Runtime.MessageSender) => {
      if (message.type === 'devtools-message') {
        setMessages(prev => [...prev, message.data]);
      }
    };

    browser.runtime.onMessage.addListener(messageListener);

    return () => {
      browser.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const sendMessage = () => {
    if (browser.devtools && browser.devtools.inspectedWindow && browser.devtools.inspectedWindow.tabId) {
      browser.tabs.sendMessage(
        browser.devtools.inspectedWindow.tabId,
        { type: 'devtools-command', command: 'ping' }
      ).then((response) => {
        console.log('Response from content script:', response);
        setMessages(prev => [...prev, `Response: ${JSON.stringify(response)}`]);
      }).catch((error) => {
        console.error('Error sending message:', error);
        setMessages(prev => [...prev, `Error: ${error.message || 'Unknown error'}`]);
      });
    }
  };

  const evaluateCode = () => {
    if (browser.devtools && browser.devtools.inspectedWindow && browser.devtools.inspectedWindow.eval) {
      browser.devtools.inspectedWindow.eval('console.log("Hello from DevTools!");')
        .then((result) => {
          console.log('Evaluation result:', result);
          const [value, exceptionInfo] = result;
          if (exceptionInfo && exceptionInfo.isException) {
            setMessages(prev => [...prev, `Eval exception: ${exceptionInfo.value || exceptionInfo.description}`]);
          } else {
            setMessages(prev => [...prev, `Eval result: ${JSON.stringify(value)}`]);
          }
        })
        .catch((error) => {
          console.error('Evaluation error:', error);
          setMessages(prev => [...prev, `Eval error: ${error.message || 'Unknown error'}`]);
        });
    }
  };

  return (
    <div style={{ padding: 12 }}>
      <h3 style={{ margin: 0 }}>DevTools Panel</h3>
      <p style={{ marginTop: 8 }}>
        你好，这是 React DevTools 面板。2222
      </p>
      
      {inspectedTab && (
        <p style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
          被检查的标签页 ID: {inspectedTab}
        </p>
      )}

      <div style={{ marginTop: 16 }}>
        <button 
          onClick={sendMessage}
          style={{ 
            padding: '8px 16px', 
            marginRight: 8,
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4
          }}
        >
          发送消息到 Content Script22112
        </button>
        
        <button 
          onClick={evaluateCode}
          style={{ 
            padding: '8px 16px',
            cursor: 'pointer',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: 4
          }}
        >
          执行代码
        </button>
      </div>

      {messages.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h4 style={{ margin: '16px 0 8px 0' }}>消息日志:</h4>
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: 12, 
            borderRadius: 4,
            maxHeight: 300,
            overflowY: 'auto',
            fontSize: 12
          }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: 4 }}>
                {msg}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

