import { concepts } from "@/data/concepts";
import { chapters } from "@/data/chapters";
import ConceptCard from "@/components/ConceptCard";

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Learn</h1>
      <p className="mt-2 max-w-3xl text-zinc-600 dark:text-zinc-400">
        Organised by official H13-624 V5.5 exam sections. Each section lists the
        required syllabus topics and the core concept cards you must master.
      </p>

      {chapters.map((chapter) => {
        const chapterConcepts = concepts.filter(
          (c) => c.chapterId === chapter.id
        );
        const implemented = new Set(chapterConcepts.map((c) => c.id));
        const coverage =
          chapter.conceptIds.length === 0
            ? 0
            : Math.round(
                (chapter.conceptIds.filter((id) => implemented.has(id)).length /
                  chapter.conceptIds.length) *
                  100
              );

        return (
          <section
            key={chapter.id}
            id={chapter.id}
            className="mt-12 scroll-mt-20 border-t border-zinc-200 pt-10 dark:border-zinc-800"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Module {chapter.order} · {chapter.domain}
                </p>
                <h2 className="mt-1 text-2xl font-semibold">{chapter.title}</h2>
                <p className="mt-1 text-sm text-zinc-500">{chapter.description}</p>
              </div>
              <div className="text-right text-sm">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">
                  {chapter.weight}% of exam
                </p>
                <p className="text-zinc-400">
                  {chapterConcepts.length}/{chapter.conceptIds.length} concepts
                  · {coverage}% filled
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50/60 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                Required topics for this section
              </h3>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {chapter.requiredTopics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {chapterConcepts.length > 0 ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {chapterConcepts.map((c) => (
                  <ConceptCard key={c.id} concept={c} />
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-zinc-500">
                Concept cards for this section are being added. Use the required
                topics list above as your study checklist against the official PDF.
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}
