import Handlebars from 'handlebars';
import type { Format, FormatFnArguments } from 'style-dictionary/types';

import { camelCasePath, colorTokens, readTemplate, tokenValue } from './shared.js';

const PACKAGE_NAME = 'com.jaidensiu.nucleus';
const TEMPLATE = Handlebars.compile(
  readTemplate('templates/android/NucleusColorTokens.kt.hbs'),
);

function hexToArgb(hex: string): string {
  return `0xFF${hex.replace('#', '').toUpperCase()}`;
}

export const composeColorObject: Format = {
  name: 'compose/colorObject',
  format: ({ dictionary, options }: FormatFnArguments) => {
    const objectName = (options.objectName as string) || 'NucleusColorTokens';
    const tokens = colorTokens(dictionary)
      .map((token) => ({
        name: camelCasePath(token.path),
        value: hexToArgb(tokenValue(token)),
      }));

    return TEMPLATE({
      packageName: PACKAGE_NAME,
      objectName,
      tokens,
    });
  },
};
