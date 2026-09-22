/* ==========================================================================
   TYPES 4–6: Numeric entry · Fill in the blank · Short algebraic input
   ========================================================================== */

import { useRef } from 'preact/hooks';
import { M, IconTick, IconCross, type WidgetModule, type WidgetProps, verdictOf } from './kit';
import type { QNumeric, QFillBlank, QAlgebraic } from '../../lib/types';
import { checkTyped, checkAlgebraic } from '../../lib/answer';

/** Show a decimal keypad on phones only when a fraction could not be the answer. */
function keypadFor(values: Array<string | number>): 'decimal' | 'text' {
  return values.some((v) => /[\/a-zA-Z]/.test(String(v))) ? 'text' : 'decimal';
}

function StateIcon({ locked, correct }: { locked: boolean; correct: boolean }) {
  if (!locked) return null;
  return (
    <span class={`entry-mark ${correct ? 'opt-right' : 'opt-wrong'}`}>
      {correct ? <IconTick /> : <IconCross />}
      <span class="sr-only">{correct ? 'Correct' : 'Incorrect'}</span>
    </span>
  );
}

/* ==========================================================================
   4. Numeric entry
   ========================================================================== */

function NumericWidget({ q, value, setValue, locked, verdict, uid, requestCheck }: WidgetProps<QNumeric, string>) {
  const mode = keypadFor([q.answer, ...q.accept]);
  return (
    <div class="entry-row">
      <label class="sr-only" for={`${uid}-in`}>Your answer</label>
      <input
        id={`${uid}-in`}
        class={`entry ${locked ? (verdict?.correct ? 'is-right' : 'is-wrong') : ''}`}
        type="text"
        inputMode={mode}
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck={false}
        disabled={locked}
        value={value}
        placeholder={q.placeholder ?? 'Answer'}
        aria-describedby={q.unitHtml ? `${uid}-unit` : undefined}
        onInput={(e) => setValue((e.target as HTMLInputElement).value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && requestCheck) { e.preventDefault(); requestCheck(); } }}
      />
      {q.unitHtml ? <M html={q.unitHtml} id={`${uid}-unit`} class="entry-unit" /> : null}
      <StateIcon locked={locked} correct={Boolean(verdict?.correct)} />
    </div>
  );
}

export const numericModule: WidgetModule<QNumeric, string> = {
  init: () => '',
  isAnswered: (_q, v) => v.trim().length > 0,
  grade: (q, v) => {
    const ok = checkTyped(v, [q.answer, ...q.accept], q.tolerance);
    return verdictOf(ok, ok ? undefined : `The answer was ${q.answer}`);
  },
  Widget: NumericWidget,
};

/* ==========================================================================
   5. Fill in the blank
   ========================================================================== */

/**
 * Mark every gap. Gaps that share a `group` (e.g. the two roots of a quadratic)
 * may be typed in either order: each typed value is paired with the first
 * still-unused gap in its group that accepts it.
 */
function markBlanks(q: QFillBlank, v: Record<string, string>): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  const used = new Set<string>();
  for (const b of q.blanks) {
    const typed = v[b.id] ?? '';
    if (!b.group) { out[b.id] = checkTyped(typed, b.accept, b.tolerance); continue; }
    const partner = q.blanks.find((o) => o.group === b.group && !used.has(o.id) && checkTyped(typed, o.accept, o.tolerance));
    if (partner) used.add(partner.id);
    out[b.id] = !!partner;
  }
  return out;
}

function FillBlankWidget({ q, value, setValue, locked, uid, requestCheck }: WidgetProps<QFillBlank, Record<string, string>>) {
  const blankById = new Map(q.blanks.map((b) => [b.id, b]));
  const marks = locked ? markBlanks(q, value) : {};

  return (
    <p class="fill-line">
      {q.segments.map((seg, i) => {
        if (seg.kind === 'html') return <M key={i} html={seg.html} />;

        const blank = blankById.get(seg.id);
        if (!blank) return <span key={i} class="fill-missing">[[{seg.id}]]</span>;

        const typed = value[seg.id] ?? '';
        const right = locked && !!marks[seg.id];

        return (
          <span class="fill-wrap" key={i}>
            <label class="sr-only" for={`${uid}-${seg.id}`}>Gap {seg.id}</label>
            <input
              id={`${uid}-${seg.id}`}
              class={`entry entry-inline ${locked ? (right ? 'is-right' : 'is-wrong') : ''}`}
              type="text"
              inputMode={keypadFor(blank.accept)}
              autocomplete="off"
              autocapitalize="off"
              spellcheck={false}
              size={blank.size}
              style={{ width: `${Math.max(3, blank.size)}ch` }}
              disabled={locked}
              value={typed}
              onInput={(e) => setValue({ ...value, [seg.id]: (e.target as HTMLInputElement).value })}
              onKeyDown={(e) => { if (e.key === 'Enter' && requestCheck) { e.preventDefault(); requestCheck(); } }}
            />
            {locked ? (
              <span class={`entry-mark-sm ${right ? 'opt-right' : 'opt-wrong'}`}>
                {right ? <IconTick /> : <IconCross />}
                <span class="sr-only">{right ? 'Correct' : `Incorrect — expected ${blank.accept[0]}`}</span>
              </span>
            ) : null}
          </span>
        );
      })}
    </p>
  );
}

export const fillBlankModule: WidgetModule<QFillBlank, Record<string, string>> = {
  init: () => ({}),
  isAnswered: (q, v) => q.blanks.some((b) => (v[b.id] ?? '').trim().length > 0),
  grade: (q, v) => {
    const marks = markBlanks(q, v);
    const hits = q.blanks.filter((b) => marks[b.id]).length;
    const correct = hits === q.blanks.length;
    return {
      correct,
      score: q.blanks.length ? hits / q.blanks.length : 0,
      ...(correct ? {} : { detail: `${hits} of ${q.blanks.length} gaps correct` }),
    };
  },
  Widget: FillBlankWidget,
};

/* ==========================================================================
   6. Short algebraic input
   ========================================================================== */

/** A few symbols that are awkward to type on a phone. */
const PALETTE = [
  { insert: '^', label: 'power', show: 'xʸ' },
  { insert: '/', label: 'divide', show: '÷' },
  { insert: '*', label: 'multiply', show: '×' },
  { insert: '(', label: 'open bracket', show: '(' },
  { insert: ')', label: 'close bracket', show: ')' },
  { insert: 'sqrt(', label: 'square root', show: '√' },
  { insert: 'pi', label: 'pi', show: 'π' },
];

function AlgebraicWidget({ q, value, setValue, locked, verdict, uid, requestCheck }: WidgetProps<QAlgebraic, string>) {
  const ref = useRef<HTMLInputElement>(null);

  const insert = (text: string) => {
    const el = ref.current;
    if (!el) { setValue(value + text); return; }
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    const next = value.slice(0, start) + text + value.slice(end);
    setValue(next);
    // Put the caret after what we inserted.
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + text.length;
      el.setSelectionRange(pos, pos);
    });
  };

  return (
    <div class="algebra">
      <div class="entry-row">
        <label class="sr-only" for={`${uid}-in`}>Your expression</label>
        <input
          ref={ref}
          id={`${uid}-in`}
          class={`entry entry-mono ${locked ? (verdict?.correct ? 'is-right' : 'is-wrong') : ''}`}
          type="text"
          inputMode="text"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck={false}
          disabled={locked}
          value={value}
          placeholder={q.placeholder ?? 'e.g. 3x + 12'}
          aria-describedby={`${uid}-help`}
          onInput={(e) => setValue((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && requestCheck) { e.preventDefault(); requestCheck(); } }}
        />
        <StateIcon locked={locked} correct={Boolean(verdict?.correct)} />
      </div>

      {!locked ? (
        <div class="palette" role="group" aria-label="Insert a symbol">
          {PALETTE.map((p) => (
            <button
              key={p.insert}
              type="button"
              class="palette-key"
              aria-label={`Insert ${p.label}`}
              onClick={() => insert(p.insert)}
            >
              {p.show}
            </button>
          ))}
        </div>
      ) : null}

      <p id={`${uid}-help`} class="entry-help">
        Type powers with <code>^</code> (so <code>n^2</code> is n squared). Any equivalent
        form is accepted{q.requireForm ? ', but keep it in the form the question asks for' : ''}.
      </p>
    </div>
  );
}

export const algebraicModule: WidgetModule<QAlgebraic, string> = {
  init: () => '',
  isAnswered: (_q, v) => v.trim().length > 0,
  grade: async (q, v) => {
    const ok = await checkAlgebraic(v, q.answer, q.variables, q.requireForm);
    return verdictOf(ok, ok ? undefined : `The answer was ${q.answer}`);
  },
  Widget: AlgebraicWidget,
};
