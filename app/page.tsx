import {
  getAllArticles,
  getBreakingArticles,
  getFeaturedArticles,
  getEditorsPicks,
  getMostRead,
  getArticlesByCategory,
} from '@/lib/utils/articles';
import { siteSettings } from '@/lib/config';
import HomeSections from '@/components/news/HomeSections';

export default function HomePage() {
  const all = getAllArticles();
  if (all.length === 0) {
    throw new Error('No articles found in data/articles — the site needs at least one article.');
  }
  const hero = all.find((a) => a.featured) ?? all[0]!;
  const breaking = getBreakingArticles();
  const featured = getFeaturedArticles();
  const editorsPicks = getEditorsPicks();
  const mostRead = getMostRead(siteSettings.pagination.mostReadCount);

  const byCategory: Record<string, ReturnType<typeof getArticlesByCategory>> = {};
  for (const slug of siteSettings.homepage.sectionGridCategories) {
    byCategory[slug] = getArticlesByCategory(slug);
  }

  return (
    <HomeSections
      hero={hero}
      breaking={breaking}
      featured={featured}
      latest={all}
      byCategory={byCategory}
      editorsPicks={editorsPicks}
      mostRead={mostRead}
    />
  );
}
