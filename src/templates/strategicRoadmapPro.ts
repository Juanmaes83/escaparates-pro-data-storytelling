import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createStrategicRoadmapData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const categories = rows.map((r) => r.name);

  const data = rows.map((r) => {
    const start = Number(r.meta?.start) || 1;
    const duration = Number(r.meta?.duration) || 1;
    return {
      name: r.name,
      value: [categories.indexOf(r.name), start, start + duration, duration],
      itemStyle: { color: ctx.theme.colors[categories.indexOf(r.name) % ctx.theme.colors.length] },
    };
  });

  return {
    tooltip: {
      formatter: (params: any) => {
        const d = params.data;
        return `${d.name}<br/>Inicio: semana ${d.value[1]}<br/>Duración: ${d.value[3]} semanas`;
      },
    },
    grid: { top: '12%', left: '20%', right: '8%', bottom: '12%' },
    xAxis: {
      type: 'value',
      min: 0,
      max: 8,
      interval: 1,
      name: 'Semanas',
      nameTextStyle: { color: ctx.theme.foreground },
      axisLabel: { color: ctx.theme.foreground },
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
        type: 'custom',
        renderItem: (_params: any, api: any) => {
          const categoryIndex = api.value(0);
          const start = api.coord([api.value(1), categoryIndex]);
          const end = api.coord([api.value(2), categoryIndex]);
          const height = api.size([0, 1])[1] * 0.5;
          const rectShape = {
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height,
          };
          return {
            type: 'rect',
            shape: rectShape,
            style: api.style({ fill: api.visual('color') }),
          };
        },
        encode: { x: [1, 2], y: 0 },
        data,
      } as any,
    ],
  };
}

export const strategicRoadmapPro: Template = {
  id: 'strategic-roadmap-pro',
  name: 'Strategic Roadmap Pro',
  description: 'Roadmap de iniciativas con duración, impacto y dependencias en formato Gantt.',
  category: 'Strategy',
  buildOption,
  suggestedDimensions: ['name', 'start', 'duration', 'impacto'],
  defaultData: createStrategicRoadmapData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(strategicRoadmapPro);
