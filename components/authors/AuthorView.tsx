'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';
import type { Article, Author } from '@/lib/types';
import ArticleCard from '@/components/news/ArticleCard';

export default function AuthorView({
  author,
  articles,
}: {
  author: Author;
  articles: Article[];
}) {
  const { lang } = useLanguage();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12">
      <header className="rule mb-10 flex flex-col items-start gap-6 pb-10 sm:flex-row sm:items-center">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-concrete">
          <Image src={author.photo} alt="" fill sizes="112px" className="object-cover" />
        </div>
        <div>
          <h1 className="font-display-am text-display-2 font-bold text-ink">{author.name[lang]}</h1>
          <p className="mt-1 font-utility text-sm uppercase tracking-wide text-revolution">
            {author.position[lang]}
          </p>
          <p className="mt-3 max-w-2xl font-body-am text-steel">{author.bio[lang]}</p>
          {Object.keys(author.social).length > 0 && (
            <div className="mt-4 flex gap-4 font-utility text-sm">
              {Object.entries(author.social).map(([name, url]) => (
                <a key={name} href={url} className="text-ink hover:text-revolution">
                  {name}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      <h2 className="section-label mb-6">
        {lang === 'am' ? 'የቅርብ ጊዜ ጽሑፎች' : 'Recent Articles'}
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
