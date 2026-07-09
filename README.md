# Escaparates Pro · Data Storytelling Studio

Módulo standalone de visualización de datos premium para Escaparates Pro. Renderiza gráficos profesionales con Apache ECharts, TypeScript y Vite. Sin frameworks de UI, sin backend.

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

## Templates incluidos (10)

### Business

- Business Treemap Pro
- KPI Dashboard Pro
- Funnel Story Pro
- Bubble Matrix Pro

### Marketing

- Brand Sunburst Pro
- Timeline Campaign Pro
- Heatmap Calendar Pro

### Strategy

- Decision Tree Pro
- Radar Benchmark Pro

### Experimental

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

### Seguridad

> **TODO:** `postMessage` usa `targetOrigin: '*'` durante el desarrollo. Restringir al dominio del parent en producción antes de desplegar.

## Exportaciones soportadas

- `png` — imagen PNG del canvas ECharts
- `svg` — SVG nativo (cuando el renderer lo permite)
- `html` — archivo HTML standalone con ECharts 6.1.0 desde CDN
- `embed` — código iframe/script para incrustar
- `json` — configuración completa del estado y la opción ECharts
- `webm` — video WebM vía `MediaRecorder` (depende del soporte del navegador)

## CI

El workflow `.github/workflows/ci.yml` ejecuta `npm ci` y `npm run build` en cada push y PR.

## Roadmap / Próximos packs sugeridos

- **Pack 02:** Geo map, network graph, sankey, candlestick, word cloud.
- **Pack 03:** Animaciones avanzadas, secuencias de export PNG, narración guiada.
- **Integración:** postMessage restringido, conector con `escaparates-pro`.

## Limitaciones

- WebM depende del soporte nativo del navegador.
- Bundle de ECharts completo (~1.1 MB). Code-splitting pendiente.
- PNG sequence no implementado.

## Licencia

MIT
