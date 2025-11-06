import BrowserManager from '@/src/common/kits/BrowserManager';

/**
 * @description 持久化管理器
 */
class CacheManager {
  // header = `cache`; // 管理字段前缀
  // tailer = "deadTime"; // 管理字段后缀

  private static instance: CacheManager | null = null;

  static getInstance(): CacheManager {
    if (!this.instance) {
      this.instance = new CacheManager();
    }
    return this.instance;
  }

  /**
   * @description 存入缓存
   * @return {Promise<void>} 返回Promise
   * @example
   * const res = await CacheManager.setSyncStorage({c_syncKey: 'syncValue'})
   **/
  async setSyncStorage(
    params: Record<string, string | number | boolean | Record<string, any>>
  ): Promise<void> {
    const res = await BrowserManager.setSyncStorageCore(params);
    return res;
  }

  /**
   * @description 取缓存
   * @return {Promise<any>} 返回Promise
   * @example
   * const res = await CacheManager.getSyncStorage(['c_syncKey']) || {}
   **/
  async getSyncStorage(params?: string[]): Promise<Record<string, any>> {
    const res = await BrowserManager.getSyncStorageCore(params);
    return res;
  }

  async removeSyncStorage(params: string[]): Promise<void> {
    const res = await BrowserManager.removeSyncStorageCore(params);
    return res;
  }

  /**
   * @description 清空缓存
   * @return {Promise<void>} 返回Promise
   * @example
   * const res = await CacheManager.clearSyncStorage()
   **/
  async clearSyncStorage(): Promise<void> {
    const res = await BrowserManager.clearSyncStorageCore();
    return res;
  }
}

export default CacheManager.getInstance();
