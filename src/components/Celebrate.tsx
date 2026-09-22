/* ==========================================================================
   CELEBRATION
   --------------------------------------------------------------------------
   One tasteful burst when a topic is finished or a quiz is aced — and only
   then. If the student has asked for reduced motion, they get a calm tick
   instead of confetti.
   ========================================================================== */

import { useEffect, useState } from 'preact/hooks';

const COLOURS = ['var(--red)', 'var(--amber)', 'var(--success)', 'var(--info)', 'var(--red-dark)'];

export default function Celebrate({ show, label = 'Well done!' }: { show: boolean; label?: string }) {
  const [reduced, setReduced] = useState(false);
  const [alive, setAlive] = useState(false);

  useEffect(() => {
    try { setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!show) return;
    setAlive(true);
    const t = window.setTimeout(() => setAlive(false), reduced ? 1200 : 2200);
    return () => window.clearTimeout(t);
  }, [show, reduced]);

  if (!alive) return null;

  return (
    <div class="celebrate" role="status" aria-live="polite">
      <span class="sr-only">{label}</span>
      {reduced ? (
        <span class="celebrate-tick" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="48" height="48">
            <circle cx="24" cy="24" r="21" fill="none" stroke="var(--success)" stroke-width="3" />
            <path d="M14 25l7 7 14-15" fill="none" stroke="var(--success)" stroke-width="4"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      ) : (
        <div class="confetti" aria-hidden="true">
          {Array.from({ length: 36 }, (_, i) => (
            <span
              key={i}
              class="confetti-bit"
              style={{
                left: `${(i * 2.7 + (i % 5) * 4) % 100}%`,
                background: COLOURS[i % COLOURS.length],
                animationDelay: `${(i % 9) * 45}ms`,
                transform: `rotate(${(i * 37) % 360}deg)`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
