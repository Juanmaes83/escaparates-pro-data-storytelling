import type { ECharts } from 'echarts';
import type { ExportResult, AppState } from '../core/types';

const ECHARTS_CDN_VERSION = '6.1.0';

export function exportHtml(chart: ECharts, state: AppState): ExportResult {
  const option = chart.getOption();
  const configJson = JSON.stringify({ state, option }, null, 2);
  const width = '100%';
  const height = '480px';

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(state.data.title || 'Data Story')}</title>
  <script src="https://cdn.jsdelivr.net/npm/echarts@${ECHARTS_CDN_VERSION}/dist/echarts.min.js"><\/script>
  <style>
    body { margin:0; background:${escapeHtml(state.branding.backgroundColor || '#0f172a')}; color:${escapeHtml(state.branding.textColor || '#f8fafc')}; font-family:${escapeHtml(state.branding.fontFamily || 'sans-serif')}; }
    #chart { width:${width}; height:${height}; }
  </style>
</head>
<body>
  <div id="chart"></div>
  <script>
    const config = ${configJson};
    const chart = echarts.init(document.getElementById('chart'));
    chart.setOption(config.option);
    window.addEventListener('resize', () => chart.resize());
  <\/script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  return { format: 'html', blob, content: html, filename: 'chart.html' };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
