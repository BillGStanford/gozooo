'use client';

import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';

interface LegalEntry {
  title: { en: string; am: string };
  updated: string;
  body: { en: string; am: string };
}

export default function LegalView({ entry }: { entry: LegalEntry }) {
  const { lang } = useLanguage();
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display-am text-display-2 font-bold text-ink">{entry.title[lang]}</h1>
      <p className="mt-2 font-utility text-xs uppercase tracking-wide text-steel">
        {t('updated', lang)}: {entry.updated}
      </p>
      <p className="mt-8 font-body-am text-lg leading-relaxed text-ink-soft">{entry.body[lang]}</p>
    </div>
  );
}
