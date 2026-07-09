import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createPictorialBarData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const categories = rows.map((r) => r.name);
  const values = rows.map((r) => Number(r.value) || 0);

  return {
    tooltip: { trigger: 'axis', formatter: '{b}: {c}%' },
    grid: { top: '10%', left: '22%', right: '10%', bottom: '8%' },
    xAxis: {
      type: 'value',
      max: 100,
      axisLabel: { formatter: '{value}%', color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    yAxis: {
      type: 'category',
      data: categories,
      axisLabel: { color: ctx.theme.foreground },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
      splitLine: { show: false },
    },
    series: [
      {
        type: 'pictorialBar',
        symbol: 'rect',
        symbolRepeat: 'fixed',
        symbolClip: true,
        symbolSize: [4, 12],
        symbolMargin: 2,
        data: values,
        itemStyle: { color: ctx.theme.colors[0], borderRadius: 1 },
        label: { show: true, position: 'right', formatter: '{c}%', color: ctx.theme.foreground },
      } as any,
    ],
  };
}

export const pictorialBarPro: Template = {
  id: 'pictorial-bar-pro',
  name: 'Pictorial Bar Pro',
  description: 'Barras pictóricas repetidas para representar proporciones con estilo editorial.',
  category: 'Marketing',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createPictorialBarData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(pictorialBarPro);
