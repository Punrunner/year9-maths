---
title: Back-to-Back Stem-and-Leaf Diagrams
topic: presenting-data
order: 2
minutes: 25
difficulty: core
summary: 'Showing two data sets on one shared stem, reading off averages and ranges, and comparing the two.'
objectives:
  - 'Draw a back-to-back stem-and-leaf diagram with a key'
  - 'Read the median, mode and range for each side'
  - 'Compare two distributions using an average and the range'
  - 'Make a sensible judgement from the comparison'
keyRules:
  - title: 'One stem, two sides'
    body: 'The stems go down the middle. One data set''s leaves go to the right, the other''s to the left. Leaves on **both** sides get closer to the stem as they get smaller.'
  - title: 'Always give a key'
    body: 'For example: $1 \mid 7 = 1.7$ mm on the right and $6 \mid 1 = 1.6$ mm on the left. Without a key, nobody knows whether $3 \mid 5$ means 35, 3.5 or 350.'
  - title: 'Keep the data'
    body: 'Unlike a grouped table, a stem-and-leaf diagram keeps every original value — so you can find the exact median, mode and range.'
  - title: 'Comparing'
    body: 'Compare an **average** (median or mean) to say which is generally bigger, and the **range** to say which is more consistent. Always relate it back to the context.'
workedExamples:
  - title: 'Drawing the diagram'
    problem: 'Fifteen students'' results — Maths: 43, 63, 45, 57, 82, 52, 50, 69, 71, 51, 48, 70, 54, 90, 66. Geography: 42, 65, 75, 88, 73, 88, 57, 60, 72, 97, 79, 80, 62, 91, 51. Draw a back-to-back stem-and-leaf diagram.'
    steps:
      - explain: 'The stems are the tens digits: 4, 5, 6, 7, 8, 9.'
      - explain: 'Put the Maths leaves on the left and Geography on the right, in order, smallest nearest the stem.'
        maths: '\begin{array}{r|c|l} 8\;5\;3 & 4 & 2 \\ 7\;4\;2\;1\;0 & 5 & 1\;7 \\ 9\;6\;3 & 6 & 0\;2\;5 \\ 1\;0 & 7 & 2\;3\;5\;9 \\ 2 & 8 & 0\;8\;8 \\ 0 & 9 & 1\;7 \end{array}'
      - explain: 'Add a key.'
        maths: '3 \mid 4 = 43 \text{ (Maths)}, \qquad 4 \mid 2 = 42 \text{ (Geography)}'
    answer: 'See the diagram — and never forget the key.'
  - title: 'Comparing'
    problem: 'Use the diagram to decide which exam was easier.'
    steps:
      - explain: 'There are 15 values on each side, so the median is the 8th.'
        maths: '\text{Maths median} = 57, \qquad \text{Geography median} = 73'
      - explain: 'Find each range.'
        maths: '\text{Maths: } 90 - 43 = 47, \qquad \text{Geography: } 97 - 42 = 55'
      - explain: 'The Geography median is much higher. Its range is a little bigger, so its marks were slightly more spread out.'
    answer: 'Geography looks easier: its median (73) is well above Maths (57).'
practice: presenting-02
---

## Why this matters

When you want to compare two groups — two machines, two classes, two clubs — a back-to-back
stem-and-leaf diagram puts them side by side while keeping every single value. You can see
the shape of each data set and work out exact statistics from it.

## Reading from the left

The left-hand side reads **backwards** from the stem. In the row $7\;4\;2\;1\;0 \mid 5$, the
values are 50, 51, 52, 54 and 57 — the 0 nearest the stem is the smallest.

## Which average?

| Statistic | Tells you | Watch out |
| --- | --- | --- |
| Median | the middle value | the best general comparison |
| Mode | the most common value | can be misleading with small data sets |
| Mean | the balance point | affected by extreme values |
| Range | how spread out the data is | depends on the two most extreme values only |

> **A good comparison sentence** mentions a statistic *and* the context: *"The median age in
> Club B (51) is much higher than in Club A (14), so Club B is probably the golf club."*
