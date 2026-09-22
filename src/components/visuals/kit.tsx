/* ==========================================================================
   VISUALS KIT
   --------------------------------------------------------------------------
   Shared pieces for the interactive diagrams: the props every visual takes,
   an accessible slider, a readout panel, and a helper that turns a pointer
   position into SVG coordinates (so dragging works with a mouse, a finger
   or a stylus — all through Pointer Events).
   ========================================================================== */

import { useRef, useCallback } from 'preact/hooks';
import type { RefObject } from 'preact';

/** Every interactive visual takes the same props, whether it is used as a
 *  teaching aid in a lesson or as a "match the target" question. */
export interface VisualProps {
  /** Fixed settings from the lesson or question, e.g. ranges and labels. */
  config: Record<string, any>;
  /** The values the student controls. */
  value: Record<string, number>;
  onChange: (v: Record<string, number>) => void;
  /** When present, drawn as a faint "ghost" the student is trying to match. */
  target?: Record<string, number>;
  /** True once the answer is checked — controls stop responding. */
  readOnly?: boolean;
  /** Reveal the target outright (after checking). */
  revealTarget?: boolean;
}

/* --------------------------------------------------------------------------
   Slider — a real range input, so it is keyboard and screen-reader ready
   -------------------------------------------------------------------------- */

export function Slider({ id, label, value, min, max, step, suffix, onInput, disabled }: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onInput: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <div class="slider">
      <label class="slider-label" for={id}>
        <span class="slider-name">{label}</span>
        <output class="slider-value" for={id}>{formatNumber(value)}{suffix ?? ''}</output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-valuetext={`${formatNumber(value)}${suffix ?? ''}`}
        onInput={(e) => onInput(Number((e.target as HTMLInputElement).value))}
      />
    </div>
  );
}

/** Trim floating-point noise: 2.5000000001 → 2.5, 4 → 4. */
export function formatNumber(n: number, dp = 2): string {
  if (!Number.isFinite(n)) return '—';
  const rounded = Math.round(n * 10 ** dp) / 10 ** dp;
  return String(rounded);
}

/* --------------------------------------------------------------------------
   Readout — the "what the maths says" panel under each diagram
   -------------------------------------------------------------------------- */

export function Readout({ rows }: { rows: Array<{ label: string; value: string; strong?: boolean }> }) {
  return (
    <dl class="readout" aria-live="polite">
      {rows.map((r) => (
        <div class={`readout-row ${r.strong ? 'is-strong' : ''}`} key={r.label}>
          <dt>{r.label}</dt>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* --------------------------------------------------------------------------
   Dragging inside an SVG
   -------------------------------------------------------------------------- */

/**
 * Returns a handler factory for draggable SVG points.
 * `onMove` receives the pointer position in the SVG's own coordinate system.
 */
export function useSvgDrag(
  svgRef: RefObject<SVGSVGElement>,
  onMove: (x: number, y: number) => void,
) {
  const dragging = useRef(false);

  const toLocal = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    // The SVG scales to fit, so map the box back to user units.
    const scale = Math.min(rect.width / vb.width, rect.height / vb.height) || 1;
    const offsetX = (rect.width - vb.width * scale) / 2;
    const offsetY = (rect.height - vb.height * scale) / 2;
    return {
      x: (clientX - rect.left - offsetX) / scale + vb.x,
      y: (clientY - rect.top - offsetY) / scale + vb.y,
    };
  }, [svgRef]);

  const handlers = {
    onPointerDown: (e: PointerEvent) => {
      dragging.current = true;
      (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
      const p = toLocal(e.clientX, e.clientY);
      if (p) onMove(p.x, p.y);
      e.preventDefault();
    },
    onPointerMove: (e: PointerEvent) => {
      if (!dragging.current) return;
      const p = toLocal(e.clientX, e.clientY);
      if (p) onMove(p.x, p.y);
    },
    onPointerUp: (e: PointerEvent) => {
      dragging.current = false;
      (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
    },
    onPointerCancel: () => { dragging.current = false; },
  };

  return handlers;
}

/** Clamp and snap a value to a step. */
export const snap = (v: number, min: number, max: number, step: number) =>
  Math.min(max, Math.max(min, Math.round(v / step) * step));

/** Responsive SVG frame with a label for assistive technology. */
export function Stage({ viewBox, label, svgRef, children, ...rest }: {
  viewBox: string;
  label: string;
  svgRef?: RefObject<SVGSVGElement>;
  children: any;
  [k: string]: unknown;
}) {
  return (
    <svg
      ref={svgRef as any}
      class="stage"
      viewBox={viewBox}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
      {...rest}
    >
      {children}
    </svg>
  );
}
