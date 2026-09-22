---
title: Estimating Square Roots and Cube Roots
topic: integers-powers-roots
order: 2
minutes: 25
difficulty: core
summary: 'Trapping a root between two whole numbers, then judging which one it is closer to — no calculator needed.'
objectives:
  - 'Recall the square numbers up to $20^2$ and the cube numbers up to $10^3$'
  - 'Estimate a square root to 1 decimal place without a calculator'
  - 'Estimate a cube root, including the cube root of a negative number'
  - 'Remember that a positive number has two square roots, $\pm$'
keyRules:
  - title: 'Trap it between two squares'
    body: 'Find the square numbers either side. If $25 < 28 < 36$ then $\sqrt{25} < \sqrt{28} < \sqrt{36}$, so $5 < \sqrt{28} < 6$.'
  - title: 'Then judge which is closer'
    body: '28 is 3 away from 25 but 8 away from 36, so $\sqrt{28}$ is closer to 5 than to 6. In fact $\sqrt{28} = 5.29\dots \approx 5.3$.'
  - title: 'Two square roots'
    formula: '(-7)^2 = 49 \;\Rightarrow\; \pm\sqrt{49} = \pm 7'
    body: 'Squaring a negative gives a positive, so every positive number has a positive **and** a negative square root. The $\sqrt{\ }$ sign on its own means the positive one.'
  - title: 'Cube roots work the same way'
    body: 'Use the cube numbers $1, 8, 27, 64, 125, 216, 343, 512, 729, 1000$. A cube root of a negative number is negative: $\sqrt[3]{-125} = -5$.'
visual:
  widget: number-line
  title: 'Trap √28'
  caption: 'Drag the marker between 5 and 6 to where you think $\sqrt{28}$ sits. 28 is much nearer 25 than 36, so the root is nearer 5.'
  config:
    min: 5
    max: 6
    step: 0.05
    majorStep: 0.25
    label: '√28 ≈'
workedExamples:
  - title: 'Estimating a square root'
    problem: 'Estimate $\pm\sqrt{78}$ to 1 decimal place.'
    steps:
      - explain: 'Find the square numbers either side of 78.'
        maths: '64 < 78 < 81'
      - explain: 'Take square roots of all three parts.'
        maths: '8 < \sqrt{78} < 9'
      - explain: '78 is 3 away from 81 but 14 away from 64, so the root is much closer to 9.'
        maths: '\sqrt{78} \approx 8.8'
      - explain: 'Do not forget the negative root.'
        maths: '\pm\sqrt{78} \approx \pm 8.8'
    answer: '$\pm\sqrt{78} \approx 8.8$ or $-8.8$'
  - title: 'Estimating a cube root'
    problem: 'Estimate $\sqrt[3]{200}$ to 1 decimal place.'
    steps:
      - explain: 'Find the cube numbers either side of 200.'
        maths: '5^3 = 125, \quad 6^3 = 216'
      - explain: 'So the cube root lies between 5 and 6.'
        maths: '5 < \sqrt[3]{200} < 6'
      - explain: '200 is 75 away from 125 but only 16 away from 216, so it is a lot closer to 6.'
        maths: '\sqrt[3]{200} \approx 5.8'
    answer: '$\sqrt[3]{200} \approx 5.8$'
  - title: 'Square roots of decimals'
    problem: 'Find $\sqrt{0.01}$ and $\sqrt{0.04}$, then estimate $\sqrt{0.03}$ to 2 decimal places.'
    steps:
      - explain: '$0.1 \times 0.1 = 0.01$ and $0.2 \times 0.2 = 0.04$.'
        maths: '\sqrt{0.01} = 0.1, \quad \sqrt{0.04} = 0.2'
      - explain: '0.03 lies between them, and it is a little closer to 0.04.'
        maths: '0.1 < \sqrt{0.03} < 0.2'
      - explain: 'Try a value just below the halfway mark and square it to check.'
        maths: '0.17^2 = 0.0289, \quad 0.18^2 = 0.0324'
    answer: '$\sqrt{0.03} \approx 0.17$'
practice: integers-02
---

## Why this matters

A calculator will give you $\sqrt{28}$ to ten decimal places. But how do you know you
pressed the right buttons? A quick estimate tells you whether the answer is
*reasonable* — exactly what an engineer checking a length on site needs.

## The facts you need at your fingertips

| $n$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $n^2$ | 1 | 4 | 9 | 16 | 25 | 36 | 49 | 64 | 81 | 100 |
| $n^3$ | 1 | 8 | 27 | 64 | 125 | 216 | 343 | 512 | 729 | 1000 |

Carry on the squares to $11^2 = 121,\ 12^2 = 144,\ 13^2 = 169,\ 14^2 = 196,\ 15^2 = 225$.

## The two-step method

1. **Trap** the root between two whole numbers by finding the squares (or cubes)
   either side.
2. **Judge** where it sits between them by comparing the distances.

The distances only give you a rough guide, because the gaps between square numbers
get bigger as you go up. A root is never *exactly* in proportion to where the number
sits. If you want to be sure of the first decimal place, square your guess and see
which way it misses.

> **A common mistake.** To estimate $\sqrt{27}$, Farhad noticed that 27 is 2 of the
> 11 steps from 25 to 36, and said $\sqrt{27} \approx 5 + \frac{2}{11} \approx 5.2$.
> It happens to work here, but only roughly. Always check by squaring:
> $5.2^2 = 27.04$. ✓

## Decimals under the root sign

When you square a decimal you do not get a square number: $1.4^2 = 1.96$. The same
trapping idea still works for decimals, as long as you know some easy ones:

$$\sqrt{0.25} = 0.5 \qquad \sqrt{0.36} = 0.6 \qquad \sqrt{0.49} = 0.7 \qquad \sqrt{0.09} = 0.3$$

Notice that the square root of a number between 0 and 1 is **bigger** than the
number itself: $\sqrt{0.25} = 0.5$.

## Cube roots of negative numbers

$(-3)^3 = -3 \times -3 \times -3 = -27$, so $\sqrt[3]{-27} = -3$. Estimate a negative cube
root exactly as you would a positive one, then put a minus sign in front:
$\sqrt[3]{-15} \approx -2.5$.
