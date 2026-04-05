/**
 * Custom Style Dictionary formats for Swift / SwiftUI output.
 *
 * All generated types are standalone – no dependency on platform Color types.
 * Colors are raw hex strings.
 * The consuming app bridges these to its own platform types.
 */

import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Format, FormatFnArguments } from 'style-dictionary/types';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATE_PATH = resolve(ROOT, 'templates/ios/NucleusColorTokens.swift.hbs');

function hexOnly(hex: string): string {
  return hex.replace('#', '').toUpperCase();
}

function camelCase(path: string[]): string {
  return path
    .map((p, i) => (i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)))
    .join('');
}

/**
 * swift/nucleusColorDefaults – Standalone NucleusColorTokens with String hex constants.
 */
export const swiftColorDefaults: Format = {
  name: 'swift/nucleusColorDefaults',
  format: ({ dictionary }: FormatFnArguments) => {
    const template = Handlebars.compile(readFileSync(TEMPLATE_PATH, 'utf8'));
    const tokens = dictionary.allTokens
      .filter((t) => t.$type === 'color')
      .map((token) => ({
        name: camelCase(token.path),
        value: hexOnly((token.$value || token.value) as string),
      }));

    return template({
      enumName: 'NucleusColorTokens',
      tokens,
    });
  },
};
