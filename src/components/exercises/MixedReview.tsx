/* ==========================================================================
   MIXED REVIEW / EXAM PRACTICE
   --------------------------------------------------------------------------
   Draws a paper at random from across the whole course. By default it only
   uses topics the student has actually finished, so revision never asks about
   something they have not met yet — but they can widen it if they want to.
   ========================================================================== */

import { useState, useMemo, useEffect } from 'preact/hooks';
import Quiz from './Quiz';
import type { PreparedQuestion } from '../../lib/types';
import { load, subscribe, topicStats, type Catalog } from '../../lib/progress';

export interface ReviewItem {
  topicId: string;
  topicTitle: string;
  question: PreparedQuestion;
}

type Scope = 'completed' | 'started' | 'all';

export default function MixedReview({ items, catalog, lengths }: {
  items: ReviewItem[];
  catalog: Catalog;
  lengths: number[];
}) {
  const [ready, setReady] = useState(false);
  const [tick, setTick] = useState(0);
  const [scope, setScope] = useState<Scope>('completed');
  const [length, setLength] = useState(lengths[1] ?? 10);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setReady(true);
    return subscribe(() => setTick((t) => t + 1));
  }, []);

  const { completed, started } = useMemo(() => {
    const state = load();
    const done: string[] = [];
    const begun: string[] = [];
    for (const t of catalog.topics) {
      const s = topicStats(t.lessonIds, state);
      if (s.status === 'completed') done.push(t.id);
      if (s.status !== 'not-started') begun.push(t.id);
    }
    return { completed: done, started: begun };
  }, [catalog, tick, ready]);

  const allowed = scope === 'all' ? null : scope === 'completed' ? completed : started;
  const pool = useMemo(
    () => (allowed === null ? items : items.filter((i) => allowed.includes(i.topicId))),
    [items, allowed],
  );

  // If nothing is finished yet, quietly fall back to everything.
  useEffect(() => {
    if (ready && scope === 'completed' && completed.length === 0) setScope('all');
  }, [ready, completed.length]);

  const topicsInPool = new Set(pool.map((p) => p.topicId)).size;

  if (running) {
    return (
      <>
        <Quiz
          quizId="mixed-review"
          title="Exam practice"
          questions={pool.map((p) => p.question)}
          pickCount={Math.min(length, pool.length)}
          timeLimitSec={Math.max(300, length * 90)}
          passMark={60}
          catalog={catalog}
          backHref="/review/"
          backLabel="Set up another paper"
        />
        <p class="review-restart">
          <button type="button" class="btn btn-ghost btn-sm" onClick={() => setRunning(false)}>
            ← Change the settings
          </button>
        </p>
      </>
    );
  }

  return (
    <section class="review-setup card">
      <h2>Build a practice paper</h2>
      <p class="review-lead">
        Questions are drawn at random from across the course and mixed together,
        just like a real paper.
      </p>

      <fieldset class="review-field">
        <legend>Which topics?</legend>
        <div class="seg">
          {([
            ['completed', `Topics I have finished (${completed.length})`],
            ['started', `Anything I have started (${started.length})`],
            ['all', `Everything (${catalog.topics.length})`],
          ] as const).map(([v, label]) => (
            <button
              key={v}
              type="button"
              class={`seg-btn ${scope === v ? 'is-on' : ''}`}
              aria-pressed={scope === v}
              onClick={() => setScope(v)}
            >{label}</button>
          ))}
        </div>
        {ready && scope === 'completed' && completed.length === 0 ? (
          <p class="review-note">
            You have not finished a topic yet, so this is showing everything instead.
          </p>
        ) : null}
      </fieldset>

      <fieldset class="review-field">
        <legend>How many questions?</legend>
        <div class="seg">
          {lengths.map((n) => (
            <button
              key={n}
              type="button"
              class={`seg-btn ${length === n ? 'is-on' : ''}`}
              aria-pressed={length === n}
              onClick={() => setLength(n)}
            >{n}</button>
          ))}
        </div>
      </fieldset>

      <p class="review-pool" aria-live="polite">
        {pool.length} questions available from {topicsInPool} topic{topicsInPool === 1 ? '' : 's'}.
      </p>

      <button
        type="button"
        class="btn btn-primary"
        disabled={pool.length === 0}
        onClick={() => setRunning(true)}
      >
        Start the paper
      </button>
    </section>
  );
}
