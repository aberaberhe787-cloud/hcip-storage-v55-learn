import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-50">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            HC
          </span>
          HCIP Storage V5.5
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/learn"
            className="text-zinc-600 transition hover:text-blue-600 dark:text-zinc-300"
          >
            Learn
          </Link>
          <Link
            href="/practice"
            className="text-zinc-600 transition hover:text-blue-600 dark:text-zinc-300"
          >
            Practice
          </Link>
          <Link
            href="/exam"
            className="text-zinc-600 transition hover:text-blue-600 dark:text-zinc-300"
          >
            Exam
          </Link>
        </nav>
      </div>
    </header>
  );
}
