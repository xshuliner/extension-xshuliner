import browser from 'webextension-polyfill';

/**
 * @description 跨浏览器扩展操作管理器 (Chrome/Firefox/Safari/Edge/Opera)
 */
class BrowserManager {
  private static instance: BrowserManager | null = null;

  whiteListForAuth!: string[];

  static getInstance(): BrowserManager {
    if (!this.instance) {
      this.instance = new BrowserManager();
    }
    return this.instance;
  }

  private getInjectionResult = (
    tabInfo: browser.Tabs.Tab,
    result: any
  ): browser.Scripting.InjectionResult[] => {
    return [
      {
        // documentId: '0',
        frameId: 0,
        result,
      },
    ];
  };

  /**
   * 跨浏览器脚本执行兼容方法
   * Chrome: 使用 scripting API
   * Firefox: 使用 tabs.executeScript API
   */
  private executeScriptCompat = async (
    tabId: number,
    options: { func?(..._args: unknown[]): unknown; args?: any[] }
  ): Promise<browser.Scripting.InjectionResult[]> => {
    try {
      // 检查是否支持新的 scripting API (Chrome)
      if (browser.scripting && browser.scripting.executeScript) {
        const results = await browser.scripting.executeScript({
          target: { tabId },
          func: options.func,
          args: options.args || [],
        });
        return results.map(result => ({
          frameId: result.frameId || 0,
          result: result.result,
        }));
      } else {
        // 使用旧的 tabs.executeScript API (Firefox)
        const code = `(${options.func!.toString()})(${JSON.stringify(options.args?.[0] || {})});`;
        const results = await browser.tabs.executeScript(tabId, { code });
        return [
          {
            frameId: 0,
            result: results?.[0],
          },
        ];
      }
    } catch (error) {
      console.debug('[Debug] executeScriptCompat error:', error);
      throw error;
    }
  };

  // launchWebAuthFlow = async (): Promise<{
  //   code: string;
  //   redirectUri: string;
  //   codeVerifier: string;
  //   oauthState: string;
  // }> => {
  //   const { authorizationUrl, redirectUri, codeVerifier, oauthState } =
  //     await UserManager.buildAuthorizationUrl();

  //   console.log('launchWebAuthFlow 0', authorizationUrl);

  //   try {
  //     const responseUrl = await browser.identity.launchWebAuthFlow({
  //       url: authorizationUrl,
  //       interactive: true,
  //     });

  //     console.log('launchWebAuthFlow 1', authorizationUrl, responseUrl);

  //     const responseParams = UtilsManager.router2Params(responseUrl || '', {
  //       decode: false,
  //     });
  //     const { code = '' } = responseParams.params;

  //     return {
  //       code,
  //       redirectUri,
  //       codeVerifier,
  //       oauthState,
  //     };
  //   } catch (error) {
  //     console.debug('[Debug] BrowserManager launchWebAuthFlow error', error);
  //     return {
  //       code: '',
  //       redirectUri,
  //       codeVerifier,
  //       oauthState,
  //     };
  //   }
  // };

  // async removeCachedAuthToken(params: Record<string, any>): Promise<any> {
  //   const { token } = params || {};
  //   const res = await browser.identity.removeCachedAuthToken({ token });
  //   console.log("BrowserManager removeCachedAuthToken", res);
  //   return res;
  // }

  // openOptionsPage = async (): Promise<void> => {
  //   return browser.runtime.openOptionsPage();
  // };

  setSyncStorageCore = async (params: Record<string, any>): Promise<void> => {
    return await browser.storage.sync.set(params);
  };

  getSyncStorageCore = async (
    params?: string[]
  ): Promise<Record<string, any>> => {
    return await browser.storage.sync.get(params);
  };

  removeSyncStorageCore = async (params: string[]): Promise<void> => {
    return await browser.storage.sync.remove(params);
  };

  clearSyncStorageCore = async (): Promise<void> => {
    return await browser.storage.sync.clear();
  };

  // getSyncCookiesCore = async (params: {
  //   url: string;
  // }): Promise<{ cookies: browser.Cookies.Cookie[]; cookiesStr: string }> => {
  //   const { url } = params;
  //   let result: { cookies: browser.Cookies.Cookie[]; cookiesStr: string } = {
  //     cookies: [],
  //     cookiesStr: '',
  //   };

  //   if (url) {
  //     try {
  //       // const url = new URL(tabInfo.url);
  //       const cookies = await browser.cookies.getAll({
  //         url,
  //         // domain: url.hostname,
  //       });
  //       result = {
  //         cookies,
  //         cookiesStr: cookies
  //           .map(cookie => {
  //             const cookieParts = [`${cookie.name}=${cookie.value}`];

  //             // 添加过期时间
  //             // if (cookie.expirationDate) {
  //             //   const expires = new Date(cookie.expirationDate * 1000).toUTCString();
  //             //   cookieParts.push(`Expires=${expires}`);
  //             // }

  //             // 添加路径
  //             // if (cookie.path) {
  //             //   cookieParts.push(`Path=${cookie.path}`);
  //             // }

  //             // 添加域名
  //             // if (cookie.domain) {
  //             //   cookieParts.push(`Domain=${cookie.domain}`);
  //             // }

  //             // 添加安全标志
  //             // if (cookie.secure) {
  //             //   cookieParts.push("Secure");
  //             // }

  //             // 添加 HttpOnly 标志
  //             // if (cookie.httpOnly) {
  //             //   cookieParts.push("HttpOnly");
  //             // }

  //             return cookieParts.join('; ');
  //           })
  //           .join('; '), // 将cookies转换为axios可用的header cookies传参
  //       };
  //     } catch (error) {
  //       console.debug('[Debug] BrowserManager getSyncCookiesCore error', error);
  //     }
  //   }

  //   return result;
  // };

  sendMessageRuntime = async (params: any): Promise<any> => {
    return await browser.runtime.sendMessage(params);
  };

  queryTabs = async (
    queryInfo: browser.Tabs.QueryQueryInfoType
  ): Promise<browser.Tabs.Tab[]> => {
    return new Promise(resolve => {
      browser.tabs
        .query(queryInfo)
        .then((tabs: browser.Tabs.Tab[]) => {
          resolve(tabs);
        })
        .catch(error => {
          console.debug('[Debug] queryTabs Error', error.message);
          resolve([]);
        });
    });
  };

  getTabInfo = async (tabId: number): Promise<browser.Tabs.Tab | null> => {
    return new Promise(resolve => {
      browser.tabs
        .get(tabId)
        .then((tab: browser.Tabs.Tab) => {
          resolve(tab);
        })
        .catch(error => {
          console.debug('[Debug] getTabInfo Error', error);
          resolve(null);
        });
    });
  };

  getActiveTabInfo = async (): Promise<browser.Tabs.Tab | null> => {
    return new Promise(resolve => {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs: browser.Tabs.Tab[]) => {
          resolve(tabs[0]);
        })
        .catch(error => {
          console.debug('[Debug] getActiveTabInfo Error', error);
          resolve(null);
        });
    });
  };

  createTab = async (
    createProperties: browser.Tabs.CreateCreatePropertiesType
  ): Promise<browser.Tabs.Tab | null> => {
    return new Promise(resolve => {
      browser.tabs
        .create(createProperties)
        .then((tab: browser.Tabs.Tab) => {
          resolve(tab);
        })
        .catch(error => {
          console.debug('[Debug] createTab Error', error);
          resolve(null);
        });
    });
  };

  updateTab = async (
    tabId: number,
    updateProperties: browser.Tabs.UpdateUpdatePropertiesType
  ): Promise<browser.Tabs.Tab | null> => {
    return new Promise(resolve => {
      // console.log("updateTab", tabId, updateProperties);
      browser.tabs
        .update(tabId, updateProperties)
        .then((tab: browser.Tabs.Tab) => {
          resolve(tab);
        })
        .catch(error => {
          console.debug('[Debug] updateTab Error', error);
          resolve(null);
        });
    });
  };

  getWindowInfo = async (
    windowId: number
  ): Promise<browser.Windows.Window | null> => {
    return new Promise(resolve => {
      browser.windows
        .get(windowId)
        .then((window: browser.Windows.Window) => {
          resolve(window);
        })
        .catch(error => {
          console.debug('[Debug] getWindowInfo Error', error);
          resolve(null);
        });
    });
  };

  createWindow = async (
    createData: browser.Windows.CreateCreateDataType
  ): Promise<browser.Windows.Window | null> => {
    return new Promise(resolve => {
      browser.windows
        .create(createData)
        .then((window: browser.Windows.Window) => {
          resolve(window);
        })
        .catch(error => {
          console.debug('[Debug] createWindow Error', error);
          resolve(null);
        });
    });
  };

  updateWindow = async (
    windowId: number,
    updateInfo: browser.Windows.UpdateUpdateInfoType
  ): Promise<browser.Windows.Window | null> => {
    return new Promise(resolve => {
      browser.windows
        .update(windowId, updateInfo)
        .then((window: browser.Windows.Window) => {
          resolve(window);
        })
        .catch(error => {
          console.debug('[Debug] updateWindow Error', error);
          resolve(null);
        });
    });
  };

  executeScript = async (
    tab: browser.Tabs.Tab,
    params: Record<string, unknown>
  ): Promise<browser.Scripting.InjectionResult[] | null> => {
    if (!tab?.id || !tab?.url) {
      return new Promise(resolve => {
        resolve(this.getInjectionResult(tab, false));
      });
    }

    if (tab?.url?.startsWith('chrome://')) {
      console.debug('[Debug] Cannot execute script on chrome:// URL');
      return new Promise(resolve => {
        resolve(this.getInjectionResult(tab, false));
      });
    }

    return new Promise(resolve => {
      const { cbName = '', cbParams = {} } = params || {};
      switch (cbName) {
        case 'test': {
          this.executeScriptCompat(tab.id!, {
            func: cbParams => {
              console.log('handleExecuteScript test', cbParams);
              return true;
            },
            args: [cbParams],
          })
            .then(res => {
              resolve(res);
            })
            .catch(error => {
              console.debug(
                '[Debug] BrowserManager executeScript error:',
                error
              );
              resolve(this.getInjectionResult(tab, false));
            });
          break;
        }
        case 'console': {
          browser.scripting
            .executeScript({
              target: { tabId: tab.id! },
              func: (cbParams: any) => {
                const { consoleText } = cbParams || {};
                console.log(consoleText);
                return true;
              },
              args: [cbParams],
            })
            .then(res => {
              resolve(res);
            })
            .catch(error => {
              console.debug(
                '[Debug] BrowserManager executeScript error:',
                error
              );
              resolve(this.getInjectionResult(tab, false));
            });
          break;
        }
        case 'setLocalStorage': {
          browser.scripting
            .executeScript({
              target: { tabId: tab.id! },
              func: (cbParams: any) => {
                const { storageInfo, isNeedReload } = cbParams || {};
                storageInfo &&
                  storageInfo.map((item: any) => {
                    const { storageKey, storageValue } = item || {};
                    localStorage.setItem(storageKey, storageValue);
                  });
                if (isNeedReload) {
                  location.reload();
                }
                return true;
              },
              args: [cbParams],
            })
            .then(res => {
              resolve(res);
            })
            .catch(error => {
              console.debug(
                '[Debug] BrowserManager executeScript error:',
                error
              );
              resolve(this.getInjectionResult(tab, false));
            });
          break;
        }
        case 'getLocalStorage': {
          browser.scripting
            .executeScript({
              target: { tabId: tab.id! },
              func: (cbParams: any) => {
                const { storageKey } = cbParams || {};
                const result =
                  storageKey &&
                  storageKey.map((key: string) => {
                    return {
                      storageKey: key,
                      storageValue: localStorage.getItem(key),
                    };
                  });
                return result;
              },
              args: [cbParams],
            })
            .then(res => {
              console.log('handleExecuteScript getLocalStorage', res);
              resolve(res);
            })
            .catch(error => {
              console.debug(
                '[Debug] BrowserManager executeScript error:',
                error
              );
              resolve(this.getInjectionResult(tab, false));
            });
          break;
        }
        case 'querySelectors': {
          browser.scripting
            .executeScript({
              target: { tabId: tab.id! },
              func: (cbParams: any) => {
                const result: Record<string, unknown>[] = [];
                const { selectors = [] } = cbParams || {};

                selectors.forEach((itemSelector: any) => {
                  const { selector, attr = [] } = itemSelector || {};
                  const element: HTMLElement | null =
                    document.querySelector(selector);
                  if (element) {
                    const resultSelector: Record<string, unknown> = {};
                    attr.forEach(
                      (item: {
                        key: keyof HTMLElement;
                        defaultWindowKey: keyof Window;
                      }) => {
                        const { key } = item || {};
                        resultSelector[key] =
                          element[key as keyof HTMLElement] || '';
                      }
                    );
                    result.push(resultSelector);
                  } else {
                    result.push({});
                  }
                });

                return result;
              },
              args: [cbParams],
            })
            .then(res => {
              resolve(res);
            })
            .catch(error => {
              console.debug(
                '[Debug] BrowserManager executeScript error:',
                error
              );
              resolve(this.getInjectionResult(tab, false));
            });
          break;
        }
        case 'queryHtmlInfo': {
          browser.scripting
            .executeScript({
              target: { tabId: tab.id! },
              func: () => {
                return document.documentElement.outerHTML;
              },
            })
            .then(res => {
              resolve(res);
            })
            .catch(error => {
              console.debug(
                '[Debug] BrowserManager executeScript error:',
                error
              );
              resolve(this.getInjectionResult(tab, false));
            });
          break;
        }
        case 'actionDom': {
          browser.scripting
            .executeScript({
              target: { tabId: tab.id! },
              func: async (cbParams: any) => {
                const { action = {}, stopRuleList = [] } = cbParams || {};

                const element = document.querySelector(action.selector);

                if (!element) {
                  console.debug(
                    '[Debug] BrowserManager executeScript actionDom not found',
                    action,
                    element
                  );
                  return {
                    type: 'notFound',
                  };
                }

                element.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                }); // auto nearest‌

                for (
                  let indexStopRule = 0;
                  indexStopRule < stopRuleList.length;
                  indexStopRule++
                ) {
                  const itemStopRule = stopRuleList[indexStopRule];
                  const { type, method, key, value } = itemStopRule || {};
                  let isStop = false;

                  if (!element[key]) {
                    continue;
                  }

                  switch (method) {
                    case 'endsWith': {
                      isStop = new RegExp(value + '$').test(element[key]);
                      break;
                    }
                    default: {
                      isStop = element[key] === value;
                      break;
                    }
                  }

                  if (isStop) {
                    return {
                      type,
                    };
                  }
                }

                if (action.type === 'click') {
                  element.click();
                } else if (action.type === 'input') {
                  element.dispatchEvent(
                    new Event('focus', { bubbles: true, cancelable: true })
                  );

                  // 优先使用 setter 方法设置值，异常时兜底再用普通 value 赋值
                  try {
                    const tag =
                      (element.tagName && element.tagName.toLowerCase()) || '';
                    const proto =
                      // @ts-ignore
                      {
                        input: HTMLInputElement.prototype,
                        textarea: HTMLTextAreaElement.prototype,
                      }[tag] || null;

                    let isSet = false;
                    if (proto) {
                      const descriptor = Object.getOwnPropertyDescriptor(
                        proto,
                        'value'
                      );
                      if (descriptor && descriptor.set) {
                        descriptor.set.call(element, action.value);
                        isSet = true;
                      }
                    }
                    if (!isSet) {
                      element.value = action.value;
                    }
                  } catch (_) {
                    element.value = action.value;
                  }

                  [
                    'input',
                    'change',
                    'keypress',
                    'keydown',
                    'keyup',
                    'blur',
                    'pageshow',
                  ].forEach(eventType => {
                    element.dispatchEvent(
                      new Event(eventType, {
                        bubbles: true,
                        cancelable: true,
                      })
                    );
                  });

                  // 如果input的下一个元素是ul，那么获取ul下面的第一个li元素，并点击
                  // const nextElement = element.nextElementSibling;
                  // if (nextElement && nextElement.tagName.toLowerCase() === "ul") {
                  //   const firstLi = nextElement.querySelector("li");
                  //   if (firstLi) {
                  //     // 等待一小段时间确保 ul 已经渲染完成
                  //     setTimeout(() => {
                  //       firstLi.click();
                  //     }, 200);
                  //   }
                  // }
                } else if (action.type === 'manual') {
                  return {
                    type: 'manual',
                  };
                }

                return {
                  type: 'success',
                };
              },
              args: [cbParams],
            })
            .then(res => {
              resolve(res);
            })
            .catch(error => {
              console.debug(
                '[Debug] BrowserManager executeScript error:',
                error
              );
              resolve(this.getInjectionResult(tab, false));
            });
          break;
        }
        case 'actionDomBulk': {
          browser.scripting
            .executeScript({
              target: { tabId: tab.id! },
              func: async (cbParams: any) => {
                let count = 0;
                const {
                  btnClassName = [],
                  spanClassName = '.Button-label',
                  spanText = '',
                  actions = [],
                } = cbParams || {};
                const buttons = document.getElementsByTagName('button');

                for (let i = 0; i < buttons.length; i++) {
                  const button = buttons[i];

                  if (
                    btnClassName.every((className: string) =>
                      button.classList.contains(className)
                    )
                  ) {
                    const span = button.querySelector(spanClassName);

                    if (span && span.innerText === spanText) {
                      if (actions.includes('click')) {
                        button.click();
                      }
                      count++;
                    }
                  }
                }

                return count;
              },
              args: [cbParams],
            })
            .then(res => {
              console.log('handleExecuteScript bulkButtonActions', res);
              resolve(res);
            })
            .catch(error => {
              console.debug(
                '[Debug] BrowserManager executeScript error:',
                error
              );
              resolve(this.getInjectionResult(tab, false));
            });
          break;
        }
        default: {
          console.log('executeScript default', cbName, cbParams);
          resolve(null);
          break;
        }
      }
    });
  };

  // getURLRuntime = (url: string): string => {
  //   let result = '';
  //   if (GlobalManager.g_isDev) {
  //     result = './getURLRuntime.js';
  //   } else {
  //     result = browser.runtime.getURL(url);
  //   }
  //   return result;
  // };

  // openSidePanel = async (options: {
  //   tabId?: number;
  //   windowId?: number;
  // }): Promise<void> => {
  //   try {
  //     // Chrome/Edge: 使用 sidePanel API
  //     if ((browser as any).sidePanel && (browser as any).sidePanel.open) {
  //       return await (browser as any).sidePanel.open(options);
  //     } else {
  //       // Firefox: 使用 sidebar API 或 降级处理
  //       console.warn(
  //         '[Warning] SidePanel not supported in this browser, opening in popup instead'
  //       );
  //       // 可以选择打开 popup 或其他替代方案
  //       return Promise.resolve();
  //     }
  //   } catch (error) {
  //     console.debug('[Debug] openSidePanel error:', error);
  //     throw error;
  //   }
  // };
}

export default BrowserManager.getInstance();
