import { concepts } from "@/data/concepts";
import { chapters } from "@/data/chapters";
import ConceptCard from "@/components/ConceptCard";

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Learn</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Concept cards sourced from the official HCIP-Storage V5.5 training material.
        Click any card to open the full explanation, exam focus points and practice questions.
      </p>

      {chapters.map((chapter) => {
        const chapterConcepts = concepts.filter((c) => c.chapterId === chapter.id);
        if (chapterConcepts.length === 0) return null;
        return (
          <section key={chapter.id} className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{chapter.title}</h2>
              <span className="text-sm text-zinc-400">{chapter.weight}% of exam</span>
            </div>
            <p className="mt-1 text-sm text-zinc-500">{chapter.description}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {chapterConcepts.map((c) => (
                <ConceptCard key={c.id} concept={c} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
