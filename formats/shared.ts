import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { FormatFnArguments, TransformedToken } from 'style-dictionary/types';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function readTemplate(path: string): string {
  return readFileSync(resolve(ROOT, path), 'utf8');
}

export function camelCasePath(path: string[]): string {
  return path
    .map((segment, index) =>
      index === 0 ? segment : segment.charAt(0).toUpperCase() + segment.slice(1),
    )
    .join('');
}

export function kebabCasePath(path: string[]): string {
  return path.join('-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function tokenValue(token: Pick<TransformedToken, '$value' | 'value'>): string {
  return (token.$value ?? token.value) as string;
}

export function colorTokens(dictionary: FormatFnArguments['dictionary']): TransformedToken[] {
  return dictionary.allTokens.filter((token) => token.$type === 'color');
}
