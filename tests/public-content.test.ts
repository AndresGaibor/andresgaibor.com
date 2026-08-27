// @ts-nocheck
import { describe, expect, test } from 'bun:test';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { profile } from '../src/data/profile';

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
      const content = (await readFile(file, 'utf8')).toLowerCase();
      if (content.includes('qlik')) matches.push(file);
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

  test('uses approved professional positioning', () => {
    expect(profile.role).toBe('Software Engineer | Full Stack & Data Engineering');
    expect(profile.headline).toBe(
      'Construyo productos, automatizaciones y sistemas de datos de extremo a extremo.',
    );
  });
});
