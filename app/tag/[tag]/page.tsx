import { getAllArticles, getArticlesByTag } from '@/lib/utils/articles';
import CategoryView from '@/components/news/CategoryView';

export function generateStaticParams() {
  const tags = new Set<string>();
  getAllArticles().forEach((a) => a.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).map((tag) => ({ tag }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const articles = getArticlesByTag(params.tag);
  const pseudoCategory = {
    slug: params.tag,
    name: { en: `#${params.tag}`, am: `#${params.tag}` },
    description: {
      en: `Articles tagged “${params.tag}”.`,
      am: `“${params.tag}” የሚል መለያ ያላቸው ጽሑፎች።`,
    },
    color: '#4A4A4A',
  };
  return <CategoryView category={pseudoCategory} articles={articles} />;
}
