import fs from 'node:fs';
import path from 'node:path';
import type { Article } from '@/lib/types';
export { localize } from '@/lib/utils/localize';

const ARTICLES_DIR = path.join(process.cwd(), 'data', 'articles');

let cache: Article[] | null = null;

/** Reads every article JSON file from disk. Server-side / build-time only. */
export function getAllArticles(): Article[] {
  if (cache) return cache;
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.json'));
  const articles = files.map((file) => {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
    return JSON.parse(raw) as Article;
  });
  articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  cache = articles;
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticlesByAuthor(authorId: string): Article[] {
  return getAllArticles().filter((a) => a.authorId === authorId);
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((a) => a.tags.includes(tag));
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.featured);
}

export function getBreakingArticles(): Article[] {
  return getAllArticles().filter((a) => a.breaking);
}

export function getEditorsPicks(): Article[] {
  return getAllArticles().filter((a) => a.editorsPick);
}

export function getRelatedArticles(article: Article, count: number): Article[] {
  return getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .filter((a) => a.category === article.category || a.tags.some((t) => article.tags.includes(t)))
    .slice(0, count);
}

export function getAdjacentArticles(article: Article): { prev?: Article; next?: Article } {
  const all = getAllArticles();
  const idx = all.findIndex((a) => a.slug === article.slug);
  return { prev: all[idx + 1], next: all[idx - 1] };
}

export function getMostRead(count: number): Article[] {
  // No analytics backend exists in a static build; approximate with recency + featured weight.
  return [...getAllArticles()]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, count);
}
