import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-headline transition-opacity hover:opacity-80"
        >
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white shadow-sm shadow-accent/25"
          >
            R
          </span>
          <span className="text-lg font-semibold tracking-tight">ReportAI</span>
        </Link>

        <nav className="flex items-center gap-3 md:gap-4">
          <Link
            href="/#features"
            className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-headline sm:inline-block"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-headline sm:inline-block"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-headline ring-1 ring-inset ring-gray-200 transition-colors hover:bg-slate-50"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-accent/30 transition-colors hover:bg-accent/92"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}
