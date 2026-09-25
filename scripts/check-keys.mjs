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
import yaml from 'js-yaml';
import { checkTyped, checkAlgebraic, checkSurd, toNumber, numbersMatch } from '../src/lib/answer.ts';
const only = process.argv[2] || '';
const files = ['exercises', 'quizzes'].flatMap(d => readdirSync(`src/content/${d}`).filter(f => f.endsWith('.json') && f.startsWith(only)).map(f => `src/content/${d}/${f}`));
let bad = 0; const flag = (f, q, m) => { bad++; console.log(`  ✗ ${f.split('/').pop()}#${q.id ?? ''}: ${m}`); };
const num = async (f, q, ans, acc = [], tol = 0) => {
  if (toNumber(ans) === null) flag(f, q, `answer "${ans}" not numeric`);
  for (const a of acc) { const n = toNumber(a); if (n !== null && toNumber(ans) !== null && !numbersMatch(n, toNumber(ans), tol) && !(q.unit === "%" && a.endsWith("%"))) flag(f, q, `accept "${a}" ≠ ${ans} (tol ${tol})`); }
  if (!checkTyped(String(ans), [ans, ...acc], tol)) flag(f, q, 'answer rejected');
};
// A literal dollar sign is written \$ and is not maths.
const hasMaths = s => (s.replace(/\\\$/g, '').match(/\$/g) || []).length % 2 !== 0;
// Questions placed inside lessons (activities: in the frontmatter).
const lessonBanks = readdirSync('src/content/lessons', { recursive: true })
  .map(String).filter(f => f.endsWith('.md') && f.split(String.fromCharCode(92)).join('/').startsWith(only))
  .map(f => {
    const text = readFileSync(`src/content/lessons/${f}`, 'utf8');
    const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const acts = fm ? (yaml.load(fm[1])?.activities ?? {}) : {};
    const questions = Object.entries(acts).filter(([, a]) => a.question).map(([id, a]) => ({ id, ...a.question }));
    return [`lessons/${f}`, { questions }];
  });

for (const [f, b] of [...files.map(f => [f, JSON.parse(readFileSync(f, 'utf8'))]), ...lessonBanks]) {
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
      case 'sort': { const all = q.groups.flatMap(g => g.items.map(i => i.id)); if (new Set(all).size !== all.length) flag(f, q, 'sort item ids repeat'); break; }
      case 'drill': for (const p of q.pool) if (!checkTyped(p.accept[0], p.accept, p.tolerance ?? 0)) flag(f, q, `drill ${p.id}`); if (q.pool.length < q.count) flag(f, q, 'pool < count'); break;
    }
  }
}
// Cambridge-style exam questions: every auto-checked answer line must pass its own check.
// (Fixed test papers in src/content/tests/ use the same question shape.)
const examFiles = ['exam', 'tests'].flatMap(d => readdirSync(`src/content/${d}`).filter(f => f.endsWith('.json') && f.startsWith(only)).map(f => `${d}/${f}`));
let examLines = 0;
for (const file of examFiles) {
  const f = `src/content/${file}`;
  for (const q of JSON.parse(readFileSync(f, 'utf8')).questions) {
    if (q.stem && hasMaths(q.stem)) flag(f, q, 'odd $ in stem');
    for (const leaf of q.parts.flatMap(p => p.parts ? [{ label: p.label, prompt: p.prompt ?? '' , group: true }, ...p.parts] : [p])) {
      const id = { id: `${q.id}(${leaf.label})` };
      for (const k of ['prompt', 'answer', 'answerPrefix', 'answerSuffix']) if (leaf[k] && hasMaths(leaf[k])) flag(f, id, `odd $ in ${k}`);
      for (const p of leaf.partial ?? []) if (hasMaths(p)) flag(f, id, 'odd $ in partial');
      if (leaf.group) continue;
      if (leaf.answerLines && (leaf.checks ?? []).length && leaf.checks.length !== leaf.answerLines.length) flag(f, id, 'checks do not match answerLines');
      const checks = leaf.answerLines ? (leaf.checks ?? []) : leaf.check ? [leaf.check] : [];
      for (const c of checks) {
        examLines++;
        if (c.kind === 'numeric') await num(f, id, c.answer, c.accept ?? [], c.tolerance ?? 0);
        if (c.kind === 'algebraic' && !(await checkAlgebraic(c.answer, c.answer, c.variables ?? ['x'], !!c.requireForm))) flag(f, id, 'algebraic self-check');
        if (c.kind === 'text' && !c.accept.every(a => checkTyped(a, c.accept))) flag(f, id, 'text accept');
        if (c.kind === 'surd' && !(await checkSurd(c.answer, c.answer, !!c.simplest))) flag(f, id, `surd self-check ${c.answer}`);
      }
    }
  }
}
if (examFiles.length) console.log(`exam: ${examLines} auto-checked answer lines in ${examFiles.length} files`);
console.log(bad ? `${bad} problems` : `all answer keys OK (${files.length} question files, ${lessonBanks.reduce((n, [, b]) => n + b.questions.length, 0)} lesson activities)`);
