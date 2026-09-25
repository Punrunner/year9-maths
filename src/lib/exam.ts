/* ==========================================================================
   EXAM QUESTION PREPARATION (build time)
   --------------------------------------------------------------------------
   Turns the structured questions in src/content/exam/ into browser-ready
   HTML, the same way render.ts does for ordinary questions.
   ========================================================================== */

import { renderInline } from './render';
import type {
  ExamAnswerLine, PreparedExamLeaf, PreparedExamPart, PreparedExamQuestion,
} from './types';

function prepareLeaf(raw: any, key: string, parentLabel: string, where: string): PreparedExamLeaf {
  const label = `(${raw.label})`;
  const lines: ExamAnswerLine[] = raw.answerLines
    ? raw.answerLines.map((prefix: string, i: number) => ({
        prefixHtml: renderInline(prefix, where),
        suffixHtml: '',
        ...(raw.checks?.[i] ? { check: raw.checks[i] } : {}),
      }))
    : [{
        prefixHtml: renderInline(raw.answerPrefix, where),
        suffixHtml: renderInline(raw.answerSuffix, where),
        ...(raw.check ? { check: raw.check } : {}),
      }];

  return {
    key: `${key}/${raw.label}`,
    label,
    fullLabel: `${parentLabel}${label}`,
    promptHtml: renderInline(raw.prompt, where),
    marks: raw.marks,
    lines,
    anyOrder: raw.anyOrder ?? false,
    answerHtml: renderInline(raw.answer, where),
    ...(raw.qualifier ? { qualifier: raw.qualifier } : {}),
    partialHtml: (raw.partial ?? []).map((p: string) =>
      // Bold the mark code at the start, as Cambridge does: **M1** for …
      renderInline(p, where).replace(/^((?:[MABS]C?\d|SC\d)(?:\s*,\s*[MAB]\d)*)\b/, '<strong>$1</strong>')),
  };
}

export function prepareExamQuestion(
  raw: any, topicId: string, topicTitle: string,
): PreparedExamQuestion {
  const id = `${topicId}/${raw.id}`;
  const where = `exam/${id}`;

  const parts: PreparedExamPart[] = raw.parts.map((p: any): PreparedExamPart =>
    Array.isArray(p.parts)
      ? {
          kind: 'group',
          label: `(${p.label})`,
          promptHtml: renderInline(p.prompt, where),
          leaves: p.parts.map((l: any) => prepareLeaf(l, `${id}/${p.label}`, `(${p.label})`, where)),
        }
      : { kind: 'leaf', leaf: prepareLeaf(p, id, '', where) });

  const leaves = parts.flatMap((p) => (p.kind === 'leaf' ? [p.leaf] : p.leaves));

  return {
    id,
    topicId: raw.section ? `section:${raw.section}` : topicId,
    topicTitle: raw.section ?? topicTitle,
    calculator: raw.calculator ?? 'either',
    difficulty: raw.difficulty ?? 'core',
    stemHtml: renderInline(raw.stem, where),
    parts,
    marks: leaves.reduce((n, l) => n + l.marks, 0),
    needsReview: raw.needsReview ?? false,
  };
}

