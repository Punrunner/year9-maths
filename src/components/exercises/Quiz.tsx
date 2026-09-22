/* ==========================================================================
   SCORED QUIZ
   --------------------------------------------------------------------------
   A quiz behaves differently from practice: answers are NOT marked as you go.
   You work through the paper, move freely between questions, submit, and then
   get a results screen with every question reviewed and explained.

   "Retry" reshuffles from the bank, so the second attempt is a new paper.
   ========================================================================== */

import { useState, useMemo, useEffect, useRef } from 'preact/hooks';
import { M, Feedback, IconTick, IconCross, type WidgetProps } from './kit';
import { WIDGETS } from './registry';
import Celebrate from '../Celebrate';
import type { PreparedQuestion, Verdict } from '../../lib/types';
import { pick, shuffle, newSeed } from '../../lib/shuffle';
import { recordQuiz, recordAnswer, type Catalog } from '../../lib/progress';

type Phase = 'intro' | 'running' | 'results';

export interface QuizProps {
  quizId: string;
  title: string;
  descriptionHtml?: string;
  questions: PreparedQuestion[];
  pickCount?: number;
  timeLimitSec: number;
  passMark: number;
  catalog: Catalog;
  /** Where "Back to the topic" should go. */
  backHref?: string;
  backLabel?: string;
}

export default function Quiz(props: QuizProps) {
  const { questions, pickCount, timeLimitSec, passMark, quizId, catalog } = props;

  const [phase, setPhase] = useState<Phase>('intro');
  const [seed, setSeed] = useState(() => newSeed());
  const [timed, setTimed] = useState(false);
  const [left, setLeft] = useState(timeLimitSec);
  const [i, setI] = useState(0);
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [verdicts, setVerdicts] = useState<Record<string, Verdict>>({});
  const [grading, setGrading] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Quizzes that are shorter than their bank draw a fresh paper each attempt.
  const paper = useMemo(() => {
    const n = pickCount && pickCount < questions.length ? pickCount : questions.length;
    return n < questions.length ? pick(questions, n, seed) : shuffle(questions, seed);
  }, [questions, pickCount, seed]);

  /* ---------- the clock ---------- */
  useEffect(() => {
    if (phase !== 'running' || !timed) return;
    const t = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) { window.clearInterval(t); void submit(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [phase, timed]);

  /* ---------- moving between questions ---------- */
  const goTo = (n: number) => {
    setI(Math.max(0, Math.min(paper.length - 1, n)));
    // Move focus to the heading so keyboard and screen-reader users follow along.
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const start = (withTimer: boolean) => {
    setTimed(withTimer);
    setLeft(timeLimitSec);
    setPhase('running');
    setI(0);
  };

  const reset = () => {
    setSeed(newSeed());
    setValues({});
    setVerdicts({});
    setI(0);
    setPhase('intro');
  };

  /* ---------- marking ---------- */
  const submit = async () => {
    if (grading) return;
    setGrading(true);

    const marks: Record<string, Verdict> = {};
    for (const q of paper) {
      const mod = WIDGETS[q.type];
      const value = (values[q.id] ?? mod.init(q, seed)) as never;
      try {
        marks[q.id] = await mod.grade(q, value);
      } catch {
        marks[q.id] = { correct: false, score: 0, detail: 'Could not be marked' };
      }
    }

    setVerdicts(marks);
    setGrading(false);
    setPhase('results');

    // Feed the lifetime counters, then store the quiz score itself.
    paper.forEach((q) => recordAnswer(Boolean(marks[q.id]?.correct)));
    const earned = paper.reduce((sum, q) => sum + (marks[q.id]?.score ?? 0) * q.marks, 0);
    const possible = paper.reduce((sum, q) => sum + q.marks, 0);
    recordQuiz(quizId, possible ? Math.round((earned / possible) * 100) : 0, catalog);
  };

  const answeredCount = paper.filter((q) => {
    const mod = WIDGETS[q.type];
    const v = values[q.id];
    return v !== undefined && mod.isAnswered(q, v as never);
  }).length;

  /* ======================================================================
     Intro
     ====================================================================== */
  if (phase === 'intro') {
    const n = pickCount && pickCount < questions.length ? pickCount : questions.length;
    return (
      <section class="quiz quiz-intro card">
        <h2>{props.title}</h2>
        {props.descriptionHtml ? <M html={props.descriptionHtml} as="div" class="quiz-desc" /> : null}
        <ul class="quiz-facts">
          <li><strong>{n}</strong> questions{n < questions.length ? <> drawn from a bank of {questions.length}</> : null}</li>
          <li>Pass mark <strong>{passMark}%</strong></li>
          <li>Answers are marked at the end, not as you go</li>
          <li>You can move back and forward between questions</li>
        </ul>
        <div class="quiz-start">
          <button type="button" class="btn btn-primary" onClick={() => start(false)}>
            Start the quiz
          </button>
          <button type="button" class="btn btn-secondary" onClick={() => start(true)}>
            Start timed ({Math.round(timeLimitSec / 60)} min)
          </button>
        </div>
      </section>
    );
  }

  /* ======================================================================
     Results
     ====================================================================== */
  if (phase === 'results') {
    const earned = paper.reduce((s, q) => s + (verdicts[q.id]?.score ?? 0) * q.marks, 0);
    const possible = paper.reduce((s, q) => s + q.marks, 0);
    const percent = possible ? Math.round((earned / possible) * 100) : 0;
    const fullMarks = paper.filter((q) => verdicts[q.id]?.correct).length;
    const passed = percent >= passMark;

    return (
      <section class="quiz quiz-results" aria-labelledby="quiz-result-heading">
        <Celebrate show={percent === 100} label="Perfect score!" />

        <div class={`result-card card ${passed ? 'is-pass' : 'is-fail'}`}>
          <p class="result-eyebrow">{props.title}</p>
          <h2 id="quiz-result-heading" class="result-score">{percent}%</h2>
          <p class="result-detail">
            {fullMarks} of {paper.length} questions fully correct
            {possible !== paper.length ? <> · {Math.round(earned * 10) / 10} of {possible} marks</> : null}
          </p>
          <p class={`chip ${passed ? 'chip-success' : 'chip-amber'}`}>
            {passed ? <><IconTick /> Passed</> : <>Keep going — {passMark}% to pass</>}
          </p>

          <div class="result-actions">
            <button type="button" class="btn btn-primary" onClick={reset}>
              Retry with new questions
            </button>
            {props.backHref ? (
              <a class="btn btn-secondary" href={props.backHref}>
                {props.backLabel ?? 'Back to the topic'}
              </a>
            ) : null}
          </div>
        </div>

        <h3 class="review-heading">Question by question</h3>
        <ol class="review-list">
          {paper.map((q, n) => {
            const mod = WIDGETS[q.type];
            const v = verdicts[q.id];
            const value = (values[q.id] ?? mod.init(q, seed)) as never;
            return (
              <li key={q.id} class={`review-item ${v?.correct ? 'is-right' : 'is-wrong'}`}>
                <div class="review-head">
                  <span class={`review-mark ${v?.correct ? 'opt-right' : 'opt-wrong'}`}>
                    {v?.correct ? <IconTick /> : <IconCross />}
                  </span>
                  <span class="review-num">Question {n + 1}</span>
                </div>
                <M html={q.promptHtml} as="div" class="ex-prompt" />
                <div class="ex-body is-review">
                  <mod.Widget
                    {...({
                      q, value, setValue: () => {}, locked: true, verdict: v ?? null,
                      seed, uid: `rev-${q.id}`,
                    } as WidgetProps<any, any>)}
                  />
                </div>
                {v ? <Feedback verdict={v} explanationHtml={q.explanationHtml} /> : null}
              </li>
            );
          })}
        </ol>
      </section>
    );
  }

  /* ======================================================================
     Running
     ====================================================================== */
  const q = paper[i]!;
  const mod = WIDGETS[q.type];
  const value = (values[q.id] ?? mod.init(q, seed)) as never;
  const mmss = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;

  return (
    <section class="quiz quiz-running" aria-labelledby="quiz-q-heading">
      <div class="quiz-bar">
        <h2 id="quiz-q-heading" tabIndex={-1} ref={headingRef} class="quiz-counter">
          Question {i + 1} <span class="quiz-of">of {paper.length}</span>
        </h2>
        {timed ? (
          <span class={`quiz-timer ${left < 60 ? 'is-low' : ''}`} role="timer">
            <span class="sr-only">Time remaining </span>{mmss}
          </span>
        ) : null}
        <span class="quiz-answered">{answeredCount} answered</span>
      </div>

      <div class="quiz-track" aria-hidden="true">
        <span style={{ width: `${((i + 1) / paper.length) * 100}%` }} />
      </div>

      {/* Jump straight to any question */}
      <nav class="quiz-dots" aria-label="Jump to a question">
        {paper.map((qq, n) => {
          const done = values[qq.id] !== undefined && WIDGETS[qq.type].isAnswered(qq, values[qq.id] as never);
          return (
            <button
              key={qq.id}
              type="button"
              class={`quiz-dot ${n === i ? 'is-current' : ''} ${done ? 'is-done' : ''}`}
              aria-label={`Question ${n + 1}${done ? ', answered' : ', not answered'}`}
              aria-current={n === i ? 'true' : undefined}
              onClick={() => goTo(n)}
            >{n + 1}</button>
          );
        })}
      </nav>

      <article class="ex ex-in-quiz">
        <M html={q.promptHtml} as="div" class="ex-prompt" />
        <div class="ex-body">
          <mod.Widget
            key={`${q.id}-${seed}`}
            {...({
              q, value,
              setValue: (v: unknown) => setValues((all) => ({ ...all, [q.id]: v })),
              locked: false, verdict: null, seed, uid: `qz-${q.id}`,
            } as WidgetProps<any, any>)}
          />
        </div>
      </article>

      <div class="quiz-nav">
        <button type="button" class="btn btn-secondary" disabled={i === 0} onClick={() => goTo(i - 1)}>
          ← Previous
        </button>
        {i < paper.length - 1 ? (
          <button type="button" class="btn btn-primary" onClick={() => goTo(i + 1)}>Next →</button>
        ) : (
          <button type="button" class="btn btn-primary" disabled={grading} onClick={submit}>
            {grading ? 'Marking…' : 'Finish and mark'}
          </button>
        )}
      </div>

      {i === paper.length - 1 || answeredCount === paper.length ? (
        <p class="quiz-submit-note">
          {answeredCount < paper.length
            ? `${paper.length - answeredCount} question${paper.length - answeredCount === 1 ? '' : 's'} still unanswered.`
            : 'All questions answered.'}
          {i !== paper.length - 1 ? (
            <button type="button" class="btn btn-ghost btn-sm" onClick={submit}>Finish now</button>
          ) : null}
        </p>
      ) : null}
    </section>
  );
}
