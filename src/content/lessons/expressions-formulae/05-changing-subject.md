---
title: Changing the Subject of a Formula
topic: expressions-formulae
order: 5
minutes: 30
difficulty: core
summary: 'Rearranging formulae with function machines and the balance method, including when the letter is negative or in a denominator.'
objectives:
  - 'Use a function machine and its reverse to rearrange a formula'
  - 'Rearrange a formula by doing the same thing to both sides'
  - 'Make a letter the subject when it appears negative or in a denominator'
  - 'Use a rearranged formula to find an unknown value'
keyRules:
  - title: 'The subject is the letter on its own'
    body: 'In $A = \pi r^2$, $A$ is the subject. Rearranging to $r = \sqrt{\frac{A}{\pi}}$ makes $r$ the subject. It does not matter which side it is on, as long as it is on its own.'
  - title: 'Undo in reverse order'
    body: 'Build the formula as a function machine starting from the letter you want. Then run the machine backwards, using the **inverse** of each operation in reverse order.'
  - title: 'Inverse operations'
    body: '$+$ undoes $-$, $\times$ undoes $\div$, and $\sqrt{\ }$ undoes squaring. Whatever you do to one side, do to the other.'
  - title: 'Make it positive, bring it up'
    body: 'If the letter you want is negative, add it to both sides first. If it is in a denominator, multiply both sides by it first. Keep brackets round anything you divide by.'
workedExamples:
  - title: 'Using the balance method'
    problem: 'Rearrange $m = \dfrac{6t - 1}{5}$ to make $t$ the subject.'
    steps:
      - explain: 'Multiply both sides by 5 to clear the fraction.'
        maths: '5m = 6t - 1'
      - explain: 'Add 1 to both sides.'
        maths: '5m + 1 = 6t'
      - explain: 'Divide both sides by 6.'
        maths: 't = \frac{5m + 1}{6}'
    answer: '$t = \dfrac{5m + 1}{6}$'
  - title: 'When the letter is negative'
    problem: 'Make $x$ the subject of $M = 4(t - x)$.'
    steps:
      - explain: 'Divide both sides by 4.'
        maths: '\frac{M}{4} = t - x'
      - explain: 'The $x$ is negative, so add $x$ to both sides to make it positive.'
        maths: '\frac{M}{4} + x = t'
      - explain: 'Subtract $\frac{M}{4}$ from both sides.'
        maths: 'x = t - \frac{M}{4}'
    answer: '$x = t - \dfrac{M}{4}$'
  - title: 'When the letter is in the denominator'
    problem: 'Make $x$ the subject of $g = \dfrac{f}{x} + y$.'
    steps:
      - explain: 'Subtract $y$ from both sides.'
        maths: 'g - y = \frac{f}{x}'
      - explain: 'Multiply both sides by $x$ so it is no longer in the denominator. Keep the brackets.'
        maths: 'x(g - y) = f'
      - explain: 'Divide both sides by $(g - y)$.'
        maths: 'x = \frac{f}{g - y}'
    answer: '$x = \dfrac{f}{g - y}$'
  - title: 'A function machine with a square root'
    problem: 'The area of a circle is $A = \pi r^2$. Rearrange to make $r$ the subject, then find $r$ when $A = 50\ \text{cm}^2$.'
    steps:
      - explain: 'Forwards, starting from $r$: square, then multiply by $\pi$.'
        maths: 'r \xrightarrow{\ \text{square}\ } r^2 \xrightarrow{\ \times \pi\ } \pi r^2'
      - explain: 'Backwards, starting from $A$: divide by $\pi$, then square root.'
        maths: 'A \xrightarrow{\ \div \pi\ } \frac{A}{\pi} \xrightarrow{\ \sqrt{\ }\ } \sqrt{\frac{A}{\pi}}'
      - explain: 'Substitute $A = 50$.'
        maths: 'r = \sqrt{\frac{50}{\pi}} = \sqrt{15.915\dots} = 3.99\ \text{cm}'
    answer: '$r = \sqrt{\dfrac{A}{\pi}}$, and $r \approx 3.99$ cm'
practice: expressions-05
---

## Why this matters

A formula is usually written to find one particular thing. $A = \pi r^2$ gives the area
from the radius — but a gardener who wants a circular lawn of 50 m² needs the radius
from the area. Rearranging lets one formula answer every question about the same
relationship.

## Method 1: function machines

Draw the machine that builds the formula, starting from the letter you want as the
subject. For $V = \frac{1}{3}\pi r^2 h$ starting from $r$:

$$r \rightarrow \boxed{\text{square}} \rightarrow \boxed{\times \pi h} \rightarrow \boxed{\div 3} \rightarrow V$$

Run it in reverse with inverse operations:

$$V \rightarrow \boxed{\times 3} \rightarrow \boxed{\div \pi h} \rightarrow \boxed{\sqrt{\ }} \rightarrow r \qquad \text{so} \qquad r = \sqrt{\frac{3V}{\pi h}}$$

Function machines are quick, but they only work when the letter appears **once**.

## Method 2: the balance method

A formula is like an equation — it stays balanced if you do the same thing to both
sides. This method always works, and it is the one to use when things get awkward.

| To remove … | do this to both sides |
| --- | --- |
| $+ 5$ | $- 5$ |
| $\times 3$ | $\div 3$ |
| $\div x$ (letter in the denominator) | $\times x$ |
| a square | $\sqrt{\ }$ |
| a square root | square |

## Two things that catch people out

**The letter is negative.** In $M = 4(t - x)$ you want $+x$, not $-x$. Add $x$ to both sides
early, and the rest is straightforward.

**Dividing by an expression.** When you divide by $(g - y)$, keep it in brackets while
you work. Once it sits under a long fraction line, the line acts as a bracket and you can
drop them: $x = \frac{f}{g - y}$.

> **Fractions in front.** To remove $\frac{2}{5}$ in $P + e = \frac{2}{5}x$, multiply
> both sides by $\frac{5}{2}$: $x = \frac{5(P + e)}{2}$.
