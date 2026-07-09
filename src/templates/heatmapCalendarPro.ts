import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createHeatmapCalendarData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const weeks = 4;

  const data: [number, number, number][] = [];
  rows.forEach((r) => {
    const dayIdx = days.indexOf(String(r.group));
    const match = r.name.match(/S(\d+)/);
    const weekIdx = match ? parseInt(match[1], 10) - 1 : 0;
    if (dayIdx >= 0 && weekIdx >= 0 && weekIdx < weeks) {
      data.push([weekIdx, dayIdx, Number(r.value) || 0]);
    }
  });

  return {
    tooltip: {
      position: 'top',
      formatter: (params: any) => `${days[params.data[1]]} S${params.data[0] + 1}: ${params.data[2]}`,
    },
    grid: { top: '15%', left: '12%', right: '8%', bottom: '12%' },
    xAxis: {
      type: 'category',
      data: Array.from({ length: weeks }, (_, i) => `S${i + 1}`),
      splitArea: { show: true },
      axisLabel: { color: ctx.theme.foreground },
    },
    yAxis: {
      type: 'category',
      data: days,
      splitArea: { show: true },
      axisLabel: { color: ctx.theme.foreground },
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '2%',
      textStyle: { color: ctx.theme.foreground },
      inRange: { color: [ctx.theme.background, ctx.theme.colors[0], ctx.theme.colors[1]] },
    },
    series: [
      {
        type: 'heatmap',
        data,
        label: { show: true, color: ctx.theme.foreground },
        itemStyle: {
          borderColor: ctx.theme.background,
          borderWidth: 1,
        },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' } },
      } as any,
    ],
  };
}

export const heatmapCalendarPro: Template = {
  id: 'heatmap-calendar-pro',
  name: 'Heatmap Calendar Pro',
  description: 'Calendario de intensidad semanal: ventas, leads, tráfico o actividad.',
  category: 'Marketing',
  buildOption,
  suggestedDimensions: ['name', 'value', 'group'],
  defaultData: createHeatmapCalendarData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(heatmapCalendarPro);
