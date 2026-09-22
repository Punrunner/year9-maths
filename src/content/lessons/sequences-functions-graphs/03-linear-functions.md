---
title: Linear Functions
topic: sequences-functions-graphs
order: 3
minutes: 28
difficulty: core
summary: 'Straight-line graphs, what the gradient and the intercept mean, and drawing a line from its equation.'
objectives:
  - 'Draw the graph of a linear function from a table of values'
  - 'Identify the gradient and the y-intercept from an equation'
  - 'Write the equation of a line from its graph'
  - 'Decide whether a point lies on a given line'
keyRules:
  - title: 'The equation of a straight line'
    formula: 'y = mx + c'
    body: '$m$ is the **gradient** — how steep the line is. $c$ is the **y-intercept** — where the line crosses the $y$-axis.'
  - title: 'Gradient'
    formula: 'm = \frac{\text{change in } y}{\text{change in } x} = \frac{\text{rise}}{\text{run}}'
    body: 'Pick two points on the line, ideally where it crosses grid corners, and count across then up. Going **down** as you move right means a negative gradient.'
  - title: 'Reading the intercept'
    body: 'The $y$-intercept is the value of $y$ when $x = 0$. On a graph it is simply where the line crosses the vertical axis — no calculation needed.'
  - title: 'Is a point on the line?'
    body: 'Substitute the coordinates into the equation. If both sides come out equal, the point is on the line. If not, it is not — no matter how close it looks.'
visual:
  widget: line-mc
  title: 'Gradient and intercept explorer'
  caption: 'Drag $m$ and watch the steepness change; drag $c$ and watch the whole line slide up and down without changing its slope. Try making $m$ negative — the line tips the other way.'
  config:
    start:
      m: 2
      c: -2
workedExamples:
  - title: 'Drawing $y = 2x - 1$'
    problem: 'Draw the graph of $y = 2x - 1$ for $x$ from $-2$ to $3$.'
    steps:
      - explain: 'Build a table of values. Substitute each $x$ into the equation.'
        maths: '\begin{array}{c|cccccc} x & -2 & -1 & 0 & 1 & 2 & 3 \\ \hline y & -5 & -3 & -1 & 1 & 3 & 5 \end{array}'
      - explain: 'Check one: when $x = -2$, $y = 2(-2) - 1 = -4 - 1 = -5$. The minus signs are where marks get lost.'
      - explain: 'Plot the six points and join them with a single straight line, extended to the edges of the grid.'
      - explain: 'Sanity check against the equation: the gradient is 2, so the line should go up 2 for every 1 across — and it crosses the $y$-axis at $-1$.'
    answer: 'A straight line through $(0, -1)$ rising 2 units for every 1 unit across'
  - title: 'Finding the equation from a graph'
    problem: 'A line passes through $(0, 3)$ and $(4, 11)$. Find its equation.'
    steps:
      - explain: 'The line crosses the $y$-axis at 3, so $c = 3$.'
        maths: 'c = 3'
      - explain: 'Find the gradient from the two points.'
        maths: 'm = \frac{11 - 3}{4 - 0} = \frac{8}{4} = 2'
      - explain: 'Put both into $y = mx + c$.'
        maths: 'y = 2x + 3'
      - explain: 'Check with the second point: does $x = 4$ give $y = 11$?'
        maths: '2(4) + 3 = 11 \;\checkmark'
    answer: '$y = 2x + 3$'
  - title: 'Is the point on the line?'
    problem: 'Does the point $(5, 12)$ lie on the line $y = 3x - 4$?'
    steps:
      - explain: 'Substitute $x = 5$ into the equation.'
        maths: 'y = 3(5) - 4'
      - explain: 'Work it out.'
        maths: 'y = 15 - 4 = 11'
      - explain: 'The line gives $y = 11$ when $x = 5$, but the point has $y = 12$.'
    answer: 'No — the point $(5, 11)$ is on the line, but $(5, 12)$ sits one unit above it'
practice: sequences-03
---

## Why straight lines matter

Any relationship where something changes by the **same amount every time** draws a
straight line. A taxi that charges $3 to start and $2 per kilometre; a phone plan with
a monthly fee plus a rate per gigabyte; a tank draining at a steady rate. All of them
are $y = mx + c$ in disguise.

## What $m$ and $c$ actually do

Use the explorer above while you read this — it is much faster than taking it on
trust.

**$c$ moves the line up and down.** Change $c$ and the line slides vertically without
tilting. It is the value of $y$ when $x = 0$, which is exactly where the line meets
the vertical axis.

**$m$ tilts the line.**

| $m$ | What the line does |
| --- | --- |
| Large positive, e.g. $5$ | Rises steeply left to right |
| Small positive, e.g. $0.5$ | Rises gently |
| Zero | Flat — a horizontal line $y = c$ |
| Negative, e.g. $-3$ | Falls left to right |

## Drawing a line from its equation

1. **Make a table** with a handful of $x$ values, including $0$ and some negatives.
2. **Substitute each one** into the equation. Take your time with negatives.
3. **Plot the points.**
4. **Join them with a ruler** and extend the line to the edges of the grid.
5. **Check it looks right** — does it cross the $y$-axis at $c$? Does its steepness
   match $m$?

If one point is out of line with the others, you have made an arithmetic slip, not a
discovery. Go back and check that value.

## Finding the equation from a graph

Read off $c$ first — it is free, you just look at where the line crosses the $y$-axis.

Then find $m$ by picking **two points where the line passes exactly through grid
corners** and counting:

$$m = \frac{\text{how far up}}{\text{how far across}}$$

Counting between two corners avoids estimating, which is where errors creep in. If
the line goes *down* as you move right, $m$ is negative — write the minus sign
immediately, before you forget.

> **The quickest check of all.** Once you have an equation, test it on a point you did
> not use to find it. If it works, you are right; if it does not, you have the
> gradient or the intercept wrong.
