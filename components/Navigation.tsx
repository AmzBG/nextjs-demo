import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-zinc-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 py-3 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:py-0">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold hover:text-zinc-300 transition-colors">
              📚 BookHub
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-8">
            <Link 
              href="/" 
              className="hover:text-zinc-300 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/books" 
              className="hover:text-zinc-300 transition-colors font-medium"
            >
              Books
            </Link>
            <Link 
              href="/authors" 
              className="hover:text-zinc-300 transition-colors font-medium"
            >
              Authors
            </Link>
            <Link
              href="/publishers"
              className="hover:text-zinc-300 transition-colors font-medium"
            >
              Publishers
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
