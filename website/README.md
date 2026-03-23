# Nucleus Website

Token reference website for Nucleus. Displays all design tokens (colors, typography, spacing) with light/dark theme support.

Live at [nucleus.vercel.app](https://nucleus.vercel.app).

## Setup

```bash
npm install
```

The website depends on `@jaidensiu/nucleus` from GitHub Packages. A `.npmrc` is included to configure the registry. You need a `GITHUB_TOKEN` environment variable with `read:packages` scope.

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
- [`@jaidensiu/nucleus`](https://github.com/jaidensiu/nucleus) for token data
