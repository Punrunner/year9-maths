/* ==========================================================================
   PROGRESS ISLANDS
   --------------------------------------------------------------------------
   The small interactive pieces that read the student's saved progress: the
   completion ring, topic status chips, the "Mark as complete" button, the
   badge wall and the stats panel.

   All of them render a neutral placeholder on the server and fill in once
   they reach the browser, because progress lives in localStorage.
   ========================================================================== */

import { useState, useEffect } from 'preact/hooks';
import Celebrate from './Celebrate';
import {
  load, subscribe, resetAll, completeLesson, uncompleteLesson, startLesson,
  topicStats, strandPercent, overallPercent, levelFromXp, BADGES,
  type ProgressState, type Catalog,
} from '../lib/progress';

/* --------------------------------------------------------------------------
   The shared hook
   -------------------------------------------------------------------------- */

function useProgress(): [ProgressState, boolean] {
  const [state, setState] = useState<ProgressState>(() => load());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState({ ...load() });
    setReady(true);
    return subscribe(() => setState({ ...load() }));
  }, []);

  return [state, ready];
}

/* --------------------------------------------------------------------------
   Completion ring
   -------------------------------------------------------------------------- */

export function Ring({ percent, size = 116, label, sublabel }: {
  percent: number; size?: number; label?: string; sublabel?: string;
}) {
  const stroke = size > 90 ? 10 : 8;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const filled = (Math.max(0, Math.min(100, percent)) / 100) * circumference;

  return (
    <div class="ring" style={{ width: `${size}px`, height: `${size}px` }}>
      <svg viewBox={`0 0 ${size} ${size}`} role="img"
        aria-label={`${percent} per cent complete${label ? ` — ${label}` : ''}`}>
        <circle cx={size / 2} cy={size / 2} r={r} class="ring-track" stroke-width={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          class="ring-fill"
          stroke-width={stroke}
          fill="none"
          stroke-dasharray={`${filled} ${circumference}`}
          stroke-linecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div class="ring-centre" aria-hidden="true">
        <strong class="ring-pct">{percent}<span class="ring-sign">%</span></strong>
        {sublabel ? <span class="ring-sub">{sublabel}</span> : null}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Home page band
   -------------------------------------------------------------------------- */

export function HomeProgress({ catalog, strandNames }: {
  catalog: Catalog;
  strandNames: Record<string, string>;
}) {
  const [state, ready] = useProgress();
  if (!ready) return <div class="prog-band is-loading" aria-hidden="true" />;

  const overall = overallPercent(catalog, state);
  const { level, into, need } = levelFromXp(state.xp);
  const lessonsDone = Object.values(state.lessons).filter((l) => l.completed).length;

  return (
    <div class="prog-band">
      <div class="prog-ring">
        <Ring percent={overall} sublabel="complete" />
      </div>

      <div class="prog-stats">
        <div class="prog-stat">
          <span class="prog-stat-num">{lessonsDone}</span>
          <span class="prog-stat-label">lessons done</span>
        </div>
        <div class="prog-stat">
          <span class="prog-stat-num">{state.correct}</span>
          <span class="prog-stat-label">correct answers</span>
        </div>
        <div class="prog-stat">
          <span class="prog-stat-num">{state.streak.current}</span>
          <span class="prog-stat-label">day streak</span>
        </div>
        <div class="prog-stat">
          <span class="prog-stat-num">Lv {level}</span>
          <span class="prog-stat-label">{into} / {need} XP</span>
        </div>
      </div>

      <div class="prog-strands">
        {catalog.strands.map((s) => {
          const pct = strandPercent(catalog, s.id, state);
          return (
            <div class="prog-strand" key={s.id}>
              <div class="prog-strand-top">
                <span class="prog-strand-name">{strandNames[s.id] ?? s.id}</span>
                <span class="prog-strand-pct">{pct}%</span>
              </div>
              <div class="bar"><span style={{ width: `${pct}%` }} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Status on a topic card
   -------------------------------------------------------------------------- */

export function TopicStatus({ lessonIds, showBar = true }: { lessonIds: string[]; showBar?: boolean }) {
  const [state, ready] = useProgress();
  if (!ready) return <span class="chip chip-neutral">Not started</span>;

  const s = topicStats(lessonIds, state);
  const chip = s.status === 'completed' ? 'chip-success'
    : s.status === 'in-progress' ? 'chip-amber' : 'chip-neutral';
  const text = s.status === 'completed' ? 'Completed'
    : s.status === 'in-progress' ? `In progress · ${s.completed}/${s.total}` : 'Not started';

  return (
    <>
      <span class={`chip ${chip}`}>{text}</span>
      {showBar && s.status !== 'not-started' ? (
        <div class="bar bar-sm"><span style={{ width: `${s.percent}%` }} /></div>
      ) : null}
    </>
  );
}

/* --------------------------------------------------------------------------
   Mark a lesson complete
   -------------------------------------------------------------------------- */

export function LessonComplete({ lessonId, topicLessonIds, topicTitle, catalog, nextHref }: {
  lessonId: string;
  topicLessonIds: string[];
  topicTitle: string;
  catalog: Catalog;
  nextHref?: string;
}) {
  const [state, ready] = useProgress();
  const [party, setParty] = useState(false);

  // Opening the lesson counts as starting it.
  useEffect(() => { startLesson(lessonId); }, [lessonId]);

  if (!ready) return <div class="complete-box is-loading" aria-hidden="true" />;

  const done = Boolean(state.lessons[lessonId]?.completed);
  const stats = topicStats(topicLessonIds, state);

  const toggle = () => {
    if (done) { uncompleteLesson(lessonId); return; }
    completeLesson(lessonId, catalog);
    // Celebrate only when this lesson finishes the whole topic.
    const after = topicLessonIds.every((id) => id === lessonId || load().lessons[id]?.completed);
    if (after) setParty(true);
  };

  return (
    <div class={`complete-box ${done ? 'is-done' : ''}`}>
      <Celebrate show={party} label={`${topicTitle} complete!`} />

      <div class="complete-text">
        <p class="complete-head">{done ? 'Lesson complete' : 'Finished this lesson?'}</p>
        <p class="complete-sub">
          {stats.completed} of {stats.total} lessons done in {topicTitle}
        </p>
      </div>

      <div class="complete-actions">
        <button type="button" class={`btn ${done ? 'btn-secondary' : 'btn-primary'}`} onClick={toggle}>
          {done ? 'Mark as not done' : 'Mark as complete'}
        </button>
        {done && nextHref ? (
          <a class="btn btn-primary" href={nextHref}>Next lesson →</a>
        ) : null}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Badges
   -------------------------------------------------------------------------- */

export function BadgeWall() {
  const [state, ready] = useProgress();
  const earnedCount = ready ? Object.keys(state.badges).length : 0;

  return (
    <section class="badges" aria-labelledby="badges-heading">
      <div class="section-head">
        <h2 id="badges-heading">Achievements</h2>
        <p class="muted">{earnedCount} of {BADGES.length} earned</p>
      </div>
      <ul class="badge-grid">
        {BADGES.map((b) => {
          const earned = ready && Boolean(state.badges[b.id]);
          return (
            <li key={b.id} class={`badge ${earned ? 'is-earned' : 'is-locked'}`}>
              <span class="badge-icon" aria-hidden="true">{b.icon}</span>
              <span class="badge-title">{b.title}</span>
              <span class="badge-desc">{b.description}</span>
              <span class="sr-only">{earned ? 'Earned' : 'Not yet earned'}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Full stats page
   -------------------------------------------------------------------------- */

export function StatsPanel({ catalog, topicTitles }: {
  catalog: Catalog;
  topicTitles: Record<string, string>;
}) {
  const [state, ready] = useProgress();
  if (!ready) return <p class="muted">Loading your progress…</p>;

  const { level, into, need } = levelFromXp(state.xp);
  const accuracy = state.attempted ? Math.round((state.correct / state.attempted) * 100) : 0;
  const quizEntries = Object.entries(state.quizzes);

  return (
    <div class="stats">
      <div class="stats-top">
        <Ring percent={overallPercent(catalog, state)} size={140} sublabel="of the course" />
        <div class="stats-grid">
          <Stat label="Level" value={`${level}`} note={`${into} / ${need} XP to next`} />
          <Stat label="Total XP" value={state.xp.toLocaleString()} />
          <Stat label="Questions answered" value={state.attempted.toLocaleString()} />
          <Stat label="Accuracy" value={`${accuracy}%`} note={`${state.correct} correct`} />
          <Stat label="Current streak" value={`${state.streak.current} day${state.streak.current === 1 ? '' : 's'}`}
            note={`best ${state.streak.longest}`} />
          <Stat label="Best run" value={`${state.bestRun} in a row`} />
        </div>
      </div>

      <section class="stats-section">
        <h2>By topic</h2>
        <ul class="topic-progress-list">
          {catalog.topics.map((t) => {
            const s = topicStats(t.lessonIds, state);
            const quiz = state.quizzes[`quiz-${t.id}`];
            return (
              <li key={t.id}>
                <div class="tp-head">
                  <a href={`/topics/${t.id}/`} class="tp-name">{topicTitles[t.id] ?? t.id}</a>
                  <span class="tp-meta">
                    {s.completed}/{s.total} lessons
                    {quiz ? <> · best quiz {quiz.best}%</> : null}
                  </span>
                </div>
                <div class="bar"><span style={{ width: `${s.percent}%` }} /></div>
              </li>
            );
          })}
        </ul>
      </section>

      {quizEntries.length ? (
        <section class="stats-section">
          <h2>Quiz scores</h2>
          <table class="scores">
            <thead>
              <tr><th scope="col">Quiz</th><th scope="col">Best</th><th scope="col">Last</th><th scope="col">Attempts</th></tr>
            </thead>
            <tbody>
              {quizEntries.map(([id, q]) => (
                <tr key={id}>
                  <th scope="row">{topicTitles[id.replace(/^quiz-/, '')] ?? id}</th>
                  <td><strong>{q.best}%</strong></td>
                  <td>{q.last}%</td>
                  <td>{q.attempts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      <BadgeWall />

      <section class="stats-section">
        <h2>Start again</h2>
        <p class="muted">
          Everything above is stored only in this browser. Clearing it cannot be undone.
        </p>
        <ResetProgress />
      </section>
    </div>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div class="stat card">
      <span class="stat-label">{label}</span>
      <strong class="stat-value">{value}</strong>
      {note ? <span class="stat-note">{note}</span> : null}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Reset
   -------------------------------------------------------------------------- */

export function ResetProgress() {
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);

  if (done) return <p class="chip chip-success">Progress cleared.</p>;

  return confirming ? (
    <div class="reset-confirm" role="group" aria-label="Confirm reset">
      <p><strong>Clear all progress?</strong> Lessons, scores, XP, streak and badges will all go.</p>
      <div class="reset-actions">
        <button type="button" class="btn btn-primary"
          onClick={() => { resetAll(); setDone(true); }}>
          Yes, clear everything
        </button>
        <button type="button" class="btn btn-secondary" onClick={() => setConfirming(false)}>
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <button type="button" class="btn btn-secondary" onClick={() => setConfirming(true)}>
      Reset progress
    </button>
  );
}
