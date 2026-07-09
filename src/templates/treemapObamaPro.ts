import type { EChartsOption } from 'echarts';
import type { DataPoint, Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createTreemapObamaData } from '../data/demoData';

function mapNode(r: DataPoint, colorIdx: number, colors: string[]): any {
  const values = Array.isArray(r.meta?.values) ? r.meta.values : [Number(r.value) || 0, 0];
  return {
    name: r.name,
    value: values,
    itemStyle: { color: colors[colorIdx % colors.length] },
    children: r.children?.map((c, i) => mapNode(c, (colorIdx + i + 1) % colors.length, colors)),
  };
}

function buildOption(ctx: TemplateContext): EChartsOption {
  const data = ctx.data.rows.map((r, i) => mapNode(r, i, ctx.theme.colors));

  return {
    tooltip: {
      formatter: (info: any) => {
        const val = Array.isArray(info.value) ? info.value[0] : info.value;
        const change = Array.isArray(info.value) ? info.value[1] : 0;
        const sign = change >= 0 ? '+' : '';
        return `${info.name}<br/>Importe: ${val}M€<br/>Cambio: ${sign}${change}%`;
      },
    },
    series: [
      {
        type: 'treemap',
        data,
        visibleMin: 300,
        label: {
          show: true,
          formatter: (p: any) => `${p.name}\n${Array.isArray(p.value) ? p.value[0] : p.value}M€`,
        },
        itemStyle: { borderColor: ctx.theme.foreground },
        breadcrumb: { show: false },
        levels: [
          { itemStyle: { borderWidth: 3, gapWidth: 3 } },
          { itemStyle: { borderWidth: 1, gapWidth: 1 } },
        ],
      },
    ],
  };
}

export const treemapObamaPro: Template = {
  id: 'treemap-obama-pro',
  name: 'Treemap Obama Pro',
  description: 'Treemap con valor compuesto: importe actual y variación porcentual.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'value', 'change'],
  defaultData: createTreemapObamaData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(treemapObamaPro);
