---
title: Index Laws and Negative Indices
topic: integers-powers-roots
order: 3
minutes: 30
difficulty: core
summary: 'The four index laws, what a negative index really means, and using the order of operations with powers.'
objectives:
  - 'Use the multiplication, division, zero and power laws of indices'
  - 'Explain why $a^{-n} = \frac{1}{a^n}$'
  - 'Write numbers such as $\frac{1}{16}$ and $0.001$ as a power'
  - 'Simplify expressions with several index laws, working in the right order'
keyRules:
  - title: 'Multiplying — add the powers'
    formula: 'a^x \times a^y = a^{x+y}'
    body: 'Only works when the **base** is the same. $3^4 \times 3^2 = 3^6$, but $3^4 \times 2^2$ cannot be combined this way.'
  - title: 'Dividing — subtract the powers'
    formula: 'a^x \div a^y = a^{x-y}'
    body: '$5^6 \div 5^8 = 5^{-2}$. The answer can be negative — and that is fine.'
  - title: 'Power of a power — multiply'
    formula: '(a^x)^y = a^{xy}'
    body: '$(3^{10})^2 = 3^{10} \times 3^{10} = 3^{20}$.'
  - title: 'Zero and negative indices'
    formula: 'a^0 = 1 \qquad a^{-n} = \frac{1}{a^n}'
    body: 'A negative index means **one over**. It does *not* make the number negative: $2^{-3} = \frac{1}{8}$, which is positive.'
workedExamples:
  - title: 'Where a negative index comes from'
    problem: 'Work out $6^3 \div 6^5$ in two ways, and use them to explain what $6^{-2}$ means.'
    steps:
      - explain: 'Write the powers out in full and cancel.'
        maths: '\frac{6 \times 6 \times 6}{6 \times 6 \times 6 \times 6 \times 6} = \frac{1}{6 \times 6} = \frac{1}{6^2}'
      - explain: 'Now use the division law instead.'
        maths: '6^3 \div 6^5 = 6^{3-5} = 6^{-2}'
      - explain: 'Both methods must give the same answer.'
        maths: '6^{-2} = \frac{1}{6^2} = \frac{1}{36}'
    answer: '$6^{-2}$ is the reciprocal of $6^2$, which is $\frac{1}{36}$.'
  - title: 'Simplifying with a negative index'
    problem: 'Simplify $16 \times 2^{-3}$.'
    steps:
      - explain: 'Rewrite the negative power as one over.'
        maths: '2^{-3} = \frac{1}{2^3} = \frac{1}{8}'
      - explain: 'Now multiply.'
        maths: '16 \times \frac{1}{8} = 2'
    answer: '$2$'
  - title: 'Several laws in one expression'
    problem: 'Simplify $\dfrac{(3^6 \times 3^4)^2}{3^2 \times 3^3}$.'
    steps:
      - explain: 'The long dividing line acts like brackets, so simplify the top and bottom separately. Start inside the bracket on top.'
        maths: '3^6 \times 3^4 = 3^{10}'
      - explain: 'Then apply the power outside the bracket.'
        maths: '(3^{10})^2 = 3^{20}'
      - explain: 'Simplify the bottom.'
        maths: '3^2 \times 3^3 = 3^5'
      - explain: 'Finally, divide.'
        maths: '\frac{3^{20}}{3^5} = 3^{20-5} = 3^{15}'
    answer: '$3^{15}$'
  - title: 'Negative powers and a fraction answer'
    problem: 'Simplify $\dfrac{(2^3 \times 2^4)^2}{2^{16}}$.'
    steps:
      - explain: 'Top first: bracket, then power.'
        maths: '(2^3 \times 2^4)^2 = (2^7)^2 = 2^{14}'
      - explain: 'Divide by subtracting the powers.'
        maths: '\frac{2^{14}}{2^{16}} = 2^{-2}'
      - explain: 'A negative power means one over.'
        maths: '2^{-2} = \frac{1}{2^2} = \frac{1}{4}'
    answer: '$2^{-2} = \frac{1}{4}$'
practice: integers-03
---

## Why this matters

Powers are how scientists write the very big and the very small — the next topic,
standard form, depends entirely on them. The index laws let you tidy up long strings of
multiplications and divisions in a line or two.

## The laws you already know

$$a^x \times a^y = a^{x+y} \qquad a^x \div a^y = a^{x-y} \qquad a^0 = 1 \qquad (a^x)^y = a^{xy}$$

All four only work when the **base is the same**.

## What does a negative index mean?

Look at what happens as you keep dividing by 2:

| Power | $2^3$ | $2^2$ | $2^1$ | $2^0$ | $2^{-1}$ | $2^{-2}$ | $2^{-3}$ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Value | 8 | 4 | 2 | 1 | $\frac{1}{2}$ | $\frac{1}{4}$ | $\frac{1}{8}$ |

Each step to the right halves the value *and* lowers the power by 1. The pattern
does not stop at $2^0$, so it forces

$$a^{-n} = \frac{1}{a^n}$$

We say $a^{-n}$ is the **reciprocal** of $a^n$.

> **The most common mistake.** $2^{-3}$ is **not** $-8$ and it is **not** $-6$.
> It is $\frac{1}{8}$. A negative index flips the number; it never makes it negative.

## Powers of 10

The same pattern works for tens, and you will use it constantly:

$$0.1 = \frac{1}{10} = 10^{-1} \qquad 0.01 = \frac{1}{100} = 10^{-2} \qquad 0.001 = \frac{1}{1000} = 10^{-3}$$

## Order of operations with powers

**BIDMAS** still applies:

- **B**rackets first — and a long dividing line acts like a bracket round the top
  and another round the bottom,
- then **I**ndices (powers),
- then **D**ivision and **M**ultiplication,
- then **A**ddition and **S**ubtraction.

So in $\frac{(3^6 \times 3^4)^2}{3^2 \times 3^3}$ you finish the numerator and the
denominator separately before you divide.

> You can leave your answer in index form, like $3^{15}$, unless the question asks
> you to work it out.
