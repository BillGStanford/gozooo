import { notFound } from 'next/navigation';
import { legalContent } from '@/lib/config';
import LegalView from '@/components/layout/LegalView';

const KEY_MAP: Record<string, keyof typeof legalContent> = {
  privacy: 'privacy',
  terms: 'terms',
  'editorial-standards': 'editorialStandards',
};

export function generateStaticParams() {
  return Object.keys(KEY_MAP).map((page) => ({ page }));
}

export function generateMetadata({ params }: { params: { page: string } }) {
  const key = KEY_MAP[params.page];
  if (!key) return {};
  return { title: legalContent[key].title.en };
}

export default function LegalPage({ params }: { params: { page: string } }) {
  const key = KEY_MAP[params.page];
  if (!key) notFound();
  return <LegalView entry={legalContent[key]} />;
}
