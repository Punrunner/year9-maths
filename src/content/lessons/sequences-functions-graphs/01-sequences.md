---
title: Sequences
topic: sequences-functions-graphs
order: 1
minutes: 25
difficulty: core
summary: 'Term-to-term and position-to-term rules, and finding the nth term of linear and quadratic sequences.'
objectives:
  - 'Generate terms from a term-to-term rule and from a position-to-term rule'
  - 'Find the nth term of an arithmetic sequence'
  - 'Use the nth term to find any term, however far along'
  - 'Find the nth term of a simple quadratic sequence'
keyRules:
  - title: 'Term-to-term rule'
    body: 'Tells you how to get from one term to the **next**. You need a starting term to use it. Example: *square then subtract 1*, starting at 2, gives $2,\ 3,\ 8,\ 63,\ \dots$'
  - title: 'Position-to-term rule (the nth term)'
    body: 'Tells you how to get a term straight from its **position**, without working through the ones before it. Much more useful for questions like "find the 100th term".'
  - title: 'The nth term of an arithmetic sequence'
    formula: '\text{nth term} = a + (n-1)d'
    body: 'where $a$ is the first term and $d$ is the common difference. Expand the brackets and simplify to get the tidy form.'
  - title: 'The shortcut most people use'
    body: 'The nth term of an arithmetic sequence is always $dn + (\text{something})$, where $d$ is the common difference. Find $d$, write $dn$, then work out what to add or subtract to make the first term come out right.'
  - title: 'Quadratic sequences'
    body: 'If the differences are not constant, look at the **second** differences. If those are constant, the sequence is quadratic. Compare it term by term with the square numbers $1, 4, 9, 16, 25, \dots$'
workedExamples:
  - title: 'Finding the nth term of an arithmetic sequence'
    problem: 'Find the nth term of $7,\ 11,\ 15,\ 19,\ 23,\ \dots$'
    steps:
      - explain: 'Find the common difference by subtracting each term from the one after it.'
        maths: '11 - 7 = 4, \quad 15 - 11 = 4, \quad 19 - 15 = 4'
      - explain: 'The difference is 4 every time, so the rule starts with $4n$. Write out $4n$ for the first few positions.'
        maths: '4n: \quad 4,\ 8,\ 12,\ 16,\ 20, \dots'
      - explain: 'Compare with the sequence. Each term is 3 more than $4n$.'
        maths: '\begin{array}{ccccc} 4n: & 4 & 8 & 12 & 16 \\ \text{seq}: & 7 & 11 & 15 & 19 \end{array}'
      - explain: 'So add 3.'
        maths: '\text{nth term} = 4n + 3'
      - explain: 'Check with $n = 5$: it should give 23.'
        maths: '4(5) + 3 = 23 \;\checkmark'
    answer: '$4n + 3$'
  - title: 'Using the formula instead'
    problem: 'Find the nth term of $18,\ 16,\ 14,\ 12,\ 10,\ \dots$ using $a + (n-1)d$.'
    steps:
      - explain: 'Identify the first term and the common difference. The sequence is going down, so $d$ is negative.'
        maths: 'a = 18, \qquad d = -2'
      - explain: 'Substitute into the formula.'
        maths: '\text{nth term} = 18 + (n-1)(-2)'
      - explain: 'Expand the brackets. Watch the signs: $-2 \times -1 = +2$.'
        maths: '= 18 - 2n + 2'
      - explain: 'Collect the number terms.'
        maths: '= 20 - 2n'
    answer: '$20 - 2n$'
  - title: 'A quadratic sequence'
    problem: 'Find the nth term of $-6,\ -3,\ 2,\ 9,\ 18,\ \dots$'
    steps:
      - explain: 'The first differences are not constant, so this is not arithmetic.'
        maths: '3, \quad 5, \quad 7, \quad 9'
      - explain: 'The second differences **are** constant, so the sequence is quadratic.'
        maths: '2, \quad 2, \quad 2'
      - explain: 'Write the square numbers underneath and compare term by term.'
        maths: '\begin{array}{cccccc} n^2: & 1 & 4 & 9 & 16 & 25 \\ \text{seq}: & -6 & -3 & 2 & 9 & 18 \end{array}'
      - explain: 'Every term is 7 less than the matching square number.'
        maths: '-6 - 1 = -7, \quad -3 - 4 = -7, \quad 2 - 9 = -7'
      - explain: 'So subtract 7 from $n^2$.'
        maths: '\text{nth term} = n^2 - 7'
    answer: '$n^2 - 7$'
practice: sequences-01
---

## Two kinds of rule

There are two ways to describe a sequence, and exam questions use both words, so it
is worth being clear about the difference.

A **term-to-term rule** says how to get from one term to the next: *add 5*, *double
it*, *square it then subtract 1*. To use it you must know where to start, and to find
the 50th term you would have to work through the 49 before it.

A **position-to-term rule** — the **nth term** — takes the position number and gives
you the term directly. Want the 50th term? Put $n = 50$ in and you are done.

## Finding the nth term of an arithmetic sequence

An **arithmetic** sequence goes up (or down) by the same amount each time. That amount
is the **common difference**, $d$.

The method most students find quickest:

1. **Find the common difference $d$.** Subtract any term from the one after it.
2. **Write down $dn$.** This is the "skeleton" of the answer.
3. **Compare $dn$ with the real sequence** at the same positions.
4. **Add or subtract** whatever constant makes them match.
5. **Check** with a term you have not used yet.

The formal version of the same thing is

$$\text{nth term} = a + (n-1)d$$

Both give the same answer. The formula is safer when the numbers are awkward; the
comparison method is faster when they are not.

### Watch the signs

If the sequence goes **down**, $d$ is negative, and the nth term will look like
$20 - 2n$ rather than $2n + 20$. The commonest mistake in the whole topic is dropping
that minus sign when expanding $(n-1)d$.

## Quadratic sequences

Not every sequence has a constant difference. Take $-6, -3, 2, 9, 18, \dots$

First differences: $3, 5, 7, 9$ — not constant.
Second differences: $2, 2, 2$ — **constant**.

When the *second* differences are constant, the sequence is **quadratic**: its nth
term involves $n^2$.

For the sequences you meet at this level, the second difference is 2, which means the
$n^2$ coefficient is 1. So you can find the rule by simply writing the square numbers
above the sequence and spotting the constant gap between them:

| $n$ | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| $n^2$ | 1 | 4 | 9 | 16 | 25 |
| sequence | $-6$ | $-3$ | 2 | 9 | 18 |
| difference | $-7$ | $-7$ | $-7$ | $-7$ | $-7$ |

The gap is $-7$ every time, so the nth term is $n^2 - 7$.

> **Always check.** Substitute a position you did not use while working it out. If
> $n = 6$ gives $36 - 7 = 29$, and the sequence continues $18, 29$, you are right.
