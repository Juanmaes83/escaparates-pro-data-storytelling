# Pack 03 QA Report · Premium Template Pack 03

## Comandos ejecutados

```bash
git checkout main
git fetch origin
git pull origin main
git checkout -b feature/premium-template-pack-03
npm ci
npm run build
npm run dev -- --host 127.0.0.1 --port 5173
node scripts/smoke-pack03.mjs
npm run build
```

## Series ECharts usadas en Pack 03

| Template | Series ECharts | Viable con ECharts 6.1.0 |
|---|---|---|
| Executive Scorecard Pro | `bar` + `markLine` | ✅ Sí |
| Campaign Attribution Pro | `bar` + `line` (dual axis) | ✅ Sí |
| Customer Journey Map Pro | `line` (smooth) + `markLine` | ✅ Sí |
| Market Positioning Map Pro | `scatter` | ✅ Sí |
| Portfolio Risk Matrix Pro | `scatter` + `visualMap` | ✅ Sí |
| Sales Territory Ranking Pro | `bar` + `echarts.graphic.LinearGradient` | ✅ Sí |
| Product Lifecycle Pro | `bar` + `line` | ✅ Sí |
| Cohort Retention Pro | `heatmap` | ✅ Sí |
| Scenario Comparison Pro | `bar` + `line` (dual axis) | ✅ Sí |
| Strategic Roadmap Pro | `custom` (Gantt-like) | ✅ Sí |

Todas las series están disponibles en el bundle estándar de Apache ECharts sin necesidad de ECharts GL ni dependencias adicionales.

## Templates añadidos (Pack 03)

| Template | Categoría | Descripción |
|---|---|---|
| Executive Scorecard Pro | Business | Resumen ejecutivo con KPIs, objetivos, variación y estado visual |
| Campaign Attribution Pro | Marketing | Atribución de canales: inversión, leads, conversiones y ROAS |
| Customer Journey Map Pro | Strategy | Journey del cliente por fases con satisfacción y puntos de dolor |
| Market Positioning Map Pro | Strategy | Mapa competitivo de posicionamiento precio/accesibilidad vs calidad/valor |
| Portfolio Risk Matrix Pro | Business | Cartera de proyectos por riesgo, retorno esperado e inversión |
| Sales Territory Ranking Pro | Business | Ranking territorial de ventas con barras horizontales ordenadas |
| Product Lifecycle Pro | Marketing | Evolución de productos por fase del ciclo de vida |
| Cohort Retention Pro | Business | Retención por cohortes y meses |
| Scenario Comparison Pro | Strategy | Comparación de escenarios conservador, base y agresivo |
| Strategic Roadmap Pro | Strategy | Roadmap de iniciativas con duración e impacto en formato Gantt |

**Total de templates en el producto: 25**

## Checklist funcional

| Check | Resultado |
|---|---|
| App carga con UI premium | ✅ PASS |
| 15 templates de Pack 01/02 siguen cargando | ✅ PASS |
| 10 templates de Pack 03 cargan | ✅ PASS |
| Categorías colapsables funcionan | ✅ PASS |
| Contador muestra 25 templates | ✅ PASS |
| Cambio de theme funciona | ✅ PASS |
| Cambio de output preset funciona | ✅ PASS |
| Branding funciona | ✅ PASS |
| CSV import no rompe la app | ✅ PASS |
| Export PNG funciona | ✅ PASS |
| Status bar muestra template activo | ✅ PASS |
| No hay errores de consola bloqueantes | ✅ PASS |
| UI usable con 25 templates | ✅ PASS |

**Resultado automatizado:** `passed: true, errors: []`

## Bugs corregidos durante el desarrollo

1. **`strategicRoadmapPro.ts`:** se eliminó la constante `quarters` sin usar y se renombró `params` a `_params` en `renderItem` para cumplir `noUnusedLocals`/`noUnusedParameters`.
2. **`salesTerritoryRankingPro.ts`:** se cambió `new (window as any).echarts.graphic.LinearGradient(...)` por `new echarts.graphic.LinearGradient(...)` importando `echarts` como módulo. El acceso a `window.echarts` fallaba en el bundle por módulo.

## Limitaciones

- WebM no fue verificado en Chrome desktop real; en entorno headless devuelve error controlado.
- El bundle sigue creciendo (~1.18 MB) por incluir ECharts completo.
- Algunos templates complejos (heatmap, custom Gantt, scatter con visualMap) pueden requerir ajustes de layout en pantallas muy pequeñas.
- Con 25 templates, el panel izquierdo usa categorías colapsables por defecto para mantener la navegación usable.

## Recomendaciones para Pack 04

1. Implementar code-splitting de ECharts por template o familia de templates.
2. Añadir animaciones guiadas y secuencias de export PNG.
3. Incluir validación de CSV según schema sugerido por cada template.
4. Explorar templates geo/map y posible integración futura con ECharts GL.
5. Restringir `targetOrigin` en producción.
