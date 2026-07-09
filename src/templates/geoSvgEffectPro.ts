import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createGeoSvgEffectData } from '../data/demoData';

const SVG_MAP = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect x="10" y="10" width="180" height="180" fill="#e5e7eb" stroke="#6b7280" stroke-width="2"/>
  <path d="M40,40 L160,40 L160,160 L40,160 Z" fill="#f3f4f6" stroke="#9ca3af" stroke-width="1"/>
</svg>`;

function buildOption(ctx: TemplateContext): EChartsOption {
  echarts.registerMap('custom_geo', { svg: SVG_MAP });

  const data = ctx.data.rows.map((r) => [
    Number(r.meta?.x),
    Number(r.meta?.y),
    Number(r.value),
  ]);

  return {
    tooltip: {},
    geo: {
      map: 'custom_geo',
      roam: true,
      itemStyle: { areaColor: '#e5e7eb', borderColor: '#6b7280' },
    },
    series: {
      type: 'custom',
      coordinateSystem: 'geo',
      geoIndex: 0,
      zlevel: 1,
      data,
      renderItem: (_params: any, api: any) => {
        const coord = api.coord([api.value(0), api.value(1)]);
        const circles: any[] = [];
        for (let i = 0; i < 4; i++) {
          circles.push({
            type: 'circle',
            shape: { cx: 0, cy: 0, r: 12 + i * 4 },
            style: { stroke: ctx.theme.colors[0], fill: 'none', lineWidth: 2 },
            keyframeAnimation: {
              duration: 3000,
              loop: true,
              delay: (-i / 4) * 3000,
              keyframes: [
                { percent: 0, scaleX: 0, scaleY: 0, style: { opacity: 1 } },
                { percent: 1, scaleX: 1, scaleY: 0.4, style: { opacity: 0 } },
              ],
            },
          });
        }
        return {
          type: 'group',
          x: coord[0],
          y: coord[1],
          children: [
            ...circles,
            {
              type: 'path',
              shape: {
                d: 'M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10z',
                x: -8,
                y: -22,
                width: 16,
                height: 22,
              },
              style: { fill: ctx.theme.colors[1] },
            },
          ],
        };
      },
    } as any,
  };
}

export const geoSvgEffectPro: Template = {
  id: 'geo-svg-effect-pro',
  name: 'Geo SVG Effect Pro',
  description: 'Mapa SVG ligero con efectos de ondas y marcadores personalizados.',
  category: 'Experimental',
  buildOption,
  suggestedDimensions: ['x', 'y', 'value'],
  defaultData: createGeoSvgEffectData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(geoSvgEffectPro);
