export function getPageParam(pageParam: string | string[] | undefined) {
  const page = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const parsedPage = Number(page);

  // Invalid, missing, or negative page values should behave like page 1.
  return Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}

export function getPageSizeParam(
  pageSizeParam: string | string[] | undefined,
  allowedPageSizes: readonly number[],
  fallbackPageSize: number,
) {
  const pageSize = Array.isArray(pageSizeParam) ? pageSizeParam[0] : pageSizeParam;
  const parsedPageSize = Number(pageSize);

  // Only allow page sizes that the UI offers.
  return allowedPageSizes.includes(parsedPageSize) ? parsedPageSize : fallbackPageSize;
}

export function paginateItems<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  // Clamp the current page so an oversized URL page still shows valid results.
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  return {
    currentPage,
    items: items.slice(startIndex, startIndex + pageSize),
    totalPages,
  };
}
