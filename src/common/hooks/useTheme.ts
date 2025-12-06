import { useEffect, useState } from 'react';

export type ThemeType = 'light' | 'dark';
type ThemeListener = (theme: ThemeType) => void;

/**
 * 主题管理器单例
 * 使用订阅发布模式实现全局状态共享
 */
class ThemeManager {
  private static instance: ThemeManager;
  private theme: ThemeType = 'light';
  private listeners: Set<ThemeListener> = new Set();
  private mediaQuery: MediaQueryList | null = null;
  private mediaQueryHandler: ((e: MediaQueryListEvent) => void) | null = null;

  private constructor() {}

  /**
   * 获取单例实例
   */
  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  /**
   * 获取当前主题
   */
  getTheme(): ThemeType {
    return this.theme;
  }

  /**
   * 订阅主题变化
   */
  subscribe(listener: ThemeListener): () => void {
    this.listeners.add(listener);
    // 返回取消订阅函数
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * 通知所有订阅者
   */
  private notify(): void {
    this.listeners.forEach(listener => listener(this.theme));
  }

  /**
   * 应用主题到 document
   */
  applyTheme(dark: boolean): void {
    console.log('applyTheme', dark);
    const newTheme = dark ? 'dark' : 'light';

    if (newTheme !== this.theme) {
      this.theme = newTheme;

      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // 通知所有订阅者
      this.notify();
    }
  }

  /**
   * 切换主题
   */
  toggleTheme(): void {
    this.applyTheme(this.theme === 'light');
  }

  /**
   * 初始化主题系统
   * 根据系统主题偏好自动设置，并监听系统主题变化
   * @returns 清理函数，用于移除监听器
   */
  initTheme(): () => void {
    // 如果已经初始化过，先清理
    if (this.mediaQuery && this.mediaQueryHandler) {
      this.mediaQuery.removeEventListener('change', this.mediaQueryHandler);
    }

    // 监听系统主题变化
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.applyTheme(this.mediaQuery.matches);

    this.mediaQueryHandler = (e: MediaQueryListEvent) => {
      this.applyTheme(e.matches);
    };

    this.mediaQuery.addEventListener('change', this.mediaQueryHandler);

    // 返回清理函数
    return () => {
      if (this.mediaQuery && this.mediaQueryHandler) {
        this.mediaQuery.removeEventListener('change', this.mediaQueryHandler);
        this.mediaQueryHandler = null;
      }
    };
  }
}

/**
 * 共享主题状态的 Hook
 * 所有使用该 hook 的组件都会共享同一个 theme 值
 */
export const useTheme = () => {
  const manager = ThemeManager.getInstance();
  const [theme, setTheme] = useState<ThemeType>(manager.getTheme());

  useEffect(() => {
    // 订阅主题变化
    const unsubscribe = manager.subscribe(newTheme => {
      setTheme(newTheme);
    });

    // 同步当前主题
    setTheme(manager.getTheme());

    return unsubscribe;
  }, [manager]);

  useEffect(() => {
    console.log('theme', theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => manager.toggleTheme(),
    initTheme: () => manager.initTheme(),
  };
};
