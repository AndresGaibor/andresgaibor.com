# Diseño de andresgaibor.com

Fecha: 2026-08-26

## Objetivo

Crear el sitio profesional principal de Andrés Gaibor para presentar perfil, capacidades y proyectos; publicar artículos técnicos; facilitar contacto profesional; y dejar una base limpia para incorporar herramientas interactivas y, más adelante, una plataforma de cursos sin reescribir el sitio.

## Arquitectura elegida

- Astro como framework principal y generador estático.
- TypeScript en modo strict.
- Tailwind CSS 4 para estilos.
- React solo para islas interactivas cuando exista una necesidad real.
- MDX + Astro Content Collections para blog y casos de estudio.
- Bun como gestor de paquetes y runtime de desarrollo.
- Despliegue pensado para Cloudflare Workers Static Assets.
- Sin backend, base de datos, autenticación ni CMS en la primera versión.

## Razones

La mayor parte del sitio es contenido y debe cargar como HTML estático, con buen SEO y JavaScript mínimo. Astro encaja mejor que una SPA React pura. React se conserva para buscadores, filtros, calculadoras, demos o futuras herramientas dentro de `/lab`.

## Estructura de información inicial

- `/`: landing profesional.
- `/proyectos`: proyectos y casos de estudio.
- `/blog`: artículos técnicos.
- `/sobre-mi`: historia y perfil profesional.
- `/experiencia`: experiencia y capacidades.
- `/cv`: CV web y enlace de descarga.
- `/contacto`: vías de contacto y oportunidades.
- `/ahora`: trabajo y aprendizaje actual.
- `/lab`: reservado para herramientas interactivas futuras.

## Estructura técnica

- `src/components/ui`: componentes visuales pequeños y reutilizables.
- `src/components/layout`: navegación, header y footer.
- `src/components/sections`: secciones grandes de páginas.
- `src/components/blog`: componentes específicos del blog.
- `src/components/projects`: componentes específicos de proyectos.
- `src/components/react`: únicas islas React.
- `src/content/blog`: artículos MDX.
- `src/content/projects`: casos de estudio MDX.
- `src/data`: información estructurada de perfil, experiencia, skills y enlaces.
- `src/layouts`: layouts base, blog y proyectos.
- `src/pages`: rutas Astro.
- `src/styles`: estilos globales y tokens.
- `src/utils`: utilidades de fecha, SEO y URLs.

## Contenido inicial

La primera entrega debe incluir contenido mínimo funcional, no una plantilla vacía:

- Hero profesional con posicionamiento claro.
- Tres áreas de capacidad: Software Engineering, Data Engineering y Automation.
- Sección de proyectos destacados preparada para tres casos de estudio.
- Página de proyectos con contenido de ejemplo sustituible.
- Blog funcional con al menos un artículo de ejemplo marcado claramente como borrador o demostración.
- Sobre mí, experiencia, CV, contacto y ahora con contenido base editable desde `src/data`.

No se publicarán datos personales sensibles ni secretos del entorno. Los enlaces sociales y de contacto se centralizarán en archivos de datos para poder cambiarlos una sola vez.

## SEO y web platform

- Metadata centralizada en `BaseLayout`.
- Canonical URL basada en `https://andresgaibor.com`.
- Open Graph y Twitter metadata.
- Sitemap.
- RSS para el blog.
- `robots.txt`.
- HTML semántico y accesible.
- Dark mode basado en sistema con opción futura de selector persistente.

## Calidad

- `astro check` debe pasar.
- El build de producción debe completar sin errores.
- TypeScript strict sin errores.
- No se hidratará React donde no haga falta.
- La estructura debe ser comprensible para otros agentes y desarrolladores.
- README y AGENTS.md explicarán arquitectura, comandos y reglas de contribución.

## Despliegue

La primera fase será estática. Se preparará configuración compatible con Cloudflare Workers Static Assets, pero no se realizará un despliegue público ni cambios DNS sin una petición explícita posterior.

## Evolución futura

- `/lab` podrá incorporar islas React complejas.
- Si los cursos evolucionan a autenticación, pagos, progreso y dashboard, se evaluará una aplicación separada en `learn.andresgaibor.com` conectada a una API/backend dedicado.
- La web principal seguirá siendo Astro para preservar rendimiento, SEO y simplicidad.
