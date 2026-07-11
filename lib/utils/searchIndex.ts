import { getAllArticles } from './articles';
import { getAuthor, getCategory } from '@/lib/config';
import type { Lang } from '@/lib/types';

export interface SearchDoc {
  id: string;
  slug: string;
  lang: Lang;
  title: string;
  excerpt: string;
  body: string;
  tags: string;
  author: string;
  category: string;
}

function flattenContent(content: unknown[]): string {
  return content
    .map((block: any) => {
      if (block.text) return block.text;
      if (block.items) return block.items.join(' ');
      if (block.title && block.text) return `${block.title} ${block.text}`;
      return '';
    })
    .join(' ');
}

/** Build-time only. Produces one document per (article, language) pair. */
export function buildSearchCorpus(): SearchDoc[] {
  const articles = getAllArticles();
  const docs: SearchDoc[] = [];

  for (const article of articles) {
    const author = getAuthor(article.authorId);
    const category = getCategory(article.category);

    (['am', 'en'] as Lang[]).forEach((lang) => {
      const tr = article.translations[lang];
      if (!tr) return;
      docs.push({
        id: `${article.slug}__${lang}`,
        slug: article.slug,
        lang,
        title: tr.title,
        excerpt: tr.excerpt,
        body: flattenContent(tr.content),
        tags: article.tags.join(' '),
        author: author?.name[lang] ?? '',
        category: category?.name[lang] ?? '',
      });
    });
  }

  return docs;
}
