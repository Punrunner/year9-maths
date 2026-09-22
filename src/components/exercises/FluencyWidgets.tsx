/* ==========================================================================
   TYPES 13–14: Flashcards · Quick-fire timed drill
   --------------------------------------------------------------------------
   Both run their own loop, so the shell hides its Check button and lets the
   widget report the result when the student finishes.
   ========================================================================== */

import { useState, useEffect, useRef } from 'preact/hooks';
import { M, IconTick, IconCross, type WidgetModule, type WidgetProps } from './kit';
import type { QFlashcards, QDrill } from '../../lib/types';
import { shuffle, pick, newSeed } from '../../lib/shuffle';
import { checkTyped } from '../../lib/answer';

/* ==========================================================================
   13. Flashcards
   ========================================================================== */

interface CardState { done: number }

function FlashcardsWidget({ q, seed, onSelfComplete }: WidgetProps<QFlashcards, CardState>) {
  const [order, setOrder] = useState(() => shuffle(q.cards, seed).map((c) => c.id));
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [review, setReview] = useState<string[]>([]);

  const byId = new Map(q.cards.map((c) => [c.id, c]));
  const card = byId.get(order[i] ?? '');
  const finished = i >= order.length;

  useEffect(() => {
    if (finished && onSelfComplete) {
      onSelfComplete({ correct: true, score: 1, detail: `${known.length} of ${order.length} known` });
    }
  }, [finished]);

  const sort = (into: 'known' | 'review') => {
    const id = order[i]!;
    if (into === 'known') setKnown((k) => [...k, id]); else setReview((r) => [...r, id]);
    setFlipped(false);
    setI(i + 1);
  };

  const restart = (only?: 'review') => {
    const ids = only === 'review' ? review : q.cards.map((c) => c.id);
    setOrder(shuffle(ids, newSeed()));
    setI(0); setFlipped(false); setKnown([]); setReview([]);
  };

  if (finished) {
    return (
      <div class="flash-done">
        <p class="flash-score">
          <strong>{known.length}</strong> known · <strong>{review.length}</strong> to review
        </p>
        <div class="flash-actions">
          {review.length ? (
            <button type="button" class="btn btn-primary btn-sm" onClick={() => restart('review')}>
              Review the {review.length} you flagged
            </button>
          ) : null}
          <button type="button" class="btn btn-secondary btn-sm" onClick={() => restart()}>
            Shuffle and start again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div class="flash">
      <p class="flash-count" aria-live="polite">Card {i + 1} of {order.length}</p>

      <button
        type="button"
        class={`flash-card ${flipped ? 'is-flipped' : ''}`}
        aria-pressed={flipped}
        aria-label={flipped ? 'Showing the answer. Activate to flip back.' : 'Showing the prompt. Activate to reveal the answer.'}
        onClick={() => setFlipped(!flipped)}
      >
        <span class="flash-inner">
          <span class="flash-face flash-front"><M html={card?.frontHtml ?? ''} as="span" /></span>
          <span class="flash-face flash-back"><M html={card?.backHtml ?? ''} as="span" /></span>
        </span>
      </button>

      <p class="flash-hint">{flipped ? '' : 'Tap the card to flip it'}</p>

      <div class="flash-actions">
        <button type="button" class="btn btn-secondary btn-sm" onClick={() => sort('review')}>
          <IconCross /> Review again
        </button>
        <button type="button" class="btn btn-primary btn-sm" onClick={() => sort('known')}>
          <IconTick /> Got it
        </button>
      </div>
      <button type="button" class="btn btn-ghost btn-sm"
        onClick={() => { setOrder(shuffle(order, newSeed())); setI(0); setFlipped(false); }}>
        Shuffle
      </button>
    </div>
  );
}

export const flashcardsModule: WidgetModule<QFlashcards, CardState> = {
  init: () => ({ done: 0 }),
  isAnswered: () => true,
  grade: () => ({ correct: true, score: 1 }),
  Widget: FlashcardsWidget,
  selfManaged: true,
  ownFeedback: true,
};

/* ==========================================================================
   14. Quick-fire timed drill
   ========================================================================== */

type DrillPhase = 'idle' | 'running' | 'done';

function DrillWidget({ q, seed, onSelfComplete }: WidgetProps<QDrill, { runs: number }>) {
  const [phase, setPhase] = useState<DrillPhase>('idle');
  const [items, setItems] = useState(() => pick(q.pool, q.count, seed));
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState('');
  const [hits, setHits] = useState(0);
  const [log, setLog] = useState<Array<{ id: string; ok: boolean; given: string }>>([]);
  const [left, setLeft] = useState(q.durationSec);
  const inputRef = useRef<HTMLInputElement>(null);

  // The clock.
  useEffect(() => {
    if (phase !== 'running') return;
    const t = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) { window.clearInterval(t); finish(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [phase]);

  const finish = () => {
    setPhase('done');
  };

  useEffect(() => {
    if (phase === 'done' && onSelfComplete) {
      const answered = log.length || 1;
      onSelfComplete({
        correct: hits === items.length,
        score: items.length ? hits / items.length : 0,
        detail: `${hits} correct out of ${answered} attempted`,
      });
    }
  }, [phase]);

  const start = () => {
    setItems(pick(q.pool, q.count, newSeed()));
    setI(0); setTyped(''); setHits(0); setLog([]); setLeft(q.durationSec);
    setPhase('running');
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const submit = () => {
    const item = items[i];
    if (!item) return;
    const ok = checkTyped(typed, item.accept, item.tolerance);
    setLog((l) => [...l, { id: item.id, ok, given: typed }]);
    if (ok) setHits((h) => h + 1);
    setTyped('');
    if (i + 1 >= items.length) finish(); else setI(i + 1);
  };

  const mmss = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
  const item = items[i];

  if (phase === 'idle') {
    return (
      <div class="drill drill-idle">
        <p class="drill-brief">
          <strong>{q.count} questions</strong> · <strong>{q.durationSec} seconds</strong> ·
          answer as many as you can.
        </p>
        <button type="button" class="btn btn-primary" onClick={start}>Start the drill</button>
      </div>
    );
  }

  if (phase === 'done') {
    const byId = new Map(q.pool.map((p) => [p.id, p]));
    return (
      <div class="drill drill-done">
        <p class="drill-score">
          <strong>{hits}</strong> correct out of <strong>{log.length}</strong> attempted
          {left === 0 ? ' — time!' : ''}
        </p>
        <ul class="drill-review">
          {log.map((entry, k) => (
            <li key={k} class={entry.ok ? 'is-right' : 'is-wrong'}>
              <span class="drill-mark">{entry.ok ? <IconTick /> : <IconCross />}</span>
              <M html={byId.get(entry.id)?.promptHtml ?? ''} class="drill-q" />
              {entry.ok ? null : (
                <span class="drill-fix">
                  you put <span class="drill-given">{entry.given || '—'}</span>,
                  answer <strong>{byId.get(entry.id)?.accept[0]}</strong>
                </span>
              )}
            </li>
          ))}
        </ul>
        <button type="button" class="btn btn-primary btn-sm" onClick={start}>Go again</button>
      </div>
    );
  }

  return (
    <div class="drill drill-running">
      <div class="drill-bar">
        <span class="drill-timer" role="timer" aria-live="off">{mmss}</span>
        <span class="drill-progress">{i + 1} / {items.length}</span>
        <span class="drill-hits">{hits} correct</span>
      </div>
      <div class="drill-track" aria-hidden="true">
        <span style={{ width: `${(left / q.durationSec) * 100}%` }} />
      </div>

      <M html={item?.promptHtml ?? ''} as="p" class="drill-prompt" />

      <div class="entry-row">
        <label class="sr-only" for="drill-in">Your answer</label>
        <input
          ref={inputRef}
          id="drill-in"
          class="entry entry-lg"
          type="text"
          inputMode="decimal"
          autocomplete="off"
          autocapitalize="off"
          spellcheck={false}
          value={typed}
          onInput={(e) => setTyped((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
        />
        <button type="button" class="btn btn-primary" onClick={submit}>Next</button>
      </div>
      <p class="entry-help">Press Enter to move on.</p>
    </div>
  );
}

export const drillModule: WidgetModule<QDrill, { runs: number }> = {
  init: () => ({ runs: 0 }),
  isAnswered: () => true,
  grade: () => ({ correct: true, score: 1 }),
  Widget: DrillWidget,
  selfManaged: true,
  ownFeedback: true,
};
