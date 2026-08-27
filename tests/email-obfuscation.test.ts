// @ts-nocheck
import { expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const distDir = fileURLToPath(new URL('../dist/', import.meta.url));
const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;

test('built HTML does not expose an email address or mailto link', async () => {
  const pages = [...new Bun.Glob('**/*.html').scanSync({ cwd: distDir })];
  const leaks = [];

  for (const page of pages) {
    const html = await readFile(`${distDir}/${page}`, 'utf8');
    if (emailPattern.test(html) || html.toLowerCase().includes('mailto:')) leaks.push(page);
  }

  expect(leaks).toEqual([]);
});

test('the contact email artwork contains paths, not readable email text', async () => {
  const svg = await readFile(`${distDir}/contact-email.svg`, 'utf8');

  expect(svg).not.toMatch(emailPattern);
  expect(svg.toLowerCase()).not.toContain('<text');
  expect(svg.toLowerCase()).toContain('<path');
});
