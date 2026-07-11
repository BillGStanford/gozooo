import { describe, it, expect } from 'vitest';
import { getAllArticles, localize, getArticleBySlug } from '@/lib/utils/articles';

describe('article data layer', () => {
  it('loads all sample articles from disk', () => {
    const articles = getAllArticles();
    expect(articles.length).toBeGreaterThan(0);
  });

  it('every article has both am and en translations', () => {
    const articles = getAllArticles();
    for (const article of articles) {
      expect(article.translations.am).toBeTruthy();
      expect(article.translations.en).toBeTruthy();
    }
  });

  it('localize falls back gracefully', () => {
    const article = getArticleBySlug('djibouti-corridor-port-workers-strike') ?? getAllArticles()[0];
    const tr = localize(article, 'en');
    expect(tr.title.length).toBeGreaterThan(0);
  });
});
