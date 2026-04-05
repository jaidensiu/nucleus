import StyleDictionary from 'style-dictionary';
import { cpSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Format, NameTransform, TransformedToken } from 'style-dictionary/types';

import { composeColorObject } from '../formats/android.js';
import { swiftColorDefaults } from '../formats/ios.js';
import { kebabCasePath } from '../formats/shared.js';
import { cssColorVariables, jsonFlat } from '../formats/web.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const nameTransform: NameTransform = {
  name: 'name/nucleus',
  type: 'name',
  transform: (token) => kebabCasePath(token.path),
};
const allFormats: Format[] = [
  composeColorObject,
  swiftColorDefaults,
  cssColorVariables,
  jsonFlat,
];
const baseSources: string[] = [
  'src/tokens/primitive/**/*.json',
  'src/tokens/semantic/**/*.json',
];
const androidOut = 'build/android/src/main/kotlin/com/jaidensiu/nucleus';
const iosOut = 'build/ios/Sources/Nucleus';
const webOut = 'build/web';
const PACKAGE_VERSION = JSON.parse(
  readFileSync(resolve(ROOT, 'package.json'), 'utf8'),
).version as string;

async function buildTokens(): Promise<void> {
  const sd = new StyleDictionary({
    source: baseSources,
    platforms: {
      android: {
        buildPath: `${androidOut}/`,
        transforms: [nameTransform.name],
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
        transforms: [nameTransform.name],
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
        transforms: [nameTransform.name],
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

  for (const fmt of allFormats) {
    sd.registerFormat(fmt);
  }
  sd.registerTransform(nameTransform);

  await sd.buildAllPlatforms();
  console.log('\n\u2713 Tokens built');
}

interface TemplateCopy {
  from: string;
  to: string;
}

function copyTemplates(): void {
  const copies: TemplateCopy[] = [
    {
      from: 'src/templates/android/build.gradle.kts',
      to: 'build/android/build.gradle.kts',
    },
    {
      from: 'src/templates/android/settings.gradle.kts',
      to: 'build/android/settings.gradle.kts',
    },
    {
      from: 'src/templates/ios/Package.swift',
      to: 'build/ios/Package.swift',
    },
    {
      from: 'src/templates/web/package.json',
      to: 'build/web/package.json',
    },
    {
      from: 'src/templates/web/index.d.ts',
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

  const webPackagePath = resolve(ROOT, 'build/web/package.json');
  if (existsSync(webPackagePath)) {
    const webPackage = JSON.parse(readFileSync(webPackagePath, 'utf8')) as Record<string, unknown>;
    webPackage.version = PACKAGE_VERSION;
    writeFileSync(webPackagePath, `${JSON.stringify(webPackage, null, 2)}\n`);
  }

  console.log('\u2713 Templates copied');
}

async function main(): Promise<void> {
  console.log('Building Nucleus tokens\u2026');
  await buildTokens();
  copyTemplates();
  console.log('\nDone!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
