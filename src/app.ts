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

import './templates/decisionTreePro';
import './templates/businessTreemapPro';
import './templates/brandSunburstPro';
import './templates/kpiDashboardPro';
import './templates/gaugePackPro';

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

  store.setTemplate('decision-tree-pro');
  store.setReady(true);

  window.addEventListener('resize', () => runtime.resize());

  return { store, runtime, bridge };
}

function buildLayout(): string {
  return `
    <div class="ep-ds-shell">
      <header class="ep-ds-topbar">
        <div class="ep-ds-brand">Data Storytelling Pro</div>
        <div class="ep-ds-presets">
          <select id="preset-select" aria-label="Output preset"></select>
        </div>
        <div class="ep-ds-exports">
          <button data-export="png">PNG</button>
          <button data-export="svg">SVG</button>
          <button data-export="html">HTML</button>
          <button data-export="embed">Embed</button>
          <button data-export="webm">WebM</button>
          <button data-export="json">JSON</button>
        </div>
      </header>
      <main class="ep-ds-workspace">
        <aside class="ep-ds-panel ep-ds-panel-left">
          <h3>Templates</h3>
          <div id="template-list" class="ep-ds-list"></div>
        </aside>
        <section class="ep-ds-preview">
          <div id="chart-stage" class="ep-ds-chart"></div>
          <div id="error-bar" class="ep-ds-error" hidden></div>
        </section>
        <aside class="ep-ds-panel ep-ds-panel-right">
          <h3>Controles</h3>
          <label>Theme
            <select id="theme-select"></select>
          </label>
          <label>Headline
            <input id="headline-input" type="text" placeholder="Headline" />
          </label>
          <label>Subheadline
            <input id="subheadline-input" type="text" placeholder="Subheadline" />
          </label>
          <label>Primary color
            <input id="primary-color" type="color" />
          </label>
          <label>Secondary color
            <input id="secondary-color" type="color" />
          </label>
          <label>CSV data
            <textarea id="csv-input" rows="8" placeholder="name,value\nA,10\nB,20"></textarea>
          </label>
          <button id="apply-csv">Aplicar CSV</button>
        </aside>
      </main>
    </div>
  `;
}

function bindUI(store: ReturnType<typeof createState>, runtime: Runtime) {
  const templates = templateRegistry.list();
  const themes = themeRegistry.list();
  const presets = presetRegistry.list();

  const templateList = document.getElementById('template-list')!;
  templates.forEach((t) => {
    const el = document.createElement('button');
    el.className = 'ep-ds-template-item';
    el.textContent = t.name;
    el.title = t.description;
    el.dataset.id = t.id;
    el.addEventListener('click', () => store.setTemplate(t.id));
    templateList.appendChild(el);
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
    opt.textContent = `${p.name} (${p.aspectRatio})`;
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

  document.querySelectorAll('[data-export]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const format = (btn as HTMLElement).dataset.export as 'png' | 'svg' | 'html' | 'embed' | 'webm' | 'json';
      const chart = runtime.getChartInstance();
      if (!chart) return;
      try {
        const state = store.get();
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
      } catch (err) {
        store.setError(err instanceof Error ? err.message : String(err));
      }
    });
  });

  store.subscribe((state) => {
    const errorBar = document.getElementById('error-bar')!;
    if (state.lastError) {
      errorBar.textContent = state.lastError;
      errorBar.hidden = false;
    } else {
      errorBar.hidden = true;
      errorBar.textContent = '';
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
  });
}
