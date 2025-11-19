import { EnumPlatform } from '@/src/types';
import { defineManifest } from '@crxjs/vite-plugin';
import { manifestBase } from './manifests/manifest.base';
import { manifestChrome } from './manifests/manifest.chrome';
import { manifestEdge } from './manifests/manifest.edge';
import { manifestFirefox } from './manifests/manifest.firefox';
import { manifestSafari } from './manifests/manifest.safari';
import { getEnv } from './utils/index';

const { platform } = getEnv();

const manifestPlatforms = {
  [EnumPlatform.chrome]: manifestChrome,
  [EnumPlatform.edge]: manifestEdge,
  [EnumPlatform.firefox]: manifestFirefox,
  [EnumPlatform.safari]: manifestSafari,
};

// Manifest.WebExtensionManifest

const manifestPlatform = manifestPlatforms[platform as EnumPlatform];

export default defineManifest({
  ...manifestBase,
  ...manifestPlatform,
});
