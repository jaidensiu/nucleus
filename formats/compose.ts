/**
 * Custom Style Dictionary formats for Kotlin / Jetpack Compose output.
 */

import type { Format, FormatFnArguments } from 'style-dictionary/types';

const PACKAGE = 'com.jaidensiu.nucleus';

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
 * Used for primitive palette colors.
 */
export const composeColorObject: Format = {
  name: 'compose/colorObject',
  format: ({ dictionary, options }: FormatFnArguments) => {
    const objectName = (options.objectName as string) || 'NucleusColorPalette';
    const tokens = dictionary.allTokens.filter((t) => t.$type === 'color');

    const lines = tokens.map((token) => {
      const name = camelCase(token.path);
      const hex = (token.$value || token.value) as string;
      return `    val ${name} = Color(${hexToArgb(hex)})`;
    });

    return [
      `package ${PACKAGE}`,
      '',
      'import androidx.compose.ui.graphics.Color',
      '',
      `object ${objectName} {`,
      ...lines,
      '}',
      '',
    ].join('\n');
  },
};

