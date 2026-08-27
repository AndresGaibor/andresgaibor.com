// @ts-nocheck
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

  test('featured work has one primary and two secondary projects', async () => {
    const section = await read('src/components/sections/FeaturedProjects.astro');
    expect(section).toContain('FeaturedProjectCard');
    expect(section).toContain('variant="primary"');
    expect(section).toContain('variant="secondary"');
    expect(section).toContain('const [primary, ...secondary]');
  });
});
