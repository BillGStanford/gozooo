import { getAllArticles } from '@/lib/utils/articles';
import ArchiveView from '@/components/news/ArchiveView';

export const metadata = {
  title: 'Archive',
};

export default function ArchivePage() {
  const articles = getAllArticles();
  const groups: Record<string, typeof articles> = {};

  for (const article of articles) {
    const d = new Date(article.publishedAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(article);
  }

  const sortedKeys = Object.keys(groups).sort((a, b) => (a < b ? 1 : -1));

  return (
    <ArchiveView groups={sortedKeys.map((key) => ({ key, articles: groups[key] ?? [] }))} />
  );
}
