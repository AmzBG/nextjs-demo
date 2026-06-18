'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { Book, Author } from '@/lib/data';

interface BooksClientProps {
  initialBooks: Book[];
  authors: Author[];
  selectedGenre: string;
  currentPage: number;
  booksPerPage: number;
  booksPerPageOptions: number[];
  defaultBooksPerPage: number;
}

export default function BooksClient({
  initialBooks,
  authors,
  selectedGenre,
  currentPage,
  booksPerPage,
  booksPerPageOptions,
  defaultBooksPerPage,
}: BooksClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const getBooksHref = ({
    genre = selectedGenre,
    perPage = booksPerPage,
  }: {
    genre?: string;
    perPage?: number;
  } = {}) => {
    const params = new URLSearchParams();

    if (genre && genre !== 'all') {
      params.set('genre', genre);
    }

    if (perPage !== defaultBooksPerPage) {
      params.set('perPage', String(perPage));
    }

    const queryString = params.toString();
    return queryString ? `/books?${queryString}` : '/books';
  };

  const handleBooksPerPageChange = (nextBooksPerPage: number) => {
    // Changing page size starts at page 1 because the old page may no longer exist.
    router.push(getBooksHref({ perPage: nextBooksPerPage }));
  };

  // Get unique genres
  const genres = useMemo(() => {
    const genreSet = new Set(initialBooks.map(book => book.genre));
    return ['all', ...Array.from(genreSet)];
  }, [initialBooks]);

  // Filter books based on search and genre
  const filteredBooks = useMemo(() => {
    return initialBooks.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           authors.find(a => a.id === book.authorId)?.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [initialBooks, searchQuery, selectedGenre, authors]);

  // Paginate after filtering so genre/search results have their own page count.
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / booksPerPage));
  const activePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (activePage - 1) * booksPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Books
      </h1>

      <SearchBar 
        onSearch={setSearchQuery}
        placeholder="Search by title or author..."
      />

      {/* Genre Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Link
              key={genre}
              href={getBooksHref({ genre })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedGenre === genre
                  ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {genre === 'all' ? 'All Genres' : genre}
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Results count */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Showing {paginatedBooks.length} of {filteredBooks.length}{' '}
          {filteredBooks.length === 1 ? 'book' : 'books'}
        </p>

        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          Books per page
          <select
            value={booksPerPage}
            onChange={(event) => handleBooksPerPageChange(Number(event.target.value))}
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          >
            {booksPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            No books found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedBooks.map((book) => {
            const author = authors.find(a => a.id === book.authorId);
            
            return (
              <Link 
                key={book.id} 
                href={`/books/${book.id}`}
                className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-80 bg-zinc-200 dark:bg-zinc-800">
                  <Image
                    src={book.coverUrl}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                    {book.title}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    by {author?.name}
                  </p>
                  <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-500">
                    <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                      {book.genre}
                    </span>
                    <span>{book.publishedYear}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <Pagination
        basePath="/books"
        currentPage={activePage}
        totalPages={totalPages}
        searchParams={{
          genre: selectedGenre === 'all' ? undefined : selectedGenre,
          perPage: booksPerPage === defaultBooksPerPage ? undefined : booksPerPage,
        }}
      />
    </div>
  );
}
