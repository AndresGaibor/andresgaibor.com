# AGENTS.md — andresgaibor.com

## Propósito

Este repo contiene el sitio profesional de Andrés Gaibor. Debe seguir siendo un sitio de contenido rápido y mantenible; no una SPA generalista.

## Arquitectura

- Astro controla páginas, layouts y renderizado estático.
- TypeScript permanece en modo strict.
- Tailwind 4 se integra con `@tailwindcss/vite`.
- React existe solo para islands interactivas en `src/components/react/`.
- Proyectos y blog son Content Collections en MDX.
- No hay backend, auth, base de datos ni CMS en esta fase.

## Mapa rápido

```text
src/
├── components/
│   ├── blog/       # UI de artículos
│   ├── layout/     # header/footer
│   ├── projects/   # UI de proyectos
│   ├── react/      # solo islands con JS cliente
│   ├── sections/   # secciones grandes
│   └── ui/         # primitives Astro
├── content/
│   ├── blog/
│   └── projects/
├── data/           # perfil y datos reutilizados
├── layouts/
├── pages/          # routing Astro
├── styles/
└── content.config.ts
```

## Reglas de implementación

1. Prefiere `.astro` para cualquier contenido estático.
2. Antes de añadir una island React, confirma que necesita estado/eventos en cliente.
3. Usa la directiva de hidratación menos agresiva posible; evita `client:load` salvo que sea esencial al primer render.
4. No dupliques datos de perfil o enlaces: modifica `src/data/`.
5. No hardcodees listados de posts/proyectos: consulta Content Collections.
6. Los borradores de blog usan `draft: true` y nunca deben entrar en RSS ni rutas públicas.
7. No añadas CMS, base de datos, auth, analytics invasivos o backend sin una necesidad aprobada.
8. No publiques secretos, nombres de clientes confidenciales ni detalles internos en casos de estudio.
9. Mantén HTML semántico, focus visible y soporte de `prefers-reduced-motion`.
10. No despliegues ni modifiques DNS sin instrucción explícita.

## Validación obligatoria

Antes de considerar un cambio terminado:

```bash
bun run verify
```

Debe finalizar con 0 errores. Revisa además que los borradores no aparezcan en `dist/blog/`.

## Contenido

Schemas: `src/content.config.ts`.

- Proyectos: `src/content/projects/*.mdx`
- Blog: `src/content/blog/*.mdx`

Usa `project.id` / `post.id` para URLs; las colecciones modernas de Astro usan IDs generados por el loader `glob()`.

## Diseño

Dirección visual: profesional, editorial, técnica y minimalista. Evita neón, animaciones decorativas excesivas, dashboards genéricos y componentes innecesarios.

## Documentos clave

- `docs/superpowers/specs/2026-08-26-andresgaibor-site-design.md`
- `docs/superpowers/plans/2026-08-26-andresgaibor-site.md`
