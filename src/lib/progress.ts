/* ==========================================================================
   PROGRESS, XP, STREAKS AND BADGES
   --------------------------------------------------------------------------
   Everything a student does is stored in their own browser (localStorage).
   There is no login and no server, so nothing ever leaves their device.

   Every read and write is wrapped in try/catch: in a private window, or with
   site data blocked, storage throws. When that happens the site still works
   perfectly — it just cannot remember anything between visits.
   ========================================================================== */

const KEY = 'y9maths.progress.v1';

/* --------------------------------------------------------------------------
   Shape of the saved data
   -------------------------------------------------------------------------- */

export interface QuizRecord {
  best: number;        // best percentage ever scored
  last: number;        // most recent percentage
  attempts: number;
  lastAt: number;      // timestamp
}

export interface ProgressState {
  v: 1;
  /** lesson id → when it was started / completed */
  lessons: Record<string, { started: number; completed?: number }>;
  /** quiz id → scores */
  quizzes: Record<string, QuizRecord>;
  /** Lifetime question counters. */
  attempted: number;
  correct: number;
  /** Experience points. */
  xp: number;
  /** Longest run of correct answers in a row, ever, and the current run. */
  run: number;
  bestRun: number;
  /** Daily streak, keyed on the student's local date. */
  streak: { current: number; longest: number; lastDay: string };
  /** badge id → when it was earned */
  badges: Record<string, number>;
  /** Set once, so we can show "member since". */
  firstSeen: number;
}

export const emptyState = (): ProgressState => ({
  v: 1,
  lessons: {},
  quizzes: {},
  attempted: 0,
  correct: 0,
  xp: 0,
  run: 0,
  bestRun: 0,
  streak: { current: 0, longest: 0, lastDay: '' },
  badges: {},
  firstSeen: Date.now(),
});

/** The site structure, needed to work out completion percentages and badges. */
export interface Catalog {
  strands: Array<{ id: string; topicIds: string[] }>;
  topics: Array<{ id: string; strandId: string; lessonIds: string[]; extension: boolean }>;
}

/* --------------------------------------------------------------------------
   Storage (always guarded)
   -------------------------------------------------------------------------- */

let cache: ProgressState | null = null;

export function load(): ProgressState {
  if (cache) return cache;
  if (typeof window === 'undefined') return emptyState();

  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      cache = emptyState();
      return cache;
    }
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    // Merge over a fresh state so a missing field from an older save is fine.
    cache = { ...emptyState(), ...parsed, v: 1 } as ProgressState;
    cache.lessons ??= {};
    cache.quizzes ??= {};
    cache.badges ??= {};
    cache.streak ??= { current: 0, longest: 0, lastDay: '' };
    return cache;
  } catch {
    // Corrupt or blocked storage — carry on with a clean slate in memory.
    cache = emptyState();
    return cache;
  }
}

/** Notify every progress-aware island on the page that something changed. */
function broadcast() {
  try {
    window.dispatchEvent(new CustomEvent('y9:progress'));
  } catch { /* no window — nothing to notify */ }
}

export function save(state: ProgressState): void {
  cache = state;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable. The in-memory cache still drives this
    // session, so the student sees their progress until they close the tab.
  }
  broadcast();
}

/** Read–modify–write helper. */
export function update(fn: (s: ProgressState) => void): ProgressState {
  const s = load();
  fn(s);
  save(s);
  return s;
}

export function subscribe(fn: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => fn();
  window.addEventListener('y9:progress', handler);
  // Another tab changed things.
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) { cache = null; fn(); }
  });
  return () => window.removeEventListener('y9:progress', handler);
}

export function resetAll(): void {
  try { window.localStorage.removeItem(KEY); } catch { /* ignore */ }
  cache = emptyState();
  broadcast();
}

/* --------------------------------------------------------------------------
   XP and the daily streak
   -------------------------------------------------------------------------- */

export const XP = {
  correct: 10,
  attempt: 2,       // a wrong answer still earns a little — effort counts
  lesson: 50,
  quizPass: 100,
  quizPerfect: 150,
} as const;

/** XP needed to reach each level: 0, 250, 600, 1050, … */
export function levelFromXp(xp: number): { level: number; into: number; need: number } {
  let level = 1;
  let need = 250;
  let remaining = xp;
  while (remaining >= need) {
    remaining -= need;
    level++;
    need = Math.round(need * 1.35 / 10) * 10;
  }
  return { level, into: remaining, need };
}

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const daysBetween = (a: string, b: string) => {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  if (!ay || !by) return Infinity;
  const ms = Date.UTC(by!, bm! - 1, bd!) - Date.UTC(ay!, am! - 1, ad!);
  return Math.round(ms / 86_400_000);
};

/** Call whenever the student does anything. Keeps the daily streak honest. */
function touchStreak(s: ProgressState) {
  const today = todayKey();
  if (s.streak.lastDay === today) return;

  const gap = s.streak.lastDay ? daysBetween(s.streak.lastDay, today) : Infinity;
  s.streak.current = gap === 1 ? s.streak.current + 1 : 1;
  s.streak.longest = Math.max(s.streak.longest, s.streak.current);
  s.streak.lastDay = today;
}

/* --------------------------------------------------------------------------
   Recording activity
   -------------------------------------------------------------------------- */

export function startLesson(lessonId: string): void {
  update((s) => {
    touchStreak(s);
    s.lessons[lessonId] ??= { started: Date.now() };
  });
}

export function completeLesson(lessonId: string, catalog?: Catalog): void {
  update((s) => {
    touchStreak(s);
    const entry = (s.lessons[lessonId] ??= { started: Date.now() });
    if (!entry.completed) {
      entry.completed = Date.now();
      s.xp += XP.lesson;
    }
    if (catalog) awardBadges(s, catalog);
  });
}

export function uncompleteLesson(lessonId: string): void {
  update((s) => {
    const entry = s.lessons[lessonId];
    if (entry?.completed) {
      delete entry.completed;
      s.xp = Math.max(0, s.xp - XP.lesson);
    }
  });
}

export const isLessonComplete = (lessonId: string): boolean =>
  Boolean(load().lessons[lessonId]?.completed);

export const isLessonStarted = (lessonId: string): boolean =>
  Boolean(load().lessons[lessonId]);

/** Record one graded answer. `correct` drives XP and the "in a row" counter. */
export function recordAnswer(correct: boolean, catalog?: Catalog): void {
  update((s) => {
    touchStreak(s);
    s.attempted += 1;
    if (correct) {
      s.correct += 1;
      s.run += 1;
      s.bestRun = Math.max(s.bestRun, s.run);
      s.xp += XP.correct;
    } else {
      s.run = 0;
      s.xp += XP.attempt;
    }
    if (catalog) awardBadges(s, catalog);
  });
}

export function recordQuiz(quizId: string, percent: number, catalog?: Catalog): void {
  update((s) => {
    touchStreak(s);
    const rec = (s.quizzes[quizId] ??= { best: 0, last: 0, attempts: 0, lastAt: 0 });
    rec.attempts += 1;
    rec.last = percent;
    rec.lastAt = Date.now();
    if (percent > rec.best) {
      rec.best = percent;
      s.xp += percent === 100 ? XP.quizPerfect : percent >= 70 ? XP.quizPass : 0;
    }
    if (catalog) awardBadges(s, catalog);
  });
}

/* --------------------------------------------------------------------------
   Derived numbers for the dashboards
   -------------------------------------------------------------------------- */

export interface TopicStats {
  total: number;
  completed: number;
  started: boolean;
  percent: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

export function topicStats(lessonIds: string[], s = load()): TopicStats {
  const total = lessonIds.length;
  const completed = lessonIds.filter((id) => s.lessons[id]?.completed).length;
  const started = lessonIds.some((id) => s.lessons[id]);
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return {
    total, completed, started, percent,
    status: completed === total && total > 0 ? 'completed' : started ? 'in-progress' : 'not-started',
  };
}

export function strandPercent(catalog: Catalog, strandId: string, s = load()): number {
  const ids = catalog.topics
    .filter((t) => t.strandId === strandId && !t.extension)
    .flatMap((t) => t.lessonIds);
  if (!ids.length) return 0;
  return Math.round((ids.filter((id) => s.lessons[id]?.completed).length / ids.length) * 100);
}

/** Overall completion. Extension topics are deliberately left out. */
export function overallPercent(catalog: Catalog, s = load()): number {
  const ids = catalog.topics.filter((t) => !t.extension).flatMap((t) => t.lessonIds);
  if (!ids.length) return 0;
  return Math.round((ids.filter((id) => s.lessons[id]?.completed).length / ids.length) * 100);
}

/* --------------------------------------------------------------------------
   Badges
   -------------------------------------------------------------------------- */

export interface BadgeDef {
  id: string;
  title: string;
  description: string;
  /** A single character or short emoji shown on the badge. */
  icon: string;
  earned: (s: ProgressState, c: Catalog) => boolean;
}

export const BADGES: BadgeDef[] = [
  {
    id: 'first-steps', title: 'First Steps', icon: '🌱',
    description: 'Complete your first lesson.',
    earned: (s) => Object.values(s.lessons).some((l) => l.completed),
  },
  {
    id: 'ten-in-a-row', title: '10 in a Row', icon: '🔥',
    description: 'Answer 10 questions correctly in a row.',
    earned: (s) => s.bestRun >= 10,
  },
  {
    id: 'twenty-five-in-a-row', title: '25 in a Row', icon: '⚡',
    description: 'Answer 25 questions correctly in a row.',
    earned: (s) => s.bestRun >= 25,
  },
  {
    id: 'century', title: 'Century', icon: '💯',
    description: 'Answer 100 questions correctly.',
    earned: (s) => s.correct >= 100,
  },
  {
    id: 'first-quiz', title: 'Quiz Taker', icon: '📝',
    description: 'Finish your first topic quiz.',
    earned: (s) => Object.keys(s.quizzes).length > 0,
  },
  {
    id: 'perfect-quiz', title: 'Perfect Score', icon: '🎯',
    description: 'Score 100% on any topic quiz.',
    earned: (s) => Object.values(s.quizzes).some((q) => q.best === 100),
  },
  {
    id: 'three-day-streak', title: 'On a Roll', icon: '📅',
    description: 'Study three days in a row.',
    earned: (s) => s.streak.longest >= 3,
  },
  {
    id: 'week-streak', title: 'Seven Day Streak', icon: '🗓️',
    description: 'Study seven days in a row.',
    earned: (s) => s.streak.longest >= 7,
  },
  {
    id: 'topic-complete', title: 'Topic Complete', icon: '✅',
    description: 'Finish every lesson in a topic.',
    earned: (s, c) => c.topics.some((t) =>
      t.lessonIds.length > 0 && t.lessonIds.every((id) => s.lessons[id]?.completed)),
  },
  {
    id: 'strand-complete', title: 'Strand Complete', icon: '🏆',
    description: 'Finish every topic in one strand.',
    earned: (s, c) => c.strands.some((st) => {
      const ids = c.topics.filter((t) => st.topicIds.includes(t.id) && !t.extension)
        .flatMap((t) => t.lessonIds);
      return ids.length > 0 && ids.every((id) => s.lessons[id]?.completed);
    }),
  },
  {
    id: 'level-five', title: 'Level 5', icon: '⭐',
    description: 'Reach level 5.',
    earned: (s) => levelFromXp(s.xp).level >= 5,
  },
  {
    id: 'the-lot', title: 'The Lot', icon: '👑',
    description: 'Complete every core topic on the site.',
    earned: (s, c) => {
      const ids = c.topics.filter((t) => !t.extension).flatMap((t) => t.lessonIds);
      return ids.length > 0 && ids.every((id) => s.lessons[id]?.completed);
    },
  },
];

/** Mutates `s`, adding any newly earned badges. Returns the new badge ids. */
function awardBadges(s: ProgressState, c: Catalog): string[] {
  const fresh: string[] = [];
  for (const b of BADGES) {
    if (!s.badges[b.id]) {
      let earned = false;
      try { earned = b.earned(s, c); } catch { earned = false; }
      if (earned) {
        s.badges[b.id] = Date.now();
        fresh.push(b.id);
      }
    }
  }
  return fresh;
}

/** Check for new badges without recording any other activity. */
export function refreshBadges(catalog: Catalog): string[] {
  let fresh: string[] = [];
  update((s) => { fresh = awardBadges(s, catalog); });
  return fresh;
}
