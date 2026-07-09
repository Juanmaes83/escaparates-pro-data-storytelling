import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createCustomHexbinData } from '../data/demoData';

function hexBinStatistics(points: number[][], r: number) {
  const dx = r * 2 * Math.sin(Math.PI / 3);
  const dy = r * 1.5;
  const binsById: Record<string, { x: number; y: number; points: number[][] }> = {};
  const bins: { x: number; y: number; points: number[][] }[] = [];

  points.forEach((point) => {
    const [px, py] = point;
    if (isNaN(px) || isNaN(py)) return;
    let pj = Math.round(py / dy);
    let pi = Math.round(px / dx - (pj & 1) / 2);
    const py1 = py / dy - pj;

    if (Math.abs(py1) * 3 > 1) {
      const px1 = px / dx - pi;
      const pi2 = pi + (px / dx < pi ? -1 : 1) / 2;
      const pj2 = pj + (py / dy < pj ? -1 : 1);
      const px2 = px / dx - pi2;
      const py2 = py / dy - pj2;
      if (px1 * px1 + py1 * py1 > px2 * px2 + py2 * py2) {
        pi = pi2 + (pj & 1 ? 1 : -1) / 2;
        pj = pj2;
      }
    }

    const id = `${pi}-${pj}`;
    if (binsById[id]) {
      binsById[id].points.push(point);
    } else {
      const bin = { x: (pi + (pj & 1) / 2) * dx, y: pj * dy, points: [point] };
      binsById[id] = bin;
      bins.push(bin);
    }
  });

  return bins;
}

function buildOption(ctx: TemplateContext): EChartsOption {
  const points = ctx.data.rows
    .filter((r) => r.meta && typeof r.meta.x === 'number' && typeof r.meta.y === 'number')
    .map((r) => [Number(r.meta?.x), Number(r.meta?.y)]);
  const radius = 8;
  const bins = hexBinStatistics(points, radius);
  const data = bins.map((bin) => [bin.x, bin.y, bin.points.length]);
  const maxCount = Math.max(1, ...data.map((d) => d[2] as number));

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
      max: maxCount,
      calculable: true,
      inRange: { color: ctx.theme.colors.slice(0, 4) },
      textStyle: { color: ctx.theme.foreground },
    },
    series: [
      {
        type: 'custom',
        coordinateSystem: 'cartesian2d',
        data,
        renderItem: (_params: any, api: any) => {
          const center = api.coord([api.value(0), api.value(1)]);
          const maxViewRadius = api.size([radius, 0])[0];
          const viewRadius = echarts.number.linearMap(
            Math.sqrt(api.value(2)),
            [0, Math.sqrt(maxCount)],
            [2, maxViewRadius]
          );
          const points: number[][] = [];
          let angle = Math.PI / 6;
          for (let i = 0; i < 6; i++, angle += Math.PI / 3) {
            points.push([
              center[0] + viewRadius * Math.cos(angle),
              center[1] + viewRadius * Math.sin(angle),
            ]);
          }
          return {
            type: 'polygon',
            shape: { points },
            style: { fill: api.visual('color'), stroke: ctx.theme.foreground, lineWidth: 1 },
          };
        },
      } as any,
    ],
  };
}

export const customHexbinPro: Template = {
  id: 'custom-hexbin-pro',
  name: 'Custom Hexbin Pro',
  description: 'Agrupación hexagonal de puntos en coordenadas cartesianas con color por densidad.',
  category: 'Experimental',
  buildOption,
  suggestedDimensions: ['x', 'y'],
  defaultData: createCustomHexbinData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(customHexbinPro);
