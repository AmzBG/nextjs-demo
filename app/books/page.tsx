import { getAllBooks, getAllAuthors } from '@/lib/data';
import { getPageParam, getPageSizeParam } from '@/lib/pagination';
import BooksClient from '@/components/BooksClient';

const BOOKS_PER_PAGE_OPTIONS = [3, 6, 9];
const DEFAULT_BOOKS_PER_PAGE = 6;

interface BooksPageProps {
  searchParams: Promise<{
    genre?: string | string[];
    page?: string | string[];
    perPage?: string | string[];
  }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const books = getAllBooks();
  const authors = getAllAuthors();
  const params = await searchParams;
  const genreParam = params.genre;
  const selectedGenre = Array.isArray(genreParam) ? genreParam[0] : genreParam;
  const currentPage = getPageParam(params.page);
  const booksPerPage = getPageSizeParam(
    params.perPage,
    BOOKS_PER_PAGE_OPTIONS,
    DEFAULT_BOOKS_PER_PAGE,
  );

  return (
    <BooksClient
      initialBooks={books}
      authors={authors}
      selectedGenre={selectedGenre ?? 'all'}
      currentPage={currentPage}
      booksPerPage={booksPerPage}
      booksPerPageOptions={BOOKS_PER_PAGE_OPTIONS}
      defaultBooksPerPage={DEFAULT_BOOKS_PER_PAGE}
    />
  );
}
