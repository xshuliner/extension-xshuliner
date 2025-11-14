import { loadEnv } from 'vite';

export const getEnv = () => {
  const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');
  const nodeEnv = env.NODE_ENV;
  const webEnv = (env.VITE_EXT_WEB_ENV ?? 'PROD').toLowerCase();
  const platform = (env.VITE_EXT_WEB_PLATFORM ?? 'chrome').toLowerCase();

  return {
    env,
    nodeEnv,
    webEnv,
    platform,
  };
};
