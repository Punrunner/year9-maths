/* ==========================================================================
   INTERACTIVE VISUALS — graphs
     line-mc      sliders for gradient m and intercept c
     parabola     sliders for a, b and c in y = ax^2 + bx + c
     number-line  drag a marker along a number line
     line-curve   a line meeting a parabola or circle, with the discriminant
     vertex-form  y = (x + a)^2 + b, the completed-square form
     sketch-builder  drag the roots, y-intercept and turning point
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

/* ==========================================================================
   Completed square: y = s(x + p)^2 + q
   --------------------------------------------------------------------------
   The class writes y = (x + a)² + b with turning point (−a, b). Here the
   sliders are that a (stored as p) and b (stored as q), plus the shape s:
   +1 for ∪, −1 for ∩.
   ========================================================================== */

/** " + 3", " − 3" or nothing, for building equations as text. */
const signed = (n: number) => (Math.abs(n) < 1e-9 ? '' : n < 0 ? ` − ${formatNumber(-n)}` : ` + ${formatNumber(n)}`);

/** √24 → "2√6"; a perfect square gives null (the roots are whole numbers). */
function surdText(n: number): string | null {
  const r = Math.sqrt(n);
  if (Math.abs(r - Math.round(r)) < 1e-9 || !Number.isInteger(n)) return null;
  let a = 1, b = n;
  for (let f = Math.floor(r); f > 1; f--) if (n % (f * f) === 0) { a = f; b = n / (f * f); break; }
  return `${a === 1 ? '' : a}√${b}`;
}

export function VertexForm({ config, value, onChange, target, readOnly, revealTarget }: VisualProps) {
  const p = plotter(config.xMin ?? -7, config.xMax ?? 7, config.yMin ?? -10, config.yMax ?? 10);
  const sh = value.p ?? 0, q = value.q ?? 0, s = (value.s ?? 1) < 0 ? -1 : 1;

  const path = (pp: number, qq: number, ss: number) => {
    const out: string[] = [];
    let pen = false;
    for (let x = p.xMin; x <= p.xMax + 1e-9; x += 0.05) {
      const y = ss * (x + pp) ** 2 + qq;
      if (y < p.yMin || y > p.yMax) { pen = false; continue; }
      out.push(`${pen ? 'L' : 'M'}${p.X(x).toFixed(1)} ${p.Y(y).toFixed(1)}`);
      pen = true;
    }
    return out.join(' ');
  };

  const tx = -sh, ty = q, yInt = s * sh * sh + q;
  // Roots: s(x + p)² = −q has solutions when −q/s ≥ 0.
  const k = -q / s;
  const roots = k < -1e-9 ? [] : k < 1e-9 ? [tx] : [tx - Math.sqrt(k), tx + Math.sqrt(k)];
  const exact = roots.length === 2 ? surdText(k) : null;
  const rootText = roots.length === 0 ? 'none — the curve never reaches the x-axis'
    : roots.length === 1 ? `one, at x = ${formatNumber(tx)} (the curve touches the x-axis)`
    : exact ? `x = ${tx === 0 ? '' : formatNumber(tx) + ' '}± ${exact}  (≈ ${formatNumber(roots[0])} and ${formatNumber(roots[1])})`
    : `x = ${formatNumber(roots[0])} and x = ${formatNumber(roots[1])}`;

  const bracket = Math.abs(sh) < 1e-9 ? 'x²' : `(x${signed(sh)})²`;
  const completed = `y = ${s < 0 ? '−' : ''}${bracket}${signed(q)}`;
  const expanded = `y = ${quadText(s, 2 * s * sh, yInt).replace(' = 0', '')}`;

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${W} ${H}`} label={`The curve ${completed}, with turning point (${formatNumber(tx)}, ${formatNumber(ty)})`}>
        <Grid p={p} yStep={config.yStep ?? 2} />
        {target && (!config.hideGhost || revealTarget) ? (
          <path d={path(target.p ?? 0, target.q ?? 0, (target.s ?? 1) < 0 ? -1 : 1)}
            class={`fig-curve fig-ghost ${revealTarget ? 'is-revealed' : ''}`} fill="none" />
        ) : null}
        {tx >= p.xMin && tx <= p.xMax ? (
          <line x1={p.X(tx)} y1={p.Y(p.yMin)} x2={p.X(tx)} y2={p.Y(p.yMax)}
            style={{ stroke: 'var(--muted)', strokeDasharray: '5 5', strokeWidth: 1.5 }} />
        ) : null}
        <path d={path(sh, q, s)} class="fig-curve" fill="none" />
        {roots.map((r, i) => (r >= p.xMin && r <= p.xMax
          ? <circle key={`r${i}`} cx={p.X(r)} cy={p.Y(0)} r="4.5" class="fig-vertex fig-vertex-muted" /> : null))}
        {yInt >= p.yMin && yInt <= p.yMax
          ? <circle cx={p.X(0)} cy={p.Y(yInt)} r="4.5" class="fig-vertex fig-vertex-muted" /> : null}
        {ty >= p.yMin && ty <= p.yMax && tx >= p.xMin && tx <= p.xMax
          ? <circle cx={p.X(tx)} cy={p.Y(ty)} r="6" class="fig-vertex" /> : null}
      </Stage>

      <div class="controls">
        <Slider id="vf-p" label="a, inside the bracket (x + a)²" value={sh} min={config.pMin ?? -5} max={config.pMax ?? 5} step={config.pStep ?? 1}
          disabled={readOnly} onInput={(n) => onChange({ ...value, p: n, q, s })} />
        <Slider id="vf-q" label="b, added on the end" value={q} min={config.qMin ?? -9} max={config.qMax ?? 9} step={config.qStep ?? 1}
          disabled={readOnly} onInput={(n) => onChange({ ...value, p: sh, q: n, s })} />
        {config.fixedShape ? null : (
          <Slider id="vf-s" label="Shape: +1 is ∪, −1 is ∩" value={s} min={-1} max={1} step={2}
            disabled={readOnly} onInput={(n) => onChange({ ...value, p: sh, q, s: n })} />
        )}
      </div>

      <Readout rows={[
        { label: 'Completed square', value: completed, strong: true },
        { label: 'Expanded', value: expanded },
        { label: 'Turning point', value: `(${formatNumber(tx)}, ${formatNumber(ty)}), a ${s > 0 ? 'minimum' : 'maximum'}` },
        { label: 'Line of symmetry', value: `x = ${formatNumber(tx)}` },
        { label: 'y-intercept', value: `(0, ${formatNumber(yInt)})` },
        { label: 'Roots', value: rootText },
      ]} />
    </div>
  );
}

/* ==========================================================================
   Sketch builder: drag the roots, the y-intercept and the turning point
   --------------------------------------------------------------------------
   Each side of the turning point is drawn as half of a parabola through the
   point on that side. If the turning point is not halfway between the
   roots, the two halves have different widths and the sketch comes out
   lop-sided, which is the mistake this widget is meant to show up.
   Values: r1, r2 (roots, on the x-axis), yi (on the y-axis), vx, vy.
   lo and hi hold the roots in order, so a target does not depend on which
   root handle went where. config.hideGhost keeps the answer hidden until
   the question is checked (both widgets accept it).
   ========================================================================== */

type Sketch = { r1: number; r2: number; yi: number; vx: number; vy: number };

export function SketchBuilder({ config, value, onChange, target, readOnly, revealTarget }: VisualProps) {
  const p = plotter(config.xMin ?? -7, config.xMax ?? 7, config.yMin ?? -10, config.yMax ?? 10);
  const xs = config.xSnap ?? 0.5, ys = config.ySnap ?? 1;
  const hasRoots = config.roots !== false;
  const svgRef = useRef<SVGSVGElement>(null);

  const v: Sketch = { r1: value.r1 ?? -2, r2: value.r2 ?? 2, yi: value.yi ?? 2, vx: value.vx ?? 1, vy: value.vy ?? 3 };
  const fromX = (px: number) => snap(p.xMin + ((px - p.X(p.xMin)) / (p.X(p.xMax) - p.X(p.xMin))) * (p.xMax - p.xMin), p.xMin, p.xMax, xs);
  const fromY = (py: number) => snap(p.yMin + ((p.Y(p.yMin) - py) / (p.Y(p.yMin) - p.Y(p.yMax))) * (p.yMax - p.yMin), p.yMin, p.yMax, ys);
  const set = (patch: Partial<Sketch>) => {
    if (readOnly) return;
    const n = { ...v, ...patch };
    onChange({ ...value, ...n, lo: Math.min(n.r1, n.r2), hi: Math.max(n.r1, n.r2) });
  };
  const dragR1 = useSvgDrag(svgRef, (px) => set({ r1: fromX(px) }));
  const dragR2 = useSvgDrag(svgRef, (px) => set({ r2: fromX(px) }));
  const dragYi = useSvgDrag(svgRef, (_px, py) => set({ yi: fromY(py) }));
  const dragV = useSvgDrag(svgRef, (px, py) => set({ vx: fromX(px), vy: fromY(py) }));

  const curve = (s: Sketch) => {
    const lo = Math.min(s.r1, s.r2), hi = Math.max(s.r1, s.r2);
    const kFor = (x: number, y: number) => (Math.abs(x - s.vx) < 1e-6 ? null : (y - s.vy) / (x - s.vx) ** 2);
    const kl = hasRoots ? kFor(lo, 0) : kFor(0, s.yi);
    const kr = hasRoots ? kFor(hi, 0) : kl;
    const out: string[] = [];
    const half = (k: number | null, to: number) => {
      if (k === null || !Number.isFinite(k)) return;
      const step = to < s.vx ? -0.05 : 0.05;
      let pen = false;
      for (let x = s.vx; step < 0 ? x >= to - 1e-9 : x <= to + 1e-9; x += step) {
        const y = s.vy + k * (x - s.vx) ** 2;
        if (y < p.yMin || y > p.yMax) { pen = false; continue; }
        out.push(`${pen ? 'L' : 'M'}${p.X(x).toFixed(1)} ${p.Y(y).toFixed(1)}`);
        pen = true;
      }
    };
    half(kl, p.xMin);
    half(kr, p.xMax);
    return out.join(' ');
  };

  const t: Sketch | null = target
    ? { r1: target.lo ?? 0, r2: target.hi ?? 0, yi: target.yi ?? 0, vx: target.vx ?? 0, vy: target.vy ?? 0 }
    : null;
  const lo = Math.min(v.r1, v.r2), hi = Math.max(v.r1, v.r2);
  const handle = (cx: number, cy: number, drag: Record<string, any>, label: string, name: string) => (
    <g class="fig-handle" style={{ cursor: readOnly ? 'default' : 'grab', touchAction: 'none' }} {...(readOnly ? {} : drag)}
      aria-label={name}>
      <circle cx={cx} cy={cy} r="15" fill="transparent" />
      <circle cx={cx} cy={cy} r="7" class="fig-vertex" />
      <text x={cx + 9} y={cy - 9} class="fig-tick" style={{ fontWeight: 700 }}>{label}</text>
    </g>
  );

  return (
    <div class="visual">
      <Stage svgRef={svgRef} viewBox={`0 0 ${W} ${H}`} label="Drag the points to build a sketch of the curve">
        <Grid p={p} xStep={config.xStep ?? 1} yStep={config.yStep ?? 2} />
        {t && (!config.hideGhost || revealTarget)
          ? <path d={curve(t)} class={`fig-curve fig-ghost ${revealTarget ? 'is-revealed' : ''}`} fill="none" /> : null}
        {config.showSymmetry && hasRoots ? (
          <line x1={p.X((lo + hi) / 2)} y1={p.Y(p.yMin)} x2={p.X((lo + hi) / 2)} y2={p.Y(p.yMax)}
            style={{ stroke: 'var(--muted)', strokeDasharray: '5 5', strokeWidth: 1.5 }} />
        ) : null}
        <path d={curve(v)} class="fig-curve" fill="none" />
        {hasRoots ? handle(p.X(v.r1), p.Y(0), dragR1, 'R', 'Root') : null}
        {hasRoots ? handle(p.X(v.r2), p.Y(0), dragR2, 'R', 'Root') : null}
        {handle(p.X(0), p.Y(v.yi), dragYi, 'Y', 'y-intercept')}
        {handle(p.X(v.vx), p.Y(v.vy), dragV, 'T', 'Turning point')}
      </Stage>
      <p class="choices-note">
        Drag {hasRoots ? <><b>R</b> along the x-axis to each root, </> : null}<b>Y</b> up or down the y-axis, and <b>T</b> to the turning point.
      </p>
      <Readout rows={[
        ...(hasRoots ? [{ label: 'Roots (R)', value: `x = ${formatNumber(lo)} and x = ${formatNumber(hi)}` }] : []),
        { label: 'y-intercept (Y)', value: `(0, ${formatNumber(v.yi)})` },
        { label: 'Turning point (T)', value: `(${formatNumber(v.vx)}, ${formatNumber(v.vy)})`, strong: true },
        ...(config.showSymmetry && hasRoots ? [{ label: 'Halfway between the roots', value: `x = ${formatNumber((lo + hi) / 2)}` }] : []),
      ]} />
    </div>
  );
}
