import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createCampaignAttributionData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const channels = [...new Set(rows.map((r) => r.name))];
  const leads = channels.map((c) => getValue(rows, c, 'Leads'));
  const roas = channels.map((c) => getValue(rows, c, 'ROAS'));
  const investment = channels.map((c) => getValue(rows, c, 'Inversión'));

  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['Leads', 'ROAS', 'Inversión'], bottom: 0, textStyle: { color: ctx.theme.foreground } },
    grid: { top: '18%', left: '8%', right: '8%', bottom: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: channels,
      axisLabel: { color: ctx.theme.foreground },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
    },
    yAxis: [
      { type: 'value', name: 'Leads', axisLabel: { color: ctx.theme.foreground }, splitLine: { lineStyle: { color: ctx.theme.grid } } },
      { type: 'value', name: 'ROAS / Inversión', axisLabel: { color: ctx.theme.foreground }, splitLine: { show: false } },
    ],
    series: [
      {
        type: 'bar',
        name: 'Leads',
        data: leads,
        itemStyle: { color: ctx.theme.colors[0] },
      },
      {
        type: 'line',
        name: 'ROAS',
        yAxisIndex: 1,
        data: roas,
        smooth: true,
        lineStyle: { width: 3, color: ctx.theme.colors[2] },
        symbolSize: 8,
      },
      {
        type: 'line',
        name: 'Inversión',
        yAxisIndex: 1,
        data: investment,
        smooth: true,
        lineStyle: { width: 3, type: 'dashed', color: ctx.theme.colors[1] },
        areaStyle: { opacity: 0.1 },
        symbolSize: 6,
      },
    ],
  };
}

function getValue(rows: any[], name: string, group: string): number {
  return Number(rows.find((r) => r.name === name && r.group === group)?.value) || 0;
}

export const campaignAttributionPro: Template = {
  id: 'campaign-attribution-pro',
  name: 'Campaign Attribution Pro',
  description: 'Atribución de canales: inversión, leads, conversiones y ROAS en una sola vista.',
  category: 'Marketing',
  buildOption,
  suggestedDimensions: ['name', 'value', 'group'],
  defaultData: createCampaignAttributionData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(campaignAttributionPro);
