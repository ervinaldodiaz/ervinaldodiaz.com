---
title: 'Por qué este blog corre en Astro y no en React'
description: 'Para un blog, el framework de UI no es la decisión importante. El generador sí.'
date: 2026-09-15
tags: ['astro', 'arquitectura']
lang: 'es'
translationOf: 'why-astro'
draft: false
---

Cuando decidí armar este sitio, la primera pregunta que me hice fue la equivocada:
¿React o no React? Un blog es texto. El framework de UI casi no participa.

Lo que sí participa todos los días es el **generador**: cómo se convierten unos
archivos Markdown en páginas, qué pasa cuando un post tiene mal el frontmatter, y
cuánto JavaScript acaba cargando alguien que solo quería leer.

## El frontmatter como contrato

Lo que me terminó de convencer de Astro son las *content collections*. El esquema
del frontmatter se declara con Zod:

```ts
schema: z.object({
  title: z.string(),
  date: z.coerce.date(),
  lang: z.enum(['es', 'en']),
})
```

Si publico un post sin `date`, el build falla. No es un `undefined` que aparece
renderizado seis meses después en una página que nadie estaba mirando.

## React sigue disponible

La diferencia es que dejó de ser el default. Una página de texto no carga nada;
cuando un post necesite una demo interactiva, ahí monto un island y esa página —
solo esa — paga el costo.
