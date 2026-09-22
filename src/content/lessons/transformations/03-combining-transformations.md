---
title: Combining Transformations
topic: transformations
order: 3
minutes: 25
difficulty: challenge
summary: 'Carrying out one transformation after another, and finding the single transformation that does the same job.'
objectives:
  - 'Carry out two transformations in sequence'
  - 'Find the single transformation equivalent to two combined'
  - 'Know that two reflections in parallel lines make a translation'
  - 'Decide whether the final image is congruent to the object'
keyRules:
  - title: 'One after the other'
    body: 'Transform the object to get A′, then transform A′ to get A″. The order matters — rotating then translating is usually not the same as translating then rotating.'
  - title: 'Two parallel mirrors'
    formula: '\text{reflect in } x = a, \text{ then } x = b \;\Rightarrow\; \text{translation by } \begin{pmatrix} 2(b - a) \\ 0 \end{pmatrix}'
    body: 'Two reflections in parallel lines give a translation of **twice** the distance between the lines, in the direction from the first line to the second.'
  - title: 'Congruence'
    body: 'Reflections, rotations and translations never change size, so any combination of them gives a **congruent** image. Include an enlargement and the image is only **similar**.'
workedExamples:
  - title: 'Rotate then translate'
    problem: 'Triangle ABC is rotated $90^\circ$ anticlockwise about O, then translated by $\begin{pmatrix} 0 \\ -4 \end{pmatrix}$. The single equivalent transformation turns out to be a rotation. How do you find it?'
    steps:
      - explain: 'Draw both images carefully on squared paper.'
      - explain: 'The final image A″B″C″ is turned $90^\circ$ anticlockwise compared with ABC, so the single transformation is a $90^\circ$ anticlockwise rotation.'
      - explain: 'Find its centre with perpendicular bisectors of AA″ and BB″ (or tracing paper).'
    answer: 'Rotation $90^\circ$ anticlockwise about $(5, 1)$.'
  - title: 'Two reflections'
    problem: 'A shape is reflected in $x = 1$ and then in $x = 5$. What single transformation is this?'
    steps:
      - explain: 'The lines are parallel and 4 units apart.'
      - explain: 'The shape moves twice that distance, from the first line towards the second.'
        maths: '2 \times (5 - 1) = 8'
    answer: 'Translation by $\begin{pmatrix} 8 \\ 0 \end{pmatrix}$'
practice: transformations-03
---

## Why this matters

Animators and game designers build complicated movements from simple ones — a character
might be flipped, turned and slid in one frame. Knowing how transformations combine lets them
replace several steps with one.

## Try it on a point

The quickest way to find a combined effect is to follow a single point, such as $(2, 1)$:

- Reflect in $x = 4$: $(2, 1) \to (6, 1)$ (it was 2 left of the line, so it ends 2 right of it).
- Then reflect in $x = 7$: $(6, 1) \to (8, 1)$.

That is a move of 6 to the right, which matches $2 \times (7 - 4) = 6$. Check with a second point
before you trust the answer.

## Reflections that are not parallel

Two reflections in lines that **cross** give a **rotation** about the crossing point, through twice
the angle between the lines. Reflecting in the $x$-axis and then the $y$-axis is a rotation of
$180^\circ$ about the origin.
