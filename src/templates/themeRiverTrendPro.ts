import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createThemeRiverTrendData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const weeks = [...new Set(rows.map((r) => String(r.group)))];

  const data = rows.map((r) => [String(r.group), Number(r.value), r.name]);

  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const [date, value, category] = params.data;
        return `${date}<br/>${category}: ${value}`;
      },
    },
    singleAxis: {
      top: 60,
      bottom: 60,
      left: 60,
      right: 40,
      axisTick: { show: true, lineStyle: { color: ctx.theme.axis } },
      axisPointer: { animation: true, label: { show: true, color: ctx.theme.foreground, backgroundColor: ctx.theme.background } },
      type: 'category',
      data: weeks,
      axisLabel: { color: ctx.theme.foreground, fontWeight: 'bold' },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
      splitLine: { show: true, lineStyle: { color: ctx.theme.grid, type: 'dashed' } },
    },
    series: [
      {
        type: 'themeRiver',
        emphasis: { itemStyle: { shadowBlur: 12, shadowColor: 'rgba(0,0,0,0.5)' } },
        data,
        label: { show: true, color: ctx.theme.foreground, fontSize: 11 },
        itemStyle: { borderColor: ctx.theme.background, borderWidth: 1 },
      } as any,
    ],
  };
}

export const themeRiverTrendPro: Template = {
  id: 'theme-river-trend-pro',
  name: 'Theme River Trend Pro',
  description: 'Evolución temporal de canales o categorías: menciones, leads, demanda o campañas.',
  category: 'Marketing',
  buildOption,
  suggestedDimensions: ['name', 'value', 'group'],
  defaultData: createThemeRiverTrendData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(themeRiverTrendPro);
