/* ==========================================================================
   SHUFFLING
   --------------------------------------------------------------------------
   Question banks are shuffled so that a retry is never the identical paper.
   A seeded generator is used so that a single attempt stays stable while the
   student is working through it (re-renders do not reshuffle under them).
   ========================================================================== */

/** Small, fast, seeded pseudo-random generator (mulberry32). */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A fresh seed for a new attempt. */
export const newSeed = (): number => Math.floor(Math.random() * 2 ** 31);

/** Fisher–Yates. Returns a new array; the input is left alone. */
export function shuffle<T>(items: readonly T[], seed: number): T[] {
  const out = items.slice();
  const rand = rng(seed);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/** Shuffle, then take the first `n`. Used to draw a paper from a bank. */
export function pick<T>(items: readonly T[], n: number, seed: number): T[] {
  return shuffle(items, seed).slice(0, Math.min(n, items.length));
}

/**
 * Shuffle, but guarantee the result is not the original order
 * (so an "ordering" question never starts already solved).
 */
export function shuffleDifferently<T>(items: readonly T[], seed: number): T[] {
  if (items.length < 2) return items.slice();
  for (let attempt = 0; attempt < 8; attempt++) {
    const out = shuffle(items, seed + attempt * 977);
    if (out.some((x, i) => x !== items[i])) return out;
  }
  // Fallback: swap the first two.
  const out = items.slice();
  [out[0], out[1]] = [out[1]!, out[0]!];
  return out;
}
