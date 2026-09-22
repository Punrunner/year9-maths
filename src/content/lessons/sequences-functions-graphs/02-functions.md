---
title: Functions
topic: sequences-functions-graphs
order: 2
minutes: 18
difficulty: core
summary: 'Function machines, writing a function as a rule, and undoing it with inverse operations.'
objectives:
  - 'Use a function machine to find an output from an input'
  - 'Write a function as an algebraic rule'
  - 'Find the input when you are given the output, using inverse operations'
  - 'Find the inverse of a simple function'
keyRules:
  - title: 'A function is a rule'
    body: 'One input goes in, exactly one output comes out. $x \mapsto 3x + 4$ means "multiply by 3, then add 4".'
  - title: 'Order matters'
    body: '$3x + 4$ and $3(x + 4)$ are different functions. Reading a machine left to right tells you which is which.'
  - title: 'Inverse operations'
    formula: '+ \leftrightarrow - \qquad \times \leftrightarrow \div \qquad x^2 \leftrightarrow \sqrt{x}'
    body: 'To undo a function, reverse the machine: go right to left, replacing every operation with its inverse.'
  - title: 'Checking an inverse'
    body: 'Put a number through the function, then put the answer through your inverse. If you get your original number back, the inverse is right.'
workedExamples:
  - title: 'Reading a function machine'
    problem: 'A function machine does $\times 4$ then $-5$. Find the output when the input is 7, and write the function as a rule.'
    steps:
      - explain: 'Apply the operations in order, left to right.'
        maths: '7 \xrightarrow{\times 4} 28 \xrightarrow{-5} 23'
      - explain: 'Now do the same with $x$ instead of 7.'
        maths: 'x \xrightarrow{\times 4} 4x \xrightarrow{-5} 4x - 5'
    answer: 'Output 23; the rule is $x \mapsto 4x - 5$'
  - title: 'Working backwards'
    problem: 'For the function $x \mapsto 4x - 5$, find the input that gives an output of 31.'
    steps:
      - explain: 'Start at the output and run the machine backwards, inverting each operation.'
        maths: '31 \xrightarrow{+5} 36 \xrightarrow{\div 4} 9'
      - explain: 'Check by running it forwards.'
        maths: '4(9) - 5 = 36 - 5 = 31 \;\checkmark'
    answer: 'The input was 9'
  - title: 'Finding the inverse function'
    problem: 'Find the inverse of $x \mapsto \dfrac{x + 6}{2}$.'
    steps:
      - explain: 'Write down what the machine does, in order: add 6, then divide by 2.'
        maths: 'x \xrightarrow{+6} x + 6 \xrightarrow{\div 2} \frac{x+6}{2}'
      - explain: 'Reverse the order and invert each operation: multiply by 2, then subtract 6.'
        maths: 'x \xrightarrow{\times 2} 2x \xrightarrow{-6} 2x - 6'
      - explain: 'Check with a number. Put 4 through the original.'
        maths: '\frac{4+6}{2} = 5'
      - explain: 'Now put 5 through the inverse — it should give 4 back.'
        maths: '2(5) - 6 = 4 \;\checkmark'
    answer: 'The inverse is $x \mapsto 2x - 6$'
practice: sequences-02
---

## What a function actually is

A **function** is a rule that turns one number into another. Put a number in, get
exactly one number out — that "exactly one" is what makes it a function rather than
just any old relationship.

You will see functions written in a few ways, all meaning the same thing:

- **A function machine:** $x \to \boxed{\times 3} \to \boxed{+4} \to$ output
- **A mapping:** $x \mapsto 3x + 4$
- **An equation:** $y = 3x + 4$

## Building the rule from a machine

Read the machine **left to right** and do to $x$ exactly what it says, in order.

| Machine | Rule |
| --- | --- |
| $\times 3$ then $+4$ | $3x + 4$ |
| $+4$ then $\times 3$ | $3(x + 4)$ |
| $-2$ then $\div 5$ | $\dfrac{x - 2}{5}$ |
| $\times 2$ then $+1$ then $\div 3$ | $\dfrac{2x + 1}{3}$ |

Notice rows 1 and 2. Same two operations, different order, completely different
function. Try $x = 6$: the first gives 22, the second gives 30.

## Going backwards with inverse operations

To find the input when you know the output, run the machine in reverse and swap every
operation for its opposite:

$$+ \leftrightarrow - \qquad \times \leftrightarrow \div \qquad \text{square} \leftrightarrow \text{square root}$$

Two things have to be reversed: the **operations** themselves, and the **order** they
happen in. Forgetting the second is the usual slip.

## Why this matters later

Inverse operations are not just a sequences topic. They are exactly what you do when
you solve an equation:

$$4x - 5 = 31 \quad\Rightarrow\quad 4x = 36 \quad\Rightarrow\quad x = 9$$

That is the same "add 5, then divide by 4" you did on the machine. Solving equations
and reversing function machines are the same skill wearing different clothes — which
is why getting comfortable here makes the equations topic much easier.
