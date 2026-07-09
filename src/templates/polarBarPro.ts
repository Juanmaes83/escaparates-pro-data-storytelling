import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createPolarBarData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const categories = rows.map((r) => r.name);
  const values = rows.map((r) => Number(r.value) || 0);

  return {
    tooltip: { trigger: 'axis' },
    polar: { radius: [30, '80%'] },
    angleAxis: {
      type: 'category',
      data: categories,
      startAngle: 75,
      axisLabel: { color: ctx.theme.foreground },
    },
    radiusAxis: {
      type: 'value',
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    series: [
      {
        type: 'bar',
        coordinateSystem: 'polar',
        data: values,
        itemStyle: {
          color: ctx.theme.colors[0],
          borderRadius: 4,
        },
        label: { show: true, position: 'middle', formatter: '{c}', color: ctx.theme.foreground },
      } as any,
    ],
  };
}

export const polarBarPro: Template = {
  id: 'polar-bar-pro',
  name: 'Polar Bar Pro',
  description: 'Barras en coordenadas polares para comparar categorías de forma radial.',
  category: 'Experimental',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createPolarBarData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(polarBarPro);
