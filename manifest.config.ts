import { defineManifest } from '@crxjs/vite-plugin';

// Centralized manifest definition for CRXJS
export default defineManifest({
  manifest_version: 3,
  name: '我的 Vite + React 扩展',
  version: '1.0.0',
  description: '一个使用 Vite 和 React 构建的浏览器扩展。',

  action: {
    default_popup: 'src/popup/index.html',
    default_title: '我的扩展',
    default_icon: {
      '16': 'icons/icon.png',
      '48': 'icons/icon.png',
      '128': 'icons/icon.png',
    },
  },

  background: {
    service_worker: 'src/background/index.ts',
  },

  side_panel: {
    default_path: 'src/sidepanel/index.html',
  },

  // DevTools page
  devtools_page: 'src/devtools/devtools.html',

  // Override new tab
  // chrome_url_overrides: {
  //   newtab: 'src/newtab/index.html',
  // },

  // Options page
  options_ui: {
    page: 'src/options/index.html',
    open_in_tab: true,
  },

  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content/index.tsx'],
    },
  ],

  permissions: ['storage', 'activeTab', 'sidePanel'],

  icons: {
    '128': 'icons/icon.png',
  },
});
