import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const themes = [
  'professional-navy',
  'survey-white',
  'graphite-gis',
  'desert-survey',
  'graphite',
  'arctic',
  'midnight',
];

function luminance(hex) {
  const channels = [1, 3, 5]
    .map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255)
    .map((value) => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(first, second) {
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

test('all seven themes define professional text and disabled-state contrast', () => {
  themes.forEach((theme) => {
    const block = html.match(new RegExp(`body\\[data-theme="${theme}"\\]\\{([^}]+)\\}`));
    assert.ok(block, `${theme} theme must exist`);
    const variables = Object.fromEntries(
      Array.from(block[1].matchAll(/--([\w-]+):(#[0-9A-Fa-f]{6})/g), (match) => [
        match[1],
        match[2],
      ])
    );
    assert.ok(contrast(variables.ink, variables.panel) >= 4.5, `${theme} primary text contrast`);
    assert.ok(
      contrast(variables['ink-dim'], variables.panel) >= 4.5,
      `${theme} secondary text contrast`
    );
    assert.ok(
      contrast(variables['disabled-text'], variables['disabled-bg']) >= 4.5,
      `${theme} disabled text contrast`
    );
    ['warning', 'selection', 'snap', 'focus'].forEach((variable) => {
      assert.ok(variables[variable], `${theme} must define ${variable}`);
    });
  });
});
