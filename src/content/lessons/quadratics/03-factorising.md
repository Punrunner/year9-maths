---
title: Factorising Quadratic Expressions
topic: quadratics
order: 3
minutes: 30
difficulty: challenge
summary: 'Reversing expansion: finding two numbers that multiply to the constant and add to the $x$ coefficient.'
objectives:
  - 'Factorise $x^2 + bx + c$ into two brackets'
  - 'Handle negative constants and coefficients'
  - 'Factorise the difference of two squares'
  - 'Check a factorisation by expanding'
keyRules:
  - title: 'Product and sum'
    formula: 'x^2 + bx + c = (x + p)(x + q) \quad \text{where } p \times q = c,\ p + q = b'
    body: 'For $x^2 + 7x + 12$: which factor pair of 12 adds to 7? $3 \times 4 = 12$ and $3 + 4 = 7$, so $(x + 3)(x + 4)$.'
  - title: 'Signs'
    body: '$c$ positive, $b$ positive → both numbers positive. $c$ positive, $b$ negative → both negative. $c$ negative → one of each, the bigger one taking the sign of $b$.'
  - title: 'Difference of two squares'
    formula: 'x^2 - k^2 = (x + k)(x - k)'
    body: '$x^2 - 49 = (x + 7)(x - 7)$ and $81 - 4x^2 = (9 + 2x)(9 - 2x)$.'
workedExamples:
  - title: 'All positive'
    problem: 'Factorise $x^2 + 10x + 24$.'
    steps:
      - explain: 'List factor pairs of 24 and their sums.'
        maths: '24 \times 1 \to 25, \quad 12 \times 2 \to 14, \quad 8 \times 3 \to 11, \quad 6 \times 4 \to 10'
      - explain: '6 and 4 add to 10.'
        maths: '(x + 6)(x + 4)'
    answer: '$(x + 6)(x + 4)$'
  - title: 'A negative constant'
    problem: 'Factorise $x^2 - 3x - 18$.'
    steps:
      - explain: 'The product is $-18$, so one number is negative. The sum is $-3$, so the negative one is bigger.'
      - explain: 'Try the pairs.'
        maths: '9 \times -2 \to 7, \quad 6 \times -3 \to 3, \quad 3 \times -6 \to -3 \;\checkmark'
    answer: '$(x + 3)(x - 6)$'
  - title: 'Two squares'
    problem: 'Factorise $81 - 4x^2$.'
    steps:
      - explain: 'Both terms are squares: $81 = 9^2$ and $4x^2 = (2x)^2$.'
        maths: '(9 + 2x)(9 - 2x)'
    answer: '$(9 + 2x)(9 - 2x)$'
practice: quadratics-03
---

## Why this matters

Factorising is how you solve most quadratic equations by hand — in the next lesson a factorised
quadratic will give you its roots in one step.

## Always check

Expand your answer: $(x + 3)(x - 6) = x^2 - 6x + 3x - 18 = x^2 - 3x - 18$ ✓. It takes ten seconds
and catches most sign errors.

## When there is no $x$ term

$x^2 + 0x - 49$ has $b = 0$, so the two numbers are equal and opposite: $7$ and $-7$. That is the
difference of two squares.
