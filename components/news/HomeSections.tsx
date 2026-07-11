'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';
import { siteSettings, siteCategories } from '@/lib/config';
import BreakingTicker from './BreakingTicker';
import ArticleCard from './ArticleCard';
import NewsletterSignup from './NewsletterSignup';
import type { Article } from '@/lib/types';

export default function HomeSections({
  hero,
  breaking,
  featured,
  latest,
  byCategory,
  editorsPicks,
  mostRead,
}: {
  hero: Article;
  breaking: Article[];
  featured: Article[];
  latest: Article[];
  byCategory: Record<string, Article[]>;
  editorsPicks: Article[];
  mostRead: Article[];
}) {
  const { lang } = useLanguage();

  return (
    <>
      <BreakingTicker articles={breaking} />

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-6 pt-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ArticleCard article={hero} size="large" />
          </div>
          <div className="flex flex-col gap-1 lg:border-l lg:border-ink/10 lg:pl-8">
            <h2 className="section-label mb-2">{t('featuredInvestigations', lang)}</h2>
            {featured.slice(0, 3).map((a) => (
              <ArticleCard key={a.slug} article={a} size="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* Latest news */}
      <section className="mx-auto max-w-[1400px] px-6 py-14">
        <h2 className="section-label mb-6">{t('latestNews', lang)}</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {latest.slice(0, 8).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* Category grid */}
      {siteSettings.homepage.sectionGridCategories.map((slug) => {
        const cat = siteCategories.find((c) => c.slug === slug);
        const articles = byCategory[slug] ?? [];
        if (!cat || articles.length === 0) return null;
        return (
          <section key={slug} className="mx-auto max-w-[1400px] rule px-6 py-14">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="section-label">{cat.name[lang]}</h2>
              <Link href={`/category/${slug}`} className="font-utility text-sm font-semibold text-revolution hover:underline">
                {lang === 'am' ? 'ሁሉንም ይመልከቱ' : 'View all'}
              </Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.slice(0, 3).map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Editor's picks + most read */}
      <section className="mx-auto grid max-w-[1400px] gap-10 rule px-6 py-14 lg:grid-cols-2">
        <div>
          <h2 className="section-label mb-6">{t('editorsPicks', lang)}</h2>
          <div className="divide-y divide-ink/10">
            {editorsPicks.slice(0, 5).map((a) => (
              <ArticleCard key={a.slug} article={a} size="compact" />
            ))}
          </div>
        </div>
        <div>
          <h2 className="section-label mb-6">{t('mostRead', lang)}</h2>
          <ol className="divide-y divide-ink/10">
            {mostRead.map((a, i) => (
              <li key={a.slug} className="flex items-start gap-4 py-3">
                <span className="font-display-am text-2xl font-bold text-concrete-dark/40 text-ink/20">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <ArticleCard article={a} size="compact" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
