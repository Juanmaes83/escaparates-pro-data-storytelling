import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createWaterfallProfitBridgeData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const categories = rows.map((r) => r.name);
  const values = rows.map((r) => Number(r.value) || 0);

  const positives = values.map((v) => (v >= 0 ? v : 0));
  const negatives = values.map((v) => (v < 0 ? v : 0));

  const helper = values.map((_, i) => {
    if (i === 0) return 0;
    if (i === values.length - 1) return 0;
    let sum = 0;
    for (let j = 0; j < i; j++) sum += values[j];
    return sum;
  });

  const lastIdx = values.length - 1;
  helper[lastIdx] = 0;

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any) => {
        const idx = params[0]?.dataIndex ?? 0;
        const val = values[idx];
        const sign = val >= 0 ? '+' : '';
        return `${categories[idx]}<br/>Impacto: ${sign}${val.toLocaleString()}`;
      },
    },
    grid: { top: '18%', left: '8%', right: '6%', bottom: '15%' },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: { color: ctx.theme.foreground, interval: 0, rotate: 18 },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    series: [
      {
        type: 'bar',
        stack: 'waterfall',
        itemStyle: { borderColor: 'transparent', color: 'transparent' },
        emphasis: { itemStyle: { borderColor: 'transparent', color: 'transparent' } },
        data: helper,
      },
      {
        type: 'bar',
        stack: 'waterfall',
        data: positives.map((v, i) => {
          const isLast = i === lastIdx;
          return {
            value: v,
            itemStyle: {
              color: isLast ? ctx.theme.colors[0] : ctx.theme.colors[2],
            },
          };
        }),
        label: { show: true, position: 'top', color: ctx.theme.foreground, formatter: (p: any) => (p.value ? p.value.toLocaleString() : '') },
      },
      {
        type: 'bar',
        stack: 'waterfall',
        data: negatives.map((v) => ({
          value: Math.abs(v),
          itemStyle: { color: ctx.theme.colors[5] || '#ef4444' },
        })),
        label: { show: true, position: 'bottom', color: ctx.theme.foreground, formatter: (p: any) => (p.value ? `-${p.value.toLocaleString()}` : '') },
      },
    ],
  };
}

export const waterfallProfitBridgePro: Template = {
  id: 'waterfall-profit-bridge-pro',
  name: 'Waterfall Profit Bridge Pro',
  description: 'Bridge financiero: ingresos iniciales, costes, mejoras y margen final para informes ejecutivos.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createWaterfallProfitBridgeData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(waterfallProfitBridgePro);
