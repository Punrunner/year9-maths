/* ==========================================================================
   LESSON VISUAL
   --------------------------------------------------------------------------
   Wraps one interactive diagram as a free-exploration teaching aid: no target
   to match and no marking, just something to play with while reading.
   ========================================================================== */

import { useState } from 'preact/hooks';
import { VISUALS, VISUAL_DEFAULTS, VISUAL_TITLES } from './visuals/registry';

export interface LessonVisualProps {
  widget: string;
  title?: string;
  captionHtml?: string;
  config?: Record<string, unknown>;
}

export default function LessonVisual({ widget, title, captionHtml, config = {} }: LessonVisualProps) {
  const Visual = VISUALS[widget];
  const initial = () => ({ ...(VISUAL_DEFAULTS[widget] ?? {}), ...((config as any).start ?? {}) });
  const [value, setValue] = useState<Record<string, number>>(initial);

  if (!Visual) {
    return (
      <p class="widget-missing">
        No interactive called <code>{widget}</code>. Check the name against
        <code>src/components/visuals/registry.ts</code>.
      </p>
    );
  }

  return (
    <figure class="lesson-visual card">
      <figcaption class="lesson-visual-head">
        <span class="lesson-visual-tag">Try it</span>
        <h4>{title ?? VISUAL_TITLES[widget] ?? 'Interactive'}</h4>
      </figcaption>

      <Visual config={config as Record<string, any>} value={value} onChange={setValue} />

      {captionHtml ? (
        <p class="lesson-visual-caption" dangerouslySetInnerHTML={{ __html: captionHtml }} />
      ) : null}

      <button
        type="button"
        class="btn btn-ghost btn-sm"
        onClick={() => setValue(initial())}
      >
        Reset
      </button>
    </figure>
  );
}
