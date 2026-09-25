/* ==========================================================================
   EXAM PAPER (Cambridge / IGCSE style)
   --------------------------------------------------------------------------
   Builds a written paper from the structured questions in src/content/exam/:

     setup    choose topics, calculator / non-calculator and length
     sitting  the paper itself — cover page, numbered questions, parts (a),
              (b)(i), marks in [brackets] and an answer line for each part
     marking  every part shown beside its mark scheme. Final answers the site
              can check are marked for you; method marks (M1, B1 …) are
              awarded by the student reading the scheme, exactly as a
              teacher would.

   Paper and mark scheme can both be printed for use on paper.
   ========================================================================== */

import { useState, useMemo, useEffect, useRef } from 'preact/hooks';
import type { JSX } from 'preact';
import { M, IconTick, IconCross } from './kit';
import MathKeys from './MathKeys';
import { examLeaves, type ExamCheck, type PreparedExamLeaf, type PreparedExamQuestion } from '../../lib/types';
import { checkTyped, checkAlgebraic, checkSurd, textMatches } from '../../lib/answer';
import { shuffle, newSeed } from '../../lib/shuffle';
import { load, subscribe, topicStats, recordQuiz, type Catalog } from '../../lib/progress';

type Phase = 'setup' | 'sitting' | 'marking';
type Scope = 'completed' | 'started' | 'all';
type PaperType = 'non-calculator' | 'calculator';

const LENGTHS = [
  { marks: 25, minutes: 30, label: 'Short' },
  { marks: 50, minutes: 60, label: 'Standard' },
  { marks: 75, minutes: 90, label: 'Full paper' },
];

const DIFF_RANK = { foundation: 0, core: 1, challenge: 2 } as const;

/* --------------------------------------------------------------------------
   Building a paper
   -------------------------------------------------------------------------- */

/** Take questions topic by topic, round robin, until the paper reaches its
 *  target marks — so a paper covers as many topics as it can. Then order it
 *  easiest first, the way Cambridge papers run. */
function buildPaper(
  pool: PreparedExamQuestion[], target: number, seed: number, preferCalculator: boolean,
): PreparedExamQuestion[] {
  const byTopic = new Map<string, PreparedExamQuestion[]>();
  const shuffled = shuffle(pool, seed);
  // A calculator paper leans on the questions that actually need one.
  const ordered = preferCalculator
    ? [...shuffled.filter((q) => q.calculator === 'calculator'), ...shuffled.filter((q) => q.calculator !== 'calculator')]
    : shuffled;
  for (const q of ordered) {
    const list = byTopic.get(q.topicId) ?? [];
    list.push(q);
    byTopic.set(q.topicId, list);
  }
  const queues = shuffle([...byTopic.values()], seed + 1);

  const chosen: PreparedExamQuestion[] = [];
  let total = 0;
  let progress = true;
  while (total < target && progress) {
    progress = false;
    for (const queue of queues) {
      if (total >= target) break;
      // Allow a small overshoot rather than leaving the paper short.
      const i = queue.findIndex((q) => total + q.marks <= target + 3);
      if (i === -1) continue;
      const [q] = queue.splice(i, 1);
      chosen.push(q!);
      total += q!.marks;
      progress = true;
    }
  }
  return chosen
    .map((q, i) => ({ q, i }))
    .sort((a, b) => DIFF_RANK[a.q.difficulty] - DIFF_RANK[b.q.difficulty] || a.i - b.i)
    .map(({ q }) => q);
}

/* --------------------------------------------------------------------------
   Marking
   -------------------------------------------------------------------------- */

async function lineCorrect(typed: string, check: ExamCheck): Promise<boolean> {
  if (!typed.trim()) return false;
  switch (check.kind) {
    case 'numeric': return checkTyped(typed, [check.answer, ...check.accept], check.tolerance);
    case 'algebraic': return checkAlgebraic(typed, check.answer, check.variables, check.requireForm);
    case 'text': return check.accept.some((a) => textMatches(typed, a));
    case 'surd': return checkSurd(typed, check.answer, check.simplest);
  }
}

/** true / false when every answer line can be checked, null when the part
 *  has to be marked by hand. */
async function autoMark(leaf: PreparedExamLeaf, typed: string[]): Promise<boolean | null> {
  if (leaf.lines.some((l) => !l.check)) return null;
  const checks = leaf.lines.map((l) => l.check!);
  const ok = async (t: string, c: ExamCheck) => {
    try { return await lineCorrect(t, c); } catch { return false; }
  };

  if (!leaf.anyOrder) {
    for (let i = 0; i < checks.length; i++) if (!(await ok(typed[i] ?? '', checks[i]!))) return false;
    return true;
  }

  // Any order: every typed line must match a different check.
  const used = new Set<number>();
  for (let i = 0; i < checks.length; i++) {
    let found = -1;
    for (let j = 0; j < checks.length && found < 0; j++) {
      if (!used.has(j) && (await ok(typed[i] ?? '', checks[j]!))) found = j;
    }
    if (found < 0) return false;
    used.add(found);
  }
  return true;
}

/* --------------------------------------------------------------------------
   Printing — the page holds both the paper and the scheme; a flag on <html>
   decides which one the printer sees.
   -------------------------------------------------------------------------- */

function printOnly(what: 'paper' | 'scheme') {
  const html = document.documentElement;
  html.dataset.print = what;
  const clear = () => {
    delete html.dataset.print;
    window.removeEventListener('afterprint', clear);
  };
  window.addEventListener('afterprint', clear);
  window.print();
}

/* ==========================================================================
   Component
   ========================================================================== */

/** A fixed test: no setup screen, the questions in the order given. */
export interface FixedPaper {
  id: string;
  title: string;
  minutes: number;
  paperType: PaperType;
  candidate?: string;
  date?: string;
}

export default function ExamPaper({ questions, catalog, fixed }: {
  questions: PreparedExamQuestion[];
  catalog: Catalog;
  fixed?: FixedPaper;
}) {
  const [phase, setPhase] = useState<Phase>(fixed ? 'sitting' : 'setup');
  const [ready, setReady] = useState(false);
  const [tick, setTick] = useState(0);

  const [scope, setScope] = useState<Scope>('completed');
  const [paperType, setPaperType] = useState<PaperType>(fixed?.paperType ?? 'non-calculator');
  const [lengthIx, setLengthIx] = useState(1);
  const [seed, setSeed] = useState(() => newSeed());

  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [working, setWorking] = useState<Record<string, string>>({});
  const [auto, setAuto] = useState<Record<string, boolean | null>>({});
  const [awarded, setAwarded] = useState<Record<string, number>>({});
  const [marking, setMarking] = useState(false);
  const [saved, setSaved] = useState(false);

  const [timed, setTimed] = useState(false);
  const [left, setLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    setReady(true);
    return subscribe(() => setTick((t) => t + 1));
  }, []);

  /* ---------- which topics ---------- */
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

  useEffect(() => {
    if (ready && scope === 'completed' && completed.length === 0) setScope('all');
  }, [ready, completed.length]);

  const allowed = scope === 'all' ? null : scope === 'completed' ? completed : started;
  const pool = useMemo(() => questions.filter((q) =>
    (allowed === null || allowed.includes(q.topicId)) &&
    (paperType === 'calculator' || q.calculator !== 'calculator')),
  [questions, allowed, paperType]);

  const poolMarks = pool.reduce((n, q) => n + q.marks, 0);
  const topicsInPool = new Set(pool.map((q) => q.topicId)).size;
  const length = LENGTHS[lengthIx]!;

  const paper = useMemo(
    () => (fixed ? questions : buildPaper(pool, length.marks, seed, paperType === 'calculator')),
    // The paper is fixed once built: only rebuild on a new seed.
    [seed, phase === 'setup' ? pool : null, length.marks, paperType],
  );
  const totalMarks = paper.reduce((n, q) => n + q.marks, 0);
  // Keep the time in proportion if the pool could not fill the paper.
  const minutes = fixed
    ? fixed.minutes
    : Math.max(5, Math.round((length.minutes * totalMarks) / length.marks / 5) * 5);
  const leaves = useMemo(() => paper.flatMap(examLeaves), [paper]);

  /* ---------- the clock ---------- */
  const submitRef = useRef<() => void>(() => {});
  useEffect(() => {
    if (phase !== 'sitting' || !timed) return;
    const t = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          window.clearInterval(t);
          setTimeUp(true);
          submitRef.current();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [phase, timed]);

  const toTop = () => requestAnimationFrame(() =>
    document.getElementById('exam-top')?.scrollIntoView({ block: 'start' }));

  const begin = () => {
    setAnswers({});
    setWorking({});
    setAuto({});
    setAwarded({});
    setSaved(false);
    setTimed(false);
    setTimeUp(false);
    setPhase('sitting');
    toTop();
  };

  const submit = async () => {
    if (marking) return;
    setMarking(true);
    const a: Record<string, boolean | null> = {};
    const m: Record<string, number> = {};
    for (const leaf of leaves) {
      const typed = answers[leaf.key] ?? [];
      const result = await autoMark(leaf, typed);
      a[leaf.key] = result;
      const blank = !typed.some((t) => t?.trim()) && !working[leaf.key]?.trim();
      // Correct → full marks. Wrong → 0 for now; the student can still award
      // method marks from the scheme. Blank → 0. Other hand-marked parts
      // start unmarked.
      if (result !== null || blank) m[leaf.key] = result ? leaf.marks : 0;
    }
    setAuto(a);
    setAwarded(m);
    setTimed(false);
    setMarking(false);
    setPhase('marking');
    toTop();
  };
  submitRef.current = () => { void submit(); };

  const setLine = (key: string, i: number, v: string) =>
    setAnswers((all) => {
      const lines = [...(all[key] ?? [])];
      lines[i] = v;
      return { ...all, [key]: lines };
    });

  /* ======================================================================
     Setup
     ====================================================================== */
  if (phase === 'setup') {
    return (
      <section class="review-setup card">
        <h2>Build a practice paper</h2>
        <p class="review-lead">
          A written paper in the Cambridge style: structured questions in parts,
          marks shown in brackets, and a full mark scheme with method marks.
          Have paper and a pencil ready for your working.
        </p>

        <fieldset class="review-field">
          <legend>Which topics?</legend>
          <div class="seg">
            {([
              ['completed', `Topics I have finished (${completed.length})`],
              ['started', `Anything I have started (${started.length})`],
              ['all', `Everything (${catalog.topics.length})`],
            ] as const).map(([v, label]) => (
              <button key={v} type="button" class={`seg-btn ${scope === v ? 'is-on' : ''}`}
                aria-pressed={scope === v} onClick={() => setScope(v)}>{label}</button>
            ))}
          </div>
          {ready && scope === 'completed' && completed.length === 0 ? (
            <p class="review-note">You have not finished a topic yet, so this is showing everything instead.</p>
          ) : null}
        </fieldset>

        <fieldset class="review-field">
          <legend>Which paper?</legend>
          <div class="seg">
            {([
              ['non-calculator', 'Non-calculator'],
              ['calculator', 'Calculator'],
            ] as const).map(([v, label]) => (
              <button key={v} type="button" class={`seg-btn ${paperType === v ? 'is-on' : ''}`}
                aria-pressed={paperType === v} onClick={() => setPaperType(v)}>{label}</button>
            ))}
          </div>
        </fieldset>

        <fieldset class="review-field">
          <legend>How long?</legend>
          <div class="seg">
            {LENGTHS.map((l, i) => (
              <button key={l.label} type="button" class={`seg-btn ${lengthIx === i ? 'is-on' : ''}`}
                aria-pressed={lengthIx === i} onClick={() => setLengthIx(i)}>
                {l.label} · {l.marks} marks · {l.minutes} min
              </button>
            ))}
          </div>
        </fieldset>

        <p class="review-pool" aria-live="polite">
          {pool.length} questions ({poolMarks} marks) available from {topicsInPool} topic{topicsInPool === 1 ? '' : 's'}.
          {poolMarks > 0 && poolMarks < length.marks
            ? ` That is not enough for a full ${length.marks}-mark paper, so it will be shorter.`
            : ''}
        </p>

        <button type="button" class="btn btn-primary" disabled={pool.length === 0}
          onClick={() => { setSeed(newSeed()); begin(); }}>
          Build the paper
        </button>
      </section>
    );
  }

  /* ======================================================================
     Shared pieces
     ====================================================================== */
  const title = fixed?.title
    ?? `Year 9 Mathematics · Practice Paper (${paperType === 'calculator' ? 'Calculator' : 'Non-calculator'})`;

  const earned = leaves.reduce((n, l) => n + (awarded[l.key] ?? 0), 0);
  const unmarked = leaves.filter((l) => awarded[l.key] === undefined).length;
  const percent = totalMarks ? Math.round((earned / totalMarks) * 100) : 0;

  const scheme = (
    <section class="exam-scheme" aria-labelledby="exam-scheme-heading">
      <h2 id="exam-scheme-heading" class="exam-scheme-title">Mark scheme</h2>
      <p class="exam-scheme-sub">{title} · {totalMarks} marks</p>
      <table class="exam-scheme-table">
        <thead>
          <tr><th scope="col">Question</th><th scope="col">Answer</th><th scope="col">Marks</th><th scope="col">Partial marks</th></tr>
        </thead>
        <tbody>
          {paper.flatMap((q, n) => examLeaves(q).map((leaf) => (
            <tr key={leaf.key}>
              <th scope="row">{n + 1}{leaf.fullLabel}</th>
              <td>
                <M html={leaf.answerHtml} />
                {leaf.qualifier ? <span class="exam-qual"> {leaf.qualifier}</span> : null}
              </td>
              <td class="exam-scheme-marks">{leaf.marks}</td>
              <td>
                {leaf.partialHtml.length
                  ? leaf.partialHtml.map((p, i) => <M key={i} html={p} as="div" />)
                  : null}
              </td>
            </tr>
          )))}
        </tbody>
      </table>
      <p class="exam-scheme-key">
        <strong>M</strong> method mark · <strong>A</strong> accuracy mark (depends on the M mark) ·{' '}
        <strong>B</strong> mark for a correct result or statement, independent of method ·{' '}
        <strong>oe</strong> or equivalent · <strong>cao</strong> correct answer only ·{' '}
        <strong>FT</strong> follow through after an earlier error · <strong>isw</strong> ignore subsequent working
      </p>
    </section>
  );

  /** Question number, stem and parts. `renderLeaf` draws each marked part. */
  const renderQuestion = (q: PreparedExamQuestion, n: number, renderLeaf: (l: PreparedExamLeaf) => JSX.Element) => (
    <article key={q.id} class="xq" aria-labelledby={`xq-${n}`}>
      <h3 id={`xq-${n}`} class="xq-num"><span class="sr-only">Question </span>{n + 1}</h3>
      <div class="xq-body">
        {q.stemHtml ? <M html={q.stemHtml} as="div" class="xq-stem" /> : null}
        {q.parts.map((p) => p.kind === 'leaf'
          ? <div key={p.leaf.key}>{renderLeaf(p.leaf)}</div>
          : (
            <div key={p.label} class="xp-group">
              <div class="xp-row">
                <span class="xp-label">{p.label}</span>
                <div class="xp-main">
                  {p.promptHtml ? <M html={p.promptHtml} as="div" class="xp-prompt" /> : null}
                  {p.leaves.map((l) => <div key={l.key}>{renderLeaf(l)}</div>)}
                </div>
              </div>
            </div>
          ))}
      </div>
    </article>
  );

  /* ======================================================================
     Sitting the paper
     ====================================================================== */
  if (phase === 'sitting') {
    const mmss = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
    const answered = leaves.filter((l) => (answers[l.key] ?? []).some((s) => s?.trim())).length;

    const sitLeaf = (leaf: PreparedExamLeaf) => (
      <div class="xp-row">
        <span class="xp-label">{leaf.label}</span>
        <div class="xp-main">
          <M html={leaf.promptHtml} as="div" class="xp-prompt" />
          <label class="sr-only" for={`w-${leaf.key}`}>Working for {leaf.fullLabel}</label>
          <textarea
            id={`w-${leaf.key}`}
            class="xp-working"
            rows={2}
            placeholder="Working"
            value={working[leaf.key] ?? ''}
            onInput={(e) => {
              const el = e.target as HTMLTextAreaElement;
              el.style.height = 'auto';
              el.style.height = `${el.scrollHeight}px`;
              setWorking((w) => ({ ...w, [leaf.key]: el.value }));
            }}
          />
          <div class="xp-answer">
            <div class="xp-lines">
              {leaf.lines.map((line, i) => (
                <div key={i} class="xp-line-row">
                  {line.prefixHtml ? <M html={line.prefixHtml} class="xp-affix" /> : null}
                  <label class="sr-only" for={`a-${leaf.key}-${i}`}>Answer {leaf.fullLabel}</label>
                  <input
                    id={`a-${leaf.key}-${i}`}
                    class="xp-line"
                    type="text"
                    autocomplete="off"
                    autocapitalize="off"
                    spellcheck={false}
                    value={answers[leaf.key]?.[i] ?? ''}
                    onInput={(e) => setLine(leaf.key, i, (e.target as HTMLInputElement).value)}
                  />
                  {line.suffixHtml ? <M html={line.suffixHtml} class="xp-affix" /> : null}
                </div>
              ))}
            </div>
            <span class="xp-marks" aria-label={`${leaf.marks} mark${leaf.marks === 1 ? '' : 's'}`}>[{leaf.marks}]</span>
          </div>
        </div>
      </div>
    );

    return (
      <div class="exam" id="exam-top">
        <div class="exam-bar no-print">
          <span class="exam-bar-count">{answered} of {leaves.length} parts answered</span>
          {timed ? (
            <span class={`quiz-timer ${left < 300 ? 'is-low' : ''}`} role="timer">
              <span class="sr-only">Time remaining </span>{mmss}
            </span>
          ) : (
            <button type="button" class="btn btn-ghost btn-sm" onClick={() => { setLeft(minutes * 60); setTimed(true); }}>
              Start the {minutes}-minute timer
            </button>
          )}
          <span class="exam-bar-tools">
            <button type="button" class="btn btn-ghost btn-sm" onClick={() => printOnly('paper')}>Print paper</button>
            <button type="button" class="btn btn-ghost btn-sm" onClick={() => printOnly('scheme')}>Print mark scheme</button>
          </span>
        </div>

        <div class="exam-paper">
          <header class="exam-cover">
            <p class="exam-cover-eyebrow">{fixed ? 'Test' : 'Practice paper'}</p>
            <h2 class="exam-cover-title">{title}</h2>
            <p class="exam-cover-meta">
              <span>Time allowed: <strong>{minutes} minutes</strong></span>
              <span>Total: <strong>{totalMarks} marks</strong></span>
              <span>{paper.length} questions</span>
              {fixed?.date ? <span>{fixed.date}</span> : null}
            </p>
            {fixed?.candidate ? <p class="exam-cover-candidate">Candidate: <strong>{fixed.candidate}</strong></p> : null}
            <div class="exam-cover-box">
              <h3>Instructions</h3>
              <ul>
                <li>Answer <strong>all</strong> questions.</li>
                <li>Write your answer to each part on the answer line. Use the maths keys that appear at the bottom of the screen for √, powers and other symbols.</li>
                <li>Show all your working. You can earn marks for correct method even if your final answer is wrong.</li>
                {paperType === 'calculator' ? (
                  <li>You should use a calculator where appropriate.</li>
                ) : (
                  <li>You must <strong>not</strong> use a calculator.</li>
                )}
                {paperType === 'calculator' ? (
                  <li>Give non-exact answers correct to 3 significant figures, or 1 decimal place for angles in degrees, unless the question says otherwise.</li>
                ) : (
                  <li>Give answers in exact form — fractions or surds — unless the question says otherwise.</li>
                )}
                <li>The number of marks for each question or part question is shown in brackets [ ].</li>
              </ul>
            </div>
          </header>

          {paper.map((q, n) => renderQuestion(q, n, sitLeaf))}

          <p class="exam-end">End of paper</p>
        </div>

        <div class="exam-print-scheme">{scheme}</div>

        <MathKeys />

        <div class="exam-finish no-print">
          <p>
            {answered < leaves.length
              ? `${leaves.length - answered} part${leaves.length - answered === 1 ? '' : 's'} not answered yet.`
              : 'Every part has an answer.'}
          </p>
          <button type="button" class="btn btn-primary" disabled={marking} onClick={submit}>
            {marking ? 'Marking…' : 'Finish and mark my paper'}
          </button>
          {!fixed ? (
            <button type="button" class="btn btn-ghost btn-sm" onClick={() => setPhase('setup')}>
              ← Change the settings
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  /* ======================================================================
     Marking against the scheme
     ====================================================================== */
  const byTopic = new Map<string, { title: string; got: number; of: number }>();
  for (const q of paper) {
    const row = byTopic.get(q.topicId) ?? { title: q.topicTitle, got: 0, of: 0 };
    for (const l of examLeaves(q)) {
      row.got += awarded[l.key] ?? 0;
      row.of += l.marks;
    }
    byTopic.set(q.topicId, row);
  }

  const markLeaf = (leaf: PreparedExamLeaf) => {
    const typed = answers[leaf.key] ?? [];
    const hasAnswer = typed.some((s) => s?.trim());
    const a = hasAnswer ? auto[leaf.key] : null;
    const got = awarded[leaf.key];
    const state = got === undefined ? 'is-open' : got === leaf.marks ? 'is-right' : got > 0 ? 'is-part' : 'is-wrong';

    return (
      <div class={`xp-row xm ${state}`}>
        <span class="xp-label">{leaf.label}</span>
        <div class="xp-main">
          <M html={leaf.promptHtml} as="div" class="xp-prompt" />

          <div class="xm-yours">
            <span class="xm-tag">Your answer</span>
            {hasAnswer ? (
              <span class="xm-typed">
                {leaf.lines.map((line, i) => (
                  <span key={i} class="xm-typed-line">
                    {line.prefixHtml ? <M html={line.prefixHtml} /> : null} {typed[i]?.trim() || '—'}{' '}
                    {line.suffixHtml ? <M html={line.suffixHtml} /> : null}
                  </span>
                ))}
              </span>
            ) : <span class="xm-blank">No answer</span>}
            {a === true ? <span class="xm-auto opt-right"><IconTick /> Correct</span> : null}
            {a === false ? <span class="xm-auto opt-wrong"><IconCross /> Not the final answer</span> : null}
          </div>
          {working[leaf.key]?.trim() ? (
            <pre class="xm-working">{working[leaf.key]}</pre>
          ) : null}

          <div class="xm-scheme">
            <div class="xm-scheme-answer">
              <span class="xm-tag">Mark scheme</span>
              <M html={leaf.answerHtml} />
              {leaf.qualifier ? <span class="exam-qual"> {leaf.qualifier}</span> : null}
              <span class="xp-marks">[{leaf.marks}]</span>
            </div>
            {leaf.partialHtml.length ? (
              <ul class="xm-partial">
                {leaf.partialHtml.map((p, i) => <li key={i}><M html={p} /></li>)}
              </ul>
            ) : null}
          </div>

          <div class="xm-award">
            <span class="xm-award-label" id={`aw-${leaf.key}`}>
              {a === true || !hasAnswer ? 'Marks' : a === false ? 'Any method marks?' : 'Mark it yourself'}
            </span>
            <div class="seg" role="radiogroup" aria-labelledby={`aw-${leaf.key}`}>
              {Array.from({ length: leaf.marks + 1 }, (_, k) => (
                <button key={k} type="button" role="radio" aria-checked={got === k}
                  class={`seg-btn seg-btn-sm ${got === k ? 'is-on' : ''}`}
                  onClick={() => { setAwarded((m) => ({ ...m, [leaf.key]: k })); setSaved(false); }}>
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div class="exam" id="exam-top">
      <div class={`result-card card exam-result ${unmarked ? '' : percent >= 50 ? 'is-pass' : 'is-fail'}`}>
        <p class="result-eyebrow">{title}</p>
        <h2 class="result-score">{earned} / {totalMarks}</h2>
        <p class="result-detail">
          {unmarked
            ? <>{unmarked} part{unmarked === 1 ? '' : 's'} still to mark — scroll down and award the marks using the scheme.</>
            : <>{percent}% · every part marked</>}
        </p>
        {timeUp ? <p class="chip chip-amber">Time ran out — the paper was collected automatically.</p> : null}

        <table class="exam-topic-table">
          <thead><tr><th scope="col">{fixed ? 'Section' : 'Topic'}</th><th scope="col">Marks</th></tr></thead>
          <tbody>
            {[...byTopic.values()].map((t) => (
              <tr key={t.title}>
                <th scope="row">{t.title}</th>
                <td>{t.got} / {t.of}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div class="result-actions">
          <button type="button" class="btn btn-primary" disabled={unmarked > 0 || saved}
            onClick={() => { recordQuiz(fixed ? `test-${fixed.id}` : 'exam-paper', percent, catalog); setSaved(true); }}>
            {saved ? <><IconTick /> Score saved</> : 'Save my score'}
          </button>
          <button type="button" class="btn btn-secondary" onClick={() => (fixed ? begin() : setPhase('setup'))}>
            {fixed ? 'Start again' : 'Build a new paper'}
          </button>
          <button type="button" class="btn btn-ghost" onClick={() => printOnly('scheme')}>
            Print mark scheme
          </button>
        </div>
      </div>

      <p class="exam-mark-help">
        Final answers the site could check have been marked for you. Where your
        final answer is wrong, read the partial marks and give yourself any
        method marks your working earned. Be honest — that is how
        a real examiner marks.
      </p>

      <div class="exam-paper exam-marking">
        {paper.map((q, n) => (
          <div key={q.id}>
            {q.needsReview ? (
              <p class="chip chip-amber exam-draft" title="Drafted — not yet checked by your tutor">Draft question</p>
            ) : null}
            {renderQuestion(q, n, markLeaf)}
          </div>
        ))}
      </div>

      <div class="exam-print-scheme">{scheme}</div>
    </div>
  );
}
