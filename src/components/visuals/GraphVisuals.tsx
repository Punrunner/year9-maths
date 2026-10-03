/* ==========================================================================
   INTERACTIVE VISUALS — graphs
     line-mc      sliders for gradient m and intercept c
     parabola     sliders for a, b and c in y = ax^2 + bx + c
     number-line  drag a marker along a number line
     line-curve   a line meeting a parabola or circle, with the discriminant
   ========================================================================== */

import { useRef } from 'preact/hooks';
import { Slider, Readout, Stage, useSvgDrag, snap, formatNumber, type VisualProps } from './kit';

/* --------------------------------------------------------------------------
   Shared plotting helpers
   -------------------------------------------------------------------------- */

const W = 360, H = 260;

/** Build a mapper from maths coordinates to SVG coordinates. */
function plotter(xMin: number, xMax: number, yMin: number, yMax: number) {
  const padL = 34, padR = 14, padT = 14, padB = 30;
  const sx = (W - padL - padR) / (xMax - xMin);
  const sy = (H - padT - padB) / (yMax - yMin);
  return {
    X: (x: number) => padL + (x - xMin) * sx,
    Y: (y: number) => H - padB - (y - yMin) * sy,
    xMin, xMax, yMin, yMax,
  };
}

function Grid({ p, xStep = 1, yStep = 2 }: { p: ReturnType<typeof plotter>; xStep?: number; yStep?: number }) {
  const xs: number[] = [], ys: number[] = [];
  for (let x = Math.ceil(p.xMin); x <= p.xMax; x += xStep) xs.push(x);
  for (let y = Math.ceil(p.yMin / yStep) * yStep; y <= p.yMax; y += yStep) ys.push(y);

  return (
    <g aria-hidden="true">
      <g class="fig-grid">
        {xs.map((x) => <line key={`v${x}`} x1={p.X(x)} y1={p.Y(p.yMin)} x2={p.X(x)} y2={p.Y(p.yMax)} />)}
        {ys.map((y) => <line key={`h${y}`} x1={p.X(p.xMin)} y1={p.Y(y)} x2={p.X(p.xMax)} y2={p.Y(y)} />)}
      </g>
      <g class="fig-axis">
        <line x1={p.X(p.xMin)} y1={p.Y(0)} x2={p.X(p.xMax)} y2={p.Y(0)} />
        <line x1={p.X(0)} y1={p.Y(p.yMin)} x2={p.X(0)} y2={p.Y(p.yMax)} />
      </g>
      <g class="fig-tick">
        {xs.filter((x) => x !== 0).map((x) => (
          <text key={`tx${x}`} x={p.X(x)} y={p.Y(0) + 14} text-anchor="middle">{x}</text>
        ))}
        {ys.filter((y) => y !== 0).map((y) => (
          <text key={`ty${y}`} x={p.X(0) - 6} y={p.Y(y) + 4} text-anchor="end">{y}</text>
        ))}
      </g>
    </g>
  );
}

/* ==========================================================================
   y = mx + c
   ========================================================================== */

export function LineMC({ config, value, onChange, target, readOnly, revealTarget }: VisualProps) {
  const mMin = config.mMin ?? -5, mMax = config.mMax ?? 5, mStep = config.mStep ?? 0.5;
  const cMin = config.cMin ?? -6, cMax = config.cMax ?? 6, cStep = config.cStep ?? 1;
  const p = plotter(-6, 6, -8, 8);

  const m = value.m ?? 1;
  const c = value.c ?? 0;

  // Clip the line to the visible box.
  const seg = (mm: number, cc: number) => {
    const y1 = mm * p.xMin + cc, y2 = mm * p.xMax + cc;
    return { x1: p.X(p.xMin), y1: p.Y(Math.max(p.yMin, Math.min(p.yMax, y1))),
             x2: p.X(p.xMax), y2: p.Y(Math.max(p.yMin, Math.min(p.yMax, y2))) };
  };
  const line = seg(m, c);
  const ghost = target ? seg(target.m ?? 0, target.c ?? 0) : null;

  const sign = c < 0 ? '−' : '+';
  const equation = `y = ${formatNumber(m)}x ${sign} ${formatNumber(Math.abs(c))}`;

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${W} ${H}`} label={`A graph showing the line ${equation}`}>
        <Grid p={p} />
        {ghost ? (
          <line x1={ghost.x1} y1={ghost.y1} x2={ghost.x2} y2={ghost.y2}
            class={`fig-line fig-ghost ${revealTarget ? 'is-revealed' : ''}`} />
        ) : null}
        <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} class="fig-line" />
        <circle cx={p.X(0)} cy={p.Y(c)} r="5" class="fig-vertex" />
      </Stage>

      <div class="controls">
        <Slider id="line-m" label="Gradient, m" value={m} min={mMin} max={mMax} step={mStep}
          disabled={readOnly} onInput={(v) => onChange({ ...value, m: v })} />
        <Slider id="line-c" label="y-intercept, c" value={c} min={cMin} max={cMax} step={cStep}
          disabled={readOnly} onInput={(v) => onChange({ ...value, c: v })} />
      </div>

      <Readout rows={[
        { label: 'Equation', value: equation, strong: true },
        { label: 'Crosses the y-axis at', value: `(0, ${formatNumber(c)})` },
        { label: 'For every 1 across', value: `${formatNumber(m)} up` },
      ]} />
    </div>
  );
}

/* ==========================================================================
   y = ax^2 + bx + c
   ========================================================================== */

export function Parabola({ value, onChange, target, readOnly, revealTarget }: VisualProps) {
  const p = plotter(-6, 6, -8, 10);
  const a = value.a ?? 1, b = value.b ?? 0, c = value.c ?? 0;

  const path = (aa: number, bb: number, cc: number) => {
    const pts: string[] = [];
    for (let x = p.xMin; x <= p.xMax; x += 0.1) {
      const y = aa * x * x + bb * x + cc;
      if (y < p.yMin - 2 || y > p.yMax + 2) { pts.push(''); continue; }
      pts.push(`${pts.length && pts[pts.length - 1] !== '' ? 'L' : 'M'}${p.X(x).toFixed(1)} ${p.Y(y).toFixed(1)}`);
    }
    return pts.filter(Boolean).join(' ');
  };

  const disc = b * b - 4 * a * c;
  const vx = a !== 0 ? -b / (2 * a) : 0;
  const vy = a * vx * vx + b * vx + c;
  const roots = a === 0 ? 'not a quadratic'
    : disc < 0 ? 'no real roots'
    : disc === 0 ? `one root at x = ${formatNumber(vx)}`
    : `x = ${formatNumber((-b - Math.sqrt(disc)) / (2 * a))} and x = ${formatNumber((-b + Math.sqrt(disc)) / (2 * a))}`;

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${W} ${H}`} label="A graph of a quadratic curve">
        <Grid p={p} />
        {target ? (
          <path d={path(target.a ?? 1, target.b ?? 0, target.c ?? 0)}
            class={`fig-curve fig-ghost ${revealTarget ? 'is-revealed' : ''}`} fill="none" />
        ) : null}
        <path d={path(a, b, c)} class="fig-curve" fill="none" />
        {a !== 0 && vy >= p.yMin && vy <= p.yMax ? (
          <circle cx={p.X(vx)} cy={p.Y(vy)} r="5" class="fig-vertex" />
        ) : null}
      </Stage>

      <div class="controls">
        <Slider id="par-a" label="a (how steep, and which way up)" value={a} min={-3} max={3} step={0.5}
          disabled={readOnly} onInput={(v) => onChange({ ...value, a: v })} />
        <Slider id="par-b" label="b" value={b} min={-6} max={6} step={1}
          disabled={readOnly} onInput={(v) => onChange({ ...value, b: v })} />
        <Slider id="par-c" label="c (where it crosses the y-axis)" value={c} min={-6} max={6} step={1}
          disabled={readOnly} onInput={(v) => onChange({ ...value, c: v })} />
      </div>

      <Readout rows={[
        { label: 'Equation', value: `y = ${formatNumber(a)}x² + ${formatNumber(b)}x + ${formatNumber(c)}`, strong: true },
        { label: 'Turning point', value: a === 0 ? '—' : `(${formatNumber(vx)}, ${formatNumber(vy)})` },
        { label: 'Roots', value: roots },
      ]} />
    </div>
  );
}

/* ==========================================================================
   Number line
   ========================================================================== */

export function NumberLine({ config, value, onChange, target, readOnly, revealTarget }: VisualProps) {
  const min = config.min ?? 0, max = config.max ?? 1;
  const step = config.step ?? 0.05;
  const majorStep = config.majorStep ?? (max - min) / 5;
  const label = config.label ?? 'Value';
  const svgRef = useRef<SVGSVGElement>(null);

  const x = Math.min(max, Math.max(min, value.x ?? min));
  // config.inequality: also choose a direction (dir: 1 right, −1 left) and closed (1) / open (0).
  const ineq = !!config.inequality;
  const dir = (value.dir ?? 1) >= 0 ? 1 : -1;
  const closed = (value.closed ?? 0) ? 1 : 0;
  const v = config.variable ?? 'x';
  const sym = dir > 0 ? (closed ? '≥' : '>') : (closed ? '≤' : '<');
  const padX = 34, y = 88;
  const X = (v: number) => padX + ((v - min) / (max - min)) * (W - padX * 2);
  const fromX = (px: number) => snap(min + ((px - padX) / (W - padX * 2)) * (max - min), min, max, step);

  const drag = useSvgDrag(svgRef, (px) => { if (!readOnly) onChange({ ...value, x: fromX(px) }); });

  const ticks: number[] = [];
  for (let v = min; v <= max + 1e-9; v += majorStep) ticks.push(Math.round(v * 1000) / 1000);

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${W} 150`} label={`A number line from ${min} to ${max} with a marker at ${formatNumber(x)}`}
        svgRef={svgRef} class="stage stage-grab" {...drag}>
        <line x1={X(min)} y1={y} x2={X(max)} y2={y} class="fig-axis-strong" />
        {ticks.map((t) => (
          <g key={t} aria-hidden="true">
            <line x1={X(t)} y1={y - 8} x2={X(t)} y2={y + 8} class="fig-axis" />
            <text x={X(t)} y={y + 28} text-anchor="middle" class="fig-tick">{formatNumber(t)}</text>
          </g>
        ))}

        {/* The target is only shown after checking — before that it would give the answer away. */}
        {target && revealTarget ? (
          <g class="fig-ghost is-revealed">
            <line x1={X(target.x ?? min)} y1={y - 26} x2={X(target.x ?? min)} y2={y + 26} class="fig-edge fig-dash" />
            {ineq && target.dir !== undefined ? (
              <line x1={X(target.x ?? min)} y1={y + 14} x2={target.dir > 0 ? X(max) : X(min)} y2={y + 14} class="fig-edge fig-dash" />
            ) : null}
          </g>
        ) : null}

        {/* Inequality mode: a thick ray from the point, with an open or closed circle. */}
        {ineq ? (
          <g aria-hidden="true">
            <line x1={X(x)} y1={y} x2={dir > 0 ? X(max) : X(min)} y2={y} class="fig-line" />
            <circle cx={X(x)} cy={y} r="8" class="fig-edge fig-edge-hyp"
              style={{ fill: closed ? 'var(--red)' : 'var(--bg)' }} />
          </g>
        ) : null}

        <g class="fig-handle" style={{ transform: `translateX(${X(x) - X(min)}px)` }}>
          <line x1={X(min)} y1={y - 22} x2={X(min)} y2={y + 22} class="fig-edge" />
          <circle cx={X(min)} cy={y - 30} r="11" class="fig-knob" />
          <text x={X(min)} y={y - 44} text-anchor="middle" class="fig-label">{formatNumber(x)}</text>
        </g>
      </Stage>

      <div class="controls">
        <Slider id="nl-x" label={label} value={x} min={min} max={max} step={step}
          disabled={readOnly} onInput={(v) => onChange({ ...value, x: v })} />
      </div>

      {ineq ? (
        <div class="controls controls-row">
          <button type="button" class="btn btn-ghost btn-sm" disabled={readOnly} aria-pressed={dir < 0}
            onClick={() => onChange({ ...value, x, dir: -dir, closed })}>
            Arrow points {dir > 0 ? 'right →' : '← left'} (switch)
          </button>
          <button type="button" class="btn btn-ghost btn-sm" disabled={readOnly} aria-pressed={!!closed}
            onClick={() => onChange({ ...value, x, dir, closed: closed ? 0 : 1 })}>
            {closed ? '● Closed circle (included)' : '○ Open circle (not included)'}
          </button>
        </div>
      ) : null}

      <Readout rows={ineq
        ? [{ label: 'Inequality shown', value: `${v} ${sym} ${formatNumber(x)}`, strong: true }]
        : [{ label, value: formatNumber(x), strong: true }]} />
    </div>
  );
}

/* ==========================================================================
   A line meeting a curve — non-linear simultaneous equations
     config.curve: 'parabola' (default, with a, b, c) or 'circle' (with r)
     value: m, k for the line y = mx + k; n is kept up to date with the number
     of intersection points, so a question can target { n: 1 } (a tangent).
   ========================================================================== */

/** "2x² + x − 6 = 0" from the coefficients A, B, C. */
function quadText(A: number, B: number, C: number): string {
  const f = (n: number) => formatNumber(n, 3);
  const parts: string[] = [];
  const term = (coef: number, body: string) => {
    if (Math.abs(coef) < 1e-9) return;
    const mag = Math.abs(coef);
    const shown = body && Math.abs(mag - 1) < 1e-9 ? body : `${f(mag)}${body}`;
    parts.push(parts.length === 0 ? (coef < 0 ? `−${shown}` : shown) : `${coef < 0 ? '−' : '+'} ${shown}`);
  };
  term(A, 'x²'); term(B, 'x'); term(C, '');
  return `${parts.join(' ') || '0'} = 0`;
}

export function LineCurve({ config, value, onChange, target, readOnly }: VisualProps) {
  const circle = config.curve === 'circle';
  const r: number = config.r ?? 5;
  const qa: number = config.a ?? 1, qb: number = config.b ?? 0, qc: number = config.c ?? -4;
  const p = circle ? plotter(-9, 9, -6.5, 6.5) : plotter(-6, 6, -8, 10);
  const m = value.m ?? 1, k = value.k ?? 2;

  // Substitute y = mx + k into the curve to get A x² + B x + C = 0.
  const [A, B, C] = circle
    ? [1 + m * m, 2 * m * k, k * k - r * r]
    : [qa, qb - m, qc - k];
  const rawD = B * B - 4 * A * C;
  const D = Math.abs(rawD) < 1e-9 ? 0 : rawD;
  const n = D > 0 ? 2 : D === 0 ? 1 : 0;
  const xs = n === 0 ? [] : n === 1 ? [-B / (2 * A)]
    : [(-B - Math.sqrt(D)) / (2 * A), (-B + Math.sqrt(D)) / (2 * A)];
  const pts = xs.map((x) => ({ x, y: m * x + k }));

  const set = (patch: Record<string, number>) => {
    if (readOnly) return;
    const next = { ...value, m, k, ...patch };
    const [a2, b2, c2] = circle
      ? [1 + next.m * next.m, 2 * next.m * next.k, next.k * next.k - r * r]
      : [qa, qb - next.m, qc - next.k];
    const d2 = b2 * b2 - 4 * a2 * c2;
    onChange({ ...next, n: Math.abs(d2) < 1e-9 ? 1 : d2 > 0 ? 2 : 0 });
  };

  // The line, clipped properly to the plotting box.
  let x1 = p.xMin, x2 = p.xMax;
  if (Math.abs(m) > 1e-9) {
    const xa = (p.yMin - k) / m, xb = (p.yMax - k) / m;
    x1 = Math.max(x1, Math.min(xa, xb)); x2 = Math.min(x2, Math.max(xa, xb));
  }

  const curvePath = () => {
    if (circle) return '';
    const out: string[] = [];
    let pen = false;
    for (let x = p.xMin; x <= p.xMax + 1e-9; x += 0.05) {
      const y = qa * x * x + qb * x + qc;
      if (y < p.yMin || y > p.yMax) { pen = false; continue; }
      out.push(`${pen ? 'L' : 'M'}${p.X(x).toFixed(1)} ${p.Y(y).toFixed(1)}`);
      pen = true;
    }
    return out.join(' ');
  };

  const curveName = circle
    ? `x² + y² = ${formatNumber(r * r)}`
    : `y = ${quadText(qa, qb, qc).replace(' = 0', '')}`;
  const lineName = `y = ${quadText(0, m, k).replace(' = 0', '')}`;
  const verdict = n === 2 ? 'b² − 4ac > 0: two points of intersection'
    : n === 1 ? 'b² − 4ac = 0: one point — the line is a tangent'
    : 'b² − 4ac < 0: no points of intersection';

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${W} ${H}`} label={`The line ${lineName} and the curve ${curveName}: ${n} point${n === 1 ? '' : 's'} of intersection`}>
        <Grid p={p} />
        {circle
          ? <ellipse cx={p.X(0)} cy={p.Y(0)} rx={p.X(r) - p.X(0)} ry={p.Y(0) - p.Y(r)} class="fig-curve" fill="none" />
          : <path d={curvePath()} class="fig-curve" fill="none" />}
        {x2 > x1 && (
          <line x1={p.X(x1)} y1={p.Y(m * x1 + k)} x2={p.X(x2)} y2={p.Y(m * x2 + k)} class="fig-line"
            style={{ stroke: 'var(--ink)' }} />
        )}
        {pts.map((pt, i) => (
          pt.y >= p.yMin && pt.y <= p.yMax
            ? <circle key={i} cx={p.X(pt.x)} cy={p.Y(pt.y)} r="5.5" class="fig-vertex" />
            : null
        ))}
      </Stage>

      <div class="controls">
        <Slider id="lc-m" label="Gradient of the line, m" value={m} min={config.mMin ?? -4} max={config.mMax ?? 4} step={config.mStep ?? 0.5}
          disabled={readOnly} onInput={(v) => set({ m: v })} />
        <Slider id="lc-k" label="y-intercept of the line" value={k} min={config.kMin ?? -8} max={config.kMax ?? 8} step={config.kStep ?? 0.5}
          disabled={readOnly} onInput={(v) => set({ k: v })} />
      </div>

      <Readout rows={[
        { label: 'Curve', value: curveName },
        { label: 'Line', value: lineName },
        { label: 'Combined equation', value: quadText(A, B, C) },
        { label: 'Discriminant', value: `${B < 0 ? `(${formatNumber(B, 3)})` : formatNumber(B, 3)}² − 4(${formatNumber(A, 3)})(${formatNumber(C, 3)}) = ${formatNumber(D, 3)}` },
        { label: 'So', value: verdict, strong: true },
        ...(pts.length ? [{ label: 'Points', value: pts.map((pt) => `(${formatNumber(pt.x)}, ${formatNumber(pt.y)})`).join(' and ') }] : []),
        ...(target && target.n !== undefined ? [{ label: 'Aim for', value: `${target.n} point${Number(target.n) === 1 ? '' : 's'} of intersection` }] : []),
      ]} />
    </div>
  );
}
