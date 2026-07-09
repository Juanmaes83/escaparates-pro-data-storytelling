import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createProductLifecycleData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const products = rows.map((r) => r.name);
  const values = rows.map((r) => Number(r.value) || 0);
  const phases = ['Lanzamiento', 'Crecimiento', 'Madurez', 'Declive'];

  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: phases, bottom: 0, textStyle: { color: ctx.theme.foreground } },
    grid: { top: '15%', left: '8%', right: '6%', bottom: '15%' },
    xAxis: {
      type: 'category',
      data: products,
      axisLabel: { color: ctx.theme.foreground },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
    },
    yAxis: {
      type: 'value',
      name: 'Penetración / Volumen',
      nameTextStyle: { color: ctx.theme.foreground },
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    series: [
      {
        type: 'bar',
        data: values.map((v, i) => ({
          value: v,
          itemStyle: { color: phaseColor(String(rows[i].group), ctx.theme.colors) },
        })),
        barWidth: '45%',
        label: { show: true, position: 'top', color: ctx.theme.foreground },
      },
      {
        type: 'line',
        data: values,
        smooth: true,
        symbolSize: 8,
        lineStyle: { width: 3, color: ctx.theme.colors[0] },
      },
    ],
  };
}

function phaseColor(phase: string, colors: string[]): string {
  const map: Record<string, number> = { Lanzamiento: 3, Crecimiento: 2, Madurez: 0, Declive: 5 };
  return colors[map[phase] || 0] || colors[0];
}

export const productLifecyclePro: Template = {
  id: 'product-lifecycle-pro',
  name: 'Product Lifecycle Pro',
  description: 'Evolución de productos por fase: lanzamiento, crecimiento, madurez y declive.',
  category: 'Marketing',
  buildOption,
  suggestedDimensions: ['name', 'value', 'group'],
  defaultData: createProductLifecycleData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(productLifecyclePro);
