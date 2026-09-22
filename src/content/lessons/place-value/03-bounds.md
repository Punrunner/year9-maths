---
title: Lower and Upper Bounds
topic: place-value
order: 3
minutes: 25
difficulty: core
summary: 'Every rounded number stands for a range of possible values. Finding the smallest and largest, and writing them as an inequality.'
objectives:
  - 'Find the lower and upper bounds of a number rounded to the nearest 10, 100, whole number or decimal place'
  - 'Find bounds for numbers rounded to significant figures'
  - 'Write the bounds as an inequality $\text{LB} \le n < \text{UB}$'
  - 'Use bounds in a simple calculation, such as the largest possible perimeter'
keyRules:
  - title: 'Half a unit either side'
    body: 'Find the unit the number was rounded to, halve it, and go that far below and above. 1200 kg to the nearest 100 kg: half of 100 is 50, so the bounds are 1150 and 1250.'
  - title: 'The inequality'
    formula: '\text{lower bound} \le n < \text{upper bound}'
    body: 'The lower bound itself rounds up to the number, so it is included ($\le$). The upper bound would round up to the *next* value, so it is not ($<$).'
  - title: 'Decimal places and significant figures'
    body: 'To 2 d.p. the unit is 0.01, so go 0.005 either way: $23.475 \le t < 23.485$. To 2 s.f., 3400 means the nearest 100, so $3350 \le n < 3450$.'
  - title: 'Largest and smallest results'
    body: 'For the **largest** possible sum or product, use the upper bounds. For the smallest, use the lower bounds.'
visual:
  widget: number-line
  title: 'What rounds to 40?'
  caption: 'Drag the marker along. Every value from 35 up to (but not including) 45 rounds to 40 to the nearest 10. 35 is the lower bound; 45 is the upper bound, even though 45 itself would round to 50.'
  config:
    min: 30
    max: 50
    step: 0.5
    majorStep: 5
    label: 'n'
workedExamples:
  - title: 'Three kinds of rounding'
    problem: 'Write an inequality for **a** a car of mass $m$ kg, 1200 kg to the nearest 100 kg **b** a pencil of length $p$ cm, 14 cm to the nearest cm **c** a time $t$ s, 23.48 s to 2 d.p.'
    steps:
      - explain: 'Nearest 100: half of 100 is 50.'
        maths: '1200 - 50 \le m < 1200 + 50 \;\Rightarrow\; 1150 \le m < 1250'
      - explain: 'Nearest 1: half of 1 is 0.5.'
        maths: '13.5 \le p < 14.5'
      - explain: '2 d.p. means the nearest 0.01. Half of 0.01 is 0.005.'
        maths: '23.475 \le t < 23.485'
    answer: '$1150 \le m < 1250$, $\;13.5 \le p < 14.5$, $\;23.475 \le t < 23.485$'
  - title: 'Bounds to significant figures'
    problem: 'A number rounded to 2 significant figures is 520. Find its bounds.'
    steps:
      - explain: 'The second significant figure (the 2) is in the tens column, so it was rounded to the nearest 10.'
      - explain: 'Half of 10 is 5.'
        maths: '515 \le n < 525'
    answer: '$515 \le n < 525$'
  - title: 'Upper bound of a perimeter'
    problem: 'A rectangle measures 9 cm by 4 cm, each correct to the nearest cm. Find the upper bound of its perimeter.'
    steps:
      - explain: 'Upper bound of each side.'
        maths: '9 + 0.5 = 9.5\ \text{cm}, \quad 4 + 0.5 = 4.5\ \text{cm}'
      - explain: 'Use the upper bounds to get the largest perimeter.'
        maths: '2 \times (9.5 + 4.5) = 28\ \text{cm}'
    answer: '28 cm'
practice: place-value-03
---

## Why this matters

A football stadium holds 62 540 people. If that is rounded to 63 000 and 63 000 tickets are
sold, nearly 500 people will have nowhere to sit. Rounded numbers hide a range of true
values, and engineers, builders and event planners need to know the whole range — not just
the rounded figure.

## Which numbers round to 40?

To the nearest 10, all of these round to 40:

$$35, \; 36, \; 38.724, \; 39, \; 40.5, \; 41, \; 44, \; 44.9$$

The smallest number that rounds to 40 is **35**. There is no single largest — $44.9$,
$44.99$, $44.999\dots$ all round to 40. So we use **45** as the upper bound and write

$$35 \le n < 45$$

## Harry's method

1. Find what the number was rounded to (nearest 100, nearest 0.1, …).
2. Halve it.
3. Subtract for the lower bound, add for the upper bound.

It works every time, as long as you are careful in step 1 — especially with significant
figures.

| Rounded value | Rounded to | Half a unit | Bounds |
| --- | --- | --- | --- |
| 340 | nearest 10 | 5 | $335 \le n < 345$ |
| 4500 | nearest 100 | 50 | $4450 \le n < 4550$ |
| 0.7 | 1 d.p. | 0.05 | $0.65 \le n < 0.75$ |
| 3.78 | 2 d.p. | 0.005 | $3.775 \le n < 3.785$ |
| 4000 | 1 s.f. | 500 | $3500 \le n < 4500$ |

## Watch out for unusual units

Rounded to the nearest **50**? Half of 50 is 25, so 350 has bounds $325 \le n < 375$.
Rounded to the nearest **0.5**? Half of 0.5 is 0.25, so 7.5 has bounds $7.25 \le n < 7.75$.

> **A common error.** Ruth says a number that is 4800 to the nearest 10 lies in
> $4750 \le n < 4850$. She has used half of 100, not half of 10. The correct bounds are
> $4795 \le n < 4805$.
