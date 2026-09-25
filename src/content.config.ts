/* ==========================================================================
   CONTENT SCHEMA
   --------------------------------------------------------------------------
   Every lesson, question bank and quiz you write is checked against these
   rules when the site builds. If you mistype a question type or forget an
   answer, `npm run build` stops and tells you the exact file and field.

   You do not need to understand this file to author content — see README.md.
   ========================================================================== */

import { defineCollection, z, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';

/* --------------------------------------------------------------------------
   Shared building blocks
   -------------------------------------------------------------------------- */

const difficulty = z.enum(['foundation', 'core', 'challenge']).default('core');

/** Fields every single question shares, whatever its type. */
const baseQuestion = {
  /** Unique within its own file. Used to remember which questions were answered. */
  id: z.string(),
  /** The question text. Supports $maths$ and **bold**. */
  prompt: z.string(),
  /** Shown one at a time when the student presses "Hint". */
  hints: z.array(z.string()).default([]),
  /** The worked explanation revealed after answering. Supports $maths$. */
  explanation: z.string(),
  difficulty,
  /** Marks this question is worth inside a quiz. Defaults to 1. */
  marks: z.number().int().positive().default(1),
  /** Optional free-text labels, e.g. ["nth-term", "calculator"]. */
  tags: z.array(z.string()).default([]),
  /** Set true for questions drafted by Claude that you have not yet checked. */
  needsReview: z.boolean().default(false),
};

const option = z.object({
  id: z.string(),
  text: z.string(),
  /** Optional per-option note shown in the review screen. */
  note: z.string().optional(),
});

/* --------------------------------------------------------------------------
   The 15 question types
   -------------------------------------------------------------------------- */

/** 1. Multiple choice — exactly one correct option. */
const mcq = z.object({
  ...baseQuestion,
  type: z.literal('mcq'),
  options: z.array(option).min(2),
  /** The `id` of the correct option. */
  answer: z.string(),
  /** Set false to keep options in the order you wrote them (e.g. "None of these"). */
  shuffleOptions: z.boolean().default(true),
});

/** 2. Multiple select — choose all that apply. Scored with partial credit. */
const multi = z.object({
  ...baseQuestion,
  type: z.literal('multi'),
  options: z.array(option).min(3),
  /** The `id`s of every correct option. */
  answers: z.array(z.string()).min(1),
  shuffleOptions: z.boolean().default(true),
});

/** 3. True / False. */
const truefalse = z.object({
  ...baseQuestion,
  type: z.literal('truefalse'),
  answer: z.boolean(),
  /** Override the button labels, e.g. ["Rational", "Irrational"]. */
  labels: z.tuple([z.string(), z.string()]).default(['True', 'False']),
});

/** 4. Numeric entry — accepts equivalent forms and a tolerance. */
const numeric = z.object({
  ...baseQuestion,
  type: z.literal('numeric'),
  /** A number, or a string like "3/4", "2 1/2", "1.5e8". */
  answer: z.union([z.number(), z.string()]),
  /** Absolute tolerance. e.g. 0.01 accepts 3.14 for pi. Defaults to exact. */
  tolerance: z.number().nonnegative().default(0),
  /** Extra literal strings to accept, e.g. ["0.75", "75%"]. */
  accept: z.array(z.string()).default([]),
  /** Shown as a suffix beside the input, e.g. "cm^2". Not typed by the student. */
  unit: z.string().optional(),
  /** Placeholder text in the empty box. */
  placeholder: z.string().optional(),
});

/** 5. Fill in the blank — one or more gaps in a sentence or equation. */
const fillBlank = z.object({
  ...baseQuestion,
  type: z.literal('fill-blank'),
  /** The sentence, with [[1]], [[2]] … marking each gap. */
  text: z.string(),
  blanks: z.array(z.object({
    id: z.string(),
    /** Every string that counts as correct for this gap. Case-insensitive. */
    accept: z.array(z.string()).min(1),
    /** Treat the entries as numbers and allow this tolerance. */
    tolerance: z.number().nonnegative().default(0),
    /** Approximate character width of the input box. */
    size: z.number().int().positive().default(6),
    /** Gaps with the same group can be answered in any order (e.g. two roots). */
    group: z.string().optional(),
  })).min(1),
});

/** 6. Short algebraic input — checked for mathematical equivalence. */
const algebraic = z.object({
  ...baseQuestion,
  type: z.literal('algebraic'),
  /** The expression in plain text, e.g. "3x + 12" or "n^2 - 7". */
  answer: z.string(),
  /** Which letters are variables. Used when sampling values to compare. */
  variables: z.array(z.string()).default(['x']),
  /** Require the SAME written form, not just equivalence (rare — e.g. "factorise"). */
  requireForm: z.boolean().default(false),
  placeholder: z.string().optional(),
});

/** 7. Drag-and-drop matching — pair each left item with a right item. */
const match = z.object({
  ...baseQuestion,
  type: z.literal('match'),
  left: z.array(option).min(2),
  right: z.array(option).min(2),
  /** { leftId: rightId } for every pair. */
  solution: z.record(z.string(), z.string()),
});

/** 8. Drag-and-drop ordering — put the steps in the right order. */
const order = z.object({
  ...baseQuestion,
  type: z.literal('order'),
  items: z.array(option).min(3),
  /** Item `id`s listed from first to last. */
  solution: z.array(z.string()).min(3),
});

/** 9. Complete the table — fill the missing cells. */
const table = z.object({
  ...baseQuestion,
  type: z.literal('table'),
  columns: z.array(z.string()).min(2),
  /**
   * One array per row. Each cell is either:
   *   { given: "5" }                 — pre-filled, read only
   *   { answer: "12", tolerance: 0 } — a gap the student fills
   */
  rows: z.array(z.array(z.union([
    z.object({ given: z.string() }),
    z.object({
      answer: z.string(),
      accept: z.array(z.string()).default([]),
      tolerance: z.number().nonnegative().default(0),
    }),
  ]))).min(1),
  /** Show the first column as a header column (bold, left aligned). */
  rowHeader: z.boolean().default(true),
});

/** 10. Step-by-step guided solver — each step unlocks the next. */
const steps = z.object({
  ...baseQuestion,
  type: z.literal('steps'),
  /** The overall problem, shown above the steps. */
  scenario: z.string().optional(),
  steps: z.array(z.discriminatedUnion('kind', [
    z.object({
      kind: z.literal('numeric'),
      prompt: z.string(),
      answer: z.union([z.number(), z.string()]),
      tolerance: z.number().nonnegative().default(0),
      accept: z.array(z.string()).default([]),
      unit: z.string().optional(),
      feedback: z.string().optional(),
      hint: z.string().optional(),
    }),
    z.object({
      kind: z.literal('algebraic'),
      prompt: z.string(),
      answer: z.string(),
      variables: z.array(z.string()).default(['x']),
      feedback: z.string().optional(),
      hint: z.string().optional(),
    }),
    z.object({
      kind: z.literal('mcq'),
      prompt: z.string(),
      options: z.array(option).min(2),
      answer: z.string(),
      feedback: z.string().optional(),
      hint: z.string().optional(),
    }),
  ])).min(2),
});

/** 11. Diagram hotspot — click the right part of a figure. */
const hotspot = z.object({
  ...baseQuestion,
  type: z.literal('hotspot'),
  /** A figure key from src/components/visuals/figures.ts */
  figure: z.string(),
  /** Options passed to that figure (labels, side lengths, …). */
  config: z.record(z.string(), z.any()).default({}),
  /** The `id` of the correct region, or several if more than one is right. */
  answer: z.union([z.string(), z.array(z.string())]),
});

/** 12. Manipulable — drag sliders or points until a target is matched. */
const manipulable = z.object({
  ...baseQuestion,
  type: z.literal('manipulable'),
  /** Which interactive tool to show. */
  widget: z.enum([
    'line-mc',        // sliders for gradient m and intercept c
    'pythagoras',     // drag the vertices of a right-angled triangle
    'polygon-angles', // change the number of sides of a polygon
    'parabola',       // sliders for a, b, c in a quadratic
    'enlargement',    // drag the centre and the scale factor
    'number-line',    // drag a point / an inequality region
    'spinner',        // run a probability experiment
    'prism',          // change the dimensions of a prism
    'area-model',     // (x + a)(x + b) as a rectangle of four parts
    'bearing',        // turn a pointer to a three-figure bearing
    'histogram',      // grouped frequencies as bars / a frequency polygon
    'axis-trick',     // a bar chart whose axis can be cut or stretched
  ]),
  config: z.record(z.string(), z.any()).default({}),
  /** What the student has to achieve, e.g. { m: 2, c: -3 }. */
  target: z.record(z.string(), z.any()).default({}),
  tolerance: z.number().nonnegative().default(0.01),
});

/** 13. Flashcards — flip through formulas or definitions. */
const flashcards = z.object({
  ...baseQuestion,
  type: z.literal('flashcards'),
  cards: z.array(z.object({
    id: z.string(),
    front: z.string(),
    back: z.string(),
  })).min(2),
});

/** 14. Quick-fire timed drill — a burst of short questions against a clock. */
const drill = z.object({
  ...baseQuestion,
  type: z.literal('drill'),
  /** Seconds on the clock. */
  durationSec: z.number().int().positive().default(60),
  /** How many questions to pull from the pool each run. */
  count: z.number().int().positive().default(10),
  pool: z.array(z.object({
    id: z.string(),
    prompt: z.string(),
    /** Every accepted answer for this item. */
    accept: z.array(z.string()).min(1),
    tolerance: z.number().nonnegative().default(0),
  })).min(4),
});

/** 15. Sort into groups — drag each card into the group it belongs to.
 *  Write each group with the cards that belong in it; they are mixed up on screen. */
const sort = z.object({
  ...baseQuestion,
  type: z.literal('sort'),
  groups: z.array(z.object({
    id: z.string(),
    text: z.string(),
    items: z.array(option).min(1),
  })).min(2),
});

/** The full union — a question must be exactly one of these 15 shapes. */
export const questionSchema = z.discriminatedUnion('type', [
  mcq, multi, truefalse, numeric, fillBlank, algebraic, match,
  order, table, steps, hotspot, manipulable, flashcards, drill, sort,
]);

/* --------------------------------------------------------------------------
   Collections
   -------------------------------------------------------------------------- */

/** The three NSW strands. Defined once, in src/content/strands.json. */
const strands = defineCollection({
  loader: file('src/content/strands.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    short: z.string(),
    description: z.string(),
    /** CSS custom property used as this strand's accent colour. */
    accent: z.enum(['--strand-na', '--strand-mg', '--strand-sp']),
    order: z.number().int(),
  }),
});

/** One JSON file per topic in src/content/topics/. */
const topics = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/topics' }),
  schema: z.object({
    title: z.string(),
    /** One line shown on the topic card. */
    description: z.string(),
    strand: reference('strands'),
    /** Chapter number in the scheme of work — controls ordering. */
    order: z.number().int(),
    difficulty,
    /** Extension topics are excluded from the overall completion percentage. */
    extension: z.boolean().default(false),
    /** Short list of what the student will be able to do. */
    objectives: z.array(z.string()).default([]),
    /** Optional keywords to help the search box find this topic. */
    keywords: z.array(z.string()).default([]),
  }),
});

/** An interactive diagram — used as the lesson's main visual or inline. */
const visualBlock = z.object({
  widget: z.string(),
  title: z.string(),
  caption: z.string().optional(),
  config: z.record(z.string(), z.any()).default({}),
});

/**
 * An activity placed INSIDE the lesson text with a line like
 *   [[activity: my-id]]
 * Give exactly one of `question`, `visual` or `reveal`.
 */
const activity = z.object({
  /** The small tag above it, e.g. "Predict first", "Quick check", "Try it". */
  label: z.string().default('Quick check'),
  /** Any of the 15 question types. Its `id` is filled in for you. */
  question: questionSchema.optional(),
  /** An interactive to play with (no marking). */
  visual: visualBlock.optional(),
  /** A "think about it" prompt with an answer hidden behind a button. */
  reveal: z.object({ prompt: z.string(), answer: z.string() }).optional(),
}).refine((a) => [a.question, a.visual, a.reveal].filter(Boolean).length === 1, {
  message: 'An activity needs exactly one of: question, visual or reveal.',
});

/** Give each activity question an id (its key) if the author left it out. */
const activities = z.preprocess((raw) => {
  if (!raw || typeof raw !== 'object') return raw;
  return Object.fromEntries(Object.entries(raw as Record<string, any>).map(([k, v]) =>
    [k, v?.question && !v.question.id ? { ...v, question: { ...v.question, id: k } } : v]));
}, z.record(z.string(), activity)).default({});

/** One Markdown file per lesson in src/content/lessons/. */
const lessons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    topic: reference('topics'),
    /** Position of this lesson within its topic, starting at 1. */
    order: z.number().int().positive(),
    /** One sentence shown in the lesson list. */
    summary: z.string(),
    difficulty,
    /** "By the end of this lesson you can …" */
    objectives: z.array(z.string()).min(1),
    /** The rules and formulas box. `body` supports $maths$. */
    keyRules: z.array(z.object({
      title: z.string(),
      body: z.string(),
      /** Renders this rule as a big centred formula card. */
      formula: z.string().optional(),
    })).default([]),
    /** Worked examples. Steps stay hidden until the student reveals them. */
    workedExamples: z.array(z.object({
      title: z.string(),
      problem: z.string(),
      steps: z.array(z.object({
        /** The reasoning, in words. */
        explain: z.string(),
        /** The line of algebra for this step. Optional. */
        maths: z.string().optional(),
      })).min(1),
      answer: z.string(),
    })).default([]),
    /** Interactive visual shown after the key rules, e.g. "line-mc". */
    visual: visualBlock.optional(),
    /** Activities placed in the text with [[activity: id]]. */
    activities,
    /** id of the matching file in src/content/exercises/. */
    practice: z.string().optional(),
    /** Estimated minutes, shown on the lesson card. */
    minutes: z.number().int().positive().default(15),
  }),
});

/** One JSON file per practice set in src/content/exercises/. */
const exercises = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/exercises' }),
  schema: z.object({
    title: z.string().default('Practice'),
    intro: z.string().optional(),
    /** Show a random `pick` of the bank instead of all of it. */
    pick: z.number().int().positive().optional(),
    shuffle: z.boolean().default(false),
    questions: z.array(questionSchema).min(1),
  }),
});

/** One JSON file per topic quiz in src/content/quizzes/. */
const quizzes = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/quizzes' }),
  schema: z.object({
    title: z.string(),
    topic: reference('topics'),
    description: z.string().optional(),
    /** How many questions to draw from the bank for each attempt. */
    pick: z.number().int().positive().optional(),
    /** Seconds for the optional timed mode. */
    timeLimitSec: z.number().int().positive().default(900),
    /** Percentage needed to count as a pass. */
    passMark: z.number().int().min(0).max(100).default(70),
    questions: z.array(questionSchema).min(1),
  }),
});

/* --------------------------------------------------------------------------
   Exam questions (Cambridge / IGCSE style)
   --------------------------------------------------------------------------
   Structured, multi-part questions with a mark scheme written the way
   Cambridge writes one: an answer, a number of marks, and partial marks
   ("M1 for …", "B1 for …") for a student who does not get all the way.
   -------------------------------------------------------------------------- */

/** How the site can check the final answer typed on the answer line.
 *  Leave it out for answers that cannot be typed (a sketch, a reason, a
 *  construction) — the student then marks that part against the scheme. */
const examCheck = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('numeric'),
    answer: z.union([z.number(), z.string()]),
    tolerance: z.number().nonnegative().default(0),
    accept: z.array(z.string()).default([]),
  }),
  z.object({
    kind: z.literal('algebraic'),
    answer: z.string(),
    variables: z.array(z.string()).default(['x']),
    /** Require the same form, e.g. for "factorise". */
    requireForm: z.boolean().default(false),
  }),
  z.object({
    kind: z.literal('text'),
    /** Every string that counts as correct. Case and spaces are ignored. */
    accept: z.array(z.string()).min(1),
  }),
  z.object({
    kind: z.literal('surd'),
    /** The exact value, e.g. "5sqrt2" or "(5 + 4sqrt2)/7". Any exact form
     *  with the same value is accepted; decimals never are. */
    answer: z.string(),
    /** Also require fully simplified surds and a rational denominator. */
    simplest: z.boolean().default(false),
  }),
]);

/** One answer line, e.g. "(a) Expand … [2]". */
const examLeaf = z.object({
  /** "a", "b", "i", "ii" … */
  label: z.string(),
  /** The question text for this part. Supports $maths$. */
  prompt: z.string(),
  marks: z.number().int().positive(),
  /** Text before the answer line, e.g. "$x =$". */
  answerPrefix: z.string().optional(),
  /** Text after the answer line, e.g. "cm$^2$". */
  answerSuffix: z.string().optional(),
  /** Several answer lines, e.g. ["$x =$", "$y =$"] for a pair of values.
   *  Each needs its own entry in `checks` (in the same order). */
  answerLines: z.array(z.string()).optional(),
  /** Auto-check for a single answer line. */
  check: examCheck.optional(),
  /** Auto-checks for `answerLines`, one each. */
  checks: z.array(examCheck).optional(),
  /** The answer lines can be filled in any order (e.g. the two roots of a
   *  quadratic). Leave false when each line is named, like "$x =$", "$y =$". */
  anyOrder: z.boolean().default(false),
  /** Mark scheme — the final answer, as it appears in the "Answer" column. */
  answer: z.string(),
  /** Mark scheme — the "Partial marks" column, e.g. "M1 for $3x = 12$". */
  partial: z.array(z.string()).default([]),
  /** Mark scheme — shorthand after the answer: "oe", "cao", "FT", "isw" … */
  qualifier: z.string().optional(),
});

/** A part that holds sub-parts (i), (ii) … — its own text is the lead-in. */
const examGroup = z.object({
  label: z.string(),
  prompt: z.string().optional(),
  parts: z.array(examLeaf).min(1),
});

const examQuestion = z.object({
  id: z.string(),
  /** 'calculator' questions only appear on calculator papers; 'non-calculator'
   *  questions can appear on either; 'either' is the same as non-calculator. */
  calculator: z.enum(['calculator', 'non-calculator', 'either']).default('either'),
  difficulty,
  /** On a test: the section this question belongs to, used for the
   *  marks-by-section table (e.g. "Surds"). */
  section: z.string().optional(),
  /** The shared text / data at the top of the question. Supports $maths$. */
  stem: z.string().optional(),
  parts: z.array(z.union([examGroup, examLeaf])).min(1),
  needsReview: z.boolean().default(false),
});

/** One JSON file per topic in src/content/exam/. */
const exam = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/exam' }),
  schema: z.object({
    topic: reference('topics'),
    questions: z.array(examQuestion).min(1),
  }),
});

/** A fixed test paper for a student, one JSON file per test in
 *  src/content/tests/. It is served at /test/<file name>/ and is not linked
 *  from the menus — share the link. */
const tests = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/tests' }),
  schema: z.object({
    title: z.string(),
    /** Shown on the cover, e.g. "Candidate: Hana". */
    candidate: z.string().optional(),
    /** Shown on the cover, e.g. "29 September 2026". */
    date: z.string().optional(),
    /** Position in the list of tests on the Exam practice page (1 = first). */
    order: z.number().int().optional(),
    minutes: z.number().int().positive(),
    calculator: z.enum(['calculator', 'non-calculator']),
    /** Questions appear in exactly this order. */
    questions: z.array(examQuestion).min(1),
  }),
});

export const collections = { strands, topics, lessons, exercises, quizzes, exam, tests };
