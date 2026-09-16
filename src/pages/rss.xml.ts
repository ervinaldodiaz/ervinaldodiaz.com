import type { APIContext } from 'astro';
import { buildBlogFeed } from '../feeds/blog-feed';

export async function GET(context: APIContext): Promise<Response> {
  return buildBlogFeed('es', context);
}
