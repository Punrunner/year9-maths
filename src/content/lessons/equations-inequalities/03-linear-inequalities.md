---
title: Linear Inequalities
topic: equations-inequalities
order: 3
minutes: 30
difficulty: core
summary: 'Solving inequalities like equations, reversing the sign when multiplying or dividing by a negative, and showing solutions on a number line.'
objectives:
  - 'Solve a linear inequality using the balance method'
  - 'Reverse the inequality sign when multiplying or dividing by a negative number'
  - 'Show a solution on a number line using open and closed circles'
  - 'Solve a combined inequality such as $2 \le 2x - 4 < 14$ and list integer solutions'
keyRules:
  - title: 'The four symbols'
    body: '$<$ less than, $>$ greater than, $\le$ less than or equal to, $\ge$ greater than or equal to. The narrow end points at the smaller value: $x < 2$ and $2 > x$ say the same thing.'
  - title: 'Solve like an equation'
    body: 'You can add, subtract, multiply or divide both sides by the same **positive** number and the inequality stays true.'
  - title: 'The one new rule'
    formula: '-3x > -6 \;\xrightarrow{\;\div (-3)\;}\; x < 2'
    body: 'When you multiply or divide both sides by a **negative** number, **reverse** the inequality sign. ($5 > 3$ but $-5 < -3$.)'
  - title: 'Number lines'
    body: 'A **closed** circle ● means the value is included ($\le$ or $\ge$). An **open** circle ○ means it is not ($<$ or $>$). An arrow shows the direction of the solution.'
visual:
  widget: number-line
  title: 'Show an inequality'
  caption: 'Move the point, switch the arrow direction and choose an open or closed circle. The readout shows the inequality you have drawn. Try making $x \ge -2$, then $x < 5$.'
  config:
    min: -8
    max: 8
    step: 1
    majorStep: 1
    label: 'Boundary value'
    inequality: true
    start:
      x: -2
      dir: 1
      closed: 1
workedExamples:
  - title: 'Solving like an equation'
    problem: 'Solve $4x - 1 > 2x + 5$.'
    steps:
      - explain: 'Subtract $2x$ from both sides.'
        maths: '2x - 1 > 5'
      - explain: 'Add 1 to both sides.'
        maths: '2x > 6'
      - explain: 'Divide by 2 (a positive number, so the sign stays the same).'
        maths: 'x > 3'
    answer: '$x > 3$'
  - title: 'Dividing by a negative'
    problem: 'Solve $5 - 3x > -1$.'
    steps:
      - explain: 'Subtract 5 from both sides.'
        maths: '-3x > -6'
      - explain: 'Divide both sides by $-3$ and **reverse** the sign.'
        maths: 'x < 2'
      - explain: 'Or avoid the negative altogether: add $3x$ and add 1 to both sides.'
        maths: '6 > 3x \;\Rightarrow\; 2 > x'
    answer: '$x < 2$'
  - title: 'A combined inequality'
    problem: 'Solve $2 \le 2x - 4 < 14$ and list the integers that satisfy it.'
    steps:
      - explain: 'Do the same to all three parts. Add 4.'
        maths: '6 \le 2x < 18'
      - explain: 'Divide all three parts by 2.'
        maths: '3 \le x < 9'
      - explain: '3 is included; 9 is not.'
        maths: 'x = 3, 4, 5, 6, 7, 8'
    answer: '$3 \le x < 9$; integers 3 to 8'
practice: equations-03
---

## Why this matters

Real limits are rarely exact: *at least 55 cm tall*, *no more than 20 kg of luggage*, *between
2 and 7 hours*. Inequalities describe a whole range of acceptable answers, and solving them
tells you exactly where that range starts and stops.

## Why the sign flips

Start with something true: $5 > 3$. Multiply both sides by $-1$ and you get $-5$ and $-3$ —
but $-5$ is **less** than $-3$. Multiplying by a negative mirrors the number line, so the
order of the two sides swaps and the sign must flip to stay true.

Ashleigh solved $5 - 2x \le 11$ and forgot:

$$-2x \le 6 \;\Rightarrow\; x \le -3 \quad \text{(wrong!)}$$

The correct answer is $x \ge -3$. Test $x = -4$ in the original: $5 - 2(-4) = 13$, which is
**not** $\le 11$ — so $x \le -3$ cannot be right.

## Reading number lines

| Inequality | Circle | Arrow |
| --- | --- | --- |
| $x < -5$ | open ○ at $-5$ | left |
| $x \ge -2$ | closed ● at $-2$ | right |
| $2 \le x < 7$ | ● at 2, ○ at 7 | a segment between them |

## Solution sets

If $x$ must be a whole number from 1 to 9 and $x + 1 > 7$, the **solution set** is
$\{7, 8, 9\}$ — the values that make the inequality true.
