import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createBoxplotBenchmarkData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const source = rows.map((r) => [r.name, ...(Array.isArray(r.meta?.box) ? (r.meta.box as number[]) : [0, 0, 0, 0, 0])]);

  return {
    tooltip: { trigger: 'item' },
    dataset: {
      source: [['name', 'min', 'q1', 'median', 'q3', 'max'], ...source],
    },
    grid: { top: '15%', left: '10%', right: '8%', bottom: '12%' },
    xAxis: {
      type: 'category',
      axisLabel: { color: ctx.theme.foreground, rotate: 20 },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    series: [
      {
        type: 'boxplot',
        encode: { x: 'name', y: ['min', 'q1', 'median', 'q3', 'max'] },
        itemStyle: { color: ctx.theme.colors[0], borderColor: ctx.theme.colors[1], borderWidth: 2 },
      } as any,
    ],
  };
}

export const boxplotBenchmarkPro: Template = {
  id: 'boxplot-benchmark-pro',
  name: 'Boxplot Benchmark Pro',
  description: 'Distribución y dispersión por categoría con boxplots profesionales.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'min', 'q1', 'median', 'q3', 'max'],
  defaultData: createBoxplotBenchmarkData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(boxplotBenchmarkPro);
