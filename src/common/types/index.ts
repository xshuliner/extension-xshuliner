export interface IMessageType {
  type: string;
  [key: string]: unknown;
}

export interface IMemberInfoType {
  _id: string;
  sys_thirdId: string;
  sys_thirdPlatform: string;
  sys_thirdBrand: string;
  identity_username: string;
  identity_password: string;
}

// export interface IUserInfoType {
//   _id: 'test000001';
//   sys_thirdId: 'test000001';
//   sys_thirdPlatform: 'WEB';
//   sys_thirdBrand: 'extension';
//   identity_username: 'test000001';
//   identity_password: '24446585f505259e4f25f0cc1372461f'; // "Test@20251234!",
// }
