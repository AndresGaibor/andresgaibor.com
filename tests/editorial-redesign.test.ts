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

test('hero has no legacy profile card', async () => {
  const hero = await read('src/components/sections/Hero.astro');

  expect(hero).not.toContain('HeroProfile');
  expect(hero).not.toContain('Puedo ayudarte con');
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

  expect(names.every((name, index) => page.indexOf(name) < page.indexOf(names[index + 1] ?? '\u0000'))).toBe(true);
});

test('public assets use semantic paths', async () => {
  const files = await sourceFiles('src');
  const content = await Promise.all(files.map(read));
  const productSource = content.join('\n');

  expect(existsSync('public/images/portrait-hero.webp')).toBe(true);
  expect(existsSync('public/images/portrait-about.webp')).toBe(true);
  expect(productSource).not.toContain('/Users/andresgaibor/Downloads');
  expect(productSource).not.toMatch(/Downloads[^\n]*\.png/);
});

test('work process exposes the four approved labels', async () => {
  const process = await read('src/data/work-process.ts');

  for (const label of ['01 Entiendo', '02 Propongo', '03 Construyo', '04 Lo dejo funcionando']) {
    expect(process).toContain(label);
  }
});

test('project cases expose required narrative labels', async () => {
  const projects = await Promise.all(
    ['optimus-thy', 'semillas', 'desktop-remote'].map((id) => read(`src/content/projects/${id}.mdx`)),
  );

  for (const project of projects) {
    expect(project).toContain('Problema');
    expect(project).toContain('Qué construí');
    expect(project).toContain('Mi participación');
    expect(project).toContain('Tecnologías');
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
