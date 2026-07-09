import type { ECharts } from 'echarts';
import type { ExportResult } from '../core/types';

export async function exportVideo(chart: ECharts, durationMs = 3000, fps = 30): Promise<ExportResult> {
  const dom = chart.getDom();
  const canvas = dom.querySelector('canvas') as HTMLCanvasElement | null;

  if (!canvas) {
    throw new Error('No se encontró un canvas interno en el gráfico. WebM requiere renderizado canvas.');
  }

  if (typeof HTMLCanvasElement.prototype.captureStream !== 'function') {
    throw new Error('Este navegador no soporta HTMLCanvasElement.captureStream(). No se puede exportar WebM.');
  }

  if (typeof window.MediaRecorder !== 'function') {
    throw new Error('Este navegador no soporta MediaRecorder. No se puede exportar WebM.');
  }

  const mimeType = selectMimeType();
  if (!mimeType) {
    throw new Error('No hay codec WebM soportado por MediaRecorder en este navegador.');
  }

  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, { mimeType });
  const chunks: Blob[] = [];

  return new Promise((resolve, reject) => {
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      resolve({ format: 'webm', blob, filename: 'chart.webm' });
    };
    recorder.onerror = (e) => reject(new Error(`Error grabando WebM: ${e instanceof Event ? 'MediaRecorder error' : String(e)}`));

    recorder.start();
    setTimeout(() => recorder.stop(), durationMs);
  });
}

function selectMimeType(): string | null {
  const candidates = [
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
  ];
  for (const type of candidates) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return null;
}
