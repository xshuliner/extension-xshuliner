import type React from 'react';

export const stopEventDefault = (e: React.MouseEvent): void => {
  e.stopPropagation();
  e.preventDefault();
};

/**
 * 检查系统是否为暗色主题
 */
export const isDarkMode = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * 应用主题到 document
 */
export const applyTheme = (dark: boolean): void => {
  if (dark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

/**
 * 切换主题
 */
export const toggleTheme = (): void => {
  document.documentElement.classList.toggle('dark');
};

/**
 * 初始化主题系统
 * 根据系统主题偏好自动设置，并监听系统主题变化
 * @returns 清理函数，用于移除监听器
 */
export const initTheme = (): (() => void) => {
  // 立即应用当前系统主题
  const darkMode = isDarkMode();
  applyTheme(darkMode);

  // 监听系统主题变化
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (e: MediaQueryListEvent) => {
    applyTheme(e.matches);
  };

  mediaQuery.addEventListener('change', handleChange);

  // 返回清理函数
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
};
