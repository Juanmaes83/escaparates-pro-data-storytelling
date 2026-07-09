import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createCandlestickMarketData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const categories = rows.map((r) => r.name);
  const candleData = rows.map((r) => [
    Number(r.meta?.open) || 0,
    Number(r.meta?.close) || 0,
    Number(r.meta?.low) || 0,
    Number(r.meta?.high) || 0,
  ]);
  const volumes = rows.map((r) => Number(r.meta?.volume) || 0);

  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['Precio', 'Volumen'], textStyle: { color: ctx.theme.foreground } },
    grid: [
      { left: '10%', right: '8%', height: '55%' },
      { left: '10%', right: '8%', top: '72%', height: '18%' },
    ],
    xAxis: [
      {
        type: 'category',
        data: categories,
        axisLabel: { color: ctx.theme.foreground },
        axisLine: { lineStyle: { color: ctx.theme.axis } },
        splitLine: { show: false },
      },
      {
        type: 'category',
        data: categories,
        gridIndex: 1,
        axisLabel: { show: false },
        axisLine: { show: false },
      },
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        axisLabel: { color: ctx.theme.foreground },
        splitLine: { lineStyle: { color: ctx.theme.grid } },
      },
      {
        type: 'value',
        scale: true,
        gridIndex: 1,
        axisLabel: { color: ctx.theme.foreground },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        type: 'candlestick',
        data: candleData,
        itemStyle: {
          color: ctx.theme.colors[0],
          color0: ctx.theme.colors[2],
          borderColor: ctx.theme.colors[0],
          borderColor0: ctx.theme.colors[2],
        },
      } as any,
      {
        type: 'bar',
        data: volumes,
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: { color: ctx.theme.colors[1], borderRadius: [2, 2, 0, 0] },
      },
    ],
  };
}

export const candlestickMarketPro: Template = {
  id: 'candlestick-market-pro',
  name: 'Candlestick Market Pro',
  description: 'Velas de mercado con volumen para análisis financiero y de precios.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'open', 'close', 'low', 'high', 'volume'],
  defaultData: createCandlestickMarketData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(candlestickMarketPro);
