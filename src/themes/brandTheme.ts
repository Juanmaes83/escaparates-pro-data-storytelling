import type { Branding, ThemeSpec } from '../core/types';

export function applyBrandingToTheme(theme: ThemeSpec, branding: Branding): ThemeSpec {
  return {
    ...theme,
    colors: [
      branding.primaryColor || theme.colors[0],
      branding.secondaryColor || theme.colors[1],
      ...theme.colors.slice(2),
    ],
    background: branding.backgroundColor || theme.background,
    foreground: branding.textColor || theme.foreground,
    fontFamily: branding.fontFamily || theme.fontFamily,
  };
}

export function createBrandTheme(branding: Branding, baseMode: 'dark' | 'light' = 'dark'): ThemeSpec {
  return {
    id: 'brand-custom',
    name: 'Brand Custom',
    mode: baseMode,
    colors: [
      branding.primaryColor || '#2563eb',
      branding.secondaryColor || '#7c3aed',
      '#10b981',
      '#f59e0b',
      '#ef4444',
      '#6366f1',
    ],
    background: branding.backgroundColor || (baseMode === 'dark' ? '#0f172a' : '#ffffff'),
    foreground: branding.textColor || (baseMode === 'dark' ? '#f8fafc' : '#0f172a'),
    grid: baseMode === 'dark' ? '#1e293b' : '#e2e8f0',
    axis: baseMode === 'dark' ? '#475569' : '#94a3b8',
    fontFamily: branding.fontFamily || 'Inter, system-ui, sans-serif',
  };
}
