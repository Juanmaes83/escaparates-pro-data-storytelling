import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createBubbleMatrixData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const data = rows.map((r) => {
    const meta = (r.meta || {}) as Record<string, number>;
    return [
      meta.impacto ?? Math.random() * 100,
      meta.esfuerzo ?? Math.random() * 100,
      Number(r.group) || 30,
      r.name,
    ];
  });

  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const [impacto, esfuerzo, tamaño, nombre] = params.data;
        return `${nombre}<br/>Impacto: ${impacto}<br/>Esfuerzo: ${esfuerzo}<br/>Prioridad: ${tamaño}`;
      },
    },
    grid: { top: '18%', left: '10%', right: '10%', bottom: '12%' },
    xAxis: {
      type: 'value',
      name: 'Impacto',
      nameTextStyle: { color: ctx.theme.foreground },
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    yAxis: {
      type: 'value',
      name: 'Esfuerzo',
      nameTextStyle: { color: ctx.theme.foreground },
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    series: [
      {
        type: 'scatter',
        data,
        symbolSize: (d: any) => Math.max(12, Math.min(60, d[2])),
        itemStyle: { opacity: 0.85, borderColor: ctx.theme.background, borderWidth: 1 },
        label: { show: true, formatter: (p: any) => p.data[3], position: 'top', color: ctx.theme.foreground },
      } as any,
    ],
  };
}

export const bubbleMatrixPro: Template = {
  id: 'bubble-matrix-pro',
  name: 'Bubble Matrix Pro',
  description: 'Matriz de priorización con burbujas de impacto/esfuerzo o inversión/retorno.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'value', 'group'],
  defaultData: createBubbleMatrixData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(bubbleMatrixPro);
