/* ==========================================================================
   TYPES 9–10: Complete the table · Step-by-step guided solver
   ========================================================================== */

import { useState } from 'preact/hooks';
import { M, IconTick, IconCross, IconBulb, type WidgetModule, type WidgetProps } from './kit';
import type { QTable, QSteps, PreparedStep } from '../../lib/types';
import { checkTyped, checkAlgebraic } from '../../lib/answer';

/* ==========================================================================
   9. Complete the table
   ========================================================================== */

type TableValue = Record<string, string>;
const cellKey = (r: number, c: number) => `${r}:${c}`;

function TableWidget({ q, value, setValue, locked, uid }: WidgetProps<QTable, TableValue>) {
  return (
    <div class="table-wrap">
      <table class="q-table">
        <thead>
          <tr>{q.columnsHtml.map((c, i) => <th key={i} scope="col"><M html={c} /></th>)}</tr>
        </thead>
        <tbody>
          {q.rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => {
                const Tag = (q.rowHeader && c === 0 ? 'th' : 'td') as 'th' | 'td';
                const scope = q.rowHeader && c === 0 ? 'row' : undefined;

                if (cell.kind === 'given') {
                  return <Tag key={c} scope={scope}><M html={cell.html} /></Tag>;
                }

                const key = cellKey(r, c);
                const typed = value[key] ?? '';
                const right = locked && checkTyped(typed, [cell.answer, ...cell.accept], cell.tolerance);

                return (
                  <Tag key={c} scope={scope} class="q-table-input">
                    <label class="sr-only" for={`${uid}-${key}`}>
                      Row {r + 1}, {q.columnsHtml[c]?.replace(/<[^>]*>/g, '') ?? `column ${c + 1}`}
                    </label>
                    <input
                      id={`${uid}-${key}`}
                      class={`entry entry-cell ${locked ? (right ? 'is-right' : 'is-wrong') : ''}`}
                      type="text"
                      inputMode={/[\/a-zA-Z]/.test(cell.answer) ? 'text' : 'decimal'}
                      autocomplete="off"
                      autocapitalize="off"
                      spellcheck={false}
                      disabled={locked}
                      value={typed}
                      onInput={(e) => setValue({ ...value, [key]: (e.target as HTMLInputElement).value })}
                    />
                    {locked ? (
                      <span class={`entry-mark-sm ${right ? 'opt-right' : 'opt-wrong'}`}>
                        {right ? <IconTick /> : <IconCross />}
                        <span class="sr-only">
                          {right ? 'Correct' : `Incorrect — the answer was ${cell.answer}`}
                        </span>
                      </span>
                    ) : null}
                    {locked && !right ? <span class="cell-answer">{cell.answer}</span> : null}
                  </Tag>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const tableModule: WidgetModule<QTable, TableValue> = {
  init: () => ({}),
  isAnswered: (_q, v) => Object.values(v).some((s) => s.trim().length > 0),
  grade: (q, v) => {
    let total = 0;
    let hits = 0;
    q.rows.forEach((row, r) => row.forEach((cell, c) => {
      if (cell.kind !== 'input') return;
      total++;
      if (checkTyped(v[cellKey(r, c)] ?? '', [cell.answer, ...cell.accept], cell.tolerance)) hits++;
    }));
    const correct = hits === total;
    return {
      correct,
      score: total ? hits / total : 0,
      ...(correct ? {} : { detail: `${hits} of ${total} cells correct` }),
    };
  },
  Widget: TableWidget,
};

/* ==========================================================================
   10. Step-by-step guided solver
   --------------------------------------------------------------------------
   Each step must be right before the next one appears. Getting a step wrong
   costs nothing but a retry — the point is to walk the method.
   ========================================================================== */

interface StepsValue {
  /** What the student has typed/chosen for each step. */
  entries: Record<number, string>;
  /** Steps solved so far, in order. */
  solved: number;
  /** Which steps were answered wrongly at least once. */
  slipped: number[];
  /** Per-step "that is not right yet" flag, cleared on edit. */
  wrongNow: Record<number, boolean>;
  /** Steps whose hint is showing. */
  hinted: number[];
  done: boolean;
}

async function checkStep(step: PreparedStep, typed: string): Promise<boolean> {
  if (!typed.trim()) return false;
  if (step.kind === 'mcq') return typed === step.answer;
  if (step.kind === 'algebraic') return checkAlgebraic(typed, step.answer, step.variables, false);
  return checkTyped(typed, [step.answer, ...step.accept], step.tolerance);
}

function StepsWidget({ q, value, setValue, uid, onSelfComplete }: WidgetProps<QSteps, StepsValue>) {
  const [busy, setBusy] = useState(false);
  const visible = Math.min(value.solved + 1, q.steps.length);

  const submit = async (i: number) => {
    const step = q.steps[i]!;
    const typed = value.entries[i] ?? '';
    setBusy(true);
    const ok = await checkStep(step, typed);
    setBusy(false);

    if (ok) {
      const solved = i + 1;
      const done = solved === q.steps.length;
      setValue({ ...value, solved, done, wrongNow: { ...value.wrongNow, [i]: false } });
      if (done && onSelfComplete) {
        const clean = q.steps.length - value.slipped.length;
        onSelfComplete({
          correct: value.slipped.length === 0,
          score: q.steps.length ? clean / q.steps.length : 1,
          detail: value.slipped.length === 0
            ? 'Every step first time'
            : `${clean} of ${q.steps.length} steps first time`,
        });
      }
    } else {
      setValue({
        ...value,
        wrongNow: { ...value.wrongNow, [i]: true },
        slipped: value.slipped.includes(i) ? value.slipped : [...value.slipped, i],
      });
    }
  };

  const setEntry = (i: number, v: string) =>
    setValue({ ...value, entries: { ...value.entries, [i]: v }, wrongNow: { ...value.wrongNow, [i]: false } });

  return (
    <div class="steps">
      {q.scenarioHtml ? <div class="steps-scenario"><M html={q.scenarioHtml} as="div" /></div> : null}

      <ol class="steps-list">
        {q.steps.slice(0, visible).map((step, i) => {
          const solved = i < value.solved;
          const wrong = value.wrongNow[i];
          const typed = value.entries[i] ?? '';
          const hinted = value.hinted.includes(i);

          return (
            <li key={i} class={`step ${solved ? 'is-solved' : ''} ${wrong ? 'is-wrong' : ''}`}>
              <div class="step-head">
                <span class="step-num" aria-hidden="true">{solved ? <IconTick /> : i + 1}</span>
                <M html={step.promptHtml} class="step-prompt" />
              </div>

              <div class="step-body">
                {step.kind === 'mcq' ? (
                  <div role="radiogroup" aria-label={`Step ${i + 1} options`} class="choices choices-tight">
                    {step.options.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        role="radio"
                        aria-checked={typed === o.id}
                        disabled={solved}
                        class={`opt opt-sm ${typed === o.id ? 'is-chosen' : ''} ${solved && o.id === step.answer ? 'is-right' : ''}`}
                        onClick={() => setEntry(i, o.id)}
                      >
                        <M html={o.html} class="opt-text" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div class="entry-row">
                    <label class="sr-only" for={`${uid}-s${i}`}>Step {i + 1} answer</label>
                    <input
                      id={`${uid}-s${i}`}
                      class={`entry ${step.kind === 'algebraic' ? 'entry-mono' : ''} ${solved ? 'is-right' : wrong ? 'is-wrong' : ''}`}
                      type="text"
                      inputMode={step.kind === 'algebraic' ? 'text' : 'decimal'}
                      autocomplete="off"
                      autocapitalize="off"
                      spellcheck={false}
                      disabled={solved}
                      value={typed}
                      onInput={(e) => setEntry(i, (e.target as HTMLInputElement).value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(i); } }}
                    />
                    {step.kind === 'numeric' && step.unitHtml ? <M html={step.unitHtml} class="entry-unit" /> : null}
                  </div>
                )}

                {!solved ? (
                  <div class="step-actions">
                    <button type="button" class="btn btn-primary btn-sm" disabled={busy || !typed}
                      onClick={() => submit(i)}>
                      {busy ? 'Checking…' : 'Check step'}
                    </button>
                    {step.hintHtml && !hinted ? (
                      <button type="button" class="btn btn-ghost btn-sm"
                        onClick={() => setValue({ ...value, hinted: [...value.hinted, i] })}>
                        <IconBulb /> Hint
                      </button>
                    ) : null}
                  </div>
                ) : null}

                {hinted && step.hintHtml && !solved ? (
                  <p class="hint"><span class="hint-icon" aria-hidden="true"><IconBulb /></span>
                    <M html={step.hintHtml} /></p>
                ) : null}

                <p class="sr-only" aria-live="polite">
                  {solved ? `Step ${i + 1} correct.` : wrong ? `Step ${i + 1} is not right yet. Try again.` : ''}
                </p>

                {wrong ? (
                  <p class="step-msg step-msg-wrong">
                    <IconCross /> Not quite — have another go at this step.
                  </p>
                ) : null}

                {solved && step.feedbackHtml ? (
                  <div class="step-msg step-msg-ok">
                    <IconTick /><M html={step.feedbackHtml} as="span" />
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export const stepsModule: WidgetModule<QSteps, StepsValue> = {
  init: () => ({ entries: {}, solved: 0, slipped: [], wrongNow: {}, hinted: [], done: false }),
  isAnswered: (_q, v) => v.done,
  grade: (q, v) => {
    const clean = q.steps.length - v.slipped.length;
    return {
      correct: v.done && v.slipped.length === 0,
      score: q.steps.length ? (v.done ? clean / q.steps.length : v.solved / q.steps.length) : 0,
      detail: `${v.solved} of ${q.steps.length} steps solved`,
    };
  },
  Widget: StepsWidget,
  selfManaged: true,
};
