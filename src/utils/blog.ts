import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  const featured = posts.filter((p) => p.data.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return posts.slice(0, limit);
}

export function getRelatedPosts(current: BlogPost, all: BlogPost[], limit = 3): BlogPost[] {
  const currentTags = new Set(current.data.tags);
  return all
    .filter((p) => p.id !== current.id)
    .map((p) => ({
      post: p,
      score: p.data.tags.filter((t) => currentTags.has(t)).length,
    }))
    .sort((a, b) => b.score - a.score || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf())
    .slice(0, limit)
    .map((x) => x.post);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function slugFromId(id: string): string {
  return id.replace(/\.mdx?$/, '');
}
