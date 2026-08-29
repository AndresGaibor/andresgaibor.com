// @ts-nocheck
import { describe, expect, test } from 'bun:test';
import { extname, join } from 'node:path';
import { readdir, readFile } from 'node:fs/promises';
import { profile } from '../src/data/profile';
import { coreTechnologies } from '../src/data/skills';
import { experience } from '../src/data/experience';
import { workProcess } from '../src/data/work-process';

const TEXT_EXTENSIONS = new Set(['.astro', '.ts', '.md', '.mdx', '.css', '.json', '.svg', '.xml']);

async function textFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory()
        ? textFiles(path)
        : Promise.resolve(TEXT_EXTENSIONS.has(extname(path)) ? [path] : []);
    }),
  );
  return nested.flat();
}

describe('public portfolio policy', () => {
  test('does not expose Qlik references', async () => {
    const files = [...(await textFiles('src')), ...(await textFiles('public'))];
    const matches: string[] = [];

    for (const file of files) {
      if ((await readFile(file, 'utf8')).toLowerCase().includes('qlik')) matches.push(file);
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

  test('uses clear approved professional positioning', () => {
    expect(profile.role).toBe('Software a medida · Automatización · Datos e integraciones');
    expect(profile.headline).toBe('Convierto problemas y procesos manuales en software útil.');
  });

  test('keeps the public technology list selective', () => {
    expect(coreTechnologies).toEqual([
      'TypeScript',
      'React',
      'Python',
      'FastAPI',
      'Bun',
      'PostgreSQL',
      'SQL',
      'Cloudflare',
      'Docker',
    ]);
  });

  test('publishes the human work process without invented evidence', () => {
    expect(workProcess).toHaveLength(4);
    expect(JSON.stringify({ experience, workProcess }).toLowerCase()).not.toContain('métricas inventadas');
  });
});
