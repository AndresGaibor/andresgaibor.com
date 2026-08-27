export const capabilities = [
  {
    title: 'Software Engineering',
    description: 'Productos web, APIs y herramientas internas mantenibles, rápidas y pensadas para crecer.',
    items: ['TypeScript', 'React', 'Astro', 'Bun', 'APIs', 'PostgreSQL'],
  },
  {
    title: 'Data Engineering',
    description: 'Pipelines, SQL, procesamiento y exportación de datos con foco en rendimiento y costo.',
    items: ['BigQuery', 'SQL', 'ETL / ELT', 'Data modeling', 'Data pipelines', 'BI'],
  },
  {
    title: 'Automation',
    description: 'Automatización de procesos, integraciones y herramientas para eliminar trabajo manual repetitivo.',
    items: ['Python', 'Web automation', 'APIs', 'Integrations', 'AI tooling', 'Linux'],
  },
] as const;

export const coreTechnologies = [
  'TypeScript',
  'React',
  'Astro',
  'Bun',
  'Python',
  'SQL',
  'PostgreSQL',
  'BigQuery',
  'Docker',
  'Cloudflare',
] as const;
