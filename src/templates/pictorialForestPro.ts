import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createPictorialForestData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const categories = rows.map((r) => r.name);
  const values = rows.map((r) => Number(r.value) || 0);

  return {
    tooltip: { trigger: 'axis' },
    grid: { top: '15%', left: '8%', right: '8%', bottom: '15%' },
    xAxis: {
      type: 'category',
      data: categories,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: ctx.theme.foreground, margin: 16 },
    },
    yAxis: {
      type: 'value',
      show: false,
      splitLine: { show: false },
    },
    series: [
      {
        type: 'pictorialBar',
        data: values,
        symbol: 'path://M25,90 Q35,10 50,90 T75,90 V100 H25 Z',
        symbolRepeat: true,
        symbolSize: ['60%', '18%'],
        symbolOffset: [0, 6],
        itemStyle: { color: ctx.theme.colors[0] },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}',
          color: ctx.theme.foreground,
          fontSize: 14,
        },
        animationEasing: 'elasticOut',
      } as any,
    ],
  };
}

export const pictorialForestPro: Template = {
  id: 'pictorial-forest-pro',
  name: 'Pictorial Forest Pro',
  description: 'Barras pictóricas con símbolo de árbol para mostrar crecimiento o cantidad.',
  category: 'Experimental',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createPictorialForestData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(pictorialForestPro);
