import { describe, it, expect } from 'vitest';
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const distIndex = resolve(root, 'dist', 'index.html');

function runBuild(mode?: string) {
  const cmd = mode
    ? `npx vite build --mode ${mode}`
    : 'npx vite build';
  execSync(cmd, { cwd: root, stdio: 'pipe' });
}

function readDistIndex(): string {
  expect(existsSync(distIndex)).toBe(true);
  return readFileSync(distIndex, 'utf-8');
}

describe('build output base paths', () => {
  it('github-pages mode produces prefixed asset paths', () => {
    runBuild('github-pages');
    const html = readDistIndex();

    // Asset references must be prefixed with /in-case-cong-nghiep/
    expect(html).toContain('/in-case-cong-nghiep/assets/');
    expect(html).toContain('/in-case-cong-nghiep/favicon.svg');
    expect(html).toContain('/in-case-cong-nghiep/og-image.png');

    // Must NOT contain unprefixed root references for these assets
    // (the /src/main.ts entry point is fine as Vite handles it)
    expect(html).not.toMatch(/href="\/favicon\.svg"/);
    expect(html).not.toMatch(/content="\/og-image\.png"/);
  });

  it('default mode produces root-level asset paths', () => {
    runBuild();
    const html = readDistIndex();

    // Asset references must be at root level
    expect(html).toMatch(/href="\/favicon\.svg"/);
    expect(html).toMatch(/content="\/og-image\.png"/);

    // Must NOT contain github-pages prefix
    expect(html).not.toContain('/in-case-cong-nghiep/assets/');
    expect(html).not.toContain('/in-case-cong-nghiep/favicon.svg');
    expect(html).not.toContain('/in-case-cong-nghiep/og-image.png');
  });
});
