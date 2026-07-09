import type { EChartsOption } from 'echarts';
import type { DataPoint, Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createSunburstVisualMapData } from '../data/demoData';

function mapNode(r: DataPoint): any {
  return {
    name: r.name,
    value: r.value,
    children: r.children?.map(mapNode),
  };
}

function buildOption(ctx: TemplateContext): EChartsOption {
  const data = ctx.data.rows.map(mapNode);
  const values: number[] = [];
  const collect = (n: any) => {
    if (typeof n.value === 'number') values.push(n.value);
    n.children?.forEach(collect);
  };
  data.forEach(collect);
  const max = values.length ? Math.max(...values) : 10;

  return {
    tooltip: { trigger: 'item' },
    visualMap: {
      min: 0,
      max,
      calculable: true,
      inRange: { color: ctx.theme.colors.slice(0, 5) },
      textStyle: { color: ctx.theme.foreground },
    },
    series: [
      {
        type: 'sunburst',
        data,
        radius: ['15%', '90%'],
        label: { rotate: 'radial', color: ctx.theme.foreground },
        itemStyle: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
      },
    ],
  };
}

export const sunburstVisualMapPro: Template = {
  id: 'sunburst-visualmap-pro',
  name: 'Sunburst VisualMap Pro',
  description: 'Sunburst con codificación visual por valor mediante VisualMap.',
  category: 'Marketing',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createSunburstVisualMapData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(sunburstVisualMapPro);
