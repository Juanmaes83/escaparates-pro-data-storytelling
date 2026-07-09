import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createCustomPolarHeatmapData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const hours = [...new Set(rows.map((r) => String(r.meta?.hour)))].sort();
  const days = [...new Set(rows.map((r) => String(r.meta?.day)))].reverse();
  const data = rows.map((r) => [Number(r.meta?.hour), Number(r.meta?.day), Number(r.value)]);
  const maxValue = Math.max(1, ...rows.map((r) => Number(r.value) || 0));

  return {
    tooltip: {},
    polar: {},
    visualMap: {
      min: 0,
      max: maxValue,
      calculable: true,
      inRange: { color: ctx.theme.colors.slice(0, 5) },
      textStyle: { color: ctx.theme.foreground },
    },
    angleAxis: {
      type: 'category',
      data: hours,
      boundaryGap: false,
      splitLine: { show: true, lineStyle: { color: ctx.theme.grid, type: 'dashed' } },
      axisLine: { show: false },
      axisLabel: { color: ctx.theme.foreground },
    },
    radiusAxis: {
      type: 'category',
      data: days,
      z: 10,
      axisLabel: { color: ctx.theme.foreground },
    },
    series: [
      {
        type: 'custom',
        coordinateSystem: 'polar',
        data,
        renderItem: (params: any, api: any) => {
          const values = [api.value(0), api.value(1)];
          const coord = api.coord(values);
          const size = (api.size as any)([1, 1], values) as number[];
          return {
            type: 'sector',
            shape: {
              cx: params.coordSys.cx,
              cy: params.coordSys.cy,
              r0: coord[2] - size[0] / 2,
              r: coord[2] + size[0] / 2,
              startAngle: -(coord[3] + size[1] / 2),
              endAngle: -(coord[3] - size[1] / 2),
            },
            style: { fill: api.visual('color') },
          };
        },
      } as any,
    ],
  };
}

export const customPolarHeatmapPro: Template = {
  id: 'custom-polar-heatmap-pro',
  name: 'Custom Polar Heatmap Pro',
  description: 'Heatmap polar con series personalizadas representando cada celda como un sector.',
  category: 'Experimental',
  buildOption,
  suggestedDimensions: ['hour', 'day', 'value'],
  defaultData: createCustomPolarHeatmapData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(customPolarHeatmapPro);
