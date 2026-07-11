import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteAuthors, getAuthor, SITE_URL } from '@/lib/config';
import { getArticlesByAuthor } from '@/lib/utils/articles';
import AuthorView from '@/components/authors/AuthorView';

export function generateStaticParams() {
  return siteAuthors.map((a) => ({ id: a.slug }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const author = getAuthor(params.id);
  if (!author) return {};
  return {
    title: author.name.en,
    description: author.bio.en,
    alternates: { canonical: `${SITE_URL}/author/${author.slug}` },
  };
}

export default function AuthorPage({ params }: { params: { id: string } }) {
  const author = getAuthor(params.id);
  if (!author) notFound();
  const articles = getArticlesByAuthor(author.id);
  return <AuthorView author={author} articles={articles} />;
}
