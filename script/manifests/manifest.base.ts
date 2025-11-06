import pkg from '../../package.json';

const devPrefix = process.env.NODE_ENV === 'development' ? 'DEV | ' : '';

export const manifestBase = {
  manifest_version: 3,
  name: devPrefix + pkg.name,
  version: pkg.version,
  description: devPrefix + pkg.description,

  action: {
    default_popup: 'src/popup/index.html',
    default_title: pkg.name,
    default_icon: {
      '16': 'icons/icon.png',
      '48': 'icons/icon.png',
      '128': 'icons/icon.png',
    },
  },

  background: {
    service_worker: 'src/background/index.ts',
  },

  // Note: side panel varies by browser. Chrome/Edge use `side_panel` and permission `sidePanel`.
  // Firefox uses `sidebar_action`. These are defined in browser-specific manifests.

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

  icons: {
    '128': 'icons/icon.png',
  },
};
