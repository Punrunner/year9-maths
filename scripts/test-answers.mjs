/**
 * Checks the answer-marking rules against a list of cases.
 * Run with:  node scripts/test-answers.mjs
 *
 * Add a line here whenever you find a form a student typed that should have
 * been accepted (or should not have been) — it takes seconds and stops the
 * same marking bug coming back.
 */
import { checkTyped, checkAlgebraic, checkSurd, textMatches, toNumber } from '../src/lib/answer.ts';

let pass = 0;
let fail = 0;

function check(label, actual, expected) {
  const ok = actual === expected;
  if (ok) { pass++; } else {
    fail++;
    console.log(`  FAIL  ${label}\n        got ${actual}, expected ${expected}`);
  }
}

console.log('\nNumber parsing');
check('"3/4" -> 0.75', toNumber('3/4'), 0.75);
check('"2 1/2" -> 2.5', toNumber('2 1/2'), 2.5);
check('"-3/4" -> -0.75', toNumber('-3/4'), -0.75);
check('"75%" -> 0.75', toNumber('75%'), 0.75);
check('"1,200" -> 1200', toNumber('1,200'), 1200);
check('"1.5e8" -> 1.5e8', toNumber('1.5e8'), 1.5e8);
check('"1.5 x 10^8" -> 1.5e8', toNumber('1.5 x 10^8'), 1.5e8);
check('unicode minus "−3" -> -3', toNumber('−3'), -3);
check('"2pi" -> 2pi', toNumber('2pi'), 2 * Math.PI);
check('"banana" -> null', toNumber('banana'), null);
check('"" -> null', toNumber(''), null);
check('"1/0" -> null', toNumber('1/0'), null);

console.log('\nTyped answers');
check('0.75 accepted for 3/4', checkTyped('0.75', ['3/4']), true);
check('3/4 accepted for 0.75', checkTyped('3/4', [0.75]), true);
check('75% accepted for 3/4', checkTyped('75%', ['3/4']), true);
check('3.14 within 0.01 of pi', checkTyped('3.14', [Math.PI], 0.01), true);
check('3.1 NOT within 0.01 of pi', checkTyped('3.1', [Math.PI], 0.01), false);
check('exact 0.25 accepted', checkTyped('0.25', [0.25]), true);
check('wrong number rejected', checkTyped('0.26', [0.25]), false);
check('word answer accepted', checkTyped('Independent', ['independent']), true);
check('word with trailing stop accepted', checkTyped('independent.', ['independent']), true);
check('empty rejected', checkTyped('', [1]), false);
check('"H2" accepted', checkTyped('h2', ['H2']), true);

console.log('\nAlgebraic equivalence');
const cases = [
  ['3x + 12', '3x + 12', ['x'], true],
  ['12 + 3x', '3x + 12', ['x'], true],
  ['3(x + 4)', '3x + 12', ['x'], true],
  ['3x + 11', '3x + 12', ['x'], false],
  ['x^2 - 7', 'n^2 - 7', ['n'], false],
  ['n^2 - 7', 'n^2 - 7', ['n'], true],
  ['4n - 1', '4n - 1', ['n'], true],
  ['-1 + 4n', '4n - 1', ['n'], true],
  ['y = 4n - 1', '4n - 1', ['n'], true],
  ['(x+3)(x-2)', 'x^2 + x - 6', ['x'], true],
  ['2a + 3b', '3b + 2a', ['a', 'b'], true],
  ['2a + 3b', '2a - 3b', ['a', 'b'], false],
  ['20 - 2n', '18 - 2(n - 1)', ['n'], true],
  ['not an expression (((', '3x', ['x'], false],
  // Letters written side by side mean multiplication: "xz" is x × z.
  ['3xz/y', '3*x*z/y', ['x', 'y', 'z'], true],
  ['6pr', '6*p*r', ['p', 'r'], true],
  ['6rp', '6pr', ['p', 'r'], true],
  ['4xy^2', '4*x*y^2', ['x', 'y'], true],
  ['4xy^2', '4*(x*y)^2', ['x', 'y'], false],
  ['-pq', '3pq - 8pq + 4pq', ['p', 'q'], true],
  ['bc/a^2', 'a^-2*b*c', ['a', 'b', 'c'], true],
  ['sqrt(A/pi)', 'sqrt(A/pi)', ['A'], true],
];

for (const [input, answer, vars, expected] of cases) {
  const got = await checkAlgebraic(input, answer, vars, false);
  check(`"${input}" vs "${answer}"`, got, expected);
}

console.log('\nrequireForm (factorised answers)');
check('factorised accepted', await checkAlgebraic('(x+3)(x-2)', '(x+3)(x-2)', ['x'], true), true);
check('expanded rejected when form required',
  await checkAlgebraic('x^2 + x - 6', '(x+3)(x-2)', ['x'], true), false);
// A variable next to a bracket is multiplication, not a function call.
check('"3x(2x+3)" is 6x^2 + 9x', await checkAlgebraic('3x(2x+3)', '6x^2 + 9x', ['x'], false), true);

console.log('\nSurds');
const surdCases = [
  // [typed, answer, simplest, expected]
  ['5√2', '5sqrt2', true, true],
  ['5 sqrt(2)', '5sqrt2', true, true],
  ['√2 × 5', '5sqrt2', true, true],
  ['√50', '5sqrt2', true, false],          // right value, not simplified
  ['√50', '5sqrt2', false, true],
  ['7.07', '5sqrt2', false, false],        // decimals are never exact
  ['-2√3 + 5', '5 - 2sqrt3', true, true],
  ['8 - 3√3', '5 - 2sqrt3', true, false],  // √3 × √3 taken as √3
  ['5/7 + 4√2/7', '(5 + 4sqrt2)/7', true, true],
  ['(1+√2)/(3-√2)', '(5 + 4sqrt2)/7', true, false], // denominator not rationalised
  ['12/√3', '4sqrt3', true, false],
  ['-3 + √12', '-3 + 2sqrt3', false, true],
  ['2 + √(5/2)', '(4 + sqrt10)/2', false, true],
  ['(-3+√41)/4', '(-3 + sqrt41)/4', true, true],
  // What the √ key types: √( … ) with brackets.
  ['5√(2)', '5sqrt2', true, true],
  ['(-3+√(41))/4', '(-3 + sqrt41)/4', true, true],
  ['√(12)', '2sqrt3', true, false],
];
for (const [input, answer, simplest, expected] of surdCases) {
  check(`"${input}" vs "${answer}"${simplest ? ' (simplest)' : ''}`, await checkSurd(input, answer, simplest), expected);
}

console.log('\nSymbols from the maths keys');
check('"x ≤ -3" matches "x<=-3"', textMatches('x ≤ -3', 'x<=-3'), true);
check('"k ≥ 9" matches "k>=9"', textMatches('k ≥ 9', 'k>=9'), true);
check('"16y²" matches "16y^2"', textMatches('16y²', '16y^2'), true);
check('"4x² - 4x + 1" algebra', await checkAlgebraic('4x² - 4x + 1', '4x^2 - 4x + 1', ['x'], true), true);

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
