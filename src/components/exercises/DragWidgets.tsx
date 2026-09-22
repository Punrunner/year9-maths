/* ==========================================================================
   TYPES 7–8: Drag-and-drop matching · Drag-and-drop ordering
   --------------------------------------------------------------------------
   Both work three ways, so nobody is locked out:
     • mouse — drag and drop
     • touch — tap to pick up, tap to place
     • keyboard — the same buttons, plus arrow keys on the ordering list
   Every move is announced in a polite live region for screen readers.
   ========================================================================== */

import { useState, useRef } from 'preact/hooks';
import { M, IconTick, IconCross, type WidgetModule, type WidgetProps } from './kit';
import type { QMatch, QOrder } from '../../lib/types';
import { shuffle, shuffleDifferently } from '../../lib/shuffle';

/* ==========================================================================
   7. Match the pairs
   ========================================================================== */

type MatchValue = Record<string, string | null>;

/**
 * Is this right-hand item an acceptable partner for that left-hand item?
 * Items with identical text are interchangeable, so a question may list the
 * same label twice (e.g. "Primary" for two different examples).
 */
function pairOk(q: QMatch, leftId: string, rightId: string | null | undefined): boolean {
  if (!rightId) return false;
  const want = q.solution[leftId];
  if (rightId === want) return true;
  const text = (id: string | undefined) => q.right.find((r) => r.id === id)?.html.replace(/\s+/g, ' ').trim();
  return text(rightId) !== undefined && text(rightId) === text(want);
}

function MatchWidget({ q, value, setValue, locked, seed, uid }: WidgetProps<QMatch, MatchValue>) {
  const [held, setHeld] = useState<string | null>(null);
  const [announce, setAnnounce] = useState('');
  const rightById = new Map(q.right.map((r) => [r.id, r]));

  // The pool keeps a stable shuffled order so chips do not jump about.
  const poolOrder = useRef<string[] | null>(null);
  if (!poolOrder.current) poolOrder.current = shuffle(q.right, seed).map((r) => r.id);

  const placed = new Set(Object.values(value).filter(Boolean) as string[]);
  const pool = poolOrder.current.filter((id) => !placed.has(id));

  const assign = (leftId: string, rightId: string) => {
    const next: MatchValue = { ...value };
    // A right item can only sit in one slot.
    for (const k of Object.keys(next)) if (next[k] === rightId) next[k] = null;
    next[leftId] = rightId;
    setValue(next);
    setHeld(null);
    setAnnounce(`Placed in ${plain(q.left.find((l) => l.id === leftId)?.html ?? '')}.`);
  };

  const clear = (leftId: string) => {
    setValue({ ...value, [leftId]: null });
    setAnnounce('Returned to the pool.');
  };

  const onSlotActivate = (leftId: string) => {
    if (locked) return;
    if (held) { assign(leftId, held); return; }
    if (value[leftId]) clear(leftId);
  };

  return (
    <div class="match">
      <p class="choices-note">
        {held ? 'Now choose where it goes.' : 'Pick an answer, then choose the row it belongs to. You can also drag it.'}
      </p>

      {/* The pool of unplaced answers */}
      <div class="match-pool" role="group" aria-label="Answers to place"
        onDragOver={(e) => { if (!locked) e.preventDefault(); }}
        onDrop={(e) => {
          if (locked) return;
          e.preventDefault();
          const id = e.dataTransfer?.getData('text/plain');
          if (!id) return;
          const owner = Object.keys(value).find((k) => value[k] === id);
          if (owner) clear(owner);
        }}
      >
        {pool.length === 0 ? (
          <p class="match-pool-empty">All placed — check your answer.</p>
        ) : pool.map((id) => {
          const r = rightById.get(id)!;
          return (
            <button
              key={id}
              type="button"
              class={`chip-drag ${held === id ? 'is-held' : ''}`}
              draggable={!locked}
              disabled={locked}
              aria-pressed={held === id}
              onDragStart={(e) => { e.dataTransfer?.setData('text/plain', id); setHeld(id); }}
              onDragEnd={() => setHeld(null)}
              onClick={() => {
                const next = held === id ? null : id;
                setHeld(next);
                setAnnounce(next ? `Picked up ${plain(r.html)}. Now choose a row.` : 'Put down.');
              }}
            >
              <M html={r.html} />
            </button>
          );
        })}
      </div>

      {/* One row per prompt */}
      <ul class="match-rows">
        {q.left.map((l) => {
          const assigned = value[l.id];
          const r = assigned ? rightById.get(assigned) : null;
          const right = locked && pairOk(q, l.id, assigned);

          return (
            <li key={l.id} class="match-row">
              <div class="match-term"><M html={l.html} /></div>

              <button
                type="button"
                id={`${uid}-slot-${l.id}`}
                class={`match-slot ${r ? 'is-filled' : ''} ${locked ? (right ? 'is-right' : 'is-wrong') : ''} ${held ? 'is-target' : ''}`}
                disabled={locked && !r}
                aria-label={r ? `Answer placed here. Activate to remove.` : 'Empty. Activate to place the answer you picked up.'}
                onDragOver={(e) => { if (!locked) e.preventDefault(); }}
                onDrop={(e) => {
                  if (locked) return;
                  e.preventDefault();
                  const id = e.dataTransfer?.getData('text/plain');
                  if (id) assign(l.id, id);
                }}
                onClick={() => onSlotActivate(l.id)}
              >
                {r ? <M html={r.html} /> : <span class="match-placeholder">Drop here</span>}
                {locked ? (
                  <span class={`entry-mark-sm ${right ? 'opt-right' : 'opt-wrong'}`}>
                    {right ? <IconTick /> : <IconCross />}
                    <span class="sr-only">{right ? 'Correct' : 'Incorrect'}</span>
                  </span>
                ) : null}
              </button>

              {locked && !right ? (
                <p class="match-answer">
                  Correct answer: <M html={rightById.get(q.solution[l.id]!)?.html ?? ''} />
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>

      <p class="sr-only" aria-live="polite">{announce}</p>
    </div>
  );
}

/** Strip tags so a live-region message reads cleanly. */
const plain = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export const matchModule: WidgetModule<QMatch, MatchValue> = {
  init: (q) => Object.fromEntries(q.left.map((l) => [l.id, null])),
  isAnswered: (_q, v) => Object.values(v).some(Boolean),
  grade: (q, v) => {
    const total = q.left.length;
    const hits = q.left.filter((l) => pairOk(q, l.id, v[l.id])).length;
    const correct = hits === total;
    return {
      correct,
      score: total ? hits / total : 0,
      ...(correct ? {} : { detail: `${hits} of ${total} pairs correct` }),
    };
  },
  Widget: MatchWidget,
};

/* ==========================================================================
   8. Put the steps in order
   ========================================================================== */

function OrderWidget({ q, value, setValue, locked, uid }: WidgetProps<QOrder, string[]>) {
  const [announce, setAnnounce] = useState('');
  const dragFrom = useRef<number | null>(null);
  const byId = new Map(q.items.map((i) => [i.id, i]));

  const move = (from: number, to: number) => {
    if (locked || to < 0 || to >= value.length || from === to) return;
    const next = value.slice();
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved!);
    setValue(next);
    setAnnounce(`Moved to position ${to + 1} of ${next.length}.`);
  };

  return (
    <div class="order">
      <p class="choices-note">
        Put these in the right order. Drag them, or use the arrow buttons.
      </p>

      <ol class="order-list">
        {value.map((id, i) => {
          const item = byId.get(id);
          if (!item) return null;
          const right = locked && q.solution[i] === id;

          return (
            <li
              key={id}
              class={`order-item ${locked ? (right ? 'is-right' : 'is-wrong') : ''}`}
              draggable={!locked}
              onDragStart={(e) => { dragFrom.current = i; e.dataTransfer?.setData('text/plain', id); }}
              onDragOver={(e) => { if (!locked) e.preventDefault(); }}
              onDrop={(e) => {
                if (locked) return;
                e.preventDefault();
                if (dragFrom.current !== null) move(dragFrom.current, i);
                dragFrom.current = null;
              }}
            >
              <span class="order-num" aria-hidden="true">{i + 1}</span>

              <span class="order-grip" aria-hidden="true">
                <svg viewBox="0 0 12 16" width="12" height="16">
                  <circle cx="3" cy="3" r="1.3" fill="currentColor" />
                  <circle cx="9" cy="3" r="1.3" fill="currentColor" />
                  <circle cx="3" cy="8" r="1.3" fill="currentColor" />
                  <circle cx="9" cy="8" r="1.3" fill="currentColor" />
                  <circle cx="3" cy="13" r="1.3" fill="currentColor" />
                  <circle cx="9" cy="13" r="1.3" fill="currentColor" />
                </svg>
              </span>

              <M html={item.html} class="order-text" />

              {locked ? (
                <span class={`entry-mark-sm ${right ? 'opt-right' : 'opt-wrong'}`}>
                  {right ? <IconTick /> : <IconCross />}
                  <span class="sr-only">{right ? 'Right place' : 'Wrong place'}</span>
                </span>
              ) : (
                <span class="order-moves">
                  <button
                    type="button" class="order-move" id={`${uid}-up-${i}`}
                    disabled={i === 0}
                    aria-label={`Move step ${i + 1} up`}
                    onClick={() => move(i, i - 1)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp') { e.preventDefault(); move(i, i - 1); }
                      if (e.key === 'ArrowDown') { e.preventDefault(); move(i, i + 1); }
                    }}
                  >↑</button>
                  <button
                    type="button" class="order-move"
                    disabled={i === value.length - 1}
                    aria-label={`Move step ${i + 1} down`}
                    onClick={() => move(i, i + 1)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp') { e.preventDefault(); move(i, i - 1); }
                      if (e.key === 'ArrowDown') { e.preventDefault(); move(i, i + 1); }
                    }}
                  >↓</button>
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {locked ? (
        <div class="order-solution">
          <p class="order-solution-head">The correct order is:</p>
          <ol class="order-solution-list">
            {q.solution.map((id) => <li key={id}><M html={byId.get(id)?.html ?? ''} /></li>)}
          </ol>
        </div>
      ) : null}

      <p class="sr-only" aria-live="polite">{announce}</p>
    </div>
  );
}

export const orderModule: WidgetModule<QOrder, string[]> = {
  init: (q, seed) => shuffleDifferently(q.items.map((i) => i.id), seed),
  isAnswered: () => true,   // any arrangement counts as an attempt
  grade: (q, v) => {
    const hits = v.filter((id, i) => q.solution[i] === id).length;
    const correct = hits === q.solution.length;
    return {
      correct,
      score: q.solution.length ? hits / q.solution.length : 0,
      ...(correct ? {} : { detail: `${hits} of ${q.solution.length} in the right place` }),
    };
  },
  Widget: OrderWidget,
};
