import { defineManifest } from '@crxjs/vite-plugin';
import { manifestBase } from './manifests/manifest.base';
import { manifestChrome } from './manifests/manifest.chrome';
import { manifestEdge } from './manifests/manifest.edge';
import { manifestFirefox } from './manifests/manifest.firefox';
import { manifestSafari } from './manifests/manifest.safari';
import { getEnv } from './utils/index';

const { platform } = getEnv();

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
