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
import { UnitLadder, UnitGrid } from './UnitVisuals';
import { IntegerHops, FractionBars, PercentGrid, PercentBar } from './NumberVisuals';

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
  'unit-ladder': UnitLadder,
  'unit-grid': UnitGrid,
  'integer-hops': IntegerHops,
  'fraction-bars': FractionBars,
  'percent-grid': PercentGrid,
  'percent-bar': PercentBar,
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
  'unit-ladder': { q: 0, from: 2, to: 1, n: 3.5 },
  'unit-grid': { d: 2, p: 0, k: 2 },
  'integer-hops': { a: 2, op: 0, b: -5, r: -3 },
  'fraction-bars': { n1: 1, d1: 3, n2: 1, d2: 4, op: 0, common: 0 },
  'percent-grid': { p: 25 },
  'percent-bar': { p: 25 },
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
  'unit-ladder': 'Unit conversion staircase',
  'unit-grid': 'Squares and cubes of units',
  'integer-hops': 'Integer number line',
  'fraction-bars': 'Fraction bars',
  'percent-grid': 'Hundred square',
  'percent-bar': 'Percentage bar',
};
