# World Design System Website

Token reference website for the World Design System. Displays all design tokens (colors, typography, spacing) with light/dark theme support.

Live at [world-design-system.vercel.app](https://world-design-system.vercel.app).

## Setup

```bash
npm install
```

The website depends on `@jaidensiu/world-design-system` from GitHub Packages. A `.npmrc` is included to configure the registry. You need a `GITHUB_TOKEN` environment variable with `read:packages` scope.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Deployment

Deployed to Vercel with analytics enabled. Pushes to `main` automatically redeploy via Vercel's GitHub integration.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Analytics](https://vercel.com/analytics)
- [`@jaidensiu/world-design-system`](https://github.com/jaidensiu/world-design-system) for token data
