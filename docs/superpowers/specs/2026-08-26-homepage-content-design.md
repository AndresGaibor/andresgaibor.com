# Homepage content and positioning design

Date: 2026-08-26
Status: Approved for implementation planning

## Objective

Turn `andresgaibor.com` from a technically complete Astro foundation into a professional personal site that sells Andrés primarily for software engineering roles, while keeping a secondary path for project-based client work.

The homepage must help a recruiter or hiring manager understand in seconds what Andrés builds, how broad his engineering range is, and where to find proof of that capability.

## Positioning

Primary professional identity:

**Software Engineer | Full Stack & Data Engineering**

Primary hero message:

**Construyo productos, automatizaciones y sistemas de datos de extremo a extremo.**

Supporting message:

Software Engineer | Full Stack & Data Engineering. Diseño desde interfaces y APIs hasta integraciones, pipelines y procesamiento de datos a escala.

## Audience and conversion goals

Primary audience: recruiters, hiring managers, and engineering leaders evaluating Andrés for software engineering roles.

Secondary audience: companies or clients looking for help with product engineering, backend, data engineering, automation, or technical tooling.

Primary calls to action:

- Ver proyectos
- Ver experiencia

Secondary call to action:

- Contactarme / Trabajemos juntos

The site must not label Andrés publicly as "Junior". It should demonstrate level through work, technical decisions, scope, and clarity without overstating seniority.

## Visual direction

Use an editorial technical minimalism rather than a generic corporate template or hacker aesthetic.

Key traits:

- neutral background and strong typography;
- generous spacing and clear hierarchy;
- thin borders and restrained surfaces;
- large project visuals where useful;
- minimal animation used only to improve polish;
- no skill percentage bars, neon effects, particles, or walls of technology logos.

## Homepage structure

### 1. Hero

The hero uses an asymmetric layout: approximately two thirds copy and calls to action, one third professional portrait and compact engineering context.

Content:

- primary headline defined above;
- supporting copy focused on end-to-end engineering;
- CTA hierarchy: projects, experience, contact;
- discreet context such as `Software Engineer`, `Full Stack + Data`, and `Ecuador · Remoto`.

The portrait should feel integrated into the editorial composition rather than displayed as a large CV headshot.

### 2. Capabilities

Keep three clear capability groups:

1. Software Engineering
2. Data Engineering
3. Automation

Descriptions should explain the kinds of systems and problems Andrés can handle. Technologies remain supporting evidence, not the headline.

### 3. Featured work

The project hierarchy is intentionally asymmetric rather than three equal cards.

#### Optimus THY — primary case study

Position Optimus THY as a thesis project in development that demonstrates full-stack product engineering, AI integration, data handling, and privacy-oriented architecture.

Public copy may discuss capabilities such as clinical information management, images/documents, roles, traceability, local OCR or AI-assisted workflows only where they reflect the real implementation or documented architecture.

Do not claim clinical validation, diagnostic accuracy, medical outcomes, or production readiness unless those claims become independently verifiable later.

The product must be described as supporting professional analysis, not replacing medical judgment.

#### Semillas — secondary case study

Use Semillas to demonstrate full-stack product engineering, interactive UX, content modeling, administration, progress tracking, PWA concerns, and lightweight cloud architecture.

#### Desktop Remote — secondary case study

Use Desktop Remote to demonstrate developer tooling, automation, MCP integrations, secure remote execution architecture, infrastructure, and AI-assisted development workflows.

### Confidential project removal

Remove Qlik Report completely from the public portfolio.

This includes:

- its project page;
- project cards and featured-work references;
- public navigation or generated collection entries;
- homepage metrics or copy that could identify the confidential project;
- Qlik-specific public references derived from that project.

### 4. Impact and evidence

Avoid invented vanity metrics. This section should demonstrate engineering range through concrete, defensible evidence.

Initial themes:

- end-to-end systems spanning UI, APIs, persistence, and deployment;
- data processing, SQL, ETL/ELT, and automation;
- AI integration inside real product workflows;
- developer tooling, infrastructure, and remote automation.

Only add numeric metrics when they come from public projects and can be verified without exposing confidential work.

### 5. Experience and education

Present experience as a concise professional narrative rather than trying to imitate years of traditional employment history.

Emphasize:

- software engineering focused on product and data;
- full-stack system ownership;
- backend, persistence, integrations, and deployment;
- data engineering and automation;
- practical technical research where it directly supports real systems.

Education should remain visible but should not dominate the homepage.

### 6. Core technologies

Show a restrained text-based technology line instead of logo walls.

Initial emphasis:

`TypeScript · React · Python · FastAPI · Bun · PostgreSQL · SQL · Cloudflare · Docker`

The exact list may evolve as project content is verified, but it should stay selective.

### 7. Blog

The homepage shows at most three recent, substantive technical posts.

Editorial themes should come from real work:

- full-stack architecture and product engineering;
- automation and developer tooling;
- data engineering;
- AI integration and privacy;
- technical decisions from public projects such as Optimus THY, Semillas, or Desktop Remote.

Avoid generic tutorial filler written only for SEO.

### 8. Final CTA

End with a direct employment-first message that still permits project work.

Suggested direction:

**¿Construimos algo útil?**

Explain that Andrés is open to Software Engineer opportunities and selected projects involving product, backend, data, or automation.

Primary actions: Contactarme and Ver CV.

### 9. Footer

Keep the footer compact:

- Andrés Gaibor · Software Engineer
- GitHub
- LinkedIn
- email
- RSS

Do not repeat the full navigation hierarchy.

## Phase 1 scope

This phase includes:

- homepage content and visual hierarchy;
- new Optimus THY public case-study entry;
- stronger Semillas and Desktop Remote presentation where needed for homepage use;
- experience/evidence content used by the homepage;
- removal of Qlik Report from all public portfolio output;
- responsive and accessible presentation of the changed sections.

This phase does not include:

- course platform;
- authentication or backend services for the personal site;
- newsletter infrastructure;
- `/lab` product work;
- a full blog expansion;
- the final downloadable CV PDF;
- analytics or Search Console setup.

## Implementation constraints

- Keep Astro as the primary rendering framework.
- Use React only for interactions that genuinely need client-side state.
- Preserve static rendering and current Cloudflare Workers Static Assets deployment.
- Reuse existing content collections and component patterns where they remain clear.
- Do not introduce a CMS, database, auth layer, or new backend for this phase.
- Preserve the user's uncommitted local `public/favicon.svg` change unless separately approved.
- Work through a preview branch before merging to production `main`.

## Verification

Before merging the implementation:

1. `bun run check` must report no errors, warnings, or hints introduced by the change.
2. `bun run build` must complete successfully.
3. Public build output must contain no Qlik Report project route or Qlik-specific portfolio reference.
4. Optimus THY copy must avoid unsupported clinical or diagnostic claims.
5. Homepage must be usable at mobile, tablet, and desktop widths.
6. Main CTAs must be keyboard accessible and have visible focus states.
7. Featured-project links must resolve to public project pages.
8. The Cloudflare preview deployment must be reviewed before merging to `main`.

## Success criteria

A first-time visitor should understand within a few seconds that Andrés is a Software Engineer spanning full-stack product work and data engineering, see three credible public projects led by Optimus THY, and have an obvious path to projects, experience, CV, or contact without encountering confidential project material.
