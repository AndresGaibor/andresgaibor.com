// @ts-nocheck
import { expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';

const read = (path: string) => readFile(path, 'utf8');

function attribute(html: string, name: string): string | undefined {
  return html.match(new RegExp(`${name}=["']([^"']+)["']`))?.[1];
}

function imageBySource(html: string, source: string): string {
  const image = html.match(new RegExp(`<img\\b[^>]*src=["']${source.replaceAll('/', '\\/')}["'][^>]*>`))?.[0];
  expect(image).toBeDefined();
  return image ?? '';
}

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

test('about page exposes factual editorial composition and preserves related routes', async () => {
  const about = await read('src/pages/sobre-mi.astro');
  const experiencia = await read('src/pages/experiencia.astro');
  const contacto = await read('src/pages/contacto.astro');
  const cv = await read('src/pages/cv.astro');

  expect(about).toContain("import { profile } from '../data/profile'");
  expect(about).toContain("import { education } from '../data/education'");
  expect(about).toContain("import { experience } from '../data/experience'");
  expect(about).toContain('/images/portrait-about.webp');
  expect(about).toContain('width="1672"');
  expect(about).toContain('height="941"');
  expect(about).toContain('loading="lazy"');
  expect(about).toContain('decoding="async"');
  expect(about).toContain('aspect-ratio: 1672 / 941');
  expect(about).toContain('Andrés Gaibor trabajando en un entorno de desarrollo de software');
  expect(about).toContain('Me gusta entender el problema completo antes de construir la solución.');
  expect(about).toContain('{profile.location}');
  expect(about).toContain('{education[0].title}');
  expect(about).toContain('{education[0].institution}');
  expect(about).toContain('{education[0].description}');
  expect(about).toContain('experience.map');
  expect(about).toContain('href="/proyectos"');
  expect(about).toContain('href="/cv"');
  expect(about).not.toContain('<aside');
  expect(about).not.toContain('Perfil actual');

  expect(experiencia).toContain('Qué puedo aportar a un equipo técnico.');
  expect(contacto).toContain('Cuéntame qué quieres mejorar.');
  expect(cv).toContain('Versión web imprimible del CV.');
  expect(cv).toContain("id=\"print-cv\"");
});

test('header keeps mobile actions discoverable without a scrollable nav', async () => {
  const header = await read('src/components/layout/Header.astro');

  expect(header).not.toContain('overflow-x-auto');
  expect(header).toMatch(/<nav[^>]*class="[^"]*hidden[^"]*sm:flex/);
  expect(header).toContain('<details');
  expect(header).toMatch(/<summary[^>]*>\s*Menú\s*<\/summary>/);
  expect(header).toContain('aria-label="Navegación móvil"');
  expect(header).toContain("{ href: '/#servicios', label: 'Servicios', section: true }");
  expect(header).toContain("{ href: '/proyectos', label: 'Proyectos' }");
  expect(header).toContain("{ href: '/sobre-mi', label: 'Sobre mí' }");
  expect(header).toContain("{ href: '/cv', label: 'CV' }");
  expect((header.match(/nav\.map/g) ?? []).length).toBe(2);
  expect((header.match(/id="theme-toggle"/g) ?? []).length).toBe(1);
  expect(header).toContain('class="min-h-11 rounded-lg border');
  expect(header).toContain('class="flex min-h-11 items-center rounded-lg bg-[var(--text)]');
  expect(header).toContain('class="flex min-h-11 min-w-11 items-center');
  expect(header).toMatch(/<summary[^>]*class="[^"]*min-h-11/);

  const desktopNavEnd = header.indexOf('</nav>');
  const themeToggle = header.indexOf('id="theme-toggle"');
  expect(themeToggle).toBeGreaterThan(desktopNavEnd);
  expect(header.indexOf('aria-label="Navegación móvil"')).toBeGreaterThan(themeToggle);
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

test('quality gate preserves routes, drafts, images, accessibility and metadata', async () => {
  const routes = ['', 'proyectos', 'sobre-mi', 'experiencia', 'contacto', 'cv'];
  for (const route of routes) {
    expect(existsSync(route ? `dist/${route}/index.html` : 'dist/index.html')).toBe(true);
  }

  const distFiles = await sourceFiles('dist');
  const textFiles = distFiles.filter((path) => /\\.(html|js|css|xml|txt|json)$/.test(path));
  const distText = (await Promise.all(textFiles.map(read))).join('\\n');
  expect(distText).not.toContain('/Users/andresgaibor/Downloads');
  expect(distText).not.toContain('Exportaciones BigQuery a gran escala sin romper el presupuesto');
  expect(distText).not.toContain('borrador-exportaciones-bigquery');

  const home = await read('dist/index.html');
  const heroImage = imageBySource(home, '/images/portrait-hero.webp');
  expect(attribute(heroImage, 'alt')).toBe('Retrato de Andrés Gaibor en su espacio de trabajo');
  expect(attribute(heroImage, 'width')).toBe('1122');
  expect(attribute(heroImage, 'height')).toBe('1402');
  expect(attribute(heroImage, 'loading')).not.toBe('lazy');

  const about = await read('dist/sobre-mi/index.html');
  const aboutImage = imageBySource(about, '/images/portrait-about.webp');
  expect(attribute(aboutImage, 'alt')).toBe('Andrés Gaibor trabajando en un entorno de desarrollo de software');
  expect(attribute(aboutImage, 'width')).toBe('1672');
  expect(attribute(aboutImage, 'height')).toBe('941');
  expect(attribute(aboutImage, 'loading')).toBe('lazy');
});

test('quality gate preserves accessibility and metadata source contracts', async () => {
  const layout = await read('src/layouts/BaseLayout.astro');
  const globalStyles = await read('src/styles/global.css');
  const rss = await read('src/pages/rss.xml.js');

  expect(layout).toContain('href="#contenido"');
  expect(layout).toContain('<main id="contenido">');
  expect(globalStyles).toContain(':focus-visible');
  expect(layout).toContain("'@type': 'Person'");
  expect(layout).toContain("socialImage = '/social-card-v2.jpg'");
  expect(layout).toContain('rel="canonical"');
  expect(layout).toContain('application/rss+xml');
  expect(rss).toContain("getCollection('blog', ({ data }) => !data.draft)");

  const productSource = (await Promise.all((await sourceFiles('src')).map(read))).join('\\n');
  expect(productSource).not.toMatch(/(?:w-screen|min-w-screen)/);
  expect(productSource).not.toMatch(/style=["'][^"']*width:\\s*(?:[1-9]\\d{3,}|\\d{3,}\\.[^"']*px)/);
});

test('draft blog posts stay excluded', async () => {
  const rss = await read('src/pages/rss.xml.js');
  const latestPosts = await read('src/components/sections/LatestPosts.astro');

  expect(rss).toContain("({ data }) => !data.draft");
  expect(latestPosts).toContain("({ data }) => !data.draft");
});
