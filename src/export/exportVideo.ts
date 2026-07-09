import type { ECharts } from 'echarts';
import type { ExportResult } from '../core/types';

export async function exportVideo(chart: ECharts, durationMs = 3000, fps = 30): Promise<ExportResult> {
  const dom = chart.getDom() as HTMLCanvasElement;
  if (!dom || !(dom instanceof HTMLCanvasElement)) {
    throw new Error('El contenedor del gráfico no es un canvas.');
  }

  const stream = dom.captureStream(fps);
  const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
  const chunks: Blob[] = [];

  return new Promise((resolve, reject) => {
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      resolve({ format: 'webm', blob, filename: 'chart.webm' });
    };
    recorder.onerror = () => reject(new Error('Error grabando WebM'));

    recorder.start();
    setTimeout(() => recorder.stop(), durationMs);
  });
}
