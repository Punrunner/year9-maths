/* ==========================================================================
   INTERACTIVE VISUALS — percentages
     percent-bar   a double number line: an amount against a percentage scale.
                   Normally the whole (100%) is known. In reverse mode
                   (config.knownPercent) only one other point is known, e.g.
                   "after a 20% rise it costs 360", and the bar works back
                   through 1% to the original 100%.
   ========================================================================== */

import { Slider, Readout, Stage, formatNumber, type VisualProps } from './kit';

export function PercentBar({ config, value, onChange, target, readOnly }: VisualProps) {
  const reverse = config.knownPercent !== undefined;
  const knownP: number = config.knownPercent ?? 100;
  const known: number = config.known ?? config.total ?? 80;
  const total = reverse ? (known * 100) / knownP : known;   // the 100% amount
  const unit = config.unit ?? '';
  const pre = config.prefix ?? '';
  const maxP = config.max ?? Math.max(100, Math.ceil(knownP / 50) * 50);
  const stepP = config.step ?? 5;
  const p = Math.min(maxP, Math.max(0, value.p ?? 25));
  const set = (v: number) => { if (!readOnly) onChange({ ...value, p: v }); };

  const W = 460, x0 = 30, len = 380;
  const X = (pc: number) => x0 + (pc / maxP) * len;
  const amount = (p / 100) * total;
  const show = (v: number) => `${pre}${formatNumber(v, 2)}${unit ? ` ${unit}` : ''}`;
  const marks = Array.from({ length: Math.floor(maxP / 10) + 1 }, (_, i) => i * 10);

  // In reverse mode the amounts stay hidden until the student reaches them:
  // only the known point and the marker are labelled.
  const labelAt = (m: number) => !reverse || m === knownP;

  const rows = reverse
    ? [
      { label: 'Known', value: `${knownP}% = ${show(known)}` },
      { label: '1%', value: `${show(known)} ÷ ${knownP} = ${show(known / knownP)}` },
      { label: `${p}%`, value: `${p} × ${show(known / knownP)} = ${show(amount)}`, strong: true },
    ]
    : [
      { label: '1%', value: `${show(total)} ÷ 100 = ${show(total / 100)}` },
      { label: `${p}% of ${show(total)}`, value: `${p} × ${show(total / 100)} = ${show(amount)}`, strong: true },
    ];

  return (
    <div class="visual">
      <Stage viewBox={`0 0 ${W} 140`} label={reverse
        ? `${knownP}% is ${show(known)}; the marker at ${p}% is ${show(amount)}`
        : `${p}% of ${show(total)} is ${show(amount)}`}>
        <rect x={x0} y={40} width={X(p) - x0} height={30} class="fig-fill-strong" />
        <rect x={x0} y={40} width={X(100) - x0} height={30} class="fig-stroke" />
        {maxP > 100 && <rect x={X(100)} y={40} width={X(maxP) - X(100)} height={30} class="fig-stroke fig-dash" />}
        {marks.map((m) => (
          <g key={m}>
            <line x1={X(m)} y1={70} x2={X(m)} y2={m % 50 === 0 ? 82 : 76} class="fig-axis" />
            {m % 50 === 0 && <text x={X(m)} y={96} text-anchor="middle" class="fig-tick">{m}%</text>}
            {m % 50 === 0 && labelAt(m) && <text x={X(m)} y={32} text-anchor="middle" class="fig-tick">{show((m / 100) * total)}</text>}
          </g>
        ))}
        {reverse && knownP % 50 !== 0 && (
          <g>
            <line x1={X(knownP)} y1={36} x2={X(knownP)} y2={74} class="fig-axis-strong" />
            <text x={X(knownP)} y={32} text-anchor="middle" class="fig-tick" style={{ fontWeight: 700 }}>{show(known)}</text>
            <text x={X(knownP)} y={110} text-anchor="middle" class="fig-tick" style={{ fontWeight: 700 }}>{knownP}%</text>
          </g>
        )}
        <line x1={X(p)} y1={22} x2={X(p)} y2={112} class="fig-line" />
        <g class="fig-label" aria-hidden="true">
          <text x={X(p)} y={134} text-anchor="middle" style={{ fontWeight: 700, fill: 'var(--red)' }}>{p}% → {show(amount)}</text>
        </g>
      </Stage>

      <div class="controls">
        <Slider id="pb-p" label="Percentage" value={p} min={0} max={maxP} step={stepP} suffix="%"
          disabled={readOnly} onInput={set} />
      </div>

      <Readout rows={[
        ...rows,
        ...(target && target.p !== undefined && !reverse
          ? [{ label: 'Find', value: `the percentage that gives ${show((Number(target.p) / 100) * total)}` }]
          : []),
      ]} />
    </div>
  );
}
