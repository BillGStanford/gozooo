import Image from 'next/image';
import type { ContentBlock, Lang } from '@/lib/types';

export default function ArticleBody({
  blocks,
  lang,
}: {
  blocks: ContentBlock[];
  lang: Lang;
}) {
  return (
    <div className="article-prose" data-lang={lang}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={i}>{block.text}</p>;
          case 'heading': {
            const Tag = (`h${block.level}` as unknown) as 'h2' | 'h3' | 'h4';
            return <Tag key={i}>{block.text}</Tag>;
          }
          case 'quote':
          case 'blockquote':
            return (
              <blockquote key={i}>
                <p>{block.text}</p>
                {block.attribution && (
                  <footer className="mt-2 font-utility text-sm not-italic text-steel">
                    — {block.attribution}
                  </footer>
                )}
              </blockquote>
            );
          case 'pullquote':
            return (
              <p key={i} className="pullquote">
                {block.text}
              </p>
            );
          case 'list':
            return block.style === 'ordered' ? (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case 'image':
            return (
              <figure key={i}>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-concrete">
                  <Image src={block.src} alt={block.alt} fill className="object-cover" />
                </div>
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            );
          case 'factbox':
          case 'callout':
            return (
              <aside key={i} className="factbox">
                <p className="eyebrow mb-2 text-revolution">{block.title}</p>
                <p className="font-utility text-sm text-ink-soft">{block.text}</p>
              </aside>
            );
          case 'table':
            return (
              <table key={i}>
                <thead>
                  <tr>
                    {block.headers.map((h, j) => (
                      <th key={j}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, j) => (
                    <tr key={j}>
                      {row.map((cell, k) => (
                        <td key={k}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          case 'hr':
            return <hr key={i} className="rule my-10" />;
          default:
            return null;
        }
      })}
    </div>
  );
}
