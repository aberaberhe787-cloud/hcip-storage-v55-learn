# HCIP Storage V5.5 — Exam Learning System

A focused learning application built around the official **HCIP-Storage V5.5** training material (≈598 pages).

## Design principle

**The PDF is the source of truth.**

Every concept, explanation and quiz answer is anchored to the exact page of the official training document. When a learner answers incorrectly the system diagnoses the misconception and points back to the precise source page.

## Current features (v0.1 – Flash Storage / RAID 2.0+ focus)

- **Learn** – Concept cards with:
  - Short definition
  - Full “Understand” explanation
  - Exam-focus bullet points
  - Comparison notes
  - Direct PDF page reference
  - Linked practice questions

- **Practice** – Interactive quizzes with:
  - MCQ / True-False / Fill-in / Scenario types
  - “Why was my answer wrong?” misconception diagnosis
  - Immediate remediation link back to the concept

- **Exam** – Timed mock exam (demo size 10 questions, 90-min timer, 60% pass mark)

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Ready for Firebase (auth + progress) and Vercel deployment
- Knowledge base currently in-memory; migrate to Firestore when ready

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Roadmap

1. Expand concept & question bank to cover all four exam domains
2. Firebase Auth + user progress / spaced-repetition
3. PDF page deep-link viewer (or page-number search)
4. Full 60-question weighted mock exams
5. AI-assisted explanation generation (still constrained to PDF content)

## Source material

Official Huawei HCIP-Storage V5.5 Training Material (Flash Storage Product Technology & Application + Scale-out + Deployment + Performance + O&M).
