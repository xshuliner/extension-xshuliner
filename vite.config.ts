import { crx } from '@crxjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // 用于路径解析
import { defineConfig, loadEnv } from 'vite';
import pkg from './package.json';
import manifest from './script/manifest.config';

// https://vite.dev/config/

// ------------------------------------
// 步骤 3: 配置 Vite
// ------------------------------------
export default defineConfig(({ mode }) => {
  const EXT_WEB_PLATFORM_DEFAULT = 'chrome';
  const env = loadEnv(mode, process.cwd(), '');
  const platform = env.EXT_WEB_PLATFORM || EXT_WEB_PLATFORM_DEFAULT;

  return {
    // 插件配置
    plugins: [
      react(), // React 支持
      tailwindcss(),
      // CRXJS 插件是核心，传入定义的 manifest
      crx({ manifest }),
    ],

    // 构建配置 (通常 crxjs 已经处理得很好，但可以根据需要调整)
    build: {
      // 输出目录：dist/${pkg.name}-${EXT_WEB_PLATFORM}
      outDir: `dist/${pkg.name}-${platform}-${pkg.version}`,
      // 禁用清空输出目录，crxjs 会在开发模式下使用内存或特定目录
      emptyOutDir: true,
      // 确保开发时和生产时的构建目标一致
      target: 'esnext',
    },

    // 路径别名配置 (可选，但非常实用)
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
