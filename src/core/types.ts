import type { EChartsOption } from 'echarts';

export interface DataPoint {
  name: string;
  value: number | number[] | string;
  group?: string;
  meta?: Record<string, unknown>;
  children?: DataPoint[];
}

export interface DataSet {
  id: string;
  title: string;
  rows: DataPoint[];
  schema?: DataSchema;
}

export interface DataSchema {
  dimensions?: string[];
  valueKey?: string;
  categoryKey?: string;
  seriesKey?: string;
}

export interface Branding {
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  headline?: string;
  subheadline?: string;
}

export interface ThemeSpec {
  id: string;
  name: string;
  mode: 'dark' | 'light';
  colors: string[];
  background: string;
  foreground: string;
  grid: string;
  axis: string;
  fontFamily: string;
  echartsTheme?: Record<string, unknown>;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'decision' | 'business' | 'brand' | 'kpi' | 'gauge' | string;
  buildOption: (ctx: TemplateContext) => EChartsOption;
  suggestedDimensions: string[];
}

export interface TemplateContext {
  data: DataSet;
  theme: ThemeSpec;
  branding: Branding;
  outputPreset: OutputPreset;
}

export interface OutputPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  aspectRatio: string;
}

export interface AppState {
  templateId: string | null;
  data: DataSet;
  themeId: string;
  branding: Branding;
  outputPresetId: string;
  lastError: string | null;
  isReady: boolean;
}

export type IncomingMessageType =
  | 'EP_DS_INIT'
  | 'EP_DS_SET_TEMPLATE'
  | 'EP_DS_SET_DATA'
  | 'EP_DS_SET_THEME'
  | 'EP_DS_SET_BRANDING'
  | 'EP_DS_SET_OUTPUT_PRESET'
  | 'EP_DS_EXPORT';

export type OutgoingMessageType =
  | 'DS_READY'
  | 'DS_STATE_CHANGED'
  | 'DS_EXPORT_DONE'
  | 'DS_ERROR';

export interface IncomingMessage {
  type: IncomingMessageType;
  payload?: unknown;
}

export interface OutgoingMessage {
  type: OutgoingMessageType;
  payload?: unknown;
}

export type ExportFormat = 'png' | 'svg' | 'html' | 'embed' | 'json' | 'webm';

export interface ExportResult {
  format: ExportFormat;
  blob?: Blob;
  url?: string;
  content?: string;
  filename: string;
}

export type StateSubscriber = (state: AppState, prev: AppState) => void;
