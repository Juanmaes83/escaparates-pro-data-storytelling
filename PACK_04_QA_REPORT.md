# Pack 04 QA Report · Premium Template Pack 04

## Comandos ejecutados

```bash
git checkout main
git fetch origin
git pull origin main
git checkout -b feature/premium-template-pack-04
npm ci
npm run build
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
STUDIO_URL=http://127.0.0.1:5174 node scripts/smoke-pack04.mjs
npm run build
```

## Series ECharts usadas en Pack 04

| Template | Series ECharts | Viable con ECharts 6.1.0 |
|---|---|---|
| Pareto Analysis Pro | `bar` + `line` (dual axis) | ✅ Sí |
| Bullet KPI Pro | `bar` + `markLine` + `markArea` | ✅ Sí |
| Boxplot Benchmark Pro | `boxplot` | ✅ Sí |
| Candlestick Market Pro | `candlestick` + `bar` | ✅ Sí |
| Nightingale Segment Pro | `pie` (`roseType: 'area'`) | ✅ Sí |
| Stacked Area Trend Pro | `line` (`areaStyle` + `stack`) | ✅ Sí |
| Pictorial Bar Pro | `pictorialBar` | ✅ Sí |
| Radial Decision Tree Pro | `tree` (`layout: 'radial'`) | ✅ Sí |
| Step Forecast Pro | `line` (`step: 'middle'`) | ✅ Sí |
| Polar Bar Pro | `bar` (`coordinateSystem: 'polar'`) | ✅ Sí |

Todas las series están disponibles en el bundle estándar de Apache ECharts sin necesidad de ECharts GL ni dependencias adicionales.

## Templates añadidos (Pack 04)

| Template | Categoría | Descripción |
|---|---|---|
| Pareto Analysis Pro | Business | Análisis Pareto con barras ordenadas y curva acumulada |
| Bullet KPI Pro | Business | KPI con valor actual, target y bandas cualitativas |
| Boxplot Benchmark Pro | Business | Distribución y dispersión por categoría con boxplots |
| Candlestick Market Pro | Business | Velas de mercado con volumen |
| Nightingale Segment Pro | Marketing | Segmentación en rosa de Nightingale |
| Stacked Area Trend Pro | Marketing | Evolución temporal en áreas apiladas |
| Pictorial Bar Pro | Marketing | Barras pictóricas para proporciones editoriales |
| Radial Decision Tree Pro | Strategy | Árbol de decisiones en layout radial |
| Step Forecast Pro | Strategy | Serie escalonada con zona de pronóstico |
| Polar Bar Pro | Experimental | Barras en coordenadas polares |

**Total de templates en el producto: 35**

## Checklist funcional

| Check | Resultado |
|---|---|
| App carga con UI premium | ✅ PASS |
| 25 templates de packs anteriores siguen cargando | ✅ PASS |
| 10 templates de Pack 04 cargan | ✅ PASS |
| Categorías colapsables funcionan | ✅ PASS |
| Contador muestra 35 templates | ✅ PASS |
| Cambio de theme funciona | ✅ PASS |
| Cambio de output preset funciona | ✅ PASS |
| Branding funciona | ✅ PASS |
| CSV import no rompe la app | ✅ PASS |
| Export PNG funciona | ✅ PASS |
| Status bar muestra template activo | ✅ PASS |
| No hay errores de consola bloqueantes | ✅ PASS |
| UI usable con 35 templates | ✅ PASS |

**Resultado automatizado:** `passed: true, errors: []`

## Bugs corregidos durante el desarrollo

1. **`stackedAreaTrendPro.ts`:** `seriesNames` obtenido de `Set<rows.group>` tenía tipo `(string \| undefined)[]`, incompatible con la propiedad `legend.data`. Se añadió cast a `string[]`.

## Limitaciones

- WebM no fue verificado en Chrome desktop real; en entorno headless devuelve error controlado.
- El bundle sigue creciendo (~1.20 MB) por incluir ECharts completo.
- Algunos templates complejos (boxplot, candlestick, tree radial, polar) pueden requerir ajustes de layout en pantallas muy pequeñas.
- Con 35 templates, las categorías colapsables son imprescindibles para mantener la navegación usable.

## Recomendaciones para Pack 05

1. Implementar code-splitting de ECharts por template o familia de templates.
2. Añadir animaciones guiadas y secuencias de export PNG.
3. Incluir validación de CSV según schema sugerido por cada template.
4. Explorar templates geo/map y posible integración futura con ECharts GL.
5. Restringir `targetOrigin` en producción.
