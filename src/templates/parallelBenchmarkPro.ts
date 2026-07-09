import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createParallelBenchmarkData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const groups = [...new Set(rows.map((r) => String(r.group)))];
  const dimensions = ['Alcance', 'Coste', 'Conversión', 'Riesgo', 'ROI', 'Madurez'];

  const schema = [
    { name: 'group', index: 0, text: 'Entidad' },
    ...dimensions.map((d, i) => ({ name: d, index: i + 1 })),
  ];

  const data = groups.map((group) => {
    const groupRows = rows.filter((r) => String(r.group) === group);
    const row: (string | number)[] = [group];
    dimensions.forEach((dim) => {
      const found = groupRows.find((r) => r.name === dim);
      row.push(found ? Number(found.meta?.[dim.toLowerCase()]) || 0 : 0);
    });
    return row;
  });

  return {
    tooltip: { trigger: 'item' },
    parallelAxis: [
      { dim: 0, name: schema[0].name, type: 'category', data: groups, axisLabel: { color: ctx.theme.foreground } },
      ...dimensions.map((dim, i) => ({
        dim: i + 1,
        name: dim,
        type: 'value' as const,
        min: 0,
        max: 100,
        nameTextStyle: { color: ctx.theme.foreground },
        axisLabel: { color: ctx.theme.foreground },
      })),
    ],
    parallel: {
      left: '8%',
      right: '10%',
      bottom: '12%',
      top: '15%',
      parallelAxisDefault: {
        type: 'value',
        nameLocation: 'end',
        nameGap: 18,
        nameTextStyle: { color: ctx.theme.foreground, fontSize: 12 },
        axisLine: { lineStyle: { color: ctx.theme.axis } },
        axisTick: { lineStyle: { color: ctx.theme.axis } },
        splitLine: { lineStyle: { color: ctx.theme.grid } },
        axisLabel: { color: ctx.theme.foreground },
      },
    },
    series: [
      {
        type: 'parallel',
        lineStyle: { width: 3, opacity: 0.7 },
        emphasis: { lineStyle: { width: 5, opacity: 1 } },
        data,
      } as any,
    ],
  };
}

export const parallelBenchmarkPro: Template = {
  id: 'parallel-benchmark-pro',
  name: 'Parallel Benchmark Pro',
  description: 'Comparación multientidad en dimensiones: alcance, coste, conversión, riesgo, ROI y madurez.',
  category: 'Strategy',
  buildOption,
  suggestedDimensions: ['name', 'value', 'group'],
  defaultData: createParallelBenchmarkData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(parallelBenchmarkPro);
