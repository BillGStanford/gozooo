'use client';

import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';

export default function OfflinePage() {
  const { lang } = useLanguage();
  return (
    <div className="mx-auto max-w-xl px-6 py-24">
      <h1 className="font-display-am text-3xl font-bold text-ink">{t('offlineTitle', lang)}</h1>
      <p className="mt-3 font-body-am text-steel">{t('offlineBody', lang)}</p>
    </div>
  );
}
