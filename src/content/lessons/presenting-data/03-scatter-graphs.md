---
title: Scatter Graphs and Correlation
topic: presenting-data
order: 3
minutes: 25
difficulty: core
summary: 'Plotting pairs of data, describing correlation, drawing a line of best fit and using it to estimate.'
objectives:
  - 'Plot a scatter graph from paired data'
  - 'Describe correlation as positive, negative or none, and strong or weak'
  - 'Interpret correlation in the context of the data'
  - 'Draw a line of best fit and use it to estimate values; spot outliers'
keyRules:
  - title: 'Describe the correlation'
    body: '**Positive**: as one variable increases, so does the other. **Negative**: as one increases, the other decreases. **None**: no pattern at all. **Strong** means the points lie close to a straight line; **weak** means they are scattered.'
  - title: 'Interpret it'
    body: 'Describing says *"strong positive correlation"*. Interpreting says what it means: *"as height increases, mass increases"*.'
  - title: 'Line of best fit'
    body: 'A straight line that follows the trend, passes close to as many points as possible and has roughly as many points above it as below. It does **not** have to go through the origin.'
  - title: 'Correlation is not causation'
    body: 'Two variables can be correlated without one causing the other — ice-cream sales and sunburn both rise in summer, but ice cream does not cause sunburn.'
workedExamples:
  - title: 'Using a line of best fit'
    problem: 'For office workers, the line of best fit through (age, earnings) passes through $(25, 22\,000)$ and $(57, 36\,000)$. Estimate the earnings of a 48-year-old.'
    steps:
      - explain: 'Earnings rise by $36\,000 - 22\,000 = 14\,000$ over $57 - 25 = 32$ years.'
        maths: '\frac{14\,000}{32} = 437.5 \text{ dollars per year}'
      - explain: 'A 48-year-old is 23 years older than 25.'
        maths: '22\,000 + 23 \times 437.5 \approx 32\,000'
      - explain: 'On a graph you would simply read up from 48 to the line and across.'
    answer: 'About 32 000 dollars. The graph shows positive correlation.'
  - title: 'Spotting an outlier'
    problem: 'Nine people wrote their names backwards. Hannah (6 letters) took 3.3 s, while everyone else with 5–7 letters took 4.8–7.7 s. What is Hannah''s point?'
    steps:
      - explain: 'Most points follow a clear upward trend: longer names take longer.'
      - explain: 'Hannah''s point sits well below that trend.'
      - explain: 'A point that does not fit the pattern is an **outlier**. Hannah''s name is a palindrome — it reads the same backwards — which explains it.'
    answer: 'Hannah''s point is an outlier.'
practice: presenting-03
---

## Why this matters

Scientists use scatter graphs to look for relationships: does more exercise lead to more
weight loss? Does a city's height above sea level affect the temperature water boils at? A
scatter graph shows at a glance whether there is a link and how strong it is.

## Types of correlation

| Pattern | Name | Example |
| --- | --- | --- |
| Points rise from left to right | positive | height and arm length |
| Points fall from left to right | negative | height above sea level and boiling point |
| No pattern | none | maths score and hair length |

## Making predictions

Read up from the $x$-axis to your line of best fit, then across to the $y$-axis. This is
reliable **within** the range of your data. Going beyond it — predicting the earnings of a
90-year-old from data on 25–57 year-olds — is risky, because the trend may not continue.

## Be careful with small samples

Habibah plotted five friends' arm lengths against hours of TV watched and saw a positive
correlation. Layla is right to be sceptical: five points is far too few, and there is no
sensible reason why arm length would affect TV watching. A pattern in a tiny sample can easily
be a coincidence.
