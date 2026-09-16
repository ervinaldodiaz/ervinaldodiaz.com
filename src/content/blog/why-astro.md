---
title: 'Why this blog runs on Astro and not React'
description: 'For a blog, the UI framework is not the decision that matters. The generator is.'
date: 2026-09-15
tags: ['astro', 'architecture']
lang: 'en'
translationOf: 'por-que-astro'
draft: false
---

When I set out to build this site I started with the wrong question:
React or not React? A blog is text. The UI framework barely participates.

What does participate, every single day, is the **generator**: how a folder of
Markdown turns into pages, what happens when a post has malformed frontmatter,
and how much JavaScript someone downloads when all they wanted was to read.

## Frontmatter as a contract

What settled it for me were Astro's content collections. The frontmatter schema
is declared with Zod:

```ts
schema: z.object({
  title: z.string(),
  date: z.coerce.date(),
  lang: z.enum(['es', 'en']),
})
```

Publish a post without a `date` and the build fails. It is not an `undefined`
that shows up rendered six months later on a page nobody was looking at.

## React is still there

The difference is that it stopped being the default. A text page ships nothing;
when a post genuinely needs an interactive demo, that is where an island goes —
and only that page pays for it.
