# Nucleus

Cross-platform design tokens that define the foundational UI layer and visual identity of the World ecosystem.

## Architecture

**Two-layer token system:**

1. **Primitive tokens** – Raw palette values (grey, error, warning, success, info, specialty). Theme-agnostic.
2. **Semantic tokens** – Role-based references (`background.primary`, `text.primary`, `action.primary`). Resolve differently per light/dark theme.

**Platform outputs are standalone** – no dependency on app-specific types. Android gets Compose `Color` objects; iOS gets raw hex `String` constants and a `NucleusFontSpec` struct; Web gets CSS custom properties and JSON files. The consuming app bridges these to its own types.

## Quick Start

```bash
npm install
npm run build
```

Generated files appear in `build/`:

| Platform | Path | Contents |
|----------|------|----------|
| Android  | `build/android/` | Kotlin objects with Compose `Color` values, `build.gradle.kts` for Maven publishing |
| iOS      | `build/ios/` | Standalone Swift enums/structs with hex string constants, `Package.swift` for SPM |
| Web      | `build/web/` | CSS custom properties, JSON token files, `package.json` for npm publishing |

## Token Files

| File | Description |
|------|-------------|
| `tokens/color/primitive/base.json` | Grey, error, warning, success, info palettes |
| `tokens/color/primitive/specialty.json` | Brand colors (worldBlue, carrotOrange, purple, etc.) |
| `tokens/color/semantic/light.json` | Semantic-to-primitive mappings for light theme |
| `tokens/color/semantic/dark.json` | Semantic-to-primitive mappings for dark theme |
| `tokens/typography/scale.json` | Full type scale (d1, n1-5, h1-4, s1-4, l1-3, b1-4) |
| `tokens/spacing/spacing.json` | Spacing scale (xxs through xxl) |

## Generated Output

### Android (Kotlin/Compose)

- `NucleusColorPalette` – Primitive colors as `Color` objects
- `NucleusLightColorTokens` / `NucleusDarkColorTokens` – Semantic theme colors
- `NucleusTypography` – Type scale as `TextStyle` values
- `NucleusSpacing` – Spacing scale as `Dp` values
- `NucleusTheme` – Composable theme provider with `Nucleus.colors` accessor

### iOS (Swift)

- `NucleusColorPalette` – Primitive colors as hex `String` constants
- `NucleusLightColorTokens` / `NucleusDarkColorTokens` – Semantic theme colors as hex strings
- `NucleusTypography` – Type scale as `NucleusFontSpec` values
- `NucleusSpacing` – Spacing scale as `CGFloat` values
- `NucleusTheme` – Light/dark `NucleusSemanticColors` bundles

### Web (CSS / JSON)

- `nucleus-color-palette.css` – Primitive colors as CSS custom properties (`--nucleus-color-*`)
- `nucleus-light-theme.css` / `nucleus-dark-theme.css` – Semantic theme colors as CSS custom properties (`--nucleus-*`)
- `nucleus-typography.css` – Typography as CSS custom properties (`--nucleus-typography-*`)
- `nucleus-spacing.css` – Spacing as CSS custom properties (`--nucleus-spacing-*`)
- `tokens.json` / `light-theme.json` / `dark-theme.json` / `typography.json` / `spacing.json` – JSON token files for programmatic use

## CI/CD

The GitHub Actions workflow (`.github/workflows/publish.yml`) supports two trigger modes:

- **Merged PR with a release label** (`major`, `minor`, `patch`) – auto-bumps version, creates a tag, builds, and publishes
- **Manual dispatch** – choose the bump type from the Actions UI

### Pipeline Steps

1. **release** – Determines version bump, creates and pushes a `v*` tag
2. **build** – Runs `npm run build`, uploads `android-tokens`, `ios-tokens`, and `web-tokens` artifacts
3. **publish-maven** – Publishes Android library to GitHub Packages
4. **publish-spm** – Commits generated iOS files to the `generated/ios` branch, tags as `v*-ios`
5. **publish-npm** – Publishes Web package to GitHub Packages npm registry

## Consuming the Tokens

### Android

Add the GitHub Packages Maven repository to `settings.gradle`:

```groovy
maven {
    url = uri("https://maven.pkg.github.com/jaidensiu/nucleus")
    credentials {
        username = System.getenv("GITHUB_USER")
        password = System.getenv("GITHUB_TOKEN")
    }
}
```

Then add the dependency:

```groovy
implementation "com.jaidensiu:nucleus:<version>"
```

Wrap your composable tree in `NucleusTheme { ... }` and access tokens via `Nucleus.colors`, `NucleusTypography`, `NucleusSpacing`, etc.

### iOS

Add the SPM dependency in your `Package.swift`:

```swift
.package(url: "https://github.com/jaidensiu/nucleus.git", branch: "generated/ios")
```

Or pin to a specific release tag (e.g. `v0.1.0-ios`).

Then add `Nucleus` as a dependency on your target:

```swift
.target(
    name: "YourTarget",
    dependencies: [
        .product(name: "Nucleus", package: "nucleus"),
    ]
)
```

Bridge the standalone tokens to your app types:

```swift
import Nucleus

// Colors – NucleusColorPalette contains hex strings
let color = WLDColor(NucleusColorPalette.colorGrey900)

// Typography – NucleusTypography contains NucleusFontSpec values
let spec = NucleusTypography.h1
let font = WLDFont(size: spec.size, weight: Weight(integerLiteral: Int(spec.weight)), ...)

// Semantic themes
let lightBg = NucleusTheme.light.backgroundPrimary  // hex String
```

### Web

Add a `.npmrc` to your project:

```
@jaidensiu:registry=https://npm.pkg.github.com
```

Then install the package:

```bash
npm install @jaidensiu/nucleus
```

**CSS custom properties** – import the stylesheets you need:

```css
@import "@jaidensiu/nucleus/nucleus-color-palette.css";
@import "@jaidensiu/nucleus/nucleus-light-theme.css";
@import "@jaidensiu/nucleus/nucleus-dark-theme.css";
@import "@jaidensiu/nucleus/nucleus-typography.css";
@import "@jaidensiu/nucleus/nucleus-spacing.css";
```

Then use the variables:

```css
.card {
  background: var(--nucleus-background-primary);
  color: var(--nucleus-text-primary);
  padding: var(--nucleus-spacing-md);
  border: 1px solid var(--nucleus-border-default);
}
```

**JSON tokens** – import directly for JS/TS usage:

```ts
import tokens from "@jaidensiu/nucleus/tokens.json";
import lightTheme from "@jaidensiu/nucleus/light-theme.json";
import darkTheme from "@jaidensiu/nucleus/dark-theme.json";
import typography from "@jaidensiu/nucleus/typography.json";
import spacing from "@jaidensiu/nucleus/spacing.json";
```

## Adding / Modifying Tokens

1. Edit the relevant JSON file in `tokens/`
2. Run `npm run build` to verify output
3. Open a PR with a release label (`patch`, `minor`, or `major`)
4. On merge, CI auto-tags and publishes to all three platforms
