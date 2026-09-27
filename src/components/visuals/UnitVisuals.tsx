/* ==========================================================================
   INTERACTIVE VISUALS — units of measurement
     unit-grid    one big unit cut into small ones along a line, across a
                  square and through a cube — why 1 cm² = 100 mm² and
                  1 cm³ = 1000 mm³. In `mode: scale` it enlarges a shape by a
                  scale factor k instead (lengths ×k, area ×k², volume ×k³).
   ========================================================================== */

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
