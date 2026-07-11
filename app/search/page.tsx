import { buildSearchCorpus } from '@/lib/utils/searchIndex';
import SearchView from '@/components/search/SearchView';

export const metadata = {
  title: 'Search',
};

export default function SearchPage() {
  const corpus = buildSearchCorpus();
  return <SearchView corpus={corpus} />;
}
