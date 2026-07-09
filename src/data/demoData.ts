import type { DataSet, DataPoint } from '../core/types';

export function createDecisionTreeData(): DataSet {
  const build = (name: string, value: number, children?: DataPoint[]): DataPoint => ({
    name,
    value,
    children,
  });

  return {
    id: 'decision-tree-demo',
    title: 'Árbol de Decisión',
    rows: [
      build('Estrategia', 100, [
        build('Marketing', 45, [
          build('SEO', 20),
          build('Paid Media', 15),
          build('Social', 10),
        ]),
        build('Ventas', 30, [
          build('Directa', 18),
          build('Retail', 12),
        ]),
        build('Producto', 25, [
          build('I+D', 15),
          build('UX', 10),
        ]),
      ]),
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createTreemapData(): DataSet {
  return {
    id: 'treemap-demo',
    title: 'Business Treemap',
    rows: [
      { name: 'Digital', value: 340, children: [{ name: 'Web', value: 200 }, { name: 'App', value: 140 }] },
      { name: 'Retail', value: 210, children: [{ name: 'Tiendas', value: 130 }, { name: 'Franquicias', value: 80 }] },
      { name: 'B2B', value: 150, children: [{ name: 'Partners', value: 90 }, { name: 'Mayoristas', value: 60 }] },
      { name: 'Nuevos', value: 100, children: [{ name: 'Marketplace', value: 60 }, { name: 'D2C', value: 40 }] },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createSunburstData(): DataSet {
  return {
    id: 'sunburst-demo',
    title: 'Brand Sunburst',
    rows: [
      {
        name: 'Identidad',
        value: 100,
        children: [
          { name: 'Logo', value: 30 },
          { name: 'Color', value: 25 },
          { name: 'Tipografía', value: 20 },
          { name: 'Voz', value: 25 },
        ],
      },
      {
        name: 'Experiencia',
        value: 80,
        children: [
          { name: 'Retail', value: 35 },
          { name: 'Digital', value: 25 },
          { name: 'Atención', value: 20 },
        ],
      },
      {
        name: 'Producto',
        value: 90,
        children: [
          { name: 'Calidad', value: 40 },
          { name: 'Diseño', value: 30 },
          { name: 'Precio', value: 20 },
        ],
      },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createKpiData(): DataSet {
  return {
    id: 'kpi-demo',
    title: 'KPI Dashboard',
    rows: [
      { name: 'Ventas', value: 1240, group: 'Mensual' },
      { name: 'Leads', value: 860, group: 'Mensual' },
      { name: 'Conversión', value: 18.4, group: 'Ratio' },
      { name: 'Ticket Medio', value: 145, group: 'Mensual' },
      { name: 'NPS', value: 72, group: 'Satisfacción' },
      { name: 'Retención', value: 64, group: 'Satisfacción' },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createGaugeData(): DataSet {
  return {
    id: 'gauge-demo',
    title: 'Gauge Pack',
    rows: [
      { name: 'Satisfacción', value: 82 },
      { name: 'Calidad', value: 74 },
      { name: 'Eficiencia', value: 67 },
      { name: 'Lealtad', value: 91 },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createFunnelStoryData(): DataSet {
  return {
    id: 'funnel-story-demo',
    title: 'Funnel Story Pro',
    rows: [
      { name: 'Tráfico', value: 125000 },
      { name: 'Leads', value: 42000 },
      { name: 'Oportunidades', value: 12800 },
      { name: 'Propuestas', value: 5400 },
      { name: 'Ventas', value: 2180 },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createTimelineCampaignData(): DataSet {
  return {
    id: 'timeline-campaign-demo',
    title: 'Timeline Campaign Pro',
    rows: [
      { name: 'Lanzamiento', value: 12000, group: '2024-01-15' },
      { name: 'Primer pico', value: 45000, group: '2024-02-01' },
      { name: 'Ajuste creativo', value: 32000, group: '2024-02-14' },
      { name: 'Segundo pico', value: 68000, group: '2024-03-01' },
      { name: 'Retargeting', value: 51000, group: '2024-03-15' },
      { name: 'Cierre', value: 39000, group: '2024-03-30' },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value', seriesKey: 'group' },
  };
}

export function createRadarBenchmarkData(): DataSet {
  return {
    id: 'radar-benchmark-demo',
    title: 'Radar Benchmark Pro',
    rows: [
      { name: 'Calidad', value: 85, group: 'Marca A' },
      { name: 'Precio', value: 62, group: 'Marca A' },
      { name: 'Diseño', value: 78, group: 'Marca A' },
      { name: 'Servicio', value: 90, group: 'Marca A' },
      { name: 'Innovación', value: 74, group: 'Marca A' },
      { name: 'Sostenibilidad', value: 68, group: 'Marca A' },
      { name: 'Calidad', value: 70, group: 'Competidor' },
      { name: 'Precio', value: 88, group: 'Competidor' },
      { name: 'Diseño', value: 65, group: 'Competidor' },
      { name: 'Servicio', value: 72, group: 'Competidor' },
      { name: 'Innovación', value: 60, group: 'Competidor' },
      { name: 'Sostenibilidad', value: 55, group: 'Competidor' },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value', seriesKey: 'group' },
  };
}

export function createBubbleMatrixData(): DataSet {
  return {
    id: 'bubble-matrix-demo',
    title: 'Bubble Matrix Pro',
    rows: [
      { name: 'Expansión online', value: 85, group: '90', meta: { impacto: 90, esfuerzo: 20 } },
      { name: 'App móvil', value: 72, group: '70', meta: { impacto: 70, esfuerzo: 65 } },
      { name: 'Retail flagship', value: 64, group: '50', meta: { impacto: 50, esfuerzo: 80 } },
      { name: 'Programa B2B', value: 91, group: '40', meta: { impacto: 40, esfuerzo: 35 } },
      { name: 'Marketplace', value: 78, group: '85', meta: { impacto: 85, esfuerzo: 55 } },
      { name: 'Loyalty program', value: 66, group: '60', meta: { impacto: 60, esfuerzo: 45 } },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createHeatmapCalendarData(): DataSet {
  const rows: DataPoint[] = [];
  const categories = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  categories.forEach((day) => {
    for (let w = 0; w < 4; w++) {
      rows.push({
        name: `${day} S${w + 1}`,
        value: Math.round(30 + Math.random() * 70),
        group: day,
      });
    }
  });
  return {
    id: 'heatmap-calendar-demo',
    title: 'Heatmap Calendar Pro',
    rows,
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'group', valueKey: 'value' },
  };
}

export function createSankeyFlowData(): DataSet {
  return {
    id: 'sankey-flow-demo',
    title: 'Sankey Flow Story Pro',
    rows: [
      { name: 'Tráfico Orgánico', value: 45000, group: 'source' },
      { name: 'Paid Media', value: 38000, group: 'source' },
      { name: 'Social', value: 27000, group: 'source' },
      { name: 'Email', value: 15000, group: 'source' },
      { name: 'Visitantes', value: 125000, group: 'node' },
      { name: 'Leads', value: 42000, group: 'node' },
      { name: 'Oportunidades', value: 12800, group: 'node' },
      { name: 'Propuestas', value: 5400, group: 'node' },
      { name: 'Ventas Cerradas', value: 2180, group: 'node' },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createNetworkEcosystemData(): DataSet {
  return {
    id: 'network-ecosystem-demo',
    title: 'Network Ecosystem Pro',
    rows: [
      { name: 'Marca Principal', value: 100, group: 'core', meta: { category: 0 } },
      { name: 'Retail Partners', value: 70, group: 'partner', meta: { category: 1 } },
      { name: 'Marketplaces', value: 60, group: 'channel', meta: { category: 2 } },
      { name: 'Influencers', value: 45, group: 'media', meta: { category: 3 } },
      { name: 'Clientes VIP', value: 80, group: 'client', meta: { category: 4 } },
      { name: 'Competidor A', value: 55, group: 'competitor', meta: { category: 5 } },
      { name: 'Competidor B', value: 40, group: 'competitor', meta: { category: 5 } },
      { name: 'Tecnología CRM', value: 50, group: 'tech', meta: { category: 6 } },
      { name: 'Analytics Stack', value: 35, group: 'tech', meta: { category: 6 } },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createParallelBenchmarkData(): DataSet {
  return {
    id: 'parallel-benchmark-demo',
    title: 'Parallel Benchmark Pro',
    rows: [
      { name: 'Alcance', value: 85, group: 'Marca A', meta: { coste: 70, conversion: 65, riesgo: 30, roi: 80, madurez: 90 } },
      { name: 'Alcance', value: 60, group: 'Competidor 1', meta: { coste: 50, conversion: 70, riesgo: 45, roi: 65, madurez: 70 } },
      { name: 'Alcance', value: 75, group: 'Nuevo Entrante', meta: { coste: 85, conversion: 55, riesgo: 60, roi: 75, madurez: 40 } },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value', seriesKey: 'group' },
  };
}

export function createWaterfallProfitBridgeData(): DataSet {
  return {
    id: 'waterfall-profit-bridge-demo',
    title: 'Waterfall Profit Bridge Pro',
    rows: [
      { name: 'Ingresos Iniciales', value: 1200 },
      { name: '+ Nuevos Clientes', value: 340 },
      { name: '+ Upsell', value: 180 },
      { name: '- Costes Operativos', value: -420 },
      { name: '- Marketing', value: -210 },
      { name: '- Devoluciones', value: -90 },
      { name: '= Margen Final', value: 1000 },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createThemeRiverTrendData(): DataSet {
  const categories = ['Paid Media', 'Organic', 'Social', 'Email', 'Direct'];
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
  const baseValues: Record<string, number> = { 'Paid Media': 45, Organic: 30, Social: 25, Email: 20, Direct: 15 };

  const rows: DataPoint[] = [];
  weeks.forEach((week, w) => {
    categories.forEach((cat) => {
      const trend = Math.sin((w + categories.indexOf(cat)) * 0.6) * 10;
      rows.push({
        name: cat,
        value: Math.round(Math.max(5, baseValues[cat] + trend + Math.random() * 8)),
        group: week,
      });
    });
  });

  return {
    id: 'theme-river-trend-demo',
    title: 'Theme River Trend Pro',
    rows,
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value', seriesKey: 'group' },
  };
}

export function createDemoDataSet(templateId: string): DataSet {
  switch (templateId) {
    case 'decision-tree-pro':
      return createDecisionTreeData();
    case 'business-treemap-pro':
      return createTreemapData();
    case 'brand-sunburst-pro':
      return createSunburstData();
    case 'kpi-dashboard-pro':
      return createKpiData();
    case 'gauge-pack-pro':
      return createGaugeData();
    case 'funnel-story-pro':
      return createFunnelStoryData();
    case 'timeline-campaign-pro':
      return createTimelineCampaignData();
    case 'radar-benchmark-pro':
      return createRadarBenchmarkData();
    case 'bubble-matrix-pro':
      return createBubbleMatrixData();
    case 'heatmap-calendar-pro':
      return createHeatmapCalendarData();
    case 'sankey-flow-story-pro':
      return createSankeyFlowData();
    case 'network-ecosystem-pro':
      return createNetworkEcosystemData();
    case 'parallel-benchmark-pro':
      return createParallelBenchmarkData();
    case 'waterfall-profit-bridge-pro':
      return createWaterfallProfitBridgeData();
    case 'theme-river-trend-pro':
      return createThemeRiverTrendData();
    default:
      return createKpiData();
  }
}
