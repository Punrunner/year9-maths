/* ==========================================================================
   INTERACTIVE VISUAL — probability
     spinner   run a real experiment and watch the experimental probability
               settle towards the theoretical one
   ========================================================================== */

import { useState, useRef, useEffect } from 'preact/hooks';
import { Readout, Stage, formatNumber, type VisualProps } from './kit';

/** Counts are stored as c0, c1, … so the whole value stays a plain number map. */
const countKey = (i: number) => `c${i}`;

export function Spinner({ config, value, onChange, readOnly }: VisualProps) {
  const labels: string[] = config.sectors ?? ['Red', 'Blue', 'Green', 'Yellow'];
  const focus: number = config.focus ?? 0;
  const n = labels.length;

  const [angle, setAngle] = useState(0);
  const [busy, setBusy] = useState(false);
  const [lastResult, setLastResult] = useState<number | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    try {
      reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch { reduced.current = false; }
  }, []);

  const spins = value.spins ?? 0;
  const counts = labels.map((_, i) => value[countKey(i)] ?? 0);

  const cx = 130, cy = 125, r = 96;

  /** Sector i spans this angle range, measured clockwise from 12 o'clock. */
  const sectorPath = (i: number) => {
    const a0 = (i / n) * 2 * Math.PI - Math.PI / 2;
    const a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return `M${cx} ${cy} L${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} ` +
           `A${r} ${r} 0 ${large} 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} Z`;
  };

  const record = (results: number[]) => {
    const next: Record<string, number> = { ...value, spins: spins + results.length };
    results.forEach((i) => { next[countKey(i)] = (next[countKey(i)] ?? 0) + 1; });
    onChange(next);
  };

  const spinOnce = () => {
    if (readOnly || busy) return;
    const result = Math.floor(Math.random() * n);
    setLastResult(result);

    // Land the pointer in the middle of the winning sector.
    const mid = ((result + 0.5) / n) * 360;
    const turns = reduced.current ? 0 : 3;
    const nextAngle = angle + turns * 360 + ((360 - (angle % 360) - mid) % 360);

    if (reduced.current) {
      setAngle(nextAngle);
      record([result]);
      return;
    }
    setBusy(true);
    setAngle(nextAngle);
    window.setTimeout(() => { record([result]); setBusy(false); }, 700);
  };

  const spinMany = (times: number) => {
    if (readOnly || busy) return;
    const results = Array.from({ length: times }, () => Math.floor(Math.random() * n));
    setLastResult(results[results.length - 1] ?? null);
    setAngle(angle + 360 * (reduced.current ? 0 : 2));
    record(results);
  };

  const reset = () => {
    setLastResult(null);
    onChange({ spins: 0, ...Object.fromEntries(labels.map((_, i) => [countKey(i), 0])) });
  };

  const experimental = spins ? counts[focus]! / spins : 0;
  const theoretical = 1 / n;

  return (
    <div class="visual">
      <div class="spinner-stage">
        <Stage viewBox="0 0 260 260" label={`A spinner with ${n} equal sections: ${labels.join(', ')}`}>
          <g class="spinner-dial" style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: `${cx}px ${cy}px`,
          }}>
            {labels.map((label, i) => (
              <g key={label}>
                <path d={sectorPath(i)} class={`spin-sector spin-${i % 6}`} />
                <text
                  class="spin-label"
                  x={cx + r * 0.62 * Math.cos(((i + 0.5) / n) * 2 * Math.PI - Math.PI / 2)}
                  y={cy + r * 0.62 * Math.sin(((i + 0.5) / n) * 2 * Math.PI - Math.PI / 2) + 4}
                  text-anchor="middle"
                >{label}</text>
              </g>
            ))}
          </g>
          <circle cx={cx} cy={cy} r="10" class="spin-hub" />
          <path d={`M${cx} 12 L${cx - 11} 34 L${cx + 11} 34 Z`} class="spin-pointer" />
        </Stage>

        <div class="spinner-controls">
          <button type="button" class="btn btn-primary" disabled={readOnly || busy} onClick={spinOnce}>
            {busy ? 'Spinning…' : 'Spin once'}
          </button>
          <button type="button" class="btn btn-secondary btn-sm" disabled={readOnly || busy}
            onClick={() => spinMany(10)}>+10 spins</button>
          <button type="button" class="btn btn-secondary btn-sm" disabled={readOnly || busy}
            onClick={() => spinMany(100)}>+100 spins</button>
          <button type="button" class="btn btn-ghost btn-sm" disabled={readOnly || busy}
            onClick={reset}>Reset</button>
        </div>
      </div>

      <p class="sr-only" aria-live="polite">
        {lastResult !== null ? `Landed on ${labels[lastResult]}. ${spins} spins so far.` : ''}
      </p>

      {/* Tally */}
      <table class="tally">
        <caption class="sr-only">Results so far</caption>
        <thead>
          <tr><th scope="col">Outcome</th>{labels.map((l) => <th key={l} scope="col">{l}</th>)}</tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Frequency</th>
            {counts.map((c, i) => <td key={i} class={i === focus ? 'is-focus' : ''}>{c}</td>)}
          </tr>
          <tr>
            <th scope="row">Relative frequency</th>
            {counts.map((c, i) => (
              <td key={i} class={i === focus ? 'is-focus' : ''}>
                {spins ? formatNumber(c / spins, 2) : '—'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <Readout rows={[
        { label: 'Number of spins', value: String(spins), strong: true },
        { label: `Experimental P(${labels[focus]})`, value: spins ? formatNumber(experimental, 3) : '—' },
        { label: `Theoretical P(${labels[focus]})`, value: `1/${n} = ${formatNumber(theoretical, 3)}` },
        { label: 'Difference', value: spins ? formatNumber(Math.abs(experimental - theoretical), 3) : '—' },
      ]} />
    </div>
  );
}
