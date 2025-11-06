import { defineManifest } from '@crxjs/vite-plugin';
import { manifestBase } from './manifests/manifest.base';
import { manifestChrome } from './manifests/manifest.chrome';
import { manifestEdge } from './manifests/manifest.edge';
import { manifestFirefox } from './manifests/manifest.firefox';
import { manifestSafari } from './manifests/manifest.safari';

const EXT_WEB_PLATFORM_DEFAULT = 'chrome';
const platform = (
  process.env.EXT_WEB_PLATFORM ?? EXT_WEB_PLATFORM_DEFAULT
).toLowerCase();

const manifestPlatform: Record<string, unknown> = {
  chrome: manifestChrome,
  edge: manifestEdge,
  firefox: manifestFirefox,
  safari: manifestSafari,
}[platform];

export default defineManifest({
  ...manifestBase,
  ...manifestPlatform,
});
