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

## Content

Posts are Markdown in `src/content/blog/`, one flat folder, filename = URL slug. The frontmatter
schema in `src/content.config.ts` is the source of truth — a post missing a required field fails
the build.

Routing is Astro's i18n: Spanish is unprefixed (`/blog/...`), English lives under `/en/blog/...`.

## Before committing

```
npx astro check   # must report 0 errors
npm run build     # must succeed; inspect the generated route list
```

After touching routing or i18n, load both locales and follow the language switcher in both
directions. A build that compiles is not the same as routing that resolves.
