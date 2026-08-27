# andresgaibor.com Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Inicializar un sitio profesional funcional en Astro para andresgaibor.com, con estructura de portfolio, blog, proyectos y base extensible para futuras islas React.

**Architecture:** Astro genera el sitio estático y concentra páginas, layouts y contenido. React solo se instala como integración para islas interactivas futuras. Blog y proyectos usan MDX + Content Collections. Tailwind 4 se integra mediante Vite. El despliegue queda preparado para Cloudflare Workers Static Assets, sin publicar ni tocar DNS.

**Tech Stack:** Astro, TypeScript strict, Tailwind CSS 4, React, MDX, Astro Content Collections, Bun, Cloudflare Workers Static Assets.

**Spec:** `docs/superpowers/specs/2026-08-26-andresgaibor-site-design.md`

## Global Constraints

- Astro es el framework principal y generador estático.
- TypeScript debe permanecer en modo strict.
- React se usa solo para islas interactivas cuando exista necesidad real.
- No añadir backend, base de datos, autenticación ni CMS.
- No desplegar públicamente ni cambiar DNS.
- `astro check` y `astro build` deben finalizar sin errores.
- La información reutilizada debe vivir en `src/data` o Content Collections, no duplicarse entre páginas.

---

### Task 1: Scaffold base e integraciones

**Files:**
- Create/modify: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/**`, `public/**`

**Interfaces:**
- Consumes: directorio Git ya inicializado con la especificación.
- Produces: proyecto Astro instalable y ejecutable con Bun.

- [ ] **Step 1: Generar scaffold minimal en directorio temporal**

Run:
```bash
export PATH="$HOME/.bun/bin:$PATH"
rm -rf /tmp/andresgaibor-astro-scaffold
bunx create-astro@latest /tmp/andresgaibor-astro-scaffold --template minimal --install --no-git --yes
```

Expected: proyecto Astro minimal creado sin repositorio Git propio.

- [ ] **Step 2: Copiar scaffold al repo preservando `docs/` y `.git/`**

Run:
```bash
rsync -a --exclude '.git' /tmp/andresgaibor-astro-scaffold/ /Users/andresgaibor/code/javascript/andresgaibor/
```

- [ ] **Step 3: Añadir React, MDX y Tailwind**

Run:
```bash
cd /Users/andresgaibor/code/javascript/andresgaibor
export PATH="$HOME/.bun/bin:$PATH"
bunx astro add react --yes
bunx astro add mdx --yes
bunx astro add tailwind --yes
```

Expected: integraciones registradas y dependencias instaladas.

- [ ] **Step 4: Instalar sitemap, RSS y checker**

Run:
```bash
bun add @astrojs/sitemap @astrojs/rss
bun add -d @astrojs/check
```

- [ ] **Step 5: Verificar instalación inicial**

Run:
```bash
bunx astro check
bun run build
```

Expected: ambos comandos terminan con código 0.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "chore: scaffold Astro portfolio"
```

---

### Task 2: Datos, estilos y layout base

**Files:**
- Create: `src/data/profile.ts`
- Create: `src/data/social.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/experience.ts`
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/layout/Header.astro`
- Create: `src/components/layout/Footer.astro`
- Modify: `astro.config.mjs`

**Interfaces:**
- Produces: `profile`, `social`, `skills`, `experience`, y `BaseLayout` reutilizables por todas las páginas.

- [ ] **Step 1: Crear fuentes de datos tipadas** con nombre, headline, ubicación general, áreas profesionales y enlaces editables.
- [ ] **Step 2: Crear estilos globales** con Tailwind, variables CSS, tipografía de sistema, fondo, colores, focus visible y responsive base.
- [ ] **Step 3: Crear `Header` y `Footer`** usando HTML semántico y navegación a las rutas principales.
- [ ] **Step 4: Crear `BaseLayout`** con `title`, `description`, canonical, Open Graph, Twitter metadata y slot de contenido.
- [ ] **Step 5: Configurar `site: 'https://andresgaibor.com'` y sitemap** en `astro.config.mjs`.
- [ ] **Step 6: Ejecutar `bunx astro check` y `bun run build`.**
- [ ] **Step 7: Commit** con `git commit -m "feat: add site foundation and SEO layout"`.

---

### Task 3: Homepage y páginas profesionales

**Files:**
- Create/modify: `src/pages/index.astro`
- Create: `src/pages/sobre-mi.astro`
- Create: `src/pages/experiencia.astro`
- Create: `src/pages/cv.astro`
- Create: `src/pages/contacto.astro`
- Create: `src/pages/ahora.astro`
- Create: `src/pages/lab/index.astro`
- Create: `src/components/sections/Hero.astro`
- Create: `src/components/sections/Capabilities.astro`
- Create: `src/components/sections/FeaturedProjects.astro`
- Create: `src/components/sections/LatestPosts.astro`
- Create: `src/components/sections/ContactCTA.astro`

**Interfaces:**
- Consumes: `BaseLayout` y datos de Task 2.
- Produces: navegación principal funcional y landing profesional completa.

- [ ] **Step 1: Crear Hero** con posicionamiento profesional y CTA a proyectos/contacto.
- [ ] **Step 2: Crear capacidades** para Software Engineering, Data Engineering y Automation.
- [ ] **Step 3: Crear placeholders funcionales de proyectos y posts destacados** conectados luego a collections.
- [ ] **Step 4: Crear páginas secundarias** reutilizando datos centralizados.
- [ ] **Step 5: Crear `/lab`** como página informativa sin herramientas todavía.
- [ ] **Step 6: Ejecutar `bunx astro check` y `bun run build`.**
- [ ] **Step 7: Commit** con `git commit -m "feat: add professional site pages"`.

---

### Task 4: Content Collections para proyectos y blog

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/projects/*.mdx`
- Create: `src/content/blog/*.mdx`
- Create: `src/pages/proyectos/index.astro`
- Create: `src/pages/proyectos/[...slug].astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[...slug].astro`
- Create: `src/components/projects/ProjectCard.astro`
- Create: `src/components/blog/PostCard.astro`
- Create: `src/layouts/ProjectLayout.astro`
- Create: `src/layouts/BlogLayout.astro`

**Interfaces:**
- Produces: collections `projects` y `blog` validadas y consultables con `getCollection()`.

- [ ] **Step 1: Definir schemas** con título, descripción, fecha/estado, tags, featured y draft según corresponda.
- [ ] **Step 2: Añadir tres proyectos iniciales** como casos base: Qlik Report, Semillas y Desktop Remote, sin secretos ni información confidencial.
- [ ] **Step 3: Añadir un artículo demo** marcado `draft: true` para validar el pipeline de blog sin publicarlo.
- [ ] **Step 4: Crear listados y rutas dinámicas** para proyectos y posts publicados.
- [ ] **Step 5: Conectar homepage** a proyectos destacados y posts no-draft.
- [ ] **Step 6: Ejecutar `bunx astro check` y `bun run build`.**
- [ ] **Step 7: Commit** con `git commit -m "feat: add project and blog collections"`.

---

### Task 5: RSS, robots, Cloudflare y documentación

**Files:**
- Create: `src/pages/rss.xml.js`
- Create: `public/robots.txt`
- Create: `wrangler.jsonc`
- Create/modify: `README.md`
- Create: `AGENTS.md`
- Modify: `.gitignore` si hace falta.

**Interfaces:**
- Consumes: blog collection y build output `dist/`.
- Produces: proyecto documentado y preparado para deploy estático posterior.

- [ ] **Step 1: Crear RSS** incluyendo solo posts con `draft: false`.
- [ ] **Step 2: Crear robots.txt** apuntando al sitemap del dominio.
- [ ] **Step 3: Crear `wrangler.jsonc`** para assets desde `./dist`, sin ejecutar deploy.
- [ ] **Step 4: Documentar comandos** `bun install`, `bun run dev`, `bunx astro check`, `bun run build`, y el flujo de contenido.
- [ ] **Step 5: Crear `AGENTS.md`** con mapa del repo, reglas de Astro/React islands, Content Collections y validaciones obligatorias.
- [ ] **Step 6: Commit** con `git commit -m "docs: prepare site for maintenance and Cloudflare"`.

---

### Task 6: Verificación final

**Files:**
- No requiere archivos salvo correcciones encontradas por las verificaciones.

- [ ] **Step 1: Ejecutar calidad completa**

```bash
export PATH="$HOME/.bun/bin:$PATH"
bunx astro check
bun run build
```

Expected: 0 errores y build exitoso.

- [ ] **Step 2: Levantar dev server para smoke test**

```bash
bun run dev -- --host 127.0.0.1
```

Expected: servidor Astro accesible localmente y rutas principales responden.

- [ ] **Step 3: Verificar Git**

```bash
git status --short
git log --oneline -6
```

Expected: árbol limpio y commits de implementación presentes.

- [ ] **Step 4: Corregir cualquier fallo real y repetir Step 1.**
