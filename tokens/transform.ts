import StyleDictionary from 'style-dictionary';
import { cpSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Format, TransformedToken } from 'style-dictionary/types';

import { composeColorObject } from '../formats/compose.js';
import { swiftColorDefaults } from '../formats/swift.js';
import { cssColorVariables, jsonFlat } from '../formats/css.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------------------
// Register all custom formats
// ---------------------------------------------------------------------------
const allFormats: Format[] = [
  composeColorObject,
  swiftColorDefaults,
  cssColorVariables,
  jsonFlat,
];

// ---------------------------------------------------------------------------
// Token source paths
// ---------------------------------------------------------------------------
const sources: string[] = [
  'tokens/color/primitive/palette.json',
];

// ---------------------------------------------------------------------------
// Output paths
// ---------------------------------------------------------------------------
const androidOut = 'build/android/src/main/kotlin/com/jaidensiu/nucleus';
const iosOut = 'build/ios/Sources/Nucleus';
const webOut = 'build/web';

// ---------------------------------------------------------------------------
// Build primitive color tokens
// ---------------------------------------------------------------------------
async function buildTokens(): Promise<void> {
  const sd = new StyleDictionary({
    source: sources,
    platforms: {
      android: {
        buildPath: `${androidOut}/`,
        files: [
          {
            destination: 'NucleusColorTokens.kt',
            format: 'compose/colorObject',
            options: { objectName: 'NucleusColorTokens' },
            filter: (token: TransformedToken) =>
              token.$type === 'color' && token.path[0] === 'color',
          },
        ],
      },
      ios: {
        buildPath: `${iosOut}/`,
        files: [
          {
            destination: 'NucleusColorTokens.swift',
            format: 'swift/nucleusColorDefaults',
            filter: (token: TransformedToken) =>
              token.$type === 'color' && token.path[0] === 'color',
          },
        ],
      },
      web: {
        buildPath: `${webOut}/`,
        files: [
          {
            destination: 'nucleus-color-tokens.css',
            format: 'css/colorVariables',
            filter: (token: TransformedToken) =>
              token.$type === 'color' && token.path[0] === 'color',
          },
          {
            destination: 'nucleus-color-tokens.json',
            format: 'json/flat',
            filter: (token: TransformedToken) =>
              token.$type === 'color' && token.path[0] === 'color',
          },
        ],
      },
    },
  });

  // Register custom formats
  for (const fmt of allFormats) {
    sd.registerFormat(fmt);
  }

  await sd.buildAllPlatforms();
  console.log('\u2713 Tokens built');
}

// ---------------------------------------------------------------------------
// Copy static template files into build/
// ---------------------------------------------------------------------------
interface TemplateCopy {
  from: string;
  to: string;
}

function copyTemplates(): void {
  const copies: TemplateCopy[] = [
    {
      from: 'templates/android/build.gradle.kts',
      to: 'build/android/build.gradle.kts',
    },
    {
      from: 'templates/android/settings.gradle.kts',
      to: 'build/android/settings.gradle.kts',
    },
    {
      from: 'templates/ios/Package.swift',
      to: 'build/ios/Package.swift',
    },
    {
      from: 'templates/web/package.json',
      to: 'build/web/package.json',
    },
    {
      from: 'templates/web/index.d.ts',
      to: 'build/web/index.d.ts',
    },
  ];

  for (const { from, to } of copies) {
    const src = resolve(ROOT, from);
    const dest = resolve(ROOT, to);
    if (!existsSync(src)) {
      console.warn(`  \u26A0 template not found: ${from}`);
      continue;
    }
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(src, dest);
  }
  console.log('\u2713 Templates copied');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
  console.log('Building Nucleus tokens\u2026\n');
  await buildTokens();
  copyTemplates();
  console.log('\nDone!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
