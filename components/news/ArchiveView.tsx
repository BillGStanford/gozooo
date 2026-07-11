'use client';

import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';
import type { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';

export default function ArchiveView({
  groups,
}: {
  groups: { key: string; articles: Article[] }[];
}) {
  const { lang } = useLanguage();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12">
      <h1 className="section-label mb-10">{t('archive', lang)}</h1>
      {groups.map(({ key, articles }) => {
        const [year, month] = key.split('-');
        const label = new Date(Number(year), Number(month) - 1, 1).toLocaleDateString(
          lang === 'am' ? 'am-ET' : 'en-US',
          { year: 'numeric', month: 'long' }
        );
        return (
          <section key={key} className="rule mb-10 pt-8 first:mt-0 first:border-t-0 first:pt-0">
            <h2 className="mb-5 font-display-am text-2xl font-bold text-ink">{label}</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
