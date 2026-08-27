// @ts-nocheck
import { expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const indexPath = fileURLToPath(new URL('../dist/index.html', import.meta.url));

test('homepage exposes complete social sharing metadata', async () => {
  const html = await readFile(indexPath, 'utf8');

  expect(html).toContain('<link rel="canonical" href="https://andresgaibor.com/">');
  expect(html).toContain('<meta property="og:type" content="website">');
  expect(html).toContain('<meta property="og:site_name" content="Andrés Gaibor">');
  expect(html).toContain('<meta property="og:image" content="https://andresgaibor.com/og-image.jpg">');
  expect(html).toContain('<meta property="og:image:width" content="1200">');
  expect(html).toContain('<meta property="og:image:height" content="630">');
  expect(html).toContain('<meta property="og:image:type" content="image/jpeg">');
  expect(html).toContain('<meta property="og:image:alt"');
  expect(html).toContain('<meta name="twitter:card" content="summary_large_image">');
  expect(html).toContain('<meta name="twitter:site" content="@andres_gaibor">');
  expect(html).toContain('<meta name="twitter:image" content="https://andresgaibor.com/og-image.jpg">');
  expect(html).toContain('<meta name="twitter:image:alt"');
});
