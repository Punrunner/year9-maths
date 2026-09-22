---
title: Standard Form
topic: place-value
order: 2
minutes: 30
difficulty: core
summary: 'Writing very large and very small numbers as $A \times 10^n$, converting back, and calculating with them.'
objectives:
  - 'Write a large number in standard form'
  - 'Write a small number in standard form using a negative power of 10'
  - 'Convert a number in standard form back to an ordinary number'
  - 'Spot numbers that are not in standard form, and calculate with standard form'
keyRules:
  - title: 'The shape of standard form'
    formula: 'A \times 10^n, \qquad 1 \le A < 10, \quad n \text{ an integer}'
    body: 'The first number must be **at least 1 and less than 10**. The power of 10 says how many places the digits have moved.'
  - title: 'Large numbers — positive power'
    formula: '81\,432 = 8.1432 \times 10^4'
    body: 'Put the decimal point after the first non-zero digit, then count how many places it has to move to get back to the original number.'
  - title: 'Small numbers — negative power'
    formula: '0.000\,078\,45 = 7.845 \times 10^{-5}'
    body: 'For numbers less than 1 the power is negative. Count how many places the digits move to the **left** to make a number between 1 and 10.'
  - title: 'Not standard form'
    body: '$54.3 \times 10^7$ (first number too big), $0.03 \times 10^8$ (first number too small) and $7.1 \times 10^3 \times 10^2$ (two powers) are **not** in standard form.'
workedExamples:
  - title: 'Writing large numbers in standard form'
    problem: 'Write **a** 81 432 **b** 91 285 000 in standard form.'
    steps:
      - explain: 'Make a number between 1 and 10 from the digits: 8.1432. It has to be multiplied by 10 000 to get back to 81 432.'
        maths: '81\,432 = 8.1432 \times 10\,000 = 8.1432 \times 10^4'
      - explain: 'The same for part b: 9.1285 has to be multiplied by 10 000 000.'
        maths: '91\,285\,000 = 9.1285 \times 10^7'
    answer: '**a** $8.1432 \times 10^4$ **b** $9.1285 \times 10^7$'
  - title: 'Writing small numbers in standard form'
    problem: 'Write **a** 0.0526 **b** 0.000 078 45 in standard form.'
    steps:
      - explain: 'Make 5.26. It has to be divided by 100 to get back to 0.0526.'
        maths: '0.0526 = 5.26 \div 100 = 5.26 \times 10^{-2}'
      - explain: 'Make 7.845. It has to be divided by 100 000.'
        maths: '0.000\,078\,45 = 7.845 \div 10^5 = 7.845 \times 10^{-5}'
    answer: '**a** $5.26 \times 10^{-2}$ **b** $7.845 \times 10^{-5}$'
  - title: 'Fixing a number that is not quite in standard form'
    problem: 'Emil writes $62 \times 100\,000$ as $62 \times 10^5$. Write it correctly in standard form.'
    steps:
      - explain: '62 is not between 1 and 10. Write it as $6.2 \times 10$.'
        maths: '62 \times 10^5 = 6.2 \times 10^1 \times 10^5'
      - explain: 'Combine the powers of 10 by adding.'
        maths: '= 6.2 \times 10^6'
    answer: '$6.2 \times 10^6$'
  - title: 'Multiplying in standard form'
    problem: 'Work out $(3 \times 10^4) \times (8 \times 10^7)$, giving the answer in standard form.'
    steps:
      - explain: 'Multiply the numbers and multiply the powers of 10 separately.'
        maths: '(3 \times 8) \times (10^4 \times 10^7) = 24 \times 10^{11}'
      - explain: '24 is not between 1 and 10, so adjust.'
        maths: '24 \times 10^{11} = 2.4 \times 10^{12}'
    answer: '$2.4 \times 10^{12}$'
practice: place-value-02
---

## Why this matters

The mass of the Moon is about $73\,500\,000\,000\,000\,000\,000\,000$ kg. A proton's mass is
about $0.000\,000\,000\,000\,000\,000\,000\,001\,673$ g. Numbers like these are easy to miscopy
and impossible to compare at a glance. Scientists write them as

$$7.35 \times 10^{22} \text{ kg} \qquad \text{and} \qquad 1.673 \times 10^{-24} \text{ g}$$

## The power tells you the size

| Number | Standard form |
| --- | --- |
| 8000 | $8 \times 10^3$ |
| 7 000 000 | $7 \times 10^6$ |
| 420 | $4.2 \times 10^2$ |
| 3.6 | $3.6 \times 10^0$ |
| 0.003 | $3 \times 10^{-3}$ |
| 0.000 05 | $5 \times 10^{-5}$ |

For any number of 10 or more the power is **positive**. For numbers less than 1 it is
**negative**. The bigger the power, the bigger the number — so to compare two numbers in
standard form, compare the powers first.

## Converting back

$3.81 \times 10^2$ means move the digits 2 places left: $381$.
$6 \times 10^{-5}$ means move the digits 5 places right: $0.000\,06$.

## On a calculator

Most calculators have a standard form key marked $\times 10^x$, **EXP** or **EE**. To enter
$2.3 \times 10^{-4}$ you type `2.3`, press the key, then type `-4`. Calculators often show
answers in standard form when they get very large or small — make sure you can read them.

> **Adding and subtracting.** You cannot just add the front numbers when the powers are
> different. Convert to ordinary numbers first: $4.2 \times 10^{-3} - 0.001 = 0.0042 - 0.001 = 0.0032 = 3.2 \times 10^{-3}$.
