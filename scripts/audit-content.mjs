/**
 * Content audit. Run with:  npm run audit
 *
 * Reports what is in the site: how many topics, lessons and questions, which
 * question types are used where, any broken references, and anything still
 * flagged `"needsReview": true` for you to check.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const C = join(ROOT, 'src', 'content');

const ALL_TYPES = [
  'mcq', 'multi', 'truefalse', 'numeric', 'fill-blank', 'algebraic', 'match',
  'order', 'table', 'steps', 'hotspot', 'manipulable', 'flashcards', 'drill',
];

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const listJson = (dir) => existsSync(dir)
  ? readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => [f.replace(/\.json$/, ''), readJson(join(dir, f))])
  : [];

/** Minimal frontmatter reader — enough for the few fields we audit. */
function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].replace(/^['"]|['"]$/g, '');
  }
  return out;
}

function walkLessons(dir, base = '') {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return walkLessons(p, base ? `${base}/${e.name}` : e.name);
    if (!e.name.endsWith('.md')) return [];
    const id = (base ? `${base}/` : '') + e.name.replace(/\.md$/, '');
    return [[id, frontmatter(readFileSync(p, 'utf8'))]];
  });
}

/* ---------------------------------------------------------------- gather */

const strands = readJson(join(C, 'strands.json'));
const topics = listJson(join(C, 'topics'));
const lessons = walkLessons(join(C, 'lessons'));
const exercises = listJson(join(C, 'exercises'));
const quizzes = listJson(join(C, 'quizzes'));

const banks = [...exercises, ...quizzes];
const allQuestions = banks.flatMap(([id, b]) => (b.questions ?? []).map((q) => ({ ...q, bank: id })));

/* ------------------------------------------------------------- summarise */

console.log('\n── Year 9 Maths — content audit ──\n');

console.log(`Strands            ${strands.length}`);
console.log(`Topics             ${topics.length}`);
console.log(`  with lessons     ${new Set(lessons.map(([, f]) => f.topic)).size}`);
console.log(`Lessons            ${lessons.length}`);
console.log(`Practice sets      ${exercises.length}`);
console.log(`Quizzes            ${quizzes.length}`);
console.log(`Questions total    ${allQuestions.length}`);
console.log(`  in practice      ${exercises.reduce((n, [, b]) => n + b.questions.length, 0)}`);
console.log(`  in quizzes       ${quizzes.reduce((n, [, b]) => n + b.questions.length, 0)}`);

/* ---------------------------------------------------- type coverage */

console.log('\nQuestion types used\n');
const counts = Object.fromEntries(ALL_TYPES.map((t) => [t, 0]));
for (const q of allQuestions) {
  if (q.type in counts) counts[q.type]++;
  else console.log(`  ! unknown type "${q.type}" in ${q.bank}#${q.id}`);
}
for (const t of ALL_TYPES) {
  const n = counts[t];
  const bar = '█'.repeat(Math.min(30, n));
  console.log(`  ${t.padEnd(12)} ${String(n).padStart(3)}  ${n === 0 ? '— NOT USED' : bar}`);
}
const unused = ALL_TYPES.filter((t) => counts[t] === 0);
console.log(unused.length
  ? `\n  ${unused.length} of 14 types not yet used: ${unused.join(', ')}`
  : '\n  All 14 question types are in use.');

/* ---------------------------------------------------- per topic */

console.log('\nPer topic\n');
for (const [tid, t] of topics.sort((a, b) => a[1].order - b[1].order)) {
  const mine = lessons.filter(([, f]) => f.topic === tid);
  const myBanks = banks.filter(([id, b]) =>
    mine.some(([, f]) => f.practice === id) || b.topic === tid);
  const types = new Set(myBanks.flatMap(([, b]) => (b.questions ?? []).map((q) => q.type)));
  const qCount = myBanks.reduce((n, [, b]) => n + (b.questions?.length ?? 0), 0);
  const flag = mine.length === 0 ? '  (no lessons yet)' : '';
  console.log(`  ${String(t.order).padStart(2)}. ${t.title.padEnd(38)} ${String(mine.length).padStart(2)} lessons  ` +
    `${String(qCount).padStart(3)} questions  ${String(types.size).padStart(2)} types${flag}`);
}

/* ---------------------------------------------------- integrity */

console.log('\nChecks\n');
const problems = [];

const topicIds = new Set(topics.map(([id]) => id));
const strandIds = new Set(strands.map((s) => s.id));
const exerciseIds = new Set(exercises.map(([id]) => id));

for (const [id, t] of topics) {
  if (!strandIds.has(t.strand)) problems.push(`topic "${id}" points at missing strand "${t.strand}"`);
}
for (const [id, f] of lessons) {
  if (!topicIds.has(f.topic)) problems.push(`lesson "${id}" points at missing topic "${f.topic}"`);
  if (f.practice && !exerciseIds.has(f.practice)) {
    problems.push(`lesson "${id}" wants practice set "${f.practice}", which does not exist`);
  }
}
for (const [id, q] of quizzes) {
  if (!topicIds.has(q.topic)) problems.push(`quiz "${id}" points at missing topic "${q.topic}"`);
}

// Duplicate question ids inside one bank break progress tracking.
for (const [id, b] of banks) {
  const seen = new Set();
  for (const q of b.questions ?? []) {
    if (seen.has(q.id)) problems.push(`bank "${id}" has two questions with id "${q.id}"`);
    seen.add(q.id);
  }
}

console.log(problems.length
  ? problems.map((p) => `  ✗ ${p}`).join('\n')
  : '  ✓ Every reference resolves and all question ids are unique.');

const review = allQuestions.filter((q) => q.needsReview);
console.log(review.length
  ? `\n  ${review.length} question(s) flagged for your review:\n` +
    review.map((q) => `    - ${q.bank}#${q.id}`).join('\n')
  : '  ✓ Nothing is flagged as needing review.');

console.log('');
process.exit(problems.length ? 1 : 0);
