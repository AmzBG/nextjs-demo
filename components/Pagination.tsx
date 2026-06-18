import Link from 'next/link';

interface PaginationProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
  searchParams?: Record<string, string | number | undefined>;
}

export default function Pagination({
  basePath,
  currentPage,
  totalPages,
  searchParams = {},
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPageHref = (page: number) => {
    const params = new URLSearchParams();

    // Keep any existing filters when the user moves between pages.
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.set(key, String(value));
      }
    });

    // Page 1 uses the clean base URL instead of adding ?page=1.
    if (page > 1) {
      params.set('page', String(page));
    } else {
      params.delete('page');
    }

    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        {currentPage > 1 ? (
          <Link
            href={getPageHref(previousPage)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Previous
          </Link>
        ) : (
          <span className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-400 dark:border-zinc-800 dark:text-zinc-600">
            Previous
          </span>
        )}

        {pages.map((page) => (
          <Link
            key={page}
            href={getPageHref(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`min-w-10 rounded-md border px-3 py-2 text-center text-sm font-medium transition-colors ${
              page === currentPage
                ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900'
                : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            {page}
          </Link>
        ))}

        {currentPage < totalPages ? (
          <Link
            href={getPageHref(nextPage)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Next
          </Link>
        ) : (
          <span className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-400 dark:border-zinc-800 dark:text-zinc-600">
            Next
          </span>
        )}
      </div>
    </nav>
  );
}
