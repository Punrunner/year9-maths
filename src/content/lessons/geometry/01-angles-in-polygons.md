---
title: Angles in Polygons
topic: geometry
order: 1
minutes: 25
difficulty: core
summary: 'The interior angle sum $180(n - 2)$, the exterior angle sum of $360^\circ$, and the angles of regular polygons.'
objectives:
  - 'Explain why the interior angles of an $n$-sided polygon add up to $180^\circ(n - 2)$'
  - 'Find a missing interior angle in any polygon'
  - 'Know that the exterior angles of any polygon add up to $360^\circ$'
  - 'Find the interior and exterior angles of a regular polygon, and its number of sides'
keyRules:
  - title: 'Interior angle sum'
    formula: '\text{sum of interior angles} = 180^\circ \times (n - 2)'
    body: 'From one vertex you can split an $n$-sided polygon into $n - 2$ triangles, each worth $180^\circ$.'
  - title: 'Interior + exterior = 180°'
    body: 'At every vertex the interior and exterior angles lie on a straight line, so they add to $180^\circ$.'
  - title: 'Exterior angle sum'
    formula: '\text{sum of exterior angles} = 360^\circ'
    body: 'True for **every** polygon. Walking all the way round the shape, you turn through one full turn.'
  - title: 'Regular polygons'
    formula: '\text{exterior angle} = \frac{360^\circ}{n} \qquad \text{interior angle} = 180^\circ - \text{exterior}'
    body: 'All the angles are equal. Knowing either angle lets you find $n$: exterior $18^\circ$ gives $n = 360 \div 18 = 20$ sides.'
visual:
  widget: polygon-angles
  title: 'Polygon angle explorer'
  caption: 'Change the number of sides and watch the angle sum go up by $180^\circ$ each time — one more triangle.'
workedExamples:
  - title: 'Interior angle sum of a hexagon'
    problem: 'Find the sum of the interior angles of a hexagon.'
    steps:
      - explain: 'From one corner, the hexagon splits into 4 triangles.'
        maths: 'n - 2 = 6 - 2 = 4'
      - explain: 'Each triangle has an angle sum of $180^\circ$.'
        maths: '4 \times 180^\circ = 720^\circ'
    answer: '$720^\circ$'
  - title: 'A missing angle'
    problem: 'A pentagon has angles $90^\circ$, $90^\circ$, $110^\circ$, $130^\circ$ and $a$. Find $a$.'
    steps:
      - explain: 'Interior angle sum of a pentagon.'
        maths: '180^\circ \times 3 = 540^\circ'
      - explain: 'Subtract the angles you know.'
        maths: 'a = 540 - (90 + 90 + 110 + 130) = 120^\circ'
    answer: '$a = 120^\circ$'
  - title: 'How many sides?'
    problem: 'A regular polygon has interior angles of $150^\circ$. How many sides does it have?'
    steps:
      - explain: 'Find the exterior angle first.'
        maths: '180^\circ - 150^\circ = 30^\circ'
      - explain: 'The exterior angles add to $360^\circ$ and are all equal.'
        maths: 'n = \frac{360}{30} = 12'
    answer: '12 sides'
practice: geometry-01
---

## Why this matters

Architects, tile designers and engineers constantly need the angles of polygons — to cut a
frame for a hexagonal window, lay floor tiles, or design a nut that a spanner can grip.
One formula covers every polygon there is.

## Why $180(n - 2)$?

| Shape | Sides, $n$ | Triangles, $n - 2$ | Interior angle sum |
| --- | --- | --- | --- |
| Triangle | 3 | 1 | $180^\circ$ |
| Quadrilateral | 4 | 2 | $360^\circ$ |
| Pentagon | 5 | 3 | $540^\circ$ |
| Hexagon | 6 | 4 | $720^\circ$ |
| Octagon | 8 | 6 | $1080^\circ$ |
| Decagon | 10 | 8 | $1440^\circ$ |

A second way to see it: join the centre to every vertex to make $n$ triangles ($180n$ in total),
then subtract the full turn of $360^\circ$ at the centre: $180n - 360 = 180(n - 2)$.

> **Nadia's mistake.** *"A 12-sided shape has 3 times as many sides as a quadrilateral, so its
> angle sum is $3 \times 360^\circ$."* No — it is $180 \times 10 = 1800^\circ$, not $1080^\circ$.
> The number of **triangles** does not triple.

## Why the exterior angles make $360^\circ$

Walk round the outside of any polygon. At each corner you turn through the exterior angle.
By the time you are back where you started, facing the same way, you have turned through
exactly one full turn: $360^\circ$.

## Is it a polygon at all?

The interior angle sum is always a multiple of $180^\circ$. That is why $4180^\circ$ cannot be
the angle sum of any polygon: $4180 \div 180$ is not a whole number.
