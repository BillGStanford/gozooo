'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/lib/hooks/useLanguageStore';
import { t } from '@/lib/i18n/ui';
import { siteNavigation } from '@/lib/config';
import LanguageSwitcher from './LanguageSwitcher';

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lang } = useLanguage();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('menu', lang)}
            className="fixed inset-y-0 left-0 z-[70] flex w-[85%] max-w-sm flex-col bg-paper p-6"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-utility text-xs font-bold uppercase tracking-widest text-steel">
                {t('menu', lang)}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label={t('close', lang)}
                className="p-2"
              >
                <X size={20} />
              </button>
            </div>

            <nav aria-label="Mobile primary">
              <ul className="space-y-1 font-display-am text-xl font-semibold">
                {siteNavigation.primary.map((item) => (
                  <li key={item.href} className="rule py-3 first:border-t-0">
                    <Link href={item.href} onClick={onClose}>
                      {item.label[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto pt-6">
              <LanguageSwitcher />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
