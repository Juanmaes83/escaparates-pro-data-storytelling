import type { ThemeSpec } from '../core/types';
import { themeRegistry } from '../core/registry';

export const luxuryDark: ThemeSpec = {
  id: 'luxury-dark',
  name: 'Luxury Dark',
  mode: 'dark',
  colors: ['#c9a227', '#8a6d3b', '#d4af37', '#f3e5ab', '#b8860b', '#cd7f32'],
  background: '#0b0b0d',
  foreground: '#f5f5f7',
  grid: '#2a2a2e',
  axis: '#55555a',
  fontFamily: '"Playfair Display", Georgia, serif',
};

export const editorialLight: ThemeSpec = {
  id: 'editorial-light',
  name: 'Editorial Light',
  mode: 'light',
  colors: ['#111827', '#4b5563', '#9ca3af', '#d1d5db', '#6b7280', '#374151'],
  background: '#ffffff',
  foreground: '#111827',
  grid: '#e5e7eb',
  axis: '#d1d5db',
  fontFamily: '"Merriweather", Georgia, serif',
};

export const retailPop: ThemeSpec = {
  id: 'retail-pop',
  name: 'Retail Pop',
  mode: 'light',
  colors: ['#ff0055', '#ffcc00', '#00d4aa', '#3366ff', '#ff6600', '#aa00ff'],
  background: '#fff8f0',
  foreground: '#1a1a2e',
  grid: '#ffe4d1',
  axis: '#ffcdb2',
  fontFamily: '"Poppins", system-ui, sans-serif',
};

export const techBlue: ThemeSpec = {
  id: 'tech-blue',
  name: 'Tech Blue',
  mode: 'dark',
  colors: ['#00f0ff', '#0066ff', '#7c3aed', '#00ff9d', '#ff0055', '#ffcc00'],
  background: '#050b14',
  foreground: '#e2e8f0',
  grid: '#0f2236',
  axis: '#1e3a5f',
  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
};

export const realEstatePremium: ThemeSpec = {
  id: 'real-estate-premium',
  name: 'Real Estate Premium',
  mode: 'light',
  colors: ['#1e3a5f', '#c9a227', '#4a7c59', '#8b5a2b', '#5c7a96', '#d4af37'],
  background: '#f8f7f4',
  foreground: '#1e293b',
  grid: '#e8e6e1',
  axis: '#d6d3cd',
  fontFamily: '"Lato", "Helvetica Neue", sans-serif',
};

export function registerThemePresets() {
  [luxuryDark, editorialLight, retailPop, techBlue, realEstatePremium].forEach((t) => themeRegistry.register(t));
}
