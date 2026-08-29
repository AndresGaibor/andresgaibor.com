// @ts-nocheck
import { describe, expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';

const read = (path: string) => readFile(path, 'utf8');

describe('homepage structure', () => {
  test('hero exposes clear language and approved conversion paths', async () => {
    const hero = await read('src/components/sections/Hero.astro');
    const profile = await read('src/data/profile.ts');
    expect(profile).toContain('Convierto problemas y procesos manuales en software útil.');
    expect(profile).toContain('Software a medida · Automatización · Datos e integraciones');
    expect(hero).toContain('Cuéntame qué necesitas');
    expect(hero).toContain('href="/contacto"');
    expect(hero).toContain('Ver proyectos');
    expect(hero).toContain('href="/proyectos"');
    expect(hero).toContain('Ver CV');
    expect(hero).toContain('href="/cv"');
    expect(hero).toContain('/images/portrait-hero.webp');
    expect(hero).toContain('Retrato de Andrés Gaibor en su espacio de trabajo');
    expect(hero).not.toContain('HeroProfile');
    expect(hero).not.toContain('Puedo ayudarte con');
  });

  test('services, contact navigation and blog remain discoverable', async () => {
    const capabilities = await read('src/components/sections/Capabilities.astro');
    const header = await read('src/components/layout/Header.astro');
    const footer = await read('src/components/layout/Footer.astro');
    expect(capabilities).toContain('id="servicios"');
    expect(capabilities).toContain('border-t');
    expect(header).toContain("label: 'Servicios'");
    expect(header).toContain('Hablemos');
    expect(header).toContain('href="/contacto"');
    expect(footer).toContain('href="/blog"');
    expect(header).not.toContain("label: 'Blog'");
  });

  test('homepage sections remain Astro-first', async () => {
    const hero = await read('src/components/sections/Hero.astro');
    expect(hero).not.toMatch(/client:(load|idle|visible|only)/);
  });

  test('featured work has one primary and two secondary projects', async () => {
    const section = await read('src/components/sections/FeaturedProjects.astro');
    expect(section).toContain('FeaturedProjectCard');
    expect(section).toContain('variant="primary"');
    expect(section).toContain('variant="secondary"');
    expect(section).toContain('const [primary, ...secondary]');
  });

  test('homepage uses the approved section order and process section', async () => {
    const page = await read('src/pages/index.astro');
    expect(page).toContain('<WorkProcess />');
    expect(page).not.toContain('ImpactEvidence');
    const projects = page.indexOf('<FeaturedProjects />');
    const process = page.indexOf('<WorkProcess />');
    const experience = page.indexOf('<ExperienceOverview />');
    const blog = page.indexOf('<LatestPosts />');
    const contact = page.indexOf('<ContactCTA />');
    const sections = [
      page.indexOf('<Hero />'),
      page.indexOf('<Capabilities />'),
      projects,
      process,
      experience,
      blog,
      contact,
    ];
    expect(sections.every((position, index) => index === 0 || position > sections[index - 1])).toBe(true);
  });

  test('final CTA is problem-first and keeps contact and CV paths', async () => {
    const cta = await read('src/components/sections/ContactCTA.astro');
    expect(cta).toContain('¿Tienes algo que quieres mejorar?');
    expect(cta).toContain('Contarme mi idea');
    expect(cta).toContain('href="/contacto"');
  });

  test('blog copy is editorial rather than CMS-focused', async () => {
    const posts = await read('src/components/sections/LatestPosts.astro');
    expect(posts.toLowerCase()).not.toContain('cms');
    expect(posts).toContain('problemas reales');
    expect(posts).toContain('Ideas y aprendizajes');
  });
});
