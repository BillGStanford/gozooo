'use client';

import { useEffect } from 'react';
import { useLanguageStore } from '@/lib/hooks/useLanguageStore';

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useLanguageStore((s) => s.lang);
  const hasDetected = useLanguageStore((s) => s.hasDetected);
  const detectFromBrowser = useLanguageStore((s) => s.detectFromBrowser);

  useEffect(() => {
    if (!hasDetected) detectFromBrowser();
  }, [hasDetected, detectFromBrowser]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <>{children}</>;
}
