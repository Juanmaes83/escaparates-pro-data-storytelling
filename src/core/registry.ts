import type { Template, ThemeSpec, OutputPreset } from './types';

class Registry<T extends { id: string }> {
  private items = new Map<string, T>();

  register(item: T) {
    this.items.set(item.id, item);
  }

  get(id: string): T | undefined {
    return this.items.get(id);
  }

  list(): T[] {
    return Array.from(this.items.values());
  }

  has(id: string): boolean {
    return this.items.has(id);
  }
}

export const templateRegistry = new Registry<Template>();
export const themeRegistry = new Registry<ThemeSpec>();
export const presetRegistry = new Registry<OutputPreset>();
