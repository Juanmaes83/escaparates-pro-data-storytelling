# Escaparates Pro · Data Storytelling MVP

Módulo standalone de visualización de datos para Escaparates Pro. Renderiza gráficos profesionales con Apache ECharts, TypeScript y Vite. Sin frameworks de UI, sin backend.

## Stack

- Vite
- TypeScript
- Apache ECharts
- CSS propio

## Estructura

```
src/
  core/          Tipos, estado, registro y runtime de ECharts
  bridge/        Comunicación postMessage con el parent
  data/          Datos demo, normalización y parser CSV
  themes/        Presets, builder y tema de marca
  export/        PNG, SVG, HTML standalone, embed, WebM, JSON
  templates/     Templates ECharts profesionales
  app.ts         UI y layout
  main.ts        Punto de entrada
  styles/        CSS principal
```

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Templates incluidos

- Decision Tree Pro
- Business Treemap Pro
- Brand Sunburst Pro
- KPI Dashboard Pro
- Gauge Pack Pro

## Themes

- Luxury Dark
- Editorial Light
- Retail Pop
- Tech Blue
- Real Estate Premium

## API postMessage

### Entrada

- `EP_DS_INIT`
- `EP_DS_SET_TEMPLATE`
- `EP_DS_SET_DATA`
- `EP_DS_SET_THEME`
- `EP_DS_SET_BRANDING`
- `EP_DS_SET_OUTPUT_PRESET`
- `EP_DS_EXPORT`

### Salida

- `DS_READY`
- `DS_STATE_CHANGED`
- `DS_EXPORT_DONE`
- `DS_ERROR`

## Licencia

MIT
