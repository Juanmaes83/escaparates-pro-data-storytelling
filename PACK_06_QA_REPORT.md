# Pack 06 QA Report · Premium Template Pack 06

## Comandos ejecutados

```bash
git checkout main
git fetch origin
git pull origin main
git checkout -b feature/premium-template-pack-06
npm ci
npm run build
npm run dev -- --host 127.0.0.1 --port 5176 --strictPort
STUDIO_URL=http://127.0.0.1:5176 node scripts/smoke-pack06.mjs
npm run build
```

## Templates añadidos (Pack 06)

Se completaron los ejemplos pendientes del pack anterior y se añadieron nuevos visuales avanzados de la lista compartida. Se descartaron duplicados (`themeRiver-basic` ya existe como `Theme River Trend Pro`) y ejemplos GL que requieren `echarts-gl` (quedan para Pack 08).

| Template | Ejemplo base | Categoría | Descripción |
|---|---|---|---|
| Morph Treemap Pro | `treemap-sunburst-transition` | Experimental | Transición automática entre treemap y sunburst |
| Geo SVG Effect Pro | `geo-svg-custom-effect` | Experimental | Mapa SVG ligero con ondas y marcadores |
| Custom Bar Trend Pro | `custom-bar-trend` | Business | Barras agrupadas con línea de tendencia personalizada |
| Circle Packing Pro | `circle-packing-with-d3` | Strategy | Empaquetado circular sin D3, usando graph force |
| Sankey Left Align Pro | `sankey-nodeAlign-left` | Business | Sankey con alineación a la izquierda |
| Pictorial Forest Pro | `pictorialBar-forest` | Experimental | Barras pictóricas con símbolo de árbol |
| Chord Style Pro | `chord-style` | Strategy | Diagrama de cuerdas con estilo personalizado |
| Custom Polar Heatmap Pro | `custom-polar-heatmap` | Experimental | Heatmap polar con sectores personalizados |
| Calendar Heatmap Pro | `calendar-heatmap` | Experimental | Mapa de calor sobre calendario anual |
| Flame Graph Pro | `flame-graph` | Strategy | Flame graph de jerarquías de consumo/tiempo |

**Total de templates en el producto: 55**

## Checklist funcional

| Check | Resultado |
|---|---|
| App carga con UI premium | ✅ PASS |
| 45 templates de packs anteriores siguen cargando | ✅ PASS |
| 10 templates de Pack 06 cargan | ✅ PASS |
| Categorías colapsables funcionan | ✅ PASS |
| Contador muestra 55 templates | ✅ PASS |
| Cambio de theme funciona | ✅ PASS |
| Cambio de output preset funciona | ✅ PASS |
| Branding funciona | ✅ PASS |
| CSV import no rompe la app | ✅ PASS |
| Export PNG funciona | ✅ PASS |
| Status bar muestra template activo | ✅ PASS |
| No hay errores de consola bloqueantes | ✅ PASS |
| UI usable con 55 templates | ✅ PASS |

**Resultado automatizado:** `passed: true, errors: []`

## Bugs corregidos durante el desarrollo

1. **`calendarHeatmapPro.ts`, `customBarTrendPro.ts`, `customPolarHeatmapPro.ts`:** se eliminaron importaciones sin usar de `echarts`.
2. **`flameGraphPro.ts`:** se eliminó el tipo `DataPoint` importado pero no usado.

## Ejemplos no incluidos en este pack

- **GL (requieren `echarts-gl`):** `globe-echarts-gl-hello-world`, `globe-atmosphere`, `animating-contour-on-globe`, `iron-globe`, `image-to-bar3d`.
- **Pictorial variations:** `pictorialBar-body-fill`, `pictorialBar-velocity`.
- **Calendar variations:** `calendar-vertical`, `calendar-pie`.
- **Otros avanzados:** `matrix-sparkline`, `matrix-mini-bar-geo`, `treemap-drill-down`, `chord-lineStyle-color`, `custom-spiral-race` (muy complejo para el scope actual).

Estos quedan como candidatos para Pack 07/Pack 08.

## Limitaciones

- WebM no fue verificado en Chrome desktop real; en entorno headless devuelve error controlado.
- El bundle sigue creciendo (~1.23 MB) por incluir ECharts completo.
- Algunos templates complejos (chord, flame graph, polar heatmap, calendario) pueden requerir ajustes de layout en pantallas muy pequeñas.
- Con 55 templates, las categorías colapsables son imprescindibles.

## Recomendaciones para Pack 07

1. Implementar code-splitting de ECharts por template o familia de templates.
2. Añadir animaciones guiadas y secuencias de export PNG.
3. Incluir validación de CSV según schema sugerido por cada template.
4. Explorar geo map real con SVG/GeoJSON inline ligero.
5. Evaluar la incorporación de `echarts-gl` para globos y visualizaciones 3D.
6. Restringir `targetOrigin` en producción.
