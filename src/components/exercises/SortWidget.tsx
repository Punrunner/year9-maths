/* ==========================================================================
   TYPE 15: Sort into groups
   --------------------------------------------------------------------------
   Cards start in a pool; the student puts each one into a labelled bin
   ("Rational" / "Irrational", "Like terms" / "Not like terms", …).
   Same three ways of working as matching:
     • mouse — drag and drop
     • touch — tap a card, then tap a bin
     • keyboard — the same buttons; Enter or Space to pick up and to place
   ========================================================================== */

import { useState, useRef } from 'preact/hooks';
import { M, IconTick, IconCross, type WidgetModule, type WidgetProps } from './kit';
import type { QSort } from '../../lib/types';
import { shuffle } from '../../lib/shuffle';

/** itemId → groupId (or null while still in the pool). */
type SortValue = Record<string, string | null>;

const plain = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

function SortWidget({ q, value, setValue, locked, seed }: WidgetProps<QSort, SortValue>) {
  const [held, setHeld] = useState<string | null>(null);
  const [announce, setAnnounce] = useState('');

  const order = useRef<string[] | null>(null);
  if (!order.current) order.current = shuffle(q.items, seed).map((i) => i.id);
  const itemById = new Map(q.items.map((i) => [i.id, i]));
  const groupName = (id: string) => plain(q.groups.find((g) => g.id === id)?.html ?? '');

  const place = (itemId: string, groupId: string | null) => {
    setValue({ ...value, [itemId]: groupId });
    setHeld(null);
    setAnnounce(groupId ? `Placed in ${groupName(groupId)}.` : 'Returned to the cards.');
  };

  const card = (id: string) => {
    const item = itemById.get(id)!;
    const where = value[id];
    const right = locked && where === q.solution[id];
    return (
      <button
        key={id}
        type="button"
        class={`chip-drag sort-card ${held === id ? 'is-held' : ''} ${locked ? (right ? 'is-right' : 'is-wrong') : ''}`}
        draggable={!locked}
        disabled={locked}
        aria-pressed={held === id}
        onDragStart={(e) => { e.dataTransfer?.setData('text/plain', id); setHeld(id); }}
        onDragEnd={() => setHeld(null)}
        onClick={() => {
          const next = held === id ? null : id;
          setHeld(next);
          setAnnounce(next ? `Picked up ${plain(item.html)}. Now choose a group.` : 'Put down.');
        }}
      >
        <M html={item.html} />
        {locked ? (
          <span class={`entry-mark-sm ${right ? 'opt-right' : 'opt-wrong'}`}>
            {right ? <IconTick /> : <IconCross />}
            <span class="sr-only">{right ? 'Correct' : `Incorrect — belongs in ${groupName(q.solution[id]!)}`}</span>
          </span>
        ) : null}
      </button>
    );
  };

  const drop = (groupId: string | null) => (e: DragEvent) => {
    if (locked) return;
    e.preventDefault();
    const id = e.dataTransfer?.getData('text/plain');
    if (id) place(id, groupId);
  };

  const pool = order.current.filter((id) => !value[id]);

  return (
    <div class="sort">
      <p class="choices-note">
        {held ? 'Now choose the group it belongs in.' : 'Tap a card, then tap the group it belongs in. You can also drag.'}
      </p>

      <div class="match-pool" role="group" aria-label="Cards to sort"
        onDragOver={(e) => { if (!locked) e.preventDefault(); }} onDrop={drop(null)}>
        {pool.length ? pool.map(card) : <p class="match-pool-empty">All sorted — check your answer.</p>}
      </div>

      <div class="sort-groups" style={{ '--sort-cols': String(Math.min(q.groups.length, 3)) }}>
        {q.groups.map((g) => (
          <div key={g.id} class={`sort-group ${held ? 'is-target' : ''}`}
            onDragOver={(e) => { if (!locked) e.preventDefault(); }} onDrop={drop(g.id)}>
            <button type="button" class="sort-group-head" disabled={locked || !held}
              aria-label={`Put the card you picked up in ${plain(g.html)}`}
              onClick={() => held && place(held, g.id)}>
              <M html={g.html} />
            </button>
            <div class="sort-group-body">
              {order.current!.filter((id) => value[id] === g.id).map(card)}
            </div>
          </div>
        ))}
      </div>

      {locked ? (
        <div class="sort-solution">
          {q.groups.map((g) => (
            <p key={g.id}><strong><M html={g.html} />:</strong>{' '}
              {q.items.filter((i) => q.solution[i.id] === g.id).map((i, k) => (
                <span key={i.id}>{k ? ', ' : ''}<M html={i.html} /></span>
              ))}
            </p>
          ))}
        </div>
      ) : null}

      <p class="sr-only" aria-live="polite">{announce}</p>
    </div>
  );
}

export const sortModule: WidgetModule<QSort, SortValue> = {
  init: (q) => Object.fromEntries(q.items.map((i) => [i.id, null])),
  isAnswered: (_q, v) => Object.values(v).some(Boolean),
  grade: (q, v) => {
    const total = q.items.length;
    const hits = q.items.filter((i) => v[i.id] === q.solution[i.id]).length;
    const correct = hits === total;
    return {
      correct,
      score: total ? hits / total : 0,
      ...(correct ? {} : { detail: `${hits} of ${total} sorted correctly` }),
    };
  },
  Widget: SortWidget,
};
