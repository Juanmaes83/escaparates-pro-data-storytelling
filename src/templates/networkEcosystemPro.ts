import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createNetworkEcosystemData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const categories = [
    { name: 'Core', itemStyle: { color: ctx.theme.colors[0] } },
    { name: 'Partner', itemStyle: { color: ctx.theme.colors[1] } },
    { name: 'Channel', itemStyle: { color: ctx.theme.colors[2] } },
    { name: 'Media', itemStyle: { color: ctx.theme.colors[3] } },
    { name: 'Client', itemStyle: { color: ctx.theme.colors[4] } },
    { name: 'Competitor', itemStyle: { color: ctx.theme.colors[5] || '#ef4444' } },
    { name: 'Tech', itemStyle: { color: ctx.theme.colors[0] } },
  ];

  const data = ctx.data.rows.map((r) => ({
    name: r.name,
    value: Number(r.value),
    category: Number(r.meta?.category) || 0,
    symbolSize: Math.max(20, Number(r.value) * 0.5),
    label: { show: Number(r.value) >= 50 },
  }));

  const links = [
    { source: 'Marca Principal', target: 'Retail Partners', value: 8 },
    { source: 'Marca Principal', target: 'Marketplaces', value: 7 },
    { source: 'Marca Principal', target: 'Clientes VIP', value: 10 },
    { source: 'Influencers', target: 'Clientes VIP', value: 5 },
    { source: 'Retail Partners', target: 'Clientes VIP', value: 6 },
    { source: 'Marketplaces', target: 'Clientes VIP', value: 5 },
    { source: 'Tecnología CRM', target: 'Marca Principal', value: 7 },
    { source: 'Analytics Stack', target: 'Marca Principal', value: 6 },
    { source: 'Competidor A', target: 'Retail Partners', value: 3 },
    { source: 'Competidor B', target: 'Marketplaces', value: 3 },
  ];

  return {
    tooltip: {
      formatter: (params: any) => {
        if (params.dataType === 'edge') return `${params.data.source} → ${params.data.target}`;
        return `${params.name}<br/>Influencia: ${params.value}`;
      },
    },
    legend: {
      data: categories.map((c) => c.name),
      bottom: 0,
      textStyle: { color: ctx.theme.foreground },
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        data,
        links,
        categories,
        roam: true,
        draggable: true,
        label: { show: true, color: ctx.theme.foreground, fontSize: 11 },
        force: { repulsion: 280, edgeLength: [60, 140] },
        emphasis: { focus: 'adjacency', lineStyle: { width: 4 } },
        lineStyle: { color: 'source', curveness: 0.2, opacity: 0.5 },
      } as any,
    ],
  };
}

export const networkEcosystemPro: Template = {
  id: 'network-ecosystem-pro',
  name: 'Network Ecosystem Pro',
  description: 'Mapa de ecosistema comercial: stakeholders, partners, canales, clientes y competidores conectados.',
  category: 'Strategy',
  buildOption,
  suggestedDimensions: ['name', 'value', 'group'],
  defaultData: createNetworkEcosystemData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(networkEcosystemPro);
