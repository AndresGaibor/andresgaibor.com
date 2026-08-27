# andresgaibor.com

Sitio profesional de Andrés Gaibor: portfolio, casos de estudio, blog técnico, CV web y base para futuras herramientas interactivas.

## Stack

- Astro 7
- TypeScript strict
- Tailwind CSS 4 mediante `@tailwindcss/vite`
- React 19 disponible solo para islands
- MDX + Astro Content Collections
- Bun
- Cloudflare Workers Static Assets para despliegue

## Desarrollo

```bash
bun install
bun run dev
```

Astro sirve por defecto en `http://localhost:4321`.

## Calidad

```bash
bun run check
bun run build
```

O ambos:

```bash
bun run verify
```

No se considera completo un cambio si `bun run verify` falla.

## Contenido

### Proyectos

Los casos de estudio viven en:

```text
src/content/projects/*.mdx
```

Cada archivo debe cumplir el schema definido en `src/content.config.ts`.

### Blog

Los artículos viven en:

```text
src/content/blog/*.mdx
```

Usa `draft: true` para mantener un artículo fuera de las rutas públicas y del RSS.

## Datos reutilizables

La información de perfil, experiencia, tecnologías y enlaces se edita en:

```text
src/data/
```

Evita repetir la misma información directamente en varias páginas.

## React

Astro es la opción por defecto. React solo se usa para interacción real en cliente. No conviertas páginas o secciones estáticas en componentes React.

## Rutas principales

```text
/
/proyectos
/blog
/sobre-mi
/experiencia
/cv
/contacto
/ahora
/lab
```

## Cloudflare

El sitio se genera de forma estática en `dist/`. `wrangler.jsonc` está preparado para Workers Static Assets.

Previsualización con Wrangler:

```bash
bun run cf:dev
```

Despliegue manual futuro:

```bash
bun run deploy
```

**No ejecutes deploy ni cambies DNS como parte de tareas de desarrollo ordinarias.** La publicación del dominio se hace como una operación explícita aparte.

## Documentación de arquitectura

- Diseño: `docs/superpowers/specs/2026-08-26-andresgaibor-site-design.md`
- Plan inicial: `docs/superpowers/plans/2026-08-26-andresgaibor-site.md`
