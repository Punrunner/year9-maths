/* ==========================================================================
   EXERCISE KIT
   --------------------------------------------------------------------------
   The small shared pieces every question type uses: the contract a widget
   must satisfy, the pre-rendered-HTML helper, icons, and the feedback panel.
   ========================================================================== */

import type { ComponentChildren, FunctionComponent, JSX } from 'preact';
import type { PreparedQuestion, Verdict } from '../../lib/types';

/* --------------------------------------------------------------------------
   Rendering pre-built HTML
   -------------------------------------------------------------------------- */

/**
 * Renders HTML that was produced at build time by src/lib/render.ts.
 * This is never student input, so it is safe to insert directly — and it is
 * how we get KaTeX maths without shipping KaTeX to the browser.
 */
export function M(props: {
  html: string;
  as?: keyof JSX.IntrinsicElements;
  class?: string;
  [key: string]: unknown;
}) {
  const { html, as = 'span', ...rest } = props;
  const Tag = as as any;
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
}

/* --------------------------------------------------------------------------
   The widget contract
   -------------------------------------------------------------------------- */

export interface WidgetProps<Q = PreparedQuestion, V = unknown> {
  q: Q;
  /** The student's current answer, in whatever shape the widget chose. */
  value: V;
  setValue: (v: V) => void;
  /** True once the answer has been checked — inputs go read-only. */
  locked: boolean;
  verdict: Verdict | null;
  /** Stable per attempt, so option order does not jump about on re-render. */
  seed: number;
  /** Ask the shell to check immediately (used by click-once widgets). */
  requestCheck?: () => void;
  /** Self-managed widgets report their own result when they finish. */
  onSelfComplete?: (v: Verdict) => void;
  /** Unique prefix for input ids, so several questions can share a page. */
  uid: string;
}

export interface WidgetModule<Q = any, V = any> {
  /** Build the empty answer for a fresh attempt. */
  init: (q: Q, seed: number) => V;
  /** Has the student entered enough for "Check" to be meaningful? */
  isAnswered: (q: Q, v: V) => boolean;
  /** Mark it. May be async (algebra loads math.js on demand). */
  grade: (q: Q, v: V) => Verdict | Promise<Verdict>;
  Widget: FunctionComponent<WidgetProps<Q, V>>;
  /**
   * True for widgets that run their own loop and do their own marking
   * (flashcards, quick-fire drills). The shell then hides Check / Try again.
   */
  selfManaged?: boolean;
  /** Hide the normal explanation panel (the widget shows its own). */
  ownFeedback?: boolean;
}

/* --------------------------------------------------------------------------
   Icons — feedback is never colour alone; there is always an icon and a word.
   -------------------------------------------------------------------------- */

export const IconTick = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
    <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.4"
      stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

export const IconCross = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
    <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" stroke-width="2.4"
      stroke-linecap="round" />
  </svg>
);

export const IconHalf = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
    <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="2.2" />
    <path d="M10 3a7 7 0 010 14z" fill="currentColor" />
  </svg>
);

export const IconBulb = () => (
  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false">
    <path d="M10 2.5a5 5 0 00-3 9v1.5h6V11.5a5 5 0 00-3-9z" fill="none"
      stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
    <path d="M8 16h4M8.5 18h3" fill="none" stroke="currentColor" stroke-width="1.6"
      stroke-linecap="round" />
  </svg>
);

/* --------------------------------------------------------------------------
   Feedback panel
   -------------------------------------------------------------------------- */

export function Feedback({ verdict, explanationHtml }: {
  verdict: Verdict;
  explanationHtml?: string;
}) {
  const partial = !verdict.correct && verdict.score > 0;
  const tone = verdict.correct ? 'ok' : partial ? 'part' : 'bad';
  const label = verdict.correct ? 'Correct' : partial ? 'Almost' : 'Incorrect';

  return (
    <div class={`fb fb-${tone}`}>
      <p class="fb-head">
        <span class="fb-icon" aria-hidden="true">
          {verdict.correct ? <IconTick /> : partial ? <IconHalf /> : <IconCross />}
        </span>
        <strong>{label}</strong>
        {verdict.detail ? <span class="fb-detail">{verdict.detail}</span> : null}
      </p>
      {explanationHtml ? (
        <div class="fb-body">
          <M html={explanationHtml} as="div" class="prose-sm" />
        </div>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Progressive hints
   -------------------------------------------------------------------------- */

export function Hints({ hints, shown, onMore }: {
  hints: string[];
  shown: number;
  onMore: () => void;
}) {
  if (!hints.length) return null;
  return (
    <div class="hints">
      {hints.slice(0, shown).map((h, i) => (
        <p class="hint" key={i}>
          <span class="hint-icon" aria-hidden="true"><IconBulb /></span>
          <span class="sr-only">Hint {i + 1}: </span>
          <M html={h} />
        </p>
      ))}
      {shown < hints.length ? (
        <button type="button" class="btn btn-ghost btn-sm hint-btn" onClick={onMore}>
          <IconBulb />
          {shown === 0 ? 'Need a hint?' : 'Another hint'}
          <span class="sr-only"> ({hints.length - shown} remaining)</span>
        </button>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Small shared helpers
   -------------------------------------------------------------------------- */

/** Wrap a group of radio-style buttons with the right ARIA roles. */
export function Choices({ label, children, multi = false }: {
  label: string;
  children: ComponentChildren;
  multi?: boolean;
}) {
  return (
    <div role={multi ? 'group' : 'radiogroup'} aria-label={label} class="choices">
      {children}
    </div>
  );
}

export const verdictOf = (correct: boolean, detail?: string): Verdict =>
  ({ correct, score: correct ? 1 : 0, ...(detail ? { detail } : {}) });
