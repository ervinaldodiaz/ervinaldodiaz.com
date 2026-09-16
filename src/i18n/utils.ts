import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { DEFAULT_LOCALE, LOCALES, ui } from './ui';
import type { Locale } from './ui';

export type BlogPost = CollectionEntry<'blog'>;

export type PostRoute = {
  params: { slug: string };
  props: { post: BlogPost };
};

export function translate(locale: Locale): (typeof ui)[Locale] {
  return ui[locale];
}

export function oppositeLocale(locale: Locale): Locale {
  return LOCALES.find((candidate: Locale): boolean => candidate !== locale) ?? DEFAULT_LOCALE;
}

export async function listPostsByLocale(locale: Locale): Promise<BlogPost[]> {
  const posts: BlogPost[] = await getCollection(
    'blog',
    (post: BlogPost): boolean => post.data.lang === locale && isVisibleInThisBuild(post),
  );
  return [...posts].sort(byNewestFirst);
}

function isVisibleInThisBuild(post: BlogPost): boolean {
  const draftsAreVisible: boolean = import.meta.env.DEV;
  return draftsAreVisible || !post.data.draft;
}

function byNewestFirst(first: BlogPost, second: BlogPost): number {
  return second.data.date.valueOf() - first.data.date.valueOf();
}

export async function listPostRoutes(locale: Locale): Promise<PostRoute[]> {
  const posts: BlogPost[] = await listPostsByLocale(locale);
  return posts.map(toPostRoute);
}

function toPostRoute(post: BlogPost): PostRoute {
  return { params: { slug: post.id }, props: { post } };
}

export function translationPathOf(post: BlogPost): string | undefined {
  if (!post.data.translationOf) {
    return undefined;
  }
  return `blog/${post.data.translationOf}`;
}

export function formatPostDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(toIntlLocaleTag(locale), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function toIntlLocaleTag(locale: Locale): string {
  return locale === 'es' ? 'es-MX' : 'en-US';
}

export function toOpenGraphLocale(locale: Locale): string {
  return toIntlLocaleTag(locale).replace('-', '_');
}
