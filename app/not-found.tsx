'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';

export default function NotFound() {
  const { lang } = useLanguage();
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start px-6 py-24">
      <p className="font-display-am text-8xl font-bold text-revolution">404</p>
      <h1 className="mt-4 font-display-am text-3xl font-bold text-ink">{t('page404Title', lang)}</h1>
      <p className="mt-3 font-body-am text-steel">{t('page404Body', lang)}</p>
      <Link
        href="/"
        className="mt-8 inline-block border-2 border-ink px-6 py-2.5 font-utility text-sm font-bold uppercase tracking-wide hover:bg-ink hover:text-paper"
      >
        {t('backHome', lang)}
      </Link>
    </div>
  );
}
