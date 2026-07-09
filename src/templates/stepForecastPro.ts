import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createStepForecastData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const categories = rows.map((r) => r.name);
  const values = rows.map((r) => Number(r.value) || 0);
  const forecastIndex = rows.findIndex((r) => r.meta?.type === 'forecast');

  const markAreaData =
    forecastIndex >= 0
      ? [
          [
            {
              name: 'Pronóstico',
              xAxis: categories[forecastIndex],
              itemStyle: { color: 'rgba(255, 255, 255, 0.06)' },
            },
            { xAxis: categories[categories.length - 1] },
          ],
        ]
      : [];

  return {
    tooltip: { trigger: 'axis' },
    grid: { top: '15%', left: '8%', right: '8%', bottom: '10%' },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: { color: ctx.theme.foreground },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    series: [
      {
        type: 'line',
        data: values,
        step: 'middle',
        itemStyle: { color: ctx.theme.colors[0] },
        lineStyle: { width: 3 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: ctx.theme.colors[0] },
            { offset: 1, color: 'rgba(0,0,0,0)' },
          ]),
        },
        markArea: { data: markAreaData as any },
        markPoint: {
          data: [
            { type: 'max', name: 'Máx' },
            { type: 'min', name: 'Mín' },
          ],
        },
      },
    ],
  };
}

export const stepForecastPro: Template = {
  id: 'step-forecast-pro',
  name: 'Step Forecast Pro',
  description: 'Serie escalonada que separa histórico real de zona de pronóstico.',
  category: 'Strategy',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createStepForecastData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(stepForecastPro);
