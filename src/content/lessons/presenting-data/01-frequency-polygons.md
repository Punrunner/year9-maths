---
title: Frequency Polygons
topic: presenting-data
order: 1
minutes: 20
difficulty: core
summary: 'Plotting frequencies at the midpoints of each class and joining them with straight lines — and using two polygons to compare data sets.'
objectives:
  - 'Draw a frequency polygon from a grouped frequency table'
  - 'Read frequencies and midpoints from a frequency polygon'
  - 'Draw two frequency polygons on one graph to compare distributions'
  - 'Know when a comparison may not be fair'
keyRules:
  - title: 'Plot at the midpoints'
    body: 'Each point goes at the **midpoint** of its class interval, at the height of its frequency. For $10 \le t < 15$ with frequency 8, plot $(12.5, 8)$.'
  - title: 'Join with straight lines'
    body: 'Join neighbouring points with straight lines using a ruler — not a curve. Do not join the last point back to the first.'
  - title: 'Why use one?'
    body: 'A frequency polygon shows the same shape as a histogram but with less clutter, so two or more can be drawn on the same axes and compared directly.'
visual:
  widget: histogram
  title: 'Histogram and frequency polygon'
  caption: 'Times taken by 29 children to travel to school. The red line joins the tops of the bars at their **midpoints** — that is the frequency polygon.'
  config:
    boundaries: [5, 10, 15, 20, 25, 30]
    freqs: [1, 8, 10, 6, 4]
    maxFreq: 12
    label: 'Time, t (minutes)'
    polygon: true
workedExamples:
  - title: 'Drawing a frequency polygon'
    problem: 'Times to school: $5 \le t < 10$: 1, $10 \le t < 15$: 8, $15 \le t < 20$: 10, $20 \le t < 25$: 6, $25 \le t < 30$: 4. Which points do you plot?'
    steps:
      - explain: 'Find the midpoint of each class.'
        maths: '7.5,\ 12.5,\ 17.5,\ 22.5,\ 27.5'
      - explain: 'Pair each midpoint with its frequency.'
        maths: '(7.5, 1),\ (12.5, 8),\ (17.5, 10),\ (22.5, 6),\ (27.5, 4)'
      - explain: 'Plot the points and join them in order with straight lines.'
    answer: 'Plot $(7.5, 1)$, $(12.5, 8)$, $(17.5, 10)$, $(22.5, 6)$, $(27.5, 4)$ and join with straight lines.'
  - title: 'Comparing two groups'
    problem: '50 students and 48 teachers record how long they take to travel to school. The students'' polygon peaks at $15$–$20$ minutes; the teachers'' peaks at $10$–$15$ minutes. Compare them.'
    steps:
      - explain: 'The peak shows the modal class for each group.'
      - explain: 'Teachers tend to take less time — their polygon is shifted to the left.'
      - explain: 'The groups are different sizes (50 and 48), so comparing raw frequencies is only roughly fair.'
    answer: 'Teachers generally take less time; the comparison is fair only because the groups are similar in size.'
practice: presenting-01
---

## Why this matters

Frequency polygons make it easy to compare distributions at a glance — for example, the
heights of boys and girls, or waiting times at two hospitals — without two sets of bars
getting in each other's way.

## Emma's mistakes

Emma thinks you should plot each point at the **start** of the class interval and join them
with a **curve**. Both are wrong:

- plot at the **midpoint**, because the midpoint represents the whole class, and
- join with **straight lines**, because you do not know what happens between midpoints.

## Reading a polygon

To read the data back, look at each point: the $x$-value is the midpoint and the $y$-value is
the frequency. Add the frequencies to get the total — for example, the number of cars for sale
in a garage.

> **Fair comparisons.** Two groups of very different sizes are hard to compare directly —
> 200 people will have taller "peaks" than 20, even if the pattern is the same. Compare the
> **shape** and position, not just the heights.
