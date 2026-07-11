'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';
import type { Author } from '@/lib/types';

export default function AuthorsIndexView({ authors }: { authors: Author[] }) {
  const { lang } = useLanguage();
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12">
      <h1 className="section-label mb-8">{t('authors', lang)}</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {authors.map((author) => (
          <Link
            key={author.id}
            href={`/author/${author.slug}`}
            className="group flex items-center gap-4 rule py-5"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-concrete">
              <Image src={author.photo} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <div>
              <p className="font-display-am text-lg font-bold group-hover:text-revolution">
                {author.name[lang]}
              </p>
              <p className="font-utility text-xs uppercase tracking-wide text-steel">
                {author.position[lang]}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
