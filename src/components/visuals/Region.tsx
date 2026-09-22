/* ==========================================================================
   CLICKABLE SVG REGION
   --------------------------------------------------------------------------
   The shared building block for every "click the diagram" question.
   A region is a real button as far as the keyboard and screen readers are
   concerned: it can be tabbed to, activated with Enter or Space, and it
   announces its own label.
   ========================================================================== */

import type { ComponentChildren } from 'preact';

export interface RegionProps {
  id: string;
  /** Read out by a screen reader, e.g. "the longest side". */
  label: string;
  selected: boolean;
  /** Set once the answer has been checked. */
  state?: 'right' | 'wrong' | null;
  disabled?: boolean;
  onSelect: (id: string) => void;
  /** The shape(s) that make up the clickable area. */
  children: ComponentChildren;
}

export function Region({ id, label, selected, state = null, disabled = false, onSelect, children }: RegionProps) {
  const cls = [
    'hs-region',
    selected ? 'is-selected' : '',
    state ? `is-${state}` : '',
    disabled ? 'is-locked' : '',
  ].filter(Boolean).join(' ');

  return (
    <g
      class={cls}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-pressed={selected}
      aria-disabled={disabled}
      onClick={() => !disabled && onSelect(id)}
      onKeyDown={(e: KeyboardEvent) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(id); }
      }}
    >
      {children}
    </g>
  );
}

/** Shared props handed to every figure. */
export interface FigureProps {
  config: Record<string, any>;
  selected: string | null;
  onSelect: (id: string) => void;
  locked: boolean;
  /** Which region ids count as correct — used to mark up after checking. */
  correct: string[];
}
