/* ==========================================================================
   TYPES 1–3: Multiple choice · Multiple select · True/False
   ========================================================================== */

import { useMemo } from 'preact/hooks';
import { M, IconTick, IconCross, type WidgetModule, type WidgetProps, verdictOf } from './kit';
import type { QMcq, QMulti, QTrueFalse, PreparedOption } from '../../lib/types';
import { shuffle } from '../../lib/shuffle';

/** Marks shown on each option once the answer has been checked. */
function Mark({ state }: { state: 'right' | 'wrong' | 'missed' | null }) {
  if (!state) return null;
  if (state === 'right') return <span class="opt-mark opt-right"><IconTick /><span class="sr-only">Correct</span></span>;
  if (state === 'wrong') return <span class="opt-mark opt-wrong"><IconCross /><span class="sr-only">Incorrect</span></span>;
  return <span class="opt-mark opt-missed"><IconTick /><span class="sr-only">This was also correct</span></span>;
}

const letter = (i: number) => String.fromCharCode(65 + i);

/* ==========================================================================
   1. Multiple choice — one answer
   ========================================================================== */

function McqWidget({ q, value, setValue, locked, seed, uid, requestCheck }: WidgetProps<QMcq, string | null>) {
  const options = useMemo<PreparedOption[]>(
    () => (q.shuffleOptions ? shuffle(q.options, seed) : q.options.slice()),
    [q, seed],
  );

  return (
    <div role="radiogroup" aria-label="Answer options" class="choices">
      {options.map((o, i) => {
        const chosen = value === o.id;
        const state = !locked ? null
          : o.id === q.answer ? 'right'
          : chosen ? 'wrong' : null;

        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={chosen}
            disabled={locked}
            class={`opt ${chosen ? 'is-chosen' : ''} ${state ? `is-${state}` : ''}`}
            id={`${uid}-${o.id}`}
            onClick={() => {
              if (locked) return;
              setValue(o.id);
            }}
            onDblClick={() => { if (!locked && requestCheck) requestCheck(); }}
          >
            <span class="opt-key" aria-hidden="true">{letter(i)}</span>
            <M html={o.html} class="opt-text" />
            <Mark state={state as any} />
          </button>
        );
      })}
    </div>
  );
}

export const mcqModule: WidgetModule<QMcq, string | null> = {
  init: () => null,
  isAnswered: (_q, v) => v !== null,
  grade: (q, v) => verdictOf(v === q.answer),
  Widget: McqWidget,
};

/* ==========================================================================
   2. Multiple select — choose all that apply, with partial credit
   ========================================================================== */

function MultiWidget({ q, value, setValue, locked, seed, uid }: WidgetProps<QMulti, string[]>) {
  const options = useMemo<PreparedOption[]>(
    () => (q.shuffleOptions ? shuffle(q.options, seed) : q.options.slice()),
    [q, seed],
  );
  const chosenSet = new Set(value);
  const answerSet = new Set(q.answers);

  return (
    <>
      <p class="choices-note">Select every correct answer — there may be more than one.</p>
      <div role="group" aria-label="Answer options" class="choices">
        {options.map((o) => {
          const chosen = chosenSet.has(o.id);
          const isRight = answerSet.has(o.id);
          const state = !locked ? null
            : chosen && isRight ? 'right'
            : chosen && !isRight ? 'wrong'
            : !chosen && isRight ? 'missed' : null;

          return (
            <label
              key={o.id}
              class={`opt opt-check ${chosen ? 'is-chosen' : ''} ${state ? `is-${state}` : ''} ${locked ? 'is-locked' : ''}`}
              for={`${uid}-${o.id}`}
            >
              <input
                type="checkbox"
                id={`${uid}-${o.id}`}
                checked={chosen}
                disabled={locked}
                onChange={() => {
                  const next = new Set(value);
                  if (next.has(o.id)) next.delete(o.id); else next.add(o.id);
                  setValue([...next]);
                }}
              />
              <span class="opt-box" aria-hidden="true"><IconTick /></span>
              <M html={o.html} class="opt-text" />
              <Mark state={state as any} />
            </label>
          );
        })}
      </div>
    </>
  );
}

export const multiModule: WidgetModule<QMulti, string[]> = {
  init: () => [],
  isAnswered: (_q, v) => v.length > 0,
  grade: (q, v) => {
    const answers = new Set(q.answers);
    const chosen = new Set(v);
    const hits = [...chosen].filter((id) => answers.has(id)).length;
    const wrong = [...chosen].filter((id) => !answers.has(id)).length;
    // Each wrong tick cancels out a right one, floored at zero.
    const score = Math.max(0, (hits - wrong) / answers.size);
    const correct = hits === answers.size && wrong === 0;
    const detail = correct
      ? undefined
      : `${hits} of ${answers.size} correct${wrong ? `, ${wrong} wrong` : ''}`;
    return { correct, score, ...(detail ? { detail } : {}) };
  },
  Widget: MultiWidget,
};

/* ==========================================================================
   3. True / False
   ========================================================================== */

function TrueFalseWidget({ q, value, setValue, locked }: WidgetProps<QTrueFalse, boolean | null>) {
  const choices: Array<{ v: boolean; label: string }> = [
    { v: true, label: q.labels[0] },
    { v: false, label: q.labels[1] },
  ];

  return (
    <div role="radiogroup" aria-label="True or false" class="choices choices-row">
      {choices.map((c) => {
        const chosen = value === c.v;
        const state = !locked ? null
          : c.v === q.answer ? 'right'
          : chosen ? 'wrong' : null;
        return (
          <button
            key={String(c.v)}
            type="button"
            role="radio"
            aria-checked={chosen}
            disabled={locked}
            class={`opt opt-tf ${chosen ? 'is-chosen' : ''} ${state ? `is-${state}` : ''}`}
            onClick={() => !locked && setValue(c.v)}
          >
            <span class="opt-text">{c.label}</span>
            <Mark state={state as any} />
          </button>
        );
      })}
    </div>
  );
}

export const trueFalseModule: WidgetModule<QTrueFalse, boolean | null> = {
  init: () => null,
  isAnswered: (_q, v) => v !== null,
  grade: (q, v) => verdictOf(v === q.answer),
  Widget: TrueFalseWidget,
};
