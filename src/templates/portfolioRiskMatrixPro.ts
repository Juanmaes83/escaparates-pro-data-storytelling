import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createPortfolioRiskData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const data = rows.map((r) => ({
    name: r.name,
    value: [
      Number(r.meta?.riesgo) || 0,
      Number(r.meta?.retorno) || 0,
      Number(r.meta?.inversión) || 100,
      r.name,
    ],
  }));

  return {
    tooltip: {
      formatter: (params: any) => {
        const [riesgo, retorno, inversión, name] = params.data.value;
        return `${name}<br/>Riesgo: ${riesgo}<br/>Retorno esperado: ${retorno}<br/>Inversión: ${inversión}k€`;
      },
    },
    grid: { top: '15%', left: '10%', right: '10%', bottom: '12%' },
    xAxis: {
      type: 'value',
      name: 'Riesgo →',
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
      name: 'Retorno esperado →',
      nameLocation: 'middle',
      nameGap: 40,
      min: 0,
      max: 100,
      nameTextStyle: { color: ctx.theme.foreground },
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    visualMap: {
      min: 100,
      max: 1300,
      dimension: 2,
      orient: 'horizontal',
      left: 'center',
      bottom: '2%',
      textStyle: { color: ctx.theme.foreground },
      inRange: { symbolSize: [12, 48], color: [ctx.theme.colors[0], ctx.theme.colors[1]] },
    },
    series: [
      {
        type: 'scatter',
        data,
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

export const portfolioRiskMatrixPro: Template = {
  id: 'portfolio-risk-matrix-pro',
  name: 'Portfolio Risk Matrix Pro',
  description: 'Cartera de proyectos por riesgo, retorno esperado e inversión.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'riesgo', 'retorno', 'inversión'],
  defaultData: createPortfolioRiskData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(portfolioRiskMatrixPro);
