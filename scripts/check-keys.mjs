/**
 * Answer-key check. Run with:  npm run keys
 *
 * Feeds every question's own correct answer back through the same marking
 * code the site uses, so you find out if the site would mark your answer key
 * wrong (a typo in an answer, an id that does not exist, an odd number of $
 * signs, a drill pool smaller than its count …). Run it after editing questions.
 *
 * Optional: npm run keys -- quadratics   (only files starting with that name)
 */
import { readdirSync, readFileSync } from 'node:fs';
import { checkTyped, checkAlgebraic, toNumber, numbersMatch } from '../src/lib/answer.ts';
const only = process.argv[2] || '';
const files = ['exercises', 'quizzes'].flatMap(d => readdirSync(`src/content/${d}`).filter(f => f.endsWith('.json') && f.startsWith(only)).map(f => `src/content/${d}/${f}`));
let bad = 0; const flag = (f, q, m) => { bad++; console.log(`  ✗ ${f.split('/').pop()}#${q.id ?? ''}: ${m}`); };
const num = async (f, q, ans, acc = [], tol = 0) => {
  if (toNumber(ans) === null) flag(f, q, `answer "${ans}" not numeric`);
  for (const a of acc) { const n = toNumber(a); if (n !== null && toNumber(ans) !== null && !numbersMatch(n, toNumber(ans), tol) && !(q.unit === "%" && a.endsWith("%"))) flag(f, q, `accept "${a}" ≠ ${ans} (tol ${tol})`); }
  if (!checkTyped(String(ans), [ans, ...acc], tol)) flag(f, q, 'answer rejected');
};
const hasMaths = s => (s.match(/\$/g) || []).length % 2 !== 0;
for (const f of files) {
  const b = JSON.parse(readFileSync(f, 'utf8'));
  for (const q of b.questions) {
    for (const k of ['prompt', 'explanation', 'text', 'scenario']) if (q[k] && hasMaths(q[k])) flag(f, q, `odd $ in ${k}`);
    const ids = o => (o || []).map(x => x.id);
    switch (q.type) {
      case 'numeric': await num(f, q, q.answer, q.accept, q.tolerance ?? 0); break;
      case 'mcq': if (!ids(q.options).includes(q.answer)) flag(f, q, 'mcq answer id'); break;
      case 'multi': for (const a of q.answers) if (!ids(q.options).includes(a)) flag(f, q, 'multi answer id'); break;
      case 'algebraic': if (!(await checkAlgebraic(q.answer, q.answer, q.variables ?? ['x'], !!q.requireForm))) flag(f, q, 'algebraic self-check'); break;
      case 'match': for (const [l, r] of Object.entries(q.solution)) if (!ids(q.left).includes(l) || !ids(q.right).includes(r)) flag(f, q, 'match ids'); if (Object.keys(q.solution).length !== q.left.length) flag(f, q, 'match incomplete'); break;
      case 'order': if (q.solution.length !== q.items.length || q.solution.some(s => !ids(q.items).includes(s))) flag(f, q, 'order ids'); break;
      case 'fill-blank': { const inText = [...q.text.matchAll(/\[\[(\w+)\]\]/g)].map(m => m[1]); for (const bl of q.blanks) if (!inText.includes(bl.id)) flag(f, q, `blank ${bl.id} not in text`); break; }
      case 'table': for (const r of q.rows) { if (r.length !== q.columns.length) flag(f, q, 'row width'); for (const c of r) if ('answer' in c && !checkTyped(c.answer, [c.answer, ...(c.accept || [])], c.tolerance ?? 0)) flag(f, q, `cell ${c.answer}`); } break;
      case 'steps': for (const s of q.steps) { if (s.kind === 'numeric') await num(f, { id: q.id + ':' + s.prompt.slice(0, 20) }, s.answer, s.accept, s.tolerance ?? 0); if (s.kind === 'mcq' && !ids(s.options).includes(s.answer)) flag(f, q, 'step mcq'); if (s.kind === 'algebraic' && !(await checkAlgebraic(s.answer, s.answer, s.variables ?? ['x'], false))) flag(f, q, 'step alg'); } break;
      case 'drill': for (const p of q.pool) if (!checkTyped(p.accept[0], p.accept, p.tolerance ?? 0)) flag(f, q, `drill ${p.id}`); if (q.pool.length < q.count) flag(f, q, 'pool < count'); break;
    }
  }
}
console.log(bad ? `${bad} problems` : `all answer keys OK (${files.length} files)`);
