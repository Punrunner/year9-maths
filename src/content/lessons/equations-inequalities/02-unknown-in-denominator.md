---
title: The Unknown in the Denominator
topic: equations-inequalities
order: 2
minutes: 20
difficulty: core
summary: 'Solving equations such as $\frac{20}{x} = 4$ and $3 = \frac{15}{x + 2}$ by multiplying both sides by the denominator.'
objectives:
  - 'Solve an equation with the unknown in the denominator'
  - 'Use brackets when the denominator is an expression'
  - 'Solve equations with a fraction on both sides'
  - 'Construct and solve equations like this from a problem'
keyRules:
  - title: 'Multiply by the denominator first'
    formula: '\frac{20}{x} = 4 \;\Rightarrow\; 20 = 4x \;\Rightarrow\; x = 5'
    body: 'Multiplying both sides by the denominator lifts the unknown out of the bottom of the fraction. What is left is an ordinary linear equation.'
  - title: 'Keep the brackets'
    formula: '3 = \frac{15}{x + 2} \;\Rightarrow\; 3(x + 2) = 15'
    body: 'When the denominator is an expression like $x + 2$, it must stay in brackets. Writing $3 \times x + 2$ is the most common mistake here.'
  - title: 'Fraction on both sides'
    body: 'Multiply by **both** denominators, one at a time: $\frac{18}{x - 3} = \frac{2}{5}$ becomes $18 \times 5 = 2(x - 3)$.'
workedExamples:
  - title: 'An expression in the denominator'
    problem: 'Solve $3 = \dfrac{15}{x + 2}$.'
    steps:
      - explain: 'Multiply both sides by $(x + 2)$, keeping the bracket.'
        maths: '3(x + 2) = 15'
      - explain: 'Divide both sides by 3.'
        maths: 'x + 2 = 5'
      - explain: 'Subtract 2.'
        maths: 'x = 3'
    answer: '$x = 3$'
  - title: 'A problem'
    problem: 'A class has $x$ students. One day 3 are absent, and the others share 120 pencils equally, getting 4 each. How many students are in the class?'
    steps:
      - explain: '$x - 3$ students share 120 pencils, 4 each.'
        maths: '\frac{120}{x - 3} = 4'
      - explain: 'Multiply by $(x - 3)$.'
        maths: '120 = 4(x - 3)'
      - explain: 'Divide by 4, then add 3.'
        maths: '30 = x - 3 \;\Rightarrow\; x = 33'
    answer: '33 students'
  - title: 'Fractions on both sides'
    problem: 'Solve $\dfrac{18}{x - 3} = \dfrac{2}{5}$.'
    steps:
      - explain: 'Multiply both sides by $(x - 3)$ and by 5.'
        maths: '18 \times 5 = 2(x - 3)'
      - explain: 'Simplify and divide by 2.'
        maths: '90 = 2(x - 3) \;\Rightarrow\; 45 = x - 3'
      - explain: 'Add 3.'
        maths: 'x = 48'
    answer: '$x = 48$'
practice: equations-02
---

## Why this matters

Sharing problems — *a bill split between a group*, *a journey at an unknown speed* — lead to
equations where the unknown ends up on the bottom of a fraction. One extra step turns them
back into the equations you already know how to solve.

## Enri's mistake

Enri tried to solve $2 = \frac{22}{x + 4}$ like this:

$$2 \times x + 4 = 22 \;\Rightarrow\; 2x = 18 \;\Rightarrow\; x = 9$$

He left out the brackets. The whole of $x + 4$ must be multiplied by 2:

$$2(x + 4) = 22 \;\Rightarrow\; x + 4 = 11 \;\Rightarrow\; x = 7$$

Check: $\frac{22}{7 + 4} = \frac{22}{11} = 2$ ✓

## A harder one

$$\frac{3x - 2}{x - 2} = 2 \;\Rightarrow\; 3x - 2 = 2(x - 2) = 2x - 4 \;\Rightarrow\; x = -2$$

> **Check it.** Always substitute back in. As well as catching slips, it guards against an
> answer that would make the denominator zero — which is never allowed.
