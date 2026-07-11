'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';
import { localize } from '@/lib/utils/localize';
import type { Article } from '@/lib/types';
import { siteSettings } from '@/lib/config';

export default function BreakingTicker({ articles }: { articles: Article[] }) {
  const { lang } = useLanguage();
  if (!siteSettings.breakingNews.enabled || articles.length === 0) return null;

  const items = articles.slice(0, siteSettings.breakingNews.maxItems);
  const duration = siteSettings.breakingNews.tickerSpeedSeconds;

  return (
    <div className="flex items-stretch border-y border-ink/10 bg-paper" aria-label={t('breakingNews', lang)}>
      <div className="cut-banner z-10 flex shrink-0 items-center px-5 py-2.5 pr-8 font-utility text-xs font-bold uppercase tracking-widest">
        {t('breakingNews', lang)}
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div
          className="flex w-max items-center gap-16 whitespace-nowrap py-2.5 pl-8 font-utility text-sm"
          style={{ animation: `ticker ${duration}s linear infinite` }}
        >
          {[...items, ...items].map((article, i) => {
            const tr = localize(article, lang);
            return (
              <Link
                key={`${article.slug}-${i}`}
                href={`/article/${article.slug}`}
                className="hover:text-revolution"
              >
                {tr.title}
              </Link>
            );
          })}
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ticker {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            @media (prefers-reduced-motion: reduce) {
              [style*="ticker"] { animation: none !important; }
            }
          `
        }}
        suppressHydrationWarning
      />
    </div>
  );
}