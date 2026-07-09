import type { ECharts } from 'echarts';
import type { ExportResult, AppState } from '../core/types';

export function exportConfig(state: AppState, chart?: ECharts): ExportResult {
  const option = chart?.getOption();
  const config = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    state,
    option,
  };
  const content = JSON.stringify(config, null, 2);
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
  return { format: 'json', blob, content, filename: 'data-story-config.json' };
}
