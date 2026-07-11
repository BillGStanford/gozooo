import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteCategories, getCategory, SITE_URL } from '@/lib/config';
import { getArticlesByCategory } from '@/lib/utils/articles';
import CategoryView from '@/components/news/CategoryView';

export function generateStaticParams() {
  return siteCategories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getCategory(params.category);
  if (!category) return {};
  return {
    title: category.name.en,
    description: category.description.en,
    alternates: { canonical: `${SITE_URL}/category/${category.slug}` },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category);
  if (!category) notFound();
  const articles = getArticlesByCategory(category.slug);
  return <CategoryView category={category} articles={articles} />;
}
