import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createExecutiveScorecardData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const data = rows.map((r) => ({
    name: r.name,
    value: Number(r.value) || 0,
    unit: r.group,
    target: Number(r.meta?.target) || 0,
    prev: Number(r.meta?.prev) || 0,
  }));

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any) => {
        const d = data[params[0].dataIndex];
        const variation = d.prev ? (((d.value - d.prev) / d.prev) * 100).toFixed(1) : '0.0';
        return `${d.name}<br/>Actual: ${d.value}${d.unit}<br/>Objetivo: ${d.target}${d.unit}<br/>Variación: ${variation}%`;
      },
    },
    grid: { top: '18%', left: '10%', right: '8%', bottom: '12%' },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.name),
      axisLabel: { color: ctx.theme.foreground, interval: 0, rotate: 18 },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    series: [
      {
        type: 'bar',
        data: data.map((d) => ({
          value: d.value,
          itemStyle: {
            color: d.value >= d.target ? ctx.theme.colors[2] : ctx.theme.colors[5] || '#ef4444',
          },
        })),
        barWidth: '45%',
        label: {
          show: true,
          position: 'top',
          color: ctx.theme.foreground,
          formatter: (p: any) => `${p.value}`,
        },
        markLine: {
          data: data.map((d, i) => ({ xAxis: i, yAxis: d.target, lineStyle: { color: ctx.theme.colors[0], type: 'dashed' } })),
          symbol: 'none',
          label: { show: false },
        },
      },
    ],
  };
}

export const executiveScorecardPro: Template = {
  id: 'executive-scorecard-pro',
  name: 'Executive Scorecard Pro',
  description: 'Resumen ejecutivo con KPIs, objetivos, variación y estado visual.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'value', 'target', 'prev'],
  defaultData: createExecutiveScorecardData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(executiveScorecardPro);
