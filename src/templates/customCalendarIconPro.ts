import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createCustomCalendarIconData } from '../data/demoData';

const layouts = [
  [[0, 0]],
  [[-0.25, 0], [0.25, 0]],
  [[0, -0.2], [-0.2, 0.2], [0.2, 0.2]],
];

const iconPaths = [
  'M0,0 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0', // circle
  'M-8,-8 H8 V8 H-8 Z', // square
  'M0,-10 L10,8 H-10 Z', // triangle
];

function buildOption(ctx: TemplateContext): EChartsOption {
  const data = ctx.data.rows.map((r) => [r.name, String(r.meta?.icons ?? '')]);

  return {
    tooltip: {
      formatter: (p: any) => {
        const icons = String(p.value[1]).split('|').filter(Boolean).length;
        return `${p.value[0]}: ${icons} eventos`;
      },
    },
    calendar: [
      {
        left: 'center',
        top: 'middle',
        cellSize: [60, 60],
        range: '2017-03',
        orient: 'vertical',
        yearLabel: { show: false },
        monthLabel: { show: false },
        dayLabel: { firstDay: 1, color: ctx.theme.foreground },
        itemStyle: { color: 'transparent', borderColor: ctx.theme.grid },
      },
    ],
    series: [
      {
        type: 'custom',
        coordinateSystem: 'calendar',
        dimensions: [undefined, { type: 'ordinal' }],
        data,
        renderItem: (params: any, api: any) => {
          const cellPoint = api.coord(api.value(0));
          const cellWidth = params.coordSys.cellWidth as number;
          const cellHeight = params.coordSys.cellHeight as number;
          if (isNaN(cellPoint[0]) || isNaN(cellPoint[1])) return;

          const icons = String(api.value(1) || '')
            .split('|')
            .filter(Boolean)
            .map(Number);

          const children: any[] = (layouts[icons.length - 1] || []).map(
            (itemLayout: number[], index: number) => ({
              type: 'path',
              shape: {
                pathData: iconPaths[icons[index] % iconPaths.length],
                x: -10,
                y: -10,
                width: 20,
                height: 20,
              },
              position: [
                cellPoint[0] +
                  echarts.number.linearMap(
                    itemLayout[0],
                    [-0.5, 0.5],
                    [-cellWidth / 2, cellWidth / 2]
                  ),
                cellPoint[1] +
                  echarts.number.linearMap(
                    itemLayout[1],
                    [-0.5, 0.5],
                    [-cellHeight / 2 + 16, cellHeight / 2]
                  ),
              ],
              style: { fill: ctx.theme.colors[icons[index] % ctx.theme.colors.length] },
            })
          );

          children.push({
            type: 'text',
            style: {
              x: cellPoint[0],
              y: cellPoint[1] - cellHeight / 2 + 12,
              text: echarts.format.formatTime('dd', api.value(0)),
              fill: ctx.theme.foreground,
              font: '12px sans-serif',
              align: 'center',
            },
          });

          return { type: 'group', children };
        },
      } as any,
    ],
  };
}

export const customCalendarIconPro: Template = {
  id: 'custom-calendar-icon-pro',
  name: 'Custom Calendar Icon Pro',
  description: 'Calendario personalizado con iconos representando eventos por día.',
  category: 'Marketing',
  buildOption,
  suggestedDimensions: ['name', 'icons'],
  defaultData: createCustomCalendarIconData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(customCalendarIconPro);
