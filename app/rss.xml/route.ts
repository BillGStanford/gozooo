import { getAllArticles, localize } from '@/lib/utils/articles';
import { siteIdentity, SITE_URL } from '@/lib/config';

export const dynamic = 'force-static';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const articles = getAllArticles().slice(0, 30);

  const items = articles
    .map((article) => {
      const tr = localize(article, 'en');
      const url = `${SITE_URL}/article/${article.slug}`;
      return `
    <item>
      <title>${escapeXml(tr.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(tr.excerpt)}</description>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteIdentity.rssTitle.en)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(siteIdentity.seoDefaults.defaultDescription.en)}</description>
    <language>en</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
