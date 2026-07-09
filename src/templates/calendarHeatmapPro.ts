import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createCalendarHeatmapData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const data = rows.map((r) => [r.name, Number(r.value)]);
  const maxValue = Math.max(1, ...rows.map((r) => Number(r.value) || 0));
  const year = rows[0]?.meta?.year || '2016';

  return {
    tooltip: {},
    visualMap: {
      min: 0,
      max: maxValue,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 'top',
      textStyle: { color: ctx.theme.foreground },
    },
    calendar: {
      top: 80,
      left: 30,
      right: 30,
      cellSize: ['auto', 14],
      range: String(year),
      itemStyle: { borderWidth: 0.5, borderColor: ctx.theme.grid },
      yearLabel: { show: false, color: ctx.theme.foreground },
      dayLabel: { color: ctx.theme.foreground },
      monthLabel: { color: ctx.theme.foreground },
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data,
    },
  };
}

export const calendarHeatmapPro: Template = {
  id: 'calendar-heatmap-pro',
  name: 'Calendar Heatmap Pro',
  description: 'Mapa de calor sobre calendario anual para visualizar actividad diaria.',
  category: 'Experimental',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createCalendarHeatmapData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(calendarHeatmapPro);
