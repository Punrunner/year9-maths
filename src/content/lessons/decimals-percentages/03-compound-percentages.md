---
title: Percentage Change and Compound Interest
topic: decimals-percentages
order: 3
minutes: 30
difficulty: core
summary: 'Using multipliers for percentage increases and decreases, simple versus compound interest, and repeated percentage change.'
objectives:
  - 'Use a multiplier to increase or decrease by a percentage'
  - 'Calculate simple interest'
  - 'Calculate compound interest and repeated percentage change using powers'
  - 'Explain why two successive changes of $x\%$ do not simply add'
keyRules:
  - title: 'Multipliers'
    formula: '+15\% \Rightarrow \times 1.15 \qquad -12\% \Rightarrow \times 0.88'
    body: 'An increase of 15% leaves you with 115% of the original. A decrease of 12% leaves 88%.'
  - title: 'Simple interest'
    formula: 'I = \frac{PRT}{100}'
    body: 'The same interest is paid every year: $P$ is the principal, $R$ the rate per year and $T$ the number of years.'
  - title: 'Compound interest'
    formula: '\text{value} = \text{principal} \times \text{multiplier}^{\text{years}}'
    body: 'Interest is added each year, so the next year''s interest is worked out on a bigger amount. Do not round until the end. Subtract the principal to find the interest.'
  - title: 'Changes multiply, they do not add'
    body: 'Reducing by 25% twice is $0.75 \times 0.75 = 0.5625$ — a 43.75% reduction, not 50%.'
workedExamples:
  - title: 'Increase and decrease'
    problem: 'A bed costs 540 dollars before 15% sales tax. A car costing 8400 dollars has a 12% discount. Find each final price.'
    steps:
      - explain: 'Increase: multiply by 1.15.'
        maths: '540 \times 1.15 = 621'
      - explain: 'Decrease: multiply by 0.88.'
        maths: '8400 \times 0.88 = 7392'
    answer: 'Bed 621 dollars, car 7392 dollars'
  - title: 'Simple against compound'
    problem: 'Rahul invests 400 dollars for 5 years. Compare 3.1% simple interest with 3% compound interest.'
    steps:
      - explain: 'Simple: the same 12.40 dollars every year.'
        maths: '400 \times 0.031 = 12.40, \qquad 12.40 \times 5 = 62 \;\Rightarrow\; 462'
      - explain: 'Compound: multiply by 1.03 five times.'
        maths: '400 \times 1.03^5 = 463.7096\dots \approx 463.71'
    answer: 'Compound gives 463.71 dollars — more, even at a lower rate.'
  - title: 'Depreciation'
    problem: 'A car bought for 13 000 dollars loses 12% of its value each year. What is it worth after 2 years?'
    steps:
      - explain: 'The multiplier for a 12% decrease.'
        maths: '1 - 0.12 = 0.88'
      - explain: 'Apply it twice.'
        maths: '13\,000 \times 0.88^2 = 10\,067.20'
    answer: 'About 10 067 dollars'
practice: decimals-03
---

## Why this matters

Savings accounts, loans, credit cards, inflation and the value of a new car all change by a
percentage each year. Compound change is how money grows — and how debt grows too.

## Why compound beats simple

With simple interest you earn interest only on what you put in. With compound interest you also
earn interest **on your interest**. Over a few years the difference is small; over 30 years it is
enormous.

## Jamil's mistake

In a sale, prices are cut by 25%, then by a further 25%. Jamil says items are now half price. For a
100-dollar coat: $100 \times 0.75 = 75$, then $75 \times 0.75 = 56.25$. The second 25% is taken off a
**smaller** price, so the total reduction is only 43.75%.

Likewise, increasing a 400-dollar coat by 20% and then decreasing by 20% does not bring it back:
$400 \times 1.2 \times 0.8 = 384$.

> **Calculator tip.** Use the power key: $400 \times 1.03^5$ is faster and more accurate than five
> separate multiplications.
