# Pack 05 QA Report · Premium Template Pack 05

## Comandos ejecutados

```bash
git checkout main
git fetch origin
git pull origin main
git checkout -b feature/premium-template-pack-05
npm ci
npm run build
npm run dev -- --host 127.0.0.1 --port 5175 --strictPort
STUDIO_URL=http://127.0.0.1:5175 node scripts/smoke-pack05.mjs
npm run build
```

## Templates añadidos (Pack 05)

Inspirados en los ejemplos oficiales de Apache ECharts. Se adaptaron los modelos visuales usando datos demo propios para evitar dependencias externas (SVG de mapas, D3 o JSON remotos).

| Template | Ejemplo base | Categoría | Descripción |
|---|---|---|---|
| Disk Treemap Pro | `treemap-disk` | Business | Treemap estilo uso de disco con niveles de saturación |
| Sunburst Drink Pro | `sunburst-drink` | Marketing | Sunburst jerárquico con categorías de sabores |
| Sunburst VisualMap Pro | `sunburst-visualMap` | Marketing | Sunburst con codificación visual por valor |
| Sankey Gradient Pro | `sankey-itemstyle` | Business | Sankey con estilos por nodo y degradados en enlaces |
| Sankey Right Align Pro | `sankey-nodeAlign-right` | Business | Sankey con alineación de nodos a la derecha |
| Pictorial Hill Pro | `pictorialBar-hill` | Marketing | Barras pictóricas en forma de montaña |
| Custom Calendar Icon Pro | `custom-calendar-icon` | Marketing | Calendario personalizado con iconos por día |
| Custom Hexbin Pro | `custom-hexbin` | Experimental | Agrupación hexagonal de puntos con densidad por color |
| Treemap Obama Pro | `treemap-obama` | Business | Treemap con valor compuesto: importe y variación |
| Custom Wind Pro | `custom-wind` | Experimental | Campo de vectores con líneas personalizadas |

**Total de templates en el producto: 45**

## Checklist funcional

| Check | Resultado |
|---|---|
| App carga con UI premium | ✅ PASS |
| 35 templates de packs anteriores siguen cargando | ✅ PASS |
| 10 templates de Pack 05 cargan | ✅ PASS |
| Categorías colapsables funcionan | ✅ PASS |
| Contador muestra 45 templates | ✅ PASS |
| Cambio de theme funciona | ✅ PASS |
| Cambio de output preset funciona | ✅ PASS |
| Branding funciona | ✅ PASS |
| CSV import no rompe la app | ✅ PASS |
| Export PNG funciona | ✅ PASS |
| Status bar muestra template activo | ✅ PASS |
| No hay errores de consola bloqueantes | ✅ PASS |
| UI usable con 45 templates | ✅ PASS |

**Resultado automatizado:** `passed: true, errors: []`

## Bugs corregidos durante el desarrollo

1. **`customWindPro.ts`:** se eliminó la importación sin usar de `echarts` y se renombró `params` a `_params`.
2. **`customHexbinPro.ts`:** se renombró `params` a `_params` para cumplir `noUnusedParameters`.

## Notas de adaptación

- Se evitó incluir SVG de Islandia (~700 KB) y mapa mundial del ejemplo `geo-svg-custom-effect` y `custom-wind`; en su lugar se adaptaron los visuales a coordenadas cartesianas o a datos jerárquicos locales.
- El ejemplo `circle-packing-with-d3` no se incluyó para no añadir dependencia de D3.
- Los ejemplos restantes de la lista (`treemap-sunburst-transition`, `treemap-obama` ya adaptado, `sankey-nodeAlign-left`, `sunburst-drink` y `sunburst-visualMap` ya adaptados) quedan como candidatos para futuros packs.

## Limitaciones

- WebM no fue verificado en Chrome desktop real; en entorno headless devuelve error controlado.
- El bundle sigue creciendo (~1.22 MB) por incluir ECharts completo.
- Algunos templates complejos (hexbin, wind, calendario iconos, sankey) pueden requerir ajustes de layout en pantallas muy pequeñas.
- Con 45 templates, las categorías colapsables son imprescindibles para mantener la navegación usable.

## Recomendaciones para Pack 06

1. Implementar code-splitting de ECharts por template o familia de templates.
2. Añadir animaciones guiadas y secuencias de export PNG.
3. Incluir validación de CSV según schema sugerido por cada template.
4. Explorar geo map con SVG/GeoJSON inline ligero y posible integración futura con ECharts GL.
5. Restringir `targetOrigin` en producción.
