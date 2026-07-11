import type { Lang } from '@/lib/types';

export const ui = {
  skipToContent: { en: 'Skip to content', am: 'ወደ ይዘት ዝለል' },
  breakingNews: { en: 'Breaking', am: 'ጥድፊያ ዜና' },
  latestNews: { en: 'Latest News', am: 'የቅርብ ጊዜ ዜናዎች' },
  featuredInvestigations: { en: 'Featured Investigations', am: 'ተለይተው የቀረቡ ምርመራዎች' },
  editorsPicks: { en: "Editor's Picks", am: 'የኤዲተር ምርጫዎች' },
  mostRead: { en: 'Most Read', am: 'በብዛት የተነበቡ' },
  recommendedReading: { en: 'Recommended Reading', am: 'የሚመከር ንባብ' },
  newsletter: { en: 'Newsletter', am: 'የደብዳቤ ዝርዝር' },
  newsletterCta: { en: 'Get our dispatch in your inbox', am: 'ዘገባችንን በኢሜይልዎ ይቀበሉ' },
  subscribe: { en: 'Subscribe', am: 'ይመዝገቡ' },
  readMore: { en: 'Read more', am: 'ተጨማሪ ያንብቡ' },
  relatedArticles: { en: 'Related Articles', am: 'ተዛማጅ ጽሑፎች' },
  previousArticle: { en: 'Previous', am: 'ቀዳሚ' },
  nextArticle: { en: 'Next', am: 'ቀጣይ' },
  search: { en: 'Search', am: 'ፈልግ' },
  searchPlaceholder: { en: 'Search articles, authors, topics…', am: 'ጽሑፎችን፣ ደራሲዎችን፣ ርዕሶችን ይፈልጉ…' },
  noResults: { en: 'No results found.', am: 'ምንም ውጤት አልተገኘም።' },
  archive: { en: 'Archive', am: 'መዝገብ' },
  authors: { en: 'Authors', am: 'ደራሲዎች' },
  contact: { en: 'Contact', am: 'አድራሻ' },
  aboutOrg: { en: 'About', am: 'ስለ እኛ' },
  legal: { en: 'Legal', am: 'ህጋዊ' },
  sections: { en: 'Sections', am: 'ክፍሎች' },
  home: { en: 'Home', am: 'መነሻ' },
  minRead: { en: 'min read', am: 'ደቂቃ ንባብ' },
  by: { en: 'By', am: 'በ' },
  updated: { en: 'Updated', am: 'የተሻሻለው' },
  breaking_singular: { en: 'BREAKING', am: 'ጥድፊያ' },
  editorsPick_singular: { en: "EDITOR'S PICK", am: 'የኤዲተር ምርጫ' },
  menu: { en: 'Menu', am: 'ምናሌ' },
  close: { en: 'Close', am: 'ዝጋ' },
  page404Title: { en: 'Page not found', am: 'ገጹ አልተገኘም' },
  page404Body: {
    en: 'The page you are looking for has moved or does not exist.',
    am: 'የፈለጉት ገጽ ተንቀሳቅሷል ወይም አልተገኘም።',
  },
  backHome: { en: 'Back to homepage', am: 'ወደ መነሻ ገጽ ተመለስ' },
  offlineTitle: { en: "You're offline", am: 'ከመስመር ውጭ ነዎት' },
  offlineBody: {
    en: 'Check your connection. Previously read articles may still be available.',
    am: 'ግንኙነትዎን ይፈትሹ። ቀደም ሲል የተነበቡ ጽሑፎች አሁንም ሊገኙ ይችላሉ።',
  },
  headquarters: { en: 'Headquarters', am: 'ዋና መስሪያ ቤት' },
  email: { en: 'Email', am: 'ኢሜይል' },
} as const satisfies Record<string, Record<Lang, string>>;

export function t(key: keyof typeof ui, lang: Lang): string {
  return ui[key][lang];
}
