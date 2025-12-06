// Safari-specific manifest overrides
// Safari (via Safari Web Extensions) may require special handling when packaging
export const manifestSafari = {
  // Add Safari specific keys or overrides here if needed
  permissions: ['storage', 'activeTab'],
  host_permissions: ['<all_urls>'],
};
