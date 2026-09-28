"use client";

import { Concept } from "@/types";
import Link from "next/link";
import { getQuestionsByConcept } from "@/data/questions";

interface ConceptDetailProps {
  concept: Concept;
}

export default function ConceptDetail({ concept }: ConceptDetailProps) {
  const relatedQuestions = getQuestionsByConcept(concept.id);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/learn" className="hover:text-blue-600">
            Learn
          </Link>
          <span>/</span>
          <span className="text-zinc-800 dark:text-zinc-200">{concept.title}</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {concept.title}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Source: HCIP-Storage V5.5 Training Material · Page {concept.pdfPageStart}
          {concept.pdfPageEnd ? `–${concept.pdfPageEnd}` : ""}
        </p>
      </div>

      {/* Short Definition */}
      <section className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 dark:border-blue-900 dark:bg-blue-950/30">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
          Concept
        </h2>
        <p className="mt-2 text-lg text-zinc-800 dark:text-zinc-100">
          {concept.shortDefinition}
        </p>
      </section>

      {/* Understand */}
      <section>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Understand
        </h2>
        <p className="mt-3 leading-relaxed text-zinc-700 dark:text-zinc-300">
          {concept.understand}
        </p>
      </section>

      {/* Exam Focus */}
      <section>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Exam Focus
        </h2>
        <ul className="mt-3 space-y-2">
          {concept.examFocus.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* Comparison */}
      {concept.comparisonNotes && (
        <section className="rounded-xl border border-amber-100 bg-amber-50/50 p-5 dark:border-amber-900 dark:bg-amber-950/20">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
            Compare
          </h2>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            {concept.comparisonNotes}
          </p>
        </section>
      )}

      {/* Practice */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Practice
          </h2>
          <span className="text-sm text-zinc-500">
            {relatedQuestions.length} questions
          </span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {relatedQuestions.slice(0, 4).map((q) => (
            <Link
              key={q.id}
              href={`/practice?q=${q.id}`}
              className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm transition hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-700"
            >
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {q.type.toUpperCase()}
              </span>
              <p className="mt-1 line-clamp-2 text-zinc-600 dark:text-zinc-400">
                {q.stem}
              </p>
            </Link>
          ))}
        </div>
        {relatedQuestions.length > 0 && (
          <Link
            href={`/practice?concept=${concept.id}`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            Practice all {relatedQuestions.length} questions →
          </Link>
        )}
      </section>

      {/* Source */}
      <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-900">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Source
        </h2>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">
          HCIP-Storage V5.5 Training Material — Page {concept.pdfPageStart}
          {concept.pdfPageEnd ? `–${concept.pdfPageEnd}` : ""}
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          Always verify against the official PDF. The page reference is the source of truth.
        </p>
      </section>
    </div>
  );
}
