/** Primitive color tokens (flat key-value hex map). */
declare const tokens: Record<string, string>;
export default tokens;

/** Light theme semantic color tokens. */
export declare const lightTheme: Record<string, string>;

/** Dark theme semantic color tokens. */
export declare const darkTheme: Record<string, string>;

/** Typography tokens. */
export interface TypographyToken {
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  lineHeightMultiplier: number;
}
export declare const typography: Record<string, TypographyToken>;

/** Spacing tokens (values in px). */
export declare const spacing: Record<string, number>;
