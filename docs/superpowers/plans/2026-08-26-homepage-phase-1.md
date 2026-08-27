# Homepage Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current Astro foundation into an employment-first professional homepage with Optimus THY as the primary public case study, Semillas and Desktop Remote as secondary work, stronger evidence/experience content, and no public trace of the confidential Qlik Report project.

**Architecture:** Keep the site fully static and Astro-first. Centralize reusable positioning, experience, capabilities, evidence, and technology copy in `src/data/`; keep project detail in Content Collections; build the homepage from focused Astro sections; add Bun regression tests that guard public-content policy before visual implementation.

**Tech Stack:** Astro 7.2.8, TypeScript strict, Tailwind CSS 4, MDX Content Collections, Bun 1.3.10, Cloudflare Workers Static Assets.

**Spec:** `docs/superpowers/specs/2026-08-26-homepage-content-design.md`

## Global Constraints

- Primary positioning must be `Software Engineer | Full Stack & Data Engineering`.
- Hero headline must be `Construyo productos, automatizaciones y sistemas de datos de extremo a extremo.`
- Do not label Andrés publicly as `Junior`.
- Remove Qlik Report and Qlik-specific portfolio references from all public source and generated output.
- Optimus THY is a thesis prototype in development; describe AI as assistive and never claim clinical validation, diagnostic accuracy, medical outcomes, or production readiness.
- Keep Astro as the rendering framework; do not add client JavaScript unless an interaction genuinely needs state.
- Do not add a CMS, database, auth layer, backend, newsletter infrastructure, analytics, or course platform.
- Preserve `public/favicon.svg`; this plan does not modify that file.
- Do not implement inside a shared dirty worktree. At execution time use `superpowers:using-git-worktrees` when isolation is needed, preserve unrelated local edits, verify a Cloudflare preview branch, and merge to `main` only after review.

---## File Structure

**Create**
- `tests/public-content.test.ts` — regression guard for confidential references, required project entries, and approved positioning copy.
- `src/content/projects/optimus-thy.mdx` — public-safe thesis case study.
- `src/components/sections/HeroProfile.astro` — portrait/context panel with deterministic monogram fallback when no approved portrait asset is present.
- `src/components/projects/FeaturedProjectCard.astro` — asymmetric primary/secondary project presentation.
- `src/components/sections/ImpactEvidence.astro` — defensible engineering evidence without vanity metrics.
- `src/components/sections/ExperienceOverview.astro` — professional narrative, education, and core technologies.
- `src/data/impact.ts` — reusable evidence statements for the homepage.

**Modify**
- `package.json` — add `test` and include it in `verify`.
- `src/data/profile.ts` — approved role, headline, summary, availability, optional portrait path.
- `src/data/skills.ts` — refine capability copy and selective core technologies.
- `src/data/experience.ts` — remove confidential/reporting language and strengthen public professional narrative.
- `src/components/sections/Hero.astro` — asymmetric employment-first hero and three CTAs.
- `src/components/sections/Capabilities.astro` — tighter copy and editorial presentation.
- `src/components/sections/FeaturedProjects.astro` — primary Optimus THY plus two secondary projects.
- `src/components/sections/LatestPosts.astro` — remove CMS-centric copy and emphasize substantive technical writing.
- `src/components/sections/ContactCTA.astro` — employment-first final CTA plus CV path.
- `src/components/layout/Footer.astro` — compact professional identity and links.
- `src/pages/index.astro` — final section order and page metadata.
- `src/styles/global.css` — restrained editorial tokens, focus/hover polish, responsive support.

**Delete**
- `src/content/projects/qlik-report.mdx` — confidential project must not produce a public route.

### Task 1: Lock public-content policy and replace the confidential project

**Files:**
- Create: `tests/public-content.test.ts`
- Create: `src/content/projects/optimus-thy.mdx`
- Modify: `package.json`
- Modify: `src/data/profile.ts`
- Delete: `src/content/projects/qlik-report.mdx`

**Interfaces:**
- Produces a `bun test` regression suite used by every later task.
- Produces project id `optimus-thy`; existing collection routing automatically exposes `/proyectos/optimus-thy/`.

- [ ] **Step 1: Write the failing public-content tests**

```ts
import { describe, expect, test } from 'bun:test';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { profile } from '../src/data/profile';

const TEXT_EXTENSIONS = new Set(['.astro', '.ts', '.md', '.mdx', '.css', '.json', '.svg', '.xml']);
async function textFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? textFiles(path) : Promise.resolve(TEXT_EXTENSIONS.has(extname(path)) ? [path] : []);
  }));
  return nested.flat();
}
```
```ts
describe('public portfolio policy', () => {
  test('does not expose Qlik references', async () => {
    const files = [...await textFiles('src'), ...await textFiles('public')];
    const matches: string[] = [];
    for (const file of files) {
      const content = (await readFile(file, 'utf8')).toLowerCase();
      if (content.includes('qlik')) matches.push(file);
    }
    expect(matches).toEqual([]);
  });

  test('publishes the approved three featured projects', async () => {
    const projectFiles = await readdir('src/content/projects');
    expect(projectFiles).toContain('optimus-thy.mdx');
    expect(projectFiles).toContain('semillas.mdx');
    expect(projectFiles).toContain('desktop-remote.mdx');
    expect(projectFiles).not.toContain('qlik-report.mdx');
  });

  test('uses approved professional positioning', () => {
    expect(profile.role).toBe('Software Engineer | Full Stack & Data Engineering');
    expect(profile.headline).toBe('Construyo productos, automatizaciones y sistemas de datos de extremo a extremo.');
  });
});
```

- [ ] **Step 2: Run the test and verify it fails for the right reasons**

Run: `bun test tests/public-content.test.ts`
Expected: FAIL because `qlik-report.mdx` exists, `optimus-thy.mdx` does not, and current profile copy is not yet the approved copy.

- [ ] **Step 3: Apply the minimum public-safe content changes**

Update `src/data/profile.ts` to:

```ts
export const profile = {
  name: 'Andrés Gaibor',
  shortName: 'AG',
  role: 'Software Engineer | Full Stack & Data Engineering',
  headline: 'Construyo productos, automatizaciones y sistemas de datos de extremo a extremo.',
  summary:
    'Diseño desde interfaces y APIs hasta integraciones, pipelines y procesamiento de datos a escala.',
  location: 'Ecuador · Remoto',
  availability:
    'Abierto a oportunidades como Software Engineer y a proyectos seleccionados de producto, backend, datos y automatización.',
  site: 'https://andresgaibor.com',
  portrait: null as string | null,
} as const;
```

Delete `src/content/projects/qlik-report.mdx` and create `src/content/projects/optimus-thy.mdx` with frontmatter:

```mdx
---
title: "Optimus THY"
description: "Proyecto de tesis para gestionar información clínica e integrar flujos de análisis asistidos por inteligencia artificial con foco en privacidad y trazabilidad."
year: 2026
categories:
  - Product Engineering
  - AI-assisted Systems
technologies:
  - React
  - Python
  - FastAPI
  - PostgreSQL
  - RustFS
featured: true
status: prototype
order: 1
---
```Continue the MDX body with evidence-bounded copy:

```mdx
## El problema

La información clínica, estudios, imágenes y resultados de apoyo pueden terminar dispersos entre procesos y formatos distintos. Optimus THY explora cómo centralizar ese flujo en una aplicación web con control de acceso y trazabilidad.

## Mi alcance

Mi tesis se concentra en el componente de software: la gestión de pacientes e información clínica, asociación de estudios e imágenes, consumo del modelo de IA y presentación de resultados para revisión profesional.

No desarrollo el modelo clínico como producto diagnóstico ni presento la aplicación como un sistema validado para uso asistencial.

## Arquitectura

El frontend se construye con React. La arquitectura de backend está orientada a Python/FastAPI, PostgreSQL y almacenamiento de archivos clínicos, separando datos estructurados de documentos e imágenes.

El diseño contempla procesamiento local para flujos sensibles y una integración de inferencia en la que los resultados del modelo se almacenan y muestran como apoyo al análisis humano.

## Privacidad y trazabilidad

- Roles diferenciados para personal autorizado.
- Separación entre información clínica y archivos.
- Registro de acciones relevantes y resultados procesados.
- Arquitectura preparada para reducir exposición innecesaria de datos sensibles.

## Estado actual

Es un proyecto de tesis en desarrollo. El frontend y el diseño del producto están más avanzados que la integración completa del backend y del flujo de IA.

## Qué demuestra

Diseño de producto full stack, modelado de datos, integración de IA dentro de un flujo real, manejo de archivos sensibles y decisiones de arquitectura donde privacidad y trazabilidad forman parte del problema desde el inicio.
```

Do not claim that OCR, AI inference, RustFS, authentication, or backend routes are already complete end-to-end; the case study must distinguish implemented UI/product design from architecture/integration still in progress.
- [ ] **Step 4: Wire the regression suite into project verification**

In `package.json`, add:

```json
"test": "bun test"
```

and change:

```json
"verify": "bun run test && bun run check && bun run build"
```

- [ ] **Step 5: Run the focused tests and full verification**

Run: `bun test tests/public-content.test.ts`
Expected: PASS.

Run: `bun run verify`
Expected: tests PASS, Astro check reports 0 errors/warnings/hints, and static build completes.

- [ ] **Step 6: Confirm the confidential route disappeared from build output**

Run:

```bash
test ! -e dist/proyectos/qlik-report/index.html
test -e dist/proyectos/optimus-thy/index.html
! grep -Rni --exclude='*.map' 'qlik' dist
```

Expected: all commands exit 0 with no Qlik matches.

- [ ] **Step 7: Commit**

```bash
git add package.json tests/public-content.test.ts src/data/profile.ts src/content/projects/optimus-thy.mdx src/content/projects/qlik-report.mdx
git commit -m "feat: replace confidential portfolio case study"
```

---

### Task 2: Centralize professional evidence, capabilities, and experience copy

**Files:**
- Modify: `tests/public-content.test.ts`
- Create: `src/data/impact.ts`
- Modify: `src/data/skills.ts`
- Modify: `src/data/experience.ts`

**Interfaces:**
- Produces `impactEvidence` for `ImpactEvidence.astro`.
- Preserves `capabilities` and `coreTechnologies` exports used by existing pages.
- Preserves `experience` export used by `/experiencia` and `/cv`.

- [ ] **Step 1: Add failing data-policy assertions**

Append to the existing test suite:

```ts
import { coreTechnologies } from '../src/data/skills';
import { experience } from '../src/data/experience';
import { impactEvidence } from '../src/data/impact';

test('keeps the public technology list selective', () => {
  expect(coreTechnologies).toEqual([
    'TypeScript', 'React', 'Python', 'FastAPI', 'Bun',
    'PostgreSQL', 'SQL', 'Cloudflare', 'Docker',
  ]);
});

test('uses defensible evidence without confidential wording', () => {
  const text = JSON.stringify({ experience, impactEvidence }).toLowerCase();
  expect(text).not.toContain('reporting');
  expect(text).not.toContain('qlik');
  expect(impactEvidence).toHaveLength(4);
});
```

- [ ] **Step 2: Run the focused tests**

Run: `bun test tests/public-content.test.ts`
Expected: FAIL because `impact.ts` is absent and the current data does not match the approved copy.

- [ ] **Step 3: Implement evidence and selective technology data**

Create `src/data/impact.ts`:

```ts
export const impactEvidence = [
  {
    title: 'Producto de extremo a extremo',
    description: 'Interfaces, APIs, persistencia y despliegue pensados como un solo sistema.',
  },
  {
    title: 'Datos y automatización',
    description: 'SQL, pipelines, ETL/ELT e integraciones para reducir trabajo manual y mover datos con claridad.',
  },
  {
    title: 'IA dentro del producto',
    description: 'Integración de modelos y procesamiento asistido dentro de flujos con revisión humana y límites explícitos.',
  },
  {
    title: 'Developer tooling',
    description: 'Herramientas, infraestructura y automatización remota para acelerar trabajo técnico de forma controlada.',
  },
] as const;
```

Set `coreTechnologies` in `src/data/skills.ts` to exactly:

```ts
export const coreTechnologies = [
  'TypeScript', 'React', 'Python', 'FastAPI', 'Bun',
  'PostgreSQL', 'SQL', 'Cloudflare', 'Docker',
] as const;
```

Keep the three capability names unchanged, but rewrite descriptions around systems/problems rather than technology collection.

Rewrite `src/data/experience.ts` without confidential language:

```ts
export const experience = [
  {
    period: '2026 — Actualidad',
    title: 'Software Engineering & Data Engineering',
    description:
      'Diseño y construcción de productos, automatizaciones, integraciones y sistemas de datos, desde la interfaz hasta el despliegue.',
  },
  {
    period: 'Product Engineering',
    title: 'Full Stack de extremo a extremo',
    description:
      'Arquitectura de frontend y backend, APIs, persistencia, seguridad, experiencia de usuario y evolución del producto como un sistema completo.',
  },
  {
    period: 'Automation & Tooling',
    title: 'Infraestructura para reducir trabajo manual',
    description:
      'Automatización de flujos técnicos, developer tooling, integraciones, contenedores y ejecución remota controlada.',
  },
] as const;
```

- [ ] **Step 4: Run tests and type checks**

Run: `bun test tests/public-content.test.ts && bun run check`
Expected: PASS with 0 Astro errors/warnings/hints.

- [ ] **Step 5: Commit**

```bash
git add tests/public-content.test.ts src/data/impact.ts src/data/skills.ts src/data/experience.ts
git commit -m "feat: sharpen professional positioning data"
```

---

### Task 3: Rebuild the hero around employment-first conversion

**Files:**
- Create: `tests/homepage-structure.test.ts`
- Create: `src/components/sections/HeroProfile.astro`
- Modify: `src/components/sections/Hero.astro`

**Interfaces:**
- `HeroProfile.astro` reads `profile.portrait`, `profile.shortName`, `profile.name`, and `profile.location`; no client-side state.
- `Hero.astro` remains a zero-prop section imported by `src/pages/index.astro`.

- [ ] **Step 1: Write failing semantic-structure tests**

```ts
import { describe, expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';

const read = (path: string) => readFile(path, 'utf8');

describe('homepage structure', () => {
  test('hero exposes the approved conversion paths', async () => {
    const hero = await read('src/components/sections/Hero.astro');
    expect(hero).toContain('Ver proyectos');
    expect(hero).toContain('href="/proyectos"');
    expect(hero).toContain('Ver experiencia');
    expect(hero).toContain('href="/experiencia"');
    expect(hero).toContain('Contactarme');
    expect(hero).toContain('HeroProfile');
  });

  test('homepage sections remain Astro-first', async () => {
    const hero = await read('src/components/sections/Hero.astro');
    const profilePanel = await read('src/components/sections/HeroProfile.astro').catch(() => '');
    expect(`${hero}\n${profilePanel}`).not.toMatch(/client:(load|idle|visible|only)/);
  });
});
```

- [ ] **Step 2: Run the focused test**

Run: `bun test tests/homepage-structure.test.ts`
Expected: FAIL because `HeroProfile.astro` and the experience CTA do not exist.

- [ ] **Step 3: Implement the portrait/context panel with a safe fallback**

`HeroProfile.astro` must use an approved real portrait only when `profile.portrait` contains a path. With the current `null` value, render the monogram fallback rather than inventing or generating a likeness.

Core structure:

```astro
---
import { profile } from '../../data/profile';
---

<aside class="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-3 lg:mx-0 lg:justify-self-end">
  <div class="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--surface-soft)]">
    {profile.portrait ? (
      <img src={profile.portrait} alt={`Retrato de ${profile.name}`} class="size-full object-cover" />
    ) : (
      <div class="grid size-full place-items-center text-6xl font-semibold tracking-[-0.08em]" aria-hidden="true">
        {profile.shortName}
      </div>
    )}
  </div>
  <dl class="grid gap-px overflow-hidden rounded-2xl bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-1">
    <div class="bg-[var(--surface)] p-4"><dt class="text-xs text-[var(--muted)]">Perfil</dt><dd class="mt-1 font-semibold">Full Stack + Data</dd></div>
    <div class="bg-[var(--surface)] p-4"><dt class="text-xs text-[var(--muted)]">Base</dt><dd class="mt-1 font-semibold">{profile.location}</dd></div>
  </dl>
</aside>
```

- [ ] **Step 4: Rewrite `Hero.astro` as an asymmetric two-column section**

Use `profile.headline` as the only `<h1>`, show `profile.role` prominently above or immediately below supporting copy, and expose exactly these actions: `/proyectos`, `/experiencia`, and `mailto:${social.email}`. Keep the first action visually primary and the other two quieter.The hero grid target is `lg:grid-cols-[minmax(0,1.55fr)_minmax(17rem,.65fr)]`; mobile must stack naturally with copy first. Do not add decorative JS, parallax, or animated counters.

- [ ] **Step 5: Run semantic tests and Astro checks**

Run: `bun test tests/homepage-structure.test.ts && bun run check`
Expected: PASS, 0 Astro errors/warnings/hints.

- [ ] **Step 6: Commit**

```bash
git add tests/homepage-structure.test.ts src/components/sections/Hero.astro src/components/sections/HeroProfile.astro
git commit -m "feat: redesign homepage hero"
```

---

### Task 4: Build asymmetric featured work around Optimus THY

**Files:**
- Modify: `tests/homepage-structure.test.ts`
- Create: `src/components/projects/FeaturedProjectCard.astro`
- Modify: `src/components/sections/FeaturedProjects.astro`
- Modify: `src/content/projects/semillas.mdx`
- Modify: `src/content/projects/desktop-remote.mdx`

**Interfaces:**
- `FeaturedProjectCard.astro` accepts `project: CollectionEntry<'projects'>` and `variant: 'primary' | 'secondary'`.
- `FeaturedProjects.astro` sorts featured collection entries by `order`, uses the first item as primary, and renders the remaining two as secondary.
- `ProjectCard.astro` remains unchanged for `/proyectos`.
- [ ] **Step 1: Add a failing hierarchy assertion**

Append:

```ts
test('featured work has one primary and two secondary projects', async () => {
  const section = await read('src/components/sections/FeaturedProjects.astro');
  expect(section).toContain('FeaturedProjectCard');
  expect(section).toContain('variant="primary"');
  expect(section).toContain('variant="secondary"');
  expect(section).toContain('const [primary, ...secondary]');
});
```

Run: `bun test tests/homepage-structure.test.ts`
Expected: FAIL because the homepage still renders three equal `ProjectCard` instances.

- [ ] **Step 2: Implement `FeaturedProjectCard.astro`**

Use one semantic link wrapping the card. Primary variant must use a wider grid and larger heading; secondary variant remains compact. Both variants show project title, description, categories, up to five technologies, status text, and `Ver caso de estudio →`.

Core API:

```astro
---
import type { CollectionEntry } from 'astro:content';
interface Props {
  project: CollectionEntry<'projects'>;
  variant: 'primary' | 'secondary';
}
const { project, variant } = Astro.props;
const primary = variant === 'primary';
---

<a href={`/proyectos/${project.id}`} class:list={[
  'group block h-full rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] no-underline transition-[transform,border-color] hover:-translate-y-1 hover:border-[var(--muted)]',
  primary ? 'p-7 sm:p-9 lg:p-10' : 'p-6 sm:p-7',
]}>
  <div class="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
    <span>{project.data.year}</span>
    <span>{project.data.status}</span>
  </div>
  <h3 class:list={['mt-6 font-semibold tracking-[-0.035em]', primary ? 'text-3xl sm:text-4xl' : 'text-2xl']}>{project.data.title}</h3>
  <p class="mt-3 max-w-2xl leading-7 text-[var(--muted)]">{project.data.description}</p>
  <ul class="mt-6 flex flex-wrap gap-2" aria-label={`Tecnologías de ${project.data.title}`}>
    {project.data.technologies.slice(0, 5).map((item) => <li class="rounded-lg bg-[var(--surface-soft)] px-2.5 py-1.5 text-xs font-medium text-[var(--muted)]">{item}</li>)}
  </ul>
  <p class="mt-5 text-xs font-medium text-[var(--muted)]">{project.data.categories.join(' · ')}</p>
  <p class="mt-8 text-sm font-semibold text-[var(--accent)]">Ver caso de estudio →</p>
</a>
```

The implementation must not add fake screenshots. Reserve a quiet visual field in the primary card using typography, project metadata, and subtle structural lines until a real public screenshot is available.
- [ ] **Step 3: Recompose `FeaturedProjects.astro`**

Use:

```astro
---
import { getCollection } from 'astro:content';
import Container from '../ui/Container.astro';
import SectionHeading from '../ui/SectionHeading.astro';
import FeaturedProjectCard from '../projects/FeaturedProjectCard.astro';

const projects = (await getCollection('projects', ({ data }) => data.featured))
  .sort((a, b) => a.data.order - b.data.order)
  .slice(0, 3);
const [primary, ...secondary] = projects;
---

<section class="py-20 sm:py-28">
  <Container>
    <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <SectionHeading eyebrow="Trabajo destacado" title="Sistemas que puedo explicar de principio a fin." />
      <a href="/proyectos" class="text-sm font-semibold text-[var(--accent)]">Ver todos →</a>
    </div>
    <div class="mt-12 space-y-5">
      {primary && <FeaturedProjectCard project={primary} variant="primary" />}
      <div class="grid gap-5 lg:grid-cols-2">
        {secondary.map((project) => <FeaturedProjectCard project={project} variant="secondary" />)}
      </div>
    </div>
  </Container>
</section>
```

- [ ] **Step 4: Tighten public summaries for Semillas and Desktop Remote**

Semillas description: `Plataforma educativa full stack con actividades interactivas, progreso, administración y experiencia PWA.`

Desktop Remote description: `Developer tooling para exponer archivos, procesos y automatización remota a agentes autorizados mediante herramientas MCP controladas.`

Keep their existing body content unless a sentence overstates implementation; do not add metrics that are not public and verifiable.
- [ ] **Step 5: Run tests and check rendering contracts**

Run: `bun test && bun run check`
Expected: PASS, 0 Astro errors/warnings/hints.

- [ ] **Step 6: Commit**

```bash
git add tests/homepage-structure.test.ts src/components/projects/FeaturedProjectCard.astro src/components/sections/FeaturedProjects.astro src/content/projects/semillas.mdx src/content/projects/desktop-remote.mdx
git commit -m "feat: feature public portfolio work"
```

---

### Task 5: Add impact evidence and professional experience to the homepage

**Files:**
- Modify: `tests/homepage-structure.test.ts`
- Create: `src/components/sections/ImpactEvidence.astro`
- Create: `src/components/sections/ExperienceOverview.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- `ImpactEvidence.astro` consumes `impactEvidence` from `src/data/impact.ts`.
- `ExperienceOverview.astro` consumes `experience`, `education`, and `coreTechnologies`.
- Both are static, zero-prop Astro sections.

- [ ] **Step 1: Write the failing homepage-order assertion**

Append:

```ts
test('homepage includes evidence and experience before the blog', async () => {
  const page = await read('src/pages/index.astro');
  const evidence = page.indexOf('<ImpactEvidence />');
  const experience = page.indexOf('<ExperienceOverview />');
  const blog = page.indexOf('<LatestPosts />');
  expect(evidence).toBeGreaterThan(-1);
  expect(experience).toBeGreaterThan(evidence);
  expect(blog).toBeGreaterThan(experience);
});
```

Run: `bun test tests/homepage-structure.test.ts`
Expected: FAIL because the new sections do not exist.
- [ ] **Step 2: Implement `ImpactEvidence.astro`**

```astro
---
import Container from '../ui/Container.astro';
import SectionHeading from '../ui/SectionHeading.astro';
import { impactEvidence } from '../../data/impact';
---

<section class="border-y border-[var(--line)] py-20 sm:py-24">
  <Container>
    <SectionHeading
      eyebrow="Evidencia"
      title="No solo tecnologías. Sistemas que puedo construir y explicar."
      description="Prefiero demostrar rango de ingeniería con decisiones y sistemas reales antes que con porcentajes o métricas inventadas."
    />
    <div class="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
      {impactEvidence.map((item, index) => (
        <article class="bg-[var(--surface)] p-6 sm:p-8">
          <p class="text-xs font-semibold tabular-nums text-[var(--muted)]">0{index + 1}</p>
          <h3 class="mt-5 text-xl font-semibold tracking-tight">{item.title}</h3>
          <p class="mt-3 max-w-xl leading-7 text-[var(--muted)]">{item.description}</p>
        </article>
      ))}
    </div>
  </Container>
</section>
```

- [ ] **Step 3: Implement `ExperienceOverview.astro`**

Use two editorial columns at desktop: experience narrative on the left; education and technologies on the right. Render `experience` and `education` from data rather than duplicating copy. The technologies area must render `coreTechnologies.join(' · ')` as restrained text, not logos or skill bars.

Core structure:

```astro
---
import Container from '../ui/Container.astro';
import SectionHeading from '../ui/SectionHeading.astro';
import { experience } from '../../data/experience';
import { education } from '../../data/education';
import { coreTechnologies } from '../../data/skills';
---

<section class="py-20 sm:py-28">
  <Container>
    <SectionHeading eyebrow="Experiencia" title="Producto, backend, datos y automatización como un mismo oficio." />
    <div class="mt-12 grid gap-12 lg:grid-cols-[1.35fr_.65fr]">
      <div class="space-y-8">
        {experience.map((item) => (
          <article class="border-t border-[var(--line)] pt-6">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{item.period}</p>
            <h3 class="mt-2 text-xl font-semibold">{item.title}</h3>
            <p class="mt-3 max-w-2xl leading-7 text-[var(--muted)]">{item.description}</p>
          </article>
        ))}
      </div>
      <aside class="space-y-8">
        <div><p class="text-sm text-[var(--muted)]">Formación</p>{education.map((item) => <p class="mt-2 font-semibold">{item.title} · {item.institution}</p>)}</div>
        <div><p class="text-sm text-[var(--muted)]">Tecnologías principales</p><p class="mt-2 leading-7">{coreTechnologies.join(' · ')}</p></div>
        <a href="/experiencia" class="inline-block text-sm font-semibold text-[var(--accent)]">Ver experiencia →</a>
      </aside>
    </div>
  </Container>
</section>
```

- [ ] **Step 4: Insert both sections into `src/pages/index.astro`**

Final order for this task: `Hero`, `Capabilities`, `FeaturedProjects`, `ImpactEvidence`, `ExperienceOverview`, `LatestPosts`, `ContactCTA`.
- [ ] **Step 5: Run tests and Astro checks**

Run: `bun test && bun run check`
Expected: PASS with 0 Astro errors/warnings/hints.

- [ ] **Step 6: Commit**

```bash
git add tests/homepage-structure.test.ts src/components/sections/ImpactEvidence.astro src/components/sections/ExperienceOverview.astro src/pages/index.astro
git commit -m "feat: add homepage evidence and experience"
```

---

### Task 6: Tighten capabilities, blog, final CTA, and footer

**Files:**
- Modify: `src/components/sections/Capabilities.astro`
- Modify: `src/components/sections/LatestPosts.astro`
- Modify: `src/components/sections/ContactCTA.astro`
- Modify: `src/components/layout/Footer.astro`
- Modify: `tests/homepage-structure.test.ts`

**Interfaces:**
- Existing zero-prop component APIs remain unchanged.
- Final CTA continues reading contact data from `src/data/social.ts`; no email is duplicated in page source.

- [ ] **Step 1: Add failing CTA/content assertions**
```ts
test('final CTA is employment-first and links to the CV', async () => {
  const cta = await read('src/components/sections/ContactCTA.astro');
  expect(cta).toContain('¿Construimos algo útil?');
  expect(cta).toContain('href="/cv"');
  expect(cta).toContain('Contactarme');
});

test('blog copy is editorial rather than CMS-focused', async () => {
  const posts = await read('src/components/sections/LatestPosts.astro');
  expect(posts.toLowerCase()).not.toContain('cms');
  expect(posts).toContain('problemas reales');
});
```

Run: `bun test tests/homepage-structure.test.ts`
Expected: FAIL on current CTA and blog copy.

- [ ] **Step 2: Refine `Capabilities.astro`**

Keep the three-card information architecture and data source. Change the heading to `Software, datos y automatización para resolver problemas reales.` and remove copy that sounds defensive or technology-centric. Keep technology chips subordinate to descriptions.

- [ ] **Step 3: Refine `LatestPosts.astro`**

Use:

```astro
<SectionHeading
  eyebrow="Blog"
  title="Notas técnicas nacidas de problemas reales."
  description="Arquitectura, producto, automatización, datos e IA explicados desde decisiones que he tenido que tomar construyendo sistemas."
/>
```

Keep at most three non-draft posts and the existing `/blog` link.
- [ ] **Step 4: Rewrite `ContactCTA.astro` around the approved conversion goal**

Use the approved heading `¿Construimos algo útil?`, `profile.availability` as supporting copy, and exactly two primary actions:

```astro
<div class="mt-8 flex flex-wrap gap-3">
  <a href={`mailto:${social.email}`} class="rounded-xl bg-[var(--text)] px-5 py-3 text-sm font-semibold text-[var(--page)] no-underline">
    Contactarme
  </a>
  <a href="/cv" class="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold no-underline">
    Ver CV
  </a>
</div>
```

Keep `/contacto` available in navigation/site structure, but do not dilute the final homepage CTA with a third equal-priority button.

- [ ] **Step 5: Simplify `Footer.astro`**

Left side must read `{profile.name} · Software Engineer`. Right side continues rendering centralized `socialLinks` plus RSS. Remove `Construido con Astro` from the primary footer identity; technology credit can remain in README rather than conversion UI.

- [ ] **Step 6: Run tests and check**

Run: `bun test && bun run check`
Expected: PASS with 0 Astro errors/warnings/hints.

- [ ] **Step 7: Commit**

```bash
git add tests/homepage-structure.test.ts src/components/sections/Capabilities.astro src/components/sections/LatestPosts.astro src/components/sections/ContactCTA.astro src/components/layout/Footer.astro
git commit -m "feat: refine homepage conversion content"
```

---

### Task 7: Apply editorial visual polish and responsive/accessibility checks

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/pages/index.astro`
- Modify only if an approved portrait asset is supplied: `src/data/profile.ts`
- Create only if an approved portrait asset is supplied: `public/images/andres-gaibor.webp`

**Interfaces:**
- No new runtime dependencies.
- Existing CSS variables remain the design-token contract used across pages.
- `profile.portrait` remains `null` until a real, user-approved portrait file is available; the monogram fallback is a complete supported state.

- [ ] **Step 1: Establish the homepage metadata explicitly**

Render the page as:

```astro
<BaseLayout
  title="Software Engineer | Full Stack & Data Engineering"
  description="Andrés Gaibor construye productos full stack, automatizaciones y sistemas de datos de extremo a extremo."
>
```

Do not perform the broader Open Graph/schema overhaul in this phase.

- [ ] **Step 2: Refine global visual tokens without changing the aesthetic category**

Keep the neutral light/dark palette, accent blue, thin borders, and system-first typography. Add only reusable tokens required by the new sections, such as a slightly elevated surface and restrained shadow; avoid gradients that dominate content, neon, glassmorphism, or decorative noise.

Any transitions must be limited to `transform`, `border-color`, `background-color`, or `color` and continue respecting the existing `prefers-reduced-motion` rule.

- [ ] **Step 3: Preserve the portrait contract**

If the user supplies the approved professional portrait during execution, normalize it to `public/images/andres-gaibor.webp`, set `profile.portrait` to `/images/andres-gaibor.webp`, and keep the image cropped with `object-cover`. Otherwise leave `profile.portrait: null`; do not generate a likeness or select an unrelated image.
- [ ] **Step 4: Build and inspect rendered homepage semantics**

Run: `bun run build`
Expected: static build completes.

Run:

```bash
grep -q 'Construyo productos, automatizaciones y sistemas de datos de extremo a extremo' dist/index.html
grep -q 'Optimus THY' dist/index.html
grep -q 'href="/experiencia"' dist/index.html
grep -q 'href="/cv"' dist/index.html
! grep -Rni --exclude='*.map' -E 'Qlik|Junior' dist
```

Expected: all positive greps find content and the negative grep produces no matches.

- [ ] **Step 5: Perform manual responsive/accessibility review**

Run: `bun run dev -- --host 127.0.0.1`

Review `/` and `/proyectos/optimus-thy/` at approximately 375 px, 768 px, and 1440 px viewport widths. Confirm:

- no horizontal overflow;
- hero copy precedes the profile panel on mobile;
- one primary project and two secondary projects remain visually obvious;
- all CTA text remains readable without clipping;
- Tab navigation reaches project, experience, contact, and CV links in logical order;
- focus outline is visible;
- reduced-motion behavior remains supported by global CSS.

Stop the dev server after review.

- [ ] **Step 6: Commit**

```bash
git add src/styles/global.css src/pages/index.astro
if test -f public/images/andres-gaibor.webp; then
  git add src/data/profile.ts public/images/andres-gaibor.webp
fi
git commit -m "style: polish editorial homepage presentation"
```

When no portrait file was supplied, stage only files that actually changed; do not create an empty image path.

---

### Task 8: Verify the complete phase and publish the Cloudflare preview

**Files:**
- No product-code changes expected unless verification finds a defect.
- Verify: `dist/`, git diff, Cloudflare preview deployment.

**Interfaces:**
- Branch `feat/homepage-phase-1` is the preview source.
- Cloudflare Workers Builds is already connected to GitHub with preview builds enabled.

- [ ] **Step 1: Run the complete local gate**

Run:

```bash
bun run verify
```

Expected: Bun tests PASS; Astro check reports 0 errors, 0 warnings, 0 hints; Astro build completes successfully.

- [ ] **Step 2: Run confidentiality and route checks against generated output**

```bash
test -e dist/proyectos/optimus-thy/index.html
test -e dist/proyectos/semillas/index.html
test -e dist/proyectos/desktop-remote/index.html
test ! -e dist/proyectos/qlik-report/index.html
! grep -Rni --exclude='*.map' 'qlik' dist
```

Expected: the three approved project pages exist, the confidential route does not exist, and generated output contains no Qlik match.

- [ ] **Step 3: Review the final diff for accidental scope growth**

Run:

```bash
git status --short
git diff --stat main...HEAD
git diff main...HEAD -- public/favicon.svg
```

Expected: no uncommitted changes, changes are limited to Phase 1 files/docs/tests, and the favicon diff is empty.

- [ ] **Step 4: Push the preview branch**

```bash
git push -u origin feat/homepage-phase-1
```

Expected: push succeeds and Cloudflare Workers Builds starts a preview build for the branch.
- [ ] **Step 5: Review the Cloudflare preview before production**

Open the preview deployment generated for `feat/homepage-phase-1` and inspect:

- `/`
- `/proyectos`
- `/proyectos/optimus-thy/`
- `/proyectos/semillas/`
- `/proyectos/desktop-remote/`
- `/cv`

Confirm the preview has the approved hierarchy, no confidential project, no unsupported medical claims, working navigation, and acceptable mobile/desktop presentation.

- [ ] **Step 6: Stop at the production gate**

Do not merge to `main` automatically. Report the preview URL, verification results, branch HEAD, and any portrait fallback still active. Merge only after explicit user approval of the preview.

## Completion Definition

Phase 1 is ready for production when `bun run verify` is clean, all confidentiality checks pass, Optimus THY is visibly primary, Semillas and Desktop Remote are secondary, the homepage exposes projects/experience/contact/CV paths, the Cloudflare preview has been visually reviewed, and the user approves merging the preview branch to `main`.
