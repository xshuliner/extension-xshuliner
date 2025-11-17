import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path'; // 用于路径解析
import { defineConfig } from 'vite';
import pkg from './package.json';
import manifest from './script/manifest.config';
import { getEnv } from './script/utils/index';

// https://vite.dev/config/

// ------------------------------------
// 步骤 3: 配置 Vite
// ------------------------------------
export default defineConfig(() => {
  const { nodeEnv, webEnv, platform } = getEnv();

  const outDir =
    nodeEnv === 'development'
      ? `dist/${pkg.name}-${platform}-${pkg.version}-${webEnv}`
      : `dist/${pkg.name}-${platform}-${pkg.version}`;

  return {
    // 插件配置
    plugins: [
      react(), // React 支持
      // CRXJS 插件是核心，传入定义的 manifest
      crx({ manifest }),
    ],

    // 构建配置 (通常 crxjs 已经处理得很好，但可以根据需要调整)
    build: {
      // 输出目录：dist/${pkg.name}-${platform}-${version}-${webEnv}
      outDir,
      // 禁用清空输出目录，crxjs 会在开发模式下使用内存或特定目录
      emptyOutDir: true,
      // 确保开发时和生产时的构建目标一致
      target: 'esnext',
      rollupOptions: {
        input: {
          devtools: path.resolve(__dirname, 'src/devtools/index.html'),
        },
      },
    },

    // 路径别名配置 (可选，但非常实用)
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
