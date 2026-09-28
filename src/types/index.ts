export type Domain =
  | "flash-storage"
  | "scale-out"
  | "deployment"
  | "performance"
  | "om";

export type QuestionType = "mcq" | "truefalse" | "scenario" | "fill";

export interface Concept {
  id: string;
  title: string;
  slug: string;
  chapterId: string;
  domain: Domain;
  pdfPageStart: number;
  pdfPageEnd?: number;
  shortDefinition: string;
  understand: string;
  examFocus: string[];
  comparisonNotes?: string;
  relatedConceptIds: string[];
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface Question {
  id: string;
  type: QuestionType;
  conceptIds: string[];
  stem: string;
  options?: string[];
  correctAnswer: string | string[] | boolean;
  explanation: string;
  misconceptionMap?: Record<string, string>;
  pdfPage: number;
  difficulty: "easy" | "medium" | "hard";
  domain: Domain;
}

export interface Chapter {
  id: string;
  title: string;
  order: number;
  domain: Domain;
  weight: number;
  description: string;
  /** Core concept ids implemented in the knowledge base for this section */
  conceptIds: string[];
  /**
   * Official H13-624 V5.5 syllabus topics that MUST be covered in this section.
   * Used to audit completeness and show learners what the exam expects.
   */
  requiredTopics: string[];
}

export interface UserProgress {
  userId: string;
  conceptMastery: Record<string, number>; // 0-100
  questionHistory: {
    questionId: string;
    correct: boolean;
    answeredAt: string;
    selectedAnswer?: string;
  }[];
  weakConcepts: string[];
  lastMockScore?: number;
  masteryPercentage: number;
}
