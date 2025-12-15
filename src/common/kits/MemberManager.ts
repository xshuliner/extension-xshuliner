import Api from '@/src/common/api';
import CacheManager from '@/src/common/kits/CacheManager';
import type { IMemberInfoType } from '@/src/common/types';

/**
 * @description
 */
class MemberManager {
  private static instance: MemberManager | null = null;

  memberInfo: IMemberInfoType | null = null;

  static getInstance(): MemberManager {
    if (!this.instance) {
      this.instance = new MemberManager();
      this.instance.memberInfo = null;
    }
    return this.instance;
  }

  getToken = async (): Promise<Record<string, string>> => {
    const res = await CacheManager.getSyncStorage(['token', 'refreshToken']);

    return res;
  };

  setToken = async (params: {
    token: string;
    refreshToken: string;
  }): Promise<void> => {
    const res = await CacheManager.setSyncStorage({
      token: params?.token,
      refreshToken: params?.refreshToken,
    });

    return res;
  };

  removeToken = async (): Promise<void> => {
    const res = await CacheManager.removeSyncStorage(['token', 'refreshToken']);
    return res;
  };

  getMemberInfo = (): IMemberInfoType | null => {
    return this.memberInfo;
  };

  setMemberInfo = (memberInfo: IMemberInfoType | null) => {
    this.memberInfo = memberInfo;
  };

  queryMemberInfo = async () => {
    const resMemberInfo = await Api.Xshuliner.getQueryMemberInfo();

    if (!resMemberInfo?.data?.body?.memberInfo) {
      this.removeToken();
      return null;
    }
    this.setMemberInfo(resMemberInfo?.data?.body?.memberInfo);
    return resMemberInfo?.data?.body?.memberInfo;
  };

  isAuth = async () => {
    const { token, _refreshToken } = await this.getToken();

    if (!token) {
      return false;
    }

    if (!this.memberInfo) {
      await this.queryMemberInfo();
    }

    return !!token && !!this.memberInfo; // && !validateJwtToken(token);
  };

  checkAuth = async (): Promise<boolean> => {
    // const { access_token, refresh_token } = await this.getToken();

    // 如果有用户信息 且 token 未过期
    if (await this.isAuth()) {
      return true;
    }

    // 如果没有用户信息 且 token 未过期
    // if (!this.isTokenExpired(access_token)) {
    //   await this.queryMemberInfo();
    //   if (!!this.memberInfo) {
    //     return true;
    //   }
    // }

    // 如果没有用户信息 且有 refresh_token
    // if (refresh_token) {
    //   const newTokens = await this.queryTokenByRefreshAccess({ refresh_token });
    //   if (!!newTokens && !!this.memberInfo) {
    //     return true;
    //   }
    // }

    this.logout();
    return false;
  };

  async logout(): Promise<void> {
    CacheManager.removeSyncStorage(['token']);
    this.memberInfo = null;
  }
}

export default MemberManager.getInstance();
