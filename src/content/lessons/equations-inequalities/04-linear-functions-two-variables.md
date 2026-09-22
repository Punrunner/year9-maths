---
title: Linear Functions in Two Variables
topic: equations-inequalities
order: 4
minutes: 20
difficulty: core
summary: 'Reading the gradient and intercept from $y = mx + c$, and finding the gradient of the line through two points.'
objectives:
  - 'Identify the gradient and $y$-intercept from $y = mx + c$'
  - 'Find the gradient of a line from a graph using rise over run'
  - 'Find the gradient of the line joining two points from their coordinates'
  - 'Explain why a gradient is positive or negative'
keyRules:
  - title: 'The explicit form'
    formula: 'y = mx + c'
    body: '$m$ is the **gradient** (how steep) and $c$ is the **$y$-intercept** (where the line crosses the $y$-axis). $y = 2x + 5$ has gradient 2 and crosses at $(0, 5)$.'
  - title: 'Gradient'
    formula: 'm = \frac{\text{vertical rise}}{\text{horizontal shift}} = \frac{y_2 - y_1}{x_2 - x_1}'
    body: 'It does not matter which two points on the line you use — you always get the same gradient.'
  - title: 'Positive and negative'
    body: 'Going left to right, a line that goes **up** has a positive gradient; one that goes **down** has a negative gradient. A horizontal line has gradient 0.'
visual:
  widget: line-mc
  title: 'Gradient and intercept explorer'
  caption: 'Set $m = 2$ and $c = 1$ to see the line from the first worked example. Then try a negative gradient — the line slopes down from left to right.'
workedExamples:
  - title: 'From a graph'
    problem: 'A line passes through A(0, 1) and B(2, 5). Find its equation.'
    steps:
      - explain: 'Rise from A to B is $5 - 1 = 4$; run is $2 - 0 = 2$.'
        maths: 'm = \frac{4}{2} = 2'
      - explain: 'The line crosses the $y$-axis at A, so $c = 1$.'
        maths: 'y = 2x + 1'
    answer: '$y = 2x + 1$'
  - title: 'From two coordinates'
    problem: 'Find the gradient of the line joining $(1, 3)$ and $(5, 11)$.'
    steps:
      - explain: 'Increase in $y$ divided by increase in $x$.'
        maths: 'm = \frac{11 - 3}{5 - 1} = \frac{8}{4} = 2'
    answer: 'Gradient 2'
  - title: 'A negative gradient'
    problem: 'Find the gradient of the line joining $(-1, 6)$ and $(3, -2)$.'
    steps:
      - explain: 'Subtract in the same order top and bottom.'
        maths: 'm = \frac{-2 - 6}{3 - (-1)} = \frac{-8}{4} = -2'
      - explain: 'As $x$ increases, $y$ decreases, so a negative gradient makes sense.'
    answer: 'Gradient $-2$'
practice: equations-04
---

## Why this matters

Straight-line graphs model anything that changes at a steady rate — a taxi fare, a phone
contract, water filling a tank. The gradient is the rate (dollars per km, litres per minute)
and the intercept is the starting value.

## Rise over run

Pick any two points on the line and draw the right-angled triangle between them:

- the **rise** is how far up (or down) you go,
- the **run** is how far across you go.

$$\text{gradient} = \frac{\text{rise}}{\text{run}}$$

Using coordinates, with points $(x_1, y_1)$ and $(x_2, y_2)$:

$$m = \frac{y_2 - y_1}{x_2 - x_1}$$

> **Keep the order the same.** If you start with the second point on top, start with the
> second point on the bottom too. Mixing them gives the wrong sign.

## Links to other topics

This lesson connects directly to *Sequences, Functions and Graphs* (where you drew these
lines) and to the next lesson, where two lines meeting gives the solution of a pair of
simultaneous equations.
