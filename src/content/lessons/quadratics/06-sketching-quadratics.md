---
title: Sketching Quadratic Graphs
topic: quadratics
order: 6
minutes: 60
difficulty: challenge
summary: 'Sketch any parabola without a table of values: find where it crosses the axes, decide its shape, and complete the square to find the turning point — then check it sits on the line of symmetry.'
objectives:
  - 'Find where a quadratic crosses the $x$-axis (put $y = 0$) and the $y$-axis (put $x = 0$)'
  - 'Decide whether the graph is ∪ or ∩ from the sign of the $x^2$ term'
  - 'Complete the square, $y = (x + a)^2 + b$, and read off the turning point $(-a, b)$'
  - 'Draw a sketch as a smooth, symmetrical curve with every key point labelled'
  - 'Recognise a curve with no roots, using the discriminant or the completed square'
  - 'Stretch: sketch ∩ curves, complete the square when the $x^2$ term is not 1, and find an equation from a sketch'
activities:
  warm-up:
    label: 'Warm-up'
    question:
      type: match
      prompt: 'This is the example from class, $y = x^2 - 4x + 3$. Match each feature of its graph to its value.'
      left:
        - { id: y, text: '$y$-intercept' }
        - { id: r, text: 'Roots' }
        - { id: s, text: 'Shape' }
        - { id: t, text: 'Turning point' }
      right:
        - { id: y, text: '$(0, 3)$' }
        - { id: r, text: '$x = 1$ and $x = 3$' }
        - { id: s, text: '∪ (positive $x^2$)' }
        - { id: t, text: '$(2, -1)$' }
      solution: { y: y, r: r, s: s, t: t }
      explanation: 'Put $x = 0$: $y = 3$. Put $y = 0$: $(x - 1)(x - 3) = 0$. The $x^2$ is positive, so ∪. And $x^2 - 4x + 3 = (x - 2)^2 - 1$, so the turning point is $(2, -1)$ — in class this last step was written as $(x - 2)^2 - 1$ but the point itself was never stated. Always finish with the coordinates.'
  explore:
    label: 'Try it'
    visual:
      widget: vertex-form
      title: 'Move the curve with the completed square'
      caption: 'This starts on $y = (x - 2)^2 - 1$, the class example. Slide $a$ and watch the turning point move the **opposite** way: $(x - 2)^2$ puts it at $x = +2$. Slide $b$ and it moves up and down by exactly $b$. Then try to make the class curves $y = x^2 + 2x - 5$ and $y = x^2 + 2x - 24$ — what are $a$ and $b$?'
      config: { start: { p: -2, q: -1, s: 1 }, qMin: -9, qMax: 9 }
  drill:
    label: 'Quick-fire'
    question:
      type: drill
      prompt: 'Complete the square: type the missing number $b$ in $(x + a)^2 + b$. Halve the $x$ coefficient, square it, and take it away.'
      durationSec: 120
      count: 8
      pool:
        - { id: d1, prompt: '$x^2 + 6x + 1 = (x + 3)^2 + \; ?$', accept: ['-8'] }
        - { id: d2, prompt: '$x^2 - 4x + 7 = (x - 2)^2 + \; ?$', accept: ['3'] }
        - { id: d3, prompt: '$x^2 + 2x - 5 = (x + 1)^2 + \; ?$', accept: ['-6'] }
        - { id: d4, prompt: '$x^2 - 10x + 20 = (x - 5)^2 + \; ?$', accept: ['-5'] }
        - { id: d5, prompt: '$x^2 + 8x + 16 = (x + 4)^2 + \; ?$', accept: ['0'] }
        - { id: d6, prompt: '$x^2 - 6x + 2 = (x - 3)^2 + \; ?$', accept: ['-7'] }
        - { id: d7, prompt: '$x^2 + 4x + 9 = (x + 2)^2 + \; ?$', accept: ['5'] }
        - { id: d8, prompt: '$x^2 + 2x - 24 = (x + 1)^2 + \; ?$', accept: ['-25'] }
        - { id: d9, prompt: '$x^2 + 12x + 30 = (x + 6)^2 + \; ?$', accept: ['-6'] }
        - { id: d10, prompt: '$x^2 - 8x + 3 = (x - 4)^2 + \; ?$', accept: ['-13'] }
      explanation: 'Each time: $b = c - \left(\frac{\text{coefficient of } x}{2}\right)^2$. For example $x^2 + 6x + 1$: half of 6 is 3, $3^2 = 9$, and $1 - 9 = -8$.'
  complete:
    label: 'Quick check'
    question:
      type: fill-blank
      prompt: 'Complete the square, then write down the turning point.'
      text: '$x^2 + 8x + 5 = (x +$ [[a]] $)^2 -$ [[b]]     so the turning point of $y = x^2 + 8x + 5$ is $($[[c]]$,$ [[d]]$)$'
      blanks:
        - { id: a, accept: ['4'], size: 3 }
        - { id: b, accept: ['11'], size: 3 }
        - { id: c, accept: ['-4'], size: 3 }
        - { id: d, accept: ['-11'], size: 3 }
      hints: ['Half of 8 is 4, and $4^2 = 16$.', 'The bracket says $+4$, so the turning point is at $x = -4$.']
      explanation: '$x^2 + 8x + 5 = (x + 4)^2 - 16 + 5 = (x + 4)^2 - 11$. The turning point is $(-4, -11)$: the sign **inside** the bracket flips, the number **outside** does not.'
  sketch-steps:
    label: 'Your turn'
    question:
      type: steps
      prompt: 'Use the four steps from class to sketch $y = x^2 - 6x + 5$.'
      steps:
        - kind: mcq
          prompt: '① Put $y = 0$ and factorise. Where does the curve cross the $x$-axis?'
          options:
            - { id: a, text: '$x = 1$ and $x = 5$' }
            - { id: b, text: '$x = -1$ and $x = -5$' }
            - { id: c, text: '$x = 2$ and $x = 3$' }
          answer: a
          feedback: '$x^2 - 6x + 5 = (x - 1)(x - 5)$, so $x = 1$ or $x = 5$.'
        - kind: numeric
          prompt: '② Put $x = 0$. Where does it cross the $y$-axis? Give the $y$-value.'
          answer: 5
          feedback: '$y = 0 - 0 + 5 = 5$, so $(0, 5)$.'
        - kind: mcq
          prompt: '③ Which shape is it?'
          options:
            - { id: a, text: '∪ — the $x^2$ is positive' }
            - { id: b, text: '∩ — the $x^2$ is positive' }
          answer: a
        - kind: numeric
          prompt: '④ Complete the square: $x^2 - 6x + 5 = (x - 3)^2 + b$. What is $b$?'
          answer: -4
          feedback: '$(x - 3)^2 = x^2 - 6x + 9$, and $5 - 9 = -4$.'
        - kind: mcq
          prompt: 'So the turning point is …'
          options:
            - { id: a, text: '$(3, -4)$, a minimum' }
            - { id: b, text: '$(-3, -4)$, a minimum' }
            - { id: c, text: '$(3, -4)$, a maximum' }
          answer: a
          feedback: 'The bracket says $-3$, so $x = +3$. And check: 3 is exactly halfway between the roots 1 and 5 ✓.'
      explanation: 'Roots $x = 1$ and $x = 5$; $y$-intercept $(0, 5)$; ∪ shape; minimum turning point $(3, -4)$, halfway between the roots. Draw a smooth ∪ through all four points and label each one.'
  build:
    label: 'Try it'
    question:
      type: manipulable
      widget: sketch-builder
      prompt: 'This is the second class example, $y = x^2 + 2x - 24 = (x + 6)(x - 4) = (x + 1)^2 - 25$. Drag the points to build its sketch: both roots **R**, the $y$-intercept **Y** and the turning point **T**. Watch what happens to the curve if **T** is not halfway between the roots.'
      config: { hideGhost: true, xMin: -8, xMax: 6, yMin: -28, yMax: 8, yStep: 4, xSnap: 0.5, ySnap: 1, start: { r1: -3, r2: 2, yi: -10, vx: -4, vy: -18, lo: -3, hi: 2 } }
      target: { lo: -6, hi: 4, yi: -24, vx: -1, vy: -25 }
      explanation: 'Roots $-6$ and $4$, $y$-intercept $(0, -24)$ and turning point $(-1, -25)$. The turning point is directly below $x = -1$, exactly halfway between $-6$ and $4$, and only just below the $y$-intercept — so the bottom of the curve is very close to the $y$-axis.'
  mistake:
    label: 'Spot the mistake'
    question:
      type: mcq
      prompt: 'Sam sketches $y = x^2 + 2x - 24$. He marks the roots at $-6$ and $4$, the $y$-intercept at $-24$, and draws the lowest point of the curve at $x = -2.5$, using two straight lines. What is wrong?'
      options:
        - { id: a, text: 'The turning point must be at $x = -1$, halfway between the roots, and the curve must be smooth' }
        - { id: b, text: 'The $y$-intercept should be at $+24$' }
        - { id: c, text: 'The curve should be ∩ because the constant is negative' }
        - { id: d, text: 'Nothing — a sketch does not need to be accurate' }
      answer: a
      explanation: 'A parabola is symmetrical, so its turning point is exactly halfway between the roots: $\frac{-6 + 4}{2} = -1$. A sketch can be rough, but it must be a smooth ∪, symmetrical, with the key points in the right places and labelled. The constant tells you the $y$-intercept, not the shape.'
  notation:
    label: 'Think about it'
    reveal:
      prompt: 'In class this was written as $y = (x + 1)^2 - 25 = (-1, -25)$. Why is the last "$=$" wrong, and how should it be written?'
      answer: '$y$ is a number that depends on $x$; $(-1, -25)$ is a point. They cannot be equal. Write it as two separate statements: "$y = (x + 1)^2 - 25$" and then "**turning point** $(-1, -25)$". Examiners look for the words and the coordinates.'
  halfway:
    label: 'Think about it'
    reveal:
      prompt: 'The roots of a ∪ curve are $x = -6$ and $x = 4$. Without completing the square, how can you find the $x$-coordinate of the turning point? How would you then find the $y$-coordinate?'
      answer: 'The curve is symmetrical, so the turning point is halfway: $x = \frac{-6 + 4}{2} = -1$. Substitute $x = -1$ into the equation: $(-1)^2 + 2(-1) - 24 = -25$. This is also a quick way to **check** your completed square.'
  no-roots:
    label: 'Your turn'
    question:
      type: steps
      prompt: 'Sketch $y = x^2 + 4x + 7$.'
      steps:
        - kind: numeric
          prompt: 'Start with step ①. Find the discriminant $b^2 - 4ac$.'
          answer: -12
          feedback: '$4^2 - 4(1)(7) = 16 - 28 = -12$.'
        - kind: mcq
          prompt: 'So where does the curve cross the $x$-axis?'
          options:
            - { id: a, text: 'It does not — there are no real roots' }
            - { id: b, text: 'It touches the axis once' }
            - { id: c, text: 'It crosses twice' }
          answer: a
          feedback: 'A negative discriminant means no real roots: the whole curve is above the $x$-axis.'
        - kind: numeric
          prompt: '② The $y$-intercept: what is $y$ when $x = 0$?'
          answer: 7
        - kind: numeric
          prompt: '④ Complete the square: $x^2 + 4x + 7 = (x + 2)^2 + b$. What is $b$?'
          answer: 3
          feedback: '$7 - 4 = 3$, so the turning point is $(-2, 3)$. Its $y$-value is positive — another way to see that a ∪ curve never reaches the $x$-axis.'
      explanation: 'No roots; $y$-intercept $(0, 7)$; ∪; minimum $(-2, 3)$. The completed square tells you everything: $(x + 2)^2$ is never negative, so $y$ is never less than 3.'
  build-no-roots:
    label: 'Try it'
    question:
      type: manipulable
      widget: sketch-builder
      prompt: 'Now build the sketch of $y = x^2 + 4x + 7 = (x + 2)^2 + 3$. There are no roots, so only the $y$-intercept **Y** and the turning point **T** need placing.'
      config: { hideGhost: true, roots: false, xMin: -6, xMax: 4, yMin: -2, yMax: 12, yStep: 2, xSnap: 0.5, ySnap: 1, start: { yi: 2, vx: 1, vy: 6 } }
      target: { yi: 7, vx: -2, vy: 3 }
      explanation: '$y$-intercept $(0, 7)$ and minimum $(-2, 3)$. The other side of the curve passes through $(-4, 7)$, the mirror image of the $y$-intercept in the line $x = -2$.'
  cap:
    label: 'Your turn'
    question:
      type: steps
      prompt: 'Sketch $y = -x^2 + 2x + 8$. The $x^2$ is negative this time.'
      steps:
        - kind: mcq
          prompt: '③ First, the shape.'
          options:
            - { id: a, text: '∩, with a maximum point' }
            - { id: b, text: '∪, with a minimum point' }
          answer: a
          feedback: 'A negative $x^2$ term turns the curve upside down.'
        - kind: mcq
          prompt: '① Put $y = 0$. Take out $-1$: $-(x^2 - 2x - 8) = 0$. The roots are …'
          options:
            - { id: a, text: '$x = -2$ and $x = 4$' }
            - { id: b, text: '$x = 2$ and $x = -4$' }
            - { id: c, text: '$x = -1$ and $x = 8$' }
          answer: a
          feedback: '$x^2 - 2x - 8 = (x - 4)(x + 2)$.'
        - kind: numeric
          prompt: '② The $y$-intercept?'
          answer: 8
        - kind: numeric
          prompt: 'The turning point is halfway between the roots. What is its $x$-coordinate?'
          answer: 1
          feedback: '$\frac{-2 + 4}{2} = 1$.'
        - kind: numeric
          prompt: 'Substitute to find its $y$-coordinate.'
          answer: 9
          feedback: '$-(1)^2 + 2(1) + 8 = 9$. So the maximum is $(1, 9)$. Completed square: $y = -(x - 1)^2 + 9$.'
      explanation: '∩ shape; roots $x = -2$ and $x = 4$; $y$-intercept $(0, 8)$; maximum turning point $(1, 9)$. In completed-square form, $y = -(x - 1)^2 + 9$.'
  match-tp:
    label: 'Quick check'
    question:
      type: match
      prompt: 'Match each curve to its turning point.'
      left:
        - { id: a, text: '$y = (x - 3)^2 + 2$' }
        - { id: b, text: '$y = (x + 3)^2 - 2$' }
        - { id: c, text: '$y = -(x - 3)^2 + 2$' }
        - { id: d, text: '$y = x^2 - 2$' }
      right:
        - { id: a, text: 'minimum $(3, 2)$' }
        - { id: b, text: 'minimum $(-3, -2)$' }
        - { id: c, text: 'maximum $(3, 2)$' }
        - { id: d, text: 'minimum $(0, -2)$' }
      solution: { a: a, b: b, c: c, d: d }
      explanation: 'Flip the sign inside the bracket; keep the number outside. A minus in front of the bracket makes it a maximum. $y = x^2 - 2$ is $(x + 0)^2 - 2$.'
  stretch-a:
    label: 'Stretch'
    question:
      type: steps
      prompt: 'Find the turning point of $y = 2x^2 - 8x + 3$ by completing the square.'
      steps:
        - kind: mcq
          prompt: 'Take the 2 out of the first two terms only.'
          options:
            - { id: a, text: '$2(x^2 - 4x) + 3$' }
            - { id: b, text: '$2(x^2 - 8x) + 3$' }
            - { id: c, text: '$2(x^2 - 4x + 3)$' }
          answer: a
        - kind: mcq
          prompt: 'Complete the square inside the bracket.'
          options:
            - { id: a, text: '$2[(x - 2)^2 - 4] + 3$' }
            - { id: b, text: '$2[(x - 4)^2 - 16] + 3$' }
            - { id: c, text: '$2(x - 2)^2 - 4 + 3$' }
          answer: a
          feedback: 'The $-4$ is still inside the square bracket, so it gets multiplied by 2 as well.'
        - kind: numeric
          prompt: 'Multiply out: $2(x - 2)^2 + b$. What is $b$?'
          answer: -5
          feedback: '$2 \times (-4) + 3 = -8 + 3 = -5$.'
      explanation: '$y = 2(x - 2)^2 - 5$, so the turning point is $(2, -5)$, a minimum. Check: $2(4) - 16 + 3 = -5$ ✓.'
  stretch-equation:
    label: 'Stretch'
    question:
      type: steps
      prompt: 'A ∪-shaped curve crosses the $x$-axis at $x = -1$ and $x = 5$, and the $y$-axis at $(0, -10)$. Find its equation in the form $y = ax^2 + bx + c$.'
      steps:
        - kind: mcq
          prompt: 'Roots at $-1$ and $5$ mean the equation is …'
          options:
            - { id: a, text: '$y = a(x + 1)(x - 5)$' }
            - { id: b, text: '$y = a(x - 1)(x + 5)$' }
          answer: a
          feedback: '$x = -1$ comes from the bracket $(x + 1)$.'
        - kind: numeric
          prompt: 'Put $x = 0$, $y = -10$. Find $a$.'
          answer: 2
          feedback: '$a(1)(-5) = -10$, so $-5a = -10$ and $a = 2$.'
        - kind: algebraic
          prompt: 'Expand $2(x + 1)(x - 5)$.'
          answer: '2x^2 - 8x - 10'
      explanation: '$y = 2(x + 1)(x - 5) = 2x^2 - 8x - 10$. Without the $a$ you would get $x^2 - 4x - 5$, which crosses the $y$-axis at $-5$, not $-10$ — always check the $y$-intercept.'
  stretch-hence:
    label: 'Stretch'
    question:
      type: mcq
      prompt: '$x^2 - 6x + 11 = (x - 3)^2 + 2$. Which statement is true for **every** value of $x$?'
      options:
        - { id: a, text: '$x^2 - 6x + 11 \geq 2$, so it is always positive' }
        - { id: b, text: '$x^2 - 6x + 11 \geq 3$' }
        - { id: c, text: '$x^2 - 6x + 11$ is negative when $x = 3$' }
        - { id: d, text: '$x^2 - 6x + 11 = 0$ has two solutions' }
      answer: a
      explanation: 'A square is never negative, so $(x - 3)^2 \geq 0$ and $(x - 3)^2 + 2 \geq 2$. The smallest value is 2, when $x = 3$. This is the "hence show it is always positive" exam question.'
keyRules:
  - title: 'The four steps (from class)'
    body: '① **Roots:** put $y = 0$ and solve — factorise, or use the formula. ② **$y$-intercept:** put $x = 0$ (it is just $c$). ③ **Shape:** $+x^2$ gives ∪, $-x^2$ gives ∩. ④ **Turning point:** complete the square.'
  - title: 'Completing the square'
    formula: 'x^2 + bx + c = \left(x + \tfrac{b}{2}\right)^2 - \left(\tfrac{b}{2}\right)^2 + c'
    body: 'Halve the $x$ coefficient for the bracket, then take its square away. In the form $y = (x + a)^2 + b$ the turning point is $(-a, b)$: flip the sign inside the bracket, keep the number outside.'
  - title: 'Symmetry check'
    formula: 'x_{\text{turning point}} = \frac{\text{root}_1 + \text{root}_2}{2}'
    body: 'The turning point is always exactly halfway between the roots. Use it to check your completed square, and to place the bottom of the curve in your sketch.'
  - title: 'How to draw the sketch'
    body: 'A **smooth**, symmetrical curve — never straight lines meeting at a point. Label the roots, the $y$-intercept and the turning point with their coordinates. It does not need to be to scale.'
  - title: 'No roots?'
    body: 'If $b^2 - 4ac < 0$, or the completed square has a positive number on the end of a ∪ curve, the curve never meets the $x$-axis. Sketch it using the $y$-intercept and turning point.'
  - title: 'Exact roots'
    body: 'If it will not factorise, the formula gives surds: for $x^2 + 2x - 5$, $x = \frac{-2 \pm \sqrt{24}}{2} = -1 \pm \sqrt{6}$. Give exact answers on a non-calculator paper; decimals ($1.45$ and $-3.45$) only if asked.'
visual:
  widget: vertex-form
  title: 'Completing the square explorer'
  caption: 'Slide $a$ and $b$ in $y = (x + a)^2 + b$. The red dot is the turning point $(-a, b)$; the dashed line is the line of symmetry. Switch the shape to −1 for a ∩ curve.'
  config: { start: { p: -2, q: -1, s: 1 } }
workedExamples:
  - title: 'The class example: $y = x^2 - 4x + 3$'
    problem: 'Sketch $y = x^2 - 4x + 3$, showing where it crosses the axes and the turning point.'
    steps:
      - explain: '① Roots: put $y = 0$ and factorise.'
        maths: '0 = (x - 1)(x - 3) \;\Rightarrow\; x = 1 \text{ or } x = 3'
      - explain: '② $y$-intercept: put $x = 0$.'
        maths: 'y = 0 - 0 + 3 = 3 \;\Rightarrow\; (0, 3)'
      - explain: '③ Shape: the $x^2$ is positive, so ∪.'
      - explain: '④ Complete the square: half of $-4$ is $-2$, and $(-2)^2 = 4$.'
        maths: 'y = (x - 2)^2 - 4 + 3 = (x - 2)^2 - 1'
      - explain: 'State the turning point, and check it is halfway between 1 and 3.'
        maths: '\text{turning point } (2, -1) \qquad \tfrac{1 + 3}{2} = 2 \;✓'
    answer: 'A smooth ∪ through $(1, 0)$, $(3, 0)$ and $(0, 3)$, with minimum point $(2, -1)$.'
  - title: 'When it will not factorise: $y = x^2 + 2x - 5$'
    problem: 'Sketch $y = x^2 + 2x - 5$. Give the roots exactly.'
    steps:
      - explain: '① Check the discriminant first.'
        maths: 'b^2 - 4ac = 2^2 - 4(1)(-5) = 4 + 20 = 24 > 0'
      - explain: '24 is not a square number, so use the formula, and simplify $\sqrt{24} = 2\sqrt{6}$.'
        maths: 'x = \frac{-2 \pm \sqrt{24}}{2} = \frac{-2 \pm 2\sqrt{6}}{2} = -1 \pm \sqrt{6}'
      - explain: '② $y$-intercept $(0, -5)$. ③ ∪ shape.'
      - explain: '④ Complete the square.'
        maths: 'y = (x + 1)^2 - 1 - 5 = (x + 1)^2 - 6 \;\Rightarrow\; \text{turning point } (-1, -6)'
    answer: 'Roots $x = -1 \pm \sqrt{6}$ (about $1.45$ and $-3.45$), $y$-intercept $(0, -5)$, minimum $(-1, -6)$.'
  - title: 'A ∩ curve: $y = -x^2 - 2x + 3$'
    problem: 'Sketch $y = -x^2 - 2x + 3$.'
    steps:
      - explain: '③ Shape first: the $x^2$ is negative, so ∩, with a maximum.'
      - explain: '① Roots: take out $-1$, then factorise.'
        maths: '-(x^2 + 2x - 3) = -(x + 3)(x - 1) = 0 \;\Rightarrow\; x = -3 \text{ or } x = 1'
      - explain: '② $y$-intercept $(0, 3)$.'
      - explain: '④ Turning point: halfway between the roots is $x = -1$. Substitute.'
        maths: 'y = -(-1)^2 - 2(-1) + 3 = -1 + 2 + 3 = 4'
      - explain: 'In completed-square form this is the same point.'
        maths: 'y = -(x + 1)^2 + 4'
    answer: 'A smooth ∩ through $(-3, 0)$, $(1, 0)$ and $(0, 3)$, with maximum point $(-1, 4)$.'
practice: quadratics-06
---

[[activity: warm-up]]

## The four steps

In class you sketched curves without a table of values. Four facts are enough to fix
the whole curve:

| Step | What to do | What it gives you |
| --- | --- | --- |
| ① | put $y = 0$ and solve | the **roots** — where it crosses the $x$-axis |
| ② | put $x = 0$ | the **$y$-intercept** — always just $c$ |
| ③ | look at the sign of $x^2$ | the **shape**: ∪ or ∩ |
| ④ | complete the square | the **turning point** |

## Completing the square

Writing $y = x^2 + bx + c$ as $y = (x + a)^2 + b$ shows the turning point straight away.
A square is never negative, so $(x + a)^2$ is smallest — zero — when $x = -a$. Then
$y = b$. So the turning point is $(-a, b)$.

[[activity: explore]]

To complete the square: **halve** the coefficient of $x$ to get the number in the bracket,
then **take away its square**.

$$x^2 + 6x + 1 = (x + 3)^2 - 9 + 1 = (x + 3)^2 - 8$$

[[activity: drill]]

[[activity: complete]]

## Putting it together

[[activity: sketch-steps]]

### Drawing the sketch

A sketch does not need a ruler or a scale, but it **does** need to be a smooth,
symmetrical curve with every key point labelled. A parabola is symmetrical about a vertical
line through its turning point, so the turning point sits **exactly halfway** between the roots.

[[activity: build]]

[[activity: mistake]]

[[activity: notation]]

[[activity: halfway]]

## When there are no roots

Some parabolas never reach the $x$-axis. You can tell in two ways: the discriminant
$b^2 - 4ac$ is negative, or — for a ∪ curve — the completed square has a positive number on
the end, so the lowest point is above the axis.

[[activity: no-roots]]

[[activity: build-no-roots]]

## Upside-down curves

When the $x^2$ term is negative the curve is a ∩ with a **maximum** point. Take out $-1$
before you factorise, and use the halfway rule to find the turning point.

[[activity: cap]]

[[activity: match-tp]]

## Stretch: exam-style extensions

### When the $x^2$ term is not 1

Take the number out of the first **two** terms only, complete the square inside the bracket,
then multiply back out.

[[activity: stretch-a]]

### Finding the equation from a sketch

If you know the roots $p$ and $q$, the equation is $y = a(x - p)(x - q)$. Use one more
point — usually the $y$-intercept — to find $a$.

[[activity: stretch-equation]]

### "Hence show that …"

Completing the square also proves facts. Because $(x + a)^2 \geq 0$, the expression
$(x + a)^2 + b$ can never be smaller than $b$.

[[activity: stretch-hence]]
