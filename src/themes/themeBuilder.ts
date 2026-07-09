import type { ThemeSpec, Branding } from '../core/types';

export function buildTheme(theme: ThemeSpec, branding: Branding): Record<string, any> {
  const colors = overrideColors(theme.colors, branding);
  const bg = branding.backgroundColor || theme.background;
  const fg = branding.textColor || theme.foreground;

  return {
    backgroundColor: bg,
    textStyle: {
      color: fg,
      fontFamily: branding.fontFamily || theme.fontFamily,
    },
    title: {
      textStyle: { color: fg },
      subtextStyle: { color: fg },
    },
    legend: {
      textStyle: { color: fg },
      pageTextStyle: { color: fg },
    },
    tooltip: {
      backgroundColor: theme.mode === 'dark' ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.95)',
      borderColor: theme.grid,
      textStyle: { color: fg },
    },
    color: colors,
    categoryAxis: {
      axisLine: { lineStyle: { color: theme.axis } },
      axisLabel: { color: fg },
      splitLine: { lineStyle: { color: theme.grid } },
    },
    valueAxis: {
      axisLine: { lineStyle: { color: theme.axis } },
      axisLabel: { color: fg },
      splitLine: { lineStyle: { color: theme.grid } },
    },
  };
}

function overrideColors(colors: string[], branding: Branding): string[] {
  const out = [...colors];
  if (branding.primaryColor) out[0] = branding.primaryColor;
  if (branding.secondaryColor) out[1] = branding.secondaryColor;
  return out;
}
