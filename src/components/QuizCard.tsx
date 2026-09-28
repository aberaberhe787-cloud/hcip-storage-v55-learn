"use client";

import { useState } from "react";
import { Question } from "@/types";
import Link from "next/link";

interface QuizCardProps {
  question: Question;
  onAnswered?: (correct: boolean) => void;
}

export default function QuizCard({ question, onAnswered }: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [fillAnswer, setFillAnswer] = useState("");

  const isCorrect = (): boolean => {
    if (question.type === "truefalse") {
      return selected === String(question.correctAnswer);
    }
    if (question.type === "fill") {
      return (
        fillAnswer.trim().toLowerCase() ===
        String(question.correctAnswer).toLowerCase()
      );
    }
    return selected === question.correctAnswer;
  };

  const handleSubmit = () => {
    if (question.type === "fill" && !fillAnswer.trim()) return;
    if (question.type !== "fill" && !selected) return;
    setShowResult(true);
    onAnswered?.(isCorrect());
  };

  const getMisconception = (): string | null => {
    if (!selected || !question.misconceptionMap) return null;
    return question.misconceptionMap[selected] || null;
  };

  const reset = () => {
    setSelected(null);
    setFillAnswer("");
    setShowResult(false);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold uppercase text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {question.type}
        </span>
        <span className="text-xs text-zinc-400">
          Difficulty: {question.difficulty}
        </span>
      </div>

      <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
        {question.stem}
      </p>

      {/* Options */}
      {!showResult && (
        <div className="mt-5 space-y-2">
          {question.type === "fill" ? (
            <input
              type="text"
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              placeholder="Type your answer..."
              className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
          ) : question.type === "truefalse" ? (
            ["true", "false"].map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`w-full rounded-lg border px-4 py-3 text-left transition ${
                  selected === opt
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700"
                }`}
              >
                {opt === "true" ? "True" : "False"}
              </button>
            ))
          ) : (
            question.options?.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition ${
                  selected === opt
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700"
                }`}
              >
                {opt}
              </button>
            ))
          )}

          <button
            onClick={handleSubmit}
            disabled={
              question.type === "fill" ? !fillAnswer.trim() : !selected
            }
            className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Check Answer
          </button>
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className="mt-5 space-y-4">
          <div
            className={`rounded-lg p-4 ${
              isCorrect()
                ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200"
            }`}
          >
            <p className="font-semibold">
              {isCorrect() ? "✓ Correct" : "✗ Incorrect"}
            </p>
            {!isCorrect() && getMisconception() && (
              <p className="mt-2 text-sm">
                <span className="font-medium">Your misconception: </span>
                {getMisconception()}
              </p>
            )}
          </div>

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Correct concept
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {question.explanation}
            </p>
            <p className="mt-3 text-xs text-zinc-500">
              Source: HCIP-Storage V5.5, page {question.pdfPage}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={reset}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
            >
              Try again
            </button>
            <Link
              href={`/learn/${question.conceptIds[0]}`}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
            >
              Review source concept
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
