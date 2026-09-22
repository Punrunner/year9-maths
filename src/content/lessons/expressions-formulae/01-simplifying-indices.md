---
title: Simplifying and the Laws of Indices
topic: expressions-formulae
order: 1
minutes: 25
difficulty: core
summary: 'Multiplying and dividing algebraic terms with the index laws, and collecting like terms.'
objectives:
  - 'Multiply and divide terms such as $3x^3 \times 4x^2$ and $12p^3 \div 2p^2$'
  - 'Raise a term to a power, e.g. $(2x^2)^4$'
  - 'Cancel common letters in an algebraic fraction'
  - 'Identify like terms and collect them to simplify an expression'
keyRules:
  - title: 'The index laws, with letters'
    formula: 'a^m \times a^n = a^{m+n} \qquad a^m \div a^n = a^{m-n} \qquad (a^m)^n = a^{mn}'
    body: 'Exactly the same laws as with numbers. They only combine powers of the **same** letter.'
  - title: 'Numbers and letters separately'
    body: 'Multiply (or divide) the numbers, then deal with each letter on its own. $3x^3 \times 4x^2 = (3 \times 4) \times x^{3+2} = 12x^5$.'
  - title: 'A bracket to a power hits everything inside'
    formula: '(2x^2)^4 = 2^4 \times x^{2 \times 4} = 16x^8'
    body: 'The most common slip is $(2x^2)^4 = 2x^8$ — forgetting that the 2 is also raised to the power 4.'
  - title: 'Like terms'
    body: 'Like terms have exactly the same letters raised to the same powers. $3ab$ and $5ab$ are like terms; $ab^2$ and $a^2b$ are **not**. Only like terms can be added or subtracted.'
workedExamples:
  - title: 'Multiplying and dividing terms'
    problem: 'Simplify: **a** $3x^3 \times 4x^2$ **b** $y^2 \div y^{10}$ **c** $(x^5)^3$'
    steps:
      - explain: 'Multiply the numbers, then add the powers of $x$.'
        maths: '3x^3 \times 4x^2 = 12x^{3+2} = 12x^5'
      - explain: 'Subtract the powers. A negative power means one over.'
        maths: 'y^2 \div y^{10} = y^{2-10} = y^{-8} = \frac{1}{y^8}'
      - explain: 'Power of a power: multiply.'
        maths: '(x^5)^3 = x^{5 \times 3} = x^{15}'
    answer: '**a** $12x^5$ **b** $y^{-8}$ or $\frac{1}{y^8}$ **c** $x^{15}$'
  - title: 'Cancelling an algebraic fraction'
    problem: 'Simplify $\dfrac{3x^3y^2z^2}{x^2y^3z}$.'
    steps:
      - explain: 'Deal with each letter separately, subtracting the power on the bottom from the power on top.'
        maths: 'x^{3-2} = x, \quad y^{2-3} = y^{-1}, \quad z^{2-1} = z'
      - explain: 'The $y^{-1}$ belongs on the bottom of the fraction.'
        maths: '3 \times x \times \frac{1}{y} \times z = \frac{3xz}{y}'
    answer: '$\dfrac{3xz}{y}$'
  - title: 'Collecting like terms'
    problem: 'Simplify **a** $xy + 2ab - 5xy + 10ab$ **b** $2n^2 + m^2 - n^2 + 2m^2$'
    steps:
      - explain: 'Group the like terms together, keeping each term''s sign.'
        maths: '(xy - 5xy) + (2ab + 10ab)'
      - explain: 'Combine each group.'
        maths: '= -4xy + 12ab'
      - explain: 'For part b, the $n^2$ terms and the $m^2$ terms are separate groups.'
        maths: '(2n^2 - n^2) + (m^2 + 2m^2) = n^2 + 3m^2'
    answer: '**a** $12ab - 4xy$ **b** $n^2 + 3m^2$'
practice: expressions-01
---

## Why this matters

Almost every algebra question you will meet — solving equations, rearranging
formulae, working with quadratics — starts by tidying up an expression. The faster and
more accurately you can simplify, the less room there is for mistakes later.

## Multiplication signs go missing

In algebra we leave out the $\times$ signs:

$$12 \times x = 12x \qquad 3 \times p \times q = 3pq \qquad 2 \times 5m \times 10n = 100mn$$

Numbers are written first, then letters, usually in alphabetical order. When you are
cancelling, it can help to write the long form back in:

$$\frac{3x^3y^2z^2}{x^2y^3z} = \frac{3 \times x \times x \times x \times y \times y \times z \times z}{x \times x \times y \times y \times y \times z}$$

and then cross out matching letters top and bottom.

## Why the index laws work

$$a^5 \times a^3 = (a \times a \times a \times a \times a) \times (a \times a \times a) = a^8$$

Count the $a$s: $5 + 3 = 8$. Dividing cancels them instead:

$$\frac{a^5}{a^3} = \frac{a \times a \times \cancel{a} \times \cancel{a} \times \cancel{a}}{\cancel{a} \times \cancel{a} \times \cancel{a}} = a^2$$

## Like terms

An expression is a collection of **terms** separated by $+$ and $-$ signs. You can only
add or subtract **like terms** — terms with the same letters to the same powers.

| Like terms | Not like terms |
| --- | --- |
| $2a$ and $5a$ | $2a$ and $2a^2$ |
| $ab^2$ and $10ab^2$ | $ab^2$ and $a^2b$ |
| $xy^3$ and $6xy^3$ | $xy$ and $xz$ |

> **Order does not matter in multiplication.** $ab$ and $ba$ are the same term, so
> $3ab + 2ba = 5ab$. But $a^2b$ and $ab^2$ are genuinely different.

## Watch the signs

The sign in front of a term belongs to that term. In $3a + 4b - 2a + 5b$ the $-$ is
attached to the $2a$, so the $a$ terms give $3a - 2a = a$ and the answer is $a + 9b$.
