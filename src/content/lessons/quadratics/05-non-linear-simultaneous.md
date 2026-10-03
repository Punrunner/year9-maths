---
title: Non-linear Simultaneous Equations
topic: quadratics
order: 5
minutes: 40
difficulty: challenge
summary: 'Where a straight line meets a parabola or a circle: forming one quadratic equation, using the discriminant $b^2 - 4ac$ to count the points of intersection, and solving to find them.'
objectives:
  - 'Form a single quadratic equation by setting a line equal to a curve, or by substituting'
  - 'Use the discriminant $b^2 - 4ac$ to decide whether there are 2, 1 or 0 points of intersection'
  - 'Solve by factorising and substitute back to find both coordinates'
  - 'Solve a line and a circle $x^2 + y^2 = r^2$ simultaneously, expanding brackets carefully'
  - 'Recognise when a line is a tangent to a curve'
activities:
  predict:
    label: 'Predict first'
    question:
      type: multi
      prompt: 'A straight line and a U-shaped parabola are drawn on the same axes. How many times could they meet? Select **every** possible number.'
      shuffleOptions: false
      options:
        - { id: a, text: '0' }
        - { id: b, text: '1' }
        - { id: c, text: '2' }
        - { id: d, text: '3' }
      answers: [a, b, c]
      explanation: 'A line can miss the curve (0), just touch it (1 — a **tangent**), or cut straight through it (2). It can never cross a parabola three times. This lesson shows how to tell which, without drawing anything.'
  explore:
    label: 'Try it'
    visual:
      widget: line-curve
      title: 'Move the line across the parabola'
      caption: 'This is $y = x^2 - 4$ and $y = x + 2$ — question 1 from class. Change the line and watch the **discriminant**. Can you make the line just touch the curve? (Try a gradient of 2.) Can you make it miss completely?'
      config: { curve: parabola, a: 1, b: 0, c: -4, start: { m: 1, k: 2 } }
  count:
    label: 'Quick check'
    question:
      type: sort
      prompt: 'Each equation came from a line meeting a curve. Sort them by the number of points of intersection.'
      groups:
        - id: two
          text: '2 points ($b^2 - 4ac > 0$)'
          items:
            - { id: a, text: '$x^2 - x - 6 = 0$' }
            - { id: b, text: '$2x^2 + x - 6 = 0$' }
        - id: one
          text: '1 point ($b^2 - 4ac = 0$)'
          items:
            - { id: c, text: '$x^2 + 4x + 4 = 0$' }
            - { id: d, text: '$x^2 - 6x + 9 = 0$' }
        - id: none
          text: '0 points ($b^2 - 4ac < 0$)'
          items:
            - { id: e, text: '$x^2 + x + 5 = 0$' }
            - { id: f, text: '$x^2 - 2x + 3 = 0$' }
      explanation: 'Discriminants: $1 + 24 = 25$; $1 + 48 = 49$; $16 - 16 = 0$; $36 - 36 = 0$; $1 - 20 = -19$; $4 - 12 = -8$. Positive → 2 points, zero → 1, negative → none.'
  solve:
    label: 'Your turn'
    question:
      type: steps
      prompt: 'Solve $y = x + 4$ and $y = x^2 + 2x - 2$ simultaneously.'
      steps:
        - kind: mcq
          prompt: 'Set them equal and rearrange to $= 0$. Which equation do you get?'
          options:
            - { id: a, text: '$x^2 + x - 6 = 0$' }
            - { id: b, text: '$x^2 + 3x + 2 = 0$' }
            - { id: c, text: '$x^2 + x + 2 = 0$' }
          answer: a
          feedback: '$x^2 + 2x - 2 = x + 4$, so $x^2 + x - 6 = 0$.'
        - kind: numeric
          prompt: 'Find the discriminant $b^2 - 4ac$.'
          answer: 25
          feedback: '$1^2 - 4(1)(-6) = 1 + 24 = 25 > 0$, so there are two points.'
        - kind: mcq
          prompt: 'Factorise and solve.'
          options:
            - { id: a, text: '$(x + 3)(x - 2) = 0$, so $x = -3$ or $x = 2$' }
            - { id: b, text: '$(x - 3)(x + 2) = 0$, so $x = 3$ or $x = -2$' }
          answer: a
          feedback: '$3 \times -2 = -6$ and $3 + (-2) = 1$.'
        - kind: numeric
          prompt: 'When $x = 2$, what is $y$? (Use the line.)'
          answer: 6
          feedback: '$y = 2 + 4 = 6$.'
        - kind: numeric
          prompt: 'When $x = -3$, what is $y$?'
          answer: 1
          feedback: '$y = -3 + 4 = 1$.'
      explanation: 'The points of intersection are $(2, 6)$ and $(-3, 1)$. Check one in the curve: $2^2 + 2(2) - 2 = 6$ ✓.'
  which-equation:
    label: 'Think about it'
    reveal:
      prompt: 'Once you know the $x$-values, you can substitute into either equation to find $y$. Why is the **line** usually the better choice?'
      answer: 'It is quicker and safer: no squaring. With a circle it matters even more — $x^2 + y^2 = 25$ with $x = 4$ gives $y = \pm 3$, and you would have to check which sign is on the line. The line gives exactly one $y$ for each $x$.'
  expand:
    label: 'Spot the mistake'
    question:
      type: mcq
      prompt: 'Solving $x^2 + y^2 = 25$ and $y = 2x - 5$, Mali writes $x^2 + (2x - 5)^2 = 25$ and then $x^2 + 4x - 10x - 10x + 25 = 25$. What is wrong?'
      options:
        - { id: a, text: '$(2x)^2$ is $4x^2$, not $4x$' }
        - { id: b, text: 'The middle terms should be $+10x$' }
        - { id: c, text: 'The $25$ should be $-25$' }
        - { id: d, text: 'Nothing — it is correct' }
      answer: a
      explanation: '$(2x - 5)^2 = 4x^2 - 20x + 25$. So $x^2 + 4x^2 - 20x + 25 = 25$, giving $5x^2 - 20x = 0$, $5x(x - 4) = 0$, $x = 0$ or $x = 4$: the points $(0, -5)$ and $(4, 3)$. Write the square out as two brackets if it helps.'
  circle:
    label: 'Your turn'
    question:
      type: steps
      prompt: 'Solve $x^2 + y^2 = 13$ and $x + y = 5$ simultaneously.'
      steps:
        - kind: mcq
          prompt: 'First make $y$ the subject of the linear equation.'
          options:
            - { id: a, text: '$y = 5 - x$' }
            - { id: b, text: '$y = x - 5$' }
            - { id: c, text: '$y = 5 + x$' }
          answer: a
          feedback: 'Subtract $x$ from both sides.'
        - kind: mcq
          prompt: 'Substitute and simplify. Which equation do you get?'
          options:
            - { id: a, text: '$x^2 - 5x + 6 = 0$' }
            - { id: b, text: '$x^2 + 5x + 6 = 0$' }
            - { id: c, text: '$2x^2 - 12 = 0$' }
          answer: a
          feedback: '$x^2 + (5 - x)^2 = 13 \Rightarrow 2x^2 - 10x + 25 = 13 \Rightarrow 2x^2 - 10x + 12 = 0$. Divide by 2.'
        - kind: numeric
          prompt: 'The smaller solution is $x = 2$. What is the larger one?'
          answer: 3
          feedback: '$(x - 2)(x - 3) = 0$.'
        - kind: mcq
          prompt: 'So the points of intersection are …'
          options:
            - { id: a, text: '$(2, 3)$ and $(3, 2)$' }
            - { id: b, text: '$(2, 2)$ and $(3, 3)$' }
            - { id: c, text: '$(2, -3)$ and $(3, -2)$' }
          answer: a
          feedback: '$y = 5 - 2 = 3$ and $y = 5 - 3 = 2$. Check: $4 + 9 = 13$ ✓.'
      explanation: '$y = 5 - x$ gives $x^2 - 5x + 6 = 0$, so $x = 2$ or $3$, and the points are $(2, 3)$ and $(3, 2)$.'
keyRules:
  - title: 'The method'
    body: '1. Make $y$ the subject of the linear equation (if it is not already). 2. Set the two equations equal, or substitute, to get **one** equation in $x$. 3. Rearrange to $ax^2 + bx + c = 0$. 4. Solve — usually by factorising. 5. Substitute each $x$ back into the **linear** equation to find $y$. 6. Write the answers as coordinates.'
  - title: 'The discriminant counts the points'
    formula: 'b^2 - 4ac > 0:\ 2 \text{ points} \qquad b^2 - 4ac = 0:\ 1 \text{ point (tangent)} \qquad b^2 - 4ac < 0:\ \text{none}'
    body: 'Work it out from the combined equation before you try to factorise. If it is negative, there is nothing to find. If it is a perfect square (1, 4, 9, 16, 25, …) the equation will factorise.'
  - title: 'Lines and circles'
    body: 'For $x^2 + y^2 = r^2$, substitute the line into the circle. Expand the squared bracket in full: $(2x - 5)^2 = (2x - 5)(2x - 5) = 4x^2 - 20x + 25$.'
  - title: 'Give pairs of values'
    body: 'Each $x$ has its own $y$. Write them as coordinates, $(3, 5)$ and $(-2, 0)$, not as four loose numbers.'
workedExamples:
  - title: 'A line and a parabola'
    problem: 'Solve $y = x + 1$ and $y = x^2 - 5$ simultaneously.'
    steps:
      - explain: 'Both are equal to $y$, so set them equal.'
        maths: 'x^2 - 5 = x + 1'
      - explain: 'Rearrange to $= 0$.'
        maths: 'x^2 - x - 6 = 0 \qquad a = 1,\ b = -1,\ c = -6'
      - explain: 'Check the discriminant.'
        maths: 'b^2 - 4ac = (-1)^2 - 4(1)(-6) = 25 > 0 \;\Rightarrow\; 2\text{ points}'
      - explain: 'Factorise and solve.'
        maths: '(x - 3)(x + 2) = 0 \;\Rightarrow\; x = 3 \text{ or } x = -2'
      - explain: 'Substitute into the line, $y = x + 1$.'
        maths: 'x = 3:\ y = 4 \qquad x = -2:\ y = -1'
    answer: '$(3, 4)$ and $(-2, -1)$'
  - title: 'When $a$ is not 1'
    problem: 'Solve $y = 3x - 2$ and $y = 2x^2 + x - 6$ simultaneously.'
    steps:
      - explain: 'Set equal and rearrange.'
        maths: '2x^2 + x - 6 = 3x - 2 \;\Rightarrow\; 2x^2 - 2x - 4 = 0'
      - explain: 'Discriminant.'
        maths: '(-2)^2 - 4(2)(-4) = 4 + 32 = 36 > 0'
      - explain: 'Divide by 2, then factorise.'
        maths: 'x^2 - x - 2 = 0 \;\Rightarrow\; (x - 2)(x + 1) = 0'
      - explain: 'Substitute into $y = 3x - 2$.'
        maths: 'x = 2:\ y = 4 \qquad x = -1:\ y = -5'
    answer: '$(2, 4)$ and $(-1, -5)$'
  - title: 'A line and a circle'
    problem: 'Solve $x^2 + y^2 = 10$ and $y = x + 2$ simultaneously.'
    steps:
      - explain: 'Substitute the line into the circle.'
        maths: 'x^2 + (x + 2)^2 = 10'
      - explain: 'Expand the bracket in full: $(x + 2)^2 = x^2 + 4x + 4$.'
        maths: '2x^2 + 4x + 4 = 10 \;\Rightarrow\; 2x^2 + 4x - 6 = 0'
      - explain: 'Divide by 2 and factorise.'
        maths: 'x^2 + 2x - 3 = 0 \;\Rightarrow\; (x + 3)(x - 1) = 0'
      - explain: 'Substitute into $y = x + 2$.'
        maths: 'x = 1:\ y = 3 \qquad x = -3:\ y = -1'
    answer: '$(1, 3)$ and $(-3, -1)$'
  - title: 'A tangent'
    problem: 'Show that the line $y = 2x - 1$ is a tangent to $y = x^2$, and find where it touches.'
    steps:
      - explain: 'Set equal and rearrange.'
        maths: 'x^2 = 2x - 1 \;\Rightarrow\; x^2 - 2x + 1 = 0'
      - explain: 'The discriminant is zero, so there is exactly one point: the line is a tangent.'
        maths: '(-2)^2 - 4(1)(1) = 0'
      - explain: 'Solve: a repeated root.'
        maths: '(x - 1)^2 = 0 \;\Rightarrow\; x = 1, \quad y = 2(1) - 1 = 1'
    answer: 'It touches at $(1, 1)$.'
practice: quadratics-05
---

[[activity: predict]]

## Why we get a quadratic

Two **linear** equations make two straight lines, which cross at most once. Now one of
the equations is a curve — a parabola $y = ax^2 + bx + c$ or a circle $x^2 + y^2 = r^2$.
The points where the line meets the curve satisfy **both** equations, and combining
them gives a **quadratic** — which is why there can be two answers.

[[activity: explore]]

## The discriminant tells you how many

Once you have the combined equation $ax^2 + bx + c = 0$, the **discriminant**
$b^2 - 4ac$ predicts what will happen before you solve anything:

| $b^2 - 4ac$ | Points of intersection | Picture |
| --- | --- | --- |
| positive | 2 | the line cuts through the curve |
| zero | 1 | the line just touches — a **tangent** |
| negative | 0 | the line misses the curve |

[[activity: count]]

## Solving: a line and a parabola

When both equations start with $y =$, set them equal. Collect everything on one side,
check the discriminant, factorise, and then **substitute back** to find each $y$.

[[activity: solve]]

[[activity: which-equation]]

## A line and a circle

A circle with centre $(0, 0)$ and radius $r$ has equation $x^2 + y^2 = r^2$. Make $y$ the
subject of the linear equation, substitute it into the circle, and expand carefully — the
squared bracket is where most marks are lost.

[[activity: expand]]

[[activity: circle]]
