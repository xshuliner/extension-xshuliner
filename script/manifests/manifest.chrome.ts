// Chrome-specific manifest overrides (MV3)
export const manifestChrome = {
  side_panel: {
    default_path: 'src/sidepanel/index.html',
  },
  permissions: ['storage', 'activeTab', 'sidePanel', 'webRequest'],
  host_permissions: ['<all_urls>'],
};
