/* ==========================================================================
   ANSWER CHECKING
   --------------------------------------------------------------------------
   Marking a student's typing is the fiddly part of any maths site, so it all
   lives here:

     • numbers          "0.75", "3/4", "2 1/2", "75%", "1.5e8", "1,200", "−3"
     • tolerances       3.14 counts as pi when tolerance is 0.01
     • algebra          "12 + 3x" counts as "3x + 12" (checked by maths,
                        not by comparing the letters)

   math.js is only loaded when an algebraic question is actually answered, so
   students who never meet one never download it.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Numbers
   -------------------------------------------------------------------------- */

/** Tidy up the characters a student (or a phone keyboard) might produce. */
export function normaliseText(raw: string): string {
  return raw
    .trim()
    .replace(/[−–—]/g, '-')  // − – —  →  -
    .replace(/[×⋅]/g, '*')        // ×  ⋅   →  *
    .replace(/÷/g, '/')                // ÷      →  /
    .replace(/π/g, 'pi')               // π      →  pi
    .replace(/√/g, 'sqrt')             // √      →  sqrt
    .replace(/²/g, '^2')               // ²
    .replace(/³/g, '^3')               // ³
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ');
}

/**
 * Read a student's answer as a number, understanding the forms Year 9
 * students actually type. Returns null if it is not a number at all.
 */
export function toNumber(raw: string | number): number | null {
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : null;

  let s = normaliseText(String(raw));
  if (!s) return null;

  // Thousands separators: 1,200 → 1200 (but leave 1,2 alone — likely a list).
  s = s.replace(/(\d),(?=\d{3}\b)/g, '$1');

  // Percentages: 75% → 0.75
  const pct = s.match(/^(-?[\d.]+)\s*%$/);
  if (pct) {
    const n = Number(pct[1]);
    return Number.isFinite(n) ? n / 100 : null;
  }

  // Mixed number: 2 1/2 → 2.5   (also handles -2 1/2)
  const mixed = s.match(/^(-?)(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixed) {
    const sign = mixed[1] === '-' ? -1 : 1;
    const den = Number(mixed[4]);
    if (den === 0) return null;
    return sign * (Number(mixed[2]) + Number(mixed[3]) / den);
  }

  // Simple fraction: -3/4
  const frac = s.match(/^(-?\d*\.?\d+)\s*\/\s*(-?\d*\.?\d+)$/);
  if (frac) {
    const den = Number(frac[2]);
    if (den === 0) return null;
    return Number(frac[1]) / den;
  }

  // Multiples of pi: 2pi, -pi, 3 pi
  const piMatch = s.match(/^(-?\d*\.?\d*)\s*pi$/);
  if (piMatch) {
    const coef = piMatch[1] === '' || piMatch[1] === '-' ? Number(`${piMatch[1]}1`) : Number(piMatch[1]);
    return Number.isFinite(coef) ? coef * Math.PI : null;
  }

  // Plain number, including 1.5e8 and 1.5 x 10^8
  const sci = s.match(/^(-?\d*\.?\d+)\s*(?:\*|x|X)\s*10\s*\^?\s*(-?\d+)$/);
  if (sci) return Number(sci[1]) * Math.pow(10, Number(sci[2]));

  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/**
 * Compare two numbers with a tolerance.
 * A tolerance of 0 means "exact", but still allows for the tiny rounding
 * error that floating point introduces (1e-9 relative).
 */
export function numbersMatch(a: number, b: number, tolerance = 0): boolean {
  if (tolerance > 0) return Math.abs(a - b) <= tolerance + 1e-12;
  const scale = Math.max(1, Math.abs(a), Math.abs(b));
  return Math.abs(a - b) <= 1e-9 * scale;
}

/** Loose text comparison: ignores case, spaces and trailing punctuation. */
export function textMatches(input: string, accepted: string): boolean {
  const tidy = (s: string) =>
    normaliseText(s).toLowerCase().replace(/[\s.]+$/g, '').replace(/\s+/g, '');
  return tidy(input) === tidy(accepted);
}

/**
 * The general "did they type the right thing?" check used by numeric entry,
 * fill-in-the-blank, table cells and quick-fire drills.
 */
export function checkTyped(
  input: string,
  accepted: Array<string | number>,
  tolerance = 0,
): boolean {
  const typed = input.trim();
  if (!typed) return false;

  for (const a of accepted) {
    // 1. Straight text match — handles words like "independent" or "n^2 - 7".
    if (typeof a === 'string' && textMatches(typed, a)) return true;

    // 2. Numeric match — handles 0.75 vs 3/4 vs 75%.
    const want = toNumber(a);
    const got = toNumber(typed);
    if (want !== null && got !== null && numbersMatch(got, want, tolerance)) return true;
  }
  return false;
}

/* --------------------------------------------------------------------------
   Algebra
   -------------------------------------------------------------------------- */

/**
 * Cached math.js loader. The number-only build of math.js is a fraction of the
 * size of the full one and covers everything a Year 9 expression needs.
 */
type MathJs = typeof import('mathjs');
let parserPromise: Promise<MathJs> | undefined;

function loadMath(): Promise<MathJs> {
  parserPromise ??= import('mathjs/number') as unknown as Promise<MathJs>;
  return parserPromise;
}

/** Make a student's expression parseable: 3x → 3x is fine, but ² and √ are not. */
function normaliseExpression(raw: string, answerHasEquals: boolean): string {
  let s = normaliseText(raw)
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=');

  // "y = 3x + 1" when we only wanted "3x + 1".
  if (!answerHasEquals && s.includes('=')) {
    s = s.slice(s.lastIndexOf('=') + 1).trim();
  }
  return s;
}

/** Names math.js knows that must never be split into single letters. */
const RESERVED = new Set(['sqrt', 'cbrt', 'pi', 'abs', 'exp', 'log', 'sin', 'cos', 'tan']);

/**
 * Students write "3xz" meaning 3 × x × z, but math.js reads "xz" as one
 * unknown name. Split any run of letters made only of this question's
 * variables into a product: "xz" → "x z", "pqr" → "p q r" (implicit multiplication).
 */
function splitVariables(s: string, variables: string[]): string {
  const vars = new Set(variables.filter((v) => v.length === 1));
  if (!vars.size) return s;
  return s.replace(/[A-Za-z]{2,}/g, (word) =>
    !RESERVED.has(word) && [...word].every((ch) => vars.has(ch))
      ? [...word].join(' ')
      : word,
  );
}

/** Deterministic sample points — no singularities at 0, 1 or −1. */
const SAMPLES = [1.37, 2.61, -0.83, 3.19, 0.47, -2.11, 4.03, 1.09, -3.57, 2.93, 0.21, -1.44];

/**
 * Are two expressions mathematically the same?
 * Rather than comparing text, both are evaluated at a dozen sample values.
 * If they agree everywhere, they are equivalent — so "12 + 3x" passes for
 * "3x + 12", and so does "3(x + 4)".
 */
export async function expressionsEquivalent(
  input: string,
  answer: string,
  variables: string[] = ['x'],
): Promise<boolean> {
  const vars = variables.length ? variables : ['x'];
  const typed = splitVariables(normaliseExpression(input, answer.includes('=')), vars);
  if (!typed) return false;

  const math = await loadMath();

  let a: any, b: any;
  try {
    a = math.parse(typed);
    b = math.parse(splitVariables(normaliseText(answer), vars));
  } catch {
    return false; // The student typed something that is not an expression.
  }

  let agreed = 0;

  for (let i = 0; i < SAMPLES.length; i++) {
    const scope: Record<string, number> = {};
    vars.forEach((v, j) => {
      scope[v] = SAMPLES[(i + j * 5) % SAMPLES.length]!;
    });

    let va: number, vb: number;
    try {
      va = a.evaluate(scope);
      vb = b.evaluate(scope);
    } catch {
      continue; // e.g. a division by zero at this sample — skip it.
    }
    if (typeof va !== 'number' || typeof vb !== 'number') return false;
    if (!Number.isFinite(va) || !Number.isFinite(vb)) continue;

    const scale = Math.max(1, Math.abs(va), Math.abs(vb));
    if (Math.abs(va - vb) > 1e-7 * scale) return false; // Disagree anywhere → wrong.
    agreed++;
  }

  // Require enough usable samples that agreement is meaningful.
  return agreed >= 5;
}

/**
 * Full check for the "algebraic" question type.
 * When `requireForm` is on (used for questions like "factorise …"), being
 * equivalent is not enough — the answer must also be written in the same
 * shape, which we judge by how many brackets it uses.
 */
export async function checkAlgebraic(
  input: string,
  answer: string,
  variables: string[] = ['x'],
  requireForm = false,
): Promise<boolean> {
  const equivalent = await expressionsEquivalent(input, answer, variables);
  if (!equivalent) return false;
  if (!requireForm) return true;

  const brackets = (s: string) => (s.match(/\(/g) ?? []).length;
  return brackets(normaliseText(input)) === brackets(normaliseText(answer));
}
