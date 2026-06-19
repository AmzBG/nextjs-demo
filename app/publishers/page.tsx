import Link from 'next/link';
import {
  getAllPublishers,
  getBooksByPublisherId,
  Publisher,
} from '@/lib/data';

type PublisherSortKey = 'name' | 'country' | 'foundedYear' | 'bookCount';
type SortOrder = 'asc' | 'desc';

const SORT_KEYS: PublisherSortKey[] = ['name', 'country', 'foundedYear', 'bookCount'];

interface PublishersPageProps {
  searchParams: Promise<{
    q?: string | string[];
    country?: string | string[];
    sort?: string | string[];
    order?: string | string[];
  }>;
}

function getStringParam(param: string | string[] | undefined) {
  return Array.isArray(param) ? param[0] : param;
}

function getSortKey(param: string | string[] | undefined): PublisherSortKey {
  const sort = getStringParam(param);

  // Unknown sort values from the URL should fall back to the default column.
  return SORT_KEYS.includes(sort as PublisherSortKey)
    ? (sort as PublisherSortKey)
    : 'name';
}

function getSortOrder(param: string | string[] | undefined): SortOrder {
  return getStringParam(param) === 'desc' ? 'desc' : 'asc';
}

function getSortValue(
  publisher: Publisher,
  sortKey: PublisherSortKey,
  bookCount: number,
) {
  if (sortKey === 'bookCount') {
    return bookCount;
  }

  return publisher[sortKey];
}

export default async function PublishersPage({ searchParams }: PublishersPageProps) {
  const publishers = getAllPublishers();
  const params = await searchParams;
  const query = getStringParam(params.q)?.trim() ?? '';
  const selectedCountry = getStringParam(params.country) ?? 'all';
  const sortKey = getSortKey(params.sort);
  const sortOrder = getSortOrder(params.order);
  const countries = Array.from(new Set(publishers.map((publisher) => publisher.country)));
  const bookCounts = new Map(
    publishers.map((publisher) => [
      publisher.id,
      getBooksByPublisherId(publisher.id).length,
    ]),
  );

  const filteredPublishers = publishers
    .filter((publisher) => {
      const matchesQuery =
        publisher.name.toLowerCase().includes(query.toLowerCase()) ||
        publisher.description.toLowerCase().includes(query.toLowerCase());
      const matchesCountry =
        selectedCountry === 'all' || publisher.country === selectedCountry;

      return matchesQuery && matchesCountry;
    })
    .sort((firstPublisher, secondPublisher) => {
      const firstValue = getSortValue(
        firstPublisher,
        sortKey,
        bookCounts.get(firstPublisher.id) ?? 0,
      );
      const secondValue = getSortValue(
        secondPublisher,
        sortKey,
        bookCounts.get(secondPublisher.id) ?? 0,
      );

      const result =
        typeof firstValue === 'number' && typeof secondValue === 'number'
          ? firstValue - secondValue
          : String(firstValue).localeCompare(String(secondValue));

      return sortOrder === 'asc' ? result : -result;
    });

  const getSortHref = (nextSortKey: PublisherSortKey) => {
    const params = new URLSearchParams();
    const nextOrder =
      sortKey === nextSortKey && sortOrder === 'asc' ? 'desc' : 'asc';

    if (query) {
      params.set('q', query);
    }

    if (selectedCountry !== 'all') {
      params.set('country', selectedCountry);
    }

    params.set('sort', nextSortKey);
    params.set('order', nextOrder);

    return `/publishers?${params.toString()}`;
  };

  const sortIndicator = (column: PublisherSortKey) => {
    if (sortKey !== column) {
      return '';
    }

    return sortOrder === 'asc' ? ' (asc)' : ' (desc)';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          Publishers
        </h1>
        <p className="mt-3 max-w-3xl text-zinc-600 dark:text-zinc-400">
          Browse publishers, filter by country, and sort the table by the
          details that matter.
        </p>
      </div>

      <form
        action="/publishers"
        className="mb-6 grid gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 md:grid-cols-[1fr_220px_auto_auto]"
      >
        <input type="hidden" name="sort" value={sortKey} />
        <input type="hidden" name="order" value={sortOrder} />

        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Search
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search publishers..."
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Country
          <select
            name="country"
            defaultValue={selectedCountry}
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          >
            <option value="all">All countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="self-end rounded-md bg-zinc-900 px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Apply
        </button>

        <Link
          href="/publishers"
          className="self-end rounded-md border border-zinc-300 px-4 py-2 text-center font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Reset
        </Link>
      </form>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        Showing {filteredPublishers.length} of {publishers.length}{' '}
        {publishers.length === 1 ? 'publisher' : 'publishers'}
      </p>

      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
            <thead className="bg-zinc-100 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  <Link href={getSortHref('name')}>
                    Name{sortIndicator('name')}
                  </Link>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  <Link href={getSortHref('country')}>
                    Country{sortIndicator('country')}
                  </Link>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  <Link href={getSortHref('foundedYear')}>
                    Founded{sortIndicator('foundedYear')}
                  </Link>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  <Link href={getSortHref('bookCount')}>
                    Books{sortIndicator('bookCount')}
                  </Link>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredPublishers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-zinc-600 dark:text-zinc-400"
                  >
                    No publishers match the current filters.
                  </td>
                </tr>
              ) : (
                filteredPublishers.map((publisher) => (
                  <tr
                    key={publisher.id}
                    className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      {publisher.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                      {publisher.country}
                    </td>
                    <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                      {publisher.foundedYear}
                    </td>
                    <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                      {bookCounts.get(publisher.id) ?? 0}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <Link
                        href={`/publishers/${publisher.id}`}
                        className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
                      >
                        View publisher
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
