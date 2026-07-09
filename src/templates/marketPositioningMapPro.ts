import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createMarketPositioningData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const data = rows.map((r) => ({
    name: r.name,
    value: [Number(r.meta?.x) || 0, Number(r.meta?.y) || 0, Number(r.meta?.size) || 20, r.name],
    itemStyle: { color: r.name.includes('Nuestra') ? ctx.theme.colors[0] : ctx.theme.colors[2] },
  }));

  return {
    tooltip: {
      formatter: (params: any) => {
        const [x, y, size, name] = params.data.value;
        return `${name}<br/>Precio/Accesibilidad: ${x}<br/>Calidad/Valor: ${y}<br/>Peso: ${size}`;
      },
    },
    grid: { top: '15%', left: '10%', right: '10%', bottom: '12%' },
    xAxis: {
      type: 'value',
      name: 'Precio / Accesibilidad →',
      nameLocation: 'middle',
      nameGap: 28,
      min: 0,
      max: 100,
      nameTextStyle: { color: ctx.theme.foreground },
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    yAxis: {
      type: 'value',
      name: 'Calidad / Valor →',
      nameLocation: 'middle',
      nameGap: 40,
      min: 0,
      max: 100,
      nameTextStyle: { color: ctx.theme.foreground },
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    series: [
      {
        type: 'scatter',
        data,
        symbolSize: (d: any) => d[2],
        label: { show: true, formatter: (p: any) => p.data.value[3], position: 'top', color: ctx.theme.foreground },
        markLine: {
          silent: true,
          lineStyle: { type: 'dashed', color: ctx.theme.axis },
          data: [{ xAxis: 50 }, { yAxis: 50 }],
        },
      },
    ],
  };
}

export const marketPositioningMapPro: Template = {
  id: 'market-positioning-map-pro',
  name: 'Market Positioning Map Pro',
  description: 'Mapa competitivo de posicionamiento: precio/accesibilidad vs calidad/valor.',
  category: 'Strategy',
  buildOption,
  suggestedDimensions: ['name', 'x', 'y', 'size'],
  defaultData: createMarketPositioningData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(marketPositioningMapPro);
