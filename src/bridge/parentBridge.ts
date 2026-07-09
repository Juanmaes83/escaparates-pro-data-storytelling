import type { StateStore } from '../core/state';
import type { IncomingMessage, OutgoingMessage, DataSet, Branding, ExportFormat } from '../core/types';
import { templateRegistry, themeRegistry, presetRegistry } from '../core/registry';
import { normalizeDataSet } from '../data/normalizeData';
import { parseCSV } from '../data/csvParser';
import { runExport, type ChartGetter } from '../export/exportManager';

export interface ParentBridgeOptions {
  getChart: ChartGetter;
  baseUrl?: string;
}

export class ParentBridge {
  private store: StateStore;
  private target: Window;
  private getChart: ChartGetter;
  private baseUrl: string;

  constructor(store: StateStore, options: ParentBridgeOptions, target: Window = window.parent) {
    this.store = store;
    this.target = target;
    this.getChart = options.getChart;
    this.baseUrl = options.baseUrl || '';
  }

  start() {
    window.addEventListener('message', this.handleMessage);
    this.emit({ type: 'DS_READY', payload: { version: '1.0.0' } });
    this.store.subscribe((state, prev) => {
      if (JSON.stringify(state) !== JSON.stringify(prev)) {
        this.emit({ type: 'DS_STATE_CHANGED', payload: state });
      }
    });
  }

  stop() {
    window.removeEventListener('message', this.handleMessage);
  }

  private handleMessage = (event: MessageEvent<IncomingMessage>) => {
    const { type, payload } = event.data || {};
    if (!type || !type.startsWith('EP_DS_')) return;

    try {
      switch (type) {
        case 'EP_DS_INIT':
          this.handleInit(payload);
          break;
        case 'EP_DS_SET_TEMPLATE':
          this.setTemplate(String(payload));
          break;
        case 'EP_DS_SET_DATA':
          this.setData(payload as DataSet | string);
          break;
        case 'EP_DS_SET_THEME':
          this.setTheme(String(payload));
          break;
        case 'EP_DS_SET_BRANDING':
          this.setBranding(payload as Partial<Branding>);
          break;
        case 'EP_DS_SET_OUTPUT_PRESET':
          this.setOutputPreset(String(payload));
          break;
        case 'EP_DS_EXPORT':
          void this.handleExport(payload as ExportFormat | { format: ExportFormat; baseUrl?: string });
          break;
        default:
          this.emit({ type: 'DS_ERROR', payload: { message: `Unknown message type: ${type}` } });
      }
    } catch (err) {
      this.emit({ type: 'DS_ERROR', payload: { message: err instanceof Error ? err.message : String(err) } });
    }
  };

  private handleInit(payload: unknown) {
    const init = (payload || {}) as Record<string, unknown>;
    if (init.templateId) this.setTemplate(String(init.templateId));
    if (init.themeId) this.setTheme(String(init.themeId));
    if (init.outputPresetId) this.setOutputPreset(String(init.outputPresetId));
    if (init.branding) this.setBranding(init.branding as Partial<Branding>);
    if (init.data) this.setData(init.data as DataSet | string);
    this.store.setReady(true);
  }

  private async handleExport(payload: ExportFormat | { format: ExportFormat; baseUrl?: string }) {
    const format = typeof payload === 'string' ? payload : payload?.format;
    const baseUrl = typeof payload === 'string' ? this.baseUrl : payload?.baseUrl ?? this.baseUrl;

    if (!format) {
      throw new Error('EP_DS_EXPORT requiere un formato.');
    }

    const result = await runExport(format, this.getChart, this.store.get(), baseUrl);
    const summary: Record<string, unknown> = {
      format: result.format,
      filename: result.filename,
      size: result.blob?.size,
    };

    if (result.content) {
      summary.content = result.content;
    }

    this.emit({ type: 'DS_EXPORT_DONE', payload: summary });
  }

  private setTemplate(id: string) {
    if (!templateRegistry.has(id)) {
      throw new Error(`Template not found: ${id}`);
    }
    this.store.setTemplate(id);
  }

  private setData(raw: DataSet | string) {
    if (typeof raw === 'string') {
      this.store.setData(parseCSV(raw));
    } else {
      this.store.setData(normalizeDataSet(raw));
    }
  }

  private setTheme(id: string) {
    if (!themeRegistry.has(id)) {
      throw new Error(`Theme not found: ${id}`);
    }
    this.store.setTheme(id);
  }

  private setBranding(branding: Partial<Branding>) {
    this.store.setBranding(branding);
  }

  private setOutputPreset(id: string) {
    if (!presetRegistry.has(id)) {
      throw new Error(`Preset not found: ${id}`);
    }
    this.store.setOutputPreset(id);
  }

  private emit(message: OutgoingMessage) {
    // TODO: restrict targetOrigin in production.
    this.target.postMessage(message, '*');
  }
}
