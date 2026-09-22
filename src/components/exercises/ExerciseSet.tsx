/* ==========================================================================
   A PRACTICE SET
   --------------------------------------------------------------------------
   The block of questions at the end of a lesson. Questions can be drawn at
   random from a larger bank, so pressing "New questions" gives a genuinely
   different set rather than the same page again.
   ========================================================================== */

import { useState, useMemo } from 'preact/hooks';
import Exercise from './Exercise';
import { M } from './kit';
import type { PreparedQuestion, Verdict } from '../../lib/types';
import { shuffle, pick, newSeed } from '../../lib/shuffle';

export interface ExerciseSetProps {
  questions: PreparedQuestion[];
  title?: string;
  introHtml?: string;
  /** Draw this many from the bank each time. */
  pickCount?: number;
  shuffleBank?: boolean;
}

export default function ExerciseSet({
  questions, title = 'Practice', introHtml, pickCount, shuffleBank = false,
}: ExerciseSetProps) {
  const [seed, setSeed] = useState(() => newSeed());
  const [results, setResults] = useState<Record<string, Verdict>>({});

  const selected = useMemo(() => {
    if (pickCount && pickCount < questions.length) return pick(questions, pickCount, seed);
    return shuffleBank ? shuffle(questions, seed) : questions;
  }, [questions, pickCount, shuffleBank, seed]);

  const answered = Object.keys(results).length;
  const right = Object.values(results).filter((v) => v.correct).length;
  const canReshuffle = shuffleBank || (pickCount !== undefined && pickCount < questions.length);

  const reshuffle = () => {
    setSeed(newSeed());
    setResults({});
  };

  return (
    <section class="ex-set" aria-labelledby="practice-heading">
      <div class="ex-set-head">
        <h2 id="practice-heading">{title}</h2>
        <p class="ex-set-count" aria-live="polite">
          {answered
            ? <><strong>{right}</strong> right out of <strong>{answered}</strong> answered</>
            : <>{selected.length} question{selected.length === 1 ? '' : 's'}</>}
        </p>
      </div>

      {introHtml ? <M html={introHtml} as="div" class="ex-set-intro" /> : null}

      {answered > 0 ? (
        <div class="ex-set-track" aria-hidden="true">
          <span style={{ width: `${(answered / selected.length) * 100}%` }} />
        </div>
      ) : null}

      <ol class="ex-list">
        {selected.map((q, i) => (
          <li key={`${q.id}-${seed}`}>
            <Exercise
              q={q}
              index={i + 1}
              total={selected.length}
              onGraded={(v) => setResults((r) => ({ ...r, [q.id]: v }))}
            />
          </li>
        ))}
      </ol>

      {canReshuffle ? (
        <div class="ex-set-foot">
          <button type="button" class="btn btn-secondary" onClick={reshuffle}>
            New questions
          </button>
          <p class="ex-set-note">
            Drawn at random from a bank of {questions.length}.
          </p>
        </div>
      ) : null}
    </section>
  );
}
