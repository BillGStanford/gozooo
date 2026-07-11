import changingNames from '@/data/changingNames.json';
import settings from '@/data/settings.json';
import categories from '@/data/categories.json';
import socialMedia from '@/data/social-media.json';
import metadata from '@/data/metadata.json';
import navigation from '@/data/navigation.json';
import legal from '@/data/legal.json';
import ads from '@/data/ads.json';
import authors from '@/data/authors.json';
import type { Category, Author } from '@/lib/types';

export const siteIdentity = changingNames;
export const siteSettings = settings;
export const siteCategories = categories as Category[];
export const socialLinks = socialMedia;
export const siteMetadata = metadata;
export const siteNavigation = navigation;
export const legalContent = legal;
export const adsConfig = ads;
export const siteAuthors = authors as Author[];

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://workersjourney.example';

export function getCategory(slug: string): Category | undefined {
  return siteCategories.find((c) => c.slug === slug);
}

export function getAuthor(id: string): Author | undefined {
  return siteAuthors.find((a) => a.id === id || a.slug === id);
}
