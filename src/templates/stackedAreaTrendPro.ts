import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createStackedAreaTrendData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const categories = [...new Set(rows.map((r) => r.name))];
  const seriesNames = [...new Set(rows.map((r) => r.group))] as string[];

  const series = seriesNames.map((group, idx) => ({
    name: group,
    type: 'line' as const,
    stack: 'Total',
    smooth: true,
    lineStyle: { width: 2 },
    areaStyle: {},
    itemStyle: { color: ctx.theme.colors[idx % ctx.theme.colors.length] },
    data: categories.map((cat) => {
      const row = rows.find((r) => r.name === cat && r.group === group);
      return row ? Number(row.value) : 0;
    }),
  }));

  return {
    tooltip: { trigger: 'axis' },
    legend: { data: seriesNames, textStyle: { color: ctx.theme.foreground } },
    grid: { top: '15%', left: '8%', right: '8%', bottom: '10%' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: categories,
      axisLabel: { color: ctx.theme.foreground },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    series,
  };
}

export const stackedAreaTrendPro: Template = {
  id: 'stacked-area-trend-pro',
  name: 'Stacked Area Trend Pro',
  description: 'Evolución temporal de múltiples series en áreas apiladas.',
  category: 'Marketing',
  buildOption,
  suggestedDimensions: ['name', 'value', 'group'],
  defaultData: createStackedAreaTrendData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(stackedAreaTrendPro);
