/* ==========================================================================
   SHARED TYPES
   --------------------------------------------------------------------------
   These mirror the Zod schema in src/content.config.ts, but describe the
   questions AFTER they have been prepared for the browser: every text field
   has already been turned into HTML (with the maths rendered by KaTeX) at
   build time, so the browser never downloads a maths library.

   Fields ending in `Html` hold safe, pre-rendered HTML.
   ========================================================================== */

export type Difficulty = 'foundation' | 'core' | 'challenge';

export type QuestionType =
  | 'mcq' | 'multi' | 'truefalse' | 'numeric' | 'fill-blank' | 'algebraic'
  | 'match' | 'order' | 'table' | 'steps' | 'hotspot' | 'manipulable'
  | 'flashcards' | 'drill';

/** Human-readable label for each type — used on question chips. */
export const TYPE_LABEL: Record<QuestionType, string> = {
  'mcq': 'Multiple choice',
  'multi': 'Choose all that apply',
  'truefalse': 'True or false',
  'numeric': 'Type the answer',
  'fill-blank': 'Fill the gaps',
  'algebraic': 'Algebraic answer',
  'match': 'Match the pairs',
  'order': 'Put in order',
  'table': 'Complete the table',
  'steps': 'Step by step',
  'hotspot': 'Click the diagram',
  'manipulable': 'Explore and match',
  'flashcards': 'Flashcards',
  'drill': 'Quick-fire drill',
};

export interface PreparedOption {
  id: string;
  html: string;
  noteHtml?: string;
}

interface Base {
  id: string;
  promptHtml: string;
  hintsHtml: string[];
  explanationHtml: string;
  difficulty: Difficulty;
  marks: number;
  tags: string[];
  needsReview: boolean;
}

export interface QMcq extends Base {
  type: 'mcq';
  options: PreparedOption[];
  answer: string;
  shuffleOptions: boolean;
}

export interface QMulti extends Base {
  type: 'multi';
  options: PreparedOption[];
  answers: string[];
  shuffleOptions: boolean;
}

export interface QTrueFalse extends Base {
  type: 'truefalse';
  answer: boolean;
  labels: [string, string];
}

export interface QNumeric extends Base {
  type: 'numeric';
  answer: number | string;
  tolerance: number;
  accept: string[];
  unitHtml?: string;
  placeholder?: string;
}

export interface QFillBlank extends Base {
  type: 'fill-blank';
  /** The sentence split into literal HTML chunks and blank markers. */
  segments: Array<{ kind: 'html'; html: string } | { kind: 'blank'; id: string }>;
  blanks: Array<{ id: string; accept: string[]; tolerance: number; size: number; group?: string }>;
}

export interface QAlgebraic extends Base {
  type: 'algebraic';
  answer: string;
  variables: string[];
  requireForm: boolean;
  placeholder?: string;
}

export interface QMatch extends Base {
  type: 'match';
  left: PreparedOption[];
  right: PreparedOption[];
  solution: Record<string, string>;
}

export interface QOrder extends Base {
  type: 'order';
  items: PreparedOption[];
  solution: string[];
}

export type PreparedCell =
  | { kind: 'given'; html: string }
  | { kind: 'input'; answer: string; accept: string[]; tolerance: number };

export interface QTable extends Base {
  type: 'table';
  columnsHtml: string[];
  rows: PreparedCell[][];
  rowHeader: boolean;
}

export type PreparedStep =
  | {
      kind: 'numeric'; promptHtml: string; answer: number | string;
      tolerance: number; accept: string[]; unitHtml?: string;
      feedbackHtml?: string; hintHtml?: string;
    }
  | {
      kind: 'algebraic'; promptHtml: string; answer: string; variables: string[];
      feedbackHtml?: string; hintHtml?: string;
    }
  | {
      kind: 'mcq'; promptHtml: string; options: PreparedOption[]; answer: string;
      feedbackHtml?: string; hintHtml?: string;
    };

export interface QSteps extends Base {
  type: 'steps';
  scenarioHtml?: string;
  steps: PreparedStep[];
}

export interface QHotspot extends Base {
  type: 'hotspot';
  figure: string;
  config: Record<string, unknown>;
  answer: string | string[];
}

export type WidgetName =
  | 'line-mc' | 'pythagoras' | 'polygon-angles' | 'parabola'
  | 'enlargement' | 'number-line' | 'spinner' | 'prism';

export interface QManipulable extends Base {
  type: 'manipulable';
  widget: WidgetName;
  config: Record<string, unknown>;
  target: Record<string, number>;
  tolerance: number;
}

export interface QFlashcards extends Base {
  type: 'flashcards';
  cards: Array<{ id: string; frontHtml: string; backHtml: string }>;
}

export interface QDrill extends Base {
  type: 'drill';
  durationSec: number;
  count: number;
  pool: Array<{ id: string; promptHtml: string; accept: string[]; tolerance: number }>;
}

export type PreparedQuestion =
  | QMcq | QMulti | QTrueFalse | QNumeric | QFillBlank | QAlgebraic
  | QMatch | QOrder | QTable | QSteps | QHotspot | QManipulable
  | QFlashcards | QDrill;

/* --------------------------------------------------------------------------
   Grading
   -------------------------------------------------------------------------- */

export interface Verdict {
  /** True only when the answer is completely right. */
  correct: boolean;
  /** 0–1. Multi-select and tables award partial credit. */
  score: number;
  /** Optional extra line shown beside the Correct / Incorrect label. */
  detail?: string;
}

/** A question type that carries no right answer, so it is never graded. */
export const UNGRADED: ReadonlySet<QuestionType> = new Set(['flashcards']);
