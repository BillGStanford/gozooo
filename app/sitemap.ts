import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/utils/articles';
import { siteCategories, siteAuthors, SITE_URL } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const tags = new Set<string>();
  articles.forEach((a) => a.tags.forEach((tag) => tags.add(tag)));

  const staticRoutes = ['', '/search', '/archive', '/authors', '/contact'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${SITE_URL}/article/${a.slug}`,
    lastModified: new Date(a.updatedAt),
  }));

  const categoryRoutes = siteCategories.map((c) => ({
    url: `${SITE_URL}/category/${c.slug}`,
    lastModified: new Date(),
  }));

  const authorRoutes = siteAuthors.map((a) => ({
    url: `${SITE_URL}/author/${a.slug}`,
    lastModified: new Date(),
  }));

  const tagRoutes = Array.from(tags).map((tag) => ({
    url: `${SITE_URL}/tag/${tag}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes, ...authorRoutes, ...tagRoutes];
}
