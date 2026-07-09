import type { ECharts } from 'echarts';
import type { AppState, ExportFormat, ExportResult } from '../core/types';
import { exportImage } from './exportImage';
import { exportHtml } from './exportHtml';
import { exportEmbed } from './exportEmbed';
import { exportConfig } from './exportConfig';
import { exportVideo } from './exportVideo';

export type ChartGetter = () => ECharts | null;

export async function runExport(
  format: ExportFormat,
  getChart: ChartGetter,
  state: AppState,
  baseUrl = ''
): Promise<ExportResult> {
  const chart = getChart();
  if (!chart) {
    throw new Error('No hay una instancia de gráfico activa para exportar.');
  }

  switch (format) {
    case 'png':
    case 'svg':
      return exportImage(chart, format);
    case 'html':
      return exportHtml(chart, state);
    case 'embed':
      return exportEmbed(state, baseUrl);
    case 'json':
      return exportConfig(state, chart);
    case 'webm':
      return exportVideo(chart);
    default:
      throw new Error(`Formato de exportación no soportado: ${String(format)}`);
  }
}
