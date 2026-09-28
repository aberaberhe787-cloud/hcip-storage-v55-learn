import Link from "next/link";
import { concepts } from "@/data/concepts";
import { questions } from "@/data/questions";
import { chapters } from "@/data/chapters";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          HCIP Storage V5.5
          <span className="block text-blue-600">Exam Learning System</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Built around the official training material. Every answer links back to
          the exact PDF page. Learn concepts, practice with misconception diagnosis,
          and take timed mock exams.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/learn"
            className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Start Learning
          </Link>
          <Link
            href="/practice"
            className="rounded-full border border-zinc-300 px-6 py-3 font-medium transition hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
          >
            Practice Questions
          </Link>
        </div>
      </section>

      <section className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Concepts", value: concepts.length },
          { label: "Questions", value: questions.length },
          { label: "Chapters", value: chapters.length },
          { label: "PDF Pages", value: "598" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-zinc-200 bg-white p-5 text-center dark:border-zinc-700 dark:bg-zinc-900"
          >
            <p className="text-3xl font-bold text-blue-600">{s.value}</p>
            <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Learning Modules</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((ch) => (
            <Link
              key={ch.id}
              href={`/learn?chapter=${ch.id}`}
              className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Module {ch.order}
                </span>
                <span className="text-xs text-zinc-400">{ch.weight}% exam</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold">{ch.title}</h3>
              <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
                {ch.description}
              </p>
              <p className="mt-3 text-xs text-zinc-400">
                {ch.conceptIds.length} concepts loaded
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-blue-100 bg-blue-50/50 p-8 dark:border-blue-900 dark:bg-blue-950/20">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100">
          PDF is the source of truth
        </h2>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          Every concept, explanation and quiz answer is anchored to the official
          HCIP-Storage V5.5 training material. When you get a question wrong, the
          system tells you exactly which misconception you held and points you
          back to the precise page so you can re-learn and re-test.
        </p>
      </section>
    </div>
  );
}
