# Cipriani Batumi

## Setup

```bash
npm install
```

## Development Server

```bash
npm run dev
```

## Static Builds

Build the main domain with `npm run generate:prod`. Build the non-indexable subdomain with `npm run generate:dev`. Both commands write the static site to `.output/public/`.

`SITE_URL` sets canonical, Open Graph, sitemap, and hreflang URLs. `SITE_INDEXABLE=false` adds `noindex, nofollow`, writes a blocking `robots.txt`, and omits the sitemap. `NUXT_PUBLIC_RECAPTCHA_SITE_KEY` is the public browser key only; keep the reCAPTCHA secret key on the backend.

After a build, verify it with the matching profile and domain:

```bash
npx env-cmd -f .env.production npm run verify:build -- https://your-production-domain.com
npx env-cmd -f .env.development npm run verify:build -- https://your-subdomain.example.com
```

Upload only the CONTENTS of `.output/public/`, never the folder itself, and never upload a dev build to the production server.
