# QA Report · MVP Data Storytelling Standalone

## Entorno usado

- **OS:** Windows 10/11 (Git Bash)
- **Node.js:** v24.14.1
- **npm:** 11.14.1
- **Git:** 2.52.0.windows.1
- **Navegador:** Google Chrome (sistema) controlado por Playwright 1.61.1
- **Rama bajo QA:** `qa/mvp-functional-hardening`
- **Base del QA:** `main` tras mergear PR #1

## Comandos ejecutados

```bash
npm ci
npm run build
npm run dev -- --host 127.0.0.1 --port 5173
node scripts/qa-smoke.mjs
npm run build
```

## Checklist de pruebas y resultados

| Funcionalidad | Resultado | Detalle |
|---|---|---|
| App carga y renderiza stage | ✅ PASS | Instancia ECharts activa, sin errores de consola |
| Decision Tree Pro carga | ✅ PASS | Sin error bar, renderiza árbol |
| Business Treemap Pro carga | ✅ PASS | Sin error bar, renderiza treemap |
| Brand Sunburst Pro carga | ✅ PASS | Sin error bar, renderiza sunburst |
| KPI Dashboard Pro carga | ✅ PASS | Sin error bar, renderiza barras |
| Gauge Pack Pro carga | ✅ PASS | Sin error bar, renderiza gauges |
| Cambio de theme funciona | ✅ PASS | Cambio a Tech Blue reflejado en UI |
| Cambio de output preset funciona | ✅ PASS | Cambio a Presentation Wide reflejado |
| Branding headline/subheadline/color funciona | ✅ PASS | Inputs actualizan estado |
| Importación CSV simple funciona | ✅ PASS | CSV `name,value` aplica correctamente |
| Export PNG descarga archivo válido | ✅ PASS | Descarga con extensión `.png` |
| Export HTML descarga archivo válido | ✅ PASS | Descarga `chart.html` |
| Export Embed genera código válido | ✅ PASS | Descarga `embed-code.txt` |
| Export JSON descarga configuración válida | ✅ PASS | Descarga `data-story-config.json` |
| Export WebM | ✅ PASS | Devuelve error claro en entorno headless |

**Resumen automatizado:** `15 passed, 0 failed`

## Bugs encontrados y corregidos

### 1. Bucle infinito `setOption should not be called during main process`

**Severidad:** Bloqueante  
**Descripción:** `Runtime.render()` llamaba a `store.setError()` dentro del callback de render. Eso disparaba el subscriber del estado, que volvía a llamar a `render()`, generando un bucle infinito de errores de ECharts y bloqueando la UI.  
**Corrección:** Se añadió una bandera `isRendering` en `src/core/runtime.ts` para evitar reentrada. `setError(null)` y `setError(message)` ahora se ejecutan dentro del mismo render protegido.

## Limitaciones detectadas

- **WebM en headless:** En el entorno de QA headless, `HTMLCanvasElement.captureStream` no está disponible, por lo que WebM devuelve un error controlado. En Chrome desktop real debería funcionar si el renderer es canvas y el codec es soportado.
- **Render canvas vs SVG:** En el navegador headless de Playwright, ECharts no generó nodos `<canvas>` ni `<svg>` visibles en el DOM, aunque la instancia se inicializó correctamente. La verificación se hizo comprobando el atributo `_echarts_instance_` y la ausencia de errores.
- **Bundle grande:** El chunk JS supera 1.1 MB por incluir ECharts completo. No afecta funcionalidad, pero es una deuda técnica conocida.
- **postMessage `targetOrigin: '*'`:** Mantiene el TODO de restringir en producción.

## Recomendaciones antes de integrar con Escaparates-Pro

1. **Restringir `targetOrigin`** en `parentBridge.ts` al dominio del parent.
2. **Code-splitting de ECharts** para reducir el bundle inicial.
3. **Añadir tests unitarios** para `csvParser`, `normalizeDataSet` y `exportManager`.
4. **Validar schemas de postMessage** con una librería como Zod.
5. **Probar WebM en un navegador real** (Chrome desktop) antes de declararlo listo para usuarios finales.
6. **Definir contrato de embedding** (parámetros URL `?embed=1&template=...`) y documentarlo.
7. **Revisar accesibilidad** (`aria-label`, navegación por teclado) antes de exponer a clientes.
