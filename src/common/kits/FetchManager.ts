/**
 * @description 接口请求管理器
 */
class FetchManager {
  static instance: FetchManager | null = null;

  // controllerMap = new Map<
  //   string,
  //   {
  //     config: IRequestConfigType;
  //     controller: AbortController;
  //   }
  // >();

  static getInstance(): FetchManager {
    if (!this.instance) {
      this.instance = new FetchManager();
    }
    return this.instance;
  }

  async sendRequest(config: any) {
    console.log('sendRequest', config);
    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        message: 'success',
        data: {},
      });
    });
  }
}

export default FetchManager.getInstance();
