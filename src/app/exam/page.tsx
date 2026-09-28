"use client";

import { useState, useEffect } from "react";
import { questions } from "@/data/questions";
import QuizCard from "@/components/QuizCard";
import Link from "next/link";

const EXAM_DURATION_SEC = 90 * 60;
const EXAM_SIZE = 10;

export default function ExamPage() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [examQuestions, setExamQuestions] = useState(questions.slice(0, EXAM_SIZE));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SEC);

  useEffect(() => {
    if (!started || finished) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, finished]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleAnswered = (correct: boolean) => {
    if (correct) setScore((s) => s + 1);
  };

  if (!started) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Mock Exam</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Demo mode: {EXAM_SIZE} questions · 90-minute timer · Pass mark 60%.
          Full exam uses 60 questions drawn from the complete bank.
        </p>
        <button
          onClick={() => {
            const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, EXAM_SIZE);
            setExamQuestions(shuffled);
            setStarted(true);
          }}
          className="mt-8 rounded-full bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700"
        >
          Start Exam
        </button>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / EXAM_SIZE) * 100);
    const passed = pct >= 60;
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Exam Complete</h1>
        <p className={`mt-4 text-5xl font-bold ${passed ? "text-emerald-600" : "text-red-600"}`}>
          {pct}%
        </p>
        <p className="mt-2 text-zinc-600">
          {score} / {EXAM_SIZE} correct · {passed ? "PASS" : "NEEDS MORE PRACTICE"}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/practice"
            className="rounded-full border border-zinc-300 px-6 py-2.5 font-medium hover:bg-zinc-100 dark:border-zinc-600"
          >
            Review Weak Areas
          </Link>
          <button
            onClick={() => {
              setStarted(false);
              setFinished(false);
              setIndex(0);
              setScore(0);
              setTimeLeft(EXAM_DURATION_SEC);
            }}
            className="rounded-full bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            Retake
          </button>
        </div>
      </div>
    );
  }

  const current = examQuestions[index];

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm font-medium text-zinc-500">
          Question {index + 1} / {EXAM_SIZE}
        </div>
        <div className={`font-mono text-lg font-semibold ${timeLeft < 300 ? "text-red-600" : ""}`}>
          {formatTime(timeLeft)}
        </div>
      </div>

      <QuizCard
        key={current.id}
        question={current}
        onAnswered={handleAnswered}
      />

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium disabled:opacity-40 dark:border-zinc-600"
        >
          ← Previous
        </button>
        {index < EXAM_SIZE - 1 ? (
          <button
            onClick={() => setIndex((i) => i + 1)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={() => setFinished(true)}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Finish Exam
          </button>
        )}
      </div>
    </div>
  );
}
