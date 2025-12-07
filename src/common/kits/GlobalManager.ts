/**
 * @description 全局变量管理器
 */
import type { IMessageType } from '@/src/common/types';
import { v4 as uuidv4 } from 'uuid';
import browser from 'webextension-polyfill';
import EventManager from './EventManager';

// import packageJson from '../../package.json';

class GlobalManager {
  static instance: GlobalManager | null = null;

  g_surfaceName: string = 'unknown';

  g_isMac!: boolean;

  g_surfacePort: browser.Runtime.Port | null = null;

  g_activeTabInfo: browser.Tabs.OnActivatedActiveInfoType | null = null;

  static getInstance(): GlobalManager {
    if (!this.instance) {
      this.instance = new GlobalManager();

      this.instance.g_isMac = false;
      // TODO: Detect platform in browser environment
      // this.instance.g_isMac =
      //   typeof navigator !== 'undefined' &&
      //   navigator?.platform?.toUpperCase()?.indexOf('MAC') >= 0;
      // this.instance.g_surfacePort = null;
    }
    return this.instance;
  }

  postConnectMessage(params: IMessageType) {
    this.g_surfacePort?.postMessage({
      ...params,
      type: `xshuliner-${this.g_surfaceName}-${params.type}`,
    });
  }

  connectBackground(params: { name: string }) {
    const { name = this.g_surfaceName } = params || {};

    this.g_surfaceName = name;
    this.g_surfacePort = browser.runtime.connect({
      name: `xshuliner-${name}-${uuidv4()}`,
    });
    this.g_surfacePort?.onMessage?.addListener(
      (message: any, _port: browser.Runtime.Port) => {
        EventManager.emit('xshuliner-extensions', message);
      }
    );
  }
}

export default GlobalManager.getInstance();
