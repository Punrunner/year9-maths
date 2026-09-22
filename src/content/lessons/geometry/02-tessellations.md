---
title: Tessellations
topic: geometry
order: 2
minutes: 20
difficulty: core
summary: 'Which shapes fit together with no gaps or overlaps — and the angle rule that decides it.'
objectives:
  - 'Explain what a tessellation is'
  - 'Use angles at a point to decide whether a regular polygon tessellates'
  - 'Explain why every triangle and every quadrilateral tessellates'
  - 'Find missing angles in a tessellation'
keyRules:
  - title: 'Tessellation'
    body: 'A pattern of shapes that fit together **with no gaps and no overlaps**. Circles do not tessellate — they always leave gaps.'
  - title: 'The angle test'
    formula: '\text{angles meeting at a point} = 360^\circ'
    body: 'Where the corners meet, their angles must add up to exactly $360^\circ$. For one regular polygon, its interior angle must divide exactly into 360.'
  - title: 'Only three regular polygons'
    body: 'Equilateral triangles ($6 \times 60^\circ$), squares ($4 \times 90^\circ$) and regular hexagons ($3 \times 120^\circ$). A regular pentagon ($108^\circ$) does not: $360 \div 108$ is not a whole number.'
  - title: 'Every triangle and quadrilateral'
    body: 'Rotate copies through $180^\circ$ about the midpoint of a side. Six copies of any triangle put all three angles in twice at one point ($2 \times 180^\circ$); four copies of any quadrilateral put all four angles in once ($360^\circ$).'
visual:
  widget: polygon-angles
  title: 'Does it tessellate?'
  caption: 'Try 3, 4 and 6 sides: the interior angle divides exactly into $360^\circ$. Try 5 or 8: it does not, so copies leave gaps.'
workedExamples:
  - title: 'Regular pentagons'
    problem: 'Explain why regular pentagons do not tessellate.'
    steps:
      - explain: 'Interior angle of a regular pentagon.'
        maths: '180 - \frac{360}{5} = 108^\circ'
      - explain: 'Try fitting pentagons round a point.'
        maths: '3 \times 108 = 324^\circ \quad 4 \times 108 = 432^\circ'
      - explain: 'Three leave a $36^\circ$ gap and four overlap. Neither makes exactly $360^\circ$.'
    answer: 'They do not tessellate: $108^\circ$ does not divide into $360^\circ$.'
  - title: 'Angles in a triangle tessellation'
    problem: 'In a tessellation of equilateral triangles, six angles $a$ to $f$ meet at one point. Find $a$.'
    steps:
      - explain: 'The six angles are all angles of equilateral triangles, so they are equal.'
      - explain: 'Angles at a point add to $360^\circ$.'
        maths: 'a = 360 \div 6 = 60^\circ'
    answer: '$a = 60^\circ$'
practice: geometry-02
---

## Why this matters

Tessellations are everywhere — bathroom tiles, brick walls, honeycomb, paving, and the
spectacular geometric patterns of Islamic art and Egyptian floor tiling. A designer needs to
know in advance which shapes will cover a floor without gaps or awkward cutting.

## The regular polygons

| Regular polygon | Interior angle | $360 \div$ angle | Tessellates? |
| --- | --- | --- | --- |
| Triangle | $60^\circ$ | 6 | ✓ |
| Square | $90^\circ$ | 4 | ✓ |
| Pentagon | $108^\circ$ | 3.33… | ✗ |
| Hexagon | $120^\circ$ | 3 | ✓ |
| Octagon | $135^\circ$ | 2.67… | ✗ |

Bees build hexagonal cells for a reason: of the three shapes that tessellate, the hexagon
encloses the most area for the least wall.

## Mixing shapes

Two different regular polygons can tessellate together if their angles combine to $360^\circ$.
Two octagons and a square: $135 + 135 + 90 = 360^\circ$ — a common floor-tile pattern.

> **Irregular shapes too.** Many irregular shapes tessellate — any triangle, any quadrilateral
> (even a concave one like an arrowhead), and some L-shapes and T-shapes. Try them on dotty paper.
