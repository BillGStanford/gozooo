'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';
import { siteIdentity, siteNavigation } from '@/lib/config';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { lang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const today = new Date();

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t('skipToContent', lang)}
      </a>

      {/* Utility bar: date + HQ, quiet and small — establishes the "official publication" register */}
      <div className="hidden border-b border-ink/10 bg-ink text-paper md:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-1.5 font-utility text-[11px] uppercase tracking-wide">
          <span>
            {today.toLocaleDateString(lang === 'am' ? 'am-ET' : 'en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="opacity-80">
            {siteIdentity.headquarters.map((h) => h.city).join(' · ')}
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4">
          <button
            type="button"
            className="p-2 md:hidden"
            aria-label={t('menu', lang)}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>

          <Link href="/" className="group flex flex-col items-start leading-none">
            <span className="font-display-am text-2xl font-bold tracking-tight text-ink group-hover:text-revolution md:text-3xl">
              {siteIdentity.siteName[lang]}
            </span>
            <span className="mt-1 font-utility text-[11px] uppercase tracking-[0.2em] text-steel">
              {siteIdentity.tagline[lang]}
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/search"
              aria-label={t('search', lang)}
              className="p-2 text-ink hover:text-revolution"
            >
              <Search size={20} />
            </Link>
            <LanguageSwitcher />
          </div>
        </div>

        <nav
          aria-label="Primary"
          className="hidden border-t border-ink/10 md:block"
        >
          <ul className="mx-auto flex max-w-[1400px] items-center gap-7 px-6 py-2.5 font-utility text-sm font-semibold uppercase tracking-wide">
            {siteNavigation.primary.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-revolution">
                  {item.label[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
