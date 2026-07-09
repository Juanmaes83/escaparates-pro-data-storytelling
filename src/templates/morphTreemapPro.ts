import type { EChartsOption } from 'echarts';
import type { DataPoint, Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createMorphTreemapData } from '../data/demoData';

function mapNode(r: DataPoint, colorIdx: number, colors: string[]): any {
  return {
    name: r.name,
    value: r.value,
    itemStyle: { color: colors[colorIdx % colors.length] },
    children: r.children?.map((c, i) => mapNode(c, (colorIdx + i + 1) % colors.length, colors)),
  };
}

function buildOption(ctx: TemplateContext): EChartsOption {
  const data = ctx.data.rows.map((r, i) => mapNode(r, i, ctx.theme.colors));

  return {
    baseOption: {
      timeline: {
        axisType: 'category',
        autoPlay: true,
        playInterval: 3000,
        data: ['Treemap', 'Sunburst'],
      },
    },
    options: [
      {
        series: [
          {
            type: 'treemap',
            id: 'morph',
            data,
            universalTransition: true,
            animationDurationUpdate: 1000,
            label: { show: true, formatter: '{b}' },
            breadcrumb: { show: false },
            itemStyle: { borderColor: ctx.theme.foreground },
          },
        ],
      },
      {
        series: [
          {
            type: 'sunburst',
            id: 'morph',
            data,
            universalTransition: true,
            animationDurationUpdate: 1000,
            radius: ['20%', '90%'],
            label: { show: false },
            itemStyle: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' },
          },
        ],
      },
    ],
  } as any;
}

export const morphTreemapPro: Template = {
  id: 'morph-treemap-pro',
  name: 'Morph Treemap Pro',
  description: 'Transición animada entre treemap y sunburst sobre la misma jerarquía.',
  category: 'Experimental',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createMorphTreemapData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(morphTreemapPro);
