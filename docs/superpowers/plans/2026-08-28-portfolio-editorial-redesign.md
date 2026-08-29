# Portfolio Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing Astro portfolio into a human, editorial, light-first portfolio that explains the problem and benefit before the implementation, showcases the three documented projects honestly, and preserves fast accessible public routes.

**Architecture:** Keep Astro responsible for static pages, layouts, content collections, metadata, and project visuals. Centralize profile, service, process, and technology data in the existing `src/data/` modules; compose the home and related pages from focused Astro components. Add only a minimal pre-paint theme initializer and a small accessible toggle in the existing header; do not introduce a React island or new backend infrastructure.

**Tech Stack:** Astro 7.2.8, TypeScript strict, Tailwind CSS 4 through `@tailwindcss/vite`, MDX Content Collections, Bun 1.3.10, Bun test, Cloudflare Workers Static Assets through Wrangler 4.126.0.

**Spec:** `docs/superpowers/specs/2026-08-28-portfolio-editorial-redesign-design.md`

## Global Constraints

- Execute product work only in isolated worktree `.worktrees/portfolio-editorial-redesign` on branch `feat/portfolio-editorial-redesign`; `.worktrees` is already ignored.
- Create the implementation worktree from `main`; before changing product, verify that `git rev-parse HEAD` is identical to `git rev-parse main` and that this commit contains both the approved spec and this plan. The pre-plan reviewed foundation was `665cac498f58f4e623591f06f33da8dc1b16b56b`.
- Keep the site Astro-first and static; React is forbidden unless a real stateful interaction is proven, and the theme toggle must use minimal JavaScript rather than a React island.
- Preserve the existing public routes and factual meaning of `/experiencia`, `/contacto`, and `/cv`; retain `/blog`, `/rss.xml`, `/proyectos`, and generated project case routes.
- Use the exact homepage headline `Convierto problemas y procesos manuales en software útil.` and the exact four process steps `01 Entiendo`, `02 Propongo`, `03 Construyo`, `04 Lo dejo funcionando`.
- Remove the hero card and all public copy containing `Puedo ayudarte con`; do not retain or import `HeroProfile.astro` in the hero.
- Keep Optimus THY as `Prototipo`; keep Semillas and Desktop Remote as `En desarrollo` when rendered from their existing `active` state; never claim completion, validation, customers, testimonials, metrics, years, employers, outcomes, or clinical readiness not documented in the repository.
- Preserve the project order: Optimus THY first, Semillas second, Desktop Remote third; use the existing real dashboard/mockup components rather than generated project evidence.
- Copy only approved Downloads assets that are actually used, never delete the originals, rename them semantically, optimize them for the web, declare dimensions or aspect ratios, and never leave a source reference to `/Users/andresgaibor/Downloads` in product code.
- Use the approved vertical portrait for the home hero, the approved horizontal portrait for `/sobre-mi`, and the approved dark geometric texture subtly in the final CTA; do not use the approved laptop or abstract architecture image.
- Make light the default; without a saved choice follow `prefers-color-scheme`, persist manual selection, initialize before first paint to prevent FOUC, and expose an equivalent dark theme with an accessible keyboard-operable toggle.
- Maintain the existing canonical, sitemap, RSS, Person JSON-LD, social metadata, and 1200x630 social-card contract; retain `public/social-card-v2.jpg` and do not replace it in this implementation.
- Meet semantic HTML, AA contrast, visible focus, skip link, keyboard access, realistic alt text, reduced-motion support, mobile-first layout, adequate hit targets, no horizontal overflow, eager hero image, and lazy secondary images where applicable.
- Do not add CMS, database, auth, newsletter, invasive analytics, heavy UI/image/theme libraries, DNS changes, or unrelated refactors.
- Commit each independently verified implementation batch with a focused message; integrate to `main` only after review, with no force push.

## Execution workspace and baseline

The implementation engineer must run these commands from the repository root before touching product files:

```bash
git worktree add .worktrees/portfolio-editorial-redesign -b feat/portfolio-editorial-redesign main
cd .worktrees/portfolio-editorial-redesign
git branch --show-current
git rev-parse HEAD
git status --short --branch
bun --version
bun run verify
```

Expected baseline: branch `feat/portfolio-editorial-redesign`, clean worktree, `git rev-parse HEAD` equals `git rev-parse main`, `git show HEAD:docs/superpowers/specs/2026-08-28-portfolio-editorial-redesign-design.md` succeeds, `git show HEAD:docs/superpowers/plans/2026-08-28-portfolio-editorial-redesign.md` succeeds, Bun `1.3.10`, 26 tests passing, `astro check` with 0 errors/0 warnings/0 hints, and a successful build of the existing 14 pages. If any expectation differs, stop and record the difference before implementation.

## File map

### Create

- `public/images/portrait-hero.webp` — optimized copy of approved vertical portrait, with intrinsic dimensions preserved in markup.
- `public/images/portrait-about.webp` — optimized copy of approved horizontal portrait.
- `public/images/editorial-texture.webp` — optimized copy of approved dark geometry for the final CTA only.
- `tests/theme.test.ts` — source-level regression tests for pre-paint initialization, system fallback, persistence, accessible toggle wiring, and light-first tokens.
- `tests/editorial-redesign.test.ts` — source/build contract tests for hero removal, section order, project narrative labels, assets, routes, drafts, and accessibility/performance attributes.

### Modify

- `src/layouts/BaseLayout.astro` — add pre-paint theme initialization in `<head>`, theme metadata, and preserve canonical/OpenGraph/RSS/Person JSON-LD behavior.
- `src/components/layout/Header.astro` — retain centralized navigation and add the minimal labeled theme toggle with keyboard state synchronization.
- `src/styles/global.css` — replace system-only color switching with light-first tokens, `[data-theme="dark"]` tokens, focus/contrast/responsive rules, reduced motion, and no-overflow safeguards.
- `src/components/sections/Hero.astro` — editorial text/image composition, exact headline, three CTAs, context line, and no `HeroProfile` dependency.
- `src/components/sections/Capabilities.astro` — three services in an editorial list/columns composition with reduced technology metadata.
- `src/components/sections/FeaturedProjects.astro` — preserve collection sorting and primary/secondary order while presenting product-first content.
- `src/components/projects/FeaturedProjectCard.astro` — emphasize real mockups and expose `Problema`, `Qué construí`, `Mi participación`, state, and secondary technology metadata.
- `src/components/sections/WorkProcess.astro` — continuous four-step sequence rather than a dominant 2x2 card grid.
- `src/components/sections/ExperienceOverview.astro` — compact technical profile with three capability areas, grouped stack, and CV/experience/GitHub links.
- `src/components/sections/LatestPosts.astro` — one public featured post in a compact editorial layout; filter drafts and retain blog route.
- `src/components/sections/ContactCTA.astro` — dark contrast final CTA, problem-first copy, and subtle approved texture with verified readable contrast.
- `src/components/layout/Footer.astro` — compact factual identity and centralized social/blog links.
- `src/pages/index.astro` — enforce hero → services → projects → process → technical profile → blog → final CTA order and metadata.
- `src/pages/sobre-mi.astro` — human editorial profile, horizontal portrait, factual education/location/areas, and project/CV CTAs.
- `src/pages/proyectos/index.astro` — product-first project index and explicit order/protagonism.
- `src/layouts/ProjectLayout.astro` — case-page narrative scaffolding, status, real visual, and accessible metadata presentation.
- `src/pages/proyectos/[...slug].astro` — preserve collection-generated case routes and pass the revised layout contract.
- `src/content/projects/optimus-thy.mdx` — add/clarify problem, what was built, Andrés’s participation, decisions, and prototype limits without clinical claims.
- `src/content/projects/semillas.mdx` — add/clarify problem, what was built, participation, decisions, and active/in-development state using existing facts.
- `src/content/projects/desktop-remote.mdx` — add/clarify problem, what was built, participation, decisions, and active/in-development state using existing facts.
- `src/data/profile.ts` — retain factual profile values and portrait path used by shared components.
- `src/data/skills.ts` — keep service copy and selective grouped technologies as secondary evidence.
- `src/data/work-process.ts` — provide exact four-step labels and existing factual descriptions.
### Inspect / Preserve

- `src/data/experience.ts` and `src/data/education.ts` — consume their existing factual content without modification.
- `src/data/social.ts` — remain the sole source for social links without modification.
- `src/pages/rss.xml.js` — verify draft filtering and preserve the feed contract without modification.
- `package.json` — preserve the existing scripts and do not add a runtime dependency.
- `wrangler.jsonc` — preserve the existing production asset routing without modification.

### Delete

- `src/components/sections/HeroProfile.astro` — delete after all imports/usages and the obsolete `Puedo ayudarte con` card are removed and regression tests prove no public reference remains.

## Interfaces

- `profile.portrait: string | null` supplies the shared approved portrait path; `Hero.astro` renders the hero image directly with `width`, `height`, `loading="eager"`, `decoding="async"`, and realistic alt text.
- `capabilities` remains a readonly array of `{ title: string; description: string; items: readonly string[] }`; `Capabilities.astro` renders it as editorial content, not three repeated large cards.
- `workProcess` becomes a readonly four-item array of `{ title: string; description: string }`; the component derives visible numbers `01`–`04` and does not hardcode a fifth step.
- `FeaturedProjectCard` consumes `CollectionEntry<'projects'>` and `{ variant: 'primary' | 'secondary' }`; it renders project-specific dashboard components by `project.id` and maps `status` through `active`, `prototype`, and `completed` labels.
- `BaseLayout` keeps `Props` `{ title?: string; description?: string; socialDescription?: string; noindex?: boolean; socialImage?: string; socialImageAlt?: string }`; theme initialization must be inline before body paint and must not change this public prop contract.
- The theme toggle uses `button#theme-toggle` with `type="button"`, an accessible name, `aria-pressed`, and `data-theme-toggle`; its inline/module-free handler writes `localStorage` key `theme`, applies `document.documentElement.dataset.theme`, and listens to `matchMedia('(prefers-color-scheme: dark)')` only when no saved value exists.
- Theme state has exactly three source values: saved `light`, saved `dark`, or system fallback. The DOM attribute is exactly `data-theme="light"` or `data-theme="dark"`.
- The project collections continue to satisfy `src/content.config.ts`: `title`, `description`, `year`, `categories`, `technologies`, `featured`, `status`, `order`, and optional `repoUrl`; blog rendering continues to exclude `draft: true` entries.

## Implementation tasks

### Task 1: Establish isolated execution and test contracts

**Files:**
- Create: `.worktrees/portfolio-editorial-redesign` (worktree, not tracked content)
- Create: `tests/theme.test.ts`
- Create: `tests/editorial-redesign.test.ts`
- Inspect: `package.json` and preserve the existing Bun test, check, build, verify, and deploy scripts

**Interfaces:**
- Produces named Bun tests that later tasks must satisfy: `theme initializer is pre-paint and system-aware`, `theme toggle persists light and dark`, `hero has no legacy profile card`, `home keeps approved section order`, `public assets use semantic paths`, `project cases expose required narrative`, `draft blog posts stay excluded`, and `required routes remain generated`.
- Consumes the baseline commands and existing source paths listed above.

- [ ] **Step 1: Create the worktree and verify baseline**

```bash
git worktree add .worktrees/portfolio-editorial-redesign -b feat/portfolio-editorial-redesign main
cd .worktrees/portfolio-editorial-redesign
git rev-parse HEAD
git status --short --branch
bun --version
bun run verify
```

Expected: `git rev-parse HEAD` equals `git rev-parse main`, both required documents are present at HEAD, the branch is clean, Bun `1.3.10`, 26 passing tests, zero Astro diagnostics, and 14 built pages.

- [ ] **Step 2: Write failing source-contract tests**

Add tests that read exact source files and assert the contracts below:

```ts
import { describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

const read = (path: string) => readFile(path, 'utf8');

test('theme initializer is before body and system-aware', async () => {
  const layout = await read('src/layouts/BaseLayout.astro');
  expect(layout.indexOf('localStorage')).toBeGreaterThanOrEqual(0);
  expect(layout.indexOf('localStorage')).toBeLessThan(layout.indexOf('<body>'));
  expect(layout).toContain('prefers-color-scheme: dark');
  expect(layout).toContain('data-theme');
});

test('home removes legacy profile card and keeps order', async () => {
  const page = await read('src/pages/index.astro');
  const hero = await read('src/components/sections/Hero.astro');
  expect(hero).not.toContain('HeroProfile');
  expect(hero).not.toContain('Puedo ayudarte con');
  const names = ['<Hero />', '<Capabilities />', '<FeaturedProjects />', '<WorkProcess />', '<ExperienceOverview />', '<LatestPosts />', '<ContactCTA />'];
  expect(names.every((name, index) => page.indexOf(name) < page.indexOf(names[index + 1] ?? '\u0000'))).toBe(true);
});

test('used public assets have semantic names', () => {
  expect(existsSync('public/images/portrait-hero.webp')).toBe(true);
  expect(existsSync('public/images/portrait-about.webp')).toBe(true);
});
```

Add equivalent assertions for the four exact process labels, all four case labels, no `/Users/andresgaibor/Downloads` references under `src`/`public`, all six smoke routes in `dist` after build, and draft exclusion in `src/pages/rss.xml.js` and `LatestPosts.astro`.

- [ ] **Step 3: Run the focused tests and verify expected failures**

Run: `bun test tests/theme.test.ts tests/editorial-redesign.test.ts`

Expected: FAIL only because the new theme, asset, narrative, and layout contracts are not implemented yet; the failure output must identify missing assertions rather than a test syntax/import failure.

- [ ] **Step 4: Commit the test contracts**

```bash
git add tests/theme.test.ts tests/editorial-redesign.test.ts package.json
git commit -m "test: define editorial redesign contracts"
```

### Task 2: Copy and optimize approved assets without touching originals

**Files:**
- Create: `public/images/portrait-hero.webp`
- Create: `public/images/portrait-about.webp`
- Create: `public/images/editorial-texture.webp` for the final CTA
- Modify: `tests/editorial-redesign.test.ts`

**Interfaces:**
- Produces stable semantic URLs `/images/portrait-hero.webp`, `/images/portrait-about.webp`, and optional `/images/editorial-texture.webp`.
- Does not alter any file in `/Users/andresgaibor/Downloads`; later Astro components consume only the public URLs.

- [ ] **Step 1: Confirm source dimensions and output policy**

```bash
sips -g pixelWidth -g pixelHeight "/Users/andresgaibor/Downloads/ChatGPT Image 28 ago 2026, 09_54_26 p.m..png"
sips -g pixelWidth -g pixelHeight "/Users/andresgaibor/Downloads/ChatGPT Image 28 ago 2026, 09_54_34 p.m..png"
```

Expected: `1122x1402` for the vertical portrait and `1672x941` for the horizontal portrait. Keep a checksum of each source before copying and verify the source checksum is unchanged afterward.

- [ ] **Step 2: Convert only used approved assets to web formats**

Use the installed macOS conversion tool or an already available project-safe converter; do not install a dependency. Create the semantic WebP files under `public/images/`, preserve the portrait aspect ratios, and keep output dimensions suitable for the rendered sizes. If the texture is not used in the final composition, do not create or ship it.

- [ ] **Step 3: Extend the asset regression test**

Assert that semantic files exist, no tracked source contains `Downloads`, no product markup references a `.png` source from Downloads, and the hero/about components later declare intrinsic dimensions or `aspect-ratio`.

- [ ] **Step 4: Run the asset test and commit**

Run: `bun test tests/editorial-redesign.test.ts`

Expected: asset assertions pass; layout assertions remain red until later tasks.

```bash
git add public/images tests/editorial-redesign.test.ts
git commit -m "feat: add optimized editorial portraits"
```

### Task 3: Implement light-first theme and accessible header toggle

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/layout/Header.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/theme.test.ts`

**Interfaces:**
- Produces the `data-theme` contract and `theme` localStorage behavior defined above.
- `Header.astro` remains static Astro markup; no `client:*` directive or React component is introduced.
- Existing navigation labels and routes remain `Servicios`, `Proyectos`, `Sobre mí`, `CV`, and `Hablemos`.

- [ ] **Step 1: Add failing behavior assertions for toggle semantics**

Assert that source includes `button#theme-toggle`, `type="button"`, an accessible label, `aria-pressed`, `localStorage.getItem('theme')`, `localStorage.setItem('theme'`, `matchMedia('(prefers-color-scheme: dark)')`, and a change handler that updates `document.documentElement.dataset.theme`.

- [ ] **Step 2: Run the focused theme test**

Run: `bun test tests/theme.test.ts`

Expected: FAIL on missing toggle and initializer details.

- [ ] **Step 3: Add the inline pre-paint initializer**

Place an inline script in `BaseLayout.astro` before `<body>` that chooses saved `light`/`dark` first and system preference otherwise, then sets `document.documentElement.dataset.theme` before body content is painted. Use guarded `try/catch` around storage access so private/restricted storage cannot break rendering.

- [ ] **Step 4: Add the minimal toggle handler**

Add a labeled button in the header with `aria-pressed`, visible text or visually hidden state label, and a small script that toggles between `light` and `dark`, persists the choice, updates the root attribute, and keeps the button state synchronized. Ensure Enter/Space works through native button behavior and focus is visible.

- [ ] **Step 5: Replace CSS system-only tokens**

Define warm light tokens on `:root`, dark equivalents on `[data-theme="dark"]`, and a system fallback selector only when no explicit root data attribute is present. Remove the rule that makes dark the default through `color-scheme: light dark`; keep controls, links, dashboard visuals, selection, focus, reduced motion, and print styles readable in both modes.

- [ ] **Step 6: Run tests and commit**

Run: `bun test tests/theme.test.ts && bun run check`

Expected: all theme tests pass and `astro check` reports 0 errors, 0 warnings, 0 hints.

```bash
git add src/layouts/BaseLayout.astro src/components/layout/Header.astro src/styles/global.css tests/theme.test.ts
git commit -m "feat: add persistent light-first theme"
```

### Task 4: Build the editorial home composition

**Files:**
- Modify: `src/components/sections/Hero.astro`
- Modify: `src/components/sections/Capabilities.astro`
- Modify: `src/components/sections/FeaturedProjects.astro`
- Modify: `src/components/projects/FeaturedProjectCard.astro`
- Modify: `src/components/sections/WorkProcess.astro`
- Modify: `src/components/sections/ExperienceOverview.astro`
- Modify: `src/components/sections/LatestPosts.astro`
- Modify: `src/components/sections/ContactCTA.astro`
- Modify: `src/components/layout/Footer.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/data/profile.ts`
- Modify: `src/data/skills.ts`
- Modify: `src/data/work-process.ts`
- Delete: `src/components/sections/HeroProfile.astro`
- Modify: `tests/homepage-structure.test.ts` and `tests/editorial-redesign.test.ts`

**Interfaces:**
- Home consumes `profile`, `capabilities`, `workProcess`, public project collection entries, and non-draft blog entries without duplicating lists or links.
- Home order is exactly `Hero`, `Capabilities`, `FeaturedProjects`, `WorkProcess`, `ExperienceOverview`, `LatestPosts`, `ContactCTA`.
- `FeaturedProjectCard` renders the real project visual for all three IDs and the labels `Problema`, `Qué construí`, and `Mi participación` from factual case data.

- [ ] **Step 1: Update failing homepage assertions**

Change the existing stale expectation that requires `HeroProfile` and `Puedo ayudarte con` into assertions that require the exact headline, three CTA labels, context line, hero portrait URL, and absence of the removed component/copy. Require exactly four process items and reject a dominant three-card service/blog/process structure by checking the intended semantic list/separator markup.

- [ ] **Step 2: Run focused homepage tests**

Run: `bun test tests/homepage-structure.test.ts tests/editorial-redesign.test.ts`

Expected: FAIL on the old hero dependency, missing portrait, new narrative labels, and revised editorial structure.

- [ ] **Step 3: Implement the hero**

Use a semantic `<section>` with text on the left and `/images/portrait-hero.webp` on the right. Render the exact headline at a reduced display scale, retain `Cuéntame qué necesitas`, `Ver proyectos`, and `Ver CV` in that priority order, and add `Software a medida · Automatización · Datos e integraciones`. Use `loading="eager"`, `width="1122"`, `height="1402"`, `decoding="async"`, `aspect-ratio`, and alt text describing the portrait’s role rather than keywords. Remove the `HeroProfile` import and delete the component once no usage remains.

- [ ] **Step 4: Implement services and process as editorial layouts**

Keep the three exact service titles and factual descriptions from `src/data/skills.ts`, render technologies as small metadata, and use rules/columns/whitespace rather than three large repeated cards. Render the process as one sequential `<ol>` with exactly `01 Entiendo`, `02 Propongo`, `03 Construyo`, and `04 Lo dejo funcionando`, preserving the existing descriptions.

- [ ] **Step 5: Implement projects, technical profile, blog, and final CTA**

Make Optimus THY the visually dominant real dashboard, followed by Semillas and Desktop Remote. Keep status labels honest; place problem/what-built/participation before reduced technology metadata. Compact the technical profile under `Para equipos técnicos y reclutadores`, show three capability areas and grouped stack, and link `/cv`, `/experiencia`, and the existing GitHub datum. Limit the home blog to the relevant public post in a compact editorial composition. Render the exact final CTA heading and explanation, with `Contarme mi idea` linking to `/contacto`; use the subtle texture in the CTA and verify readable contrast.

- [ ] **Step 6: Update page metadata and footer without duplicating data**

Keep the existing home title/description intent, preserve shared metadata from `BaseLayout`, and keep footer links sourced from `profile`, `socialLinks`, and `/blog` rather than hardcoded duplicate collections.

- [ ] **Step 7: Run focused tests, check, and commit**

Run: `bun test tests/homepage-structure.test.ts tests/editorial-redesign.test.ts && bun run check`

Expected: all focused tests pass and Astro diagnostics remain zero.

```bash
git add src/components src/pages/index.astro src/data tests/homepage-structure.test.ts tests/editorial-redesign.test.ts
git commit -m "feat: reshape homepage as editorial portfolio"
```

### Task 5: Refactor project cards and case pages around honest evidence

**Files:**
- Modify: `src/components/projects/FeaturedProjectCard.astro`
- Modify: `src/layouts/ProjectLayout.astro`
- Modify: `src/pages/proyectos/index.astro`
- Modify: `src/pages/proyectos/[...slug].astro`
- Modify: `src/content/projects/optimus-thy.mdx`
- Modify: `src/content/projects/semillas.mdx`
- Modify: `src/content/projects/desktop-remote.mdx`
- Modify: `tests/project-visuals.test.ts`
- Modify: `tests/editorial-redesign.test.ts`

**Interfaces:**
- Collection schema remains unchanged and all three generated paths remain `/proyectos/optimus-thy/`, `/proyectos/semillas/`, and `/proyectos/desktop-remote/`.
- Case content supplies factual headings or structured props for `Problema`, `Qué construí`, `Mi participación`, technical decisions, and `Estado actual`; no new claim exceeds the current MDX evidence.

- [ ] **Step 1: Add failing project contract assertions**

Assert project order, all three dashboard imports/usages, all four narrative labels per case/list presentation, status mapping, no generated-image replacement, and preserved collection routing.

- [ ] **Step 2: Run focused project tests**

Run: `bun test tests/project-visuals.test.ts tests/editorial-redesign.test.ts`

Expected: FAIL only on the new narrative and case layout contracts.

- [ ] **Step 3: Update cards and index**

Use product visuals as the main visual weight, reduce chip prominence, expose the factual problem and participation summaries, and keep Optimus as `variant="primary"` with the other two secondary. Preserve the existing dashboard components and `DemoBadge` semantics.

- [ ] **Step 4: Update case layout and MDX copy**

Make the case header expose title, year/category, honest status, description, and reduced technology metadata. Keep the existing deep technical sections and dashboards, but rename/organize introductory sections so each case clearly answers the four required questions where supported. For Optimus explicitly retain prototype and non-diagnostic/non-validated limits; for Semillas and Desktop Remote retain their current active/in-progress facts.

- [ ] **Step 5: Run content and type verification and commit**

Run: `bun test tests/project-visuals.test.ts tests/editorial-redesign.test.ts && bun run check`

Expected: all project tests pass, collection sync succeeds, and Astro diagnostics are zero.

```bash
git add src/components/projects src/layouts/ProjectLayout.astro src/pages/proyectos src/content/projects tests/project-visuals.test.ts tests/editorial-redesign.test.ts
git commit -m "feat: present project cases with honest evidence"
```

### Task 6: Redesign `/sobre-mi` and verify related public routes

**Files:**
- Modify: `src/pages/sobre-mi.astro`
- Inspect: `src/pages/experiencia.astro` and preserve its factual presentation
- Inspect: `src/pages/contacto.astro` and preserve its email-obfuscation/accessibility behavior
- Inspect: `src/pages/cv.astro` and preserve its factual printable-CV behavior
- Modify: `tests/editorial-redesign.test.ts`

**Interfaces:**
- `/sobre-mi` consumes `profile`, `education`, and existing factual areas; it renders `/images/portrait-about.webp` with `width="1672"`, `height="941"`, explicit aspect ratio, lazy loading because it is not the home hero, and realistic alt text.
- `/experiencia`, `/contacto`, and `/cv` remain reachable and preserve their existing factual content and email-obfuscation behavior.

- [ ] **Step 1: Add failing route/content assertions**

Assert the horizontal portrait path and dimensions, human introduction, factual formation/location/areas, links to `/proyectos` and `/cv`, and absence of a generic profile data card. Assert the three related routes still contain their primary headings and link targets.

- [ ] **Step 2: Run the focused route test**

Run: `bun test tests/editorial-redesign.test.ts tests/email-obfuscation.test.ts`

Expected: FAIL on the old `/sobre-mi` card/image contract and pass existing email tests.

- [ ] **Step 3: Implement the editorial `/sobre-mi` page**

Use a semantic introduction, wide portrait block, narrative paragraphs, and fact sections/list separators. Do not add employers, years, clients, metrics, testimonials, or experience claims not present in `src/data/`. Add clear CTAs to `/proyectos` and `/cv`.

- [ ] **Step 4: Check related routes and commit**

Run: `bun test tests/editorial-redesign.test.ts tests/email-obfuscation.test.ts && bun run check`

Expected: route/content and email-obfuscation tests pass with zero Astro diagnostics.

```bash
git add src/pages/sobre-mi.astro tests/editorial-redesign.test.ts
git commit -m "feat: make about page editorial and factual"
```

### Task 7: Verify SEO, drafts, assets, responsive accessibility, and production build

**Files:**
- Modify: `tests/editorial-redesign.test.ts`
- Inspect: `tests/social-metadata.test.ts` and preserve its unchanged contract
- Inspect: `tests/deployment-config.test.ts` and preserve its unchanged contract
- Inspect: `src/layouts/BaseLayout.astro`, `src/pages/rss.xml.js`, and `wrangler.jsonc`; preserve them without modification in this implementation

**Interfaces:**
- Produces a repeatable technical gate covering source contracts and built output, not merely a successful compilation.
- Preserves `canonical`, `sitemap-index.xml`, `/rss.xml`, Person JSON-LD, OpenGraph width/height/type/alt, and public draft exclusion.

- [ ] **Step 1: Add failing build-output and accessibility assertions**

After `bun run build`, inspect `dist` and assert files for `/`, `/proyectos`, `/sobre-mi`, `/experiencia`, `/contacto`, and `/cv`; assert no draft title appears in `dist/blog`, no Downloads path appears in `dist`, image tags have `alt` plus dimensions/aspect ratio, hero is not lazy, secondary image is lazy where present, skip link and `focus-visible` exist, and no generated HTML contains horizontal-width overflow patterns.

- [ ] **Step 2: Run the full local verification gate**

Run:

```bash
bun test
bun run check
bun run build
git diff --check
```

Expected: all tests pass, `astro check` reports zero errors/warnings/hints, build succeeds with the expected public routes and no drafts, and `git diff --check` exits 0.

- [ ] **Step 3: Run a local smoke server**

```bash
bun run preview --host 127.0.0.1 > /tmp/portfolio-editorial-preview.log 2>&1 &
PREVIEW_PID=$!
for path in / /proyectos /sobre-mi /experiencia /contacto /cv; do
  curl --fail --silent --show-error --output /dev/null -w "$path %{http_code}\n" "http://127.0.0.1:4321$path/"
done
kill "$PREVIEW_PID"
```

Expected: six lines ending in `200`; stop the server even if a request fails and record the failing path.

- [ ] **Step 4: Commit the verification contracts and fixes**

```bash
git add tests src/layouts/BaseLayout.astro src/pages/rss.xml.js wrangler.jsonc
git commit -m "test: verify editorial portfolio quality gates"
```

### Task 8: Perform visual audit, review, integration, and final rollout

**Files:**
- Modify only files required by visual regressions discovered in the isolated branch; each fix gets a focused commit.
- Create: `docs/superpowers/reviews/2026-08-28-portfolio-editorial-redesign-visual-audit.md`

**Interfaces:**
- Produces a dated visual audit comparing the deployed site with the production site on desktop and mobile, with route, viewport, observed result, and corrective commit for every finding.
- Produces an integration-ready branch whose final rollout commands are explicit but are not executed in the planning turn.

- [ ] **Step 1: Run local visual audit before integration**

Start the preview server and inspect `/`, `/proyectos`, `/sobre-mi`, and one case page at desktop `1440x1000` and mobile `390x844`. Check light and dark modes, first paint, hero crop/CLS, menu hit targets, project mockups, CTA contrast, typography hierarchy, overflow, focus ring, keyboard path, and reduced-motion behavior. Record pass/fail and screenshots or reproducible observations in the audit file.

- [ ] **Step 2: Re-run all gates after visual fixes**

Run:

```bash
bun run verify
git diff --check
```

Expected: `bun run verify` passes tests, check, and build; `git diff --check` exits 0. Run the six-route smoke command from Task 7 again and record six HTTP 200 responses.

- [ ] **Step 3: Review the complete branch**

```bash
git log --oneline --decorate main..HEAD
git diff --stat main...HEAD
git diff --check main...HEAD
```

Expected: only approved editorial redesign files and tests are changed, every commit is focused/reviewable, no product claim or asset source violates Global Constraints, and the audit has no unresolved failure.

- [ ] **Step 4: Integrate without force operations**

After approval, from the clean main checkout:

```bash
git switch main
git pull --ff-only origin main
git merge --no-ff feat/portfolio-editorial-redesign -m "feat: launch editorial portfolio redesign"
git push origin main
```

Expected: a non-force push to `origin/main` succeeds and contains the reviewed commits only.

- [ ] **Step 5: Deploy and verify publicly only at rollout end**

```bash
bun run deploy
for path in / /proyectos /sobre-mi /experiencia /contacto /cv; do
  curl --fail --silent --show-error --output /dev/null -w "$path %{http_code}\n" "https://andresgaibor.com$path/"
done
```

Expected: `bun run deploy` completes and every public smoke route returns HTTP 200. Confirm `https://andresgaibor.com/`, project assets, canonical metadata, RSS, sitemap, and Person JSON-LD in the deployed HTML. If visual production comparison finds a regression, create a corrective commit and repeat verification before declaring rollout complete. These commands are future execution steps and must not run while writing this plan.

## Required command matrix

| Stage | Command | Expected result |
|---|---|---|
| Baseline in isolated worktree | `bun run verify` | 26 tests pass; Astro check 0/0/0; existing build succeeds with 14 pages |
| Focused theme | `bun test tests/theme.test.ts && bun run check` | Theme contracts pass; zero diagnostics |
| Focused homepage | `bun test tests/homepage-structure.test.ts tests/editorial-redesign.test.ts` | Home contracts pass |
| Focused projects | `bun test tests/project-visuals.test.ts tests/editorial-redesign.test.ts` | Visual/case contracts pass |
| Full verification | `bun run verify` | Tests, check, and build pass |
| Formatting diff | `git diff --check` | Exit 0, no whitespace errors |
| Local smoke | `curl ...` for `/`, `/proyectos`, `/sobre-mi`, `/experiencia`, `/contacto`, `/cv` | Six HTTP 200 responses |
| Visual | desktop/mobile local and production audit | No unresolved layout, theme, accessibility, or content finding |
| Final rollout | `git push origin main` then `bun run deploy` | Non-force push and deployment succeed; public checks pass |

## Acceptance-criteria coverage

| AC | Plan coverage |
|---|---|
| AC-01 | Execution workspace/baseline commands; Task 1 verifies HEAD equals main and both spec/plan exist at that commit; pre-plan foundation SHA is context only; no product implementation in this planning turn |
| AC-02 | Global evidence constraint; Tasks 4–6 problem-first copy review; Task 8 content review |
| AC-03 | Task 4 exact hero, portrait, headline, CTAs, context line, removal of legacy card, and exact home order |
| AC-04 | Task 4 editorial services/process/profile/blog layouts and exactly four process steps |
| AC-05 | Task 5 project order, real dashboards, four narrative questions, metadata, and honest status |
| AC-06 | Task 6 horizontal portrait, factual editorial `/sobre-mi`, and project/CV CTAs |
| AC-07 | Task 3 light-first tokens, pre-paint initializer, system fallback, persistence, accessible toggle, and reduced-motion support |
| AC-08 | Task 2 approved asset conversion, semantic names, unchanged Downloads originals, and source-reference scan |
| AC-09 | Global accessibility constraints; Tasks 3–7 focus, contrast, keyboard, skip link, alt, dimensions, lazy loading, responsive and overflow checks |
| AC-10 | Task 7 metadata/build contracts; BaseLayout and RSS preservation; `public/social-card-v2.jpg` is retained in this implementation |
| AC-11 | Tasks 1 and 7 tests, `astro check`, build, `git diff --check`, and six-route smoke |
| AC-12 | Task 8 visual desktop/mobile audit, reviewable commits, non-force push, final `bun run deploy`, public checks, and explicit prohibition on executing rollout here |

## Self-review before implementation handoff

- **Spec coverage:** AC-01 through AC-12 each map to at least one named task and command gate above; all design sections (objectives, non-objectives, visual system, assets, architecture, page sections, routes, responsive/accessibility/performance, SEO, testing, rollout, and risks) are represented.
- **Placeholder scan:** the plan was searched for unresolved planning language and contains none. Asset decisions are closed: ship the two portraits and the dark texture for the final CTA; do not ship the laptop or abstract architecture image. Retain the current 1200x630 social card.
- **Interface consistency:** `profile.portrait`, `workProcess`, `FeaturedProjectCard`, `BaseLayout` props, `theme` storage key, `data-theme` values, collection fields, and route names are defined once and used consistently by later tasks.
- **Scope check:** the work remains one cohesive Astro portfolio redesign; no backend, CMS, auth, new product subsystem, or React migration is introduced.
- **Plan-only state:** writing this document must not copy assets, edit product code, run push/deploy, or alter the isolated worktree; the only permitted current-turn repository change is this plan document and its documentation commit.
