import { Runtime } from './core/runtime';
import { createState } from './core/state';
import { templateRegistry, themeRegistry, presetRegistry } from './core/registry';
import { registerThemePresets } from './themes/presets';
import { registerOutputPresets } from './core/outputPresets';
import { ParentBridge } from './bridge/parentBridge';
import { exportImage, downloadResult } from './export/exportImage';
import { exportVideo } from './export/exportVideo';
import { exportHtml } from './export/exportHtml';
import { exportEmbed } from './export/exportEmbed';
import { exportConfig } from './export/exportConfig';
import { parseCSV } from './data/csvParser';
import { normalizeDataSet } from './data/normalizeData';
import type { ExportFormat } from './core/types';

import './templates/decisionTreePro';
import './templates/businessTreemapPro';
import './templates/brandSunburstPro';
import './templates/kpiDashboardPro';
import './templates/gaugePackPro';
import './templates/funnelStoryPro';
import './templates/timelineCampaignPro';
import './templates/radarBenchmarkPro';
import './templates/bubbleMatrixPro';
import './templates/heatmapCalendarPro';
import './templates/sankeyFlowStoryPro';
import './templates/networkEcosystemPro';
import './templates/parallelBenchmarkPro';
import './templates/waterfallProfitBridgePro';
import './templates/themeRiverTrendPro';
import './templates/executiveScorecardPro';
import './templates/campaignAttributionPro';
import './templates/customerJourneyMapPro';
import './templates/marketPositioningMapPro';
import './templates/portfolioRiskMatrixPro';
import './templates/salesTerritoryRankingPro';
import './templates/productLifecyclePro';
import './templates/cohortRetentionPro';
import './templates/scenarioComparisonPro';
import './templates/strategicRoadmapPro';
import './templates/paretoAnalysisPro';
import './templates/bulletKpiPro';
import './templates/boxplotBenchmarkPro';
import './templates/candlestickMarketPro';
import './templates/nightingaleSegmentPro';
import './templates/stackedAreaTrendPro';
import './templates/pictorialBarPro';
import './templates/radialDecisionTreePro';
import './templates/stepForecastPro';
import './templates/polarBarPro';

const WEBM_SUPPORTED =
  typeof HTMLCanvasElement !== 'undefined' &&
  typeof HTMLCanvasElement.prototype.captureStream === 'function' &&
  typeof window !== 'undefined' &&
  typeof window.MediaRecorder === 'function';

export function initApp() {
  registerThemePresets();
  registerOutputPresets();

  const store = createState();
  const runtime = new Runtime(store);
  const bridge = new ParentBridge(store, { getChart: () => runtime.getChartInstance() });

  const root = document.getElementById('app');
  if (!root) throw new Error('Missing #app container');

  root.innerHTML = buildLayout();

  const chartContainer = document.getElementById('chart-stage') as HTMLElement;
  runtime.mount(chartContainer);

  bindUI(store, runtime);
  bridge.start();

  store.setTemplate('funnel-story-pro');
  store.setReady(true);

  window.addEventListener('resize', () => runtime.resize());

  return { store, runtime, bridge };
}

function buildLayout(): string {
  return `
    <div class="ep-ds-shell">
      <header class="ep-ds-topbar">
        <div class="ep-ds-brand">
          <span class="ep-ds-logo">Data Storytelling Studio</span>
          <span class="ep-ds-badge">Standalone MVP</span>
        </div>
        <div class="ep-ds-topbar-center">
          <label class="ep-ds-preset-label">
            <span>Output</span>
            <select id="preset-select" aria-label="Output preset"></select>
          </label>
        </div>
        <div class="ep-ds-exports">
          <button data-export="png" class="ep-ds-export-primary" title="Export PNG">PNG</button>
          <button data-export="svg" title="Export SVG">SVG</button>
          <button data-export="html" title="Export HTML">HTML</button>
          <button data-export="embed" title="Export embed code">Embed</button>
          <button data-export="json" title="Export config JSON">JSON</button>
          <button data-export="webm" class="ep-ds-export-webm" title="Export WebM">WebM</button>
        </div>
      </header>

      <main class="ep-ds-workspace">
        <aside class="ep-ds-panel ep-ds-panel-left">
          <div class="ep-ds-panel-header">
            <h3>Templates</h3>
            <span class="ep-ds-count" id="template-count">0</span>
          </div>
          <div id="template-list" class="ep-ds-list"></div>
        </aside>

        <section class="ep-ds-preview">
          <div class="ep-ds-canvas-frame">
            <div class="ep-ds-canvas-header">
              <div class="ep-ds-canvas-meta">
                <span id="active-template-name">No template selected</span>
                <span class="ep-ds-separator">·</span>
                <span id="active-preset-name">—</span>
                <span class="ep-ds-separator">·</span>
                <span id="active-theme-name">—</span>
              </div>
            </div>
            <div id="chart-stage" class="ep-ds-chart"></div>
          </div>
          <div id="error-bar" class="ep-ds-error" hidden></div>
        </section>

        <aside class="ep-ds-panel ep-ds-panel-right">
          <div class="ep-ds-panel-header">
            <h3>Studio Controls</h3>
          </div>

          <div class="ep-ds-control-section">
            <h4>Theme</h4>
            <label class="ep-ds-field">
              <span>Selected theme</span>
              <select id="theme-select"></select>
            </label>
          </div>

          <div class="ep-ds-control-section">
            <h4>Branding</h4>
            <label class="ep-ds-field">
              <span>Headline</span>
              <input id="headline-input" type="text" placeholder="Enter headline" />
            </label>
            <label class="ep-ds-field">
              <span>Subheadline</span>
              <input id="subheadline-input" type="text" placeholder="Enter subheadline" />
            </label>
            <div class="ep-ds-field-row">
              <label class="ep-ds-field">
                <span>Primary</span>
                <input id="primary-color" type="color" />
              </label>
              <label class="ep-ds-field">
                <span>Secondary</span>
                <input id="secondary-color" type="color" />
              </label>
            </div>
          </div>

          <div class="ep-ds-control-section">
            <h4>Data</h4>
            <label class="ep-ds-field">
              <span>Import CSV</span>
              <textarea id="csv-input" rows="6" placeholder="name,value\nAlpha,10\nBeta,20"></textarea>
              <small class="ep-ds-help">Paste two-column CSV and apply.</small>
            </label>
            <button id="apply-csv" class="ep-ds-btn-primary">Apply CSV</button>
          </div>

          <div class="ep-ds-control-section">
            <h4>Quick Export</h4>
            <div class="ep-ds-export-grid">
              <button data-export="png" class="ep-ds-btn-primary">PNG</button>
              <button data-export="html" class="ep-ds-btn-secondary">HTML</button>
              <button data-export="json" class="ep-ds-btn-secondary">JSON</button>
            </div>
          </div>
        </aside>
      </main>

      <footer class="ep-ds-statusbar">
        <div class="ep-ds-status-group">
          <span class="ep-ds-status-label">Template</span>
          <span id="status-template" class="ep-ds-status-value">—</span>
        </div>
        <div class="ep-ds-status-group">
          <span class="ep-ds-status-label">Render</span>
          <span id="status-render" class="ep-ds-status-value ep-ds-status-ok">Ready</span>
        </div>
        <div class="ep-ds-status-group">
          <span class="ep-ds-status-label">Last export</span>
          <span id="status-export" class="ep-ds-status-value">—</span>
        </div>
        <div class="ep-ds-status-group ep-ds-status-warning" id="webm-warning" hidden>
          <span>WebM export is not supported in this browser.</span>
        </div>
      </footer>
    </div>
  `;
}

function bindUI(store: ReturnType<typeof createState>, runtime: Runtime) {
  const templates = templateRegistry.list();
  const themes = themeRegistry.list();
  const presets = presetRegistry.list();

  const templateList = document.getElementById('template-list')!;
  const templateCount = document.getElementById('template-count')!;
  templateCount.textContent = String(templates.length);

  const categories = groupByCategory(templates);
  Object.keys(categories).forEach((category) => {
    const group = document.createElement('div');
    group.className = 'ep-ds-template-group';

    const heading = document.createElement('button');
    heading.className = 'ep-ds-template-group-title';
    heading.type = 'button';
    heading.innerHTML = `<span>${escapeHtml(category)}</span><span class="ep-ds-toggle">−</span>`;
    heading.addEventListener('click', () => {
      group.classList.toggle('collapsed');
      const toggle = heading.querySelector('.ep-ds-toggle');
      if (toggle) toggle.textContent = group.classList.contains('collapsed') ? '+' : '−';
    });
    group.appendChild(heading);

    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'ep-ds-template-items';
    group.appendChild(itemsContainer);

    categories[category].forEach((t) => {
      const el = document.createElement('button');
      el.className = 'ep-ds-template-item';
      el.dataset.id = t.id;
      el.innerHTML = `
        <span class="ep-ds-template-name">${escapeHtml(t.name)}</span>
        <span class="ep-ds-template-category">${escapeHtml(String(t.category))}</span>
        <span class="ep-ds-template-desc">${escapeHtml(t.description)}</span>
      `;
      el.addEventListener('click', () => store.setTemplate(t.id));
      itemsContainer.appendChild(el);
    });

    templateList.appendChild(group);
  });

  const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
  themes.forEach((t) => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.name;
    themeSelect.appendChild(opt);
  });
  themeSelect.addEventListener('change', () => store.setTheme(themeSelect.value));

  const presetSelect = document.getElementById('preset-select') as HTMLSelectElement;
  presets.forEach((p) => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.name} · ${p.aspectRatio}`;
    presetSelect.appendChild(opt);
  });
  presetSelect.addEventListener('change', () => store.setOutputPreset(presetSelect.value));

  const headlineInput = document.getElementById('headline-input') as HTMLInputElement;
  const subheadlineInput = document.getElementById('subheadline-input') as HTMLInputElement;
  const primaryColor = document.getElementById('primary-color') as HTMLInputElement;
  const secondaryColor = document.getElementById('secondary-color') as HTMLInputElement;

  headlineInput.addEventListener('input', () => store.setBranding({ headline: headlineInput.value }));
  subheadlineInput.addEventListener('input', () => store.setBranding({ subheadline: subheadlineInput.value }));
  primaryColor.addEventListener('input', () => store.setBranding({ primaryColor: primaryColor.value }));
  secondaryColor.addEventListener('input', () => store.setBranding({ secondaryColor: secondaryColor.value }));

  const csvInput = document.getElementById('csv-input') as HTMLTextAreaElement;
  document.getElementById('apply-csv')!.addEventListener('click', () => {
    try {
      const ds = parseCSV(csvInput.value);
      store.setData(normalizeDataSet(ds));
    } catch (err) {
      store.setError(err instanceof Error ? err.message : String(err));
    }
  });

  if (!WEBM_SUPPORTED) {
    const warning = document.getElementById('webm-warning');
    if (warning) warning.hidden = false;
  }

  document.querySelectorAll('[data-export]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const format = (btn as HTMLElement).dataset.export as ExportFormat;
      const chart = runtime.getChartInstance();
      if (!chart) return;
      try {
        const state = store.get();
        const template = state.templateId ? templateRegistry.get(state.templateId) : null;
        const caps = template?.exportCapabilities || ['png', 'svg', 'html', 'embed', 'json'];
        if (!caps.includes(format)) {
          throw new Error(`Format "${format}" is not supported by ${template?.name || 'this template'}.`);
        }

        let result;
        switch (format) {
          case 'png':
          case 'svg':
            result = await exportImage(chart, format);
            break;
          case 'html':
            result = exportHtml(chart, state);
            break;
          case 'embed':
            result = exportEmbed(state);
            break;
          case 'webm':
            result = await exportVideo(chart);
            break;
          case 'json':
          default:
            result = exportConfig(state, chart);
        }
        downloadResult(result);
        store.setLastExport({ format: result.format, filename: result.filename, at: new Date().toISOString() });
      } catch (err) {
        store.setError(err instanceof Error ? err.message : String(err));
      }
    });
  });

  store.subscribe((state) => {
    const errorBar = document.getElementById('error-bar')!;
    const statusRender = document.getElementById('status-render')!;
    if (state.lastError) {
      errorBar.textContent = state.lastError;
      errorBar.hidden = false;
      statusRender.textContent = 'Error';
      statusRender.className = 'ep-ds-status-value ep-ds-status-error';
    } else {
      errorBar.hidden = true;
      errorBar.textContent = '';
      statusRender.textContent = 'Ready';
      statusRender.className = 'ep-ds-status-value ep-ds-status-ok';
    }

    document.querySelectorAll('.ep-ds-template-item').forEach((el) => {
      el.classList.toggle('active', (el as HTMLElement).dataset.id === state.templateId);
    });

    if (themeSelect.value !== state.themeId) themeSelect.value = state.themeId;
    if (presetSelect.value !== state.outputPresetId) presetSelect.value = state.outputPresetId;
    headlineInput.value = state.branding.headline || '';
    subheadlineInput.value = state.branding.subheadline || '';
    primaryColor.value = state.branding.primaryColor || '#2563eb';
    secondaryColor.value = state.branding.secondaryColor || '#7c3aed';

    const activeTemplate = state.templateId ? templateRegistry.get(state.templateId) : null;
    const activeTheme = themeRegistry.get(state.themeId);
    const activePreset = presetRegistry.get(state.outputPresetId);

    document.getElementById('active-template-name')!.textContent = activeTemplate?.name || 'No template selected';
    document.getElementById('active-preset-name')!.textContent = activePreset?.name || '—';
    document.getElementById('active-theme-name')!.textContent = activeTheme?.name || '—';
    document.getElementById('status-template')!.textContent = activeTemplate?.name || '—';

    const statusExport = document.getElementById('status-export')!;
    if (state.lastExport) {
      statusExport.textContent = `${state.lastExport.format.toUpperCase()} · ${state.lastExport.filename}`;
    } else {
      statusExport.textContent = '—';
    }
  });
}

function groupByCategory<T extends { category: string }>(items: T[]): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const cat = item.category || 'Other';
    acc[cat] = acc[cat] || [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
