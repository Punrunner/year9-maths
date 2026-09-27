/* ==========================================================================
   INTERACTIVE VISUALS — number
     integer-hops    add or subtract integers as hops along a number line
     fraction-bars   two fractions as bars; split both into a common
                     denominator, then add or subtract
     percent-grid    a hundred square: shade squares, read off the fraction,
                     decimal and percentage
     percent-bar     a double number line: an amount against 0–100 %
   ========================================================================== */

import { Slider, Readout, Stage, formatNumber, type VisualProps } from './kit';

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);
/** Proper minus sign for display. */
const num = (n: number) => (n < 0 ? `−${Math.abs(n)}` : String(n));
/** A negative number in brackets, as it is written after + or −. */
const br = (n: number) => (n < 0 ? `(${num(n)})` : String(n));

/** "3/4", "2", "1 1/2" — simplified, as a mixed number when bigger than 1. */
function fracText(n: number, d: number, mixed = true): string {
  if (d === 0) return '—';
  const g = gcd(n, d) || 1;
  const sn = n / g, sd = d / g;
  if (sd === 1) return num(sn);
  if (mixed && Math.abs(sn) > sd) {
    const whole = Math.trunc(sn / sd), rest = Math.abs(sn % sd);
    return `${num(whole)} ${rest}/${sd}`;
  }
  return `${num(sn)}/${sd}`;
}

/* ==========================================================================
   integer-hops
   ========================================================================== */

export function IntegerHops({ config, value, onChange, target, readOnly }: VisualProps) {
  const lim = config.limit ?? 6;
  const a = value.a ?? 2, b = value.b ?? -5, op = value.op ?? 0;
  // The answer `r` is stored too, so a question can set a target such as { r: 4 }.
  const set = (patch: Record<string, number>) => {
    if (readOnly) return;
    const next = { a, b, op, ...value, ...patch };
    onChange({ ...next, r: next.a + (next.op === 0 ? next.b : -next.b) });
  };

  // Adding moves in the direction of b's sign; subtracting moves the other way.
  const step = op === 0 ? b : -b;
  const r = a + step;

  const span = lim * 2;                    // the line runs −span … span
  const W = 460, pad = 20, y = 80;
  const every = span <= 12 ? 2 : 5;   // label every 2nd or 5th tick
  const px = (W - 2 * pad) / (2 * span);
  const X = (v: number) => pad + (v + span) * px;
  const ticks = Array.from({ length: 2 * span + 1 }, (_, i) => i - span);

  const hops = Array.from({ length: Math.abs(step) }, (_, i) => {
    const from = a + Math.sign(step) * i, to = from + Math.sign(step);
    const x1 = X(from), x2 = X(to), mid = (x1 + x2) / 2;
    return `M${x1} ${y - 6} Q${mid} ${y - 34} ${x2} ${y - 6}`;
  });

  const expr = `${num(a)} ${op === 0 ? '+' : '−'} ${br(b)}`;
  const direction = step === 0 ? 'no move' : `move ${Math.abs(step)} to the ${step > 0 ? 'right' : 'left'}`;
  let rule = '';
  if (op === 0 && b < 0) rule = `Adding ${num(b)} is the same as subtracting ${Math.abs(b)}`;
  else if (op === 1 && b < 0) rule = `Subtracting ${num(b)} is the same as adding ${Math.abs(b)}`;
  else if (op === 0) rule = 'Adding a positive: move right';
  else rule = 'Subtracting a positive: move left';

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${W} 140`} label={`${expr} = ${num(r)}: start at ${num(a)} and ${direction}`}>
        <line x1={pad} y1={y} x2={W - pad} y2={y} class="fig-axis-strong" />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={X(t)} y1={y - (t % every === 0 ? 7 : 4)} x2={X(t)} y2={y + (t % every === 0 ? 7 : 4)} class="fig-axis" />
            {t % every === 0 && <text x={X(t)} y={y + 24} text-anchor="middle" class="fig-tick">{num(t)}</text>}
          </g>
        ))}
        {hops.map((d, i) => <path key={i} d={d} class="fig-line" style={{ strokeWidth: 2.2 }} />)}
        <circle cx={X(a)} cy={y} r="7" class="fig-vertex fig-vertex-muted" />
        <circle cx={X(r)} cy={y} r="7" class="fig-vertex" />
        <g class="fig-label" aria-hidden="true">
          <text x={X(a)} y={y + 46} text-anchor="middle">start</text>
          {r !== a && <text x={X(r)} y={y - 40} text-anchor="middle" style={{ fontWeight: 700, fill: 'var(--red)' }}>{num(r)}</text>}
        </g>
      </Stage>

      <div class="controls controls-3">
        <Slider id="hop-a" label="Start at" value={a} min={-lim} max={lim} step={1}
          disabled={readOnly} onInput={(v) => set({ a: v })} />
        <div class="slider">
          <span class="slider-name">Operation</span>
          <div class="seg">
            {['+ add', '− subtract'].map((l, i) => (
              <button key={l} type="button" disabled={readOnly}
                class={`seg-btn seg-btn-sm ${op === i ? 'is-on' : ''}`} onClick={() => set({ op: i })}>{l}</button>
            ))}
          </div>
        </div>
        <Slider id="hop-b" label="The number" value={b} min={-lim} max={lim} step={1}
          disabled={readOnly} onInput={(v) => set({ b: v })} />
      </div>

      <Readout rows={[
        { label: 'Rule', value: rule },
        { label: 'Move', value: direction },
        { label: 'Answer', value: `${expr} = ${num(r)}`, strong: true },
        ...(target && target.r !== undefined ? [{ label: 'Make the answer', value: num(Number(target.r)) }] : []),
      ]} />
    </div>
  );
}

/* ==========================================================================
   fraction-bars
   ========================================================================== */

export function FractionBars({ config, value, onChange, readOnly }: VisualProps) {
  const maxD = config.maxDenominator ?? 12;
  const d1 = value.d1 ?? 3, d2 = value.d2 ?? 4;
  const n1 = Math.min(value.n1 ?? 1, d1), n2 = Math.min(value.n2 ?? 1, d2);
  const op = value.op ?? 0, common = value.common ?? 0;
  const set = (patch: Record<string, number>) => {
    if (readOnly) return;
    const next = { ...value, ...patch };
    // Keep each numerator no bigger than its denominator.
    next.n1 = Math.min(next.n1 ?? 1, next.d1 ?? 3);
    next.n2 = Math.min(next.n2 ?? 1, next.d2 ?? 4);
    onChange(next);
  };

  const L = lcm(d1, d2);
  const e1 = n1 * (L / d1), e2 = n2 * (L / d2);
  const resN = op === 0 ? e1 + e2 : e1 - e2;

  const W = 440, x0 = 70, bw = 300, bh = 34;
  const unitsInResult = Math.max(1, Math.ceil(Math.abs(resN) / L));
  const resW = bw * unitsInResult;
  const scale = Math.min(1, (W - x0 - 20) / resW);

  /** One bar: `parts` pieces with `shaded` filled, plus thin common-denominator lines. */
  const Bar = ({ y, parts, shaded, fine, width = bw, negative = false }:
    { y: number; parts: number; shaded: number; fine?: number; width?: number; negative?: boolean }) => {
    const pw = bw / parts;
    const count = Math.round(width / pw);
    return (
      <g>
        {Array.from({ length: count }, (_, i) => (
          <rect key={i} x={x0 + i * pw} y={y} width={pw} height={bh}
            class={i < Math.abs(shaded) ? (negative ? 'fig-fill' : 'fig-fill-strong') : ''}
            style={i < Math.abs(shaded) ? {} : { fill: 'transparent' }} />
        ))}
        {fine && fine !== parts && Array.from({ length: Math.round(width / (bw / fine)) - 1 }, (_, i) => (
          <line key={`f${i}`} x1={x0 + (i + 1) * (bw / fine)} y1={y} x2={x0 + (i + 1) * (bw / fine)} y2={y + bh}
            style={{ stroke: 'var(--muted)', strokeWidth: 1, strokeDasharray: '3 3' }} />
        ))}
        {Array.from({ length: count - 1 }, (_, i) => (
          <line key={`p${i}`} x1={x0 + (i + 1) * pw} y1={y} x2={x0 + (i + 1) * pw} y2={y + bh} class="fig-stroke" />
        ))}
        {Array.from({ length: Math.round(width / bw) }, (_, i) => (
          <rect key={`w${i}`} x={x0 + i * bw} y={y} width={bw} height={bh} class="fig-stroke" />
        ))}
      </g>
    );
  };

  const f1 = common ? `${e1}/${L}` : `${n1}/${d1}`;
  const f2 = common ? `${e2}/${L}` : `${n2}/${d2}`;

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${W} 200`}
        label={`${n1}/${d1} ${op === 0 ? 'plus' : 'minus'} ${n2}/${d2} equals ${fracText(resN, L)}`}>
        <g class="fig-label" aria-hidden="true" style={{ fontSize: '15px' }}>
          <text x={x0 - 12} y={24 + bh / 2 + 5} text-anchor="end">{f1}</text>
          <text x={x0 - 12} y={84 + bh / 2 + 5} text-anchor="end">{op === 0 ? '+' : '−'} {f2}</text>
          {common ? <text x={x0 - 12} y={150 + bh / 2 + 5} text-anchor="end" style={{ fontWeight: 700 }}>= {num(resN)}/{L}</text> : null}
        </g>
        <Bar y={24} parts={d1} shaded={n1} fine={common ? L : undefined} />
        <Bar y={84} parts={d2} shaded={n2} fine={common ? L : undefined} />
        {common ? (
          <g transform={`translate(${x0 * (1 - scale)} 150) scale(${scale} 1) translate(0 -150)`}>
            <Bar y={150} parts={L} shaded={resN} width={resW} negative={resN < 0} />
          </g>
        ) : (
          <text x={x0} y={150 + bh / 2 + 5} class="fig-tick">
            Different-sized pieces — split them first
          </text>
        )}
      </Stage>

      <div class="controls">
        <Slider id="fb-n1" label="First numerator" value={n1} min={0} max={d1} step={1} disabled={readOnly} onInput={(v) => set({ n1: v })} />
        <Slider id="fb-d1" label="First denominator" value={d1} min={1} max={maxD} step={1} disabled={readOnly} onInput={(v) => set({ d1: v })} />
        <Slider id="fb-n2" label="Second numerator" value={n2} min={0} max={d2} step={1} disabled={readOnly} onInput={(v) => set({ n2: v })} />
        <Slider id="fb-d2" label="Second denominator" value={d2} min={1} max={maxD} step={1} disabled={readOnly} onInput={(v) => set({ d2: v })} />
        <div class="slider">
          <span class="slider-name">Operation</span>
          <div class="seg">
            {['+ add', '− subtract'].map((l, i) => (
              <button key={l} type="button" disabled={readOnly}
                class={`seg-btn seg-btn-sm ${op === i ? 'is-on' : ''}`} onClick={() => set({ op: i })}>{l}</button>
            ))}
          </div>
        </div>
        <div class="slider">
          <span class="slider-name">Common denominator</span>
          <div class="seg">
            <button type="button" disabled={readOnly} class={`seg-btn seg-btn-sm ${common ? 'is-on' : ''}`}
              onClick={() => set({ common: common ? 0 : 1 })}>{common ? 'Showing' : 'Split the pieces'}</button>
          </div>
        </div>
      </div>

      <Readout rows={[
        { label: 'LCM of the denominators', value: `LCM(${d1}, ${d2}) = ${L}` },
        ...(common ? [
          { label: 'Equivalent fractions', value: `${n1}/${d1} = ${e1}/${L},   ${n2}/${d2} = ${e2}/${L}` },
          { label: 'Answer', value: `${e1}/${L} ${op === 0 ? '+' : '−'} ${e2}/${L} = ${num(resN)}/${L} = ${fracText(resN, L)}`, strong: true },
        ] : [
          { label: 'Next', value: 'Press “Split the pieces” to make the pieces the same size' },
        ]),
      ]} />
    </div>
  );
}

/* ==========================================================================
   percent-grid
   ========================================================================== */

export function PercentGrid({ value, onChange, readOnly }: VisualProps) {
  const p = Math.min(100, Math.max(0, value.p ?? 25));
  const set = (v: number) => { if (!readOnly) onChange({ ...value, p: v }); };
  const s = 22, x0 = 10, y0 = 10;

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${x0 * 2 + s * 10} ${y0 * 2 + s * 10}`} label={`${p} of 100 squares shaded`}>
        {Array.from({ length: 100 }, (_, i) => {
          const r = Math.floor(i / 10), c = i % 10;
          return (
            <rect key={i} x={x0 + c * s} y={y0 + r * s} width={s} height={s}
              class={i < p ? 'fig-fill-strong fig-stroke' : 'fig-stroke'}
              style={{ strokeWidth: 0.8, cursor: readOnly ? 'default' : 'pointer', fill: i < p ? undefined : 'transparent' }}
              onClick={() => set(i + 1 === p ? i : i + 1)} />
          );
        })}
        <rect x={x0} y={y0} width={s * 10} height={s * 10} class="fig-stroke" />
      </Stage>

      <div class="controls">
        <Slider id="pg-p" label="Squares shaded (out of 100)" value={p} min={0} max={100} step={1}
          disabled={readOnly} onInput={set} />
      </div>

      <Readout rows={[
        { label: 'Fraction', value: p === 0 ? '0' : `${p}/100${gcd(p, 100) > 1 ? ` = ${fracText(p, 100)}` : ''}` },
        { label: 'Decimal', value: formatNumber(p / 100, 2) },
        { label: 'Percentage', value: `${p}%`, strong: true },
      ]} />
    </div>
  );
}

/* ==========================================================================
   percent-bar
   ========================================================================== */

export function PercentBar({ config, value, onChange, target, readOnly }: VisualProps) {
  const total = config.total ?? 80;
  const unit = config.unit ?? '';
  const pre = config.prefix ?? '';
  const maxP = config.max ?? 100;
  const stepP = config.step ?? 5;
  const p = Math.min(maxP, Math.max(0, value.p ?? 25));
  const set = (v: number) => { if (!readOnly) onChange({ ...value, p: v }); };

  const W = 460, x0 = 30, len = 380;
  const X = (pc: number) => x0 + (pc / maxP) * len;
  const amount = (p / 100) * total;
  const show = (v: number) => `${pre}${formatNumber(v, 2)}${unit ? ` ${unit}` : ''}`;
  const marks = Array.from({ length: Math.floor(maxP / 10) + 1 }, (_, i) => i * 10);

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${W} 140`} label={`${p}% of ${show(total)} is ${show(amount)}`}>
        <rect x={x0} y={40} width={X(p) - x0} height={30} class="fig-fill-strong" />
        <rect x={x0} y={40} width={X(100) - x0} height={30} class="fig-stroke" />
        {maxP > 100 && <rect x={X(100)} y={40} width={X(maxP) - X(100)} height={30} class="fig-stroke fig-dash" />}
        {marks.map((m) => (
          <g key={m}>
            <line x1={X(m)} y1={70} x2={X(m)} y2={m % 50 === 0 ? 82 : 76} class="fig-axis" />
            {m % 50 === 0 && <text x={X(m)} y={96} text-anchor="middle" class="fig-tick">{m}%</text>}
            {m % 50 === 0 && <text x={X(m)} y={32} text-anchor="middle" class="fig-tick">{show((m / 100) * total)}</text>}
          </g>
        ))}
        <line x1={X(p)} y1={22} x2={X(p)} y2={112} class="fig-line" />
        <g class="fig-label" aria-hidden="true">
          <text x={X(p)} y={130} text-anchor="middle" style={{ fontWeight: 700, fill: 'var(--red)' }}>{p}% → {show(amount)}</text>
        </g>
      </Stage>

      <div class="controls">
        <Slider id="pb-p" label="Percentage" value={p} min={0} max={maxP} step={stepP} suffix="%"
          disabled={readOnly} onInput={set} />
      </div>

      <Readout rows={[
        { label: '1%', value: `${show(total)} ÷ 100 = ${show(total / 100)}` },
        { label: '10%', value: `${show(total)} ÷ 10 = ${show(total / 10)}` },
        { label: `${p}% of ${show(total)}`, value: `${p} × ${show(total / 100)} = ${show(amount)}`, strong: true },
        ...(p > 100 ? [{ label: 'Increase', value: `${show(total)} + ${p - 100}% = ${show(amount)}` }] : []),
        ...(target && target.p !== undefined ? [{ label: 'Find', value: `the percentage that gives ${show((Number(target.p) / 100) * total)}` }] : []),
      ]} />
    </div>
  );
}
