---
title: Factors, HCF and LCM
topic: fractions-decimals
order: 1
minutes: 20
difficulty: core
summary: 'Finding factors in pairs, writing numbers as products of primes, and using the HCF to simplify fractions and solve problems.'
objectives:
  - 'Find all the factors of a number by working in pairs'
  - 'Write a number as a product of its prime factors using a factor tree'
  - 'Find the highest common factor (HCF) and lowest common multiple (LCM)'
  - 'Use the HCF to simplify fractions and to cancel before multiplying'
keyRules:
  - title: 'Factors come in pairs'
    body: 'Divide by 1, 2, 3, … in turn. Each time it divides exactly you get **two** factors: $36 = 1 \times 36 = 2 \times 18 = 3 \times 12 = 4 \times 9 = 6 \times 6$. Stop when the pairs meet.'
  - title: 'Prime factors'
    formula: '30 = 2 \times 3 \times 5 \qquad 12 = 2 \times 2 \times 3 = 2^2 \times 3'
    body: 'A prime has exactly two factors, 1 and itself. Every whole number greater than 1 can be written as a product of primes in exactly one way.'
  - title: 'HCF from prime factors'
    body: 'Multiply the primes the two numbers **share**. $12 = 2 \times 2 \times 3$ and $30 = 2 \times 3 \times 5$ share $2 \times 3$, so the HCF is 6.'
  - title: 'LCM from prime factors'
    body: 'Take every prime the **highest** number of times it appears in either number. For 12 and 30: $2 \times 2 \times 3 \times 5 = 60$.'
workedExamples:
  - title: 'Finding the HCF with prime factors'
    problem: 'Find the HCF of 60 and 84.'
    steps:
      - explain: 'Write each number as a product of primes (a factor tree helps).'
        maths: '60 = 2 \times 2 \times 3 \times 5, \qquad 84 = 2 \times 2 \times 3 \times 7'
      - explain: 'Pick out the primes they have in common: two 2s and a 3.'
        maths: '\text{HCF} = 2 \times 2 \times 3 = 12'
    answer: 'HCF = 12'
  - title: 'Cancelling before multiplying'
    problem: 'Work out $\dfrac{24}{49} \times \dfrac{35}{36}$.'
    steps:
      - explain: '24 and 36 share a factor of 12; 35 and 49 share a factor of 7. Cancel any numerator with any denominator.'
        maths: '\frac{\cancel{24}^{\,2}}{\cancel{49}_{\,7}} \times \frac{\cancel{35}^{\,5}}{\cancel{36}_{\,3}}'
      - explain: 'Multiply what is left.'
        maths: '\frac{2 \times 5}{7 \times 3} = \frac{10}{21}'
    answer: '$\dfrac{10}{21}$'
  - title: 'A real problem'
    problem: 'A garden measures 84 m by 112 m. It is split into the fewest possible identical square plots. How long is each side?'
    steps:
      - explain: 'The side of each square must divide both 84 and 112 exactly, and we want the biggest such number.'
        maths: '84 = 2^2 \times 3 \times 7, \qquad 112 = 2^4 \times 7'
      - explain: 'The shared primes are $2^2 \times 7$.'
        maths: '\text{HCF} = 28'
    answer: 'Each plot is 28 m by 28 m (that gives $3 \times 4 = 12$ plots).'
practice: fractions-01
---

## Why this matters

Factors sit underneath almost every calculation with fractions. Simplifying a fraction,
finding a common denominator and cancelling before you multiply all use them — and so do
practical problems like cutting lengths of material with no waste.

## Two ways to find the HCF

**Listing.** Write out every factor of both numbers and find the biggest one on both lists.
It works, but it is easy to miss factors (Harry listed the factors of 60 as 1, 2, 5, 6, 12,
30, 60 and forgot 3, 4, 10, 15 and 20).

**Prime factors.** Build a factor tree for each number and multiply the shared primes. This
is faster and far more reliable for big numbers.

## Number words you need

| Word | Meaning | Examples |
| --- | --- | --- |
| Prime | Exactly two factors | 2, 3, 5, 7, 11, 13, 17, 19 |
| Composite | More than two factors | 4, 6, 8, 9, 10 |
| Square | Has an **odd** number of factors | 1, 4, 9, 16 |

1 is **neither** prime nor composite — its only factor is 1.

## Simplifying fractions

Divide the numerator and the denominator by their HCF and the fraction is in its simplest
form in one step:

$$\frac{48}{112} = \frac{48 \div 16}{112 \div 16} = \frac{3}{7}$$

> **Handy check.** A fraction is fully simplified when the only common factor of the top
> and bottom is 1.
