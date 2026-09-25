/* ==========================================================================
   MATHS KEYS
   --------------------------------------------------------------------------
   A row of symbol keys (√, ², π, ≤ …) that appears at the bottom of the
   screen while an exam answer line or working box has focus. Pressing a key
   types the symbol at the cursor, like the symbol bar in Kahoot.

   Every symbol here is understood by the marker (src/lib/answer.ts), so
   typing "5√2" is the same as typing "5sqrt(2)".
   ========================================================================== */

import { useEffect, useState } from 'preact/hooks';

/** Inputs the keys work on. */
const TARGET = '.xp-line, .xp-working';

/** [label, text before the cursor, text after the cursor, accessible name] */
const KEYS: Array<[string, string, string, string]> = [
  ['√', '√(', ')', 'square root'],
  ['x²', '²', '', 'squared'],
  ['x³', '³', '', 'cubed'],
  ['xⁿ', '^', '', 'to the power'],
  ['( )', '(', ')', 'brackets'],
  ['a/b', '/', '', 'divide, fraction'],
  ['×', '×', '', 'times'],
  ['π', 'π', '', 'pi'],
  ['≤', '≤', '', 'less than or equal to'],
  ['≥', '≥', '', 'greater than or equal to'],
  ['<', '<', '', 'less than'],
  ['>', '>', '', 'greater than'],
];

type Field = HTMLInputElement | HTMLTextAreaElement;

function insert(el: Field, before: string, after: string) {
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? start;
  // Wrap anything selected: select "5/2", press √, get √(5/2).
  const picked = el.value.slice(start, end);
  el.setRangeText(before + picked + after, start, end, 'end');
  if (after && !picked) {
    const caret = start + before.length;
    el.setSelectionRange(caret, caret);
  }
  // Let Preact see the change, exactly as if it had been typed.
  el.dispatchEvent(new Event('input', { bubbles: true }));
}

export default function MathKeys() {
  const [field, setField] = useState<Field | null>(null);

  useEffect(() => {
    const onIn = (e: FocusEvent) => {
      const t = e.target as Element | null;
      if (t?.matches?.(TARGET)) setField(t as Field);
    };
    const onOut = (e: FocusEvent) => {
      const next = e.relatedTarget as Element | null;
      if (!next?.matches?.(TARGET)) setField(null);
    };
    document.addEventListener('focusin', onIn);
    document.addEventListener('focusout', onOut);
    return () => {
      document.removeEventListener('focusin', onIn);
      document.removeEventListener('focusout', onOut);
    };
  }, []);

  if (!field) return null;

  return (
    <div class="math-keys no-print" role="toolbar" aria-label="Maths symbols">
      {KEYS.map(([label, before, after, name]) => (
        <button
          key={label}
          type="button"
          class="math-key"
          aria-label={name}
          // Keep focus (and the phone keyboard) in the answer box.
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => insert(field, before, after)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
