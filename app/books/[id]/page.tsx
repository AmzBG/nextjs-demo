import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getAuthorById,
  getBookById,
  getBooksByAuthorId,
  getPublisherById,
} from '@/lib/data';
import FavoriteButton from '@/components/FavoriteButton';

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = getBookById(parseInt(id));
  
  if (!book) {
    notFound();
  }
  
  const author = getAuthorById(book.authorId);
  const publisher = getPublisherById(book.publisherId);
  const otherBooksByAuthor = getBooksByAuthorId(book.authorId).filter(
    b => b.id !== book.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/books" 
        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-6 inline-block"
      >
        ← Back to Books
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        {/* Book Cover */}
        <div className="md:col-span-1">
          <div className="relative h-96 md:h-[500px] bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        {/* Book Details */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            {book.title}
          </h1>
          
          <Link 
            href={`/authors/${author?.id}`}
            className="text-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-4 inline-block"
          >
            by {author?.name}
          </Link>
          
          <div className="mb-6">
            <FavoriteButton itemId={book.id} itemType="book" />
          </div>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Genre:</span>
              <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50">
                {book.genre}
              </span>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Published:</span>
              <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50">
                {book.publishedYear}
              </span>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Pages:</span>
              <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50">
                {book.pages}
              </span>
            </div>
            {publisher && (
              <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Publisher:</span>
                <Link
                  href={`/publishers/${publisher.id}`}
                  className="ml-2 font-semibold text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
                >
                  {publisher.name}
                </Link>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              About this book
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {book.description}
            </p>
          </div>
          
          <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              ISBN: <span className="font-mono text-zinc-900 dark:text-zinc-50">{book.isbn}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Other Books by Author */}
      {otherBooksByAuthor.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            More by {author?.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {otherBooksByAuthor.map((otherBook) => (
              <Link
                key={otherBook.id}
                href={`/books/${otherBook.id}`}
                className="group"
              >
                <div className="relative h-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                  <Image
                    src={otherBook.coverUrl}
                    alt={`Cover of ${otherBook.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-2">
                  {otherBook.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {otherBook.publishedYear}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
