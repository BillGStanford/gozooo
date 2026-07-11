import type { Article, Lang, ArticleTranslation } from '@/lib/types';

/** Falls back to the other supported language if a translation is missing. */
export function localize(article: Article, lang: Lang): ArticleTranslation {
  const t = article.translations[lang] ?? article.translations.en ?? article.translations.am;
  if (!t) {
    throw new Error(`Article ${article.slug} has no translations at all`);
  }
  return t;
}
