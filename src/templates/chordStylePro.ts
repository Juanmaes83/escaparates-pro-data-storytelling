import type { EChartsOption } from 'echarts';
import type { Template, TemplateContext } from '../core/types';
import { templateRegistry } from '../core/registry';
import { createChordStyleData } from '../data/demoData';

function buildOption(ctx: TemplateContext): EChartsOption {
  const nodes = ctx.data.rows
    .filter((r) => r.group === 'node')
    .map((r, i) => ({
      name: r.name,
      itemStyle: { color: ctx.theme.colors[i % ctx.theme.colors.length] },
    }));

  const links = ctx.data.rows
    .filter((r) => r.group === 'link')
    .map((r) => ({
      source: String(r.meta?.source),
      target: String(r.meta?.target),
      value: Number(r.value) || 0,
    }));

  return {
    tooltip: {},
    series: [
      {
        type: 'chord',
        padAngle: 1,
        center: ['50%', '48%'],
        radius: ['55%', '70%'],
        data: nodes,
        links,
        itemStyle: { borderRadius: [0, 8], borderWidth: 2, borderColor: '#fff' },
        lineStyle: { opacity: 0.4, color: 'gradient' },
        emphasis: { focus: 'self' },
        label: { show: true, position: 'inside', color: '#fff', fontWeight: 'bold' },
      } as any,
    ],
  };
}

export const chordStylePro: Template = {
  id: 'chord-style-pro',
  name: 'Chord Style Pro',
  description: 'Diagrama de cuerdas con estilo personalizado y degradados en los enlaces.',
  category: 'Strategy',
  buildOption,
  suggestedDimensions: ['name', 'value', 'source', 'target'],
  defaultData: createChordStyleData,
  exportCapabilities: ['png', 'svg', 'html', 'embed', 'json'],
};

templateRegistry.register(chordStylePro);
