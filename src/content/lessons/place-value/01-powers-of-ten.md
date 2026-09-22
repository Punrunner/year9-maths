---
title: Multiplying and Dividing by Powers of 10
topic: place-value
order: 1
minutes: 20
difficulty: core
summary: 'What multiplying and dividing by $10^3$, $10^{-2}$ and friends really does to the digits of a number.'
objectives:
  - 'Multiply and divide by positive powers of 10'
  - 'Explain why multiplying by $10^{-2}$ is the same as dividing by 100'
  - 'Multiply and divide by negative powers of 10'
  - 'Find the missing power in a calculation such as $7.1 \times 10^{\square} = 710\,000$'
keyRules:
  - title: 'Positive powers'
    formula: '3 \times 10^4 = 3 \times 10\,000 = 30\,000'
    body: 'Multiplying by $10^n$ moves every digit $n$ places to the **left** (the number gets bigger). Dividing by $10^n$ moves them $n$ places to the **right**.'
  - title: 'Negative powers flip the operation'
    formula: '\times 10^{-n} \;=\; \div 10^{n} \qquad \div 10^{-n} \;=\; \times 10^{n}'
    body: 'Because $10^{-2} = \frac{1}{100}$, multiplying by $10^{-2}$ divides by 100, and dividing by $10^{-2}$ multiplies by 100.'
  - title: 'Link to 0.1 and 0.01'
    body: '$10^{-1} = 0.1$, $10^{-2} = 0.01$, $10^{-3} = 0.001$. So multiplying by 0.01 is the same as dividing by 100.'
workedExamples:
  - title: 'Four calculations'
    problem: 'Work out **a** $3 \times 10^4$ **b** $420 \div 10^2$ **c** $530 \times 10^{-3}$ **d** $0.819 \div 10^{-5}$'
    steps:
      - explain: '$10^4 = 10\,000$.'
        maths: '3 \times 10\,000 = 30\,000'
      - explain: '$10^2 = 100$.'
        maths: '420 \div 100 = 4.2'
      - explain: 'Multiplying by $10^{-3}$ is dividing by $10^3 = 1000$.'
        maths: '530 \times \frac{1}{1000} = 530 \div 1000 = 0.53'
      - explain: 'Dividing by $10^{-5}$ is multiplying by $10^5 = 100\,000$.'
        maths: '0.819 \div \frac{1}{100\,000} = 0.819 \times 100\,000 = 81\,900'
    answer: '**a** 30 000 **b** 4.2 **c** 0.53 **d** 81 900'
  - title: 'Finding a missing power'
    problem: 'Find the missing power: $60\,000 \times 10^{\square} = 6$'
    steps:
      - explain: '60 000 has become 6, so it has been divided by 10 000.'
        maths: '60\,000 \div 10\,000 = 6'
      - explain: 'Dividing by $10^4$ is the same as multiplying by $10^{-4}$.'
        maths: '60\,000 \times 10^{-4} = 6'
    answer: 'The missing power is $-4$.'
practice: place-value-01
---

## Why this matters

Our number system is built on tens. Every place is worth ten times the place to its right,
which is why multiplying by 10 simply slides the digits along. Understanding this is the
foundation for standard form, metric conversions and every calculation with very big or
very small numbers.

## The pattern

Each time you step down this list, you divide by 10:

| Power | $10^3$ | $10^2$ | $10^1$ | $10^0$ | $10^{-1}$ | $10^{-2}$ | $10^{-3}$ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Value | 1000 | 100 | 10 | 1 | $\frac{1}{10} = 0.1$ | $\frac{1}{100} = 0.01$ | $\frac{1}{1000} = 0.001$ |

That pattern tells you everything:

- multiplying by $10^{-1}$ is the same as dividing by 10,
- multiplying by $10^{-2}$ is the same as dividing by 100,
- dividing by $10^{-3}$ is the same as multiplying by 1000,
- and in general, dividing by $10^{-6}$ is multiplying by $10^6$.

## Digits move, the decimal point stays

It helps to picture the **digits** sliding past a fixed decimal point:

$$2.87 \times 10^3 = 2870 \qquad 2870 \times 10^{-3} = 2.87$$

Fill any empty places with zeros.

> **Sense check.** Multiplying by a *positive* power of 10 makes a number bigger. Multiplying
> by a *negative* power of 10 makes it smaller. If your answer goes the wrong way, you have
> flipped the operation.

## Order of operations still applies

In $7 \times 10^5 + 6 \times 10^3$, work out each product first, then add:
$700\,000 + 6000 = 706\,000$.
