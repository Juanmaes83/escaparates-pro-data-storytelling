import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createScenarioComparisonData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const periods = [...new Set(rows.map((r) => r.name))];
  const scenarios = [...new Set(rows.map((r) => String(r.group)))];

  const series = scenarios.map((scenario, idx) => ({
    name: scenario,
    type: idx === 0 ? 'bar' : 'line',
    data: periods.map((p) => Number(rows.find((r) => r.name === p && String(r.group) === scenario)?.value) || 0),
    smooth: true,
    symbolSize: 8,
    lineStyle: { width: 3 },
    areaStyle: idx === 1 ? { opacity: 0.15 } : undefined,
  }));

  return {
    tooltip: { trigger: 'axis' },
    legend: { data: scenarios, bottom: 0, textStyle: { color: ctx.theme.foreground } },
    grid: { top: '15%', left: '8%', right: '6%', bottom: '15%' },
    xAxis: {
      type: 'category',
      data: periods,
      axisLabel: { color: ctx.theme.foreground },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
    },
    yAxis: {
      type: 'value',
      name: 'Ingresos (k€)',
      nameTextStyle: { color: ctx.theme.foreground },
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    series: series as any,
  };
}

export const scenarioComparisonPro: Template = {
  id: 'scenario-comparison-pro',
  name: 'Scenario Comparison Pro',
  description: 'Comparación de escenarios conservador, base y agresivo en ingresos o ROI.',
  category: 'Strategy',
  buildOption,
  suggestedDimensions: ['name', 'value', 'group'],
  defaultData: createScenarioComparisonData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(scenarioComparisonPro);
