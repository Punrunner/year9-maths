---
title: The Product of Two Linear Expressions
topic: expressions-formulae
order: 3
minutes: 25
difficulty: core
summary: 'Expanding $(x + a)(x + b)$ with an area model and the distributive law, including perfect squares and the difference of two squares.'
objectives:
  - 'Expand two brackets using an area diagram or the distributive law'
  - 'Handle negative numbers inside the brackets'
  - 'Recognise and expand a perfect square $(x + a)^2$'
  - 'Recognise the difference of two squares $(x + a)(x - a)$'
keyRules:
  - title: 'Every term times every term'
    formula: '(x + 3)(x + 2) = x^2 + 2x + 3x + 6 = x^2 + 5x + 6'
    body: 'Each term in the first bracket multiplies each term in the second — four multiplications in total. Then collect the two $x$ terms.'
  - title: 'The general pattern'
    formula: '(x + a)(x + b) = x^2 + (a + b)x + ab'
    body: 'The $x$ coefficient is the **sum** of the two numbers; the constant is their **product**. This is the key to factorising quadratics later.'
  - title: 'Perfect squares'
    formula: '(x + a)^2 = x^2 + 2ax + a^2'
    body: 'Squaring a bracket means multiplying it by itself. $(x + 3)^2$ is **not** $x^2 + 9$ — you lose the middle term.'
  - title: 'Difference of two squares'
    formula: '(x + a)(x - a) = x^2 - a^2'
    body: 'The two middle terms, $+ax$ and $-ax$, cancel out, leaving no $x$ term at all.'
visual:
  widget: area-model
  title: 'Area model for two brackets'
  caption: 'The big rectangle is $(x + a)$ wide and $(x + b)$ tall. Its area is the four smaller pieces added together. Move the sliders and watch the middle term always come out as $(a + b)x$.'
  config:
    min: 1
    max: 8
workedExamples:
  - title: 'Using the distributive law'
    problem: 'Expand and simplify $(x + 7)(x - 2)$.'
    steps:
      - explain: 'Multiply the second bracket by each term of the first.'
        maths: 'x(x - 2) + 7(x - 2)'
      - explain: 'Expand both. Take care: $7 \times -2 = -14$.'
        maths: 'x^2 - 2x + 7x - 14'
      - explain: 'Collect the $x$ terms.'
        maths: 'x^2 + 5x - 14'
    answer: '$x^2 + 5x - 14$'
  - title: 'Two negatives'
    problem: 'Expand and simplify $(x - 7)(x - 3)$.'
    steps:
      - explain: 'The four products are $x \times x$, $x \times -3$, $-7 \times x$ and $-7 \times -3$.'
        maths: 'x^2 - 3x - 7x + 21'
      - explain: 'A negative times a negative is positive, so the constant is $+21$. Collect the $x$ terms.'
        maths: 'x^2 - 10x + 21'
    answer: '$x^2 - 10x + 21$'
  - title: 'A perfect square'
    problem: 'Fatima says $(x + 3)^2 = x^2 + 9$. Aisha says $(x + 3)^2 = x^2 + 6x + 9$. Who is right?'
    steps:
      - explain: 'Write the square as a product of two brackets.'
        maths: '(x + 3)^2 = (x + 3)(x + 3)'
      - explain: 'Expand every term by every term.'
        maths: 'x^2 + 3x + 3x + 9'
      - explain: 'Collect the $x$ terms.'
        maths: 'x^2 + 6x + 9'
      - explain: 'Check with a number. Put $x = 1$: $(1 + 3)^2 = 16$. Fatima gives $1 + 9 = 10$ ✗; Aisha gives $1 + 6 + 9 = 16$ ✓.'
    answer: 'Aisha is right: $(x + 3)^2 = x^2 + 6x + 9$.'
practice: expressions-03
---

## Why this matters

Multiplying two brackets together produces a **quadratic** expression — one whose
highest power of $x$ is 2. Quadratics describe the path of a thrown ball, the area of a
field you are fencing and the profit of a business. Being able to expand brackets
reliably is the first step to working with all of them.

## Seeing it as an area

A rectangle that is $(x + 2)$ wide and $(x + 3)$ tall can be split into four pieces:

| | $x$ | $+2$ |
| --- | --- | --- |
| $x$ | $x^2$ | $2x$ |
| $+3$ | $3x$ | $6$ |

The total area is $x^2 + 2x + 3x + 6 = x^2 + 5x + 6$. This grid method works just as well
when the numbers are negative — you simply write $-2$ instead of $+2$ in the header.

## The distributive law

Without a diagram, split the first bracket up:

$$(x + 3)(x + 2) = x(x + 2) + 3(x + 2) = x^2 + 2x + 3x + 6 = x^2 + 5x + 6$$

A useful memory aid is that the four products are the **F**irsts, **O**uters,
**I**nners and **L**asts.

## Two special patterns

**Perfect squares.** $(x + 4)^2 = (x + 4)(x + 4) = x^2 + 8x + 16$. The middle term is
always *double* the number times $x$:

$$(x + a)^2 = x^2 + 2ax + a^2 \qquad (x - a)^2 = x^2 - 2ax + a^2$$

**Difference of two squares.** $(x + 4)(x - 4) = x^2 - 4x + 4x - 16 = x^2 - 16$.
The middle terms cancel:

$$(x + a)(x - a) = x^2 - a^2$$

> **Mental maths trick.** $49 \times 51 = (50 - 1)(50 + 1) = 50^2 - 1^2 = 2499$.
> The difference of two squares turns a tricky product into an easy one.

## Always check with a number

After expanding, substitute a simple value such as $x = 2$ into both the brackets and your
answer. If they do not give the same number, something has gone wrong.
