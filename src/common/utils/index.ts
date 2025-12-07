import { cloneDeep } from 'lodash';
import type React from 'react';

export const stopEventDefault = (e: React.MouseEvent): void => {
  e.stopPropagation();
  e.preventDefault();
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

/**
 * Base64URL 解码
 * @param str Base64URL 编码的字符串
 * @return 解码后的字符串
 */
const base64UrlDecode = (str: string): string => {
  // 将 Base64URL 转换为 Base64
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

  // 添加必要的填充
  while (base64.length % 4) {
    base64 += '=';
  }

  try {
    // 在浏览器扩展环境中，atob 通常是可用的
    // 如果不可用，尝试使用 Buffer（Node.js 环境）
    if (typeof atob !== 'undefined') {
      // 浏览器环境：使用 atob 解码
      const binaryString = atob(base64);
      // 将二进制字符串转换为 UTF-8 字符串
      return decodeURIComponent(
        binaryString
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } else if (
      typeof globalThis !== 'undefined' &&
      typeof (globalThis as any).Buffer !== 'undefined'
    ) {
      // Node.js 环境：使用 Buffer
      return (globalThis as any).Buffer.from(base64, 'base64').toString(
        'utf-8'
      );
    } else {
      throw new Error('Neither atob nor Buffer is available');
    }
  } catch (_error) {
    throw new Error('Invalid base64url string');
  }
};

/**
 * 解析 JWT token
 * @param token JWT token 字符串
 * @return 解析后的 payload 对象，如果解析失败返回 null
 */
const parseJwtPayload = (token: string): Record<string, any> | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = base64UrlDecode(payload);
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Parse JWT payload error:', error);
    return null;
  }
};

/**
 * 验证 JWT token 的合法性和是否过期
 * @param token JWT token 字符串
 * @return 验证结果对象 { isValid: boolean, isExpired: boolean, payload: Record<string, any> | null }
 */
export const validateJwtToken = (
  token: string | null | undefined
): {
  isValid: boolean;
  isExpired: boolean;
  payload: Record<string, any> | null;
} => {
  // 如果没有 token，返回无效
  if (!token || typeof token !== 'string' || token.trim() === '') {
    return {
      isValid: false,
      isExpired: true,
      payload: null,
    };
  }

  // 检查 token 格式（应该是三部分用点号分隔）
  const parts = token.split('.');
  if (parts.length !== 3) {
    return {
      isValid: false,
      isExpired: true,
      payload: null,
    };
  }

  // 解析 payload
  const payload = parseJwtPayload(token);
  if (!payload) {
    return {
      isValid: false,
      isExpired: true,
      payload: null,
    };
  }

  // 检查是否有 exp 字段
  if (typeof payload.exp !== 'number') {
    // 如果没有 exp 字段，认为 token 格式不完整，但不一定过期
    return {
      isValid: false,
      isExpired: false,
      payload,
    };
  }

  // 检查是否过期（exp 是 Unix 时间戳，单位是秒）
  const currentTime = Math.floor(Date.now() / 1000);
  const isExpired = payload.exp < currentTime;

  return {
    isValid: !isExpired,
    isExpired,
    payload,
  };
};

export default {
  traverseObject,
  router2url,
  validateJwtToken,
};
