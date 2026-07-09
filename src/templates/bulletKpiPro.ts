import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createBulletKpiData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const categories = rows.map((r) => r.name);
  const values = rows.map((r) => Number(r.value) || 0);
  const targets = rows.map((r) => Number(r.meta?.target) || 0);

  const ranges = [
    { max: 50, color: 'rgba(239, 68, 68, 0.22)', label: 'Bajo' },
    { max: 75, color: 'rgba(234, 179, 8, 0.22)', label: 'Medio' },
    { max: 100, color: 'rgba(34, 197, 94, 0.22)', label: 'Alto' },
  ];

  const markAreaData = ranges.flatMap((range, idx) => {
    const min = idx === 0 ? 0 : ranges[idx - 1].max;
    return categories.map((name) => [
      {
        name: range.label,
        yAxis: name,
        xAxis: min,
        itemStyle: { color: range.color },
      },
      { yAxis: name, xAxis: range.max },
    ]);
  });

  const markLineData = categories.map((name, idx) => ({
    yAxis: name,
    xAxis: targets[idx],
    name: 'Target',
    lineStyle: { type: 'dashed', color: ctx.theme.colors[2], width: 2 },
    label: { formatter: '{b}', color: ctx.theme.foreground },
  }));

  return {
    tooltip: { trigger: 'axis', formatter: '{b}: {c}%<br/>Target: {c}%' },
    grid: { top: '10%', left: '20%', right: '12%', bottom: '8%' },
    xAxis: {
      type: 'value',
      max: 100,
      axisLabel: { formatter: '{value}%', color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    yAxis: {
      type: 'category',
      data: categories,
      axisLabel: { color: ctx.theme.foreground },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
      splitLine: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: values,
        barWidth: '35%',
        itemStyle: { color: ctx.theme.colors[0], borderRadius: [0, 4, 4, 0] },
        markArea: { data: markAreaData as any, silent: true },
        markLine: { data: markLineData as any, symbol: ['none', 'arrow'] },
      },
    ],
  };
}

export const bulletKpiPro: Template = {
  id: 'bullet-kpi-pro',
  name: 'Bullet KPI Pro',
  description: 'KPIs con barra actual, target y bandas cualitativas en un solo vistazo.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'value', 'target'],
  defaultData: createBulletKpiData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(bulletKpiPro);
