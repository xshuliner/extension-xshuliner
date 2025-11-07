/**
 * @description 全局变量管理器
 */
import { v4 as uuidv4 } from 'uuid';
import browser from 'webextension-polyfill';

// import packageJson from '../../package.json';

class GlobalManager {
  static instance: GlobalManager | null = null;

  g_whiteListForRegister!: string[];
  g_isMac!: boolean;
  g_backgroundPort: browser.Runtime.Port | null = null;

  g_handleBackgroundMessage!: (
    message: any,
    port: browser.Runtime.Port
  ) => Promise<void>;

  g_activeTabInfo: browser.Tabs.OnActivatedActiveInfoType | null = null;

  static getInstance(): GlobalManager {
    if (!this.instance) {
      this.instance = new GlobalManager();

      this.instance.g_isMac =
        navigator?.platform?.toUpperCase()?.indexOf('MAC') >= 0;
      // this.instance.g_backgroundPort = null;
    }
    return this.instance;
  }

  connectBackground() {
    this.g_backgroundPort = browser.runtime.connect({
      name: `xshuliner-sidepanel-${uuidv4()}`,
    });
    // this.g_backgroundPort?.onMessage?.addListener(
    //   this.g_handleBackgroundMessage
    // );
  }
}

export default GlobalManager.getInstance();
