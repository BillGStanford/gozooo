'use client';

import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';
import { siteIdentity } from '@/lib/config';

export default function ContactView() {
  const { lang } = useLanguage();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="section-label mb-6">{t('contact', lang)}</h1>
      <p className="font-body-am text-lg text-steel">
        {lang === 'am'
          ? 'ለኤዲቶሪያል ጥያቄዎች፣ የምንጭ ጥያቄዎች ወይም ማንኛውም ግንኙነት፣ በኢሜይል ብቻ ያግኙን።'
          : 'For editorial inquiries, source questions, or any correspondence, reach us by email only.'}
      </p>
      <a
        href={`mailto:${siteIdentity.email}`}
        className="mt-6 inline-block border-b-2 border-revolution font-mono text-xl text-ink hover:text-revolution"
      >
        {siteIdentity.email}
      </a>

      <div className="rule mt-10 pt-8">
        <p className="eyebrow mb-3 text-steel">{t('headquarters', lang)}</p>
        <ul className="space-y-1 font-body-am text-ink">
          {siteIdentity.headquarters.map((h) => (
            <li key={h.city}>{lang === 'am' ? h.city_am : h.city}, {h.country}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
