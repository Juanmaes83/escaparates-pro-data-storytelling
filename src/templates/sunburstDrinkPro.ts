import type { EChartsOption } from 'echarts';
import type { DataPoint, Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createSunburstDrinkData } from '../data/demoData';

function mapNode(r: DataPoint, idx: number, colors: string[]): any {
  return {
    name: r.name,
    value: r.value,
    itemStyle: { color: colors[idx % colors.length] },
    children: r.children?.map((c, i) => mapNode(c, (idx + i + 1) % colors.length, colors)),
  };
}

function buildOption(ctx: TemplateContext): EChartsOption {
  const data = ctx.data.rows.map((r, i) => mapNode(r, i, ctx.theme.colors));

  return {
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'sunburst',
        data,
        radius: ['20%', '90%'],
        itemStyle: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' },
        label: { show: false },
      },
    ],
  };
}

export const sunburstDrinkPro: Template = {
  id: 'sunburst-drink-pro',
  name: 'Sunburst Drink Pro',
  description: 'Sunburst jerárquico con categorías y subcategorías al estilo sabores de bebidas.',
  category: 'Marketing',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createSunburstDrinkData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(sunburstDrinkPro);
