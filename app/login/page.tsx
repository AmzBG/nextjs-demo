import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import { AUTH_COOKIE_NAME } from '@/lib/auth';

interface LoginPageProps {
  searchParams: Promise<{
    redirect?: string | string[];
  }>;
}

function getRedirectPath(redirectParam: string | string[] | undefined) {
  const redirect = Array.isArray(redirectParam) ? redirectParam[0] : redirectParam;

  // Only allow internal redirects; everything else falls back to books.
  if (redirect?.startsWith('/') && !redirect.startsWith('//')) {
    return redirect;
  }

  return '/books';
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();

  if (cookieStore.get(AUTH_COOKIE_NAME)?.value === 'true') {
    redirect('/books');
  }

  const params = await searchParams;
  const redirectTo = getRedirectPath(params.redirect);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Sign in
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Use the fake sign-in flow to unlock the library pages for this demo.
        </p>

        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
