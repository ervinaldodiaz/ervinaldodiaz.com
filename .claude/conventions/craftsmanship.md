# Blog — Clean Code & Project Conventions

The contract this code must satisfy. Every rule has a stable id so a review can cite it
(`TYP-1`, `I18N-4`, `PERF-1`). `AGENTS.md` stays the entry point for *how to work in this repo*;
this file is the contract. If they conflict, `AGENTS.md` wins and this file must be corrected.

Scope: **this repository only.** Nothing here is a general preference to carry into other
projects — CMT in particular is stricter than most codebases would want.

Legend: **MUST** = a violation blocks the change · **SHOULD** = raise it, author decides ·
**NEVER** = hard prohibition.

---

## TYP — Types

- **TYP-1** MUST: explicit type annotations on every variable, parameter, return type and component
  prop. No reliance on inference — especially for collection entries and frontmatter.
- **TYP-2** NEVER `any`. Use `unknown` and narrow.
- **TYP-3** MUST: `import type` for type-only imports.
- **TYP-4** MUST: include `| null` / `| undefined` in the annotation when the value can be absent.
- **TYP-5** MUST: the frontmatter schema in `src/content.config.ts` is the single source of truth for
  what a post carries. A page NEVER reads a frontmatter field the schema does not declare — add it to
  the schema first, so a malformed post fails the build instead of rendering blank.

## FUN — Functions

- **FUN-1** MUST: at most 3 arguments. Beyond that pass an object.
- **FUN-2** SHOULD: as few lines as possible. One to three lines is a good function.
- **FUN-3** MUST: no boolean flag parameters — a boolean means the function does two things.
- **FUN-4** NEVER pass an object in order to mutate it; return the new value.
- **FUN-7** MUST: order functions by the stepdown rule — right after a function come the functions it
  calls, in call order, so every call chain reads top to bottom.

## NAM — Naming

- **NAM-1** MUST: identifiers are self-descriptive without surrounding context.
- **NAM-2** NEVER use data-type prefixes (`strTitle`, `arrPosts`) — the annotation carries the type.
- **NAM-3** NEVER use generic placeholders (`item`, `data`, `value`, `result`) when a domain term
  exists: a collection entry is `post`, a string table is `t`, a locale is `locale`.
- **NAM-4** MUST: name length scales inversely with scope — exported and high-level stays short and
  abstract (`translate`), local and narrow gets long and precise (`listPostsByLocale`).
- **NAM-6** MUST: the file name matches what it holds — `PostList.astro` exports the post list,
  `utils.ts` under `src/i18n/` holds only i18n helpers.
- **NAM-9** MUST: names describe purpose, not mechanics.
- **NAM-10** MUST: spell out abbreviations.

## CMT — Comments

- **CMT-1** NEVER write a comment in code. Not an inline comment, not a JSDoc block, not a file
  header, not a section divider, not a note in CSS. A comment is a naming failure that has been
  written down instead of fixed.
- **CMT-2** MUST: whatever the comment would have said goes into a **name**. Extract the expression
  into a function or a named constant whose identifier states the intent — `isVisibleInThisBuild`
  instead of `// drafts only show up in dev`. If no name can carry it, the code is doing too much;
  split it until one can.
- **CMT-3** MUST: rationale that genuinely cannot live in a name — a trade-off, a decision, a
  workaround for someone else's bug — goes in `AGENTS.md` or in this file, never in the source. Those
  documents are read deliberately; a comment is read by accident and rots unnoticed.
- **CMT-4** NEVER leave commented-out code. Delete it; the history has it.
- **CMT-5 (carve-out)** Tooling **directives** are not comments and stay: `// @ts-check`,
  `// @ts-expect-error`, linter pragmas, `<!doctype html>`. They change what a tool does rather than
  explain anything to a reader. A directive never carries a trailing explanation.
- **CMT-6** MUST: this applies to source only. Markdown post content, `AGENTS.md`, `README.md` and
  this file are prose by definition and are exempt.

## FLOW — Control flow

- **FLOW-1** MUST: guard clauses / early returns, always with `{}` braces even for one-liners.
- **FLOW-2** NEVER write an `if` with an empty body to handle the `else` — invert the condition.
- **FLOW-3** MUST: transformation pipeline — input → validate → normalize → output. No mutation of
  input parameters or of the arrays returned by `getCollection`; copy before sorting.
- **FLOW-6** MUST: wrap external operations (`fetch`, file I/O, `JSON.parse`) in try-catch.

## DES — Design robustness

- **DES-1** NEVER encode an identity convention in code when nothing guarantees it. A post's language
  comes from its `lang` frontmatter field, **never** from parsing its path or filename — the schema
  guarantees the field, nothing guarantees the folder.
- **DES-3** MUST: fail closed on missing configuration with a message naming what is misconfigured.
- **DES-6** SHOULD: inline a value with one consumer instead of naming a constant for it.

## I18N — Bilingual content

- **I18N-1** MUST: every user-facing string in the chrome (nav, labels, dates, empty states) comes
  from `src/i18n/ui.ts`. NEVER hardcode Spanish or English in a component or page.
- **I18N-2** MUST: a new UI string is added to **both** locales in the same change. The `UiStrings`
  type makes a missing one a type error — never widen the type to dodge it.
- **I18N-3** MUST: routing is Astro's (`/…` for `es`, `/en/…` for `en`) and locale URLs are built
  with `getRelativeLocaleUrl`, never by string concatenation.
- **I18N-4** MUST: a translated post sets `translationOf` to its counterpart's id on **both** sides.
  A one-way link renders a switcher that strands the reader.
- **I18N-5** MUST: dates are formatted through `formatPostDate`, never with a hardcoded locale tag.
- **I18N-6** MUST: post dates render in **UTC**. A bare `YYYY-MM-DD` in frontmatter parses as UTC
  midnight, so formatting it in a negative-offset local timezone shows the previous day. The
  published date is a date, not an instant, and must read the same everywhere.

## PERF — What ships to the reader

- **PERF-1** MUST: a content page ships **zero JavaScript**. `npm run build` followed by
  `find dist -name '*.js'` must return nothing unless an island was added deliberately.
- **PERF-2** MUST: a framework island (`client:*`) is added only when a post genuinely needs
  interactivity, and only on that page. Prefer `client:visible` over `client:load`.
- **PERF-3** MUST: styles live in the component's `<style>` block; only true globals go in
  `BaseLayout.astro`'s `is:global` block.

## TEST — Verification

The standard is F.I.R.S.T. This site has no unit-test suite yet, and the build is the gate:

- **TEST-A** MUST: `npx astro check` reports 0 errors before committing — it is the only type gate.
- **TEST-B** MUST: `npm run build` succeeds and the generated route list is inspected, not assumed.
  A build that compiles is not the same as routing that resolves.
- **TEST-C** MUST: after touching routing, i18n or the switcher, load **both** locales and follow the
  switcher in both directions before reporting it works.
- **TEST-D** SHOULD: when a real test suite arrives, specs are named after the behaviour they pin
  down, not the file they cover.

## GIT — Commits & branches

- **GIT-1** MUST: verify `git config user.email` before committing.
- **GIT-2** NEVER add `Co-Authored-By`.
- **GIT-3** MUST: commit subject = conventional prefix + short description, no scope in parens; body
  is a short paragraph, no bullet lists.
- **GIT-4** MUST: each commit contains only the changes it describes.
- **GIT-5** MUST: branch `<category>/no-ref/<kebab-description>` — this is a personal repo with no
  ticket system, so the middle segment is `no-ref`. Categories: `feature`, `bugfix`, `hotfix`,
  `test`, `style`, `chore`.
- **GIT-9** MUST: keep diffs minimal — never restructure working code just to clean it up.
- **GIT-15** MUST: `dist/` and `.astro/` stay out of the repo. A generated artifact is never committed.

---

## Deliberately absent

These are not oversights — they are decisions, recorded so nobody re-opens them by accident:

- **No layering rules** (handler → controller → model). There is no API and no service layer; the
  content pipeline is Markdown on disk, and inventing layers for it would be ceremony.
- **No data-access or SQL rules.** There is no database.
- **No pull-request rules** (templates, draft PRs, reviewers). This is a personal repo with no
  review flow. Reinstate them the day it takes outside contributions.
- **No unit-test suite yet.** The build is the gate — see the TEST family. When a suite arrives,
  TEST-D says how its specs get named.
