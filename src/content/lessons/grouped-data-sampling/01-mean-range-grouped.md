---
title: The Mean and Range from Grouped Data
topic: grouped-data-sampling
order: 1
minutes: 25
difficulty: core
summary: 'Using midpoints to estimate the mean of a grouped frequency table, and estimating the range from the class boundaries.'
objectives:
  - 'Find the midpoint of a class interval'
  - 'Estimate the mean from a grouped frequency table using $\frac{\Sigma fx}{\Sigma f}$'
  - 'Estimate the range from the first and last class boundaries'
  - 'Explain why these values are only estimates'
keyRules:
  - title: 'Midpoint of a class'
    formula: '\text{midpoint} = \frac{\text{lower boundary} + \text{upper boundary}}{2}'
    body: 'For $150 \le h < 155$ the midpoint is $\frac{150 + 155}{2} = 152.5$.'
  - title: 'Estimated mean'
    formula: '\text{mean} \approx \frac{\Sigma fx}{\Sigma f}'
    body: 'Multiply each midpoint $x$ by its frequency $f$, add up the results ($\Sigma fx$), then divide by the total frequency ($\Sigma f$).'
  - title: 'Estimated range'
    formula: '\text{range} \approx \text{upper boundary of last class} - \text{lower boundary of first class}'
    body: 'This gives the **largest** the range could possibly be.'
  - title: 'Why only an estimate?'
    body: 'Once data is grouped, the exact values are lost. Using the midpoint assumes every value in a class sits in the middle of it — which is almost never exactly true.'
visual:
  widget: histogram
  title: 'Grouped data explorer'
  caption: 'These are the heights of 30 plants from the first worked example. Drag a slider to change a frequency and watch the estimated mean move towards the bigger bars.'
  config:
    boundaries: [10, 20, 30, 40, 50]
    freqs: [4, 8, 11, 7]
    maxFreq: 16
    label: 'Height, h (cm)'
workedExamples:
  - title: 'Estimating a mean'
    problem: 'The heights of 30 plants are grouped: $10 \le h < 20$: 4, $\;20 \le h < 30$: 8, $\;30 \le h < 40$: 11, $\;40 \le h < 50$: 7. Estimate the mean height.'
    steps:
      - explain: 'Find the midpoint of each class.'
        maths: '15, \quad 25, \quad 35, \quad 45'
      - explain: 'Multiply each midpoint by its frequency.'
        maths: '4 \times 15 = 60, \quad 8 \times 25 = 200, \quad 11 \times 35 = 385, \quad 7 \times 45 = 315'
      - explain: 'Add them up to get $\Sigma fx$, and add the frequencies to get $\Sigma f$.'
        maths: '\Sigma fx = 960, \qquad \Sigma f = 30'
      - explain: 'Divide.'
        maths: '\text{mean} \approx \frac{960}{30} = 32\ \text{cm}'
    answer: 'Estimated mean height: 32 cm'
  - title: 'Estimating the range'
    problem: 'For the same plants, estimate the range.'
    steps:
      - explain: 'The first class starts at 10 cm and the last class ends at 50 cm.'
        maths: '50 - 10 = 40\ \text{cm}'
    answer: 'About 40 cm — the largest the range could be.'
practice: grouped-01
---

## Why this matters

Large data sets — the heights of every Year 9 student in a country, the waiting times at a
hospital — are almost always published in groups. You rarely see the raw data. Knowing how
to get a good estimate of the mean from a table is how researchers and journalists make
sense of those figures.

## Setting out the table

Add two columns to the frequency table — one for the midpoint and one for $f \times x$:

| Height ($h$, cm) | Frequency, $f$ | Midpoint, $x$ | $f \times x$ |
| --- | --- | --- | --- |
| $140 \le h < 145$ | 1 | 142.5 | 142.5 |
| $145 \le h < 150$ | 3 | 147.5 | 442.5 |
| $150 \le h < 155$ | 11 | 152.5 | 1677.5 |
| $155 \le h < 160$ | 7 | 157.5 | 1102.5 |
| $160 \le h < 165$ | 2 | 162.5 | 325 |
| $165 \le h < 170$ | 0 | 167.5 | 0 |
| $170 \le h < 175$ | 1 | 172.5 | 172.5 |
| **Total** | **25** | | **3862.5** |

$$\text{mean} \approx \frac{\Sigma fx}{\Sigma f} = \frac{3862.5}{25} = 154.5\ \text{cm}$$

The Greek letter $\Sigma$ (sigma) just means *"add them all up"*.

## A quick sanity check

The mean must lie **inside** the range of the data, and it is usually near the classes with
the biggest frequencies. For 40 oranges with masses between 120 g and 145 g, a mean of
115 g or 145 g is impossible — the first is below every orange, and the second would need
every orange to be at the very top of the last class.

> **Common slip.** Dividing $\Sigma fx$ by the *number of classes* instead of the *total
> frequency*. There are 7 classes above, but 25 children.
