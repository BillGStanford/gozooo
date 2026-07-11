# Workers Journey (የሰራተኞች ጉዞ)

A static, bilingual (Amharic/English) newsroom platform built with Next.js 14
(App Router, fully static export), TypeScript, and Tailwind CSS. No backend,
database, CMS, or authentication — all content lives in version-controlled
JSON and compiles to static HTML/CSS/JS suitable for Cloudflare Pages,
Netlify, GitHub Pages, or any static host / S3 bucket.

## Quick start

```bash
pnpm install        # or npm install
cp .env.example .env
pnpm dev            # http://localhost:3000
pnpm build          # static export written to /out
```

The build requires network access to `fonts.googleapis.com` /
`fonts.gstatic.com` the first time (Next.js downloads and self-hosts the
Amharic-capable Noto Serif Ethiopic, Source Serif 4, Inter, and IBM Plex Mono
font files at build time via `next/font/google`). After that, fonts are
served from your own domain with no runtime Google requests.

## Architecture

```
app/                    Routes (App Router), one folder per URL
  article/[slug]/       Article pages — generateStaticParams + per-article SEO
  category/[category]/  Section pages
  tag/[tag]/            Tag archive pages
  author/[id]/, authors/
  archive/               Month-grouped full archive
  search/                Client-side full-text search (MiniSearch)
  legal/[page]/, contact/
  robots.ts, sitemap.ts, rss.xml/route.ts   Generated at build time
components/             UI, organized by domain (layout, news, articles, authors, search)
lib/
  config/               Typed accessors over every data/*.json file
  utils/articles.ts     Server-only: reads data/articles/*.json from disk
  utils/localize.ts     Pure, client-safe: picks the right-language translation
  utils/searchIndex.ts  Server-only: flattens articles into a search corpus
  hooks/useLanguageStore.ts   Zustand store for the site-wide language toggle
  schemas/jsonld.ts      NewsArticle / Organization / Breadcrumb structured data
  i18n/ui.ts             UI chrome strings (not article content) in am/en
data/
  changingNames.json     Site name, tagline, email, HQ, SEO defaults — one place
  settings.json          Language, pagination, homepage layout, breaking-news config
  categories.json, authors.json, navigation.json, social-media.json,
  metadata.json, legal.json, ads.json
  articles/*.json        One file per article (see content model below)
public/                  Images, logos, favicon, sw.js (offline-shell service worker)
```

**Single source of truth.** The site name, tagline, email, logo paths, social
links, and SEO defaults exist only in `data/changingNames.json` and
`data/social-media.json`. Nothing is hardcoded into components — change the
JSON and every page updates.

## Bilingual model

Rather than routing per locale (`/en/...`, `/am/...`), the language is a
client-side toggle (Zustand, persisted to `localStorage`) that swaps the
active translation of whatever page you're already on — so switching language
mid-article keeps you on that article, as specified. On first visit, the
toggle initializes from `navigator.languages`, falling back to Amharic
(`data/settings.json` → `defaultLanguage`) if the browser doesn't report a
supported language. UI chrome strings live in `lib/i18n/ui.ts`; article
content lives in each article's `translations.am` / `translations.en`.

## Content model

Each file in `data/articles/` is one article:

```jsonc
{
  "id": "art-0001",
  "slug": "...",
  "category": "workers",           // must match a slug in data/categories.json
  "tags": ["labor", "strike"],
  "publishedAt": "2026-07-08T06:30:00+03:00",
  "featured": true, "breaking": true, "editorsPick": true,
  "readingTime": 6,
  "authorId": "sidoc-haytu",        // must match an id in data/authors.json
  "thumbnail": "/images/...", "coverImage": "/images/...",
  "translations": {
    "en": { "title": "...", "excerpt": "...", "content": [ /* blocks */ ] },
    "am": { "title": "...", "excerpt": "...", "content": [ /* blocks */ ] }
  }
}
```

`content` is an array of typed blocks — `paragraph`, `heading`, `quote` /
`blockquote` / `pullquote`, `list`, `image`, `factbox` / `callout`, `table`,
`hr` — rendered by `components/articles/ArticleBody.tsx`. Add a new block type
by extending `ContentBlock` in `lib/types/index.ts` and the switch in
`ArticleBody.tsx`.

To publish a new article: drop a new JSON file in `data/articles/`, matching
the shape above. It's picked up automatically — no registry to update.

## What's fully built vs. scaffolded

Built and working end-to-end against the sample content (5 articles across
6 categories, 2 authors):

- Homepage (hero, breaking ticker, featured, latest, per-category rows,
  editor's picks, most-read, newsletter CTA), article/category/tag/author
  pages, archive, search, contact, legal pages, custom 404
- Bilingual toggle with browser detection, persisted preference, page-preserving switch
- SEO: per-page metadata, OpenGraph/Twitter tags, canonical URLs,
  NewsArticle/Organization/Breadcrumb JSON-LD, `robots.txt`, `sitemap.xml`, `rss.xml`
- Client-side instant search (MiniSearch) with highlighting and arrow-key/Enter navigation
- Accessibility basics: skip link, visible focus rings, semantic landmarks,
  `aria-current`/`aria-selected` on nav and search, `prefers-reduced-motion`
  respected on the ticker
- ESLint, Prettier (+ Tailwind plugin), EditorConfig, Husky pre-commit/commit-msg
  hooks, Commitlint (conventional commits), a passing Vitest unit test for the
  data layer, and a Playwright spec scaffold
- Production build verified in this environment (`next build` → static
  export across all 45 generated routes)

Deliberately lighter-weight, flagged so you don't mistake it for more than it is:

- **Images** are generated placeholders (ImageMagick-drawn constructivist
  blocks in the brand palette), not photography — swap the files in
  `public/images/` and `public/logos/` for real assets; paths are already wired up.
- **Analytics/AdSense/Clarity/GTM** are environment-variable slots
  (`.env.example`, `data/ads.json`) but no tracking scripts are wired into
  `<head>` yet — ads are explicitly disabled by default in `data/ads.json`.
  Wire the actual `<Script>` tags in `app/layout.tsx` when you have real IDs.
- **Offline support** is a minimal app-shell service worker (`public/sw.js`)
  that caches `/` and `/offline/` and falls back on navigation failure — not
  a full precache-every-route PWA strategy.
- **Playwright** has a 3-test scaffold (`tests/e2e/`) to build on, not a full
  regression suite; **Vitest** covers the article data layer, not every component.
- **Security headers** (CSP, X-Frame-Options, etc.) need to be set at your
  host/CDN, since a static export has no server to attach response headers —
  Cloudflare Pages, Netlify, and Vercel all support this via a `_headers` file
  or dashboard config; add one for your chosen host.
- **RSS** ships an English-only feed (`app/rss.xml/route.ts`) per RSS 2.0
  convention of one `<language>` per feed; add a second `/rss-am.xml` route
  following the same pattern if you want an Amharic feed too.

## Deployment

`next build` with `output: 'export'` (see `next.config.js`) writes a fully
static site to `/out`. Point Cloudflare Pages / Netlify / GitHub Pages at that
directory (build command `pnpm build`, output directory `out`), or upload
`/out` directly to an S3 bucket configured for static website hosting.

Set `NEXT_PUBLIC_SITE_URL` in your host's environment variables before
building — it's used in `sitemap.xml`, `rss.xml`, canonical URLs, and JSON-LD.
