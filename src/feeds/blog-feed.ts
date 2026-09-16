import rss from '@astrojs/rss';
import { getRelativeLocaleUrl } from 'astro:i18n';
import { listPostsByLocale, translate } from '../i18n/utils';
import type { BlogPost } from '../i18n/utils';
import type { Locale } from '../i18n/ui';

type FeedContext = {
  site: URL | undefined;
};

export async function buildBlogFeed(locale: Locale, context: FeedContext): Promise<Response> {
  const t = translate(locale);
  const posts: BlogPost[] = await listPostsByLocale(locale);

  return rss({
    title: t.siteTitle,
    description: t.siteDescription,
    site: context.site as URL,
    trailingSlash: true,
    customData: `<language>${locale}</language>`,
    items: posts.map((post: BlogPost) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.tags,
      link: getRelativeLocaleUrl(locale, `blog/${post.id}`),
    })),
  });
}
