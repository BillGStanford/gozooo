export type Lang = 'am' | 'en';

export type LocalizedString = Partial<Record<Lang, string>>;

export interface ContentBlockParagraph {
  type: 'paragraph';
  text: string;
}
export interface ContentBlockHeading {
  type: 'heading';
  level: 2 | 3 | 4;
  text: string;
}
export interface ContentBlockQuote {
  type: 'quote' | 'blockquote' | 'pullquote';
  text: string;
  attribution?: string;
}
export interface ContentBlockList {
  type: 'list';
  style: 'ordered' | 'unordered';
  items: string[];
}
export interface ContentBlockImage {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}
export interface ContentBlockFactbox {
  type: 'factbox' | 'callout';
  title: string;
  text: string;
}
export interface ContentBlockTable {
  type: 'table';
  headers: string[];
  rows: string[][];
}
export interface ContentBlockHr {
  type: 'hr';
}

export type ContentBlock =
  | ContentBlockParagraph
  | ContentBlockHeading
  | ContentBlockQuote
  | ContentBlockList
  | ContentBlockImage
  | ContentBlockFactbox
  | ContentBlockTable
  | ContentBlockHr;

export interface ArticleTranslation {
  title: string;
  excerpt: string;
  content: ContentBlock[];
}

export interface Article {
  id: string;
  slug: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  breaking: boolean;
  editorsPick: boolean;
  readingTime: number;
  authorId: string;
  thumbnail: string;
  coverImage: string;
  gallery: string[];
  video: string | null;
  translations: Partial<Record<Lang, ArticleTranslation>>;
}

export interface Author {
  id: string;
  slug: string;
  name: LocalizedString;
  position: LocalizedString;
  photo: string;
  bio: LocalizedString;
  languages: Lang[];
  social: Record<string, string>;
}

export interface Category {
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  color: string;
}
