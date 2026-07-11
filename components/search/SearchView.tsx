'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import MiniSearch from 'minisearch';
import { Search as SearchIcon } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';
import type { SearchDoc } from '@/lib/utils/searchIndex';

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-solidarity/30 text-ink">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchView({ corpus }: { corpus: SearchDoc[] }) {
  const { lang } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCorpus = useMemo(() => corpus.filter((d) => d.lang === lang), [corpus, lang]);

  const index = useMemo(() => {
    const mini = new MiniSearch<SearchDoc>({
      fields: ['title', 'excerpt', 'body', 'tags', 'author', 'category'],
      storeFields: ['slug', 'title', 'excerpt', 'category', 'author'],
      searchOptions: { prefix: true, fuzzy: 0.2, boost: { title: 3, excerpt: 2, tags: 1.5 } },
    });
    mini.addAll(filteredCorpus);
    return mini;
  }, [filteredCorpus]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return index.search(query).slice(0, 20) as unknown as (SearchDoc & { score: number })[];
  }, [index, query]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      const chosen = results[activeIndex];
      if (chosen) window.location.href = `/article/${chosen.slug}/`;
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="section-label mb-6">{t('search', lang)}</h1>
      <div className="flex items-center gap-3 border-b-2 border-ink pb-3">
        <SearchIcon size={22} className="text-steel" aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t('searchPlaceholder', lang)}
          aria-label={t('search', lang)}
          aria-activedescendant={activeIndex >= 0 ? `result-${activeIndex}` : undefined}
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="search-results"
          className="w-full bg-transparent font-display-am text-xl outline-none placeholder:text-steel/60"
        />
      </div>

      <ul id="search-results" role="listbox" className="mt-6 divide-y divide-ink/10">
        {query.trim() && results.length === 0 && (
          <li className="py-6 font-utility text-steel">{t('noResults', lang)}</li>
        )}
        {results.map((r, i) => (
          <li key={r.id} id={`result-${i}`} role="option" aria-selected={i === activeIndex}>
            <Link
              href={`/article/${r.slug}`}
              className={`block py-4 ${i === activeIndex ? 'bg-concrete/60' : ''}`}
            >
              <p className="eyebrow text-revolution">{r.category}</p>
              <p className="mt-1 font-display-am text-lg font-bold">{highlight(r.title, query)}</p>
              <p className="mt-1 font-body-am text-sm text-steel line-clamp-2">
                {highlight(r.excerpt, query)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
