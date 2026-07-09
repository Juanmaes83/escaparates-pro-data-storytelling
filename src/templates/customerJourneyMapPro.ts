import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createCustomerJourneyData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const stages = rows.map((r) => r.name);
  const values = rows.map((r) => Number(r.value) || 0);
  const pains = rows.map((r) => String(r.meta?.pain || ''));

  return {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const idx = params[0].dataIndex;
        return `${stages[idx]}<br/>Satisfacción: ${values[idx]}<br/>Punto de dolor: ${pains[idx]}`;
      },
    },
    grid: { top: '18%', left: '8%', right: '6%', bottom: '18%' },
    xAxis: {
      type: 'category',
      data: stages,
      axisLabel: { color: ctx.theme.foreground, interval: 0, rotate: 18 },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    series: [
      {
        type: 'line',
        data: values,
        smooth: true,
        symbolSize: 12,
        lineStyle: { width: 4, color: ctx.theme.colors[0] },
        areaStyle: { opacity: 0.25, color: ctx.theme.colors[0] },
        markLine: {
          data: [{ yAxis: 75, lineStyle: { color: ctx.theme.colors[2], type: 'dashed' }, label: { formatter: 'Target', color: ctx.theme.foreground } }],
        },
      },
    ],
  };
}

export const customerJourneyMapPro: Template = {
  id: 'customer-journey-map-pro',
  name: 'Customer Journey Map Pro',
  description: 'Journey del cliente por fases con satisfacción, puntos de dolor y oportunidades.',
  category: 'Strategy',
  buildOption,
  suggestedDimensions: ['name', 'value', 'pain'],
  defaultData: createCustomerJourneyData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(customerJourneyMapPro);
