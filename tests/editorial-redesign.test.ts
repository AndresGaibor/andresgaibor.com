// @ts-nocheck
import { expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';

const read = (path: string) => readFile(path, 'utf8');

async function sourceFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) files.push(...(await sourceFiles(path)));
    else files.push(path);
  }
  return files;
}

test('hero exposes the editorial portrait contract', async () => {
  const hero = await read('src/components/sections/Hero.astro');

  expect(hero).not.toContain('HeroProfile');
  expect(hero).not.toContain('Puedo ayudarte con');
  const profile = await read('src/data/profile.ts');
  expect(profile).toContain('Software a medida · Automatización · Datos e integraciones');
  expect(hero).toContain('/images/portrait-hero.webp');
  expect(hero).toContain('width="1122"');
  expect(hero).toContain('height="1402"');
  expect(hero).toContain('loading="eager"');
  expect(hero).toContain('decoding="async"');
});

test('home keeps approved section order', async () => {
  const page = await read('src/pages/index.astro');
  const names = [
    '<Hero />',
    '<Capabilities />',
    '<FeaturedProjects />',
    '<WorkProcess />',
    '<ExperienceOverview />',
    '<LatestPosts />',
    '<ContactCTA />',
  ];

  const positions = names.map((name) => page.indexOf(name));
  expect(positions.every((position, index) => index === 0 || position > positions[index - 1])).toBe(true);
});

test('public assets use semantic paths', async () => {
  const files = await sourceFiles('src');
  const content = await Promise.all(files.map(read));
  const productSource = content.join('\n');

  expect(existsSync('public/images/portrait-hero.webp')).toBe(true);
  expect(existsSync('public/images/portrait-about.webp')).toBe(true);
  expect(existsSync('public/images/editorial-texture.webp')).toBe(true);
  expect(productSource).not.toContain('/Users/andresgaibor/Downloads');
  expect(productSource).not.toMatch(/Downloads[^\n]*\.png/);
});

test('work process exposes four titles and descriptions', async () => {
  const process = await read('src/data/work-process.ts');
  const workProcess = await read('src/components/sections/WorkProcess.astro');

  for (const title of ['Entiendo', 'Propongo', 'Construyo', 'Lo dejo funcionando']) {
    expect(process).toContain(`title: '${title}'`);
  }
  expect(process).toContain('Reviso cómo trabajas hoy, qué te está quitando tiempo y qué resultado necesitas.');
  expect(process).toContain('Defino qué conviene construir, qué no hace falta y cómo debería funcionar.');
  expect(process).toContain('Desarrollo por etapas para revisar el resultado, detectar problemas y corregir antes de terminar.');
  expect(process).toContain('Configuro la solución, documento lo necesario y dejo claro cómo utilizarla y mantenerla.');
  expect(workProcess).toContain('<ol');
  expect(workProcess).toContain("String(index + 1).padStart(2, '0')");
  expect(workProcess).toContain('workProcess.map');
  expect((process.match(/title:/g) ?? []).length).toBe(4);
});

test('project cases expose the four exact narrative headings', async () => {
  const projects = await Promise.all(
    ['optimus-thy', 'semillas', 'desktop-remote'].map((id) => read(`src/content/projects/${id}.mdx`)),
  );

  for (const project of projects) {
    for (const heading of ['## Problema', '## Qué construí', '## Mi participación', '## Estado actual']) {
      expect(project).toContain(heading);
    }
  }
});

test('product source contains no Downloads references', async () => {
  const files = [...(await sourceFiles('src')), ...(await sourceFiles('public'))];
  const content = await Promise.all(files.map(read));

  expect(content.join('\n')).not.toContain('/Users/andresgaibor/Downloads');
});

test('required public routes remain generated', () => {
  for (const route of ['', 'proyectos', 'sobre-mi', 'experiencia', 'contacto', 'cv']) {
    expect(existsSync(route ? `dist/${route}/index.html` : 'dist/index.html')).toBe(true);
  }
});

test('draft blog posts stay excluded', async () => {
  const rss = await read('src/pages/rss.xml.js');
  const latestPosts = await read('src/components/sections/LatestPosts.astro');

  expect(rss).toContain("({ data }) => !data.draft");
  expect(latestPosts).toContain("({ data }) => !data.draft");
});
