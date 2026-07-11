import AuthorsIndexView from '@/components/authors/AuthorsIndexView';
import { siteAuthors } from '@/lib/config';

export const metadata = {
  title: 'Authors',
};

export default function AuthorsPage() {
  return <AuthorsIndexView authors={siteAuthors} />;
}
