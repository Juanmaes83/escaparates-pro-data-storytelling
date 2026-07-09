import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createSalesTerritoryData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = [...ctx.data.rows].sort((a, b) => Number(a.value) - Number(b.value));
  const territories = rows.map((r) => r.name);
  const values = rows.map((r) => Number(r.value) || 0);

  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { top: '15%', left: '18%', right: '8%', bottom: '10%' },
    xAxis: {
      type: 'value',
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    yAxis: {
      type: 'category',
      data: territories,
      axisLabel: { color: ctx.theme.foreground },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
    },
    series: [
      {
        type: 'bar',
        data: values,
        barWidth: '55%',
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: ctx.theme.colors[0] },
            { offset: 1, color: ctx.theme.colors[1] },
          ]),
        },
        label: { show: true, position: 'right', color: ctx.theme.foreground, formatter: '{c}' },
      },
    ],
  };
}

export const salesTerritoryRankingPro: Template = {
  id: 'sales-territory-ranking-pro',
  name: 'Sales Territory Ranking Pro',
  description: 'Ranking territorial de ventas con barras horizontales ordenadas.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createSalesTerritoryData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(salesTerritoryRankingPro);
