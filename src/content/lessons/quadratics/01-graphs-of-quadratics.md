---
title: Graphs of Quadratics
topic: quadratics
order: 1
minutes: 25
difficulty: challenge
summary: 'Tables of values for $y = ax^2 + bx + c$, the shape of a parabola, and what $a$, $b$ and $c$ do to it.'
objectives:
  - 'Complete a table of values for a quadratic function'
  - 'Plot the points and join them with a smooth curve'
  - 'Recognise the parabola shape and its line of symmetry'
  - 'Read the $y$-intercept, turning point and roots from a graph'
keyRules:
  - title: 'A quadratic'
    formula: 'y = ax^2 + bx + c, \quad a \neq 0'
    body: 'The highest power of $x$ is 2. Its graph is a smooth U-shaped curve called a **parabola**.'
  - title: 'Which way up?'
    body: 'If $a > 0$ the parabola is a **∪** with a minimum point. If $a < 0$ it is a **∩** with a maximum point.'
  - title: 'Where it crosses'
    body: 'The curve crosses the $y$-axis at $(0, c)$. Where it crosses the $x$-axis are the **roots** — the solutions of $ax^2 + bx + c = 0$.'
  - title: 'Table of values'
    body: 'Work out each term on its own row ($x^2$, then $-3x$, then $+4$) and add the column. It keeps negatives under control.'
visual:
  widget: parabola
  title: 'Quadratic curve explorer'
  caption: 'Set $a = 1$, $b = -3$, $c = 4$ to see the curve from the worked example. Make $a$ negative to flip it upside down; change $c$ to slide it up and down.'
workedExamples:
  - title: 'A table of values'
    problem: 'Complete a table for $y = x^2 - 3x + 4$ from $x = -3$ to $x = 3$.'
    steps:
      - explain: 'Work out each term separately.'
        maths: '\begin{array}{c|ccccccc} x & -3 & -2 & -1 & 0 & 1 & 2 & 3 \\ \hline x^2 & 9 & 4 & 1 & 0 & 1 & 4 & 9 \\ -3x & 9 & 6 & 3 & 0 & -3 & -6 & -9 \\ +4 & 4 & 4 & 4 & 4 & 4 & 4 & 4 \\ \hline y & 22 & 14 & 8 & 4 & 2 & 2 & 4 \end{array}'
      - explain: 'Plot each $(x, y)$ and join them with a smooth curve — not straight lines.'
      - explain: 'The values at $x = 1$ and $x = 2$ are equal, so the line of symmetry is halfway between: $x = 1.5$.'
    answer: 'Points $(-3, 22)$, $(-2, 14)$, $(-1, 8)$, $(0, 4)$, $(1, 2)$, $(2, 2)$, $(3, 4)$.'
practice: quadratics-01
---

## Why this matters

Parabolas describe the path of a thrown ball, the shape of a satellite dish and the arch of a
bridge. Being able to sketch one from its equation tells you where it is highest or lowest and
where it crosses zero.

## Reading the graph

| Feature | How to find it |
| --- | --- |
| $y$-intercept | the value of $c$ |
| roots | where the curve meets the $x$-axis |
| turning point | the lowest (or highest) point |
| line of symmetry | the vertical line through the turning point |

A parabola can cross the $x$-axis twice, touch it once, or miss it completely — so a quadratic
equation can have two, one or no solutions.

> **Common mistake.** $-3^2$ in a table should be worked out as $(-3)^2 = 9$. Put brackets round
> negative $x$ values when you square them.
