# Pack 02 QA Report · Premium Template Pack 02

## Comandos ejecutados

```bash
git checkout main
git fetch origin
git pull origin main
git checkout -b feature/premium-template-pack-02
npm ci
npm run build
npm run dev -- --host 127.0.0.1 --port 5173
node scripts/qa-smoke.mjs
npm run build
```

## Series ECharts usadas en Pack 02

| Template | Series ECharts | Viable con ECharts 6.1.0 |
|---|---|---|
| Sankey Flow Story Pro | `sankey` | ✅ Sí |
| Network Ecosystem Pro | `graph` (force layout) | ✅ Sí |
| Parallel Benchmark Pro | `parallel` | ✅ Sí |
| Waterfall Profit Bridge Pro | `bar` (stacked waterfall) | ✅ Sí |
| Theme River Trend Pro | `themeRiver` | ✅ Sí |

Todas las series están disponibles en el bundle estándar de Apache ECharts sin necesidad de ECharts GL ni dependencias adicionales.

## Templates añadidos (Pack 02)

| Template | Categoría | Descripción |
|---|---|---|
| Sankey Flow Story Pro | Business | Flujos comerciales: tráfico → leads → oportunidades → ventas |
| Network Ecosystem Pro | Strategy | Mapa de ecosistema con nodos, categorías y enlaces por fuerza |
| Parallel Benchmark Pro | Strategy | Comparación multientidad en múltiples dimensiones |
| Waterfall Profit Bridge Pro | Business | Bridge financiero de ingresos, costes y margen final |
| Theme River Trend Pro | Marketing | Evolución temporal de canales o categorías |

**Total de templates en el producto: 15**

## Checklist funcional

| Check | Resultado |
|---|---|
| App carga con UI premium | ✅ PASS |
| 10 templates de Pack 01 siguen cargando | ✅ PASS |
| 5 templates de Pack 02 cargan | ✅ PASS |
| Cambio de theme funciona | ✅ PASS |
| Cambio de output preset funciona | ✅ PASS |
| Branding funciona | ✅ PASS |
| CSV import no rompe la app | ✅ PASS |
| Export PNG funciona | ✅ PASS |
| Export HTML funciona | ✅ PASS |
| Export JSON funciona | ✅ PASS |
| Contador muestra 15 templates | ✅ PASS |
| Status bar muestra template activo | ✅ PASS |
| No hay errores de consola bloqueantes | ✅ PASS |
| UI usable con 15 templates | ✅ PASS |

**Resultado automatizado:** `25 passed, 0 failed`

## Bugs corregidos durante el desarrollo

1. **`themeRiverTrendPro.ts`:** se eliminó `axisDivider` (no soportado en `singleAxis`) y una variable `categories` sin usar.
2. **`waterfallProfitBridgePro.ts`:** se corrigió el tipo del tooltip `formatter` y se eliminó una variable sin usar en el helper.

## Limitaciones

- WebM no fue verificado en Chrome desktop real; en entorno headless devuelve error controlado.
- El bundle sigue creciendo (~1.17 MB) por incluir ECharts completo.
- Algunos templates complejos (graph, sankey, parallel) pueden requerir ajustes de layout en pantallas muy pequeñas.
- Theme River puede saturar visualmente si se añaden demasiadas categorías.

## Recomendaciones para Pack 03

1. Añadir animaciones guiadas y secuencias de export PNG.
2. Implementar code-splitting de ECharts por template.
3. Incluir validación de CSV según schema sugerido por cada template.
4. Explorar templates geo/map y posible integración futura con ECharts GL.
5. Restringir `targetOrigin` en producción.
