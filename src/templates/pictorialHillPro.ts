import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createPictorialHillData } from '../data/demoData';

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
        symbol: 'path://M0,100 L50,0 L100,100 Z',
        symbolRepeat: true,
        symbolSize: ['80%', '18%'],
        symbolOffset: [0, 8],
        itemStyle: { color: ctx.theme.colors[0] },
        label: {
          show: true,
          position: 'top',
          formatter: '{c} m',
          color: ctx.theme.foreground,
          fontSize: 14,
        },
        animationEasing: 'elasticOut',
      } as any,
    ],
  };
}

export const pictorialHillPro: Template = {
  id: 'pictorial-hill-pro',
  name: 'Pictorial Hill Pro',
  description: 'Barras pictóricas en forma de montaña para comparar alturas o metas.',
  category: 'Marketing',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createPictorialHillData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(pictorialHillPro);
