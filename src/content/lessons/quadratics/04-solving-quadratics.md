---
title: Solving Quadratic Equations
topic: quadratics
order: 4
minutes: 30
difficulty: challenge
summary: 'Solving by factorising, forming quadratics from word problems, and trial and improvement when factorising will not work.'
objectives:
  - 'Solve a quadratic equation by rearranging to $= 0$ and factorising'
  - 'Form a quadratic equation from a problem and interpret both solutions'
  - 'Use trial and improvement to find a solution to 1 or 2 decimal places'
keyRules:
  - title: 'Zero product'
    formula: '(x - 3)(x + 8) = 0 \;\Rightarrow\; x = 3 \text{ or } x = -8'
    body: 'If two numbers multiply to 0, at least one of them must be 0. So set each bracket equal to 0.'
  - title: 'Rearrange to = 0 first'
    body: '$x^2 + 5x = 24$ must become $x^2 + 5x - 24 = 0$ before you factorise.'
  - title: 'Interpret'
    body: 'A length or a number of people cannot be negative. Say which solution makes sense, and why.'
  - title: 'Trial and improvement'
    body: 'Try values, record whether the result is too big or too small, and narrow in. To be sure of 1 d.p., test the halfway value (e.g. 3.55) between your two best guesses.'
workedExamples:
  - title: 'A rectangle problem'
    problem: 'A rectangle is 5 cm longer than it is wide. Its area is 24 cm². Find its dimensions.'
    steps:
      - explain: 'Let the width be $w$, so the length is $w + 5$.'
        maths: 'w(w + 5) = 24 \;\Rightarrow\; w^2 + 5w - 24 = 0'
      - explain: 'Factorise.'
        maths: '(w - 3)(w + 8) = 0'
      - explain: 'Solve and interpret.'
        maths: 'w = 3 \text{ or } w = -8'
    answer: 'A width cannot be negative, so the rectangle is 3 cm by 8 cm.'
  - title: 'Consecutive numbers'
    problem: 'Find two consecutive numbers whose squares add up to 85.'
    steps:
      - explain: 'Let them be $x$ and $x + 1$.'
        maths: 'x^2 + (x + 1)^2 = 85 \;\Rightarrow\; 2x^2 + 2x - 84 = 0 \;\Rightarrow\; x^2 + x - 42 = 0'
      - explain: 'Factorise and solve.'
        maths: '(x + 7)(x - 6) = 0 \;\Rightarrow\; x = 6 \text{ or } -7'
    answer: '6 and 7, or $-7$ and $-6$ — both pairs work.'
  - title: 'Trial and improvement'
    problem: '$x^2 + 2x = 20$ has a solution between 3 and 4. Find it to 1 d.p.'
    steps:
      - explain: 'Try 3.5: $12.25 + 7 = 19.25$ (too small). Try 3.6: $12.96 + 7.2 = 20.16$ (too big).'
      - explain: 'The answer is between 3.5 and 3.6. Test the middle, 3.55: $12.6025 + 7.1 = 19.7025$ (too small).'
      - explain: 'So the solution is between 3.55 and 3.6, which rounds to 3.6.'
    answer: '$x \approx 3.6$'
practice: quadratics-04
---

## Why this matters

Area problems, projectile paths and many geometry puzzles lead to quadratic equations. Unlike a
linear equation, a quadratic usually has **two** answers — and deciding which one fits the real
situation is part of the problem.

## The five steps for word problems

1. Read the problem carefully.
2. Define the unknown(s) with a letter.
3. Form an equation.
4. Solve it.
5. Interpret the solutions — do they make sense?

> **Do not divide by $x$.** In $x^2 = 5x$, dividing by $x$ loses the solution $x = 0$. Rearrange to
> $x^2 - 5x = 0$, factorise to $x(x - 5) = 0$, and get **both** $x = 0$ and $x = 5$.
