import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  getAdjacentArticles,
  localize,
} from '@/lib/utils/articles';
import { getAuthor, siteSettings, SITE_URL } from '@/lib/config';
import { newsArticleSchema, breadcrumbSchema } from '@/lib/schemas/jsonld';
import ArticleView from '@/components/articles/ArticleView';

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  const tr = localize(article, 'en');
  const url = `${SITE_URL}/article/${article.slug}`;
  return {
    title: tr.title,
    description: tr.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: tr.title,
      description: tr.excerpt,
      url,
      images: [article.coverImage],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: tr.title,
      description: tr.excerpt,
      images: [article.coverImage],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, siteSettings.pagination.relatedArticleCount);
  const { prev, next } = getAdjacentArticles(article);
  const author = getAuthor(article.authorId);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(newsArticleSchema(article, author, 'en')),
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: article.category, url: `/category/${article.category}` },
              { name: localize(article, 'en').title, url: `/article/${article.slug}` },
            ])
          ),
        }}
      />
      <ArticleView article={article} related={related} prev={prev} next={next} />
    </>
  );
}
