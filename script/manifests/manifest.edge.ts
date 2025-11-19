// Edge-specific manifest overrides (MV3 compatible)
export const manifestEdge = {
  side_panel: {
    default_path: 'src/sidepanel/index.html',
  },
  permissions: ['storage', 'activeTab', 'sidePanel', 'webRequest'],
  host_permissions: ['<all_urls>'],
};
