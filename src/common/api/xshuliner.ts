import FetchManager from '@/src/common/kits/FetchManager';
import md5 from 'blueimp-md5';

/**
 * 登录函数
 * @param params 登录参数
 * @returns Promise
 */
export const postCreateMiniCodeLogin = async (): Promise<any> => {
  return await FetchManager.request({
    method: 'POST',
    url: '/smart/v1/minicode/postCreateMiniCodeLogin',
  });
};

/**
 * 登录函数
 * @param params.username.required 用户名
 * @param params.password.required 密码
 * @returns Promise<memberInfo, token>
 */
export const postLoginMemberInfoForPassword = async (params: {
  username: string;
  password: string;
}): Promise<any> => {
  const body = {
    username: params.username,
    password: md5(params.password),
  };

  return await FetchManager.request({
    method: 'POST',
    url: '/smart/v1/member/postLoginMemberInfoForPassword',
    body,
  });
};

export default {
  postCreateMiniCodeLogin,
  postLoginMemberInfoForPassword,
};
