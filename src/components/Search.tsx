/* ==========================================================================
   SEARCH
   --------------------------------------------------------------------------
   Finds a topic or a lesson fast. The whole index is a few kilobytes of JSON
   built at compile time, so searching needs no network request at all.
   ========================================================================== */

import { useState, useRef, useEffect, useMemo } from 'preact/hooks';

export interface Row {
  title: string;
  kind: 'Topic' | 'Lesson';
  href: string;
  strand: string;
  text: string;
  difficulty: string;
}

/** Score a row against the query: title hits count far more than body hits. */
function score(row: Row, terms: string[]): number {
  const title = row.title.toLowerCase();
  const body = `${row.text} ${row.strand}`.toLowerCase();
  let total = 0;
  for (const t of terms) {
    if (title.startsWith(t)) total += 12;
    else if (title.includes(t)) total += 8;
    else if (body.includes(t)) total += 2;
    else return 0;               // every term must appear somewhere
  }
  if (row.kind === 'Topic') total += 1;   // nudge topics above their lessons
  return total;
}

export default function Search({ rows }: { rows: Row[] }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return rows
      .map((r) => ({ r, s: score(r, terms) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((x) => x.r);
  }, [q, rows]);

  useEffect(() => { setCursor(0); }, [q]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  // Close on Escape or a click outside; open on "/" from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) { setOpen(false); return; }
      const el = e.target as HTMLElement | null;
      const typing = el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
      if (e.key === '/' && !open && !typing) { e.preventDefault(); setOpen(true); }
    };
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('click', onClick);
    };
  }, [open]);

  const go = (href: string) => { window.location.href = href; };

  return (
    <div class="search" ref={panelRef}>
      <button
        type="button"
        class="search-open"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
      >
        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
          <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M13.5 13.5L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <span class="search-open-text">Search</span>
        <kbd class="search-kbd" aria-hidden="true">/</kbd>
      </button>

      {open ? (
        <div class="search-panel" role="dialog" aria-label="Search topics and lessons">
          <div class="search-field">
            <label class="sr-only" for="site-search">Search topics and lessons</label>
            <input
              ref={inputRef}
              id="site-search"
              type="search"
              class="entry"
              placeholder="Try “Pythagoras” or “nth term”"
              autocomplete="off"
              value={q}
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls="search-results"
              aria-activedescendant={results.length ? `sr-${cursor}` : undefined}
              onInput={(e) => setQ((e.target as HTMLInputElement).value)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, results.length - 1)); }
                if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
                if (e.key === 'Enter' && results[cursor]) { e.preventDefault(); go(results[cursor]!.href); }
              }}
            />
          </div>

          <ul id="search-results" class="search-results" role="listbox">
            {q && !results.length ? (
              <li class="search-empty">Nothing matched “{q}”.</li>
            ) : null}
            {results.map((r, i) => (
              <li key={r.href} id={`sr-${i}`} role="option" aria-selected={i === cursor}>
                <a
                  class={`search-hit ${i === cursor ? 'is-cursor' : ''}`}
                  href={r.href}
                  onMouseEnter={() => setCursor(i)}
                >
                  <span class="search-hit-title">{r.title}</span>
                  <span class="search-hit-meta">
                    <span class="chip chip-neutral">{r.kind}</span>
                    <span class="search-hit-strand">{r.strand}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {!q ? (
            <p class="search-tip">Type to search {rows.length} topics and lessons.</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
