import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createSankeyRightAlignData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const nodeRows = ctx.data.rows.filter((r) => r.group === 'node');
  const linkRows = ctx.data.rows.filter((r) => r.group === 'link');

  const data = nodeRows.map((r, i) => ({
    name: r.name,
    itemStyle: { color: ctx.theme.colors[i % ctx.theme.colors.length] },
  }));

  const links = linkRows.map((r) => ({
    source: String(r.meta?.source),
    target: String(r.meta?.target),
    value: Number(r.value) || 0,
  }));

  return {
    tooltip: { trigger: 'item', triggerOn: 'mousemove' },
    series: [
      {
        type: 'sankey',
        nodeAlign: 'right',
        left: '8%',
        right: '12%',
        top: '10%',
        bottom: '10%',
        data,
        links,
        lineStyle: { color: 'source', curveness: 0.5 },
        emphasis: { focus: 'adjacency' },
        label: { color: ctx.theme.foreground },
      },
    ],
  };
}

export const sankeyRightAlignPro: Template = {
  id: 'sankey-right-align-pro',
  name: 'Sankey Right Align Pro',
  description: 'Sankey con alineación de nodos a la derecha para flujos orientados a resultados.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'value', 'source', 'target'],
  defaultData: createSankeyRightAlignData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(sankeyRightAlignPro);
