import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createRadarBenchmarkData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const groups = [...new Set(rows.map((r) => String(r.group)))];
  const dimensions = [...new Set(rows.map((r) => r.name))];

  const indicator = dimensions.map((d) => ({ name: d, max: 100 }));

  const seriesData = groups.map((group) => ({
    value: dimensions.map((dim) => {
      const row = rows.find((r) => r.name === dim && String(r.group) === group);
      return Number(row?.value) || 0;
    }),
    name: group,
  }));

  return {
    tooltip: { trigger: 'item' },
    legend: {
      data: groups,
      bottom: 0,
      textStyle: { color: ctx.theme.foreground },
    },
    radar: {
      indicator,
      shape: 'polygon',
      splitNumber: 4,
      axisName: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
      splitArea: { show: true, areaStyle: { color: ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.05)'] } },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
    },
    series: [
      {
        type: 'radar',
        data: seriesData,
        symbolSize: 6,
        lineStyle: { width: 2 },
        areaStyle: { opacity: 0.15 },
      } as any,
    ],
  };
}

export const radarBenchmarkPro: Template = {
  id: 'radar-benchmark-pro',
  name: 'Radar Benchmark Pro',
  description: 'Comparación multimensional de marca frente a competidores o criterios.',
  category: 'Strategy',
  buildOption,
  suggestedDimensions: ['name', 'value', 'group'],
  defaultData: createRadarBenchmarkData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(radarBenchmarkPro);
