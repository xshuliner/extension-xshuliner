import EventManager from '@/src/common/kits/EventManager';
import type { IMessageType } from '@/src/common/types';
import { useCallback, useEffect } from 'react';

/**
 * 自定义 Hook，用于订阅和管理事件
 * @param channel 事件通道
 * @param fun 事件回调函数
 * @param deps 依赖数组，用于控制事件监听器的重新订阅
 */
export const useEventManager = (
  channel: string,
  fun: (data: IMessageType) => void,
  deps: unknown[] = []
) => {
  // 使用 useCallback 缓存回调函数，避免不必要的重新订阅
  const memoizedFun = useCallback(fun, deps);

  useEffect(() => {
    // 订阅事件
    EventManager.on(channel, memoizedFun);

    // 清理函数：组件卸载时取消订阅
    return () => {
      EventManager.off(channel, memoizedFun);
    };
  }, [channel, memoizedFun]);

  // 返回一些有用的方法供组件使用
  return {
    // 发送事件
    emit: (data: IMessageType) => EventManager.emit(channel, data),
    // 手动取消订阅
    off: () => EventManager.off(channel, memoizedFun),
    // 清除特定事件的所有监听器
    clear: () => EventManager.clear(channel),
    // 清除所有事件的监听器
    clearAll: () => EventManager.clearAll(),
  };
};
