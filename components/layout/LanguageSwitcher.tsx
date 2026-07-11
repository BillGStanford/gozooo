'use client';

import { useLanguage } from '@/lib/hooks/useLanguageStore';
import type { Lang } from '@/lib/types';

const OPTIONS: { lang: Lang; flag: string; label: string }[] = [
  { lang: 'am', flag: '🇪🇹', label: 'አማ' },
  { lang: 'en', flag: '🇬🇧', label: 'EN' },
];

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language / ቋንቋ"
      className="flex items-center gap-0.5 border border-ink/20 font-utility text-xs font-semibold"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.lang}
          type="button"
          onClick={() => setLang(opt.lang)}
          aria-pressed={lang === opt.lang}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 transition-colors ${
            lang === opt.lang
              ? 'bg-ink text-paper'
              : 'text-ink hover:bg-concrete'
          }`}
        >
          <span aria-hidden="true">{opt.flag}</span>
          {!compact && <span>{opt.label}</span>}
        </button>
      ))}
    </div>
  );
}
