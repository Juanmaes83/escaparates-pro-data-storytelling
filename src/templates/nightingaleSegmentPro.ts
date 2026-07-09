import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createNightingaleSegmentData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const data = ctx.data.rows.map((r) => ({
    value: Number(r.value) || 0,
    name: r.name,
  }));

  return {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: { color: ctx.theme.foreground },
    },
    series: [
      {
        type: 'pie',
        radius: [24, 120],
        center: ['55%', '50%'],
        roseType: 'area',
        itemStyle: { borderRadius: 4 },
        label: { color: ctx.theme.foreground },
        data,
      },
    ],
  };
}

export const nightingaleSegmentPro: Template = {
  id: 'nightingale-segment-pro',
  name: 'Nightingale Segment Pro',
  description: 'Segmentación proporcional en rosa de Nightingale para comparar categorías.',
  category: 'Marketing',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createNightingaleSegmentData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(nightingaleSegmentPro);
