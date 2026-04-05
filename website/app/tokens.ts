import primitiveTokens from "../../build/web/nucleus-color-tokens.json";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ColorGroup {
  name: string;
  colors: { name: string; value: string }[];
}

// ---------------------------------------------------------------------------
// Primitive colors — parsed from nucleus-color-tokens.json
// ---------------------------------------------------------------------------

const primitiveGroupOrder = [
  "Grey",
  "Black",
  "Error",
  "Warning",
  "Success",
  "Info",
];

function buildPrimitiveColors(): ColorGroup[] {
  const groups: ColorGroup[] = [];

  for (const groupName of primitiveGroupOrder) {
    const prefix = `color${groupName}`;
    const colors: { name: string; value: string }[] = [];

    for (const [key, value] of Object.entries(primitiveTokens)) {
      if (groupName === "Black") {
        if (key === "colorBlack") {
          colors.push({ name: "black", value });
        }
      } else if (key.startsWith(prefix)) {
        const shade = key.slice(prefix.length);
        colors.push({ name: shade, value });
      }
    }

    if (colors.length > 0) {
      groups.push({ name: groupName, colors });
    }
  }

  return groups;
}

export const primitiveColors: ColorGroup[] = buildPrimitiveColors();
