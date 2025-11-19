// Firefox-specific manifest overrides
// Note: Firefox has partial MV3 support; customize as needed
export const manifestFirefox = {
  // Firefox uses sidebar_action instead of Chrome's side_panel
  sidebar_action: {
    default_panel: 'src/sidepanel/index.html',
  },
  // Align permissions without Chrome's sidePanel
  permissions: ['storage', 'activeTab', 'webRequest'],
  host_permissions: ['<all_urls>'],

  browser_specific_settings: {
    gecko: {
      id: 'xxx@xshuliner.online',
      strict_min_version: '127.0',
    },
  },
};
