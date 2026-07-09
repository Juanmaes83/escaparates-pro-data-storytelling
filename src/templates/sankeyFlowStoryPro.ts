import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createSankeyFlowData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const nodes = [
    { name: 'Tráfico Orgánico', itemStyle: { color: ctx.theme.colors[0] } },
    { name: 'Paid Media', itemStyle: { color: ctx.theme.colors[1] } },
    { name: 'Social', itemStyle: { color: ctx.theme.colors[2] } },
    { name: 'Email', itemStyle: { color: ctx.theme.colors[3] } },
    { name: 'Visitantes', itemStyle: { color: ctx.theme.colors[4] } },
    { name: 'Leads', itemStyle: { color: ctx.theme.colors[5] || ctx.theme.colors[0] } },
    { name: 'Oportunidades', itemStyle: { color: ctx.theme.colors[0] } },
    { name: 'Propuestas', itemStyle: { color: ctx.theme.colors[1] } },
    { name: 'Ventas Cerradas', itemStyle: { color: ctx.theme.colors[2] } },
  ];

  const links = [
    { source: 'Tráfico Orgánico', target: 'Visitantes', value: 45000 },
    { source: 'Paid Media', target: 'Visitantes', value: 38000 },
    { source: 'Social', target: 'Visitantes', value: 27000 },
    { source: 'Email', target: 'Visitantes', value: 15000 },
    { source: 'Visitantes', target: 'Leads', value: 42000 },
    { source: 'Leads', target: 'Oportunidades', value: 12800 },
    { source: 'Oportunidades', target: 'Propuestas', value: 5400 },
    { source: 'Propuestas', target: 'Ventas Cerradas', value: 2180 },
  ];

  const totalIn = links.reduce((sum, l) => (l.target === 'Visitantes' ? sum + l.value : sum), 0);

  return {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      formatter: (params: any) => {
        if (params.dataType === 'edge') {
          const pct = ((params.value / totalIn) * 100).toFixed(1);
          return `${params.data.source} → ${params.data.target}<br/>${params.value.toLocaleString()} (${pct}%)`;
        }
        return `${params.name}<br/>${params.value.toLocaleString()}`;
      },
    },
    series: [
      {
        type: 'sankey',
        layout: 'none',
        emphasis: { focus: 'adjacency' },
        nodeAlign: 'left',
        data: nodes,
        links,
        lineStyle: {
          color: 'gradient',
          curveness: 0.5,
          opacity: 0.35,
        },
        itemStyle: { borderWidth: 0 },
        label: {
          color: ctx.theme.foreground,
          fontSize: 12,
          formatter: '{b}',
        },
      } as any,
    ],
  };
}

export const sankeyFlowStoryPro: Template = {
  id: 'sankey-flow-story-pro',
  name: 'Sankey Flow Story Pro',
  description: 'Flujos comerciales complejos: tráfico, leads, oportunidades y ventas con rutas principales visibles.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['source', 'target', 'value'],
  defaultData: createSankeyFlowData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(sankeyFlowStoryPro);
