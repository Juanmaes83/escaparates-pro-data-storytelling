import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createCohortRetentionData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const cohorts = [...new Set(rows.map((r) => r.name))];
  const months = [...new Set(rows.map((r) => String(r.group)))];

  const data = rows.map((r) => [cohorts.indexOf(r.name), months.indexOf(String(r.group)), Number(r.value) || 0]);

  return {
    tooltip: {
      position: 'top',
      formatter: (params: any) => `Cohorte ${cohorts[params.data[0]]}<br/>${months[params.data[1]]}: ${params.data[2]}%`,
    },
    grid: { top: '12%', left: '12%', right: '10%', bottom: '12%' },
    xAxis: {
      type: 'category',
      data: months,
      axisLabel: { color: ctx.theme.foreground },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
      splitArea: { show: true },
    },
    yAxis: {
      type: 'category',
      data: cohorts,
      axisLabel: { color: ctx.theme.foreground },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
      splitArea: { show: true },
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '2%',
      textStyle: { color: ctx.theme.foreground },
      inRange: { color: [ctx.theme.background, ctx.theme.colors[0], ctx.theme.colors[1]] },
    },
    series: [
      {
        type: 'heatmap',
        data,
        label: { show: true, color: ctx.theme.foreground, formatter: (p: any) => `${p.data[2]}%` },
        itemStyle: { borderColor: ctx.theme.background, borderWidth: 1 },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' } },
      } as any,
    ],
  };
}

export const cohortRetentionPro: Template = {
  id: 'cohort-retention-pro',
  name: 'Cohort Retention Pro',
  description: 'Retención por cohortes y meses: análisis de permanencia de usuarios o clientes.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'value', 'group'],
  defaultData: createCohortRetentionData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(cohortRetentionPro);
