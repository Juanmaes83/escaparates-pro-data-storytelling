import type { DataSet, DataPoint } from '../core/types';
import { inferSchema, normalizeValue } from './normalizeData';

export function parseCSV(csv: string, title = 'Imported CSV'): DataSet {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) {
    return { id: `csv-${Date.now()}`, title, rows: [], schema: { dimensions: [] } };
  }

  const headers = splitLine(lines[0]);
  const rows: DataPoint[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cells = splitLine(lines[i]);
    const row: Record<string, unknown> = {};
    headers.forEach((h, idx) => {
      row[h] = cells[idx] ?? '';
    });

    const numericKey = findNumericKey(headers, row);
    const nameKey = headers.find((h) => h.toLowerCase().includes('name') || h.toLowerCase().includes('label') || h.toLowerCase().includes('category')) || headers[0];

    const point: DataPoint = {
      name: String(row[nameKey] ?? `Item ${i}`),
      value: numericKey ? normalizeValue(row[numericKey]) : 0,
    };
    if (numericKey && numericKey !== 'value') {
      point.meta = { raw: row };
    }
    rows.push(point);
  }

  return {
    id: `csv-${Date.now()}`,
    title,
    rows,
    schema: inferSchema(rows),
  };
}

function splitLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let insideQuotes = false;
  for (const char of line) {
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result.map((c) => c.replace(/^"|"$/g, ''));
}

function findNumericKey(headers: string[], row: Record<string, unknown>): string | undefined {
  return headers.find((h) => {
    const v = row[h];
    return typeof v === 'number' || (typeof v === 'string' && /^[\d\s.,+%\-]+$/.test(v) && !Number.isNaN(parseFloat(v.replace(/[^\d.\-]/g, ''))));
  });
}
