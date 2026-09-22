/* ==========================================================================
   INTERACTIVE VISUALS — statistics
     histogram   a grouped frequency table drawn as bars (and/or a frequency
                 polygon). Sliders change each frequency; the estimated mean,
                 modal class and median class update live.

   config
     boundaries  class boundaries, e.g. [10, 20, 30, 40, 50] → four classes
     freqs       starting frequencies, e.g. [4, 8, 11, 7]
     maxFreq     top of the slider and the y-axis (default 20)
     label       name of the variable, e.g. "Height (cm)"
     polygon     true to draw a frequency polygon through the midpoints
     bars        false to hide the bars (polygon only)
   value         f0, f1, … override freqs

     axis-trick  a bar chart whose y-axis can start above zero or stretch
                 upwards — to show how graphs mislead.
   config        values [22, 26, 32], labels ["Year 1", …], unit "$ millions"
   value         lo (where the axis starts), hi (where it ends)
   ========================================================================== */

import { Slider, Readout, Stage, formatNumber, type VisualProps } from './kit';

export function Histogram({ config, value, onChange, readOnly }: VisualProps) {
  const bounds: number[] = config.boundaries ?? [0, 10, 20, 30, 40];
  const k = bounds.length - 1;
  const base: number[] = config.freqs ?? Array(k).fill(5);
  const maxF = config.maxFreq ?? 20;
  const label = config.label ?? 'Value';
  const showBars = config.bars !== false;
  const showPolygon = !!config.polygon;

  const f = Array.from({ length: k }, (_, i) => Math.max(0, Math.round(value[`f${i}`] ?? base[i] ?? 0)));
  const mids = Array.from({ length: k }, (_, i) => (bounds[i]! + bounds[i + 1]!) / 2);
  const total = f.reduce((a, b) => a + b, 0);
  const sumFx = f.reduce((a, fi, i) => a + fi * mids[i]!, 0);
  const mean = total ? sumFx / total : NaN;

  const top = Math.max(...f);
  const modal = f.map((fi, i) => (fi === top && top > 0 ? i : -1)).filter((i) => i >= 0);

  // Median class: the class containing the (n + 1)/2 th value.
  const pos = (total + 1) / 2;
  let run = 0, medianClass = -1;
  for (let i = 0; i < k; i++) { run += f[i]!; if (run >= pos) { medianClass = i; break; } }

  const cls = (i: number) => `${formatNumber(bounds[i]!)} ≤ x < ${formatNumber(bounds[i + 1]!)}`;

  // Drawing area
  const L = 44, R = 330, T = 16, B = 196;
  const lo = bounds[0]!, hi = bounds[k]!;
  const sx = (x: number) => L + ((x - lo) / (hi - lo)) * (R - L);
  const sy = (y: number) => B - (y / maxF) * (B - T);
  const yTicks = Array.from({ length: 5 }, (_, i) => Math.round((maxF / 4) * i));

  return (
    <div class="visual">
      <Stage viewBox="0 0 350 240"
        label={`Histogram of ${label} with frequencies ${f.join(', ')}. Estimated mean ${formatNumber(mean, 1)}.`}>
        {/* axes */}
        <line x1={L} y1={B} x2={R} y2={B} class="fig-stroke" />
        <line x1={L} y1={B} x2={L} y2={T} class="fig-stroke" />
        {yTicks.map((t) => (
          <g key={t} class="fig-tick">
            <line x1={L - 4} y1={sy(t)} x2={L} y2={sy(t)} class="fig-stroke" />
            <text x={L - 8} y={sy(t) + 4} text-anchor="end">{t}</text>
          </g>
        ))}
        {bounds.map((b, i) => (
          <text key={i} x={sx(b)} y={B + 16} text-anchor="middle" class="fig-tick">{formatNumber(b)}</text>
        ))}
        <text x={(L + R) / 2} y={B + 34} text-anchor="middle" class="fig-label">{label}</text>

        {/* bars */}
        {showBars && f.map((fi, i) => (
          <rect key={i} x={sx(bounds[i]!)} y={sy(fi)} width={sx(bounds[i + 1]!) - sx(bounds[i]!)} height={B - sy(fi)}
            class={`${modal.includes(i) ? 'fig-fill-strong' : 'fig-fill'} fig-stroke`} />
        ))}

        {/* frequency polygon through the midpoints */}
        {showPolygon && (
          <polyline class="fig-edge fig-edge-hyp" fill="none"
            points={f.map((fi, i) => `${sx(mids[i]!)},${sy(fi)}`).join(' ')} />
        )}
        {showPolygon && f.map((fi, i) => <circle key={i} cx={sx(mids[i]!)} cy={sy(fi)} r="3.5" class="fig-dot" />)}

        {/* estimated mean */}
        {Number.isFinite(mean) && (
          <g>
            <line x1={sx(mean)} y1={T} x2={sx(mean)} y2={B} class="fig-edge fig-edge-hyp" stroke-dasharray="5 4" />
            <text x={sx(mean)} y={T + 2} text-anchor="middle" class="fig-label" dy="-4">mean ≈ {formatNumber(mean, 1)}</text>
          </g>
        )}
      </Stage>

      <div class="controls">
        {f.map((fi, i) => (
          <Slider key={i} id={`hist-${i}`} label={`Frequency, ${cls(i)}`} value={fi} min={0} max={maxF} step={1}
            disabled={readOnly} onInput={(v) => onChange({ ...value, [`f${i}`]: v })} />
        ))}
      </div>

      <Readout rows={[
        { label: 'Total frequency, Σf', value: String(total) },
        { label: 'Σfx (midpoint × frequency)', value: formatNumber(sumFx, 2) },
        { label: 'Estimated mean = Σfx ÷ Σf', value: total ? formatNumber(mean, 2) : '—', strong: true },
        { label: 'Modal class', value: modal.length === 1 ? cls(modal[0]!) : modal.length ? 'more than one' : '—' },
        { label: `Median class (value number ${formatNumber(pos, 1)})`, value: medianClass >= 0 ? cls(medianClass) : '—' },
        { label: 'Estimated range', value: formatNumber(hi - lo) },
      ]} />
    </div>
  );
}

/* ==========================================================================
   Misleading bar chart — move the start and end of the y-axis
   ========================================================================== */

export function AxisTrick({ config, value, onChange, readOnly }: VisualProps) {
  const vals: number[] = config.values ?? [22, 26, 32];
  const labels: string[] = config.labels ?? vals.map((_, i) => `Year ${i + 1}`);
  const unit: string = config.unit ?? '';
  const top = Math.max(...vals), bottom = Math.min(...vals);
  const lo = Math.min(value.lo ?? 0, bottom - 1);
  const hi = Math.max(value.hi ?? Math.ceil(top * 1.1), top + 1);

  const L = 50, R = 330, T = 14, B = 196;
  const Y = (v: number) => B - ((v - lo) / (hi - lo)) * (B - T);
  const slot = (R - L) / vals.length, bw = slot * 0.55;
  const ticks = Array.from({ length: 6 }, (_, i) => lo + ((hi - lo) * i) / 5);

  const first = vals[0]!, last = vals[vals.length - 1]!;
  const looks = (last - lo) / (first - lo);
  const really = last / first;

  return (
    <div class="visual">
      <Stage viewBox="0 0 350 230" label={`A bar chart with the axis from ${lo} to ${hi}`}>
        {ticks.map((t) => (
          <g key={t} class="fig-tick">
            <line x1={L} y1={Y(t)} x2={R} y2={Y(t)} class="fig-grid-line" stroke="var(--line)" />
            <text x={L - 6} y={Y(t) + 4} text-anchor="end">{formatNumber(t, 1)}</text>
          </g>
        ))}
        <line x1={L} y1={B} x2={R} y2={B} class="fig-stroke" />
        <line x1={L} y1={B} x2={L} y2={T} class="fig-stroke" />
        {vals.map((v, i) => (
          <g key={i}>
            <rect x={L + slot * i + (slot - bw) / 2} y={Y(v)} width={bw} height={B - Y(v)} class="fig-fill-strong fig-stroke" />
            <text x={L + slot * i + slot / 2} y={B + 16} text-anchor="middle" class="fig-tick">{labels[i]}</text>
          </g>
        ))}
        {lo > 0 ? <text x={L + 4} y={B - 4} class="fig-label" font-size="11">axis starts at {formatNumber(lo)}!</text> : null}
      </Stage>

      <div class="controls">
        <Slider id="axis-lo" label={`y-axis starts at${unit ? ` (${unit})` : ''}`} value={lo} min={0} max={bottom - 1} step={1}
          disabled={readOnly} onInput={(v) => onChange({ ...value, lo: v, hi })} />
        <Slider id="axis-hi" label={`y-axis ends at${unit ? ` (${unit})` : ''}`} value={hi} min={top + 1} max={Math.ceil(top * 4)} step={1}
          disabled={readOnly} onInput={(v) => onChange({ ...value, lo, hi: v })} />
      </div>

      <Readout rows={[
        { label: `${labels[vals.length - 1]} really is`, value: `${formatNumber(really, 2)} × ${labels[0]}` },
        { label: 'but its bar looks', value: `${formatNumber(looks, 2)} × as tall`, strong: true },
      ]} />
    </div>
  );
}
