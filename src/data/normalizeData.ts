import type { DataSet, DataPoint, DataSchema } from '../core/types';

export function normalizeValue(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const cleaned = value.replace(/[^\d.\-]/g, '');
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

export function inferSchema(rows: DataPoint[]): DataSchema {
  if (rows.length === 0) return { dimensions: ['name', 'value'] };
  const keys = Object.keys(rows[0]).filter((k) => k !== 'meta' && k !== 'children');
  const numericKey = keys.find((k) => typeof rows[0][k as keyof DataPoint] === 'number') || 'value';
  const categoryKey = keys.find((k) => k !== numericKey) || 'name';
  return {
    dimensions: keys,
    valueKey: numericKey,
    categoryKey,
  };
}

export function normalizeDataSet(input: Partial<DataSet>): DataSet {
  const rows = Array.isArray(input.rows) ? input.rows : [];
  const schema = input.schema && input.schema.dimensions ? input.schema : inferSchema(rows);
  return {
    id: input.id || `ds-${Date.now()}`,
    title: input.title || 'Dataset',
    rows: rows.map((row) => ({
      ...row,
      value: row.value ?? normalizeValue(row.value),
    })),
    schema,
  };
}
