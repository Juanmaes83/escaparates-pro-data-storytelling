import type { ExportResult, AppState } from '../core/types';

export function exportEmbed(state: AppState, baseUrl = ''): ExportResult {
  const src = baseUrl ? `${baseUrl}?embed=1&template=${state.templateId}&theme=${state.themeId}` : window.location.href;
  const width = 800;
  const height = 480;

  const iframe = `<iframe
  src="${escapeHtml(src)}"
  width="${width}"
  height="${height}"
  frameborder="0"
  allowfullscreen
  title="${escapeHtml(state.data.title || 'Data Story')}">
</iframe>`;

  const script = `<div id="ep-ds-embed"></div>
<script>
  (function(){
    const iframe = document.createElement('iframe');
    iframe.src = '${escapeHtml(src)}';
    iframe.width = '${width}';
    iframe.height = '${height}';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    document.getElementById('ep-ds-embed').appendChild(iframe);
  })();
<\/script>`;

  const content = `<!-- iframe embed -->
${iframe}

<!-- script embed -->
${script}`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  return { format: 'embed', blob, content, filename: 'embed-code.txt' };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
