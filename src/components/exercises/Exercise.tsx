/* ==========================================================================
   ONE QUESTION
   --------------------------------------------------------------------------
   The shell around every question type: the prompt, the widget, hints,
   Check / Try again, and the feedback panel with the worked explanation.

   Every question type plugs into this identically, which is why adding new
   questions is a matter of writing data rather than code.
   ========================================================================== */

import { useState, useCallback } from 'preact/hooks';
import { M, Feedback, Hints, type WidgetProps } from './kit';
import { WIDGETS } from './registry';
import { TYPE_LABEL, type PreparedQuestion, type Verdict } from '../../lib/types';
import { newSeed } from '../../lib/shuffle';
import { recordAnswer } from '../../lib/progress';

const DIFF_LABEL: Record<string, string> = {
  foundation: 'Foundation',
  core: 'Core',
  challenge: 'Challenge',
};

export interface ExerciseProps {
  q: PreparedQuestion;
  /** 1-based position, shown as "Question 3". Omit to hide the number. */
  index?: number;
  total?: number;
  /** Called every time the question is marked. */
  onGraded?: (v: Verdict, q: PreparedQuestion) => void;
  /** Save the result to the student's progress. Off inside quizzes, which
   *  record their own score once at the end. */
  record?: boolean;
  /** Hide the type / difficulty chips (quizzes keep the header tidy). */
  bare?: boolean;
}

export default function Exercise({ q, index, total, onGraded, record = true, bare = false }: ExerciseProps) {
  const mod = WIDGETS[q.type];

  const [attempt, setAttempt] = useState(0);
  const [seed, setSeed] = useState(() => newSeed());
  const [value, setValue] = useState(() => mod.init(q, seed));
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [hints, setHints] = useState(0);
  const [busy, setBusy] = useState(false);

  const uid = `q-${q.id}-${attempt}`;
  const locked = verdict !== null;

  const settle = useCallback((v: Verdict) => {
    setVerdict(v);
    // Flashcards carry no right answer, so they never touch the score.
    if (record && q.type !== 'flashcards') recordAnswer(v.correct);
    onGraded?.(v, q);
  }, [record, onGraded, q]);

  const check = useCallback(async () => {
    if (locked || busy) return;
    if (!mod.isAnswered(q, value)) return;
    setBusy(true);
    try {
      settle(await mod.grade(q, value));
    } finally {
      setBusy(false);
    }
  }, [locked, busy, mod, q, value, settle]);

  const retry = () => {
    const s = newSeed();
    setSeed(s);
    setValue(mod.init(q, s));
    setVerdict(null);
    setHints(0);
    setAttempt(attempt + 1);
  };

  const widgetProps: WidgetProps<any, any> = {
    q, value, setValue, locked, verdict, seed, uid,
    requestCheck: check,
    onSelfComplete: settle,
  };

  const canCheck = !locked && mod.isAnswered(q, value);

  return (
    <article class={`ex ${locked ? (verdict!.correct ? 'is-right' : 'is-wrong') : ''}`}
      aria-labelledby={`${uid}-prompt`}>

      {!bare ? (
        <header class="ex-head">
          {index ? (
            <span class="ex-num">
              Question {index}{total ? <span class="ex-of"> of {total}</span> : null}
            </span>
          ) : null}
          <span class="ex-chips">
            <span class="chip chip-neutral">{TYPE_LABEL[q.type]}</span>
            {q.difficulty !== 'core' ? (
              <span class={`chip ${q.difficulty === 'challenge' ? 'chip-red' : 'chip-info'}`}>
                {DIFF_LABEL[q.difficulty]}
              </span>
            ) : null}
            {q.needsReview ? <span class="chip chip-amber" title="Drafted — not yet checked by your tutor">Draft</span> : null}
          </span>
        </header>
      ) : null}

      <M html={q.promptHtml} as="div" id={`${uid}-prompt`} class="ex-prompt" />

      <div class="ex-body">
        {/* The widget is keyed on the attempt so a retry resets it completely. */}
        <mod.Widget key={`${q.id}-${attempt}`} {...widgetProps} />
      </div>

      {!locked ? (
        <Hints hints={q.hintsHtml} shown={hints} onMore={() => setHints(hints + 1)} />
      ) : null}

      {!mod.selfManaged ? (
        <div class="ex-actions">
          {!locked ? (
            <button type="button" class="btn btn-primary" disabled={!canCheck || busy} onClick={check}>
              {busy ? 'Checking…' : 'Check answer'}
            </button>
          ) : (
            <button type="button" class="btn btn-secondary" onClick={retry}>Try again</button>
          )}
        </div>
      ) : locked && !mod.ownFeedback ? (
        <div class="ex-actions">
          <button type="button" class="btn btn-secondary" onClick={retry}>Try again</button>
        </div>
      ) : null}

      <div aria-live="polite" class="ex-feedback">
        {verdict && !mod.ownFeedback ? (
          <Feedback verdict={verdict} explanationHtml={q.explanationHtml} />
        ) : null}
      </div>
    </article>
  );
}
