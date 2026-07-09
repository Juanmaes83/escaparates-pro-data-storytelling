import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows.slice(0, 4);
  const count = rows.length || 1;
  const width = 90 / count;

  const series = rows.map((row, idx) => {
    const val = Number(row.value) || 0;
    const left = 5 + idx * width;
    return {
      type: 'gauge',
      center: [`${left + width / 2}%`, '55%'],
      radius: '65%',
      min: 0,
      max: 100,
      startAngle: 210,
      endAngle: -30,
      splitNumber: 5,
      itemStyle: { color: ctx.theme.colors[idx % ctx.theme.colors.length] },
      progress: { show: true, width: 12 },
      pointer: { show: false },
      axisLine: { lineStyle: { width: 12, color: [[1, ctx.theme.grid]] } },
      axisTick: { show: false },
      splitLine: { length: 8, lineStyle: { width: 2, color: ctx.theme.axis } },
      axisLabel: { distance: 14, color: ctx.theme.foreground, fontSize: 10 },
      title: { offsetCenter: [0, '30%'], color: ctx.theme.foreground, fontSize: 12 },
      detail: {
        valueAnimation: true,
        fontSize: 22,
        offsetCenter: [0, '-10%'],
        formatter: '{value}',
        color: ctx.theme.foreground,
      },
      data: [{ value: val, name: row.name }],
    };
  });

  return { series: series as any };
}

export const gaugePackPro: Template = {
  id: 'gauge-pack-pro',
  name: 'Gauge Pack Pro',
  description: 'Hasta 4 gauges de rendimiento con estilo premium.',
  category: 'gauge',
  buildOption,
  suggestedDimensions: ['name', 'value'],
};

templateRegistry.register(gaugePackPro);
