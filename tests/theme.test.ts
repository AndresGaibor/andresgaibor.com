import { expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';

const read = (path: string) => readFile(path, 'utf8');

test('theme initializer is pre-paint and system-aware', async () => {
  const layout = await read('src/layouts/BaseLayout.astro');
  const bodyIndex = layout.indexOf('<body>');

  expect(layout.indexOf('localStorage')).toBeGreaterThanOrEqual(0);
  expect(layout.indexOf('localStorage')).toBeLessThan(bodyIndex);
  expect(layout).toContain("matchMedia('(prefers-color-scheme: dark)')");
  expect(layout).toContain('data-theme');
  expect(layout).toContain("getItem('theme')");
  expect(layout).toContain('try');
  expect(layout).toContain('catch');
});

test('theme toggle persists light and dark', async () => {
  const header = await read('src/components/layout/Header.astro');
  const layout = await read('src/layouts/BaseLayout.astro');

  expect(header).toContain('button#theme-toggle');
  expect(header).toContain('type="button"');
  expect(header).toContain('aria-pressed');
  expect(header).toContain('data-theme-toggle');
  expect(header).toMatch(/aria-label="[^"]+"/);
  expect(header).not.toContain('client:');
  expect(header).not.toContain('React');
  expect(layout).toContain("localStorage.setItem('theme'");
  expect(layout).toContain('document.documentElement.dataset.theme');
});

test('light-first theme tokens retain dark and accessibility safeguards', async () => {
  const css = await read('src/styles/global.css');

  expect(css).toContain(':root');
  expect(css).toContain('[data-theme="dark"]');
  expect(css).toContain('@media (prefers-color-scheme: dark)');
  expect(css).not.toContain('color-scheme: light dark');
  expect(css).toContain('prefers-reduced-motion');
  expect(css).toContain('focus-visible');
  expect(css).toContain('@media print');
});
