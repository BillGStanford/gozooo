'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';
import { siteIdentity, siteNavigation, socialLinks } from '@/lib/config';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer() {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display-am text-2xl font-bold">{siteIdentity.siteName[lang]}</p>
            <p className="mt-2 font-utility text-xs uppercase tracking-[0.2em] text-paper/60">
              {siteIdentity.tagline[lang]}
            </p>
            <div className="mt-5">
              <LanguageSwitcher />
            </div>
          </div>

          {siteNavigation.footerColumns.map((col) => (
            <div key={col.title.en}>
              <p className="eyebrow mb-4 text-paper/60">{col.title[lang]}</p>
              <ul className="space-y-2 font-utility text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-revolution-light">
                      {link.label[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="eyebrow mb-4 text-paper/60">{t('headquarters', lang)}</p>
            <ul className="space-y-1 font-utility text-sm text-paper/80">
              {siteIdentity.headquarters.map((h) => (
                <li key={h.city}>{lang === 'am' ? h.city_am : h.city}</li>
              ))}
            </ul>
            <p className="eyebrow mb-2 mt-5 text-paper/60">{t('email', lang)}</p>
            <a
              href={`mailto:${siteIdentity.email}`}
              className="font-mono text-sm text-paper/80 hover:text-revolution-light"
            >
              {siteIdentity.email}
            </a>

            <div className="mt-6 flex flex-wrap gap-3 font-utility text-xs uppercase tracking-wide text-paper/70">
              {Object.entries(socialLinks).map(([name, url]) => (
                <a key={name} href={url} className="hover:text-revolution-light">
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="rule-dark mt-12 pt-6 font-utility text-xs text-paper/50">
          © {year} {siteIdentity.copyright[lang]}
        </div>
      </div>
    </footer>
  );
}
