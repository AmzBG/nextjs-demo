'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/auth';

interface LoginFormProps {
  redirectTo: string;
}

export default function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // This fake login only stores a cookie so the proxy can recognize the user.
    document.cookie = `${AUTH_COOKIE_NAME}=true; path=/; max-age=86400; samesite=lax`;
    window.dispatchEvent(new Event('bookhub-auth-change'));
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Display name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Reader"
          className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        />
      </label>

      <button
        type="submit"
        className="w-full rounded-md bg-zinc-900 px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Continue
      </button>
    </form>
  );
}
