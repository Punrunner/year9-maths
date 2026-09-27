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
activities:
  challenge:
    label: 'Challenge — no calculator'
    question:
      type: mcq
      prompt: 'Which is bigger: $\sqrt{50}$ or $7.1$?'
      shuffleOptions: false
      options:
        - { id: root, text: '$\sqrt{50}$' }
        - { id: dec, text: '$7.1$' }
        - { id: same, text: 'They are equal' }
      answer: dec
      hints: ['What is $7^2$? What is $7.1^2$?']
      explanation: 'Square both instead: $7.1^2 = 50.41$, which is more than 50. So $7.1$ is (just) bigger — $\sqrt{50} = 7.07\dots$ Squaring your guess is the trick this whole lesson is built on.'
  trap:
    label: 'Try it'
    visual:
      widget: number-line
      title: 'Trap √28'
      caption: '$\sqrt{25} = 5$ and $\sqrt{36} = 6$, so $\sqrt{28}$ is somewhere on this line. 28 is only 3 above 25 but 8 below 36 — drag the marker to where you think it sits, then check the answer below.'
      config: { min: 5, max: 6, step: 0.05, majorStep: 0.25, label: '√28 ≈', start: { x: 5.5 } }
  trap-answer:
    label: 'Check your guess'
    reveal:
      prompt: 'Where did you put $\sqrt{28}$?'
      answer: '$\sqrt{28} = 5.29\dots$, so a little under a third of the way from 5 to 6. If you went further right, that is the most common instinct — the gaps between square numbers grow, so roots creep up more slowly than you expect.'
  your-turn:
    label: 'Your turn'
    question:
      type: numeric
      prompt: 'Estimate $\sqrt{78}$ to 1 decimal place.'
      answer: 8.8
      tolerance: 0.11
      hints: ['Which square numbers are either side of 78?', '78 is 3 below 81 but 14 above 64.']
      explanation: '$64 < 78 < 81$ so $8 < \sqrt{78} < 9$, and much closer to 9. Check: $8.8^2 = 77.44$ and $8.9^2 = 79.21$, so $\sqrt{78} \approx 8.8$.'
  spot-mistake:
    label: 'Spot the mistake'
    question:
      type: mcq
      prompt: 'Farhad writes: *"$\sqrt{20}$ is between 4 and 5. 20 is halfway between 16 and 25 … no, it is nearer 16. So $\sqrt{20} = 4.2$."* What should he do before trusting 4.2?'
      options:
        - { id: a, text: 'Square it: $4.2^2 = 17.64$, which is too small, so try higher' }
        - { id: b, text: 'Nothing — 4.2 is correct' }
        - { id: c, text: 'Halve 20 to get 10' }
        - { id: d, text: 'Round it to 4' }
      answer: a
      explanation: 'Squaring is the check. $4.2^2 = 17.64$ is well short of 20. $4.5^2 = 20.25$, so $\sqrt{20} \approx 4.5$ (it is $4.47\dots$). The distances only give a first guess — squaring tells you if you are right.'
  cube-check:
    label: 'Quick check'
    question:
      type: numeric
      prompt: 'Estimate $\sqrt[3]{-15}$ to 1 decimal place.'
      answer: -2.5
      tolerance: 0.11
      hints: ['$(-2)^3 = -8$ and $(-3)^3 = -27$.']
      explanation: 'Estimate $\sqrt[3]{15}$ first: between 2 and 3, a little nearer 2, about 2.5. Then put the minus back: $\sqrt[3]{-15} \approx -2.5$ (it is $-2.47\dots$).'
  decimals-think:
    label: 'Think about it'
    reveal:
      prompt: 'Square-rooting 25 makes it **smaller** (5). But $\sqrt{0.25} = 0.5$ — **bigger** than 0.25. How can a square root make a number bigger?'
      answer: 'For a number between 0 and 1, squaring makes it smaller: $0.5^2 = 0.25$. Square-rooting undoes that, so it makes the number bigger again. Numbers above 1 behave the other way round.'
keyRules:
  - title: 'Trap it between two squares'
    body: 'If $25 < 28 < 36$ then $5 < \sqrt{28} < 6$.'
  - title: 'Judge, then check by squaring'
    body: 'Use the distances to make a first guess, then square it to see which way it misses.'
  - title: 'Two square roots'
    formula: '(-7)^2 = 49 \;\Rightarrow\; \pm\sqrt{49} = \pm 7'
    body: 'Every positive number has a positive and a negative square root. $\sqrt{\ }$ on its own means the positive one.'
  - title: 'Cube roots'
    body: 'Use $1, 8, 27, 64, 125, 216, 343, 512, 729, 1000$. A cube root of a negative number is negative: $\sqrt[3]{-125} = -5$.'
workedExamples:
  - title: 'Estimating a square root'
    problem: 'Estimate $\pm\sqrt{78}$ to 1 decimal place.'
    steps:
      - explain: 'Find the squares either side.'
        maths: '64 < 78 < 81 \;\Rightarrow\; 8 < \sqrt{78} < 9'
      - explain: 'It is much closer to 81, so try 8.8 and check.'
        maths: '8.8^2 = 77.44, \qquad 8.9^2 = 79.21'
      - explain: 'Do not forget the negative root.'
        maths: '\pm\sqrt{78} \approx \pm 8.8'
    answer: '$\pm 8.8$'
  - title: 'Estimating a cube root'
    problem: 'Estimate $\sqrt[3]{200}$ to 1 decimal place.'
    steps:
      - explain: 'Find the cubes either side.'
        maths: '5^3 = 125, \quad 6^3 = 216'
      - explain: '200 is only 16 below 216, so try 5.8.'
        maths: '5.8^3 = 195.1, \quad 5.9^3 = 205.4'
    answer: '$\sqrt[3]{200} \approx 5.8$'
practice: integers-02
---

[[activity: challenge]]

Did you square both sides? That is the whole secret. You probably can't picture $\sqrt{50}$,
but you *can* work out $7.1 \times 7.1$ — and comparing squares tells you which root is bigger.

A calculator gives $\sqrt{28}$ to ten decimal places. The point of estimating isn't to
replace it: it's to know, in a couple of seconds, whether the calculator's answer is
*reasonable*. That is exactly the check an engineer does before cutting a piece of steel.

## You need these at your fingertips

| $n$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $n^2$ | 1 | 4 | 9 | 16 | 25 | 36 | 49 | 64 | 81 | 100 |
| $n^3$ | 1 | 8 | 27 | 64 | 125 | 216 | 343 | 512 | 729 | 1000 |

…and the squares carry on: $121,\ 144,\ 169,\ 196,\ 225$.

## Trap, judge, check

**Trap** the root between two whole numbers using the squares either side. **Judge**
roughly where it sits. **Check** by squaring your guess.

[[activity: trap]]

[[activity: trap-answer]]

[[activity: your-turn]]

The judging step is only rough, because square numbers spread out as they get bigger —
from 25 to 36 is a gap of 11, from 64 to 81 is 17. So never skip the check.

[[activity: spot-mistake]]

## Cube roots, including negative ones

Exactly the same method, with cube numbers instead of squares. Negative numbers are no
problem for cube roots: $(-3)^3 = -27$, so $\sqrt[3]{-27} = -3$. Estimate as if it were
positive, then put the minus sign back.

[[activity: cube-check]]

## Roots of decimals

Learn a few easy ones — $\sqrt{0.09} = 0.3$, $\sqrt{0.25} = 0.5$, $\sqrt{0.49} = 0.7$ — and
trapping works for decimals too. $\sqrt{0.03}$ is between $\sqrt{0.01} = 0.1$ and
$\sqrt{0.04} = 0.2$; checking $0.17^2 = 0.0289$ gives $\sqrt{0.03} \approx 0.17$.

[[activity: decimals-think]]
