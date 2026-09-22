---
title: Expanding Products of Brackets
topic: quadratics
order: 2
minutes: 25
difficulty: challenge
summary: 'Expanding $(ax + b)(cx + d)$, products with two letters, and the perfect-square and difference-of-two-squares patterns.'
objectives:
  - 'Expand two brackets where $x$ has a coefficient, such as $(3x - 4)(2x + 6)$'
  - 'Expand brackets containing different letters'
  - 'Use $(a + b)^2 = a^2 + 2ab + b^2$'
  - 'Use $(a + b)(a - b) = a^2 - b^2$'
keyRules:
  - title: 'Every term by every term'
    formula: '(3x - 4)(2x + 6) = 6x^2 + 18x - 8x - 24 = 6x^2 + 10x - 24'
    body: 'Four multiplications, then collect like terms. The coefficients multiply too: $3x \times 2x = 6x^2$.'
  - title: 'Different letters'
    formula: '(2a + b)(c + 3d) = 2ac + 6ad + bc + 3bd'
    body: 'With four different letters, there are usually no like terms to collect.'
  - title: 'Perfect square'
    formula: '(a + b)^2 = a^2 + 2ab + b^2'
    body: '$(2x + 3)^2 = 4x^2 + 12x + 9$. Never just $4x^2 + 9$.'
  - title: 'Difference of two squares'
    formula: '(a + b)(a - b) = a^2 - b^2'
    body: '$(3x + 5)(3x - 5) = 9x^2 - 25$. The middle terms cancel.'
visual:
  widget: area-model
  title: 'Area model'
  caption: 'Each piece of the rectangle is one of the four products. The same picture works for $(ax + b)(cx + d)$ — the pieces just have different sizes.'
workedExamples:
  - title: 'Coefficients of x'
    problem: 'Expand and simplify $(3x - 2)(4x - 3)$.'
    steps:
      - explain: 'Multiply the second bracket by each term of the first.'
        maths: '3x(4x - 3) - 2(4x - 3)'
      - explain: 'Expand. $-2 \times -3 = +6$.'
        maths: '12x^2 - 9x - 8x + 6'
      - explain: 'Collect.'
        maths: '12x^2 - 17x + 6'
    answer: '$12x^2 - 17x + 6$'
  - title: 'A perfect square'
    problem: 'Expand $(2x - 5)^2$.'
    steps:
      - explain: 'Use $(a - b)^2 = a^2 - 2ab + b^2$ with $a = 2x$ and $b = 5$.'
        maths: '(2x)^2 - 2(2x)(5) + 5^2 = 4x^2 - 20x + 25'
    answer: '$4x^2 - 20x + 25$'
practice: quadratics-02
---

## Why this matters

These products appear whenever you work out areas with unknown lengths and whenever you solve a
quadratic. Expanding reliably — and recognising the two special patterns — makes factorising in
the next lesson much easier.

## Check with a number

Put $x = 2$ into the question and your answer. For $(3x - 4)(2x + 6)$: $(2)(10) = 20$, and
$6(4) + 10(2) - 24 = 20$ ✓.

## Mental maths with the patterns

$$51^2 = (50 + 1)^2 = 2500 + 100 + 1 = 2601 \qquad 98 \times 102 = 100^2 - 2^2 = 9996$$
