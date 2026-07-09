import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';

function buildOption(ctx: TemplateContext): EChartsOption {
  return {
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'sunburst',
        data: ctx.data.rows,
        radius: ['18%', '85%'],
        itemStyle: { borderRadius: 4, borderWidth: 2, borderColor: ctx.theme.background },
        label: { color: ctx.theme.foreground, rotate: 'radial' },
        emphasis: { focus: 'ancestor' },
      } as any,
    ],
  };
}

export const brandSunburstPro: Template = {
  id: 'brand-sunburst-pro',
  name: 'Brand Sunburst Pro',
  description: 'Radiografía de marca en anillos jerárquicos.',
  category: 'brand',
  buildOption,
  suggestedDimensions: ['name', 'value', 'children'],
};

templateRegistry.register(brandSunburstPro);
