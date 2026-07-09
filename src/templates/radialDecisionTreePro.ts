import type { EChartsOption } from 'echarts';
import type { DataPoint, Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createRadialDecisionTreeData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const mapNode = (r: DataPoint, depth = 0): any => ({
    name: r.name,
    value: r.value,
    children: r.children?.map((child, idx) => mapNode(child, depth + idx)),
    itemStyle: { color: ctx.theme.colors[depth % ctx.theme.colors.length] },
    label: { color: ctx.theme.foreground },
  });

  const root = ctx.data.rows[0];
  if (!root) return {};

  return {
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'tree',
        data: [mapNode(root)],
        top: '8%',
        left: '8%',
        bottom: '8%',
        right: '8%',
        symbolSize: 10,
        layout: 'radial',
        lineStyle: { color: ctx.theme.axis, curveness: 0.5 },
        emphasis: { focus: 'descendant' },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      } as any,
    ],
  };
}

export const radialDecisionTreePro: Template = {
  id: 'radial-decision-tree-pro',
  name: 'Radial Decision Tree Pro',
  description: 'Árbol de decisiones en layout radial para explorar jerarquías complejas.',
  category: 'Strategy',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createRadialDecisionTreeData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(radialDecisionTreePro);
