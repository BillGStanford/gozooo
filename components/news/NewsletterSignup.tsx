'use client';

import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';

export default function NewsletterSignup() {
  const { lang } = useLanguage();
  const href = process.env.NEXT_PUBLIC_NEWSLETTER_URL || '#';

  return (
    <section className="cut-banner mx-6 mb-14 max-w-[1400px] px-8 py-12 md:mx-auto">
      <div className="max-w-xl">
        <h2 className="eyebrow mb-3 text-paper/80">{t('newsletter', lang)}</h2>
        <p className="font-display-am text-2xl font-bold leading-snug">
          {t('newsletterCta', lang)}
        </p>
        <a
          href={href}
          className="mt-6 inline-block border-2 border-paper px-6 py-2.5 font-utility text-sm font-bold uppercase tracking-wide text-paper hover:bg-paper hover:text-revolution"
        >
          {t('subscribe', lang)}
        </a>
      </div>
    </section>
  );
}
