'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';
import { localize } from '@/lib/utils/localize';
import { getAuthor, getCategory } from '@/lib/config';
import type { Article } from '@/lib/types';

export default function ArticleCard({
  article,
  size = 'default',
}: {
  article: Article;
  size?: 'default' | 'large' | 'compact';
}) {
  const { lang } = useLanguage();
  const tr = localize(article, lang);
  const author = getAuthor(article.authorId);
  const category = getCategory(article.category);

  if (size === 'compact') {
    return (
      <Link href={`/article/${article.slug}`} className="group flex gap-4 py-3">
        <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-concrete">
          <Image src={article.thumbnail} alt="" fill sizes="80px" className="object-cover" />
        </div>
        <div className="min-w-0">
          {category && (
            <p className="eyebrow text-revolution">{category.name[lang]}</p>
          )}
          <h3 className="mt-1 font-display-am text-sm font-bold leading-snug group-hover:text-revolution">
            {tr.title}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <article className="group">
      <Link href={`/article/${article.slug}`} className="block">
        <div
          className={`relative overflow-hidden bg-concrete ${
            size === 'large' ? 'aspect-[16/9]' : 'aspect-[4/3]'
          }`}
        >
          <Image
            src={article.coverImage}
            alt=""
            fill
            sizes={size === 'large' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {article.breaking && (
            <span className="absolute left-0 top-0 bg-revolution px-3 py-1 font-utility text-[11px] font-bold uppercase tracking-wide text-paper">
              {t('breaking_singular', lang)}
            </span>
          )}
        </div>
        <div className="pt-4">
          {category && <p className="eyebrow text-revolution">{category.name[lang]}</p>}
          <h3
            className={`mt-1.5 font-display-am font-bold leading-tight group-hover:text-revolution ${
              size === 'large' ? 'text-headline' : 'text-lg'
            }`}
          >
            {tr.title}
          </h3>
          {size === 'large' && (
            <p className="mt-2 font-body-am text-steel line-clamp-2">{tr.excerpt}</p>
          )}
          <p className="mt-2 font-utility text-xs text-steel">
            {author && `${t('by', lang)} ${author.name[lang]} · `}
            {article.readingTime} {t('minRead', lang)}
          </p>
        </div>
      </Link>
    </article>
  );
}
