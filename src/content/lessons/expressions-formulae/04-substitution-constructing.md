---
title: Substitution and Constructing Expressions
topic: expressions-formulae
order: 4
minutes: 25
difficulty: core
summary: 'Putting numbers — including negatives and decimals — into formulae, and building expressions for areas and number puzzles.'
objectives:
  - 'Substitute positive, negative and decimal values into an expression'
  - 'Follow the order of operations, especially with powers of negative numbers'
  - 'Write and simplify an expression for the area of a compound shape'
  - 'Use substitution to check that an expression is correct'
keyRules:
  - title: 'Put the multiplication signs back'
    body: 'When you replace letters with numbers, the hidden $\times$ signs come back: if $x = 10$ and $y = 6$, then $2x + 3y = 2 \times 10 + 3 \times 6 = 38$.'
  - title: 'Brackets round negatives'
    formula: 'p = -3: \quad 5p^2 = 5 \times (-3)^2 = 5 \times 9 = 45'
    body: 'Always write a negative value inside brackets. The power is worked out **before** the multiplication, and $(-3)^2 = +9$.'
  - title: 'Build expressions from the picture'
    body: 'Area of a rectangle $=$ length $\times$ width. For a compound shape, either add the parts or take the big rectangle and subtract the missing piece.'
  - title: 'Check by substituting'
    body: 'To test whether two expressions are equal, put the same number into both. If they give different answers, they are **not** equivalent.'
workedExamples:
  - title: 'Substituting a negative and a decimal'
    problem: 'Using $A = 100t - 5p^2$, find $A$ when $p = -3$ and $t = 0.5$.'
    steps:
      - explain: 'Replace each letter with its value, using brackets for the negative.'
        maths: 'A = 100(0.5) - 5(-3)^2'
      - explain: 'BIDMAS: indices first. $(-3)^2 = -3 \times -3 = 9$.'
        maths: 'A = 100 \times 0.5 - 5 \times 9'
      - explain: 'Then multiplication, then subtraction.'
        maths: 'A = 50 - 45 = 5'
    answer: '$A = 5$'
  - title: 'Area of a compound shape'
    problem: 'An L-shape is a big rectangle $(x + 6)$ by $(x + 2)$ with a small rectangle $(x + 3)$ by $x$ cut out of one corner. Find an expression for its area.'
    steps:
      - explain: 'Area of the big outer rectangle.'
        maths: '(x + 2)(x + 6) = x^2 + 8x + 12'
      - explain: 'Area of the missing rectangle.'
        maths: 'x(x + 3) = x^2 + 3x'
      - explain: 'Subtract. Put brackets round the part you take away so both signs change.'
        maths: 'x^2 + 8x + 12 - (x^2 + 3x) = 5x + 12'
    answer: '$5x + 12$'
  - title: 'Checking an expression'
    problem: 'Amy says the area of a square with side $(x + 6)$ is $x^2 + 36$. Use $x = 5$ to show she is wrong.'
    steps:
      - explain: 'Work out the true area when $x = 5$.'
        maths: '(5 + 6)^2 = 11^2 = 121'
      - explain: 'Work out Amy''s expression when $x = 5$.'
        maths: '5^2 + 36 = 25 + 36 = 61'
      - explain: 'They are different, so her expression is wrong. The correct area is $x^2 + 12x + 36$, which gives $25 + 60 + 36 = 121$ ✓.'
    answer: 'Amy is wrong: $121 \neq 61$.'
practice: expressions-04
---

## Why this matters

A formula is only useful once you put real values into it. Physicists substitute
into $s = ut + \frac{1}{2}at^2$ to find how far something travels; engineers
substitute into $V = \pi r^2 h$ to find how much a tank holds. One slip with a negative
sign and the answer is useless.

## The two traps with negatives

| Expression | Value when $m = -4$ | Why |
| --- | --- | --- |
| $m^2$ | $(-4)^2 = 16$ | negative × negative is positive |
| $-m^2$ | $-(-4)^2 = -16$ | square first, then apply the minus |
| $3m$ | $3 \times (-4) = -12$ | |
| $m^3$ | $(-4)^3 = -64$ | an odd power keeps the sign |

> **Calculator tip.** Type $(-3)^2$ with the brackets. Without them, many calculators
> work out $-3^2 = -9$.

## Constructing an expression

Word problems become algebra one phrase at a time. *"I think of a number $n$, add 3,
then square it, then multiply by 2"* becomes

$$n \rightarrow n + 3 \rightarrow (n + 3)^2 \rightarrow 2(n + 3)^2$$

The brackets matter: without them, $2n + 3^2$ would mean something completely different.

## Compound shapes

There are usually two routes:

1. **Split** the shape into rectangles and add their areas, or
2. Take the **surrounding rectangle** and subtract the piece that is missing.

Both must give the same simplified expression — which makes a great check.

## Proof with algebra

Algebra can prove things are *always* true. For example, if $n$ is even, the next two
odd numbers are $n + 1$ and $n + 3$, and their product is

$$(n + 1)(n + 3) = n^2 + 4n + 3$$

$n^2$ and $4n$ are both even, so $n^2 + 4n$ is even and adding 3 makes it odd. So the
product of the next two odd numbers is **always** odd.
