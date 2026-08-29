// @ts-nocheck
import { expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const indexPath = fileURLToPath(new URL('../dist/index.html', import.meta.url));
const socialDescription =
  'Andrés Gaibor crea sistemas web, automatizaciones y soluciones de datos para convertir problemas y procesos manuales en software útil.';

test('homepage exposes complete social sharing metadata', async () => {
  const html = await readFile(indexPath, 'utf8');

  expect(html).toContain('<link rel="canonical" href="https://andresgaibor.com/">');
  expect(html).toContain('<meta property="og:type" content="website">');
  expect(html).toContain('<meta property="og:site_name" content="Andrés Gaibor">');
  expect(html).toContain(`<meta property="og:description" content="${socialDescription}">`);
  expect(html).toContain('<meta property="og:image" content="https://andresgaibor.com/social-card-v2.jpg">');
  expect(html).toContain('<meta name="twitter:description" content="' + socialDescription + '">');
  expect(html).toContain('<meta name="twitter:image" content="https://andresgaibor.com/social-card-v2.jpg">');
});
