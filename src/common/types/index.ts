export interface IMessageType {
  type: string;
  [key: string]: unknown;
}

export interface IMemberInfoType {
  _id: string;
  sys_thirdId: string;
  sys_thirdPlatform: string;
  sys_thirdBrand: string;
  sys_createTime: string;
  sys_updateTime: string;
  sys_countLogin: number;
  sys_status: string;
  sys_parentsId: string;
  sys_childrenId: string[];
  identity_username: string;
  identity_password: string;
  identity_phone: string;
  identity_email: string;
  user_nickName: string;
  user_avatarUrl: string;
  user_gender: number;
  user_country: string;
  user_province: string;
  user_city: string;
  user_area: string;
  user_level: number;
  user_score: number;
  user_title: string;
  __v: number;
  user_area_code: string;
  user_city_code: string;
  user_province_code: string;
  user_countProfile: number;
}

// export interface IUserInfoType {
//   _id: 'test000001';
//   sys_thirdId: 'test000001';
//   sys_thirdPlatform: 'WEB';
//   sys_thirdBrand: 'extension';
//   identity_username: 'test000001';
//   identity_password: '24446585f505259e4f25f0cc1372461f'; // "Test@20251234!",
// }
