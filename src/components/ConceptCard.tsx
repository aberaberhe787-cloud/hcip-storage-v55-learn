"use client";

import { Concept } from "@/types";
import Link from "next/link";

interface ConceptCardProps {
  concept: Concept;
  mastery?: number;
}

export default function ConceptCard({ concept, mastery = 0 }: ConceptCardProps) {
  const masteryColor =
    mastery >= 80
      ? "bg-emerald-500"
      : mastery >= 50
      ? "bg-amber-500"
      : mastery > 0
      ? "bg-orange-500"
      : "bg-zinc-300";

  return (
    <Link
      href={`/learn/${concept.slug}`}
      className="group block rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50">
            {concept.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            PDF p.{concept.pdfPageStart}
            {concept.pdfPageEnd ? `–${concept.pdfPageEnd}` : ""}
          </p>
        </div>
        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${masteryColor}`}
        >
          {mastery}%
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
        {concept.shortDefinition}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {concept.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
