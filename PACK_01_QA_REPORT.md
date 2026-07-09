# Pack 01 QA Report · Premium UI + Template Pack 01

## Comandos ejecutados

```bash
npm ci
npm run build
npm run dev -- --host 127.0.0.1 --port 5173
node scripts/qa-smoke.mjs
npm run build
```

## Templates añadidos (Pack 01)

| Template | Categoría | Descripción |
|---|---|---|
| Funnel Story Pro | Business | Embudo de conversión comercial con etapas, valores y caída porcentual |
| Timeline Campaign Pro | Marketing | Evolución de campaña con hitos, inversión y resultados |
| Radar Benchmark Pro | Strategy | Comparación multimensional frente a competidores o criterios |
| Bubble Matrix Pro | Business | Matriz de priorización con burbujas de impacto/esfuerzo |
| Heatmap Calendar Pro | Marketing | Calendario de intensidad semanal para actividad, ventas o leads |

Total de templates en el producto: **10**.

## Checklist de QA

| Check | Resultado |
|---|---|
| App carga con UI premium | ✅ PASS |
| 5 templates antiguos cargan sin error | ✅ PASS |
| 5 templates nuevos cargan sin error | ✅ PASS |
| Cambio de theme funciona | ✅ PASS |
| Cambio de output preset funciona | ✅ PASS |
| Branding (headline, subheadline, colores) funciona | ✅ PASS |
| Importación CSV simple no rompe la app | ✅ PASS |
| Export PNG descarga archivo válido | ✅ PASS |
| Export HTML descarga archivo válido | ✅ PASS |
| Export JSON descarga configuración válida | ✅ PASS |
| Status bar muestra template activo | ✅ PASS |

**Resultado automatizado:** `19 passed, 0 failed`

## Bugs corregidos durante el desarrollo

1. **Variable sin usar en demo data:** `createHeatmapCalendarData` declaraba `d` en `forEach` sin usarlo. Corregido.
2. **Falta de `defaultData` en templates antiguos:** se añadió `defaultData` y `exportCapabilities` a todos los templates existentes para compatibilidad con el nuevo tipo `Template`.
3. **UI de plantillas sin agrupar:** se reemplazó la lista plana por grupos de categoría con nombre, badge y descripción.

## Limitaciones

- Los 5 templates nuevos no se han probado con datasets reales de usuario; solo con datos demo.
- WebM no fue verificado en Chrome desktop real; en entorno headless devuelve error controlado.
- El bundle sigue superando 1.1 MB por incluir ECharts completo.
- Las animaciones premium y transiciones avanzadas no se incluyen en este pack.

## Recomendaciones para Pack 02

1. Añadir templates geo/map, sankey, network graph y word cloud.
2. Implementar code-splitting de ECharts por template.
3. Añadir previsualización de animaciones y secuencias de export.
4. Mejorar la validación de CSV según el schema sugerido por cada template.
5. Implementar restricción de `targetOrigin` en producción.
