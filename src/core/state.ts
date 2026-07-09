import type { AppState, DataSet, Branding, StateSubscriber } from './types';

export const defaultData: DataSet = {
  id: 'demo',
  title: 'Demo Dataset',
  rows: [],
  schema: { dimensions: ['name', 'value'] },
};

export const defaultBranding: Branding = {
  primaryColor: '#2563eb',
  secondaryColor: '#7c3aed',
  backgroundColor: '#0f172a',
  textColor: '#f8fafc',
  fontFamily: 'Inter, system-ui, sans-serif',
  headline: 'Data Story',
  subheadline: 'Visualización profesional',
};

export const initialState: AppState = {
  templateId: null,
  data: defaultData,
  themeId: 'luxury-dark',
  branding: defaultBranding,
  outputPresetId: 'web-landscape',
  lastError: null,
  isReady: false,
  lastExport: null,
};

export function createState(initial: AppState = initialState) {
  let state: AppState = { ...initial };
  const subscribers: StateSubscriber[] = [];

  function notify(prev: AppState) {
    subscribers.forEach((fn) => fn(state, prev));
  }

  return {
    get(): AppState {
      return { ...state };
    },
    subscribe(fn: StateSubscriber) {
      subscribers.push(fn);
      return () => {
        const idx = subscribers.indexOf(fn);
        if (idx >= 0) subscribers.splice(idx, 1);
      };
    },
    patch(partial: Partial<AppState>) {
      const prev = { ...state };
      state = { ...state, ...partial };
      notify(prev);
    },
    setData(data: DataSet) {
      const prev = { ...state };
      state = { ...state, data };
      notify(prev);
    },
    setTemplate(templateId: string | null) {
      const prev = { ...state };
      state = { ...state, templateId };
      notify(prev);
    },
    setTheme(themeId: string) {
      const prev = { ...state };
      state = { ...state, themeId };
      notify(prev);
    },
    setBranding(branding: Partial<Branding>) {
      const prev = { ...state };
      state = { ...state, branding: { ...state.branding, ...branding } };
      notify(prev);
    },
    setOutputPreset(outputPresetId: string) {
      const prev = { ...state };
      state = { ...state, outputPresetId };
      notify(prev);
    },
    setError(lastError: string | null) {
      const prev = { ...state };
      state = { ...state, lastError };
      notify(prev);
    },
    setReady(isReady: boolean) {
      const prev = { ...state };
      state = { ...state, isReady };
      notify(prev);
    },
    setLastExport(lastExport: AppState['lastExport']) {
      const prev = { ...state };
      state = { ...state, lastExport };
      notify(prev);
    },
  };
}

export type StateStore = ReturnType<typeof createState>;
