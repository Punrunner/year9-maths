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
   The 14 question types
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

/** The full union — a question must be exactly one of these 14 shapes. */
export const questionSchema = z.discriminatedUnion('type', [
  mcq, multi, truefalse, numeric, fillBlank, algebraic, match,
  order, table, steps, hotspot, manipulable, flashcards, drill,
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
    /** Interactive visual shown inside the lesson, e.g. "line-mc". */
    visual: z.object({
      widget: z.string(),
      title: z.string(),
      caption: z.string().optional(),
      config: z.record(z.string(), z.any()).default({}),
    }).optional(),
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

export const collections = { strands, topics, lessons, exercises, quizzes };
