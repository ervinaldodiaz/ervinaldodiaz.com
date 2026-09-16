## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Conventions

`.claude/conventions/craftsmanship.md` is the contract this code must satisfy — read it before
writing code here. Rules are cited by id (`TYP-1`, `I18N-4`, `PERF-1`).

The ones that bite most often:

- **Code and comments in English; post content in Spanish and English.**
- Chrome strings live in `src/i18n/ui.ts` and are added to both locales in the same change.
- A post's language is its `lang` frontmatter field, never its filename or folder.
- A translated post sets `translationOf` on **both** sides, or the switcher strands the reader.
- Content pages ship zero JavaScript. `client:*` islands are per-page and deliberate.

## Design decisions

Rationale that `CMT-1` keeps out of the source:

- **One type family.** The poster direction is monospaced for every role, so `--font-body` and
  `--font-display` both alias `--font-mono`. The display weight is 700 because monospaced faces ship
  regular and bold only — 800 was being synthesised. `font-stretch` was dropped with the sans: a
  monospaced face has no width axis.
- **Only prose is measured in `ch`.** The unit is the zero-advance of *the element's own* font, so it
  sizes tiny monospaced rules to a stub and makes a display heading wrap differently per locale.
- **The diagonal splits two dark tones**, not the reference's lavender field, so no text ever sits on
  a surface that would drop it under the `A11Y-1` floor. Measured against the lifted side with the
  glow composited over it (`#291f34`): body 13.17:1, secondary 6.02:1, accent 7.36:1, signal 11.70:1.
  The filled button inverts the pair — ink on lavender — at 9.34:1.
- **Starfield tile sizes are deliberately non-multiples** of one another, or the layers line up into a
  visible grid.
- **The astronaut is inline SVG**, not a linked file, so it inherits the palette through
  `currentColor` and follows a colour swap instead of drifting out of it the way a baked PNG would.
  It is decorative, carries `aria-hidden`, and sits in its own positioned slot in a region with no
  running text, with the copy stacked above it — so it stays out of the fixed backdrop and the
  measured contrast still describes every surface a word is read on. Below `60rem` the hero has no
  free column and the figure would cross the copy, so it is hidden and the stars carry the theme.
- **The favicon is filled, not line-art.** At 16px a stroke of the drawing's weight disappears.

## Content

Posts are Markdown in `src/content/blog/`, one flat folder, filename = URL slug. The frontmatter
schema in `src/content.config.ts` is the source of truth — a post missing a required field fails
the build.

Routing is Astro's i18n: Spanish is unprefixed (`/blog/...`), English lives under `/en/blog/...`.

## Deployment

`npm run deploy` builds and deploys from your machine. Cloudflare Workers Builds deploys on every
push to `main`, and its dashboard settings must stay:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Root directory:** `/`

Do NOT set the deploy command to `npm run deploy` — that script builds first, so CI would build
twice. The Worker name in `wrangler.jsonc` must match the Worker in the dashboard (`blog`) or the
build fails. `.node-version` pins the toolchain so CI compiles on the same Node as local.

## Before committing

```
npx astro check   # must report 0 errors
npm run build     # must succeed; inspect the generated route list
```

After touching routing or i18n, load both locales and follow the language switcher in both
directions. A build that compiles is not the same as routing that resolves.
