import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createCustomWindData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const data = rows.map((r) => [
    Number(r.meta?.x),
    Number(r.meta?.y),
    Number(r.meta?.vx),
    Number(r.meta?.vy),
    Number(r.meta?.mag),
  ]);
  const maxMag = Math.max(1, ...rows.map((r) => Number(r.meta?.mag) || 0));

  return {
    tooltip: { trigger: 'item' },
    grid: { top: '10%', left: '10%', right: '10%', bottom: '10%' },
    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    visualMap: {
      min: 0,
      max: maxMag,
      calculable: true,
      inRange: { color: ctx.theme.colors.slice(0, 5) },
      textStyle: { color: ctx.theme.foreground },
    },
    series: [
      {
        type: 'custom',
        coordinateSystem: 'cartesian2d',
        data,
        encode: { x: 0, y: 0 },
        renderItem: (_params: any, api: any) => {
          const x = api.value(0) as number;
          const y = api.value(1) as number;
          const dx = api.value(2) as number;
          const dy = api.value(3) as number;
          const start = api.coord([Math.max(x - dx, 0), Math.max(y - dy, 0)]);
          const end = api.coord([Math.min(x + dx, 100), Math.min(y + dy, 100)]);
          return {
            type: 'line',
            shape: { x1: start[0], y1: start[1], x2: end[0], y2: end[1] },
            style: { lineWidth: 1.5, stroke: api.visual('color') },
          };
        },
      } as any,
    ],
  };
}

export const customWindPro: Template = {
  id: 'custom-wind-pro',
  name: 'Custom Wind Pro',
  description: 'Campo de vectores con series personalizadas: dirección e intensidad visualizadas con líneas.',
  category: 'Experimental',
  buildOption,
  suggestedDimensions: ['x', 'y', 'vx', 'vy', 'mag'],
  defaultData: createCustomWindData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(customWindPro);
