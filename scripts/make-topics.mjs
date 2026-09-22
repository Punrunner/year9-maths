/**
 * One-off helper that wrote the 16 topic files in src/content/topics/.
 * Kept in the repo so you can regenerate or extend them; you are equally
 * welcome to edit the JSON files by hand from now on. Run with:
 *     node scripts/make-topics.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(process.cwd(), 'src', 'content', 'topics');
mkdirSync(DIR, { recursive: true });

const NA = 'number-algebra';
const MG = 'measurement-geometry';
const SP = 'statistics-probability';

const topics = [
  ['integers-powers-roots', 1, NA, 'Integers, Powers & Roots',
    'Rational and irrational numbers, estimating roots, and the index laws.',
    'core',
    ['Tell a rational number from an irrational one',
     'Estimate square roots and cube roots without a calculator',
     'Use the index laws to simplify powers'],
    ['surd', 'irrational', 'indices', 'index laws', 'square root', 'cube root', 'pi']],

  ['expressions-formulae', 2, NA, 'Expressions & Formulae',
    'Simplifying, algebraic fractions, expanding brackets, substitution and rearranging formulae.',
    'core',
    ['Simplify expressions using the laws of indices',
     'Add, subtract, multiply and divide algebraic fractions',
     'Expand the product of two linear expressions',
     'Substitute into a formula and change its subject'],
    ['algebra', 'simplify', 'expand', 'substitute', 'rearrange', 'subject of a formula']],

  ['shapes-drawings', 3, MG, 'Shapes & Mathematical Drawings',
    'Inscribed polygons, ruler-and-compass constructions, scales, bearings, and symmetry in 3D.',
    'core',
    ['Construct a regular polygon inside a circle',
     'Carry out standard ruler-and-compass constructions',
     'Use scales and three-figure bearings on a map',
     'Describe planes of symmetry in a 3D shape'],
    ['construction', 'bisector', 'bearing', 'scale', 'polygon', 'symmetry']],

  ['place-value', 4, NA, 'Place Value & Standard Form',
    'Multiplying and dividing by powers of ten, standard form, and upper and lower bounds.',
    'core',
    ['Multiply and divide by any power of 10',
     'Write very large and very small numbers in standard form',
     'Find the upper and lower bounds of a rounded measurement'],
    ['standard form', 'scientific notation', 'powers of ten', 'bounds', 'rounding']],

  ['grouped-data-sampling', 5, SP, 'Grouped Data & Sampling',
    'Averages and range from grouped frequency tables, and how to take a fair sample.',
    'core',
    ['Find the modal class and estimate the mean of grouped data',
     'Estimate the range from a grouped frequency table',
     'Choose an appropriate sampling method and spot bias'],
    ['grouped data', 'modal class', 'estimated mean', 'sampling', 'bias', 'population']],

  ['area-perimeter-volume', 6, MG, 'Area, Perimeter & Volume',
    'Circles, Pythagoras’ theorem, and the surface area and volume of prisms and cylinders.',
    'core',
    ['Find the area and circumference of a circle',
     'Use Pythagoras’ theorem to find a missing side',
     'Find the surface area of a prism and a cylinder',
     'Find the volume of any prism, including a cylinder',
     'Convert between small and large units of measurement'],
    ['circle', 'pi', 'pythagoras', 'hypotenuse', 'prism', 'cylinder', 'surface area', 'volume', 'units']],

  ['fractions-decimals', 7, NA, 'Fractions & Decimals',
    'Factors, multiplying and dividing fractions, order of operations, and recurring decimals.',
    'core',
    ['Find the HCF and LCM using prime factors',
     'Multiply and divide fractions and mixed numbers',
     'Apply the order of operations to fraction calculations',
     'Convert a recurring decimal to a fraction'],
    ['hcf', 'lcm', 'prime factors', 'fractions', 'recurring decimal', 'bidmas']],

  ['equations-inequalities', 8, NA, 'Equations & Inequalities',
    'Building and solving linear equations, inequalities, and simultaneous equations.',
    'core',
    ['Construct and solve a linear equation from a problem',
     'Solve an equation with the unknown in the denominator',
     'Solve and represent a linear inequality',
     'Solve a pair of simultaneous equations'],
    ['equation', 'solve', 'inequality', 'simultaneous', 'unknown']],

  ['geometry', 9, MG, 'Geometry',
    'Angles in polygons, tessellations, multi-step angle problems and coordinates on a line segment.',
    'core',
    ['Find interior and exterior angles of a polygon',
     'Explain why a shape does or does not tessellate',
     'Solve angle problems using several rules together',
     'Find the midpoint and points that divide a line segment'],
    ['angles', 'polygon', 'interior angle', 'exterior angle', 'tessellation', 'midpoint']],

  ['presenting-data', 10, SP, 'Presenting Data & Interpreting Results',
    'Frequency polygons, back-to-back stem-and-leaf diagrams, scatter graphs and choosing the right chart.',
    'core',
    ['Draw and read a frequency polygon',
     'Compare two data sets with a back-to-back stem-and-leaf diagram',
     'Describe correlation and use a line of best fit',
     'Choose the most appropriate graph for a set of data'],
    ['frequency polygon', 'stem and leaf', 'scatter graph', 'correlation', 'line of best fit']],

  ['ratio-proportion', 11, NA, 'Ratio & Proportion',
    'Solving ratio problems, direct proportion and inverse proportion.',
    'core',
    ['Share a quantity in a given ratio and solve ratio problems',
     'Recognise and use direct proportion',
     'Recognise and use inverse proportion'],
    ['ratio', 'proportion', 'direct proportion', 'inverse proportion', 'share']],

  ['sequences-functions-graphs', 12, NA, 'Sequences, Functions & Graphs',
    'Term-to-term and nth term rules, functions, straight-line graphs and reading real-life graphs.',
    'core',
    ['Generate a sequence from a term-to-term or position-to-term rule',
     'Find the nth term of a linear or quadratic sequence',
     'Use function machines and inverse operations',
     'Draw and read the graph of a linear function',
     'Solve simultaneous equations graphically',
     'Read speed and rates from a real-life graph'],
    ['sequence', 'nth term', 'arithmetic', 'quadratic sequence', 'function', 'gradient',
     'intercept', 'straight line', 'distance time', 'speed']],

  ['transformations', 13, MG, 'Transformations',
    'Enlargement, describing single transformations, and combining them.',
    'core',
    ['Enlarge a shape by a positive or fractional scale factor',
     'Describe a reflection, rotation, translation or enlargement fully',
     'Work out the single transformation equivalent to two combined'],
    ['enlargement', 'scale factor', 'reflection', 'rotation', 'translation', 'centre']],

  ['decimals-percentages', 14, NA, 'Decimals & Percentages',
    'Estimation, multiplying and dividing decimals, and compound percentage change.',
    'core',
    ['Estimate the answer to a calculation by rounding',
     'Multiply and divide decimals without a calculator',
     'Calculate repeated (compound) percentage change'],
    ['estimate', 'decimal', 'percentage', 'compound interest', 'depreciation', 'multiplier']],

  ['probability', 15, SP, 'Probability',
    'Combined events, sample space diagrams, tree diagrams and experimental probability.',
    'core',
    ['Use the fact that mutually exclusive probabilities add to 1',
     'List the outcomes of two events in a sample space diagram',
     'Use a tree diagram to find the probability of combined events',
     'Compare experimental probability with theoretical probability',
     'Calculate an expected frequency'],
    ['probability', 'outcome', 'independent', 'tree diagram', 'sample space',
     'experimental probability', 'expected frequency', 'relative frequency']],

  ['quadratics', 16, NA, 'Quadratics',
    'Expanding, factorising and solving quadratics, and the shape of their graphs.',
    'challenge',
    ['Recognise the shape of a quadratic graph',
     'Expand the product of two brackets',
     'Factorise a quadratic expression',
     'Solve a quadratic equation by factorising'],
    ['quadratic', 'parabola', 'expand', 'factorise', 'difference of two squares', 'roots'],
    true],
];

for (const [id, order, strand, title, description, difficulty, objectives, keywords, extension] of topics) {
  const body = {
    title,
    description,
    strand,
    order,
    difficulty,
    ...(extension ? { extension: true } : {}),
    objectives,
    keywords,
  };
  writeFileSync(join(DIR, `${id}.json`), JSON.stringify(body, null, 2) + '\n', 'utf8');
}

console.log(`Wrote ${topics.length} topic files to src/content/topics/`);
