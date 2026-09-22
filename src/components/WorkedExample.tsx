/* ==========================================================================
   WORKED EXAMPLE
   --------------------------------------------------------------------------
   The solution starts hidden. The student reveals it one step at a time —
   so they can try the problem first, then take only as much help as they
   need, which is the whole point of a worked example.
   ========================================================================== */

import { useState } from 'preact/hooks';
import { M, IconTick } from './exercises/kit';

export interface WorkedExampleProps {
  title: string;
  problemHtml: string;
  steps: Array<{ explainHtml: string; mathsHtml?: string }>;
  answerHtml: string;
  index?: number;
}

export default function WorkedExample({ title, problemHtml, steps, answerHtml, index }: WorkedExampleProps) {
  const [shown, setShown] = useState(0);
  const allShown = shown >= steps.length;

  return (
    <article class="we card">
      <header class="we-head">
        <span class="we-tag">Worked example{index ? ` ${index}` : ''}</span>
        <h4 class="we-title">{title}</h4>
      </header>

      <M html={problemHtml} as="div" class="we-problem" />

      {shown === 0 ? (
        <div class="we-cta">
          <p class="we-prompt">Try it yourself first, then reveal the solution one step at a time.</p>
          <button type="button" class="btn btn-primary btn-sm" onClick={() => setShown(1)}>
            Show step 1
          </button>
        </div>
      ) : (
        <>
          <ol class="we-steps">
            {steps.slice(0, shown).map((s, i) => (
              <li key={i} class="we-step">
                <span class="we-step-num" aria-hidden="true">{i + 1}</span>
                <div class="we-step-body">
                  <M html={s.explainHtml} as="div" class="we-explain" />
                  {s.mathsHtml ? <M html={s.mathsHtml} as="div" class="we-maths" /> : null}
                </div>
              </li>
            ))}
          </ol>

          <div class="we-controls" aria-live="polite">
            {!allShown ? (
              <>
                <button type="button" class="btn btn-primary btn-sm" onClick={() => setShown(shown + 1)}>
                  Show step {shown + 1}
                </button>
                <button type="button" class="btn btn-ghost btn-sm" onClick={() => setShown(steps.length)}>
                  Show the whole solution
                </button>
                <span class="we-count">{shown} of {steps.length} steps</span>
              </>
            ) : (
              <button type="button" class="btn btn-ghost btn-sm" onClick={() => setShown(0)}>
                Hide the solution
              </button>
            )}
          </div>

          {allShown ? (
            <p class="we-answer">
              <span class="we-answer-icon" aria-hidden="true"><IconTick /></span>
              <span class="we-answer-label">Answer</span>
              <M html={answerHtml} class="we-answer-value" />
            </p>
          ) : null}
        </>
      )}
    </article>
  );
}
