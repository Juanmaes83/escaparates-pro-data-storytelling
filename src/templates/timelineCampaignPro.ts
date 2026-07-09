import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createTimelineCampaignData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const dates = rows.map((r) => String(r.group));
  const values = rows.map((r) => Number(r.value) || 0);

  return {
    tooltip: { trigger: 'axis' },
    grid: { top: '20%', left: '8%', right: '6%', bottom: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: dates,
      axisLabel: { color: ctx.theme.foreground, rotate: 20 },
      axisLine: { lineStyle: { color: ctx.theme.axis } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: ctx.theme.foreground },
      splitLine: { lineStyle: { color: ctx.theme.grid } },
    },
    series: [
      {
        type: 'line',
        data: values,
        smooth: true,
        symbolSize: 10,
        lineStyle: { width: 4 },
        areaStyle: { opacity: 0.25 },
        itemStyle: { borderRadius: 8 },
        markPoint: {
          data: [
            { type: 'max', name: 'Pico' },
            { type: 'min', name: 'Mínimo' },
          ],
        },
      },
    ],
  };
}

export const timelineCampaignPro: Template = {
  id: 'timeline-campaign-pro',
  name: 'Timeline Campaign Pro',
  description: 'Evolución de campaña con hitos, inversión y resultados en línea temporal.',
  category: 'Marketing',
  buildOption,
  suggestedDimensions: ['name', 'value', 'group'],
  defaultData: createTimelineCampaignData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(timelineCampaignPro);
