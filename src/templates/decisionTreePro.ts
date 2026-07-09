import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createDecisionTreeData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  return {
    tooltip: { trigger: 'item', triggerOn: 'mousemove' },
    series: [
      {
        type: 'tree',
        data: ctx.data.rows,
        top: '12%',
        left: '8%',
        bottom: '8%',
        right: '15%',
        symbolSize: 10,
        orient: 'RL',
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left',
          color: ctx.theme.foreground,
        },
        leaves: {
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
          },
        },
        emphasis: { focus: 'descendant' },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      } as any,
    ],
  };
}

export const decisionTreePro: Template = {
  id: 'decision-tree-pro',
  name: 'Decision Tree Pro',
  description: 'Jerarquía de decisiones estratégicas en árbol interactivo.',
  category: 'Strategy',
  buildOption,
  suggestedDimensions: ['name', 'value', 'children'],
  defaultData: createDecisionTreeData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(decisionTreePro);
