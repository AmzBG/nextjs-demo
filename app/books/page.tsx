import { getAllBooks, getAllAuthors } from '@/lib/data';
import BooksClient from '@/components/BooksClient';

interface BooksPageProps {
  searchParams: Promise<{
    genre?: string | string[];
  }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const books = getAllBooks();
  const authors = getAllAuthors();
  const params = await searchParams;
  const genreParam = params.genre;
  const selectedGenre = Array.isArray(genreParam) ? genreParam[0] : genreParam;

  return (
    <BooksClient
      initialBooks={books}
      authors={authors}
      selectedGenre={selectedGenre ?? 'all'}
    />
  );
}
