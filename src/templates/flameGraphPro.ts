import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createFlameGraphData } from '../data/demoData';

interface FlameNode {
  name: string;
  value: number;
  children?: FlameNode[];
}

function heightOfNode(node: FlameNode): number {
  if (!node.children || node.children.length === 0) return 0;
  return 1 + Math.max(...node.children.map((c) => heightOfNode(c)));
}

function flattenNode(
  node: FlameNode,
  start: number,
  level: number,
  rootValue: number,
  colors: string[],
  out: any[]
) {
  const end = start + node.value;
  out.push({
    name: node.name,
    value: [level, start, end, node.name, (node.value / rootValue) * 100],
    itemStyle: { color: colors[level % colors.length] },
  });
  let prev = start;
  node.children?.forEach((child) => {
    flattenNode(child, prev, level + 1, rootValue, colors, out);
    prev += child.value;
  });
}

function buildOption(ctx: TemplateContext): EChartsOption {
  const root = ctx.data.rows[0] as unknown as FlameNode;
  if (!root) return {};
  const data: any[] = [];
  flattenNode(root, 0, 0, root.value || 1, ctx.theme.colors, data);
  const levels = heightOfNode(root) + 1;

  return {
    tooltip: {
      formatter: (p: any) => `${p.value[3]}<br/>${p.value[4].toFixed(1)}%`,
    },
    grid: { top: '10%', left: '5%', right: '5%', bottom: '10%' },
    xAxis: { type: 'value', show: false, min: 0, max: root.value },
    yAxis: { type: 'value', show: false, min: -0.5, max: levels + 0.5, inverse: true },
    series: [
      {
        type: 'custom',
        renderItem: (_params: any, api: any) => {
          const level = api.value(0);
          const start = api.coord([api.value(1), level]);
          const end = api.coord([api.value(2), level]);
          const height = (((api.size && api.size([0, 1])) || [0, 18]) as number[])[1];
          const width = end[0] - start[0];
          return {
            type: 'rect',
            shape: { x: start[0], y: start[1] - height / 2, width: Math.max(width, 1), height },
            style: { fill: api.visual('color'), stroke: '#fff', lineWidth: 1 },
          };
        },
        encode: { x: [1, 2], y: 0, tooltip: [3, 4] },
        data,
      } as any,
    ],
  };
}

export const flameGraphPro: Template = {
  id: 'flame-graph-pro',
  name: 'Flame Graph Pro',
  description: 'Flame graph para visualizar jerarquías de consumo o tiempo de ejecución.',
  category: 'Strategy',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createFlameGraphData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(flameGraphPro);
