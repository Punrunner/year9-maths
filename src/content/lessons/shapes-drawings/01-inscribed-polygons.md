---
title: Inscribed Polygons
topic: shapes-drawings
order: 1
minutes: 20
difficulty: core
summary: 'Drawing a regular hexagon, square, triangle and octagon inside a circle with only compasses and a straight edge.'
objectives:
  - 'Know what an inscribed polygon is'
  - 'Construct a regular hexagon and an equilateral triangle using the radius'
  - 'Construct a square and a regular octagon using perpendicular bisectors'
  - 'Explain why each construction works'
keyRules:
  - title: 'Inscribed polygon'
    body: 'A polygon is **inscribed** in a circle when every one of its vertices lies on the circumference. Every regular polygon can be inscribed in a circle.'
  - title: 'Construct means compasses and straight edge'
    body: 'When a question says **construct**, you may use compasses and a ruler for drawing straight lines — but you must not measure lengths or use a protractor.'
  - title: 'The hexagon uses the radius'
    body: 'A regular hexagon is six equilateral triangles meeting at the centre, so **each side equals the radius**. Step round the circle six times with the compasses set to the radius.'
  - title: 'Angle at the centre'
    formula: '\text{angle at centre} = \frac{360^\circ}{n}'
    body: 'Joining the centre to each vertex of a regular $n$-sided polygon splits $360^\circ$ into $n$ equal angles: $60^\circ$ for a hexagon, $90^\circ$ for a square, $45^\circ$ for an octagon.'
visual:
  widget: polygon-angles
  title: 'Polygons inside a circle'
  caption: 'Change the number of sides. The dashed radii split the centre into equal angles of $360^\circ \div n$. At 6 sides, each triangle is equilateral — that is why the hexagon side equals the radius.'
  config:
    inscribed: true
workedExamples:
  - title: 'An inscribed square'
    problem: 'Construct a square inscribed in a circle, using compasses and a straight edge only.'
    steps:
      - explain: 'Draw a straight line and mark a point C near the middle.'
      - explain: 'Draw a circle with centre C. Label the points where it crosses the line A and B. AB is a diameter.'
      - explain: 'Construct the perpendicular bisector of AB: with the compasses set wider than half of AB, draw arcs above and below from A and from B, then join where they cross. It passes through C.'
      - explain: 'Label the points where the bisector meets the circle X and Y. The two diameters cross at $90^\circ$.'
        maths: '\text{angle at centre} = \frac{360^\circ}{4} = 90^\circ'
      - explain: 'Join A to X, X to B, B to Y and Y to A.'
    answer: 'AXBY is a square: its diagonals are equal diameters that cross at right angles.'
  - title: 'An inscribed regular hexagon'
    problem: 'Construct a regular hexagon inscribed in a circle.'
    steps:
      - explain: 'Draw a circle. **Keep the compasses set to the radius.**'
      - explain: 'Put the point anywhere on the circumference and mark an arc crossing the circle. Label it A.'
      - explain: 'Move the point to A and mark the next arc along. Label it B. Repeat to get C, D, E and F.'
        maths: '6 \times \text{radius steps} = \text{once round the circle}'
      - explain: 'Join A to B, B to C, and so on back to A.'
    answer: 'ABCDEF is a regular hexagon with every side equal to the radius.'
practice: shapes-01
---

## Why this matters

Designers, architects and artists have used inscribed shapes for thousands of years —
in tiled floors, rose windows, logos and Islamic geometric art. They are also a neat way
to build shapes **exactly**, without the small errors that creep in when you measure.

## Why the hexagon construction works

Join the centre of a regular hexagon to each vertex. You get six triangles, and the angle
at the centre of each is $\frac{360^\circ}{6} = 60^\circ$. Two sides of each triangle are
radii, so they are equal, and the other two angles must also be $60^\circ$. The triangles
are **equilateral** — so every side of the hexagon equals the radius.

## Building other polygons from these two

| Polygon | Angle at centre | How to construct it |
| --- | --- | --- |
| Equilateral triangle | $120^\circ$ | Make the hexagon's six points, then join **every other** point: A, C, E |
| Square | $90^\circ$ | Two diameters at right angles (perpendicular bisector) |
| Regular hexagon | $60^\circ$ | Step the radius round the circle six times |
| Regular octagon | $45^\circ$ | Start with the square, then bisect each $90^\circ$ angle at the centre |
| Regular dodecagon (12 sides) | $30^\circ$ | Start with the hexagon, then bisect each $60^\circ$ angle |

## The octagon

After constructing the square AXBY, construct the perpendicular bisectors of AY and AX.
They pass through the centre and cut the circle at four new points, halfway between the
old ones. The eight points together are the vertices of a regular octagon.

> **Remember.** In a construction, leave all your arcs showing. They are the evidence that
> you constructed the shape rather than measured it.
