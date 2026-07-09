import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createCustomBarTrendData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const categories = [...new Set(rows.map((r) => r.name))];
  const years = [...new Set(rows.map((r) => r.group))].filter(Boolean) as string[];
  const dataList = years.map((year) =>
    categories.map((cat) => Number(rows.find((r) => r.name === cat && r.group === year)?.value) || 0)
  );
  const customData = categories.map((_cat, idx) => [idx, ...dataList.map((list) => list[idx])]);
  const encodeY = years.map((_y, i) => i + 1);

  return {
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['trend', ...years],
      textStyle: { color: ctx.theme.foreground },
    },
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
        type: 'custom',
        name: 'trend',
        renderItem: (params: any, api: any) => {
          const xValue = api.value(0);
          const currentSeriesIndices = api.currentSeriesIndices();
          const barLayout = api.barLayout({
            barGap: '30%',
            barCategoryGap: '20%',
            count: currentSeriesIndices.length - 1,
          });
          const points: number[][] = [];
          for (let i = 0; i < currentSeriesIndices.length; i++) {
            const seriesIndex = currentSeriesIndices[i];
            if (seriesIndex !== params.seriesIndex) {
              const point = api.coord([xValue, api.value(seriesIndex)]);
              point[0] += barLayout[i - 1].offsetCenter;
              point[1] -= 12;
              points.push(point);
            }
          }
          return {
            type: 'polyline',
            shape: { points },
            style: { stroke: api.visual('color'), fill: 'none', lineWidth: 2 },
          };
        },
        itemStyle: { borderWidth: 2 },
        encode: { x: 0, y: encodeY },
        data: customData,
        z: 100,
      } as any,
      ...dataList.map((data, idx) => ({
        type: 'bar' as const,
        name: years[idx],
        animation: false,
        data,
        itemStyle: { opacity: 0.6, color: ctx.theme.colors[idx % ctx.theme.colors.length] },
      })),
    ],
  };
}

export const customBarTrendPro: Template = {
  id: 'custom-bar-trend-pro',
  name: 'Custom Bar Trend Pro',
  description: 'Barras agrupadas con línea de tendencia personalizada superpuesta.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'value', 'group'],
  defaultData: createCustomBarTrendData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(customBarTrendPro);
