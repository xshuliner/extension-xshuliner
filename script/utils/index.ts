import { loadEnv } from 'vite';

/**
 * 解析命令行参数
 * @param argName 参数名称（不含 -- 前缀）
 * @param defaultValue 默认值
 * @param transform 转换函数
 */
const getArgValue = <T = string>(
  argName: string,
  defaultValue?: T,
  transform?: (value: string) => T
): T | undefined => {
  const arg = process.argv.find(arg => arg.startsWith(`--${argName}`));
  if (arg) {
    const value = arg.split('=')[1];
    if (value) {
      return transform ? transform(value) : (value as T);
    }
  }
  return defaultValue;
};

export const getEnv = () => {
  const env = loadEnv(process.env.NODE_ENV || '', process.cwd(), '');
  // 优先使用环境变量，其次使用命令行参数
  const nodeEnv = env.NODE_ENV || 'production';
  const webEnv = env.WEBENV || getArgValue('webenv', 'prod');
  const platform = env.PLATFORM || getArgValue('platform', 'chrome');

  return {
    env,
    nodeEnv,
    webEnv,
    platform,
  };
};
