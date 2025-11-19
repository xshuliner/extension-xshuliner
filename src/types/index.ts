export enum EnumWebEnv {
  uat = 'uat',
  prod = 'prod',
}

export enum EnumPlatform {
  chrome = 'chrome',
  edge = 'edge',
  firefox = 'firefox',
  safari = 'safari',
}

export interface IMessageType {
  type: string;
  [key: string]: unknown;
}
