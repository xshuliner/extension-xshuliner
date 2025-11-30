import { cloneDeep } from 'lodash';
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

/**
 * 递归遍历一个对象的所有字段，并对字段进行处理修改，修改的方法，通过传参函数来处理。
 * @param {object} params.obj 处理对象
 * @param {function} params.modifier 处理方法
 * @return 处理后的对象
 */
export const traverseObject = (params: {
  obj: Record<string, any>;
  modifier: (key: string, value: any) => any;
}): Record<string, any> => {
  const { obj, modifier } = params || {};
  const newObj = cloneDeep(obj); // 创建新的对象

  for (let key in newObj) {
    if (Object.prototype.hasOwnProperty.call(newObj, key)) {
      if (typeof newObj[key] === 'object' && newObj[key] !== null) {
        newObj[key] = traverseObject({ obj: newObj[key], modifier }); // 递归调用遍历子对象，并将结果赋值给新对象的对应字段
      } else {
        newObj[key] = modifier(key, newObj[key]); // 对字段进行修改，并将结果赋值给新对象的对应字段
      }
    }
  }

  return newObj; // 返回新对象
};

/**
 * 将页面路径和参数对象，拼成可以跳转路由的字符串
 * @param strPath 路径
 * @param objParams 跳转参数
 * @return 合成的路由字符串
 */
export const router2url = (
  strPath: string,
  objParams: Record<string, any> = {}
): string => {
  let strResult = strPath;
  let isFirstParam = !strPath.includes('?');

  for (let key in objParams) {
    if (isFirstParam) {
      strResult += `?${key}=${objParams[key as keyof typeof objParams]}`;
      isFirstParam = false;
    } else {
      strResult += `&${key}=${objParams[key as keyof typeof objParams]}`;
    }
  }

  return strResult;
};

export default {
  traverseObject,
  router2url,
};
