---
title: Algebraic Fractions
topic: expressions-formulae
order: 2
minutes: 25
difficulty: core
summary: 'Adding and subtracting fractions with letters in them, and simplifying by factorising and cancelling.'
objectives:
  - 'Add and subtract algebraic fractions using a common denominator'
  - 'Write a whole-number or letter term as a fraction to combine it with another'
  - 'Simplify an algebraic fraction by factorising the numerator and cancelling'
  - 'Avoid the most common cancelling mistake'
keyRules:
  - title: 'Same denominator — add the tops'
    formula: '\frac{w}{6} + \frac{p}{6} = \frac{w + p}{6}'
    body: 'Exactly as with number fractions. Subtracting works the same way: $\frac{3}{t} - \frac{m}{t} = \frac{3 - m}{t}$.'
  - title: 'Different denominators — make them the same first'
    formula: '\frac{2}{b} + \frac{b}{7} = \frac{14}{7b} + \frac{b^2}{7b} = \frac{14 + b^2}{7b}'
    body: 'Find a common denominator (often the two denominators multiplied), then use equivalent fractions.'
  - title: 'A whole term is a fraction too'
    body: '$x = \frac{5x}{5}$ and $3 = \frac{3x}{x}$. Write it with the denominator you need, then add.'
  - title: 'Cancel factors, never terms'
    formula: '\frac{35x + 10}{15} = \frac{5(7x + 2)}{15} = \frac{7x + 2}{3}'
    body: 'Factorise the top first. You may only cancel something that **multiplies** the whole numerator. $\frac{10x + 5}{5}$ is **not** $10x$.'
workedExamples:
  - title: 'Adding with letter denominators'
    problem: 'Simplify **a** $\dfrac{2}{b} + \dfrac{b}{7}$ **b** $\dfrac{x}{5} + \dfrac{4}{y}$'
    steps:
      - explain: 'The common denominator for $b$ and $7$ is $7b$. Multiply top and bottom of each fraction to get it.'
        maths: '\frac{2}{b} = \frac{14}{7b}, \qquad \frac{b}{7} = \frac{b^2}{7b}'
      - explain: 'Now the denominators match, add the numerators.'
        maths: '\frac{14 + b^2}{7b}'
      - explain: 'Part b works the same way with a common denominator of $5y$.'
        maths: '\frac{xy}{5y} + \frac{20}{5y} = \frac{xy + 20}{5y}'
    answer: '**a** $\frac{14 + b^2}{7b}$ **b** $\frac{xy + 20}{5y}$'
  - title: 'Adding two fractions with brackets'
    problem: 'Simplify $\dfrac{x + 3}{4} + \dfrac{x - 1}{5}$.'
    steps:
      - explain: 'Common denominator 20. Multiply the first fraction by 5 and the second by 4, top and bottom. Keep the brackets.'
        maths: '\frac{5(x + 3)}{20} + \frac{4(x - 1)}{20}'
      - explain: 'Expand the brackets on top.'
        maths: '\frac{5x + 15 + 4x - 4}{20}'
      - explain: 'Collect like terms.'
        maths: '\frac{9x + 11}{20}'
    answer: '$\dfrac{9x + 11}{20}$'
  - title: 'Simplifying by factorising'
    problem: 'Simplify $\dfrac{24x^2 + 20x}{64x}$.'
    steps:
      - explain: 'Find the highest common factor of the two terms on top: it is $4x$.'
        maths: '24x^2 + 20x = 4x(6x + 5)'
      - explain: 'Write the fraction with the factorised top.'
        maths: '\frac{4x(6x + 5)}{64x}'
      - explain: '$4x$ multiplies the whole numerator, so it can cancel with the $64x$ below: $\frac{4x}{64x} = \frac{1}{16}$.'
        maths: '\frac{6x + 5}{16}'
    answer: '$\dfrac{6x + 5}{16}$'
practice: expressions-02
---

## Why this matters

Formulae in science are full of fractions with letters in them — speed is
$\frac{d}{t}$, density is $\frac{m}{V}$. As soon as you combine two of them, for example
the total time for a journey done in two parts, you need to add algebraic fractions.

## It is the same as number fractions

Everything you already know about fractions still applies. Compare:

| Numbers | Letters |
| --- | --- |
| $\frac{2}{7} + \frac{3}{7} = \frac{5}{7}$ | $\frac{w}{6} + \frac{p}{6} = \frac{w + p}{6}$ |
| $\frac{1}{3} + \frac{2}{7} = \frac{7}{21} + \frac{6}{21} = \frac{13}{21}$ | $\frac{a}{5} + \frac{a}{3} = \frac{3a}{15} + \frac{5a}{15} = \frac{8a}{15}$ |

If you are ever unsure about the algebra, try the same question with numbers first.

## A real problem

Avril cycles 10 km at $x$ km/h, then 14 km at $y$ km/h. Time is distance ÷ speed, so the
total time is

$$\frac{10}{x} + \frac{14}{y} = \frac{10y}{xy} + \frac{14x}{xy} = \frac{10y + 14x}{xy} \text{ hours.}$$

## The cancelling trap

When you simplify $\frac{10x + 5}{5}$, think of it as $\frac{1}{5}(10x + 5)$. Every term in the
bracket is divided by 5:

$$\frac{10x + 5}{5} = 2x + 1$$

A very common **wrong** answer is to cross out the two 5s and write $10x$. That is only
allowed when the 5 multiplies the **whole** numerator — which is exactly why you
factorise first.

> **Check it with a number.** Put $x = 1$: $\frac{10 + 5}{5} = 3$. Then $2x + 1 = 3$ ✓ but
> $10x = 10$ ✗.

## Negative signs and subtraction

When you subtract a fraction with a bracket on top, the minus sign applies to
**everything** in that bracket:

$$\frac{x - 2}{5} - \frac{2x - 1}{7} = \frac{7(x - 2) - 5(2x - 1)}{35} = \frac{7x - 14 - 10x + 5}{35} = \frac{-3x - 9}{35}$$

Notice that $-5 \times -1 = +5$.
