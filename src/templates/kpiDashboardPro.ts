import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const categories = rows.map((r) => r.name);
  const values = rows.map((r) => Number(r.value) || 0);

  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { top: '22%', left: '8%', right: '6%', bottom: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: { color: ctx.theme.foreground, interval: 0, rotate: 20 },
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
        data: values,
        itemStyle: { borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top', color: ctx.theme.foreground },
      },
    ],
  };
}

export const kpiDashboardPro: Template = {
  id: 'kpi-dashboard-pro',
  name: 'KPI Dashboard Pro',
  description: 'Panel comparativo de KPIs con barras profesionales.',
  category: 'kpi',
  buildOption,
  suggestedDimensions: ['name', 'value'],
};

templateRegistry.register(kpiDashboardPro);
