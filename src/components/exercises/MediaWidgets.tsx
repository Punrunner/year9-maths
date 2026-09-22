/* ==========================================================================
   TYPES 11–12: Diagram hotspot · Manipulable (sliders and draggable points)
   ========================================================================== */

import { type WidgetModule, type WidgetProps, verdictOf } from './kit';
import type { QHotspot, QManipulable } from '../../lib/types';
import { FIGURES } from '../visuals/figures';
import { VISUALS, VISUAL_DEFAULTS } from '../visuals/registry';

/* ==========================================================================
   11. Diagram hotspot
   ========================================================================== */

const answersOf = (q: QHotspot): string[] =>
  Array.isArray(q.answer) ? q.answer : [q.answer];

function HotspotWidget({ q, value, setValue, locked, requestCheck }: WidgetProps<QHotspot, string | null>) {
  const Figure = FIGURES[q.figure];

  if (!Figure) {
    return (
      <p class="widget-missing">
        No diagram called <code>{q.figure}</code>. Check the <code>figure</code> field
        against the list at the top of <code>src/components/visuals/figures.tsx</code>.
      </p>
    );
  }

  return (
    <div class="hotspot">
      <p class="choices-note">
        Click the right part of the diagram. You can also tab to each part and press Enter.
      </p>
      <div class="hotspot-stage">
        <Figure
          config={q.config}
          selected={value}
          locked={locked}
          correct={answersOf(q)}
          onSelect={(id: string) => {
            if (locked) return;
            setValue(id);
            // One click is the whole answer, so offer to mark it straight away.
            if (requestCheck) requestCheck();
          }}
        />
      </div>
    </div>
  );
}

export const hotspotModule: WidgetModule<QHotspot, string | null> = {
  init: () => null,
  isAnswered: (_q, v) => v !== null,
  grade: (q, v) => verdictOf(Boolean(v) && answersOf(q).includes(v!)),
  Widget: HotspotWidget,
};

/* ==========================================================================
   12. Manipulable — move the controls until the target is matched
   ========================================================================== */

function ManipulableWidget({ q, value, setValue, locked, verdict }: WidgetProps<QManipulable, Record<string, number>>) {
  const Visual = VISUALS[q.widget];

  if (!Visual) {
    return (
      <p class="widget-missing">
        No interactive called <code>{q.widget}</code>. Check the <code>widget</code> field
        against <code>src/components/visuals/registry.ts</code>.
      </p>
    );
  }

  const hasTarget = Object.keys(q.target).length > 0;

  return (
    <div class="manipulable">
      {hasTarget ? (
        <p class="choices-note">
          Move the controls until you match the question, then press Check.
        </p>
      ) : null}
      <Visual
        config={q.config}
        value={value}
        onChange={setValue}
        target={hasTarget ? q.target : undefined}
        readOnly={locked}
        revealTarget={locked && !verdict?.correct}
      />
    </div>
  );
}

/** Compare every key in the target against what the student set. */
function gradeManipulable(q: QManipulable, v: Record<string, number>) {
  const keys = Object.keys(q.target);
  if (!keys.length) {
    // No target — this is an exploration task, so simply doing it counts.
    return verdictOf(true);
  }
  const hits = keys.filter((k) => {
    const want = Number(q.target[k]);
    const got = Number(v[k]);
    if (!Number.isFinite(want) || !Number.isFinite(got)) return false;
    return Math.abs(got - want) <= q.tolerance + 1e-9;
  });
  const correct = hits.length === keys.length;
  return {
    correct,
    score: keys.length ? hits.length / keys.length : 0,
    ...(correct ? {} : { detail: `${hits.length} of ${keys.length} values matched` }),
  };
}

export const manipulableModule: WidgetModule<QManipulable, Record<string, number>> = {
  init: (q) => ({ ...(VISUAL_DEFAULTS[q.widget] ?? {}), ...(q.config.start ?? {}) }),
  isAnswered: () => true,   // the controls always hold some value
  grade: gradeManipulable,
  Widget: ManipulableWidget,
};
