'use client';

import { useLanguage } from '@/lib/hooks/useLanguageStore';
import type { Article, Category } from '@/lib/types';
import ArticleCard from './ArticleCard';

export default function CategoryView({
  category,
  articles,
}: {
  category: Category;
  articles: Article[];
}) {
  const { lang } = useLanguage();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12">
      <header className="rule mb-10 pb-8">
        <p className="section-label mb-3">{category.name[lang]}</p>
        <h1 className="font-display-am text-display-2 font-bold text-ink">{category.name[lang]}</h1>
        <p className="mt-3 max-w-2xl font-body-am text-lg text-steel">{category.description[lang]}</p>
      </header>

      {articles.length === 0 ? (
        <p className="font-utility text-steel">
          {lang === 'am' ? 'እስካሁን ምንም ጽሑፍ የለም።' : 'No articles yet.'}
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
