// @ts-nocheck
import { expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';

test('Cloudflare keeps production domains while enabling version preview URLs', async () => {
  const config = await readFile('wrangler.jsonc', 'utf8');

  expect(config).toContain('"workers_dev": false');
  expect(config).toContain('"preview_urls": true');
  expect(config).toContain('"pattern": "andresgaibor.com"');
  expect(config).toContain('"pattern": "www.andresgaibor.com"');
});

test('verify builds before tests and preserves the check step', async () => {
  const packageJson = JSON.parse(await readFile('package.json', 'utf8'));

  expect(packageJson.scripts.verify).toBe('bun run build && bun run test && bun run check');
});
