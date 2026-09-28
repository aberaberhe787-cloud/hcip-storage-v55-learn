"use client";

import { useSearchParams } from "next/navigation";
import { questions, getQuestionsByConcept, getQuestionById } from "@/data/questions";
import QuizCard from "@/components/QuizCard";
import { Suspense, useState } from "react";

function PracticeContent() {
  const searchParams = useSearchParams();
  const conceptId = searchParams.get("concept");
  const questionId = searchParams.get("q");

  let filtered = questions;
  if (questionId) {
    const q = getQuestionById(questionId);
    filtered = q ? [q] : [];
  } else if (conceptId) {
    filtered = getQuestionsByConcept(conceptId);
  }

  const [index, setIndex] = useState(0);
  const current = filtered[index];

  if (!current) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-zinc-500">No questions found for this filter.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Practice</h1>
        <span className="text-sm text-zinc-500">
          {index + 1} / {filtered.length}
        </span>
      </div>

      <QuizCard
        key={current.id}
        question={current}
        onAnswered={() => {}}
      />

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium disabled:opacity-40 dark:border-zinc-600"
        >
          ← Previous
        </button>
        <button
          onClick={() => setIndex((i) => Math.min(filtered.length - 1, i + 1))}
          disabled={index === filtered.length - 1}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium disabled:opacity-40 dark:border-zinc-600"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <PracticeContent />
    </Suspense>
  );
}
