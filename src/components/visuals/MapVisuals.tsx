/* ==========================================================================
   INTERACTIVE VISUALS — maps
     bearing   drag a pointer round a compass; shows the three-figure bearing,
               and (optionally) how far East/West and North/South a journey
               of a given distance goes
   ========================================================================== */

import { useRef } from 'preact/hooks';
import { Slider, Readout, Stage, useSvgDrag, formatNumber, type VisualProps } from './kit';

/** 47 → "047°" */
export const threeFigure = (deg: number) => `${String(Math.round(((deg % 360) + 360) % 360)).padStart(3, '0')}°`;

export function Bearing({ config, value, onChange, target, readOnly, revealTarget }: VisualProps) {
  const step = config.step ?? 1;
  const distance: number | undefined = config.distance;   // e.g. 100 (km)
  const unit = config.unit ?? 'km';
  const svgRef = useRef<SVGSVGElement>(null);

  const b = (((value.b ?? 0) % 360) + 360) % 360;
  const cx = 160, cy = 150, R = 110;
  const rad = (d: number) => (d * Math.PI) / 180;
  // Bearings go clockwise from North, so x = sin, y = −cos.
  const tip = (d: number, r = R) => [cx + r * Math.sin(rad(d)), cy - r * Math.cos(rad(d))] as const;
  const [tx, ty] = tip(b);

  const drag = useSvgDrag(svgRef, (x, y) => {
    if (readOnly) return;
    let d = (Math.atan2(x - cx, cy - y) * 180) / Math.PI;
    if (d < 0) d += 360;
    onChange({ ...value, b: Math.round(d / step) * step % 360 });
  });

  // The arc showing the angle turned from North.
  const [ax, ay] = tip(b, 34);
  const arc = b === 0 ? '' : `M${cx} ${cy - 34} A34 34 0 ${b > 180 ? 1 : 0} 1 ${ax} ${ay}`;

  const east = distance ? distance * Math.sin(rad(b)) : 0;
  const north = distance ? distance * Math.cos(rad(b)) : 0;

  const ticks = Array.from({ length: 36 }, (_, i) => i * 10);

  return (
    <div class="visual">
      <Stage viewBox="0 0 320 300" svgRef={svgRef} class="stage stage-grab" {...drag}
        label={`A compass with a pointer on a bearing of ${threeFigure(b)}`}>
        <circle cx={cx} cy={cy} r={R} class="fig-fill fig-stroke" />
        {ticks.map((t) => {
          const [x1, y1] = tip(t, R - (t % 90 === 0 ? 14 : 6));
          const [x2, y2] = tip(t, R);
          return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} class="fig-stroke" />;
        })}
        <g class="fig-label" aria-hidden="true">
          <text x={cx} y={cy - R - 10} text-anchor="middle" font-weight="700">N</text>
          <text x={cx + R + 12} y={cy + 5} text-anchor="middle">E</text>
          <text x={cx} y={cy + R + 22} text-anchor="middle">S</text>
          <text x={cx - R - 12} y={cy + 5} text-anchor="middle">W</text>
        </g>

        {/* North line and the turned angle */}
        <line x1={cx} y1={cy} x2={cx} y2={cy - R} class="fig-edge" stroke-dasharray="4 4" />
        {arc && <path d={arc} class="fig-edge fig-edge-hyp" fill="none" />}

        {/* Target ghost, when this is a question */}
        {target && revealTarget && (() => {
          const [gx, gy] = tip(target.b ?? 0);
          return <line x1={cx} y1={cy} x2={gx} y2={gy} class="fig-edge" stroke-dasharray="6 5" opacity="0.6" />;
        })()}

        {/* Journey components */}
        {distance ? (
          <g>
            <line x1={cx} y1={cy} x2={tx} y2={cy} class="fig-edge" stroke-dasharray="3 4" opacity="0.7" />
            <line x1={tx} y1={cy} x2={tx} y2={ty} class="fig-edge" stroke-dasharray="3 4" opacity="0.7" />
          </g>
        ) : null}

        <line x1={cx} y1={cy} x2={tx} y2={ty} class="fig-edge fig-edge-hyp" stroke-width="3" />
        <circle cx={cx} cy={cy} r="4" class="fig-dot" />
        <circle cx={tx} cy={ty} r="12" class={`fig-knob ${readOnly ? 'is-locked' : ''}`} />
      </Stage>

      <div class="controls">
        <Slider id={`bearing-${config.id ?? 'b'}`} label="Bearing (clockwise from North)" value={b}
          min={0} max={359} step={step} suffix="°" disabled={readOnly}
          onInput={(v) => onChange({ ...value, b: v })} />
      </div>

      <Readout rows={[
        { label: 'Three-figure bearing', value: threeFigure(b), strong: true },
        { label: 'Back bearing (the return trip)', value: threeFigure(b + 180) },
        ...(distance ? [
          { label: east >= 0 ? 'Distance East' : 'Distance West', value: `${formatNumber(Math.abs(east), 1)} ${unit}` },
          { label: north >= 0 ? 'Distance North' : 'Distance South', value: `${formatNumber(Math.abs(north), 1)} ${unit}` },
        ] : []),
      ]} />
    </div>
  );
}
