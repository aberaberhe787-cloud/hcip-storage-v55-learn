"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { buildWeightedExam } from "@/data/questions";
import QuizCard from "@/components/QuizCard";
import Link from "next/link";
import type { Question } from "@/types";

const EXAM_DURATION_SEC = 90 * 60;
const EXAM_SIZE = 60;
const PASS_SCORE = 600;

const DOMAIN_LABELS: Record<string, string> = {
  "flash-storage": "Flash storage (Dorado)",
  "scale-out": "Scale-out (Pacific)",
  deployment: "Deployment",
  performance: "Performance tuning",
  om: "O&M & troubleshooting",
};

const OFFICIAL_DOMAIN_GROUP: Record<string, string> = {
  "flash-storage": "Product technology & application",
  "scale-out": "Product technology & application",
  deployment: "Product deployment",
  performance: "Performance tuning",
  om: "O&M & troubleshooting",
};

type AnswerRecord = { selected: string; correct: boolean };

export default function ExamPage() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SEC);
  const [showReview, setShowReview] = useState(false);

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

  const handleAnswered = useCallback(
    (correct: boolean, selectedAnswer: string) => {
      const q = examQuestions[index];
      if (!q) return;
      setAnswers((prev) => ({
        ...prev,
        [q.id]: { selected: selectedAnswer, correct },
      }));
    },
    [examQuestions, index]
  );

  const startExam = () => {
    const qs = buildWeightedExam(EXAM_SIZE);
    setExamQuestions(qs);
    setAnswers({});
    setIndex(0);
    setTimeLeft(EXAM_DURATION_SEC);
    setFinished(false);
    setShowReview(false);
    setStarted(true);
  };

  const correctCount = useMemo(
    () => Object.values(answers).filter((a) => a.correct).length,
    [answers]
  );
  const answeredCount = Object.keys(answers).length;
  const rawScore = Math.round((correctCount / EXAM_SIZE) * 1000);
  const passed = rawScore >= PASS_SCORE;

  const domainStats = useMemo(() => {
    const stats: Record<string, { total: number; correct: number }> = {};
    examQuestions.forEach((q) => {
      if (!stats[q.domain]) stats[q.domain] = { total: 0, correct: 0 };
      stats[q.domain].total++;
      if (answers[q.id]?.correct) stats[q.domain].correct++;
    });
    return stats;
  }, [examQuestions, answers]);

  const officialGroupStats = useMemo(() => {
    const stats: Record<string, { total: number; correct: number }> = {};
    examQuestions.forEach((q) => {
      const group = OFFICIAL_DOMAIN_GROUP[q.domain] || q.domain;
      if (!stats[group]) stats[group] = { total: 0, correct: 0 };
      stats[group].total++;
      if (answers[q.id]?.correct) stats[group].correct++;
    });
    return stats;
  }, [examQuestions, answers]);

  const weakQuestions = useMemo(
    () => examQuestions.filter((q) => answers[q.id] && !answers[q.id].correct),
    [examQuestions, answers]
  );

  if (!started) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-3xl font-bold tracking-tight">Mock Exam</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Full-scope simulation of the official H13-624 V5.5 exam. No feedback
            until you submit — just like the real test.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
              <dt className="text-zinc-500">Questions</dt>
              <dd className="mt-1 text-2xl font-bold">{EXAM_SIZE}</dd>
            </div>
            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
              <dt className="text-zinc-500">Time limit</dt>
              <dd className="mt-1 text-2xl font-bold">90 min</dd>
            </div>
            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
              <dt className="text-zinc-500">Pass mark</dt>
              <dd className="mt-1 text-2xl font-bold">600 / 1000</dd>
            </div>
            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
              <dt className="text-zinc-500">Weighting</dt>
              <dd className="mt-1 text-sm font-medium leading-snug">
                Tech ~50% · Deploy 15% · Perf 15% · O&M 20%
              </dd>
            </div>
          </dl>
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
            <p className="font-semibold">Deferred feedback</p>
            <p className="mt-1">
              Answers are recorded as you go. You will not see correct/incorrect
              until you submit. After submission you get a domain score breakdown
              and a full question review with PDF page references.
            </p>
          </div>
          <button
            type="button"
            onClick={startExam}
            className="mt-8 w-full rounded-xl bg-blue-600 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
          >
            Start Full Mock Exam
          </button>
        </div>
      </div>
    );
  }

  if (finished && !showReview) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-3xl font-bold">Exam Complete</h1>
          <p
            className={`mt-4 text-5xl font-bold ${
              passed
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {rawScore}
            <span className="text-2xl font-medium text-zinc-400"> / 1000</span>
          </p>
          <p className="mt-2 text-lg font-medium">
            {passed ? "PASS" : "DID NOT PASS"} · {correctCount}/{EXAM_SIZE} correct
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Answered {answeredCount} of {EXAM_SIZE} · Official pass mark is 600
          </p>

          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Domain score breakdown
            </h2>
            <ul className="mt-3 space-y-2">
              {Object.entries(officialGroupStats).map(([group, s]) => {
                const pct = s.total ? Math.round((s.correct / s.total) * 100) : 0;
                return (
                  <li key={group} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{group}</span>
                      <span>
                        {s.correct}/{s.total}{" "}
                        <span className="text-zinc-400">({pct}%)</span>
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                      <div
                        className={`h-full rounded-full ${
                          pct >= 60 ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              By product area
            </h2>
            <ul className="mt-3 space-y-2">
              {Object.entries(domainStats).map(([dom, s]) => (
                <li
                  key={dom}
                  className="flex items-center justify-between rounded-lg border border-zinc-100 px-4 py-2 text-sm dark:border-zinc-800"
                >
                  <span className="font-medium">{DOMAIN_LABELS[dom] || dom}</span>
                  <span>
                    {s.correct}/{s.total}{" "}
                    <span className="text-zinc-400">
                      ({s.total ? Math.round((s.correct / s.total) * 100) : 0}%)
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {weakQuestions.length > 0 && (
            <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
              {weakQuestions.length} incorrect — review them or open Practice for
              remediation.
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowReview(true)}
              className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
            >
              Review all answers
            </button>
            <Link
              href="/practice"
              className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
            >
              Practice weak areas
            </Link>
            <button
              type="button"
              onClick={startExam}
              className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
            >
              Retake exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (finished && showReview) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Answer review</h1>
          <button
            type="button"
            onClick={() => setShowReview(false)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to scores
          </button>
        </div>
        <p className="mb-6 text-sm text-zinc-500">
          Feedback was deferred during the exam. Correct answers, explanations,
          and PDF page references are shown below.
        </p>
        <div className="space-y-6">
          {examQuestions.map((q, i) => {
            const rec = answers[q.id];
            const ok = rec?.correct;
            const skipped = !rec;
            return (
              <div
                key={`${q.id}-${i}`}
                className={`rounded-xl border p-5 ${
                  skipped
                    ? "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
                    : ok
                    ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20"
                    : "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20"
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                  <span className="text-zinc-500">Q{i + 1}</span>
                  <span
                    className={
                      skipped
                        ? "text-zinc-500"
                        : ok
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-red-700 dark:text-red-400"
                    }
                  >
                    {skipped ? "Skipped" : ok ? "Correct" : "Incorrect"}
                  </span>
                  <span className="text-zinc-400">· {q.domain}</span>
                </div>
                <p className="mt-2 font-medium text-zinc-900 dark:text-zinc-50">{q.stem}</p>
                {rec && (
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="font-medium">Your answer: </span>
                    {rec.selected}
                  </p>
                )}
                {!ok && (
                  <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-300">
                    <span className="font-medium">Correct: </span>
                    {String(q.correctAnswer)}
                  </p>
                )}
                {rec && !ok && q.misconceptionMap?.[rec.selected] && (
                  <p className="mt-2 text-sm text-amber-800 dark:text-amber-200">
                    <span className="font-medium">Misconception: </span>
                    {q.misconceptionMap[rec.selected]}
                  </p>
                )}
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{q.explanation}</p>
                <p className="mt-2 text-xs text-zinc-500">
                  Source: HCIP-Storage V5.5, page {q.pdfPage}
                  {q.conceptIds[0] && (
                    <>
                      {" · "}
                      <Link href={`/learn/${q.conceptIds[0]}`} className="text-blue-600 hover:underline">
                        Review concept
                      </Link>
                    </>
                  )}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => setShowReview(false)}
            className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-medium dark:border-zinc-600"
          >
            Back to scores
          </button>
          <button
            type="button"
            onClick={startExam}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Retake exam
          </button>
        </div>
      </div>
    );
  }

  const current = examQuestions[index];
  if (!current) return null;
  const currentAnswer = answers[current.id]?.selected ?? null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>
              Question {index + 1} / {EXAM_SIZE}
            </span>
            <span>{answeredCount} answered</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${((index + 1) / EXAM_SIZE) * 100}%` }}
            />
          </div>
        </div>
        <div
          className={`font-mono text-lg font-semibold tabular-nums ${
            timeLeft < 300
              ? "text-red-600 dark:text-red-400"
              : "text-zinc-700 dark:text-zinc-300"
          }`}
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      <QuizCard
        key={current.id}
        question={current}
        mode="exam"
        autoRecord
        initialAnswer={currentAnswer}
        onAnswered={handleAnswered}
      />

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium disabled:opacity-40 dark:border-zinc-600"
        >
          ← Previous
        </button>
        {index < EXAM_SIZE - 1 ? (
          <button
            type="button"
            onClick={() => setIndex((i) => i + 1)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setFinished(true)}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Submit Exam
          </button>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-zinc-400">
        No feedback until you submit · Unanswered questions count as incorrect
      </p>
    </div>
  );
}
