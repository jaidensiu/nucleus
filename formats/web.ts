import type { Format, FormatFnArguments } from 'style-dictionary/types';

import { camelCasePath, colorTokens, kebabCasePath, tokenValue } from './shared.js';

export const cssColorVariables: Format = {
  name: 'css/colorVariables',
  format: ({ dictionary }: FormatFnArguments) => {
    const lines = colorTokens(dictionary).map((token) => (
      `  --nucleus-${kebabCasePath(token.path)}: ${tokenValue(token)};`
    ));

    return [
      ':root {',
      ...lines,
      '}',
      '',
    ].join('\n');
  },
};
export const jsonFlat: Format = {
  name: 'json/flat',
  format: ({ dictionary }: FormatFnArguments) => {
    const result: Record<string, unknown> = {};

    for (const token of dictionary.allTokens) {
      result[camelCasePath(token.path)] = tokenValue(token);
    }

    return JSON.stringify(result, null, 2) + '\n';
  },
};
