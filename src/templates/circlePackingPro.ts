import type { EChartsOption } from 'echarts';
import type { DataPoint, Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createCirclePackingData } from '../data/demoData';

function flatten(
  r: DataPoint,
  nodes: any[],
  colorIdx: number,
  colors: string[],
  parent?: string
) {
  const id = parent ? `${parent}.${r.name}` : r.name;
  const size = Number(r.value) || 10;
  nodes.push({
    id,
    name: r.name,
    value: size,
    symbolSize: Math.max(14, Math.sqrt(size) * 5),
    itemStyle: { color: colors[colorIdx % colors.length] },
    label: { show: size > 30, color: '#fff' },
  });
  r.children?.forEach((c, i) => flatten(c, nodes, (colorIdx + i + 1) % colors.length, colors, id));
}

function buildOption(ctx: TemplateContext): EChartsOption {
  const nodes: any[] = [];
  ctx.data.rows.forEach((r, i) => flatten(r, nodes, i, ctx.theme.colors));

  return {
    tooltip: {},
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: true,
        data: nodes,
        label: { show: true, color: ctx.theme.foreground },
        force: {
          repulsion: 400,
          gravity: 0.05,
          edgeLength: 10,
        },
        emphasis: { focus: 'adjacency' },
      } as any,
    ],
  };
}

export const circlePackingPro: Template = {
  id: 'circle-packing-pro',
  name: 'Circle Packing Pro',
  description: 'Empaquetado circular de jerarquías mediante layout de fuerza sin dependencias externas.',
  category: 'Strategy',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createCirclePackingData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(circlePackingPro);
