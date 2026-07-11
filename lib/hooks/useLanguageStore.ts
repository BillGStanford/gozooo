'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lang } from '@/lib/types';
import { siteSettings } from '@/lib/config';

interface LanguageState {
  lang: Lang;
  hasDetected: boolean;
  setLang: (lang: Lang) => void;
  detectFromBrowser: () => void;
}

const DEFAULT_LANG = siteSettings.defaultLanguage as Lang;
const SUPPORTED = siteSettings.supportedLanguages as Lang[];

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      lang: DEFAULT_LANG,
      hasDetected: false,
      setLang: (lang) => set({ lang }),
      detectFromBrowser: () => {
        if (get().hasDetected) return;
        if (typeof navigator === 'undefined') return;
        const browserLangs = navigator.languages ?? [navigator.language];
        const match = browserLangs
          .map((l) => l.split('-')[0])
          .find((l) => SUPPORTED.includes(l as Lang));
        set({ lang: (match as Lang) ?? DEFAULT_LANG, hasDetected: true });
      },
    }),
    {
      name: 'workers-journey-lang',
      // Only persist the user's explicit choice; detection re-runs each session
      // if the user never made an explicit choice, honoring the spec's
      // "detect on visit, but let the user override" behavior.
      partialize: (state) => ({ lang: state.lang, hasDetected: state.hasDetected }),
    }
  )
);

export function useLanguage() {
  const lang = useLanguageStore((s) => s.lang);
  const setLang = useLanguageStore((s) => s.setLang);
  return { lang, setLang };
}
