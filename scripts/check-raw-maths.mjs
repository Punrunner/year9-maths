/* ==========================================================================
   RAW MATHS CHECK
   --------------------------------------------------------------------------
   Scans the built site (dist/) for maths that reached the page without being
   typeset — text such as "$\frac{1}{2}$" showing up literally.

   It looks in two places:
     1. the visible text of every page (tags, scripts and styles removed);
     2. the data handed to interactive components (astro-island props),
        skipping fields that already hold finished HTML (…Html) and the
        search index text, which is only matched against, never shown.

   Run after `npm run build`:   npm run check-maths
   ========================================================================== */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';

/** Every .html file under dist/. */
function pages(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...pages(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const decode = (s) => s
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>').replace(/&amp;/g, '&');

/** A bare TeX command, e.g. \frac or \times. */
const TEX = /\\(?:frac|dfrac|tfrac|text|times|div|sqrt|dot|le|ge|pi|circ|degree|quad|qquad|cdot|pm|mu|ldots|Rightarrow|xrightarrow|left|right)(?![a-zA-Z])/;

/**
 * True if the text holds maths that was never typeset: a TeX command, or a
 * $…$ pair with maths inside. Money such as "costs $19. Then $18" is not
 * maths: a pair whose inside starts with an amount then a space is skipped.
 */
function isRaw(text) {
  if (TEX.test(text)) return true;
  for (const [, inner] of text.matchAll(/\$([^$\n]{1,200})\$/g)) {
    if (/^\d[\d.,]*[.,]?\s/.test(inner)) continue;
    return true;
  }
  return false;
}

/** Remove typeset KaTeX from HTML, so its hidden copy of the source is ignored. */
const withoutKatex = (html) => html
  .replace(/<annotation[\s\S]*?<\/annotation>/g, ' ')
  .replace(/<span class="katex-mathml">[\s\S]*?<\/math><\/span>/g, ' ');

/** Visible text of an HTML fragment, one line per text node. */
const textLines = (html) => decode(
  withoutKatex(html)
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, '\n'),
).split('\n').map((l) => l.trim()).filter(Boolean);

const SKIP_KEYS = /^(href|id|src|text|widget|kind|type|strand|difficulty|slug)$/;

const problems = [];

for (const file of pages(DIST)) {
  const html = readFileSync(file, 'utf8');
  const page = '/' + relative(DIST, file).replace(/\\/g, '/').replace(/index\.html$/, '');

  // 1. Visible text of the page.
  for (const line of textLines(html)) {
    if (isRaw(line)) problems.push({ page, where: 'page text', text: line });
  }

  // 2. Strings passed to interactive islands. Astro serialises props as
  //    [type, value] pairs, so a string looks like "key":[0,"…"].
  for (const [, props] of html.matchAll(/<astro-island[^>]*\sprops="([^"]*)"/g)) {
    const json = decode(props);
    for (const [, key, value] of json.matchAll(/"([A-Za-z0-9_]+)":\[0,"((?:[^"\\]|\\.)*)"\]/g)) {
      if (SKIP_KEYS.test(key)) continue;
      let text;
      try { text = JSON.parse(`"${value}"`); } catch { text = value; }
      // …Html fields are finished HTML: check only what is left as text.
      const lines = /Html$/.test(key) ? textLines(text) : [text];
      for (const line of lines) {
        if (isRaw(line)) problems.push({ page, where: `component field "${key}"`, text: line });
      }
    }
  }
}

// Report each distinct text once, with the pages it appears on.
const byText = new Map();
for (const p of problems) {
  const k = `${p.where}|${p.text}`;
  if (!byText.has(k)) byText.set(k, { ...p, pages: new Set() });
  byText.get(k).pages.add(p.page);
}

if (byText.size === 0) {
  console.log('✓ No untypeset maths found on any page.');
} else {
  for (const p of byText.values()) {
    const list = [...p.pages];
    console.log(`✗ [${p.where}] ${p.text.slice(0, 160)}`);
    console.log(`    on ${list.slice(0, 3).join(', ')}${list.length > 3 ? ` and ${list.length - 3} more` : ''}`);
  }
  console.log(`\n${byText.size} distinct pieces of untypeset maths.`);
  process.exitCode = 1;
}
