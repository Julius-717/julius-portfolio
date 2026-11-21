# juliusgachuhi.com

Source for [www.juliusgachuhi.com](https://www.juliusgachuhi.com), the portfolio of Julius Gachuhi, Cloud Security & DevSecOps Engineer.

Built with Next.js (App Router), React, TypeScript and Tailwind CSS v4. Every page is statically generated; there is no server-side state, database or form handling.

## Getting started

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (static) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint with the Next.js core-web-vitals and TypeScript rules |
| `npm run check:confidential` | Scans source and built pages for account IDs, ARNs, keys, IPs, internal hostnames, ticket keys and the employer name outside its allowed places |
| `npm run check:todos` | Lists remaining `TODO(julius):` markers; fails if any are left |
| `npm run check:links` | Crawls a running site and checks every internal link, fragment and asset (`npm run check:links -- http://localhost:3000`) |
| `npm run cv:pdf` | Regenerates `public/pdf/Julius_Gachuhi_CV.pdf` from `cv/cv.html` using headless Edge (set `CHROME_PATH` to use another Chromium browser) |

Before publishing: `npm run lint && npm run build && npm run check:confidential`.

## Project layout

```
app/                 Pages (App Router), sitemap, robots, Open Graph image
components/          Shared UI: header, footer, cards, MDX components
content/
  case-studies/      One MDX file per case study
  notes/             One MDX file per lab or article (see content/notes/README.md)
lib/
  site.ts            Name, headline, contact links, navigation
  content/           Page copy for experience, expertise and credentials
  case-studies.ts    Case study loader
  notes.ts           Notes loader
cv/cv.html           CV source (ATS-friendly, single column)
scripts/             Check scripts and the CV builder
next.config.ts       Security headers and redirects
```

## Adding content

**Case study:** add `content/case-studies/<slug>.mdx` with `title`, `summary`, `tags`, `order` and optionally `featured: true`. Set `draft: true` to keep it unpublished.

**Note:** add `content/notes/<slug>.mdx` with `title`, `summary`, `date` (YYYY-MM-DD), `kind` (`Lab` or `Article`), `tags` and an optional `repo` link. The Notes link in the footer, the About page and the sitemap appear automatically once a note is published. The build fails with a clear message if a required field is missing.

Content describes methods and classes of problem only: no account IDs, resource names, hostnames, counts or open findings from any real environment. Run `npm run check:confidential` before every publish.

## Configuration

Contact links default to the values in `lib/site.ts` and can be overridden with environment variables. All of them are public by design (`NEXT_PUBLIC_*`), so never put a secret in one.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_EMAIL` | Contact email |
| `NEXT_PUBLIC_LINKEDIN` | LinkedIn profile URL |
| `NEXT_PUBLIC_GITHUB` | GitHub profile URL |

## Security

Security headers are set in `next.config.ts`: Content Security Policy, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`/`frame-ancestors`, `Permissions-Policy` and `Cross-Origin-Opener-Policy`. Scripts allow `'unsafe-inline'` because statically generated pages cannot carry a per-request nonce; there is no user input or third-party script on the site.

## Deployment

Deployed on Vercel from `main`.
