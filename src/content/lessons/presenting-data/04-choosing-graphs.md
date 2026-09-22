---
title: Choosing the Right Graph — and Spotting Misleading Ones
topic: presenting-data
order: 4
minutes: 25
difficulty: core
summary: 'Matching each kind of data to the graph that suits it, drawing a pie chart, and recognising the tricks that make graphs mislead.'
objectives:
  - 'Choose an appropriate graph for a given set of data'
  - 'Calculate the angles for a pie chart'
  - 'Make inferences from a time-series graph'
  - 'Explain how a graph can be drawn to mislead'
keyRules:
  - title: 'Which graph?'
    body: '**Bar chart** — discrete or categorical data. **Pictogram / infographic** — the same, with more visual impact. **Pie chart** — proportions of a whole. **Histogram or frequency polygon** — grouped continuous data. **Line (time-series) graph** — trends over time. **Scatter graph** — a relationship between two variables. **Stem-and-leaf** — keeps the raw data.'
  - title: 'Pie chart angles'
    formula: '\text{angle} = \frac{\text{frequency}}{\text{total}} \times 360^\circ'
    body: 'Spending 30 of 100 dollars on a shirt gives $\frac{30}{100} \times 360 = 108^\circ$.'
  - title: 'How graphs mislead'
    body: 'Starting the $y$-axis above zero, stretching or squashing the axis, using 3D or pictures, heavy shading on one bar, or simply choosing the wrong type of graph. The numbers may be correct while the **impression** is not.'
visual:
  widget: axis-trick
  title: 'Misleading axis explorer'
  caption: 'Company profits were 22, 26 and 32 million dollars. Drag the axis start up to 20: Year 3 now **looks** six times Year 1, though it is less than 1.5 times. Then stretch the top to 100 to make growth look tiny.'
  config:
    values: [22, 26, 32]
    labels: ['Year 1', 'Year 2', 'Year 3']
    unit: '$ millions'
workedExamples:
  - title: 'Drawing a pie chart'
    problem: 'David earned 100 dollars and spent it on: shirt 30, cap 10, cinema 10, music 20, savings 30. Find the angles for a pie chart.'
    steps:
      - explain: 'The whole circle, $360^\circ$, stands for 100 dollars, so each dollar is $3.6^\circ$.'
        maths: '360 \div 100 = 3.6^\circ'
      - explain: 'Multiply each amount by 3.6.'
        maths: '\text{shirt } 108^\circ,\ \text{cap } 36^\circ,\ \text{cinema } 36^\circ,\ \text{music } 72^\circ,\ \text{savings } 108^\circ'
      - explain: 'Check the total.'
        maths: '108 + 36 + 36 + 72 + 108 = 360^\circ \;\checkmark'
    answer: '$108^\circ, 36^\circ, 36^\circ, 72^\circ, 108^\circ$'
  - title: 'Spotting the trick'
    problem: 'A bar chart of profits (22, 26 and 32 million dollars) has a $y$-axis starting at 20. Why is it misleading?'
    steps:
      - explain: 'With the axis from 20, the bars have heights 2, 6 and 12 above the axis.'
        maths: '\frac{32 - 20}{22 - 20} = 6'
      - explain: 'So Year 3 looks 6 times as big as Year 1, but really it is only'
        maths: '\frac{32}{22} \approx 1.45 \text{ times}'
    answer: 'The missing baseline exaggerates the growth.'
practice: presenting-04
---

## Why this matters

Every day you see graphs in adverts, news reports and social media. Choosing the right graph
helps you communicate honestly. Recognising a misleading one protects you from being fooled.

## Making inferences from a time-series graph

A line graph of average monthly temperatures in Dubai and London shows that both are hottest in
July and August and coolest in January — and that Dubai is between 17 and 22 degrees hotter all
year round. Reading a trend like this from a table of 24 numbers is much harder. To **infer** is to
reach a sensible conclusion from the evidence, even if it cannot be proved.

## The misleading tricks

| Trick | Effect |
| --- | --- |
| Missing out the baseline (axis starts above 0) | small differences look huge |
| Stretching the $y$-axis | real growth looks tiny |
| 3D bars or pictures | sizes are hard to judge; front bars look bigger |
| Shading or thick borders on one bar | draws your eye to it |
| Wrong graph type (e.g. a pie chart for yearly profits) | hides the trend |

> **Normal and skewed shapes.** Large sets of data such as people's heights often make a
> symmetrical, bell-shaped histogram — the **normal distribution**. If the peak is pushed to
> one side, the data is **skewed**.
