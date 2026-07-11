import type { Article, Author, Lang } from '@/lib/types';
import { siteMetadata, siteIdentity, SITE_URL } from '@/lib/config';
import { localize } from '@/lib/utils/articles';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    ...siteMetadata.organizationSchema,
    url: SITE_URL,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function newsArticleSchema(article: Article, author: Author | undefined, lang: Lang) {
  const tr = localize(article, lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: tr.title,
    description: tr.excerpt,
    image: [`${SITE_URL}${article.coverImage}`],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: author
      ? { '@type': 'Person', name: author.name[lang] ?? author.name.en }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${siteMetadata.publisher.logo.url}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/article/${article.slug}`,
    },
  };
}
