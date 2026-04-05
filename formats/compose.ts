/**
 * Custom Style Dictionary formats for Kotlin / Jetpack Compose output.
 */

import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Format, FormatFnArguments } from 'style-dictionary/types';

const PACKAGE = 'com.jaidensiu.nucleus';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATE_PATH = resolve(ROOT, 'templates/android/NucleusColorTokens.kt.hbs');

function hexToArgb(hex: string): string {
  const h = hex.replace('#', '');
  return `0xFF${h.toUpperCase()}`;
}

function camelCase(path: string[]): string {
  return path
    .map((p, i) => (i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)))
    .join('');
}

/**
 * compose/colorObject – Generates a Kotlin object with Color(...) constants.
 * Used for primitive color tokens.
 */
export const composeColorObject: Format = {
  name: 'compose/colorObject',
  format: ({ dictionary, options }: FormatFnArguments) => {
    const objectName = (options.objectName as string) || 'NucleusColorTokens';
    const template = Handlebars.compile(readFileSync(TEMPLATE_PATH, 'utf8'));
    const tokens = dictionary.allTokens
      .filter((t) => t.$type === 'color')
      .map((token) => ({
        name: camelCase(token.path),
        value: hexToArgb((token.$value || token.value) as string),
      }));

    return template({
      packageName: PACKAGE,
      objectName,
      tokens,
    });
  },
};
