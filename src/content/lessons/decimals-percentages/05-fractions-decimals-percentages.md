---
title: Fractions, Decimals and Percentages
topic: decimals-percentages
order: 2
minutes: 25
difficulty: foundation
summary: 'Three ways to write the same amount — converting between them, the ones to know by heart, and comparing mixed lists.'
objectives:
  - 'Understand a percentage as "out of 100"'
  - 'Convert between fractions, decimals and percentages'
  - 'Recall the common equivalents such as $\frac{1}{4} = 0.25 = 25\%$'
  - 'Order a mix of fractions, decimals and percentages'
activities:
  predict:
    label: 'Before we start'
    question:
      type: mcq
      prompt: 'A test is out of 20. Which score is the same as $70\%$?'
      options:
        - { id: a, text: '14 out of 20' }
        - { id: b, text: '7 out of 20' }
        - { id: c, text: '17 out of 20' }
        - { id: d, text: '10 out of 20' }
      answer: a
      hints: ['$70\%$ means 70 out of 100. How can you make 100 into 20?']
      explanation: '$70\% = \frac{70}{100}$. Divide top and bottom by 5: $\frac{14}{20}$. Per cent literally means "per hundred".'
  grid:
    label: 'Try it'
    visual:
      widget: percent-grid
      title: 'The hundred square'
      caption: 'Click squares or drag the slider. Shade 25 — what fraction is that? Try 50, 75, 20 and 10. Can you shade $\frac{3}{5}$?'
      config: { start: { p: 25 } }
  shade:
    label: 'Your turn'
    question:
      type: manipulable
      prompt: 'Shade $\frac{3}{20}$ of the hundred square.'
      widget: percent-grid
      config: { start: { p: 0 } }
      target: { p: 15 }
      hints: ['How do you make 20 into 100?']
      explanation: '$\frac{3}{20} = \frac{3 \times 5}{20 \times 5} = \frac{15}{100}$, so shade 15 squares: $15\%$ or $0.15$.'
  table:
    label: 'Quick check'
    question:
      type: table
      prompt: 'Complete the table.'
      columns: ['Fraction', 'Decimal', 'Percentage']
      rows:
        - [{ given: '$\frac{1}{2}$' }, { answer: '0.5' }, { answer: '50', accept: ['50%'] }]
        - [{ given: '$\frac{1}{4}$' }, { answer: '0.25' }, { answer: '25', accept: ['25%'] }]
        - [{ given: '$\frac{3}{4}$' }, { answer: '0.75' }, { answer: '75', accept: ['75%'] }]
        - [{ given: '$\frac{1}{5}$' }, { answer: '0.2' }, { answer: '20', accept: ['20%'] }]
        - [{ given: '$\frac{1}{10}$' }, { answer: '0.1' }, { answer: '10', accept: ['10%'] }]
        - [{ given: '$\frac{1}{8}$' }, { answer: '0.125' }, { answer: '12.5', accept: ['12.5%'] }]
      explanation: 'These are worth knowing by heart. Each decimal × 100 gives the percentage.'
  order-mix:
    label: 'Your turn'
    question:
      type: order
      prompt: 'Put these in order, **smallest first**.'
      items:
        - { id: a, text: '$\frac{2}{5}$' }
        - { id: b, text: '$0.35$' }
        - { id: c, text: '$38\%$' }
        - { id: d, text: '$\frac{3}{10}$' }
      solution: [d, b, c, a]
      hints: ['Change them all to percentages.']
      explanation: 'As percentages: $\frac{2}{5} = 40\%$, $0.35 = 35\%$, $38\%$, $\frac{3}{10} = 30\%$. So $\frac{3}{10} < 0.35 < 38\% < \frac{2}{5}$.'
  over-100:
    label: 'Think about it'
    reveal:
      prompt: 'Can a percentage be more than $100\%$? What would $150\%$ look like as a decimal and a fraction?'
      answer: 'Yes. $100\%$ is the whole thing, so $150\%$ is one and a half times it: $1.5 = 1\frac{1}{2}$. A price that rises by half is $150\%$ of what it was. (You can''t score more than $100\%$ on a test, though!)'
keyRules:
  - title: 'Percentage means out of 100'
    formula: '37\% = \frac{37}{100} = 0.37'
    body: '*Per cent* means *per hundred*, so a percentage is a fraction with denominator 100.'
  - title: 'Decimal ↔ percentage'
    body: 'Decimal → percentage: $\times 100$. Percentage → decimal: $\div 100$. So $0.6 = 60\%$ and $4\% = 0.04$.'
  - title: 'Fraction → decimal or percentage'
    body: 'Make the denominator 100 if you can ($\frac{7}{25} = \frac{28}{100} = 28\%$). If not, divide the top by the bottom: $\frac{3}{8} = 3 \div 8 = 0.375 = 37.5\%$.'
  - title: 'Decimal or percentage → fraction'
    body: 'Write it over 10, 100 or 1000 and simplify: $0.45 = \frac{45}{100} = \frac{9}{20}$; $35\% = \frac{35}{100} = \frac{7}{20}$.'
workedExamples:
  - title: 'Fraction to percentage'
    problem: 'Write $\frac{9}{25}$ as a percentage.'
    steps:
      - explain: '$25 \times 4 = 100$, so multiply the top and bottom by 4.'
        maths: '\frac{9}{25} = \frac{36}{100}'
      - explain: 'Out of 100 means per cent.'
        maths: '= 36\%'
    answer: '$36\%$'
  - title: 'An awkward fraction'
    problem: 'Write $\frac{5}{8}$ as a decimal and a percentage.'
    steps:
      - explain: '8 doesn''t go into 100, so divide.'
        maths: '5 \div 8 = 0.625'
      - explain: 'Multiply by 100 for the percentage.'
        maths: '0.625 \times 100 = 62.5\%'
    answer: '$0.625 = 62.5\%$'
  - title: 'Percentage to fraction'
    problem: 'Write $64\%$ as a fraction in its simplest form.'
    steps:
      - explain: 'Write it out of 100.'
        maths: '64\% = \frac{64}{100}'
      - explain: 'Divide top and bottom by the HCF, 4.'
        maths: '= \frac{16}{25}'
    answer: '$\frac{16}{25}$'
practice: decimals-05
---

[[activity: predict]]

## Three ways to write the same amount

$\frac{1}{4}$, $0.25$ and $25\%$ are the same amount written three ways. Fractions are
good for exact parts, decimals for calculators, and percentages for comparing — because
they are all "out of 100".

[[activity: grid]]

[[activity: shade]]

## Converting

Think of a triangle with fraction, decimal and percentage at the corners:

- **Decimal ↔ percentage**: move the point 2 places ($\times 100$ or $\div 100$).
- **Fraction → decimal**: divide the top by the bottom (or make the bottom 100).
- **Decimal → fraction**: write it over 10, 100 or 1000, then simplify.

[[activity: table]]

## Comparing a mixed list

To order fractions, decimals and percentages together, change them all to the **same
form** — percentages are usually easiest.

[[activity: order-mix]]

[[activity: over-100]]
