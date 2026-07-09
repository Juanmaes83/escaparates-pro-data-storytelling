import type { ECharts } from 'echarts';
import type { ExportResult } from '../core/types';

export async function exportImage(chart: ECharts, format: 'png' | 'svg'): Promise<ExportResult> {
  const isSvg = format === 'svg';
  const url = chart.getDataURL({
    type: isSvg ? 'svg' : format,
    pixelRatio: isSvg ? 1 : 2,
    backgroundColor: '#ffffff',
  });

  if (isSvg) {
    const svg = atob(url.replace('data:image/svg+xml;base64,', ''));
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    return { format, blob, content: svg, filename: `chart.${format}` };
  }

  const res = await fetch(url);
  const blob = await res.blob();
  return { format, blob, url, filename: `chart.${format}` };
}

export function downloadResult(result: ExportResult) {
  const a = document.createElement('a');
  a.download = result.filename;
  a.href = result.url || URL.createObjectURL(result.blob!);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  if (!result.url && result.blob) URL.revokeObjectURL(a.href);
}
