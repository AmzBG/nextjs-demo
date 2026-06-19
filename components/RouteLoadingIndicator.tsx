'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const MIN_LOADING_TIME = 450;

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function shouldShowLoading(event: MouseEvent, anchor: HTMLAnchorElement) {
  // Only show the loader for normal same-tab clicks.
  if (event.defaultPrevented || event.button !== 0 || isModifiedClick(event)) {
    return false;
  }

  if (anchor.target && anchor.target !== '_self') {
    return false;
  }

  const nextUrl = new URL(anchor.href);
  const currentUrl = new URL(window.location.href);

  // External links and links to the current URL should not trigger loading.
  return (
    nextUrl.origin === currentUrl.origin &&
    nextUrl.pathname + nextUrl.search !== currentUrl.pathname + currentUrl.search
  );
}

export default function RouteLoadingIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const startedAtRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');

      if (!anchor || !shouldShowLoading(event, anchor)) {
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Remember when loading started so quick routes still show the skeleton briefly.
      startedAtRef.current = Date.now();
      setIsLoading(true);
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const elapsedTime = Date.now() - startedAtRef.current;
    const remainingTime = Math.max(MIN_LOADING_TIME - elapsedTime, 0);

    // Once the route changes, keep the fake loader visible long enough to be seen.
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, remainingTime);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading, pathname, searchParams]);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/95 shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95"
    >
      <div className="h-1 w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        <div className="h-full w-1/2 animate-pulse bg-zinc-900 dark:bg-zinc-50" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-3 h-3 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-2 h-3 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
