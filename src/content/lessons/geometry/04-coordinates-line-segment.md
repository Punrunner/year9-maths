---
title: Coordinates on a Line Segment
topic: geometry
order: 4
minutes: 20
difficulty: core
summary: 'Finding the midpoint, and the point a given fraction of the way along a line segment, from the coordinates of its ends.'
objectives:
  - 'Find the midpoint of a line segment'
  - 'Find the point that is a given fraction of the way along a segment'
  - 'Work from either end, including with negative coordinates'
  - 'Use a quick sketch to check the answer is sensible'
keyRules:
  - title: 'Midpoint'
    formula: 'M = \left(\frac{x_1 + x_2}{2},\ \frac{y_1 + y_2}{2}\right)'
    body: 'Add the $x$-coordinates and halve; add the $y$-coordinates and halve.'
  - title: 'A fraction of the way along'
    body: 'Find the horizontal and vertical distances from the start to the end. Take that fraction of each, and add it to the **starting** point.'
  - title: 'Which end you start from matters'
    body: '$\frac{1}{4}$ of the way along AB **from A** is a different point from $\frac{1}{4}$ of the way **from B**. From B you move towards A, so the steps change sign.'
workedExamples:
  - title: 'A third of the way along'
    problem: 'A is $(2, 1)$ and B is $(8, 10)$. Find the point T that is $\frac{1}{3}$ of the way along AB from A.'
    steps:
      - explain: 'Horizontal distance from A to B, and a third of it.'
        maths: '8 - 2 = 6, \qquad 6 \times \tfrac{1}{3} = 2'
      - explain: 'Vertical distance, and a third of it.'
        maths: '10 - 1 = 9, \qquad 9 \times \tfrac{1}{3} = 3'
      - explain: 'Start at A and move right 2 and up 3.'
        maths: 'T = (2 + 2,\ 1 + 3) = (4, 4)'
    answer: '$T = (4, 4)$'
  - title: 'From each end'
    problem: 'A is $(3, 1)$ and B is $(11, 17)$. Find the point **a** $\frac{1}{4}$ of the way along AB from A **b** $\frac{1}{4}$ of the way along BA from B.'
    steps:
      - explain: 'The distances are $11 - 3 = 8$ across and $17 - 1 = 16$ up. A quarter of each is 2 and 4.'
      - explain: 'From A, move right 2 and up 4.'
        maths: '(3 + 2,\ 1 + 4) = (5, 5)'
      - explain: 'From B, move towards A: left 2 and down 4.'
        maths: '(11 - 2,\ 17 - 4) = (9, 13)'
    answer: '**a** $(5, 5)$ **b** $(9, 13)$'
  - title: 'With negative coordinates'
    problem: 'G is $(-4, 14)$ and H is $(6, -1)$. Find the point $\frac{3}{5}$ of the way along GH from G.'
    steps:
      - explain: 'Changes from G to H.'
        maths: '6 - (-4) = 10 \text{ across}, \qquad -1 - 14 = -15 \text{ (down)}'
      - explain: 'Three-fifths of each.'
        maths: '10 \times \tfrac{3}{5} = 6, \qquad -15 \times \tfrac{3}{5} = -9'
      - explain: 'Add to G.'
        maths: '(-4 + 6,\ 14 - 9) = (2, 5)'
    answer: '$(2, 5)$'
practice: geometry-04
---

## Why this matters

Computer graphics, map-making and GPS all rely on finding points part-way between two
others. Game designers use exactly this to move a character smoothly from one position to
another, a fraction of the way each frame.

## Sketch first

Even without squared paper, a quick sketch of the two points and the right-angled triangle
between them tells you:

- whether to **add** or **subtract** each distance, and
- roughly where the answer should be — so you can spot a silly mistake.

## The midpoint is the special case

The midpoint is $\frac{1}{2}$ of the way along. Using the fraction method for A$(2, 1)$ and
B$(8, 10)$: half of 6 is 3 and half of 9 is 4.5, giving $(5, 5.5)$. The formula gives the same:
$\left(\frac{2 + 8}{2}, \frac{1 + 10}{2}\right) = (5, 5.5)$.

> **Check.** A point $\frac{1}{3}$ of the way from A should be **closer to A** than to B. If
> yours is not, you probably started from the wrong end.
