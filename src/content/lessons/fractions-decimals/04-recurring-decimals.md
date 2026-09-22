---
title: Recurring Decimals
topic: fractions-decimals
order: 4
minutes: 25
difficulty: core
summary: 'Writing fractions as recurring decimals, predicting which fractions terminate, and turning simple recurring decimals back into fractions.'
objectives:
  - 'Use dot notation for recurring decimals'
  - 'Convert a fraction to a recurring decimal by division'
  - 'Decide whether a fraction gives a terminating or a recurring decimal'
  - 'Use $\frac{1}{9} = 0.\dot{1}$ and $\frac{1}{99} = 0.\dot{0}\dot{1}$ to convert between fractions and recurring decimals'
keyRules:
  - title: 'Dot notation'
    formula: '\tfrac{2}{9} = 0.\dot{2} \qquad \tfrac{517}{999} = 0.\dot{5}1\dot{7} \qquad \tfrac{2}{15} = 0.1\dot{3}'
    body: 'A dot over a digit means it repeats forever. If a block of digits repeats, put dots over the **first and last** digits of the block.'
  - title: 'Terminating or recurring?'
    body: 'Write the fraction in its simplest form, then write the denominator as a product of primes. If the only primes are **2s and 5s**, the decimal terminates. Any other prime and it recurs.'
  - title: 'Ninths and ninety-ninths'
    formula: '\tfrac{1}{9} = 0.\dot{1} \qquad \tfrac{1}{99} = 0.\dot{0}\dot{1} \qquad \tfrac{1}{999} = 0.\dot{0}0\dot{1}'
    body: 'So $\frac{7}{9} = 0.\dot{7}$, $\frac{23}{99} = 0.\dot{2}\dot{3}$ and $\frac{517}{999} = 0.\dot{5}1\dot{7}$ — the repeating block goes on top.'
  - title: 'Back to a fraction'
    body: 'Reverse it: a single repeating digit goes over 9, a repeating pair over 99, a repeating three over 999. Then simplify: $0.\dot{3}\dot{6} = \frac{36}{99} = \frac{4}{11}$.'
workedExamples:
  - title: 'Fraction to recurring decimal'
    problem: 'Write $\frac{2}{15}$ as a decimal.'
    steps:
      - explain: 'Divide 2 by 15 using short or long division, adding zeros after the decimal point.'
        maths: '2.000 \div 15 = 0.133\dots'
      - explain: 'The remainder is 5 every time from the second digit on, so the 3 repeats.'
        maths: '\tfrac{2}{15} = 0.1\dot{3}'
    answer: '$0.1\dot{3}$'
  - title: 'Will it terminate?'
    problem: 'Decide whether $\frac{14}{80}$ and $\frac{10}{48}$ give terminating decimals.'
    steps:
      - explain: 'Simplify each fraction first.'
        maths: '\tfrac{14}{80} = \tfrac{7}{40}, \qquad \tfrac{10}{48} = \tfrac{5}{24}'
      - explain: 'Write each denominator as a product of primes.'
        maths: '40 = 2^3 \times 5, \qquad 24 = 2^3 \times 3'
      - explain: '40 has only 2s and 5s, so $\frac{7}{40}$ terminates ($0.175$). 24 has a factor of 3, so $\frac{5}{24}$ recurs ($0.208\dot{3}$).'
    answer: '$\frac{14}{80}$ terminates; $\frac{10}{48}$ recurs.'
  - title: 'Using a known fact'
    problem: 'Given $\frac{44}{90} = 0.4\dot{8}$, write $\frac{22}{90}$ and $\frac{11}{90}$ as recurring decimals.'
    steps:
      - explain: '$\frac{22}{90}$ is half of $\frac{44}{90}$.'
        maths: '0.4\dot{8} \div 2 = 0.2\dot{4}'
      - explain: '$\frac{11}{90}$ is a quarter of $\frac{44}{90}$.'
        maths: '0.4\dot{8} \div 4 = 0.1\dot{2}'
    answer: '$\frac{22}{90} = 0.2\dot{4}$ and $\frac{11}{90} = 0.1\dot{2}$'
practice: fractions-04
---

## Why this matters

Some fractions have neat decimals ($\frac{3}{8} = 0.375$). Others, like $\frac{1}{3}$, go on
forever. Knowing which is which — before you start dividing — tells you whether a calculator
answer is exact or has been rounded, and whether a decimal answer can ever be exact at all.

## Why only 2s and 5s terminate

A terminating decimal is really a fraction over 10, 100, 1000, … and $10 = 2 \times 5$. You can
only turn a denominator into a power of 10 by multiplying it up, which is possible only if it
is already made of 2s and 5s:

$$\tfrac{7}{40} = \tfrac{7}{2^3 \times 5} = \tfrac{7 \times 25}{2^3 \times 5 \times 25} = \tfrac{175}{1000} = 0.175$$

A denominator with a 3, 7, 11 or any other prime can never become a power of 10.

## Calculator displays

A calculator might show $\frac{106}{333}$ as $0.31831831832$. The last digit is **rounded**,
which hides the pattern. The true value is $0.\dot{3}1\dot{8}$.

| Fraction | Decimal | Terminates? |
| --- | --- | --- |
| $\frac{3}{12} = \frac{1}{4}$ | $0.25$ | Yes ($4 = 2^2$) |
| $\frac{7}{40}$ | $0.175$ | Yes ($40 = 2^3 \times 5$) |
| $\frac{2}{25}$ | $0.08$ | Yes ($25 = 5^2$) |
| $\frac{5}{24}$ | $0.208\dot{3}$ | No ($24 = 2^3 \times 3$) |
| $\frac{5}{7}$ | $0.\dot{7}1428\dot{5}$ | No |

> **Simplify first!** $\frac{3}{12}$ has a 3 in its denominator, but it simplifies to $\frac{1}{4}$,
> which terminates. Always cancel before you look at the primes.
