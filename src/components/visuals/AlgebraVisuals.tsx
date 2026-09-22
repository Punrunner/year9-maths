/* ==========================================================================
   INTERACTIVE VISUALS — algebra
     area-model   (x + a)(x + b) drawn as a rectangle split into four parts
   ========================================================================== */

import { Slider, Readout, Stage, type VisualProps } from './kit';

/** Signed term for display: 5 → "+ 5", -3 → "− 3". */
const signed = (n: number) => (n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`);

/** "3x" / "x" / "−x" / "" for a coefficient of x. */
const xTerm = (n: number) => (n === 0 ? '' : n === 1 ? 'x' : n === -1 ? '−x' : `${n < 0 ? '−' : ''}${Math.abs(n)}x`);

export function AreaModel({ config, value, onChange, readOnly }: VisualProps) {
  const min = config.min ?? 1, max = config.max ?? 8, step = config.step ?? 1;
  const a = value.a ?? 3, b = value.b ?? 2;

  // x is drawn as a fixed length; a and b are drawn to a smaller scale so the
  // picture always fits. Only positive a, b make sense as areas.
  const X = 150, unit = 12;
  const ox = 40, oy = 20;
  const wa = Math.max(0, a) * unit, hb = Math.max(0, b) * unit;
  const W = ox + X + wa + 30, H = oy + X + hb + 30;

  const sum = a + b, prod = a * b;
  const expanded = `x² ${sum === 0 ? '' : `${sum < 0 ? '−' : '+'} ${xTerm(Math.abs(sum))} `}${signed(prod)}`;

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${Math.max(W, 280)} ${Math.max(H, 220)}`}
        label={`A rectangle x plus ${a} wide and x plus ${b} tall, split into x squared, ${a}x, ${b}x and ${prod}`}>
        {/* x² */}
        <rect x={ox} y={oy + hb} width={X} height={X} class="fig-fill-strong fig-stroke" />
        {/* a·x (right strip) */}
        <rect x={ox + X} y={oy + hb} width={wa} height={X} class="fig-fill fig-stroke" />
        {/* b·x (top strip) */}
        <rect x={ox} y={oy} width={X} height={hb} class="fig-fill fig-stroke" />
        {/* a·b corner */}
        <rect x={ox + X} y={oy} width={wa} height={hb} class="fig-fill-strong fig-stroke" />

        <g class="fig-label" aria-hidden="true">
          <text x={ox + X / 2} y={oy + hb + X / 2 + 6} text-anchor="middle">x²</text>
          {wa > 18 && <text x={ox + X + wa / 2} y={oy + hb + X / 2 + 6} text-anchor="middle">{a}x</text>}
          {hb > 14 && <text x={ox + X / 2} y={oy + hb / 2 + 5} text-anchor="middle">{b}x</text>}
          {wa > 18 && hb > 14 && <text x={ox + X + wa / 2} y={oy + hb / 2 + 5} text-anchor="middle">{prod}</text>}
          {/* edge labels */}
          <text x={ox + X / 2} y={oy + hb + X + 20} text-anchor="middle">x</text>
          <text x={ox + X + wa / 2} y={oy + hb + X + 20} text-anchor="middle">{a}</text>
          <text x={ox - 10} y={oy + hb + X / 2 + 5} text-anchor="end">x</text>
          <text x={ox - 10} y={oy + hb / 2 + 5} text-anchor="end">{b}</text>
        </g>
      </Stage>

      <div class="controls">
        <Slider id="area-a" label="a (added to the width)" value={a} min={min} max={max} step={step}
          disabled={readOnly} onInput={(v) => onChange({ ...value, a: v })} />
        <Slider id="area-b" label="b (added to the height)" value={b} min={min} max={max} step={step}
          disabled={readOnly} onInput={(v) => onChange({ ...value, b: v })} />
      </div>

      <Readout rows={[
        { label: 'Product', value: `(x ${signed(a)})(x ${signed(b)})` },
        { label: 'Four parts', value: `x² ${signed(a)}x ${signed(b)}x ${signed(prod)}` },
        { label: 'Simplified', value: expanded, strong: true },
      ]} />
    </div>
  );
}
