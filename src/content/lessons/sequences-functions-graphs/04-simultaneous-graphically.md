---
title: Solving Simultaneous Equations Graphically
topic: sequences-functions-graphs
order: 4
minutes: 20
difficulty: core
summary: 'Two lines, one crossing point — and why that crossing point is the solution to both equations at once.'
objectives:
  - 'Draw two straight lines on the same axes'
  - 'Read the solution of a pair of simultaneous equations from where the lines cross'
  - 'Check a graphical solution by substituting into both equations'
  - 'Recognise when a pair of equations has no solution'
keyRules:
  - title: 'The point of intersection is the solution'
    body: 'A point on a line satisfies that line''s equation. A point on **both** lines satisfies **both** equations — which is exactly what "solve simultaneously" asks for.'
  - title: 'Rearrange first if you need to'
    body: 'Equations like $2x + y = 8$ are easier to plot once rearranged into $y = 8 - 2x$. Get $y$ on its own, then build a table.'
  - title: 'Always check'
    body: 'Substitute your $x$ and $y$ into **both** original equations. Both must balance. Reading a graph involves estimating, so this step is not optional.'
  - title: 'Parallel lines never meet'
    body: 'If the two equations have the same gradient but different intercepts, the lines are parallel and there is **no solution**. If they have the same gradient *and* the same intercept, they are the same line and there are infinitely many.'
visual:
  widget: line-mc
  title: 'Move a line to find a crossing point'
  caption: 'Set $m$ and $c$ and watch where the line sits. Two different lines cross at exactly one point unless they are parallel — try matching a gradient and see what happens.'
  config:
    start:
      m: 1
      c: 2
workedExamples:
  - title: 'Solving by drawing'
    problem: 'Solve $y = x + 1$ and $y = 5 - x$ graphically.'
    steps:
      - explain: 'Build a small table for the first line.'
        maths: '\begin{array}{c|ccc} x & 0 & 1 & 4 \\ \hline y = x+1 & 1 & 2 & 5 \end{array}'
      - explain: 'And for the second.'
        maths: '\begin{array}{c|ccc} x & 0 & 1 & 4 \\ \hline y = 5-x & 5 & 4 & 1 \end{array}'
      - explain: 'Plot both lines on the same axes. One rises, one falls, so they must cross exactly once.'
      - explain: 'Read off the crossing point. It is at $x = 2$, $y = 3$.'
      - explain: 'Check in **both** equations.'
        maths: '3 = 2 + 1 \;\checkmark \qquad 3 = 5 - 2 \;\checkmark'
    answer: '$x = 2$, $y = 3$'
  - title: 'Rearranging before plotting'
    problem: 'Solve $2x + y = 8$ and $y = x - 1$ graphically.'
    steps:
      - explain: 'The second equation is ready to plot. Rearrange the first by subtracting $2x$ from both sides.'
        maths: 'y = 8 - 2x'
      - explain: 'Table for $y = 8 - 2x$.'
        maths: '\begin{array}{c|ccc} x & 0 & 2 & 4 \\ \hline y & 8 & 4 & 0 \end{array}'
      - explain: 'Table for $y = x - 1$.'
        maths: '\begin{array}{c|ccc} x & 0 & 2 & 4 \\ \hline y & -1 & 1 & 3 \end{array}'
      - explain: 'The lines cross at $(3, 2)$.'
      - explain: 'Check in both originals.'
        maths: '2(3) + 2 = 8 \;\checkmark \qquad 2 = 3 - 1 \;\checkmark'
    answer: '$x = 3$, $y = 2$'
  - title: 'When there is no solution'
    problem: 'What happens when you try to solve $y = 2x + 1$ and $y = 2x - 3$ graphically?'
    steps:
      - explain: 'Compare the gradients. Both are 2.'
        maths: 'm_1 = 2, \qquad m_2 = 2'
      - explain: 'Compare the intercepts. They are different, so the lines are not the same line.'
        maths: 'c_1 = 1, \qquad c_2 = -3'
      - explain: 'Two distinct lines with the same gradient are parallel — they stay 4 units apart forever and never meet.'
    answer: 'There is no solution: the lines are parallel'
practice: sequences-04
---

## The idea in one sentence

Every point on a line makes that line's equation true; so the point where two lines
cross makes **both** equations true at once, and that is the solution.

## The method

1. **Rearrange** each equation into the form $y = \dots$ if it is not there already.
2. **Make a short table** for each — three points is plenty for a straight line, and
   the third is a useful check on the other two.
3. **Plot both lines** on the same axes, with a sensible scale that includes where you
   expect them to meet.
4. **Read off the crossing point.** That is your $x$ and $y$.
5. **Substitute back into both original equations** to confirm.

## Why step 5 really matters

Graphical solutions are **read off a picture**. If the crossing point sits between
grid lines, or your ruler wandered slightly, you will get an answer that is close but
wrong.

Substituting back takes ten seconds and either confirms the answer or tells you to
look again. If your values do not fit both equations exactly, the true solution is
probably not at a whole-number point — and a graph may simply not be precise enough,
which is one reason algebraic methods exist.

## When the lines do not cross

Not every pair of equations has a solution:

| Gradients | Intercepts | Picture | Solutions |
| --- | --- | --- | --- |
| Different | Anything | Lines cross once | Exactly one |
| Same | Different | Parallel lines | None |
| Same | Same | The same line twice | Infinitely many |

You can spot all three cases **before drawing anything**, just by comparing $m$ and
$c$. If someone asks you to solve $y = 2x + 1$ and $y = 2x - 3$, you can say "no
solution — they are parallel" without touching a pencil.
