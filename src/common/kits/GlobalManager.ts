/**
 * @description 全局变量管理器
 */
import type { IMessageType } from '@/src/types';
import { v4 as uuidv4 } from 'uuid';
import browser from 'webextension-polyfill';

// import packageJson from '../../package.json';

class GlobalManager {
  static instance: GlobalManager | null = null;

  g_whiteListForRegister!: string[];
  g_isMac!: boolean;

  // connect
  g_connectName: string = 'unknown';
  g_connectPort: browser.Runtime.Port | null = null;

  g_handleBackgroundMessage!: (
    _message: any,
    _port: browser.Runtime.Port
  ) => Promise<void>;

  g_activeTabInfo: browser.Tabs.OnActivatedActiveInfoType | null = null;

  static getInstance(): GlobalManager {
    if (!this.instance) {
      this.instance = new GlobalManager();

      this.instance.g_isMac = false;
      // TODO: Detect platform in browser environment
      // this.instance.g_isMac =
      //   typeof navigator !== 'undefined' &&
      //   navigator?.platform?.toUpperCase()?.indexOf('MAC') >= 0;
      // this.instance.g_connectPort = null;
    }
    return this.instance;
  }

  postConnectMessage(params: IMessageType) {
    this.g_connectPort?.postMessage({
      ...params,
      type: `xshuliner-${this.g_connectName}-${params.type}`,
    });
  }

  connectBackground(params: { name: string }) {
    const { name = this.g_connectName } = params || {};

    this.g_connectPort = browser.runtime.connect({
      name: `xshuliner-${name}-${uuidv4()}`,
    });
    this.g_connectName = name;
    this.g_connectPort?.onMessage?.addListener(this.g_handleBackgroundMessage);
  }
}

export default GlobalManager.getInstance();
