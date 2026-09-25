/* ==========================================================================
   LESSON BODY WITH INLINE ACTIVITIES
   --------------------------------------------------------------------------
   A lesson's Markdown can contain lines like

       [[activity: sort-numbers]]

   wherever an activity should appear. This splits the Markdown at those
   markers and renders each piece of prose with the same Markdown settings the
   rest of the site uses (tables, $maths$ …), so the lesson page can place a
   live activity between the paragraphs.
   ========================================================================== */

import { createMarkdownProcessor, type MarkdownProcessor } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export type BodyPart =
  | { kind: 'html'; html: string }
  | { kind: 'activity'; id: string };

const MARKER = /^[ \t]*\[\[\s*activity\s*:\s*([\w-]+)\s*\]\][ \t]*$/gm;

let processor: Promise<MarkdownProcessor> | undefined;
const getProcessor = () =>
  (processor ??= createMarkdownProcessor({
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { throwOnError: false, strict: false }]],
  }));

/** Split and render. Throws a clear error if a marker names a missing activity. */
export async function renderLessonBody(
  markdown: string,
  activityIds: string[],
  lessonId: string,
): Promise<BodyPart[]> {
  const md = await getProcessor();
  const parts: BodyPart[] = [];
  const known = new Set(activityIds);

  let last = 0;
  for (const m of markdown.matchAll(MARKER)) {
    const id = m[1]!;
    if (!known.has(id)) {
      throw new Error(
        `Lesson "${lessonId}" has [[activity: ${id}]] in its text, but no activity called ` +
        `"${id}" under activities: in its frontmatter.`,
      );
    }
    const prose = markdown.slice(last, m.index);
    if (prose.trim()) parts.push({ kind: 'html', html: (await md.render(prose)).code });
    parts.push({ kind: 'activity', id });
    last = m.index! + m[0].length;
  }
  const rest = markdown.slice(last);
  if (rest.trim()) parts.push({ kind: 'html', html: (await md.render(rest)).code });
  return parts;
}
