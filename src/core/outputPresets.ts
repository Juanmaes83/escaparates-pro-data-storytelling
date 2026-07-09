import type { OutputPreset } from './types';
import { presetRegistry } from './registry';

export const webLandscape: OutputPreset = {
  id: 'web-landscape',
  name: 'Web Landscape',
  width: 1200,
  height: 675,
  aspectRatio: '16:9',
};

export const webPortrait: OutputPreset = {
  id: 'web-portrait',
  name: 'Web Portrait',
  width: 675,
  height: 1200,
  aspectRatio: '9:16',
};

export const squareSocial: OutputPreset = {
  id: 'square-social',
  name: 'Square Social',
  width: 1080,
  height: 1080,
  aspectRatio: '1:1',
};

export const presentationWide: OutputPreset = {
  id: 'presentation-wide',
  name: 'Presentation Wide',
  width: 1920,
  height: 1080,
  aspectRatio: '16:9',
};

export function registerOutputPresets() {
  [webLandscape, webPortrait, squareSocial, presentationWide].forEach((p) => presetRegistry.register(p));
}
