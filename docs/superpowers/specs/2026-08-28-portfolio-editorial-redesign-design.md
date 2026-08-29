# Especificación de diseño: rediseño editorial del portfolio

**Fecha:** 2026-08-28

**Estado:** Diseño aprobado para implementación posterior

**Alcance de este documento:** Definir el diseño, contenido, restricciones y verificación del rediseño. Este documento no implementa UI ni sustituye el implementation plan.

## Contexto y problema

El portfolio debe dejar de parecer una plantilla genérica o contenido producido en serie y comunicar una identidad profesional humana, editorial, confiable y útil para tres públicos: clientes no técnicos, recruiters y lectores técnicos. La primera lectura debe explicar el beneficio y el problema que se resuelve; la explicación del trabajo debe venir después; la tecnología debe funcionar como evidencia secundaria, no como argumento principal.

El repositorio ya contiene una base Astro-first, contenido en colecciones para blog y proyectos, y tres casos públicos: Optimus THY, Semillas y Desktop Remote. El rediseño debe aprovechar esa base sin inventar clientes, testimonios, métricas, años, empleadores, resultados ni experiencia que no esté documentada en el repositorio.

## Objetivos

- Reducir la apariencia de template/AI-slop.
- Presentar el portfolio como humano, editorial, confiable y comprensible para públicos técnicos y no técnicos.
- Comunicar primero el beneficio y el problema; explicar después la solución; mostrar la tecnología al final.
- Dar protagonismo visual a los mockups y screenshots reales de los proyectos.
- Mantener una experiencia rápida, accesible, semántica, responsive y Astro-first.
- Hacer que el tema claro sea la experiencia por defecto y ofrecer un dark mode equivalente y cuidado.
- Mantener rutas, metadata y superficies públicas existentes que sigan siendo válidas.

## No-objetivos

- No crear un producto SPA ni trasladar contenido estático a React sin una necesidad real de estado o eventos en cliente.
- No añadir backend, auth, CMS, base de datos, analytics invasivos, newsletter ni otra infraestructura no aprobada.
- No fabricar evidencia: clientes, testimonios, métricas, años, empleadores, resultados, validaciones o historial laboral.
- No sustituir dashboards o mockups existentes por imágenes generadas.
- No convertir áreas técnicas en historial laboral.
- No realizar en este trabajo el implementation plan.
- No copiar assets ni modificar componentes, estilos, tests o contenido del repositorio durante la redacción de esta spec.
- No hacer push, deploy, cambios DNS, reset, rebase, force-push ni otras operaciones destructivas en este turno.

## Principios de diseño

1. **Beneficio antes que tecnología.** Una persona no técnica debe entender qué puede mejorar antes de leer un stack.
2. **Evidencia honesta.** Cada afirmación pública debe poder respaldarse con contenido o datos existentes.
3. **Editorial, no formulario.** La composición debe usar ritmo, jerarquía, listas, separadores, whitespace y cambios de escala en lugar de repetir módulos idénticos.
4. **Producto antes que decoración.** Los proyectos deben mostrar el producto y su razonamiento, no una colección de chips.
5. **Simplicidad técnica.** Astro mantiene el renderizado estático; el JavaScript se limita a interacciones justificadas.
6. **Accesibilidad como estructura.** Semántica, foco, contraste, teclado y movimiento reducido forman parte del diseño, no una revisión posterior.
7. **Honestidad de estado.** Optimus THY conserva el estado `Prototipo`; Semillas y Desktop Remote conservan el estado documentado (`En desarrollo` cuando corresponda al contenido visible). No se presentará ningún proyecto como terminado si el repositorio no lo respalda.

## Sistema visual y tema

### Tema claro por defecto

La dirección visual es **light-first editorial**. El fondo no será blanco puro en toda la página: se usará un marfil o gris cálido como base, con superficies blancas o neutras, texto casi negro y el azul actual como acento. La paleta debe sostener contraste AA mínimo en texto, controles, enlaces y estados.

La interfaz evitará:

- glassmorphism;
- glows;
- partículas;
- gradients futuristas llamativos;
- iconografía tecnológica decorativa;
- stock o imágenes generadas presentadas como evidencia real.

La repetición de eyebrow azul + título + párrafo + card queda prohibida como patrón dominante. Se preferirán composiciones asimétricas, layouts editoriales, listas, reglas/separadores, bloques de texto y whitespace. Habrá menos bordes, menos cards y menos radios repetidos. Los títulos grandes se reservarán para momentos donde aporten jerarquía real.

### Dark mode

El dark mode será opcional, equivalente y cuidado. El header tendrá un toggle discreto, accesible y con label/ARIA, uso por teclado y estado persistente. Si no existe una elección explícita guardada, se respetará la preferencia del sistema. La textura geométrica aprobada puede reforzar uno o dos bloques de énfasis, especialmente el CTA final o una variante dark, siempre de forma muy sutil y sin afectar la legibilidad.

La preferencia se resolverá antes del primer paint mediante un script pequeño, sin dependencia grande, evitando FOUC o flash del tema incorrecto. El cambio manual debe actualizar la preferencia persistida y el estado visual de forma coherente.

## Estrategia de assets aprobados

Los siguientes assets de Downloads están aprobados únicamente en este orden y con estos usos:

1. `/Users/andresgaibor/Downloads/ChatGPT Image 28 ago 2026, 09_54_26 p.m..png` — retrato vertical de 1122x1402. Será la imagen humana principal del hero. Llevará el caption pequeño `Software Engineer · Ecuador · Remoto`.
2. `/Users/andresgaibor/Downloads/ChatGPT Image 28 ago 2026, 09_54_34 p.m..png` — retrato horizontal/editorial de 1672x941. Será protagonista de `/sobre-mi`.
3. `/Users/andresgaibor/Downloads/ChatGPT Image 28 ago 2026, 09_54_42 p.m..png` — textura geométrica oscura. Solo podrá aparecer de manera muy sutil en uno o dos bloques de énfasis; nunca como gran hero.
4. `/Users/andresgaibor/Downloads/ChatGPT Image 28 ago 2026, 09_54_48 p.m..png` — escritorio/laptop. No se describirá como `mi escritorio`; solo será recurso editorial secundario si mejora de forma demostrable el blog o el área técnica.
5. `/Users/andresgaibor/Downloads/ChatGPT Image 28 ago 2026, 09_55_05 p.m..png` — arquitectura abstracta. No se usará en home y puede quedar fuera del producto si no aporta.

Al implementar, solo se copiarán a `public/` los assets realmente usados, con nombres semánticos. Se optimizarán a formatos y tamaños web razonables; nunca se cargarán directamente los PNG originales de aproximadamente 1.7–1.9 MB y no se borrarán los originales de Downloads. Para proyectos se priorizarán screenshots/mockups reales ya existentes sobre imágenes generadas.

## Arquitectura de componentes y estado del tema

- Astro seguirá siendo responsable de páginas, layouts, contenido estático y renderizado.
- Se reutilizarán componentes existentes cuando conserven claridad; las composiciones nuevas deben vivir en la organización de componentes ya establecida (`layout`, `sections`, `projects`, `blog`, `ui`).
- React solo se permitirá para una interacción que requiera estado/eventos de cliente. El toggle de tema debe resolverse con JavaScript mínimo y no justificar una island grande.
- La navegación, los CTAs, las rutas y los datos de perfil/enlaces deben seguir centralizados en sus fuentes existentes; no se duplicarán listados ni enlaces.
- El inicializador de tema debe ejecutarse antes del paint, determinar una preferencia guardada o la preferencia del sistema, aplicar el atributo/clase de tema y permitir que el toggle sincronice ese valor de forma persistente.
- El header conservará `Servicios`, `Proyectos`, `Sobre mí`, `CV` y `Hablemos`, con menor peso visual.

## Diseño por página y sección

### Home `/`

El orden esencial será el siguiente:

1. **Hero editorial.** Texto a la izquierda y retrato vertical aprobado a la derecha. Se elimina por completo la tarjeta `Puedo ayudarte con`. Se conserva el headline exacto `Convierto problemas y procesos manuales en software útil.`, con tamaño reducido para no ocupar casi todo el viewport. Se mantienen los CTA `Cuéntame qué necesitas`, `Ver proyectos` y `Ver CV`, en ese orden de prioridad visual. Se añade la línea discreta `Software a medida · Automatización · Datos e integraciones`.
2. **Servicios.** Se conservan `Software para tu negocio`, `Automatizar trabajo repetitivo` y `Datos y reportes`. Se abandona el patrón de tres cards grandes idénticas llenas de tags. El layout será editorial y el stack aparecerá como metadato secundario y reducido.
3. **Proyectos destacados.** Optimus THY será protagonista; Semillas y Desktop Remote aparecerán debajo. Los mockups existentes ganarán espacio visual. Cada caso comunicará claramente `Problema`, `Qué construí`, `Mi participación` y tecnologías como metadata. Se mantendrán estados honestos (`Prototipo` / `En desarrollo`, según el contenido existente) y no se crearán pruebas falsas.
4. **Cómo trabajo.** Se reemplaza el grid 2x2 de cards por una secuencia editorial continua de cuatro pasos: `01 Entiendo`, `02 Propongo`, `03 Construyo`, `04 Lo dejo funcionando`. Se conserva el sentido del copy existente y no se presenta una metodología corporativa inventada.
5. **Perfil técnico.** Se compacta bajo el heading `Para equipos técnicos y reclutadores` o un equivalente claro. Incluye resumen de producto/frontend/backend/datos/automatización, tres áreas cortas, stack agrupado y los CTA `Ver CV`, `Experiencia` y GitHub si ya existe en los datos. Las áreas se mostrarán como capacidades, nunca como historial laboral.
6. **Blog.** Se compacta porque solo hay un artículo publicable relevante. Tendrá heading corto y artículo destacado, idealmente en dos columnas en desktop. El blog funciona como señal de conocimiento, no como protagonista comercial. Los borradores no se promocionarán ni aparecerán en superficies públicas.
7. **CTA final.** Bloque contrastante oscuro incluso en light mode, con copy problem-first: `¿Tienes algo que quieres mejorar?`, seguido de una explicación de que no hace falta saber tecnología, y CTA `Contarme mi idea`. La textura aprobada número 3 podrá usarse de fondo muy sutil si no reduce la legibilidad.

### Sobre mí `/sobre-mi`

La página adoptará una estructura editorial con: introducción humana; retrato horizontal aprobado número 2 como protagonista; quién es Andrés y cómo piensa; formación, ubicación y áreas; tipos de problemas que le interesa resolver; y CTA hacia proyectos y CV. Se elimina la sensación actual de texto acompañado por una tarjeta genérica de datos. Solo se usarán hechos existentes en el repositorio; no se inventará experiencia.

### Proyectos y casos `/proyectos` y páginas de caso

El listado dará más espacio visual al producto y menos a chips. Optimus THY seguirá primero, seguido por Semillas y Desktop Remote, de acuerdo con el orden y protagonismo existente. No se reemplazarán dashboards/mockups por imágenes generadas.

Cada caso debe reforzar, cuando el contenido existente lo soporte, esta lectura: problema, solución o qué se construyó, participación de Andrés, decisiones técnicas y estado. La profundidad técnica actual se conserva en las páginas de caso. Las tecnologías se muestran como metadata o evidencia secundaria. No se añadirán resultados, clientes, validaciones ni afirmaciones que no estén documentados.

### Rutas relacionadas

Las rutas `/experiencia`, `/contacto` y `/cv` deben seguir siendo alcanzables desde los CTAs y conservar su contenido factual. El rediseño no cambia su significado ni crea una narrativa laboral no respaldada.

## Responsive, accesibilidad y rendimiento

- El diseño será mobile-first real.
- En móvil, el hero mantendrá una imagen bien recortada, con dimensiones y `aspect-ratio` definidos para evitar saltos.
- La navegación será usable en pantallas pequeñas; los controles y enlaces tendrán hit targets adecuados.
- No habrá overflow horizontal.
- Cards, listas y composiciones editoriales colapsarán conservando una jerarquía clara.
- Se exigirá contraste AA mínimo, `focus-visible`, skip link y HTML semántico.
- El toggle de tema tendrá nombre accesible, estado anunciado correctamente y operación completa por teclado.
- El `alt` de cada imagen describirá su función o contenido real, sin keyword stuffing ni SEO spam.
- Se respetará `prefers-reduced-motion`; ninguna transición será necesaria para comprender o usar el sitio.
- Las imágenes declararán dimensiones o `aspect-ratio`; el hero no será lazy y las imágenes fuera del hero usarán lazy loading cuando corresponda.
- Los assets se servirán en formatos optimizados y tamaños razonables.
- No se añadirán librerías pesadas para tema, imágenes, layout o interacción.

## SEO y metadata

Se conservarán canonical, sitemap, RSS y Person JSON-LD. Se revisarán las social cards y OpenGraph. Solo se sustituirá la imagen social actual si la composición resultante es superior y respeta exactamente 1200x630; no se asumirá que el retrato, por sí solo, debe reemplazarla. Las páginas y el contenido público seguirán describiendo únicamente hechos verificables.

## Testing y verificación requerida

La implementación posterior deberá incluir pruebas o verificaciones que demuestren, como mínimo:

- el tema light/dark, el script de inicialización antes del paint, la preferencia del sistema cuando no hay elección y la persistencia del toggle;
- la ausencia de la vieja tarjeta `Puedo ayudarte con` en el hero;
- que los assets usados tengan nombres semánticos en `public/` y no existan referencias directas a `Downloads`;
- el orden y la estructura esencial de home: hero, servicios, proyectos, cómo trabajo, perfil técnico, blog y CTA final;
- contenido problem-first y ausencia de claims inventados;
- `astro check`, tests, build y `git diff --check` sin errores;
- smoke HTTP de `/`, `/proyectos`, `/sobre-mi`, `/experiencia`, `/contacto` y `/cv`;
- auditoría visual de producción en desktop y mobile después del deploy.

Los resultados deben registrar comandos, pass/fail y cualquier comportamiento no verificado. La verificación no debe aceptar que un build exitoso compense una revisión de contenido, accesibilidad o visual faltante.

## Rollout y deploy

La implementación se cerrará con verificación completa, uno o más commits revisables, push sin force a `origin/main`, `bun run deploy` y comprobación pública de `andresgaibor.com`. El despliegue no forma parte de este turno: aquí solo se documenta el diseño y no se hará push ni deploy.

Antes de publicar, se comprobará que la build de producción contiene las rutas esperadas, que los drafts no aparecen en superficies públicas, que los assets cargan desde rutas semánticas y que el smoke HTTP responde correctamente. Si la auditoría visual de producción descubre regresiones, se corregirán antes de considerar cerrado el rollout; no se declarará éxito solo por completar el comando de deploy.

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| El rediseño vuelve a parecer una plantilla por repetición de módulos. | Limitar cards, variar composiciones, usar listas/separadores/whitespace y revisar visualmente desktop y mobile. |
| Una imagen generada se interpreta como evidencia de un proyecto real. | Mantenerla como recurso editorial aprobado, priorizar mockups reales y no atribuirle contexto factual no documentado. |
| Un claim comercial sobrestima experiencia o resultados. | Revisar cada frase contra `src/data/` y las colecciones; prohibir métricas, clientes, testimonios y resultados no verificables. |
| El dark mode produce FOUC o estados inconsistentes. | Inicializar antes del paint, usar preferencia del sistema solo sin elección guardada y probar persistencia/recarga. |
| Assets grandes degradan carga y CLS. | Optimizar formatos/tamaños, declarar dimensiones, no lazy-loadear el hero y lazy-loadear imágenes secundarias. |
| La interfaz editorial pierde claridad en móvil. | Diseñar mobile-first, probar hit targets, recortes, colapsos y ausencia de overflow horizontal. |
| Cambiar la social card reduce la calidad de compartición. | Conservar la actual salvo que una composición 1200x630 probada sea claramente superior. |
| El alcance se expande a producto, backend o reescritura de arquitectura. | Mantener Astro-first, limitar React a estado real y tratar esta spec como alcance aprobado. |

## Criterios de aceptación

- **AC-01 — Validación de estado:** la implementación parte del branch `main` limpio y de un commit explícitamente revisado; este documento no cambia código de producto.
- **AC-02 — Posicionamiento:** una revisión de contenido confirma beneficio/problema antes de explicación y tecnología, sin inventar clientes, testimonios, métricas, años, empleadores ni resultados.
- **AC-03 — Home:** el hero usa el retrato vertical aprobado, conserva el headline y los tres CTA definidos, añade la línea de contexto y no contiene `Puedo ayudarte con`; el orden de secciones coincide con esta spec.
- **AC-04 — Editorial:** servicios, cómo trabajo, perfil técnico y blog no usan tres cards idénticas como estructura dominante; la secuencia de trabajo contiene exactamente los cuatro pasos definidos.
- **AC-05 — Casos:** Optimus THY es protagonista y Semillas/Desktop Remote aparecen debajo; cada caso comunica problema, qué se construyó, participación y metadata tecnológica, con estado honesto y mockups reales.
- **AC-06 — Sobre mí:** `/sobre-mi` usa el retrato horizontal aprobado, estructura editorial y solo hechos existentes en el repositorio.
- **AC-07 — Tema:** light-first es el valor por defecto; dark mode es accesible, equivalente, persistente, respeta el sistema sin elección y no muestra FOUC.
- **AC-08 — Assets:** solo se copian assets aprobados y realmente usados, con nombres semánticos y optimización web; no quedan referencias directas a `/Users/andresgaibor/Downloads` en la implementación.
- **AC-09 — Calidad:** pasan contraste AA mínimo, teclado/focus-visible, skip link, reduced motion, alt realista, dimensiones de imagen, lazy loading secundario y ausencia de overflow horizontal.
- **AC-10 — Plataforma y SEO:** Astro-first, canonical, sitemap, RSS y Person JSON-LD se conservan; OpenGraph/social card solo cambia con una composición superior de 1200x630.
- **AC-11 — Verificación técnica:** pasan `astro check`, tests, build y `git diff --check`; además pasan los smoke HTTP de `/`, `/proyectos`, `/sobre-mi`, `/experiencia`, `/contacto` y `/cv`.
- **AC-12 — Verificación visual y rollout:** existe auditoría visual desktop/mobile contra la producción después del deploy, y el rollout final usa commits revisables, push sin force a `origin/main`, `bun run deploy` y comprobación de `andresgaibor.com`. Ninguna de esas acciones de rollout se ejecuta en este turno.

## Self-review de esta especificación

- No contiene marcadores de posición ni decisiones abiertas.
- No introduce assets, rutas, claims, librerías, backend o entregables fuera del alcance aprobado.
- La excepción aparente entre “no modificar componentes/estilos/tests” y los criterios de testing se resuelve por alcance: este turno solo documenta pruebas exigidas para la implementación posterior; no ejecuta ni modifica tests.
- La mención de deploy, commits y push está limitada a rollout futuro; se prohíbe ejecutarlos en este turno salvo el commit único de esta spec solicitado por el usuario.
- Las expresiones “cuando corresponda” se refieren únicamente a decisiones condicionadas por el contenido o uso real durante implementación: lazy loading de imágenes secundarias, uso del asset de escritorio y existencia del enlace GitHub en datos. No dejan trabajo indeterminado.
