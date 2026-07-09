import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createTreemapData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  return {
    tooltip: { formatter: '{b}: {c}' },
    series: [
      {
        type: 'treemap',
        data: ctx.data.rows,
        roam: false,
        breadcrumb: { show: false },
        label: { show: true, formatter: '{b}\n{c}', color: '#fff' },
        itemStyle: {
          borderColor: ctx.theme.background,
          borderWidth: 2,
          gapWidth: 2,
        },
        levels: [
          { itemStyle: { borderWidth: 0, gapWidth: 3 } },
          { itemStyle: { gapWidth: 1 } },
        ],
      } as any,
    ],
  };
}

export const businessTreemapPro: Template = {
  id: 'business-treemap-pro',
  name: 'Business Treemap Pro',
  description: 'Distribución proporcional de negocio con drill-down visual.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createTreemapData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(businessTreemapPro);
