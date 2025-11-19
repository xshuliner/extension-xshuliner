// Event 管理器
class EventManager {
  static instance: null | EventManager = null;
  private channelFunList: { [key: string]: Function[] } = {};

  static getInstance() {
    if (!this.instance) {
      this.instance = new EventManager();
    }
    return this.instance;
  }

  emit(channel: string, data: any) {
    const funList = this.channelFunList[channel] || [];
    funList.forEach(fun => {
      fun(data);
    });
  }

  on(channel: string, fun: Function) {
    const funList = this.channelFunList[channel] || [];
    funList.push(fun);
    this.channelFunList[channel] = funList;
  }

  off(channel: string, fun: Function) {
    const funList = this.channelFunList[channel] || [];
    funList.splice(funList.indexOf(fun), 1);
    this.channelFunList[channel] = funList;
  }

  once(channel: string, fun: Function) {
    this.on(channel, fun);
    return () => {
      this.off(channel, fun);
    };
  }

  clear(channel: string) {
    this.channelFunList[channel] = [];
  }

  clearAll() {
    this.channelFunList = {};
  }
}

export default EventManager.getInstance();
