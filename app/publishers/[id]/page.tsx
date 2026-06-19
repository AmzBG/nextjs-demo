import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getAuthorById,
  getBooksByPublisherId,
  getPublisherById,
} from '@/lib/data';

export default async function PublisherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const publisher = getPublisherById(parseInt(id));

  if (!publisher) {
    notFound();
  }

  const books = getBooksByPublisherId(publisher.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/publishers"
        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-6 inline-block"
      >
        Back to Publishers
      </Link>

      <div className="mt-6 rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
              {publisher.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              {publisher.description}
            </p>
          </div>

          <a
            href={publisher.website}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-zinc-900 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Visit website
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <div className="rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Country:
            </span>
            <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50">
              {publisher.country}
            </span>
          </div>
          <div className="rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Founded:
            </span>
            <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50">
              {publisher.foundedYear}
            </span>
          </div>
          <div className="rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Books:
            </span>
            <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50">
              {books.length}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Books from {publisher.name}
        </h2>

        {books.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">
            No books found for this publisher.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => {
              const author = getAuthorById(book.authorId);

              return (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl dark:bg-zinc-900"
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
                    <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                      {book.title}
                    </h3>
                    <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                      by {author?.name}
                    </p>
                    <div className="flex items-center justify-between text-sm text-zinc-500">
                      <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">
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
      </div>
    </div>
  );
}
