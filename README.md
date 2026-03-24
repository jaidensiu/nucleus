# Nucleus

Cross-platform design tokens that define the foundational UI layer and visual identity of the World ecosystem.

## Architecture

**Primitive tokens** – Raw palette values (grey, error, warning, success, info). Theme-agnostic.

**Platform outputs are standalone** – no dependency on app-specific types. Android gets Compose `Color` objects; iOS gets raw hex `String` constants; Web gets CSS custom properties and JSON files. The consuming app bridges these to its own types.

## Token Transformation Pipeline

```mermaid
graph TD
    A[JSON Token Definitions] --> B[Style Dictionary]
    B --> C[Custom Formats]
    C -->|Gradle templates| D[Android]
    C -->|SPM templates| E[iOS]
    C -->|npm templates| F[Web]
```

## Quick Start

```bash
npm install
npm run build
```

Generated files appear in `build/`:

| Platform | Path             | Contents                                                                            |
| -------- | ---------------- | ----------------------------------------------------------------------------------- |
| Android  | `build/android/` | Kotlin objects with Compose `Color` values, `build.gradle.kts` for Maven publishing |
| iOS      | `build/ios/`     | Standalone Swift enums with hex string constants, `Package.swift` for SPM           |
| Web      | `build/web/`     | CSS custom properties, JSON token files, `package.json` for npm publishing          |

## Token Files

| File                               | Description                                  |
| ---------------------------------- | -------------------------------------------- |
| `tokens/color/primitive/base.json` | Grey, error, warning, success, info palettes |

## Generated Output

### Android

- `NucleusColorPalette` – Primitive colors as `Color` objects

### iOS

- `NucleusColorPalette` – Primitive colors as hex `String` constants

### Web

- `nucleus-color-palette.css` – Primitive colors as CSS custom properties (`--nucleus-color-*`)
- `tokens.json` – JSON token file for programmatic use

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

Access primitive colors via `NucleusColorPalette`.

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

Access primitive colors as hex strings:

```swift
import Nucleus

let hex = NucleusColorPalette.colorGrey900 // "181818"
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

**CSS custom properties** – import the stylesheet:

```css
@import "@jaidensiu/nucleus/nucleus-color-palette.css";
```

Then use the variables:

```css
.card {
  color: var(--nucleus-color-grey-900);
  border: 1px solid var(--nucleus-color-grey-200);
}
```

**JSON tokens** – import directly for JS/TS usage:

```ts
import tokens from "@jaidensiu/nucleus/tokens.json";
```

## Adding / Modifying Tokens

1. Edit the relevant JSON file in `tokens/`
2. Run `npm run build` to verify output
3. Open a PR with a release label (`patch`, `minor`, or `major`)
4. On merge, CI auto-tags and publishes to all three platforms
