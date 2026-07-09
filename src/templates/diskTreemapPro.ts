import type { EChartsOption } from 'echarts';
import type { DataPoint, Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createDiskTreemapData } from '../data/demoData';

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
    tooltip: {
      formatter: (info: any) => {
        const path = info.treePathInfo.map((t: any) => t.name).slice(1).join(' / ');
        return `${path}<br/>${info.value}`;
      },
    },
    series: [
      {
        type: 'treemap',
        visibleMin: 300,
        label: { show: true, formatter: '{b}' },
        itemStyle: { borderColor: ctx.theme.foreground },
        breadcrumb: { show: false },
        levels: [
          { itemStyle: { borderWidth: 0, gapWidth: 5 } },
          { itemStyle: { gapWidth: 1 } },
          {
            colorSaturation: [0.35, 0.5],
            itemStyle: { gapWidth: 1, borderColorSaturation: 0.6 },
          },
        ],
        data,
      },
    ],
  };
}

export const diskTreemapPro: Template = {
  id: 'disk-treemap-pro',
  name: 'Disk Treemap Pro',
  description: 'Treemap estilo uso de disco con niveles de saturación y jerarquías.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createDiskTreemapData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(diskTreemapPro);
