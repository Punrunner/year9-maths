/* ==========================================================================
   HOTSPOT FIGURES
   --------------------------------------------------------------------------
   Diagrams a student can click parts of. Each figure lists the region ids it
   offers — use one of those ids as the `answer` of a "hotspot" question.

   FIGURE               REGION IDS
   -------------------  ----------------------------------------------------
   right-triangle       hypotenuse · leg-a · leg-b · right-angle · vertex-a
                        vertex-b · vertex-c
   circle-parts         centre · radius · diameter · circumference · chord
   line-graph           y-intercept · x-intercept · origin · rise · run
                        point-on-line
   distance-time        fastest · stationary · slowest · start · finish
   cylinder             curved-surface · top-face · bottom-face · height
                        radius
   tree-diagram         branch-a · branch-b · branch-aa · branch-ab
                        branch-ba · branch-bb
   parallel-lines       p-tl · p-tr · p-bl · p-br · q-tl · q-tr · q-bl
                        q-br   (config.given shades one as the known angle)
   scatter-graph        p0 · p1 · p2 · …  (one per point in config.points)
   ========================================================================== */

import { Region, type FigureProps } from './Region';

const stateOf = (id: string, p: FigureProps): 'right' | 'wrong' | null => {
  if (!p.locked) return null;
  if (p.correct.includes(id)) return 'right';
  return p.selected === id ? 'wrong' : null;
};

/** Shared wrapper: responsive, with a sensible aspect ratio. */
function Frame({ viewBox, label, children }: { viewBox: string; label: string; children: any }) {
  return (
    <svg class="figure" viewBox={viewBox} role="group" aria-label={label} preserveAspectRatio="xMidYMid meet">
      {children}
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Right-angled triangle — for Pythagoras and trigonometry
   -------------------------------------------------------------------------- */

function RightTriangle(p: FigureProps) {
  const { a = '3 cm', b = '4 cm', c = '5 cm', showLabels = true } = p.config;
  // Vertices: B bottom-left (right angle), C bottom-right, A top-left.
  const A = [70, 40], B = [70, 190], C = [290, 190];

  return (
    <Frame viewBox="0 0 360 230" label="A right-angled triangle">
      <polygon points={`${A} ${B} ${C}`} class="fig-fill" />

      {/* the right angle marker */}
      <Region id="right-angle" label="the right angle" selected={p.selected === 'right-angle'}
        state={stateOf('right-angle', p)} disabled={p.locked} onSelect={p.onSelect}>
        <path d="M70 168 L92 168 L92 190" class="fig-stroke" fill="none" />
        <rect x="70" y="166" width="26" height="26" class="hs-hit" />
      </Region>

      {/* the three sides */}
      <Region id="leg-a" label="the vertical side" selected={p.selected === 'leg-a'}
        state={stateOf('leg-a', p)} disabled={p.locked} onSelect={p.onSelect}>
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} class="fig-edge" />
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} class="hs-hit-line" />
      </Region>

      <Region id="leg-b" label="the horizontal side" selected={p.selected === 'leg-b'}
        state={stateOf('leg-b', p)} disabled={p.locked} onSelect={p.onSelect}>
        <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} class="fig-edge" />
        <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} class="hs-hit-line" />
      </Region>

      <Region id="hypotenuse" label="the sloping side opposite the right angle"
        selected={p.selected === 'hypotenuse'} state={stateOf('hypotenuse', p)}
        disabled={p.locked} onSelect={p.onSelect}>
        <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} class="fig-edge" />
        <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} class="hs-hit-line" />
      </Region>

      {/* the three corners */}
      {([['vertex-a', A, 'the top corner'], ['vertex-b', B, 'the bottom-left corner'],
         ['vertex-c', C, 'the bottom-right corner']] as const).map(([id, pt, label]) => (
        <Region key={id} id={id} label={label} selected={p.selected === id}
          state={stateOf(id, p)} disabled={p.locked} onSelect={p.onSelect}>
          <circle cx={pt[0]} cy={pt[1]} r="7" class="fig-vertex" />
          <circle cx={pt[0]} cy={pt[1]} r="18" class="hs-hit" />
        </Region>
      ))}

      {showLabels ? (
        <g class="fig-label" aria-hidden="true">
          <text x="52" y="120" text-anchor="end">{a}</text>
          <text x="180" y="212" text-anchor="middle">{b}</text>
          <text x="192" y="104">{c}</text>
        </g>
      ) : null}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Circle — radius, diameter, circumference
   -------------------------------------------------------------------------- */

function CircleParts(p: FigureProps) {
  const cx = 180, cy = 120, r = 88;
  return (
    <Frame viewBox="0 0 360 240" label="A circle with its parts marked">
      <circle cx={cx} cy={cy} r={r} class="fig-fill" />

      <Region id="circumference" label="the distance all the way around the circle"
        selected={p.selected === 'circumference'} state={stateOf('circumference', p)}
        disabled={p.locked} onSelect={p.onSelect}>
        <circle cx={cx} cy={cy} r={r} class="fig-edge" fill="none" />
        <circle cx={cx} cy={cy} r={r} class="hs-hit-line" fill="none" />
      </Region>

      <Region id="diameter" label="the line right across the circle through the centre"
        selected={p.selected === 'diameter'} state={stateOf('diameter', p)}
        disabled={p.locked} onSelect={p.onSelect}>
        <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} class="fig-edge" />
        <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} class="hs-hit-line" />
      </Region>

      <Region id="radius" label="the line from the centre to the edge"
        selected={p.selected === 'radius'} state={stateOf('radius', p)}
        disabled={p.locked} onSelect={p.onSelect}>
        <line x1={cx} y1={cy} x2={cx} y2={cy - r} class="fig-edge" />
        <line x1={cx} y1={cy} x2={cx} y2={cy - r} class="hs-hit-line" />
      </Region>

      <Region id="chord" label="a line joining two points on the edge, not through the centre"
        selected={p.selected === 'chord'} state={stateOf('chord', p)}
        disabled={p.locked} onSelect={p.onSelect}>
        <line x1={cx - 62} y1={cy + 62} x2={cx + 62} y2={cy + 62} class="fig-edge" />
        <line x1={cx - 62} y1={cy + 62} x2={cx + 62} y2={cy + 62} class="hs-hit-line" />
      </Region>

      <Region id="centre" label="the centre point" selected={p.selected === 'centre'}
        state={stateOf('centre', p)} disabled={p.locked} onSelect={p.onSelect}>
        <circle cx={cx} cy={cy} r="6" class="fig-vertex" />
        <circle cx={cx} cy={cy} r="18" class="hs-hit" />
      </Region>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   A straight-line graph — intercepts and gradient
   -------------------------------------------------------------------------- */

function LineGraph(p: FigureProps) {
  const { m = 2, c = -2 } = p.config;
  // Plot area: x from -1 to 5, y from -4 to 8.
  const X = (x: number) => 40 + (x + 1) * 48;
  const Y = (y: number) => 200 - (y + 4) * 18;
  const x1 = -1, x2 = 5;

  return (
    <Frame viewBox="0 0 360 240" label={`The graph of y = ${m}x + ${c}`}>
      {/* grid */}
      <g class="fig-grid" aria-hidden="true">
        {[-1, 0, 1, 2, 3, 4, 5].map((x) => <line key={`v${x}`} x1={X(x)} y1={Y(-4)} x2={X(x)} y2={Y(8)} />)}
        {[-4, -2, 0, 2, 4, 6, 8].map((y) => <line key={`h${y}`} x1={X(-1)} y1={Y(y)} x2={X(5)} y2={Y(y)} />)}
      </g>
      <g class="fig-axis" aria-hidden="true">
        <line x1={X(-1)} y1={Y(0)} x2={X(5)} y2={Y(0)} />
        <line x1={X(0)} y1={Y(-4)} x2={X(0)} y2={Y(8)} />
        <text x={X(5) + 4} y={Y(0) + 4} class="fig-label">x</text>
        <text x={X(0) - 12} y={Y(8) + 2} class="fig-label">y</text>
      </g>

      <line x1={X(x1)} y1={Y(m * x1 + c)} x2={X(x2)} y2={Y(m * x2 + c)} class="fig-line" />

      {/* the gradient triangle: along one, up m */}
      <Region id="run" label="the step of one across" selected={p.selected === 'run'}
        state={stateOf('run', p)} disabled={p.locked} onSelect={p.onSelect}>
        <line x1={X(1)} y1={Y(m + c)} x2={X(2)} y2={Y(m + c)} class="fig-edge fig-dash" />
        <line x1={X(1)} y1={Y(m + c)} x2={X(2)} y2={Y(m + c)} class="hs-hit-line" />
      </Region>

      <Region id="rise" label="the step up, which is the gradient" selected={p.selected === 'rise'}
        state={stateOf('rise', p)} disabled={p.locked} onSelect={p.onSelect}>
        <line x1={X(2)} y1={Y(m + c)} x2={X(2)} y2={Y(2 * m + c)} class="fig-edge fig-dash" />
        <line x1={X(2)} y1={Y(m + c)} x2={X(2)} y2={Y(2 * m + c)} class="hs-hit-line" />
      </Region>

      <Region id="y-intercept" label="where the line crosses the y axis"
        selected={p.selected === 'y-intercept'} state={stateOf('y-intercept', p)}
        disabled={p.locked} onSelect={p.onSelect}>
        <circle cx={X(0)} cy={Y(c)} r="6" class="fig-vertex" />
        <circle cx={X(0)} cy={Y(c)} r="18" class="hs-hit" />
      </Region>

      <Region id="x-intercept" label="where the line crosses the x axis"
        selected={p.selected === 'x-intercept'} state={stateOf('x-intercept', p)}
        disabled={p.locked} onSelect={p.onSelect}>
        <circle cx={X(-c / m)} cy={Y(0)} r="6" class="fig-vertex" />
        <circle cx={X(-c / m)} cy={Y(0)} r="18" class="hs-hit" />
      </Region>

      <Region id="origin" label="the origin" selected={p.selected === 'origin'}
        state={stateOf('origin', p)} disabled={p.locked} onSelect={p.onSelect}>
        <circle cx={X(0)} cy={Y(0)} r="5" class="fig-vertex fig-vertex-muted" />
        <circle cx={X(0)} cy={Y(0)} r="16" class="hs-hit" />
      </Region>

      <Region id="point-on-line" label="a point that lies on the line"
        selected={p.selected === 'point-on-line'} state={stateOf('point-on-line', p)}
        disabled={p.locked} onSelect={p.onSelect}>
        <circle cx={X(4)} cy={Y(4 * m + c)} r="6" class="fig-vertex" />
        <circle cx={X(4)} cy={Y(4 * m + c)} r="18" class="hs-hit" />
      </Region>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Distance–time graph — reading speed from a graph
   -------------------------------------------------------------------------- */

function DistanceTime(p: FigureProps) {
  const X = (t: number) => 46 + t * 58;
  const Y = (d: number) => 196 - d * 3.2;
  // A journey: fast out, a stop, then slower on.
  const pts: Array<[number, number]> = [[0, 0], [1, 40], [2.5, 40], [5, 55]];

  return (
    <Frame viewBox="0 0 360 240" label="A distance–time graph of a journey">
      <g class="fig-grid" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((t) => <line key={`v${t}`} x1={X(t)} y1={Y(0)} x2={X(t)} y2={Y(60)} />)}
        {[0, 20, 40, 60].map((d) => <line key={`h${d}`} x1={X(0)} y1={Y(d)} x2={X(5)} y2={Y(d)} />)}
      </g>
      <g class="fig-axis" aria-hidden="true">
        <line x1={X(0)} y1={Y(0)} x2={X(5)} y2={Y(0)} />
        <line x1={X(0)} y1={Y(0)} x2={X(0)} y2={Y(60)} />
        <text x={X(2.5)} y="228" text-anchor="middle" class="fig-label">Time (hours)</text>
        <text x="14" y="110" class="fig-label" transform="rotate(-90 14 110)" text-anchor="middle">Distance (km)</text>
      </g>

      {([['fastest', 0, 'the steepest section, where the speed is greatest'],
         ['stationary', 1, 'the flat section, where nothing moves'],
         ['slowest', 2, 'the gentlest sloping section']] as const).map(([id, i, label]) => {
        const [t1, d1] = pts[i]!, [t2, d2] = pts[i + 1]!;
        return (
          <Region key={id} id={id} label={label} selected={p.selected === id}
            state={stateOf(id, p)} disabled={p.locked} onSelect={p.onSelect}>
            <line x1={X(t1)} y1={Y(d1)} x2={X(t2)} y2={Y(d2)} class="fig-line" />
            <line x1={X(t1)} y1={Y(d1)} x2={X(t2)} y2={Y(d2)} class="hs-hit-line" />
          </Region>
        );
      })}

      <Region id="start" label="the start of the journey" selected={p.selected === 'start'}
        state={stateOf('start', p)} disabled={p.locked} onSelect={p.onSelect}>
        <circle cx={X(0)} cy={Y(0)} r="6" class="fig-vertex" />
        <circle cx={X(0)} cy={Y(0)} r="18" class="hs-hit" />
      </Region>
      <Region id="finish" label="the end of the journey" selected={p.selected === 'finish'}
        state={stateOf('finish', p)} disabled={p.locked} onSelect={p.onSelect}>
        <circle cx={X(5)} cy={Y(55)} r="6" class="fig-vertex" />
        <circle cx={X(5)} cy={Y(55)} r="18" class="hs-hit" />
      </Region>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Cylinder — surface area parts
   -------------------------------------------------------------------------- */

function Cylinder(p: FigureProps) {
  const cx = 180, top = 56, bot = 190, rx = 74, ry = 22;
  return (
    <Frame viewBox="0 0 360 240" label="A cylinder">
      <Region id="curved-surface" label="the curved surface around the outside"
        selected={p.selected === 'curved-surface'} state={stateOf('curved-surface', p)}
        disabled={p.locked} onSelect={p.onSelect}>
        <path d={`M${cx - rx} ${top} L${cx - rx} ${bot} A${rx} ${ry} 0 0 0 ${cx + rx} ${bot} L${cx + rx} ${top}`}
          class="fig-fill fig-stroke" />
        <path d={`M${cx - rx} ${top} L${cx - rx} ${bot} A${rx} ${ry} 0 0 0 ${cx + rx} ${bot} L${cx + rx} ${top} Z`}
          class="hs-hit" />
      </Region>

      <Region id="top-face" label="the flat circle on top" selected={p.selected === 'top-face'}
        state={stateOf('top-face', p)} disabled={p.locked} onSelect={p.onSelect}>
        <ellipse cx={cx} cy={top} rx={rx} ry={ry} class="fig-fill-strong fig-stroke" />
        <ellipse cx={cx} cy={top} rx={rx} ry={ry} class="hs-hit" />
      </Region>

      <Region id="bottom-face" label="the flat circle underneath" selected={p.selected === 'bottom-face'}
        state={stateOf('bottom-face', p)} disabled={p.locked} onSelect={p.onSelect}>
        <path d={`M${cx - rx} ${bot} A${rx} ${ry} 0 0 0 ${cx + rx} ${bot}`} class="fig-stroke" fill="none" />
        <ellipse cx={cx} cy={bot} rx={rx} ry={ry} class="hs-hit" />
      </Region>

      <Region id="height" label="the height of the cylinder" selected={p.selected === 'height'}
        state={stateOf('height', p)} disabled={p.locked} onSelect={p.onSelect}>
        <line x1={cx + rx + 26} y1={top} x2={cx + rx + 26} y2={bot} class="fig-edge fig-dash" />
        <line x1={cx + rx + 26} y1={top} x2={cx + rx + 26} y2={bot} class="hs-hit-line" />
      </Region>

      <Region id="radius" label="the radius of the circular face" selected={p.selected === 'radius'}
        state={stateOf('radius', p)} disabled={p.locked} onSelect={p.onSelect}>
        <line x1={cx} y1={top} x2={cx + rx} y2={top} class="fig-edge fig-dash" />
        <line x1={cx} y1={top} x2={cx + rx} y2={top} class="hs-hit-line" />
      </Region>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Probability tree diagram
   -------------------------------------------------------------------------- */

function TreeDiagram(p: FigureProps) {
  const { first = ['A', 'B'], second = ['A', 'B'], p1 = '', p2 = '' } = p.config;
  const x0 = 40, x1 = 150, x2 = 268;
  const yTop = 70, yBot = 170, spread = 34;

  const branch = (id: string, from: [number, number], to: [number, number], label: string, tag?: string) => (
    <Region key={id} id={id} label={label} selected={p.selected === id}
      state={stateOf(id, p)} disabled={p.locked} onSelect={p.onSelect}>
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} class="fig-edge" />
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} class="hs-hit-line" />
      {tag ? <text x={(from[0] + to[0]) / 2} y={(from[1] + to[1]) / 2 - 8}
        text-anchor="middle" class="fig-label">{tag}</text> : null}
    </Region>
  );

  return (
    <Frame viewBox="0 0 360 240" label="A probability tree diagram">
      {branch('branch-a', [x0, 120], [x1, yTop], `the first ${first[0]} branch`, p1)}
      {branch('branch-b', [x0, 120], [x1, yBot], `the first ${first[1]} branch`, p1 ? '' : undefined)}

      {branch('branch-aa', [x1, yTop], [x2, yTop - spread], `the second ${second[0]} branch after ${first[0]}`, p2)}
      {branch('branch-ab', [x1, yTop], [x2, yTop + spread], `the second ${second[1]} branch after ${first[0]}`)}
      {branch('branch-ba', [x1, yBot], [x2, yBot - spread], `the second ${second[0]} branch after ${first[1]}`)}
      {branch('branch-bb', [x1, yBot], [x2, yBot + spread], `the second ${second[1]} branch after ${first[1]}`)}

      <g class="fig-label" aria-hidden="true">
        <text x={x1 + 6} y={yTop - 6}>{first[0]}</text>
        <text x={x1 + 6} y={yBot + 18}>{first[1]}</text>
        <text x={x2 + 8} y={yTop - spread + 4}>{second[0]}</text>
        <text x={x2 + 8} y={yTop + spread + 4}>{second[1]}</text>
        <text x={x2 + 8} y={yBot - spread + 4}>{second[0]}</text>
        <text x={x2 + 8} y={yBot + spread + 4}>{second[1]}</text>
      </g>
    </Frame>
  );
}


/* --------------------------------------------------------------------------
   Two parallel lines cut by a transversal — alternate, corresponding,
   co-interior and vertically opposite angles.
   Region ids: p-tl p-tr p-bl p-br (top crossing) and q-tl q-tr q-bl q-br
   (bottom crossing); t = above the line, b = below, l/r = side of the
   transversal. The acute angles are tr and bl; the obtuse are tl and br.
   config.given       region id to shade as the known angle (not clickable)
   config.givenLabel  text written in it, e.g. "56°" or "a"
   -------------------------------------------------------------------------- */

function ParallelLines(p: FigureProps) {
  const given: string | undefined = p.config.given;
  const givenLabel: string = p.config.givenLabel ?? '';
  const yP = 80, yQ = 170;
  // Transversal from (110, 230) up to (250, 20).
  const xAt = (y: number) => 110 + ((230 - y) * 140) / 210;
  const up = (Math.atan2(-210, 140) * 180) / Math.PI;   // ≈ −56.3°
  const down = up + 180;                                  // ≈ 123.7°
  const R = 30;
  const sectors: Record<string, [number, number]> = {
    tr: [up, 0], tl: [180, 360 + up], bl: [down, 180], br: [0, down],
  };
  const pt = (cx: number, cy: number, deg: number, r = R) =>
    [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)] as const;
  const wedge = (cx: number, cy: number, [a, b]: [number, number]) => {
    const [x1, y1] = pt(cx, cy, a), [x2, y2] = pt(cx, cy, b);
    const large = b - a > 180 ? 1 : 0;
    return `M${cx} ${cy} L${x1.toFixed(1)} ${y1.toFixed(1)} A${R} ${R} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
  };
  const names: Record<string, string> = {
    tl: 'above the line, left of the crossing line', tr: 'above the line, right of the crossing line',
    bl: 'below the line, left of the crossing line', br: 'below the line, right of the crossing line',
  };

  const angle = (which: 'p' | 'q', k: string) => {
    const id = `${which}-${k}`;
    const cx = xAt(which === 'p' ? yP : yQ), cy = which === 'p' ? yP : yQ;
    const [a, b] = sectors[k]!;
    const [lx, ly] = pt(cx, cy, (a + b) / 2, R + 14);
    if (id === given) {
      return (
        <g key={id} aria-hidden="true">
          <path d={wedge(cx, cy, sectors[k]!)} class="fig-fill-strong" />
          <text x={lx} y={ly + 4} text-anchor="middle" class="fig-label" font-weight="700">{givenLabel}</text>
        </g>
      );
    }
    return (
      <Region key={id} id={id} label={`the angle at the ${which === 'p' ? 'top' : 'bottom'} crossing, ${names[k]}`}
        selected={p.selected === id} state={stateOf(id, p)} disabled={p.locked} onSelect={p.onSelect}>
        <path d={wedge(cx, cy, sectors[k]!)} class="hs-hit hs-wedge" />
      </Region>
    );
  };

  const arrow = (x: number, y: number) => <path d={`M${x - 6} ${y - 6} L${x} ${y} L${x - 6} ${y + 6}`} class="fig-edge" />;

  return (
    <Frame viewBox="0 0 360 250" label="Two parallel lines crossed by a third line, making eight angles">
      <line x1="20" y1={yP} x2="340" y2={yP} class="fig-edge" />
      <line x1="20" y1={yQ} x2="340" y2={yQ} class="fig-edge" />
      {arrow(300, yP)}{arrow(300, yQ)}
      <line x1="110" y1="230" x2="250" y2="20" class="fig-edge fig-edge-hyp" />
      {(['tl', 'tr', 'bl', 'br'] as const).flatMap((k) => [angle('p', k), angle('q', k)])}
    </Frame>
  );
}


/* --------------------------------------------------------------------------
   Scatter graph — click a point (e.g. the outlier) or a region of the plot.
   Region ids: p0, p1, … one per point, in the order given.
   config.points   [[x, y], …] data values
   config.xLabel / yLabel   axis titles
   config.xRange / yRange   [min, max] (default: fitted to the data)
   config.line     [[x1, y1], [x2, y2]] optional line of best fit
   -------------------------------------------------------------------------- */

function ScatterGraph(p: FigureProps) {
  const pts: Array<[number, number]> = p.config.points ?? [[1, 2], [2, 3], [3, 5], [4, 4], [5, 6]];
  const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]);
  const pad = (lo: number, hi: number) => { const d = (hi - lo) || 1; return [lo - d * 0.1, hi + d * 0.1]; };
  const [x0, x1] = p.config.xRange ?? pad(Math.min(...xs), Math.max(...xs));
  const [y0, y1] = p.config.yRange ?? pad(Math.min(...ys), Math.max(...ys));
  const L = 48, R = 340, T = 14, B = 196;
  const X = (x: number) => L + ((x - x0) / (x1 - x0)) * (R - L);
  const Y = (y: number) => B - ((y - y0) / (y1 - y0)) * (B - T);
  const line: Array<[number, number]> | undefined = p.config.line;
  const ticks = (a: number, b: number) => Array.from({ length: 5 }, (_, i) => a + ((b - a) * i) / 4);
  const fmt = (n: number) => String(Math.round(n * 10) / 10);

  return (
    <Frame viewBox="0 0 360 240" label={`A scatter graph of ${p.config.yLabel ?? 'y'} against ${p.config.xLabel ?? 'x'}`}>
      <g class="fig-grid" aria-hidden="true">
        {ticks(x0, x1).map((t) => <line key={`gx${t}`} x1={X(t)} y1={T} x2={X(t)} y2={B} />)}
        {ticks(y0, y1).map((t) => <line key={`gy${t}`} x1={L} y1={Y(t)} x2={R} y2={Y(t)} />)}
      </g>
      <line x1={L} y1={B} x2={R} y2={B} class="fig-axis-strong" />
      <line x1={L} y1={B} x2={L} y2={T} class="fig-axis-strong" />
      <g class="fig-tick" aria-hidden="true">
        {ticks(x0, x1).map((t) => <text key={`tx${t}`} x={X(t)} y={B + 14} text-anchor="middle">{fmt(t)}</text>)}
        {ticks(y0, y1).map((t) => <text key={`ty${t}`} x={L - 6} y={Y(t) + 4} text-anchor="end">{fmt(t)}</text>)}
      </g>
      <text x={(L + R) / 2} y={B + 32} text-anchor="middle" class="fig-label">{p.config.xLabel ?? ''}</text>
      <text x={12} y={(T + B) / 2} text-anchor="middle" class="fig-label" transform={`rotate(-90 12 ${(T + B) / 2})`}>{p.config.yLabel ?? ''}</text>
      {line ? <line x1={X(line[0]![0])} y1={Y(line[0]![1])} x2={X(line[1]![0])} y2={Y(line[1]![1])} class="fig-line" /> : null}
      {pts.map(([x, y], i) => {
        const id = `p${i}`;
        return (
          <Region key={id} id={id} label={`the point (${x}, ${y})`} selected={p.selected === id}
            state={stateOf(id, p)} disabled={p.locked} onSelect={p.onSelect}>
            <circle cx={X(x)} cy={Y(y)} r="5" class="fig-vertex" />
            <circle cx={X(x)} cy={Y(y)} r="13" class="hs-hit" />
          </Region>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Registry
   -------------------------------------------------------------------------- */

export const FIGURES: Record<string, (p: FigureProps) => any> = {
  'right-triangle': RightTriangle,
  'circle-parts': CircleParts,
  'line-graph': LineGraph,
  'distance-time': DistanceTime,
  'cylinder': Cylinder,
  'tree-diagram': TreeDiagram,
  'parallel-lines': ParallelLines,
  'scatter-graph': ScatterGraph,
};

/** Every region id a figure offers — used by the hotspot widget's key list. */
export const FIGURE_REGIONS: Record<string, string[]> = {
  'right-triangle': ['hypotenuse', 'leg-a', 'leg-b', 'right-angle', 'vertex-a', 'vertex-b', 'vertex-c'],
  'circle-parts': ['centre', 'radius', 'diameter', 'circumference', 'chord'],
  'line-graph': ['y-intercept', 'x-intercept', 'origin', 'rise', 'run', 'point-on-line'],
  'distance-time': ['fastest', 'stationary', 'slowest', 'start', 'finish'],
  'cylinder': ['curved-surface', 'top-face', 'bottom-face', 'height', 'radius'],
  'tree-diagram': ['branch-a', 'branch-b', 'branch-aa', 'branch-ab', 'branch-ba', 'branch-bb'],
  'parallel-lines': ['p-tl', 'p-tr', 'p-bl', 'p-br', 'q-tl', 'q-tr', 'q-bl', 'q-br'],
  'scatter-graph': ['p0', 'p1', 'p2', '… one per point in config.points'],
};
