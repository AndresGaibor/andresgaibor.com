// @ts-nocheck
import { describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

describe('project visuals', () => {
  const visualDir = 'src/components/project-visuals';
  const dashboardFiles = ['OptimusDashboard.astro', 'SemillasDashboard.astro', 'DesktopRemoteDashboard.astro'];

  test('all dashboard components exist', () => {
    for (const file of dashboardFiles) {
      expect(existsSync(join(visualDir, file))).toBe(true);
    }
  });

  test('all dashboards include DemoBadge', async () => {
    for (const file of dashboardFiles) {
      const content = await readFile(join(visualDir, file), 'utf8');
      expect(content).toContain('DemoBadge');
    }
  });

  test('all dashboards use CSS variables (light/dark mode)', async () => {
    for (const file of dashboardFiles) {
      const content = await readFile(join(visualDir, file), 'utf8');
      expect(content).toMatch(/var\(--(surface|text|muted|line|accent|page)/);
    }
  });

  test('dashboards avoid inline fixed pixel widths (style attributes)', async () => {
    for (const file of dashboardFiles) {
      const content = await readFile(join(visualDir, file), 'utf8');
      const inlineWidthMatches = [...content.matchAll(/style="[^"]*width:\s*\d+px[^"]*"/g)];
      expect(inlineWidthMatches).toHaveLength(0);
    }
  });

  test('FeaturedProjectCard integrates dashboards by project id', async () => {
    const card = await readFile('src/components/projects/FeaturedProjectCard.astro', 'utf8');
    expect(card).toContain("project.id === 'optimus-thy'");
    expect(card).toContain("project.id === 'semillas'");
    expect(card).toContain("project.id === 'desktop-remote'");
    expect(card).toContain('OptimusDashboard');
    expect(card).toContain('SemillasDashboard');
    expect(card).toContain('DesktopRemoteDashboard');
  });

  test('Dashboard sidebar nav uses buttons not anchor tags', async () => {
    const navDashboards = ['OptimusDashboard.astro', 'DesktopRemoteDashboard.astro'];
    for (const file of navDashboards) {
      const content = await readFile(join(visualDir, file), 'utf8');
      const navAnchors = (content.match(/<a href="#"[^>]*>/g) || []).length;
      expect(navAnchors).toBe(0);
    }
  });
});

describe('blog placeholder covers', () => {
  const coverDir = 'src/components/blog/cover';
  const covers = ['DataPipelineCover.astro', 'PrivacyCover.astro', 'RemoteToolsCover.astro'];

  test('all blog cover components exist', () => {
    for (const file of covers) {
      expect(existsSync(join(coverDir, file))).toBe(true);
    }
  });

  test('blog covers use CSS variables', async () => {
    for (const file of covers) {
      const content = await readFile(join(coverDir, file), 'utf8');
      expect(content).toMatch(/var\(--(surface|text|muted|accent|line|page)/);
    }
  });
});

describe('DemoBadge component', () => {
  test('DemoBadge component exists', () => {
    expect(existsSync('src/components/ui/DemoBadge.astro')).toBe(true);
  });

  test('DemoBadge renders a span with label text', async () => {
    const content = await readFile('src/components/ui/DemoBadge.astro', 'utf8');
    expect(content).toContain('Vista conceptual');
    expect(content).toContain('<span');
  });
});
