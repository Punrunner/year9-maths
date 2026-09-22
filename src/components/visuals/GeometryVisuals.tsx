/* ==========================================================================
   INTERACTIVE VISUALS — measurement and geometry
     pythagoras      drag the corners of a right-angled triangle
     prism           change the dimensions of a cuboid
     polygon-angles  change the number of sides of a regular polygon
     enlargement     move the centre and change the scale factor
   ========================================================================== */

import { useRef } from 'preact/hooks';
import { Slider, Readout, Stage, useSvgDrag, snap, formatNumber, type VisualProps } from './kit';

const W = 360, H = 260;

/* ==========================================================================
   Pythagoras' theorem
   ========================================================================== */

export function Pythagoras({ config, value, onChange, target, readOnly }: VisualProps) {
  const min = config.min ?? 1, max = config.max ?? 10, step = config.step ?? 1;
  const unit = config.unit ?? 'cm';
  const svgRef = useRef<SVGSVGElement>(null);

  const a = value.a ?? 3;   // vertical leg
  const b = value.b ?? 4;   // horizontal leg
  const c = Math.sqrt(a * a + b * b);

  // Right angle sits at B. 20 px per unit, so 10 units = 200 px.
  const px = 20;
  const Bx = 60, By = 220;
  const Ax = Bx, Ay = By - a * px;
  const Cx = Bx + b * px, Cy = By;

  const dragA = useSvgDrag(svgRef, (_x, y) => {
    if (readOnly) return;
    onChange({ ...value, a: snap((By - y) / px, min, max, step) });
  });
  const dragC = useSvgDrag(svgRef, (x) => {
    if (readOnly) return;
    onChange({ ...value, b: snap((x - Bx) / px, min, max, step) });
  });

  const nudge = (key: 'a' | 'b', delta: number) =>
    onChange({ ...value, [key]: snap((value[key] ?? (key === 'a' ? 3 : 4)) + delta, min, max, step) });

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${W} 250`} svgRef={svgRef}
        label={`A right-angled triangle with sides ${a} and ${b} ${unit} and hypotenuse ${formatNumber(c)} ${unit}`}>
        <polygon points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`} class="fig-fill" />
        <path d={`M${Bx} ${By - 18} L${Bx + 18} ${By - 18} L${Bx + 18} ${By}`} class="fig-stroke" fill="none" />

        <line x1={Ax} y1={Ay} x2={Bx} y2={By} class="fig-edge" />
        <line x1={Bx} y1={By} x2={Cx} y2={Cy} class="fig-edge" />
        <line x1={Ax} y1={Ay} x2={Cx} y2={Cy} class="fig-edge fig-edge-hyp" />

        {/* draggable corners */}
        <circle cx={Ax} cy={Ay} r="12" class={`fig-knob ${readOnly ? 'is-locked' : ''}`} {...dragA} />
        <circle cx={Cx} cy={Cy} r="12" class={`fig-knob ${readOnly ? 'is-locked' : ''}`} {...dragC} />

        <g class="fig-label" aria-hidden="true">
          <text x={Bx - 12} y={(Ay + By) / 2} text-anchor="end">{a} {unit}</text>
          <text x={(Bx + Cx) / 2} y={By + 22} text-anchor="middle">{b} {unit}</text>
          <text x={(Ax + Cx) / 2 + 10} y={(Ay + Cy) / 2 - 8}>{formatNumber(c)} {unit}</text>
        </g>
      </Stage>

      <div class="controls">
        <Slider id="pyth-a" label={`Height, a (${unit})`} value={a} min={min} max={max} step={step}
          disabled={readOnly} onInput={(v) => onChange({ ...value, a: v })} />
        <Slider id="pyth-b" label={`Base, b (${unit})`} value={b} min={min} max={max} step={step}
          disabled={readOnly} onInput={(v) => onChange({ ...value, b: v })} />
        <p class="sr-only">
          <button type="button" onClick={() => nudge('a', step)}>Increase height</button>
          <button type="button" onClick={() => nudge('b', step)}>Increase base</button>
        </p>
      </div>

      <Readout rows={[
        { label: 'a² + b²', value: `${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}` },
        { label: 'c², so c', value: `√${a * a + b * b} = ${formatNumber(c, 3)} ${unit}`, strong: true },
        ...(target ? [{ label: 'Target hypotenuse', value: `${formatNumber(target.c ?? 0)} ${unit}` }] : []),
      ]} />
    </div>
  );
}

/* ==========================================================================
   Cuboid — volume and surface area
   ========================================================================== */

export function Prism({ config, value, onChange, readOnly }: VisualProps) {
  const unit = config.unit ?? 'cm';
  const l = value.l ?? 6, w = value.w ?? 3, h = value.h ?? 4;

  // A simple oblique projection so the depth is visible.
  const s = 16;
  const ox = 70, oy = 190;
  const dx = w * s * 0.55, dy = -w * s * 0.42;
  const front = [[ox, oy], [ox + l * s, oy], [ox + l * s, oy - h * s], [ox, oy - h * s]];
  const pt = (p: number[]) => `${p[0]},${p[1]}`;

  const volume = l * w * h;
  const surface = 2 * (l * w + l * h + w * h);

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${W} ${H}`} label={`A cuboid ${l} by ${w} by ${h} ${unit}`}>
        {/* top face */}
        <polygon class="fig-fill-strong fig-stroke" points={
          `${pt(front[3]!)} ${pt([front[3]![0] + dx, front[3]![1] + dy])} ${pt([front[2]![0] + dx, front[2]![1] + dy])} ${pt(front[2]!)}`
        } />
        {/* side face */}
        <polygon class="fig-fill fig-stroke" points={
          `${pt(front[2]!)} ${pt([front[2]![0] + dx, front[2]![1] + dy])} ${pt([front[1]![0] + dx, front[1]![1] + dy])} ${pt(front[1]!)}`
        } />
        {/* front face */}
        <polygon class="fig-fill fig-stroke" points={front.map(pt).join(' ')} />

        <g class="fig-label" aria-hidden="true">
          <text x={ox + (l * s) / 2} y={oy + 20} text-anchor="middle">{l} {unit}</text>
          <text x={ox - 10} y={oy - (h * s) / 2} text-anchor="end">{h} {unit}</text>
          <text x={ox + l * s + dx / 2 + 12} y={oy + dy / 2 - 4}>{w} {unit}</text>
        </g>
      </Stage>

      <div class="controls controls-3">
        <Slider id="pr-l" label={`Length (${unit})`} value={l} min={1} max={10} step={1}
          disabled={readOnly} onInput={(v) => onChange({ ...value, l: v })} />
        <Slider id="pr-w" label={`Width (${unit})`} value={w} min={1} max={8} step={1}
          disabled={readOnly} onInput={(v) => onChange({ ...value, w: v })} />
        <Slider id="pr-h" label={`Height (${unit})`} value={h} min={1} max={8} step={1}
          disabled={readOnly} onInput={(v) => onChange({ ...value, h: v })} />
      </div>

      <Readout rows={[
        { label: 'Volume = l × w × h', value: `${l} × ${w} × ${h} = ${volume} ${unit}³`, strong: true },
        { label: 'Surface area = 2(lw + lh + wh)', value: `${surface} ${unit}²` },
      ]} />
    </div>
  );
}

/* ==========================================================================
   Regular polygon — interior and exterior angles
   ========================================================================== */

export function PolygonAngles({ config, value, onChange, readOnly }: VisualProps) {
  const n = Math.round(value.n ?? 5);
  // config.inscribed: draw the circle the polygon sits in, and its radii.
  const inscribed = !!config.inscribed;
  const cx = 180, cy = 128, r = 88;

  const points = Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  });

  const sum = (n - 2) * 180;
  const interior = sum / n;
  const exterior = 360 / n;
  const names: Record<number, string> = {
    3: 'triangle', 4: 'square', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon',
    8: 'octagon', 9: 'nonagon', 10: 'decagon', 11: 'hendecagon', 12: 'dodecagon',
  };

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${W} 250`} label={`A regular ${names[n] ?? `${n}-sided polygon`}`}>
        {inscribed && <circle cx={cx} cy={cy} r={r} class="fig-stroke" fill="none" />}
        <polygon points={points.map((p) => `${p[0]!.toFixed(1)},${p[1]!.toFixed(1)}`).join(' ')}
          class="fig-fill fig-stroke" />
        {inscribed && points.map((p, i) => (
          <line key={`r${i}`} x1={cx} y1={cy} x2={p[0]} y2={p[1]} class="fig-stroke" stroke-dasharray="3 4" />
        ))}
        {points.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="4" class="fig-vertex" />
        ))}
        {!inscribed && <text x={cx} y={cy + 6} text-anchor="middle" class="fig-label">{n} sides</text>}
      </Stage>

      <div class="controls">
        <Slider id="poly-n" label="Number of sides" value={n} min={3} max={12} step={1}
          disabled={readOnly} onInput={(v) => onChange({ ...value, n: v })} />
      </div>

      <Readout rows={[
        { label: 'Name', value: names[n] ?? `${n}-sided polygon` },
        { label: 'Interior angle sum = (n − 2) × 180°', value: `(${n} − 2) × 180° = ${sum}°`, strong: true },
        { label: 'Each interior angle', value: `${formatNumber(interior, 1)}°` },
        { label: 'Each exterior angle = 360° ÷ n', value: `${formatNumber(exterior, 1)}°` },
        ...(inscribed ? [{ label: 'Angle at the centre = 360° ÷ n', value: `${formatNumber(exterior, 1)}°` }] : []),
      ]} />
    </div>
  );
}

/* ==========================================================================
   Enlargement
   ========================================================================== */

export function Enlargement({ config, value, onChange, readOnly }: VisualProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const k = value.k ?? 2;
  const ox = value.ox ?? 1, oy = value.oy ?? 1;   // centre, in grid units

  const g = 22;                                    // pixels per grid square
  const X = (x: number) => 30 + x * g;
  const Y = (y: number) => 230 - y * g;

  // The object: a fixed triangle in grid coordinates.
  const object: Array<[number, number]> = config.object ?? [[2, 2], [4, 2], [2, 5]];
  const image = object.map(([x, y]) => [ox + k * (x - ox), oy + k * (y - oy)] as [number, number]);

  const drag = useSvgDrag(svgRef, (px, py) => {
    if (readOnly) return;
    onChange({ ...value, ox: snap((px - 30) / g, 0, 13, 1), oy: snap((230 - py) / g, 0, 9, 1) });
  });

  const poly = (pts: Array<[number, number]>) =>
    pts.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ');

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${W} 250`} svgRef={svgRef}
        label={`A triangle enlarged by scale factor ${k} from the point (${ox}, ${oy})`}>
        <g class="fig-grid" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => <line key={`v${i}`} x1={X(i)} y1={Y(0)} x2={X(i)} y2={Y(9)} />)}
          {Array.from({ length: 10 }, (_, i) => <line key={`h${i}`} x1={X(0)} y1={Y(i)} x2={X(13)} y2={Y(i)} />)}
        </g>

        {/* rays from the centre through each vertex */}
        {object.map((_pt, i) => (
          <line key={i} x1={X(ox)} y1={Y(oy)} x2={X(image[i]![0])} y2={Y(image[i]![1])} class="fig-ray" />
        ))}

        <polygon points={poly(image)} class="fig-fill fig-stroke fig-image" />
        <polygon points={poly(object)} class="fig-fill-strong fig-stroke" />

        <circle cx={X(ox)} cy={Y(oy)} r="11" class={`fig-knob ${readOnly ? 'is-locked' : ''}`} {...drag} />
        <text x={X(ox) + 16} y={Y(oy) - 12} class="fig-label" aria-hidden="true">centre</text>
      </Stage>

      <div class="controls controls-3">
        <Slider id="enl-k" label="Scale factor" value={k} min={0.5} max={3} step={0.5}
          disabled={readOnly} onInput={(v) => onChange({ ...value, k: v })} />
        <Slider id="enl-x" label="Centre, x" value={ox} min={0} max={13} step={1}
          disabled={readOnly} onInput={(v) => onChange({ ...value, ox: v })} />
        <Slider id="enl-y" label="Centre, y" value={oy} min={0} max={9} step={1}
          disabled={readOnly} onInput={(v) => onChange({ ...value, oy: v })} />
      </div>

      <Readout rows={[
        { label: 'Scale factor', value: `${formatNumber(k)}`, strong: true },
        { label: 'Centre of enlargement', value: `(${ox}, ${oy})` },
        { label: 'Lengths', value: `every length is ${formatNumber(k)} times as long` },
        { label: 'Area', value: `the area is ${formatNumber(k * k)} times as big` },
      ]} />
    </div>
  );
}
