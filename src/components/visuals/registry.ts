/* ==========================================================================
   VISUAL REGISTRY
   --------------------------------------------------------------------------
   Maps the `widget` name you write in a lesson or a "manipulable" question
   to the component that draws it, plus the values it starts with.
   ========================================================================== */

import type { FunctionComponent } from 'preact';
import type { VisualProps } from './kit';
import { LineMC, Parabola, NumberLine } from './GraphVisuals';
import { Pythagoras, Prism, PolygonAngles, Enlargement } from './GeometryVisuals';
import { Spinner } from './ProbabilityVisuals';
import { AreaModel } from './AlgebraVisuals';
import { Bearing } from './MapVisuals';
import { Histogram, AxisTrick } from './StatsVisuals';

export const VISUALS: Record<string, FunctionComponent<VisualProps>> = {
  'line-mc': LineMC,
  'parabola': Parabola,
  'number-line': NumberLine,
  'pythagoras': Pythagoras,
  'prism': Prism,
  'polygon-angles': PolygonAngles,
  'enlargement': Enlargement,
  'spinner': Spinner,
  'area-model': AreaModel,
  'bearing': Bearing,
  'histogram': Histogram,
  'axis-trick': AxisTrick,
};

/** The values each visual starts on, before the student touches anything. */
export const VISUAL_DEFAULTS: Record<string, Record<string, number>> = {
  'line-mc': { m: 1, c: 0 },
  'parabola': { a: 1, b: 0, c: 0 },
  'number-line': { x: 0, dir: 1, closed: 0 },
  'pythagoras': { a: 3, b: 4 },
  'prism': { l: 6, w: 3, h: 4 },
  'polygon-angles': { n: 5 },
  'enlargement': { k: 2, ox: 1, oy: 1 },
  'spinner': { spins: 0 },
  'area-model': { a: 3, b: 2 },
  'bearing': { b: 45 },
  'histogram': {},
  'axis-trick': { lo: 0 },
};

/** Human-readable name, used in the lesson's visual heading fallback. */
export const VISUAL_TITLES: Record<string, string> = {
  'line-mc': 'Gradient and intercept explorer',
  'parabola': 'Quadratic curve explorer',
  'number-line': 'Number line',
  'pythagoras': 'Pythagoras explorer',
  'prism': 'Cuboid explorer',
  'polygon-angles': 'Polygon angle explorer',
  'enlargement': 'Enlargement explorer',
  'spinner': 'Spinner experiment',
  'area-model': 'Area model for two brackets',
  'bearing': 'Bearing explorer',
  'histogram': 'Grouped data explorer',
  'axis-trick': 'Misleading axis explorer',
};
