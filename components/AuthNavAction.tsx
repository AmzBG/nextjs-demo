'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/auth';

function hasAuthCookie() {
  return document.cookie
    .split('; ')
    .some((cookie) => cookie.startsWith(`${AUTH_COOKIE_NAME}=true`));
}

function subscribeToAuthChanges(callback: () => void) {
  window.addEventListener('bookhub-auth-change', callback);
  window.addEventListener('focus', callback);

  return () => {
    window.removeEventListener('bookhub-auth-change', callback);
    window.removeEventListener('focus', callback);
  };
}

export default function AuthNavAction() {
  const router = useRouter();
  const isAuthenticated = useSyncExternalStore(
    subscribeToAuthChanges,
    hasAuthCookie,
    () => false,
  );

  const handleLogout = () => {
    // Clear the fake auth cookie and refresh server-rendered route state.
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
    window.dispatchEvent(new Event('bookhub-auth-change'));
    router.push('/login');
    router.refresh();
  };

  if (isAuthenticated) {
    return (
      <button
        type="button"
        onClick={handleLogout}
        className="font-medium transition-colors hover:text-zinc-300"
      >
        Logout
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="font-medium transition-colors hover:text-zinc-300"
    >
      Login
    </Link>
  );
}
