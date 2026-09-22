---
title: Describing Transformations
topic: transformations
order: 2
minutes: 25
difficulty: core
summary: 'Giving every detail needed to describe a reflection, rotation, translation or enlargement — and finding mirror lines and centres of rotation.'
objectives:
  - 'Describe a single transformation fully'
  - 'Find the equation of a mirror line'
  - 'Find the centre and angle of a rotation'
  - 'Write a translation as a column vector'
keyRules:
  - title: 'What a full description needs'
    body: '**Reflection** — the mirror line (as an equation). **Rotation** — the centre, the angle and the direction. **Translation** — the column vector. **Enlargement** — the centre and the scale factor.'
  - title: 'Mirror lines'
    body: 'The mirror line is the **perpendicular bisector** of the line joining a point to its image. $(1, 5)$ and $(1, 3)$ reflect in $y = 4$; $(-3, 2)$ and $(7, 2)$ reflect in $x = 2$.'
  - title: 'Column vectors'
    formula: '\begin{pmatrix} 3 \\ -2 \end{pmatrix} = 3 \text{ right},\ 2 \text{ down}'
    body: 'The top number is the movement in $x$ (right is positive), the bottom number the movement in $y$ (up is positive).'
  - title: 'Centre of rotation'
    body: 'Construct the perpendicular bisectors of AA′ and BB′. They cross at the centre. Then measure the angle ACA′.'
workedExamples:
  - title: 'Finding a mirror line'
    problem: '$(6, 2)$ maps to $(2, 6)$ under a reflection. Find the mirror line.'
    steps:
      - explain: 'The midpoint of the two points is on the mirror line.'
        maths: '\left(\frac{6 + 2}{2}, \frac{2 + 6}{2}\right) = (4, 4)'
      - explain: 'The $x$ and $y$ coordinates have swapped. That is what reflection in $y = x$ does.'
    answer: '$y = x$'
  - title: 'Identifying a transformation from coordinates'
    problem: 'Triangle A(1, 2), B(4, 1), C(1, 5) becomes A′(−9, −2), B′(0, −5), C′(−9, 7). Describe the transformation.'
    steps:
      - explain: 'Compare lengths: AC = 3 but A′C′ = 9. The shape is 3 times bigger, so it is an enlargement with scale factor 3.'
      - explain: 'For a centre $(a, b)$, A′ must be 3 times as far from it as A. In $x$: $-9 - a = 3(1 - a)$ gives $a = 6$.'
      - explain: 'In $y$: $-2 - b = 3(2 - b)$ gives $b = 4$.'
    answer: 'Enlargement, scale factor 3, centre $(6, 4)$.'
  - title: 'A translation'
    problem: 'A(1, 2), B(2, 4), C(4, 3), D(5, 1) becomes A′(4, −2), B′(5, 0), C′(7, −1), D′(8, −3). Describe the transformation.'
    steps:
      - explain: 'Every point has moved by the same amount.'
        maths: 'x: +3, \qquad y: -4'
    answer: 'Translation by $\begin{pmatrix} 3 \\ -4 \end{pmatrix}$'
practice: transformations-02
---

## Why this matters

"Turn it round a bit" is not an instruction anyone can follow exactly. Robot arms, animation
software and CNC machines need precise descriptions: *rotate 90° clockwise about $(3, 0)$*. The
same precision earns the marks in an exam.

## Which transformation is it?

| Clue | Transformation |
| --- | --- |
| Same size, same way up, just moved | translation |
| Same size, flipped over (mirror image) | reflection |
| Same size, turned | rotation |
| Different size | enlargement |

## Special mirror lines

| Line | Effect on $(x, y)$ |
| --- | --- |
| the $x$-axis ($y = 0$) | $(x, -y)$ |
| the $y$-axis ($x = 0$) | $(-x, y)$ |
| $y = x$ | $(y, x)$ |
| $y = -x$ | $(-y, -x)$ |

> **Rotation directions.** A rotation of $90^\circ$ clockwise is the same as $270^\circ$ anticlockwise,
> and $180^\circ$ needs no direction at all.
