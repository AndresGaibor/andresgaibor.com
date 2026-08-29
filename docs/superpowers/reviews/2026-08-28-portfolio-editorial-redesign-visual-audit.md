# Auditoría visual editorial del portafolio

**Fecha:** 2026-08-28
**Alcance:** revisión visual y de accesibilidad del rediseño editorial antes y después de la corrección de navegación móvil.

## Entorno reproducible

- Chrome headless mediante CDP.
- Preview local de Astro.
- Viewport desktop: `1440x1000`.
- Viewport mobile: `390x844`.
- Temas light y dark emulados explícitamente con `prefers-color-scheme`.
- Las capturas se tomaron localmente como apoyo reproducible; no se guardan capturas temporales en el repositorio.

## Matriz visual inicial

Se revisaron `/`, `/proyectos`, `/sobre-mi` y `/proyectos/optimus-thy/` en desktop/mobile y light/dark. En las 16 combinaciones observadas:

| Ruta | Desktop light/dark | Mobile light/dark | Composición | Contraste | Tipografía | Mockups | Overflow horizontal |
|---|---|---|---|---|---|---|---|
| `/` | PASS | PASS | PASS | PASS | PASS | PASS | No observado |
| `/proyectos` | PASS | PASS | PASS | PASS | PASS | PASS | No observado |
| `/sobre-mi` | PASS | PASS | PASS | PASS | PASS | PASS | No observado |
| `/proyectos/optimus-thy/` | PASS | PASS | PASS | PASS | PASS | PASS | No observado |

Alturas de contenido observadas antes del fix, en el orden desktop/mobile:

- Home: `6496` / `10331`.
- Proyectos: `2362` / `4547`.
- Sobre mí: `2308` / `2592`.
- Optimus THY: `2957` / `4176`.

No se observó overflow del `body` en ninguna de esas páginas.

## Hero y carga visual

- CLS: `0` en las cuatro combinaciones light/dark × desktop/mobile.
- Portrait natural: `1122x1402`.
- Render desktop: `384x480`.
- Render mobile: `350x437`.
- `object-fit: cover`.
- `object-position: 50% 50%`.
- Carga completa observada.

## Accesibilidad y hallazgo inicial

Antes del fix, el skip link y `:focus-visible` funcionaban correctamente. El teclado alcanzaba Hablemos y Tema. Con reduced motion se observó `scrollBehavior: auto` y una duración de transición aproximada de `1e-05s`.

El único hallazgo inicial fue la descubribilidad y el área táctil de las acciones móviles:

- A `390px`, el nav tenía `clientWidth=294` y `scrollWidth=453`.
- Hablemos ocupaba `x=373..465` y Tema `x=469..529`.
- Ambas acciones quedaban fuera del viewport inicialmente, sin affordance de scroll.
- El teclado sí llegaba a ellas y hacía auto-scroll; por tanto, no era un problema de teclado.

## Corrección aplicada

Commit correctivo:

- `a55196b9ff2d553e8e2e34b2d0f78b1bd6951cea`
- `fix: expose mobile navigation actions`

La corrección mantiene el orden desktop Servicios, Proyectos, Sobre mí, CV, Hablemos y Tema. El nav de enlaces desktop usa `hidden ... sm:flex` y no usa scroll horizontal. Hablemos es un único enlace compartido, colocado fuera del nav de enlaces. Tema es un único botón `#theme-toggle`, también fuera de ese nav.

En móvil se muestran inicialmente AG, Hablemos, Tema y Menú. Menú usa `<details>`/`<summary>` nativo, sin JavaScript nuevo, y contiene un `<nav aria-label="Navegación móvil">` con Servicios, Proyectos, Sobre mí y CV. La lógica de `aria-current` se conserva. Marca, Hablemos, Tema y Menú usan targets `min-h-11` (la marca también `min-w-11`). El dropdown usa tokens existentes, borde y superficie, sin gradientes, dependencias ni cambios en `BaseLayout`.

## Evidencia post-fix a 390px

Con `/proyectos` y el viewport mobile:

- `bodyScrollWidth=390`.
- AG: `x=20..64`, `w=44`, `h=44`.
- Hablemos: `x=146..238`, `w=92`, `h=44`.
- Tema: `x=242..303`, `w=61`, `h=44`.
- Menú: `x=307..370`, `w=63`, `h=44`.
- Todos los controles son visibles de entrada.

Con el dropdown abierto:

- Caja: `x=178..370`, `top=64..bottom=270`.
- Visible completo.
- Enlaces exactamente: Servicios, Proyectos, Sobre mí y CV.
- Un solo theme toggle.

La revisión visual light y dark fue PASS. En desktop `1440px` se conserva Andrés Gaibor, Servicios, Proyectos, Sobre mí, CV, Hablemos y Tema; `details` permanece oculto (`display: none`).

## Matriz post-fix

Las 16 combinaciones de 4 rutas × 2 temas × 2 viewports reportaron `overflow=false`:

| Rutas | Temas | Viewports | Resultado |
|---|---|---|---|
| `/`, `/proyectos`, `/sobre-mi`, `/proyectos/optimus-thy/` | light, dark | `1440x1000`, `390x844` | `overflow=false` en las 16 combinaciones |

## Teclado y reduced motion post-fix

En `/proyectos` mobile, el orden visible de Tab fue:

1. Skip link.
2. Marca.
3. Hablemos.
4. Tema.
5. Menú.

Todos mostraron `focus-visible`. Con el quinto Tab, el `summary` Menú recibió `focus-visible`; Enter abrió `details`. Proyectos quedó con `aria-current=page`.

Reduced motion continuó con:

- `matches=true`.
- `scrollBehavior=auto`.
- `transition=1e-05s` aproximadamente.

## Conclusión

No se observaron hallazgos visuales o de accesibilidad sin resolver dentro del alcance auditado después de la corrección. Este informe no afirma cumplimiento WCAG completo, resultados de Lighthouse ni métricas que no hayan sido medidas.
