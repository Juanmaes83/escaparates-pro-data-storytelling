import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createFunnelStoryData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const rows = ctx.data.rows;
  const total = Number(rows[0]?.value) || 1;
  const data = rows.map((r) => ({ name: r.name, value: Number(r.value) || 0 }));

  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const val = params.value;
        const conversion = ((val / total) * 100).toFixed(1);
        return `${params.name}<br/>Valor: ${val.toLocaleString()}<br/>Conversión total: ${conversion}%`;
      },
    },
    series: [
      {
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 40,
        width: '80%',
        min: 0,
        max: total,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside',
          formatter: '{b}\n{c}\n({d}%)',
          color: '#fff',
        },
        itemStyle: {
          borderColor: ctx.theme.background,
          borderWidth: 1,
        },
        emphasis: {
          label: { fontSize: 16 },
        },
        data,
      } as any,
    ],
  };
}

export const funnelStoryPro: Template = {
  id: 'funnel-story-pro',
  name: 'Funnel Story Pro',
  description: 'Embudo de conversión comercial con etapas, valores y caída porcentual.',
  category: 'Business',
  buildOption,
  suggestedDimensions: ['name', 'value'],
  defaultData: createFunnelStoryData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(funnelStoryPro);
