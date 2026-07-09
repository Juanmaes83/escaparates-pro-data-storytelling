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

export function createExecutiveScorecardData(): DataSet {
  return {
    id: 'executive-scorecard-demo',
    title: 'Executive Scorecard Pro',
    rows: [
      { name: 'Ingresos', value: 8.4, group: 'M€', meta: { target: 8.0, prev: 7.6 } },
      { name: 'Margen', value: 24.5, group: '%', meta: { target: 23.0, prev: 22.1 } },
      { name: 'NPS', value: 72, group: 'pts', meta: { target: 70, prev: 68 } },
      { name: 'Retención', value: 91, group: '%', meta: { target: 90, prev: 88 } },
      { name: 'CAC', value: 42, group: '€', meta: { target: 45, prev: 48 } },
      { name: 'LTV/CAC', value: 3.8, group: 'ratio', meta: { target: 3.5, prev: 3.4 } },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createCampaignAttributionData(): DataSet {
  return {
    id: 'campaign-attribution-demo',
    title: 'Campaign Attribution Pro',
    rows: [
      { name: 'Paid Social', value: 42000, group: 'Leads' },
      { name: 'Paid Search', value: 58000, group: 'Leads' },
      { name: 'Email', value: 24000, group: 'Leads' },
      { name: 'Organic', value: 31000, group: 'Leads' },
      { name: 'Paid Social', value: 8.4, group: 'ROAS' },
      { name: 'Paid Search', value: 12.2, group: 'ROAS' },
      { name: 'Email', value: 18.5, group: 'ROAS' },
      { name: 'Organic', value: 0, group: 'ROAS' },
      { name: 'Paid Social', value: 125000, group: 'Inversión' },
      { name: 'Paid Search', value: 180000, group: 'Inversión' },
      { name: 'Email', value: 35000, group: 'Inversión' },
      { name: 'Organic', value: 0, group: 'Inversión' },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value', seriesKey: 'group' },
  };
}

export function createCustomerJourneyData(): DataSet {
  return {
    id: 'customer-journey-demo',
    title: 'Customer Journey Map Pro',
    rows: [
      { name: 'Awareness', value: 92, group: 'Satisfacción', meta: { pain: 'Baja reach orgánica' } },
      { name: 'Consideration', value: 74, group: 'Satisfacción', meta: { pain: 'Info dispersa' } },
      { name: 'Purchase', value: 81, group: 'Satisfacción', meta: { pain: 'Checkout lento' } },
      { name: 'Onboarding', value: 68, group: 'Satisfacción', meta: { pain: 'Falta de guía' } },
      { name: 'Retention', value: 85, group: 'Satisfacción', meta: { pain: 'Soporte saturado' } },
      { name: 'Advocacy', value: 78, group: 'Satisfacción', meta: { pain: 'Programa referidos débil' } },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createMarketPositioningData(): DataSet {
  return {
    id: 'market-positioning-demo',
    title: 'Market Positioning Map Pro',
    rows: [
      { name: 'Nuestra Marca', value: 82, group: '85', meta: { x: 75, y: 82, size: 40 } },
      { name: 'Competidor A', value: 65, group: '60', meta: { x: 55, y: 65, size: 35 } },
      { name: 'Competidor B', value: 78, group: '45', meta: { x: 80, y: 78, size: 30 } },
      { name: 'Competidor C', value: 50, group: '30', meta: { x: 35, y: 50, size: 25 } },
      { name: 'Entrante D', value: 60, group: '70', meta: { x: 60, y: 60, size: 20 } },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createPortfolioRiskData(): DataSet {
  return {
    id: 'portfolio-risk-demo',
    title: 'Portfolio Risk Matrix Pro',
    rows: [
      { name: 'Expansión LATAM', value: 88, group: 'Riesgo Medio', meta: { retorno: 88, riesgo: 45, inversión: 500 } },
      { name: 'Nuevo SKU', value: 72, group: 'Riesgo Bajo', meta: { retorno: 72, riesgo: 25, inversión: 200 } },
      { name: 'Adquisición Tech', value: 95, group: 'Riesgo Alto', meta: { retorno: 95, riesgo: 78, inversión: 1200 } },
      { name: 'Rebranding', value: 65, group: 'Riesgo Medio', meta: { retorno: 65, riesgo: 55, inversión: 350 } },
      { name: 'App móvil', value: 80, group: 'Riesgo Bajo', meta: { retorno: 80, riesgo: 35, inversión: 400 } },
      { name: 'Marketplace', value: 60, group: 'Riesgo Alto', meta: { retorno: 60, riesgo: 70, inversión: 600 } },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createSalesTerritoryData(): DataSet {
  return {
    id: 'sales-territory-demo',
    title: 'Sales Territory Ranking Pro',
    rows: [
      { name: 'Madrid', value: 1240, group: 'Ventas' },
      { name: 'Barcelona', value: 980, group: 'Ventas' },
      { name: 'Valencia', value: 640, group: 'Ventas' },
      { name: 'Sevilla', value: 520, group: 'Ventas' },
      { name: 'Bilbao', value: 410, group: 'Ventas' },
      { name: 'Málaga', value: 380, group: 'Ventas' },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createProductLifecycleData(): DataSet {
  return {
    id: 'product-lifecycle-demo',
    title: 'Product Lifecycle Pro',
    rows: [
      { name: 'Producto A', value: 85, group: 'Crecimiento' },
      { name: 'Producto B', value: 62, group: 'Madurez' },
      { name: 'Producto C', value: 35, group: 'Declive' },
      { name: 'Producto D', value: 45, group: 'Lanzamiento' },
      { name: 'Producto E', value: 78, group: 'Crecimiento' },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createCohortRetentionData(): DataSet {
  const cohorts = ['Ene', 'Feb', 'Mar', 'Abr', 'May'];
  const months = ['M0', 'M1', 'M2', 'M3', 'M4'];
  const rows: DataPoint[] = [];
  cohorts.forEach((cohort, c) => {
    months.forEach((month, m) => {
      const retention = Math.max(20, 100 - m * 18 - c * 6 + Math.random() * 8);
      rows.push({
        name: cohort,
        value: Math.round(retention),
        group: month,
      });
    });
  });
  return {
    id: 'cohort-retention-demo',
    title: 'Cohort Retention Pro',
    rows,
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value', seriesKey: 'group' },
  };
}

export function createScenarioComparisonData(): DataSet {
  return {
    id: 'scenario-comparison-demo',
    title: 'Scenario Comparison Pro',
    rows: [
      { name: 'Q1', value: 1200, group: 'Conservador' },
      { name: 'Q2', value: 1350, group: 'Conservador' },
      { name: 'Q3', value: 1480, group: 'Conservador' },
      { name: 'Q4', value: 1600, group: 'Conservador' },
      { name: 'Q1', value: 1250, group: 'Base' },
      { name: 'Q2', value: 1480, group: 'Base' },
      { name: 'Q3', value: 1700, group: 'Base' },
      { name: 'Q4', value: 1950, group: 'Base' },
      { name: 'Q1', value: 1300, group: 'Aggresivo' },
      { name: 'Q2', value: 1620, group: 'Aggresivo' },
      { name: 'Q3', value: 1950, group: 'Aggresivo' },
      { name: 'Q4', value: 2350, group: 'Aggresivo' },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value', seriesKey: 'group' },
  };
}

export function createStrategicRoadmapData(): DataSet {
  return {
    id: 'strategic-roadmap-demo',
    title: 'Strategic Roadmap Pro',
    rows: [
      { name: 'Lanzamiento App', value: 90, group: 'Q1', meta: { start: 1, duration: 2, impacto: 90 } },
      { name: 'Expansión B2B', value: 75, group: 'Q2', meta: { start: 2, duration: 3, impacto: 75 } },
      { name: 'Rebranding', value: 60, group: 'Q2', meta: { start: 2, duration: 2, impacto: 60 } },
      { name: 'Nuevo Marketplace', value: 85, group: 'Q3', meta: { start: 4, duration: 3, impacto: 85 } },
      { name: 'Loyalty Program', value: 70, group: 'Q4', meta: { start: 6, duration: 2, impacto: 70 } },
      { name: 'Integración CRM', value: 55, group: 'Q1', meta: { start: 1, duration: 2, impacto: 55 } },
    ],
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createParetoAnalysisData(): DataSet {
  return {
    id: 'pareto-analysis-demo',
    title: 'Pareto Analysis Pro',
    rows: [
      { name: 'Devoluciones', value: 420 },
      { name: 'Logística', value: 310 },
      { name: 'Atención', value: 180 },
      { name: 'Packaging', value: 90 },
      { name: 'Otros', value: 60 },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createBulletKpiData(): DataSet {
  return {
    id: 'bullet-kpi-demo',
    title: 'Bullet KPI Pro',
    rows: [
      { name: 'NPS', value: 72, meta: { target: 80 } },
      { name: 'Margen', value: 24, meta: { target: 26 } },
      { name: 'OEE', value: 68, meta: { target: 75 } },
      { name: 'Calidad', value: 88, meta: { target: 92 } },
      { name: 'On-time', value: 81, meta: { target: 90 } },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createBoxplotBenchmarkData(): DataSet {
  return {
    id: 'boxplot-benchmark-demo',
    title: 'Boxplot Benchmark Pro',
    rows: [
      { name: 'Marca A', value: 0, meta: { box: [12, 28, 45, 62, 88] } },
      { name: 'Marca B', value: 0, meta: { box: [18, 34, 50, 60, 72] } },
      { name: 'Marca C', value: 0, meta: { box: [8, 22, 38, 48, 58] } },
      { name: 'Marca D', value: 0, meta: { box: [25, 40, 55, 70, 92] } },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createCandlestickMarketData(): DataSet {
  return {
    id: 'candlestick-market-demo',
    title: 'Candlestick Market Pro',
    rows: [
      { name: 'Sem 1', value: 0, meta: { open: 100, close: 115, low: 95, high: 118, volume: 2400 } },
      { name: 'Sem 2', value: 0, meta: { open: 115, close: 108, low: 102, high: 120, volume: 1800 } },
      { name: 'Sem 3', value: 0, meta: { open: 108, close: 124, low: 105, high: 128, volume: 3200 } },
      { name: 'Sem 4', value: 0, meta: { open: 124, close: 119, low: 112, high: 126, volume: 2100 } },
      { name: 'Sem 5', value: 0, meta: { open: 119, close: 132, low: 116, high: 135, volume: 3600 } },
      { name: 'Sem 6', value: 0, meta: { open: 132, close: 128, low: 120, high: 134, volume: 1900 } },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createNightingaleSegmentData(): DataSet {
  return {
    id: 'nightingale-segment-demo',
    title: 'Nightingale Segment Pro',
    rows: [
      { name: 'Digital', value: 340 },
      { name: 'Retail', value: 210 },
      { name: 'B2B', value: 150 },
      { name: 'Marketplace', value: 120 },
      { name: 'D2C', value: 90 },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createStackedAreaTrendData(): DataSet {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const series = ['Paid', 'Organic', 'Social', 'Email'];
  const base: Record<string, number[]> = {
    Paid: [40, 45, 50, 48, 55, 60],
    Organic: [30, 32, 35, 38, 40, 42],
    Social: [20, 25, 22, 28, 30, 35],
    Email: [15, 18, 20, 22, 20, 25],
  };
  const rows = months.flatMap((m, idx) =>
    series.map((s) => ({ name: m, value: base[s][idx], group: s }))
  );
  return {
    id: 'stacked-area-trend-demo',
    title: 'Stacked Area Trend Pro',
    rows,
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value', seriesKey: 'group' },
  };
}

export function createPictorialBarData(): DataSet {
  return {
    id: 'pictorial-bar-demo',
    title: 'Pictorial Bar Pro',
    rows: [
      { name: 'Sostenibilidad', value: 78 },
      { name: 'Innovación', value: 64 },
      { name: 'Calidad', value: 92 },
      { name: 'Servicio', value: 81 },
      { name: 'Precio', value: 55 },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createRadialDecisionTreeData(): DataSet {
  const build = (name: string, value: number, children?: any[]): DataPoint => ({
    name,
    value,
    children,
  });
  return {
    id: 'radial-decision-tree-demo',
    title: 'Radial Decision Tree Pro',
    rows: [
      build('Estrategia', 100, [
        build('Crecimiento', 50, [build('Nuevos mercados', 20), build('Nuevos productos', 18), build('Partners', 12)]),
        build('Eficiencia', 30, [build('Automatización', 15), build('Costes', 10), build('Calidad', 5)]),
        build('Experiencia', 20, [build('CX', 12), build('Marca', 8)]),
      ]),
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createStepForecastData(): DataSet {
  return {
    id: 'step-forecast-demo',
    title: 'Step Forecast Pro',
    rows: [
      { name: 'Ene', value: 120 },
      { name: 'Feb', value: 135 },
      { name: 'Mar', value: 128 },
      { name: 'Abr', value: 150 },
      { name: 'May', value: 165 },
      { name: 'Jun', value: 158, meta: { type: 'forecast' } },
      { name: 'Jul', value: 172, meta: { type: 'forecast' } },
      { name: 'Ago', value: 180, meta: { type: 'forecast' } },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createPolarBarData(): DataSet {
  return {
    id: 'polar-bar-demo',
    title: 'Polar Bar Pro',
    rows: [
      { name: 'Norte', value: 74 },
      { name: 'Sur', value: 58 },
      { name: 'Este', value: 66 },
      { name: 'Oeste', value: 82 },
      { name: 'Centro', value: 70 },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createDiskTreemapData(): DataSet {
  const build = (name: string, value: number, children?: DataPoint[]): DataPoint => ({
    name,
    value,
    children,
  });
  return {
    id: 'disk-treemap-demo',
    title: 'Disk Treemap Pro',
    rows: [
      build('Sistema', 500, [
        build('Usuarios', 300, [build('Documentos', 180), build('Imágenes', 120)]),
        build('Aplicaciones', 150, [build('Binarios', 90), build('Logs', 60)]),
        build('Respaldo', 50),
      ]),
      build('Proyectos', 350, [
        build('Web', 200, [build('Frontend', 120), build('Backend', 80)]),
        build('Móvil', 100),
        build('Datos', 50),
      ]),
      build('Marketing', 150, [build('Assets', 90), build('Campañas', 60)]),
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createSunburstDrinkData(): DataSet {
  const build = (name: string, value?: number, children?: DataPoint[]): DataPoint => ({
    name,
    value: value ?? 1,
    children,
  });
  return {
    id: 'sunburst-drink-demo',
    title: 'Sunburst Drink Pro',
    rows: [
      build('Flora', undefined, [
        build('Black Tea'),
        build('Floral', undefined, [build('Chamomile'), build('Rose'), build('Jasmine')]),
      ]),
      build('Fruity', undefined, [
        build('Berry', undefined, [build('Strawberry'), build('Raspberry')]),
        build('Citrus', undefined, [build('Lemon'), build('Orange')]),
      ]),
      build('Spiced', undefined, [build('Cinnamon'), build('Vanilla'), build('Ginger')]),
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createSunburstVisualMapData(): DataSet {
  const build = (name: string, value: number, children?: DataPoint[]): DataPoint => ({
    name,
    value,
    children,
  });
  return {
    id: 'sunburst-visualmap-demo',
    title: 'Sunburst VisualMap Pro',
    rows: [
      build('Grandpa', 0, [
        build('Uncle Leo', 0, [build('Cousin Jack', 2), build('Cousin Mary', 5), build('Cousin Ben', 4)]),
        build('Aunt Jane', 0, [build('Cousin Kate', 4)]),
        build('Father', 10, [build('Me', 5), build('Brother Peter', 1)]),
      ]),
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createSankeyGradientData(): DataSet {
  const nodes = ['Web', 'App', 'Retail', 'Online', 'Offline', 'Leads', 'Sales'];
  const rows: DataPoint[] = nodes.map((name) => ({ name, value: 0, group: 'node' }));
  rows.push(
    { name: 'link1', value: 120, group: 'link', meta: { source: 'Web', target: 'Online' } },
    { name: 'link2', value: 80, group: 'link', meta: { source: 'App', target: 'Online' } },
    { name: 'link3', value: 60, group: 'link', meta: { source: 'Retail', target: 'Offline' } },
    { name: 'link4', value: 90, group: 'link', meta: { source: 'Online', target: 'Leads' } },
    { name: 'link5', value: 50, group: 'link', meta: { source: 'Offline', target: 'Leads' } },
    { name: 'link6', value: 70, group: 'link', meta: { source: 'Leads', target: 'Sales' } }
  );
  return {
    id: 'sankey-gradient-demo',
    title: 'Sankey Gradient Pro',
    rows,
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createSankeyRightAlignData(): DataSet {
  const nodes = ['Tráfico', 'Paid', 'Social', 'Leads', 'Oportunidades', 'Ventas'];
  const rows: DataPoint[] = nodes.map((name) => ({ name, value: 0, group: 'node' }));
  rows.push(
    { name: 'l1', value: 200, group: 'link', meta: { source: 'Tráfico', target: 'Leads' } },
    { name: 'l2', value: 150, group: 'link', meta: { source: 'Paid', target: 'Leads' } },
    { name: 'l3', value: 100, group: 'link', meta: { source: 'Social', target: 'Leads' } },
    { name: 'l4', value: 280, group: 'link', meta: { source: 'Leads', target: 'Oportunidades' } },
    { name: 'l5', value: 120, group: 'link', meta: { source: 'Oportunidades', target: 'Ventas' } }
  );
  return {
    id: 'sankey-right-align-demo',
    title: 'Sankey Right Align Pro',
    rows,
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createPictorialHillData(): DataSet {
  return {
    id: 'pictorial-hill-demo',
    title: 'Pictorial Hill Pro',
    rows: [
      { name: 'Qomolangma', value: 8848 },
      { name: 'K2', value: 8611 },
      { name: 'Kangchenjunga', value: 8586 },
      { name: 'Lhotse', value: 8516 },
      { name: 'Makalu', value: 8485 },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createCustomCalendarIconData(): DataSet {
  const rows: DataPoint[] = [];
  for (let day = 1; day <= 31; day++) {
    const count = Math.floor(Math.random() * 4);
    const icons: number[] = [];
    for (let i = 0; i < count; i++) icons.push(Math.floor(Math.random() * 3));
    rows.push({
      name: `2017-03-${String(day).padStart(2, '0')}`,
      value: icons.length,
      meta: { icons },
    });
  }
  return {
    id: 'custom-calendar-icon-demo',
    title: 'Custom Calendar Icon Pro',
    rows,
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createCustomHexbinData(): DataSet {
  const rows: DataPoint[] = [];
  for (let i = 0; i < 300; i++) {
    rows.push({
      name: `p${i}`,
      value: 0,
      meta: { x: Math.random() * 100, y: Math.random() * 100 },
    });
  }
  return {
    id: 'custom-hexbin-demo',
    title: 'Custom Hexbin Pro',
    rows,
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createTreemapObamaData(): DataSet {
  const build = (name: string, values: number[], children?: DataPoint[]): DataPoint => ({
    name,
    value: values[0],
    meta: { values },
    children,
  });
  return {
    id: 'treemap-obama-demo',
    title: 'Treemap Obama Pro',
    rows: [
      build('Defensa', [700, 5], [build('Ejército', [400, 3]), build('Marina', [200, 8]), build('Aire', [100, -2])]),
      build('Salud', [900, 12], [build('Medicare', [500, 6]), build('Medicaid', [400, 15])]),
      build('Educación', [450, 4], [build('Primaria', [250, 2]), build('Secundaria', [200, 6])]),
      build('Infraestructura', [300, -3]),
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createCustomWindData(): DataSet {
  const rows: DataPoint[] = [];
  for (let x = 10; x <= 90; x += 15) {
    for (let y = 10; y <= 90; y += 15) {
      const angle = Math.random() * Math.PI * 2;
      const mag = 2 + Math.random() * 8;
      rows.push({
        name: `v${x}-${y}`,
        value: 0,
        meta: { x, y, vx: Math.cos(angle) * mag, vy: Math.sin(angle) * mag, mag },
      });
    }
  }
  return {
    id: 'custom-wind-demo',
    title: 'Custom Wind Pro',
    rows,
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createMorphTreemapData(): DataSet {
  const build = (name: string, value: number, children?: DataPoint[]): DataPoint => ({
    name,
    value,
    children,
  });
  return {
    id: 'morph-treemap-demo',
    title: 'Morph Treemap Pro',
    rows: [
      build('Producto', 1000, [
        build('Frontend', 400, [build('Web', 250), build('Móvil', 150)]),
        build('Backend', 350, [build('API', 200), build('DB', 150)]),
        build('UX', 250, [build('Research', 150), build('Diseño', 100)]),
      ]),
      build('Marketing', 700, [
        build('Paid', 300),
        build('Organic', 250),
        build('Email', 150),
      ]),
      build('Operaciones', 500, [build('Logística', 300), build('Soporte', 200)]),
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createGeoSvgEffectData(): DataSet {
  return {
    id: 'geo-svg-effect-demo',
    title: 'Geo SVG Effect Pro',
    rows: [
      { name: 'A', value: 100, meta: { x: 60, y: 60 } },
      { name: 'B', value: 60, meta: { x: 120, y: 80 } },
      { name: 'C', value: 80, meta: { x: 90, y: 130 } },
      { name: 'D', value: 40, meta: { x: 150, y: 140 } },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createCustomBarTrendData(): DataSet {
  const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
  const years = ['2021', '2022', '2023'];
  const rows: DataPoint[] = [];
  categories.forEach((cat) => {
    let val = 200 + Math.random() * 600;
    years.forEach((year) => {
      val = Math.max(50, val + (Math.random() - 0.4) * 200);
      rows.push({ name: cat, value: Math.round(val), group: year });
    });
  });
  return {
    id: 'custom-bar-trend-demo',
    title: 'Custom Bar Trend Pro',
    rows,
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value', seriesKey: 'group' },
  };
}

export function createCirclePackingData(): DataSet {
  const build = (name: string, value: number, children?: DataPoint[]): DataPoint => ({
    name,
    value,
    children,
  });
  return {
    id: 'circle-packing-demo',
    title: 'Circle Packing Pro',
    rows: [
      build('Empresa', 1000, [
        build('Digital', 400, [build('Web', 150), build('App', 120), build('Ecommerce', 130)]),
        build('Retail', 300, [build('Tiendas', 180), build('Franquicias', 120)]),
        build('B2B', 200, [build('Partners', 120), build('Mayoristas', 80)]),
        build('Nuevos', 100),
      ]),
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createSankeyLeftAlignData(): DataSet {
  const nodes = ['Orgánico', 'Paid', 'Social', 'Visitantes', 'Leads', 'Clientes'];
  const rows: DataPoint[] = nodes.map((name) => ({ name, value: 0, group: 'node' }));
  rows.push(
    { name: 'l1', value: 250, group: 'link', meta: { source: 'Orgánico', target: 'Visitantes' } },
    { name: 'l2', value: 180, group: 'link', meta: { source: 'Paid', target: 'Visitantes' } },
    { name: 'l3', value: 120, group: 'link', meta: { source: 'Social', target: 'Visitantes' } },
    { name: 'l4', value: 350, group: 'link', meta: { source: 'Visitantes', target: 'Leads' } },
    { name: 'l5', value: 140, group: 'link', meta: { source: 'Leads', target: 'Clientes' } }
  );
  return {
    id: 'sankey-left-align-demo',
    title: 'Sankey Left Align Pro',
    rows,
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createPictorialForestData(): DataSet {
  return {
    id: 'pictorial-forest-demo',
    title: 'Pictorial Forest Pro',
    rows: [
      { name: '2019', value: 120 },
      { name: '2020', value: 180 },
      { name: '2021', value: 260 },
      { name: '2022', value: 340 },
      { name: '2023', value: 420 },
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createChordStyleData(): DataSet {
  const nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const rows: DataPoint[] = nodes.map((name) => ({ name, value: 0, group: 'node' }));
  rows.push(
    { name: 'l1', value: 14, group: 'link', meta: { source: 'A', target: 'B' } },
    { name: 'l2', value: 8, group: 'link', meta: { source: 'A', target: 'C' } },
    { name: 'l3', value: 20, group: 'link', meta: { source: 'B', target: 'C' } },
    { name: 'l4', value: 15, group: 'link', meta: { source: 'B', target: 'E' } },
    { name: 'l5', value: 12, group: 'link', meta: { source: 'D', target: 'A' } },
    { name: 'l6', value: 15, group: 'link', meta: { source: 'E', target: 'A' } },
    { name: 'l7', value: 6, group: 'link', meta: { source: 'G', target: 'A' } }
  );
  return {
    id: 'chord-style-demo',
    title: 'Chord Style Pro',
    rows,
    schema: { dimensions: ['name', 'value', 'group'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createCustomPolarHeatmapData(): DataSet {
  const hours = Array.from({ length: 12 }, (_, i) => i);
  const days = [0, 1, 2, 3, 4, 5, 6];
  const rows: DataPoint[] = [];
  days.forEach((day) => {
    hours.forEach((hour) => {
      rows.push({
        name: `${day}-${hour}`,
        value: Math.floor(Math.random() * 100),
        meta: { day, hour },
      });
    });
  });
  return {
    id: 'custom-polar-heatmap-demo',
    title: 'Custom Polar Heatmap Pro',
    rows,
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createCalendarHeatmapData(): DataSet {
  const rows: DataPoint[] = [];
  const start = new Date('2016-01-01').getTime();
  const day = 24 * 60 * 60 * 1000;
  for (let i = 0; i < 365; i++) {
    const date = new Date(start + i * day);
    rows.push({
      name: date.toISOString().slice(0, 10),
      value: Math.floor(Math.random() * 10000),
      meta: { year: '2016' },
    });
  }
  return {
    id: 'calendar-heatmap-demo',
    title: 'Calendar Heatmap Pro',
    rows,
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
  };
}

export function createFlameGraphData(): DataSet {
  const build = (name: string, value: number, children?: DataPoint[]): DataPoint => ({
    name,
    value,
    children,
  });
  return {
    id: 'flame-graph-demo',
    title: 'Flame Graph Pro',
    rows: [
      build('Total', 1000, [
        build('App', 600, [
          build('Render', 250, [build('Components', 120), build('Styles', 80), build('Layout', 50)]),
          build('Logic', 200, [build('State', 120), build('Events', 80)]),
          build('Network', 150, [build('Fetch', 90), build('Cache', 60)]),
        ]),
        build('DB', 300, [
          build('Queries', 180, [build('Reads', 100), build('Writes', 80)]),
          build('Index', 120),
        ]),
        build('Infra', 100, [build('Logs', 60), build('Metrics', 40)]),
      ]),
    ],
    schema: { dimensions: ['name', 'value'], categoryKey: 'name', valueKey: 'value' },
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
    case 'executive-scorecard-pro':
      return createExecutiveScorecardData();
    case 'campaign-attribution-pro':
      return createCampaignAttributionData();
    case 'customer-journey-map-pro':
      return createCustomerJourneyData();
    case 'market-positioning-map-pro':
      return createMarketPositioningData();
    case 'portfolio-risk-matrix-pro':
      return createPortfolioRiskData();
    case 'sales-territory-ranking-pro':
      return createSalesTerritoryData();
    case 'product-lifecycle-pro':
      return createProductLifecycleData();
    case 'cohort-retention-pro':
      return createCohortRetentionData();
    case 'scenario-comparison-pro':
      return createScenarioComparisonData();
    case 'strategic-roadmap-pro':
      return createStrategicRoadmapData();
    case 'pareto-analysis-pro':
      return createParetoAnalysisData();
    case 'bullet-kpi-pro':
      return createBulletKpiData();
    case 'boxplot-benchmark-pro':
      return createBoxplotBenchmarkData();
    case 'candlestick-market-pro':
      return createCandlestickMarketData();
    case 'nightingale-segment-pro':
      return createNightingaleSegmentData();
    case 'stacked-area-trend-pro':
      return createStackedAreaTrendData();
    case 'pictorial-bar-pro':
      return createPictorialBarData();
    case 'radial-decision-tree-pro':
      return createRadialDecisionTreeData();
    case 'step-forecast-pro':
      return createStepForecastData();
    case 'polar-bar-pro':
      return createPolarBarData();
    case 'disk-treemap-pro':
      return createDiskTreemapData();
    case 'sunburst-drink-pro':
      return createSunburstDrinkData();
    case 'sunburst-visualmap-pro':
      return createSunburstVisualMapData();
    case 'sankey-gradient-pro':
      return createSankeyGradientData();
    case 'sankey-right-align-pro':
      return createSankeyRightAlignData();
    case 'pictorial-hill-pro':
      return createPictorialHillData();
    case 'custom-calendar-icon-pro':
      return createCustomCalendarIconData();
    case 'custom-hexbin-pro':
      return createCustomHexbinData();
    case 'treemap-obama-pro':
      return createTreemapObamaData();
    case 'custom-wind-pro':
      return createCustomWindData();
    case 'morph-treemap-pro':
      return createMorphTreemapData();
    case 'geo-svg-effect-pro':
      return createGeoSvgEffectData();
    case 'custom-bar-trend-pro':
      return createCustomBarTrendData();
    case 'circle-packing-pro':
      return createCirclePackingData();
    case 'sankey-left-align-pro':
      return createSankeyLeftAlignData();
    case 'pictorial-forest-pro':
      return createPictorialForestData();
    case 'chord-style-pro':
      return createChordStyleData();
    case 'custom-polar-heatmap-pro':
      return createCustomPolarHeatmapData();
    case 'calendar-heatmap-pro':
      return createCalendarHeatmapData();
    case 'flame-graph-pro':
      return createFlameGraphData();
    default:
      return createKpiData();
  }
}
