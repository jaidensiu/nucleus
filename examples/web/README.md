# Web Example

Web sample app for Nucleus. Displays primitive color tokens from the generated files in `build/web`.

## Setup

```bash
npm run build
cd examples/web
npm install
```

The web example reads the generated token files in `build/web` directly. It does not install or depend on the generated npm package.

At the moment the app documents the primitive color layer only.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
