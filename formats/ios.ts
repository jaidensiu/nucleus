import Handlebars from 'handlebars';
import type { Format, FormatFnArguments } from 'style-dictionary/types';

import { camelCasePath, colorTokens, readTemplate, tokenValue } from './shared.js';

const TEMPLATE = Handlebars.compile(
  readTemplate('templates/ios/NucleusColorTokens.swift.hbs'),
);

function hexOnly(hex: string): string {
  return hex.replace('#', '').toUpperCase();
}

export const swiftColorDefaults: Format = {
  name: 'swift/nucleusColorDefaults',
  format: ({ dictionary }: FormatFnArguments) => {
    const tokens = colorTokens(dictionary)
      .map((token) => ({
        name: camelCasePath(token.path),
        value: hexOnly(tokenValue(token)),
      }));

    return TEMPLATE({
      enumName: 'NucleusColorTokens',
      tokens,
    });
  },
};
