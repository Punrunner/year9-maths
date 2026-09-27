/* ==========================================================================
   INTERACTIVE VISUALS — units of measurement
     unit-ladder  the metric "staircase": pick two units and an amount, and
                  see which way to go, what to multiply or divide by, and how
                  far the decimal point moves
     unit-grid    one big unit cut into small ones along a line, across a
                  square and through a cube — why 1 cm² = 100 mm² and
                  1 cm³ = 1000 mm³. In `mode: scale` it enlarges a shape by a
                  scale factor k instead (lengths ×k, area ×k², volume ×k³).
   ========================================================================== */

import { useEffect, useState } from 'preact/hooks';
import { Slider, Readout, Stage, type VisualProps } from './kit';

/* --------------------------------------------------------------------------
   Number formatting for conversions — no float noise, no "1e-7", and the
   usual space between groups of three digits in big numbers.
   -------------------------------------------------------------------------- */

function fmt(x: number): string {
  if (!Number.isFinite(x)) return '—';
  const clean = parseFloat(x.toPrecision(12));
  let s = Math.abs(clean) < 1e21 ? clean.toFixed(12).replace(/\.?0+$/, '') : String(clean);
  const neg = s.startsWith('-');
  if (neg) s = s.slice(1);
  const [int = '0', dec] = s.split('.');
  const grouped = int.length > 4 ? int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : int;
  return `${neg ? '−' : ''}${grouped}${dec ? `.${dec}` : ''}`;
}

/* ==========================================================================
   unit-ladder
   ========================================================================== */

/** Units listed smallest first; `steps[i]` is how many of unit i make unit i+1. */
const LADDERS: Record<string, { name: string; units: string[]; steps: number[] }> = {
  length:   { name: 'Length',   units: ['mm', 'cm', 'm', 'km'], steps: [10, 100, 1000] },
  mass:     { name: 'Mass',     units: ['mg', 'g', 'kg', 't'],  steps: [1000, 1000, 1000] },
  capacity: { name: 'Capacity', units: ['mL', 'L', 'kL'],       steps: [1000, 1000] },
};

export function UnitLadder({ config, value, onChange, target, readOnly }: VisualProps) {
  const keys: string[] = config.quantities ?? ['length', 'mass', 'capacity'];
  const q = Math.min(Math.max(0, value.q ?? 0), keys.length - 1);
  const ladder = LADDERS[keys[q]!] ?? LADDERS.length!;
  const { units, steps } = ladder;
  const last = units.length - 1;
  const from = Math.min(value.from ?? 2, last);
  const to = Math.min(value.to ?? 1, last);
  const n = value.n ?? 3.5;
  const set = (patch: Record<string, number>) => { if (!readOnly) onChange({ ...value, ...patch }); };

  // The box keeps its own text so "3." or "0.0" can be typed on the way to 3.5 or 0.05.
  const [text, setText] = useState(String(n));
  useEffect(() => {
    if (parseFloat(text.replace(/[\s,]/g, '')) !== n) setText(String(n));
  }, [n]);

  // Multiply every step factor between the two units.
  const lo = Math.min(from, to), hi = Math.max(from, to);
  const factor = steps.slice(lo, hi).reduce((a, b) => a * b, 1);
  const goingDown = to < from;              // to a smaller unit
  const result = from === to ? n : goingDown ? n * factor : n / factor;
  const places = Math.round(Math.log10(factor));

  // Staircase: biggest unit on the top step, top-left. Row j = last - unitIndex.
  const dx = 96, dy = 50, x0 = 12, y0 = 36;
  const tread = (i: number) => {
    const j = last - i;
    return { x: x0 + j * dx, y: y0 + j * dy };
  };
  const W = x0 + units.length * dx + 12, H = y0 + last * dy + 40;
  const outline = units.map((_, i) => {
    const t = tread(i);
    return `${t.x},${t.y} ${t.x + dx},${t.y}` + (i > 0 ? ` ${t.x + dx},${t.y + dy}` : '');
  }).reverse().join(' ');
  const base = y0 + last * dy + 22;

  const verb = from === to ? 'Same unit — nothing to do'
    : goingDown ? `Down the stairs to a smaller unit, so the number gets bigger: × ${fmt(factor)}`
    : `Up the stairs to a bigger unit, so the number gets smaller: ÷ ${fmt(factor)}`;

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${W} ${H}`}
        label={`A staircase of ${ladder.name.toLowerCase()} units from ${units[last]} at the top down to ${units[0]}. Converting ${fmt(n)} ${units[from]} to ${units[to]} gives ${fmt(result)} ${units[to]}.`}>
        <polygon class="fig-fill" points={`${x0},${base} ${outline} ${x0 + units.length * dx},${base}`} />
        <polyline class="fig-edge" points={outline} />

        {units.map((u, i) => {
          const t = tread(i);
          const on = i >= lo && i <= hi && from !== to;
          return (
            <g key={u}>
              {on && <line x1={t.x + 4} y1={t.y} x2={t.x + dx - 4} y2={t.y} class="fig-line" />}
              <text x={t.x + dx / 2} y={t.y - 10} text-anchor="middle" class="fig-label"
                style={{ fontWeight: i === from || i === to ? 700 : 400, fontSize: '15px' }}>{u}</text>
              {i === from && <circle cx={t.x + 12} cy={t.y - 15} r="6" class="fig-vertex" />}
              {i === to && from !== to && <circle cx={t.x + dx - 12} cy={t.y - 15} r="6" class="fig-vertex fig-vertex-muted" />}
            </g>
          );
        })}

        {/* The factor on each riser, between unit i (below) and unit i + 1 (above). */}
        {steps.map((f, i) => {
          const t = tread(i + 1);
          const inPath = i >= lo && i < hi;
          const label = inPath ? `${goingDown ? '×' : '÷'} ${fmt(f)}` : `× ${fmt(f)}`;
          return (
            <text key={i} x={t.x + dx - 8} y={t.y + dy / 2 + 6} text-anchor="end" class="fig-label"
              style={{ fill: inPath ? 'var(--red)' : 'var(--muted)', fontWeight: inPath ? 700 : 400, fontSize: '14px' }}>
              {label}
            </text>
          );
        })}
      </Stage>

      <div class="controls">
        {keys.length > 1 && (
          <div class="slider">
            <span class="slider-name">Measuring</span>
            <div class="seg">
              {keys.map((k, i) => (
                <button key={k} type="button" disabled={readOnly}
                  class={`seg-btn seg-btn-sm ${q === i ? 'is-on' : ''}`}
                  onClick={() => set({ q: i, from: Math.min(from, LADDERS[k]!.units.length - 1), to: Math.min(to, LADDERS[k]!.units.length - 1) })}>
                  {LADDERS[k]?.name ?? k}
                </button>
              ))}
            </div>
          </div>
        )}
        <label class="slider">
          <span class="slider-name">Amount</span>
          <input class="entry" type="text" inputMode="decimal" value={text} disabled={readOnly}
            aria-label={`Amount in ${units[from]}`}
            onInput={(e) => {
              const raw = (e.target as HTMLInputElement).value;
              setText(raw);
              const v = parseFloat(raw.replace(/[\s,]/g, ''));
              if (Number.isFinite(v)) set({ n: v });
            }} />
        </label>
        <div class="slider">
          <span class="slider-name">From</span>
          <div class="seg">
            {units.map((u, i) => (
              <button key={u} type="button" disabled={readOnly}
                class={`seg-btn seg-btn-sm ${from === i ? 'is-on' : ''}`} onClick={() => set({ from: i })}>{u}</button>
            ))}
          </div>
        </div>
        <div class="slider">
          <span class="slider-name">To</span>
          <div class="seg">
            {units.map((u, i) => (
              <button key={u} type="button" disabled={readOnly}
                class={`seg-btn seg-btn-sm ${to === i ? 'is-on' : ''}`} onClick={() => set({ to: i })}>{u}</button>
            ))}
          </div>
        </div>
      </div>

      <Readout rows={[
        { label: 'Direction', value: verb },
        ...(from !== to ? [{
          label: 'Decimal point',
          value: `moves ${places} place${places === 1 ? '' : 's'} to the ${goingDown ? 'right' : 'left'}`,
        }] : []),
        {
          label: 'Answer',
          value: `${fmt(n)} ${units[from]} = ${fmt(result)} ${units[to]}`,
          strong: true,
        },
        ...(target && target.from !== undefined
          ? [{ label: 'Set the stairs to', value: `${units[target.from] ?? '?'} → ${units[target.to ?? 0] ?? '?'}` }]
          : []),
      ]} />
    </div>
  );
}

/* ==========================================================================
   unit-grid
   ========================================================================== */

const DEFAULT_PAIRS = [
  { big: 'cm', small: 'mm', factor: 10 },
  { big: 'm', small: 'cm', factor: 100 },
  { big: 'km', small: 'm', factor: 1000 },
];

const DIMS = ['Length', 'Area', 'Volume'];
const sup = (d: number) => (d === 2 ? '²' : d === 3 ? '³' : '');

/** A line, square or cube of side L at (x, y), cut into `cuts` pieces each way. */
function CutShape({ d, cuts, x, y, L }: { d: number; cuts: number; x: number; y: number; L: number }) {
  const s = L / cuts;
  const idx = Array.from({ length: cuts - 1 }, (_, i) => i + 1);

  if (d === 1) {
    const h = 26;
    return (
      <g>
        <rect x={x} y={y} width={L} height={h} class="fig-fill fig-stroke" />
        <rect x={x} y={y} width={s} height={h} class="fig-fill-strong" />
        {idx.map((i) => <line key={i} x1={x + i * s} y1={y} x2={x + i * s} y2={y + h} class="fig-stroke" style={{ strokeWidth: 1 }} />)}
      </g>
    );
  }

  if (d === 2) {
    return (
      <g>
        <rect x={x} y={y} width={L} height={L} class="fig-fill fig-stroke" />
        <rect x={x} y={y + L - s} width={s} height={s} class="fig-fill-strong" />
        <g class="fig-grid">
          {idx.map((i) => <line key={`v${i}`} x1={x + i * s} y1={y} x2={x + i * s} y2={y + L} style={{ stroke: 'var(--muted)' }} />)}
          {idx.map((i) => <line key={`h${i}`} x1={x} y1={y + i * s} x2={x + L} y2={y + i * s} style={{ stroke: 'var(--muted)' }} />)}
        </g>
      </g>
    );
  }

  // Cube in oblique projection: front face, then top and right-hand faces.
  const ddx = L * 0.45, ddy = -L * 0.36;
  const P = (px: number, py: number) => `${px},${py}`;
  const grid = { stroke: 'var(--muted)', strokeWidth: 1 };
  return (
    <g>
      <polygon class="fig-fill-strong fig-stroke" points={`${P(x, y)} ${P(x + L, y)} ${P(x + L + ddx, y + ddy)} ${P(x + ddx, y + ddy)}`} />
      <polygon class="fig-fill fig-stroke" points={`${P(x + L, y)} ${P(x + L, y + L)} ${P(x + L + ddx, y + L + ddy)} ${P(x + L + ddx, y + ddy)}`} />
      <rect x={x} y={y} width={L} height={L} class="fig-fill fig-stroke" />
      <rect x={x} y={y + L - s} width={s} height={s} class="fig-fill-strong" />
      {idx.map((i) => (
        <g key={i} style={grid}>
          {/* front */}
          <line x1={x + i * s} y1={y} x2={x + i * s} y2={y + L} />
          <line x1={x} y1={y + i * s} x2={x + L} y2={y + i * s} />
          {/* top */}
          <line x1={x + i * s} y1={y} x2={x + i * s + ddx} y2={y + ddy} />
          <line x1={x + (i * ddx) / cuts} y1={y + (i * ddy) / cuts} x2={x + L + (i * ddx) / cuts} y2={y + (i * ddy) / cuts} />
          {/* side */}
          <line x1={x + L + (i * ddx) / cuts} y1={y + (i * ddy) / cuts} x2={x + L + (i * ddx) / cuts} y2={y + L + (i * ddy) / cuts} />
          <line x1={x + L} y1={y + i * s} x2={x + L + ddx} y2={y + i * s + ddy} />
        </g>
      ))}
    </g>
  );
}

export function UnitGrid({ config, value, onChange, target, readOnly }: VisualProps) {
  const scale = config.mode === 'scale';
  const pairs: Array<{ big: string; small: string; factor: number }> = config.pairs ?? DEFAULT_PAIRS;
  const d = Math.min(3, Math.max(1, value.d ?? 2));
  const p = Math.min(Math.max(0, value.p ?? 0), pairs.length - 1);
  const pair = pairs[p]!;
  const maxK = config.max ?? 5;
  const k = Math.min(maxK, Math.max(1, value.k ?? 2));
  const set = (patch: Record<string, number>) => { if (!readOnly) onChange({ ...value, ...patch }); };

  const n = scale ? k : pair.factor;                 // pieces along one edge
  const cuts = Math.min(n, 10);                      // what we can actually draw
  const L = d === 3 ? 150 : d === 2 ? 170 : 300;
  const x = d === 1 ? 30 : 40, y = d === 3 ? 80 : d === 2 ? 20 : 40;
  const H = d === 3 ? 260 : d === 2 ? 220 : 110;
  const total = n ** d;
  const times = Array.from({ length: d }, () => fmt(n)).join(' × ');

  let rows: Array<{ label: string; value: string; strong?: boolean }>;
  if (!scale) {
    const u = pair.big, v = pair.small;
    rows = [
      { label: 'Along one edge', value: `1 ${u} = ${fmt(n)} ${v}` },
      { label: `${DIMS[d - 1]}`, value: `1 ${u}${sup(d)} = ${times} = ${fmt(total)} ${v}${sup(d)}`, strong: true },
      { label: `${u}${sup(d)} → ${v}${sup(d)}`, value: `× ${fmt(total)}` },
      { label: `${v}${sup(d)} → ${u}${sup(d)}`, value: `÷ ${fmt(total)}` },
      ...(d === 3 && u === 'cm' ? [{ label: 'Capacity link', value: '1 cm³ = 1 mL' }] : []),
      ...(d === 3 && u === 'm' ? [{ label: 'Capacity link', value: '1 m³ = 1000 L' }] : []),
      ...(n > 10 ? [{ label: 'Note', value: `Drawn with 10 strips each way — really ${fmt(n)}` }] : []),
    ];
  } else {
    const b = config.base as { l: number; w: number; h: number; unit?: string } | undefined;
    const unit = b?.unit ?? 'cm';
    rows = [
      { label: 'Scale factor', value: `k = ${k}` },
      { label: 'Lengths', value: `× ${k}` },
      { label: 'Areas', value: `× ${k}² = × ${k * k}`, strong: d === 2 },
      { label: 'Volumes', value: `× ${k}³ = × ${k ** 3}`, strong: d === 3 },
      ...(b ? [
        { label: 'Original box', value: `${b.l} × ${b.w} × ${b.h} = ${fmt(b.l * b.w * b.h)} ${unit}³` },
        { label: 'New box', value: `${b.l * k} × ${b.w * k} × ${b.h * k} = ${fmt(b.l * b.w * b.h * k ** 3)} ${unit}³` },
      ] : []),
      ...(target && target.k !== undefined ? [{ label: 'Aim for', value: `volume × ${Number(target.k) ** 3}` }] : []),
    ];
  }

  const label = scale
    ? `A ${DIMS[d - 1]!.toLowerCase()} enlarged by scale factor ${k}, made of ${total} copies of the original`
    : `One ${pair.big}${sup(d)} cut into ${fmt(total)} ${pair.small}${sup(d)}`;

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${d === 1 ? 360 : 300} ${H}`} label={label}>
        <CutShape d={d} cuts={cuts} x={x} y={y} L={L} />
        <g class="fig-label" aria-hidden="true">
          {scale ? (
            <text x={x + L / 2} y={y + (d === 1 ? 26 : L) + 22} text-anchor="middle">
              {k === 1 ? 'the original' : `${k} originals along each edge`}
            </text>
          ) : (
            <text x={x + L / 2} y={y + (d === 1 ? 26 : L) + 22} text-anchor="middle">
              1 {pair.big} = {fmt(n)} {pair.small}
            </text>
          )}
        </g>
      </Stage>

      <div class="controls">
        <div class="slider">
          <span class="slider-name">Show</span>
          <div class="seg">
            {DIMS.map((name, i) => (
              <button key={name} type="button" disabled={readOnly}
                class={`seg-btn seg-btn-sm ${d === i + 1 ? 'is-on' : ''}`} onClick={() => set({ d: i + 1 })}>{name}</button>
            ))}
          </div>
        </div>
        {scale ? (
          <Slider id="unit-grid-k" label="Scale factor, k" value={k} min={1} max={maxK} step={1}
            disabled={readOnly} onInput={(v) => set({ k: v })} />
        ) : pairs.length > 1 ? (
          <div class="slider">
            <span class="slider-name">Units</span>
            <div class="seg">
              {pairs.map((pp, i) => (
                <button key={pp.big} type="button" disabled={readOnly}
                  class={`seg-btn seg-btn-sm ${p === i ? 'is-on' : ''}`} onClick={() => set({ p: i })}>
                  {pp.big} → {pp.small}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <Readout rows={rows} />
    </div>
  );
}
