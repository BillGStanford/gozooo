'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';
import { localize } from '@/lib/utils/localize';
import { getAuthor, getCategory } from '@/lib/config';
import ArticleBody from './ArticleBody';
import ArticleCard from '@/components/news/ArticleCard';
import type { Article } from '@/lib/types';

export default function ArticleView({
  article,
  related,
  prev,
  next,
}: {
  article: Article;
  related: Article[];
  prev?: Article;
  next?: Article;
}) {
  const { lang } = useLanguage();
  const tr = localize(article, lang);
  const author = getAuthor(article.authorId);
  const category = getCategory(article.category);

  const dateFmt = new Intl.DateTimeFormat(lang === 'am' ? 'am-ET' : 'en-US', {
    dateStyle: 'long',
  });

  return (
    <article>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-3xl px-6 pt-6 font-utility text-xs text-steel">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-revolution">{t('home', lang)}</Link></li>
          <li aria-hidden="true">/</li>
          {category && (
            <>
              <li><Link href={`/category/${category.slug}`} className="hover:text-revolution">{category.name[lang]}</Link></li>
              <li aria-hidden="true">/</li>
            </>
          )}
          <li className="truncate text-ink" aria-current="page">{tr.title}</li>
        </ol>
      </nav>

      <header className="mx-auto max-w-3xl px-6 pt-6">
        {category && (
          <Link href={`/category/${category.slug}`} className="section-label text-revolution">
            {category.name[lang]}
          </Link>
        )}
        {article.breaking && (
          <span className="ml-2 inline-block bg-revolution px-2 py-1 font-utility text-[11px] font-bold uppercase tracking-wide text-paper">
            {t('breaking_singular', lang)}
          </span>
        )}
        <h1 className="mt-4 font-display-am text-display-2 font-bold leading-[1.05] text-ink">
          {tr.title}
        </h1>
        <p className="mt-4 font-body-am text-xl leading-snug text-steel">{tr.excerpt}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3 rule py-4 font-utility text-sm text-steel">
          {author && (
            <Link href={`/author/${author.slug}`} className="font-semibold text-ink hover:text-revolution">
              {t('by', lang)} {author.name[lang]}
            </Link>
          )}
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>{dateFmt.format(new Date(article.publishedAt))}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime} {t('minRead', lang)}</span>
        </div>
      </header>

      <div className="relative mx-auto mt-8 aspect-[16/9] max-w-5xl overflow-hidden bg-concrete px-0 md:mx-auto">
        <Image src={article.coverImage} alt="" fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <ArticleBody blocks={tr.content} lang={lang} />

        <div className="mt-10 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag}`}
              className="border border-ink/15 px-3 py-1 font-utility text-xs uppercase tracking-wide text-steel hover:border-revolution hover:text-revolution"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {(prev || next) && (
        <nav
          aria-label="Article navigation"
          className="mx-auto grid max-w-3xl grid-cols-1 gap-4 rule px-6 py-8 sm:grid-cols-2"
        >
          {prev && (
            <Link href={`/article/${prev.slug}`} className="group">
              <p className="eyebrow text-steel">{t('previousArticle', lang)}</p>
              <p className="mt-1 font-display-am font-bold group-hover:text-revolution">
                {localize(prev, lang).title}
              </p>
            </Link>
          )}
          {next && (
            <Link href={`/article/${next.slug}`} className="group text-left sm:text-right">
              <p className="eyebrow text-steel">{t('nextArticle', lang)}</p>
              <p className="mt-1 font-display-am font-bold group-hover:text-revolution">
                {localize(next, lang).title}
              </p>
            </Link>
          )}
        </nav>
      )}

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="section-label mb-6">{t('relatedArticles', lang)}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
