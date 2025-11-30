import FetchManager from '@/src/common/kits/FetchManager';

/**
 * 登录函数
 * @param params 登录参数
 * @returns Promise
 */
export const login = async (): Promise<any> => {
  return await FetchManager.request({
    method: 'POST',
    url: '/smart/v1/minicode/postCreateMiniCodeLogin',
  });
};

export default {
  login,
};
