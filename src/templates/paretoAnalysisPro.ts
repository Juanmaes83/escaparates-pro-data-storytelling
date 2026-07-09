import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createParetoAnalysisData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const sorted = [...ctx.data.rows].sort((a, b) => Number(b.value) - Number(a.value));
  const categories = sorted.map((r) => r.name);
  const values = sorted.map((r) => Number(r.value) || 0);
  const total = values.reduce((sum, v) => sum + v, 0);
  const cumulative = values.reduce((acc, v) => {
    const prev = acc.length ? acc[acc.length - 1] : 0;
    acc.push(prev + (total ? (v / total) * 100 : 0));
    return acc;
  }, [] as number[]);

  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['Valor', 'Acumulado %'], textStyle: { color: ctx.theme.foreground } },
    grid: { top: '15%', left: '10%', right: '12%', bottom: '12%' },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: { color: ctx.theme.foreground, rotate: 30 },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
    },
    yAxis: [
      {
        type: 'value',
        name: 'Valor',
        axisLabel: { color: ctx.theme.foreground },
        splitLine: { lineStyle: { color: ctx.theme.grid } },
      },
      {
        type: 'value',
        name: '% acumulado',
        max: 100,
        axisLabel: { formatter: '{value}%', color: ctx.theme.foreground },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: 'Valor',
        type: 'bar',
        data: values,
        itemStyle: { color: ctx.theme.colors[0], borderRadius: [4, 4, 0, 0] },
      },
      {
        name: 'Acumulado %',
        type: 'line',
        yAxisIndex: 1,
        data: cumulative,
        smooth: true,
        symbol: 'circle',
        itemStyle: { color: ctx.theme.colors[1] },
        lineStyle: { width: 3 },
        markLine: {
          data: [{ yAxis: 80, name: '80%', lineStyle: { type: 'dashed', color: ctx.theme.colors[2] } }],
          label: { color: ctx.theme.foreground },
        },
      },
    ],
  };
}

export const paretoAnalysisPro: Template = {
  id: 'pareto-analysis-pro',
  name: 'Pareto Analysis Pro',
  description: 'Análisis Pareto: barras ordenadas y curva acumulada para identificar el impacto del 20%.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createParetoAnalysisData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(paretoAnalysisPro);
