---
title: Order of Operations and Laws of Arithmetic
topic: fractions-decimals
order: 3
minutes: 25
difficulty: core
summary: 'BIDMAS with fractions and decimals, and using the distributive law and clever cancelling to make calculations easy.'
objectives:
  - 'Apply BIDMAS to calculations with fractions, including long fraction lines'
  - 'Use the distributive law to simplify a calculation'
  - 'Change decimals to fractions so that numbers cancel'
  - 'Rearrange multiplications and divisions to make mental calculation easier'
keyRules:
  - title: 'BIDMAS still rules'
    body: '**B**rackets, **I**ndices, **D**ivision and **M**ultiplication, **A**ddition and **S**ubtraction. A long fraction line acts as a bracket round the top and another round the bottom.'
  - title: 'The distributive law'
    formula: 'a \times b + a \times c = a \times (b + c)'
    body: '$2\frac{3}{8} \times 7 + 2\frac{3}{8} \times 5 = 2\frac{3}{8} \times 12$ — one multiplication instead of two.'
  - title: 'Decimals as fractions'
    body: 'Writing $3.31 = \frac{331}{100}$ or $1.5 = \frac{3}{2}$ often lets numbers cancel. $1.5 \times 3.5 \times 24 = \frac{3}{2} \times \frac{7}{2} \times 24 = 3 \times 7 \times 6 = 126$.'
  - title: 'Multiplication and division can be reordered'
    body: '$3 \times 7.148 \times \frac{2}{3} \div 2 = 7.148 \times \left(3 \times \frac{2}{3} \times \frac{1}{2}\right) = 7.148 \times 1 = 7.148$.'
workedExamples:
  - title: 'A long fraction line'
    problem: 'Calculate $\dfrac{\left(\frac{3}{4}\right)^2}{3\frac{2}{5} - 1\frac{3}{4}}$.'
    steps:
      - explain: 'Work out the top and bottom separately — the line acts as brackets.'
        maths: '\left(\tfrac{3}{4}\right)^2 = \tfrac{9}{16}, \qquad 3\tfrac{2}{5} - 1\tfrac{3}{4} = \tfrac{68}{20} - \tfrac{35}{20} = \tfrac{33}{20}'
      - explain: 'The line means divide.'
        maths: '\frac{9}{16} \div \frac{33}{20} = \frac{9}{16} \times \frac{20}{33}'
      - explain: 'Cancel (9 with 33 by 3; 20 with 16 by 4) and multiply.'
        maths: '\frac{3}{4} \times \frac{5}{11} = \frac{15}{44}'
    answer: '$\dfrac{15}{44}$'
  - title: 'Using the distributive law'
    problem: 'Work out $2\frac{3}{8} \times 7 + 2\frac{3}{8} \times 5$.'
    steps:
      - explain: 'Both terms multiply $2\frac{3}{8}$, so take it outside a bracket.'
        maths: '2\tfrac{3}{8} \times (7 + 5) = 2\tfrac{3}{8} \times 12'
      - explain: 'Change to an improper fraction and cancel the 8 with the 12.'
        maths: '\frac{19}{8} \times \frac{12}{1} = \frac{19}{2} \times \frac{3}{1} = \frac{57}{2}'
    answer: '$28\frac{1}{2}$'
  - title: 'Decimals that cancel'
    problem: 'Work out $3.31 \times 5^2 + 9$.'
    steps:
      - explain: 'Indices first: $5^2 = 25$. Write both numbers as fractions.'
        maths: '\frac{331}{100} \times \frac{100}{4} + 9'
      - explain: 'The 100s cancel. Multiplication before addition.'
        maths: '\frac{331}{4} + 9 = 82\tfrac{3}{4} + 9'
    answer: '$91\frac{3}{4}$ (or 91.75)'
practice: fractions-03
---

## Why this matters

Without a calculator, the order you do a calculation in can turn it from painful to trivial.
Knowing the rules of arithmetic — which steps you *must* do first and which you are free to
rearrange — lets you spot the easy route.

## What you are allowed to rearrange

| Law | Example |
| --- | --- |
| Multiplication is commutative | $\frac{2}{3} \times 7.148 = 7.148 \times \frac{2}{3}$ |
| Multiplication is associative | $(1.5 \times 3.5) \times 24 = 1.5 \times (3.5 \times 24)$ |
| Distributive law | $a(b + c) = ab + ac$ |
| Dividing is multiplying by the reciprocal | $\div 3 = \times \frac{1}{3}$ |

## Brackets you do not have to open first

Wasim simplified $\left(5\frac{3}{17} - 2\frac{4}{11}\right) - \left(\frac{2}{17} - \frac{4}{11}\right)$ by
removing the brackets and grouping the seventeenths and elevenths together:

$$5\tfrac{3}{17} - \tfrac{2}{17} - 2\tfrac{4}{11} + \tfrac{4}{11} = 5\tfrac{1}{17} - 2 = 3\tfrac{1}{17}$$

That is allowed, as long as you keep track of the signs — the minus in front of the second
bracket changes $-\frac{4}{11}$ into $+\frac{4}{11}$.

> **Remember.** Addition and subtraction come **last**. In $1\frac{4}{5} + 2\frac{3}{4} \times 1\frac{1}{3}$,
> do the multiplication first: $2\frac{3}{4} \times 1\frac{1}{3} = \frac{11}{3}$, then add.
