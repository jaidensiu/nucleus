# Nucleus Website

Token reference website for Nucleus. Displays primitive color tokens.

Live at [nucleus.vercel.app](https://nucleus.vercel.app).

## Setup

```bash
npm install
```

The website resolves the generated primitive token JSON from this repo's `build/web/` output during local development. Run the root `nucleus` build first.

At the moment the site documents the primitive color layer only.

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
