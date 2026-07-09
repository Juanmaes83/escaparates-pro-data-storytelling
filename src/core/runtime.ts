import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { StateStore } from './state';
import { templateRegistry, themeRegistry, presetRegistry } from './registry';
import { buildTheme } from '../themes/themeBuilder';
import { createDemoDataSet } from '../data/demoData';

export class Runtime {
  chart: ECharts | null = null;
  private store: StateStore;
  private unsubscribe: (() => void) | null = null;
  private isRendering = false;

  constructor(store: StateStore) {
    this.store = store;
  }

  mount(container: HTMLElement) {
    this.chart = echarts.init(container);
    this.unsubscribe = this.store.subscribe(() => this.render());
    this.render();
    return this.chart;
  }

  unmount() {
    this.unsubscribe?.();
    this.chart?.dispose();
    this.chart = null;
  }

  resize() {
    this.chart?.resize();
  }

  render() {
    if (!this.chart || this.isRendering) return;
    this.isRendering = true;

    try {
      const state = this.store.get();
      const template = state.templateId ? templateRegistry.get(state.templateId) : null;
      const theme = themeRegistry.get(state.themeId);
      const preset = presetRegistry.get(state.outputPresetId);

      if (!template || !theme || !preset) {
        this.chart.clear();
        return;
      }

      const data = state.data && state.data.rows.length ? state.data : createDemoDataSet(template.id);
      const echartsTheme = buildTheme(theme, state.branding);

      const option = template.buildOption({
        data,
        theme,
        branding: state.branding,
        outputPreset: preset,
      });

      const fullOption: EChartsOption = {
        backgroundColor: echartsTheme.backgroundColor,
        textStyle: { fontFamily: theme.fontFamily },
        title: {
          text: state.branding.headline || template.name,
          subtext: state.branding.subheadline,
          left: 'center',
          top: 12,
          textStyle: {
            color: echartsTheme.textStyle?.color || theme.foreground,
            fontSize: 20,
            fontWeight: 'bold',
          },
          subtextStyle: {
            color: echartsTheme.textStyle?.color || theme.foreground,
            fontSize: 13,
          },
        },
        ...option,
      };

      this.chart.setOption(fullOption, true);
      this.store.setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.store.setError(message);
    } finally {
      this.isRendering = false;
    }
  }

  getChartInstance(): ECharts | null {
    return this.chart;
  }
}
