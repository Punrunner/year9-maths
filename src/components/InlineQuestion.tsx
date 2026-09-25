/* ==========================================================================
   INLINE QUESTION
   --------------------------------------------------------------------------
   One question sitting in the middle of the lesson text — "Predict first",
   "Quick check", "Your turn". It uses the same engine as the practice set,
   so every one of the 15 question types works here too.
   ========================================================================== */

import Exercise from './exercises/Exercise';
import type { PreparedQuestion } from '../lib/types';

export interface InlineQuestionProps {
  label: string;
  question: PreparedQuestion;
}

export default function InlineQuestion({ label, question }: InlineQuestionProps) {
  return (
    <aside class="inline-activity" aria-label={label}>
      <span class="inline-activity-tag">{label}</span>
      <Exercise q={question} bare />
    </aside>
  );
}
