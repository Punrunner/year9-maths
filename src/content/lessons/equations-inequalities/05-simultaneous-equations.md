---
title: Simultaneous Equations
topic: equations-inequalities
order: 5
minutes: 30
difficulty: core
summary: 'Solving pairs of equations by elimination — adding, subtracting, and multiplying first when the coefficients do not match.'
objectives:
  - 'Explain what the solution of a pair of simultaneous equations means'
  - 'Solve by adding or subtracting the equations to eliminate one unknown'
  - 'Multiply one or both equations first so that a coefficient matches'
  - 'Form and solve simultaneous equations from a word problem'
keyRules:
  - title: 'Two unknowns need two equations'
    body: 'One equation such as $3x + 2y = 8$ has infinitely many solutions. The solution of a *pair* is the one $(x, y)$ that works in **both**.'
  - title: 'Same sign → subtract'
    body: 'If the coefficients of one letter are equal **with the same sign**, subtract the equations: $3x + 2y = 8$ minus $2x + 2y = 6$ gives $x = 2$.'
  - title: 'Opposite signs → add'
    body: 'If they are equal but with **opposite signs**, add: $3x + 5y = 65$ plus $-3x + 2y = 5$ gives $7y = 70$.'
  - title: 'No match? Multiply first'
    body: 'Multiply one (or both) equations so a pair of coefficients matches. Then substitute back to find the other letter, and **check** in the equation you did not use.'
workedExamples:
  - title: 'Subtracting'
    problem: 'Solve $3x + 2y = 8$ [1] and $2x + 2y = 6$ [2].'
    steps:
      - explain: 'Both have $+2y$, so subtract [2] from [1].'
        maths: 'x = 2'
      - explain: 'Substitute into [1].'
        maths: '6 + 2y = 8 \;\Rightarrow\; y = 1'
      - explain: 'Check in [2]: $2(2) + 2(1) = 6$ ✓'
    answer: '$x = 2,\ y = 1$'
  - title: 'Multiplying one equation'
    problem: 'Solve $7x + 2y = 29$ [1] and $2x + y = 7$ [2].'
    steps:
      - explain: 'Multiply [2] by 2 so the $y$ terms match.'
        maths: '4x + 2y = 14 \quad [3]'
      - explain: 'Subtract [3] from [1].'
        maths: '3x = 15 \;\Rightarrow\; x = 5'
      - explain: 'Substitute into [2].'
        maths: '10 + y = 7 \;\Rightarrow\; y = -3'
      - explain: 'Check in [1]: $35 - 6 = 29$ ✓'
    answer: '$x = 5,\ y = -3$'
  - title: 'Multiplying both equations'
    problem: 'Solve $3x + 4y = 13$ [1] and $2x + 3y = 9$ [2].'
    steps:
      - explain: 'Make the $x$ coefficients 6: multiply [1] by 2 and [2] by 3.'
        maths: '6x + 8y = 26 \quad [3], \qquad 6x + 9y = 27 \quad [4]'
      - explain: 'Subtract [3] from [4].'
        maths: 'y = 1'
      - explain: 'Substitute into [1].'
        maths: '3x + 4 = 13 \;\Rightarrow\; x = 3'
    answer: '$x = 3,\ y = 1$'
  - title: 'A word problem'
    problem: 'Alison sells 40 tickets: children''s at 1 dollar and adults'' at 2 dollars. She takes 73 dollars. How many of each did she sell?'
    steps:
      - explain: 'Let $c$ be children''s tickets and $a$ adults''.'
        maths: 'c + a = 40 \quad [1], \qquad c + 2a = 73 \quad [2]'
      - explain: 'Subtract [1] from [2].'
        maths: 'a = 33'
      - explain: 'Substitute into [1].'
        maths: 'c = 7'
    answer: '7 children''s tickets and 33 adults'' tickets'
practice: equations-05
---

## Why this matters

Many real problems have two unknowns tied together by two facts: *5 teas and a coffee cost 7
dollars; 2 teas and a coffee cost 4 dollars.* Simultaneous equations let you untangle them.
Graphically, the solution is the point where two straight lines cross.

## The café problem

$$5T + C = 7 \qquad 2T + C = 4$$

Ahmad ordered 3 more teas than Nadia and paid 3 dollars more, so subtracting gives $3T = 3$,
and a tea costs 1 dollar. Then $2(1) + C = 4$, so a coffee costs 2 dollars. That is the
**elimination method**: remove one letter so you can solve for the other.

## Choosing what to do

| Equations | What to do |
| --- | --- |
| $6x + y = 13$ and $4x + y = 9$ | same sign on $y$ → subtract |
| $4x - y = 3$ and $6x + y = 7$ | opposite signs on $y$ → add |
| $3x - 2y = 10$ and $4x + y = 17$ | multiply the second by 2, then add |
| $3x + 4y = 13$ and $2x + 3y = 9$ | multiply both, then subtract |

> **Stephan's mistake.** For $3x + 5y = 65$ and $-3x + 2y = 5$ he subtracted because the $y$
> terms are both positive — but that gives $6x + 3y = 60$, which still has both letters.
> The $x$ terms have opposite signs, so **add**: $7y = 70$.
