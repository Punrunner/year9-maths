---
title: Recurring Decimals to Fractions — the Algebraic Method
topic: fractions-decimals
order: 5
minutes: 30
difficulty: challenge
summary: 'Converting any recurring decimal to a fraction by multiplying by 10, 100 or 1000 and subtracting — including decimals where only part recurs — and writing it up as a proof.'
objectives:
  - 'Convert a recurring decimal such as $0.\dot{3}\dot{6}$ to a fraction using algebra'
  - 'Choose the right power of 10 from the length of the repeating block'
  - 'Convert decimals where only part recurs, such as $0.1\dot{6}$ and $2.0\dot{4}\dot{5}$'
  - 'Show that a recurring decimal equals a given fraction, in full exam-style working'
activities:
  predict:
    label: 'Predict first'
    question:
      type: truefalse
      prompt: '$0.\dot{9}$ (that is, $0.999\ldots$ forever) is **exactly** equal to $1$.'
      answer: true
      hints: ['Let $x = 0.\dot{9}$. What is $10x - x$?']
      explanation: 'True. If $x = 0.999\ldots$ then $10x = 9.999\ldots$, and subtracting gives $9x = 9$, so $x = 1$. This lesson''s method proves it.'
  which-power:
    label: 'Quick check'
    question:
      type: match
      prompt: 'Match each decimal to the multiplier that lines up its repeating block.'
      left:
        - { id: l1, text: '$0.\dot{7}$' }
        - { id: l2, text: '$0.\dot{4}\dot{5}$' }
        - { id: l3, text: '$0.\dot{1}2\dot{3}$' }
      right:
        - { id: r1, text: 'Multiply by $10$' }
        - { id: r2, text: 'Multiply by $100$' }
        - { id: r3, text: 'Multiply by $1000$' }
      solution: { l1: r1, l2: r2, l3: r3 }
      explanation: 'The number of digits in the repeating block decides the power of 10: one digit → 10, two → 100, three → 1000. Then the repeating tails match exactly and cancel.'
  two-digit:
    label: 'Your turn'
    question:
      type: steps
      prompt: 'Convert $0.\dot{3}\dot{6}$ to a fraction in its simplest form.'
      scenario: 'Let $x = 0.363636\ldots$'
      steps:
        - kind: mcq
          prompt: 'Which multiple of $x$ has the same repeating tail?'
          options:
            - { id: a, text: '$100x = 36.3636\ldots$' }
            - { id: b, text: '$10x = 3.6363\ldots$' }
          answer: a
          feedback: 'A two-digit block needs $100x$, so the tails line up: $.3636\ldots$ in both.'
        - kind: numeric
          prompt: '$100x - x = 99x =$ ?'
          answer: 36
          feedback: '$36.3636\ldots - 0.3636\ldots = 36$.'
        - kind: numeric
          prompt: 'So $x$ as a fraction in its simplest form is …'
          answer: '4/11'
          feedback: '$x = \frac{36}{99} = \frac{4}{11}$.'
      explanation: '$100x - x = 36$, so $x = \frac{36}{99} = \frac{4}{11}$.'
  mixed-recurring:
    label: 'Your turn'
    question:
      type: steps
      prompt: 'Convert $0.1\dot{6}$ to a fraction. Only the 6 recurs.'
      scenario: 'Let $x = 0.1666\ldots$'
      steps:
        - kind: numeric
          prompt: 'Multiply to move the non-recurring 1 past the point: $10x =$ ?'
          answer: 1.6666
          tolerance: 0.001
          feedback: '$10x = 1.666\ldots$'
        - kind: numeric
          prompt: 'Multiply once more to shift one repeating block: $100x =$ ?'
          answer: 16.6666
          tolerance: 0.001
          feedback: '$100x = 16.666\ldots$'
        - kind: numeric
          prompt: '$100x - 10x = 90x =$ ?'
          answer: 15
          feedback: '$16.666\ldots - 1.666\ldots = 15$.'
        - kind: numeric
          prompt: 'So $x =$ ? (simplest form)'
          answer: '1/6'
          feedback: '$\frac{15}{90} = \frac{1}{6}$.'
      explanation: 'Subtract two multiples whose tails match: $100x - 10x = 15$, so $x = \frac{15}{90} = \frac{1}{6}$.'
  proof:
    label: 'Exam style'
    question:
      type: order
      prompt: 'Put the lines of this proof that $0.\dot{2}\dot{7} = \frac{3}{11}$ in order.'
      items:
        - { id: a, text: 'Let $x = 0.272727\ldots$' }
        - { id: b, text: '$100x = 27.272727\ldots$' }
        - { id: c, text: '$100x - x = 27$, so $99x = 27$' }
        - { id: d, text: '$x = \frac{27}{99} = \frac{3}{11}$' }
      solution: [a, b, c, d]
      explanation: 'Name the decimal, write a multiple with the same tail, subtract, then solve and simplify. Examiners want to see the recurring digits written out and the subtraction — not just the answer.'
keyRules:
  - title: 'The method'
    body: '1. Let $x$ equal the decimal, written out with several repeats. 2. Multiply by $10^n$, where $n$ is the length of the repeating block. 3. Subtract so the recurring tails cancel. 4. Solve for $x$ and simplify.'
  - title: 'When only part recurs'
    body: 'First multiply so the non-recurring digits are before the point (e.g. $10x$ for $0.1\dot{6}$), then by $10^n$ more (e.g. $100x$). Subtract those two.'
  - title: 'A shortcut to check'
    formula: '0.\dot{a}\dot{b} = \frac{ab}{99} \qquad 0.\dot{a}b\dot{c} = \frac{abc}{999}'
    body: 'Useful for checking, but exam questions that say "show that" or "prove" need the algebra.'
workedExamples:
  - title: 'A single recurring digit'
    problem: 'Write $0.\dot{5}$ as a fraction.'
    steps:
      - explain: 'Let $x$ be the decimal and multiply by 10.'
        maths: 'x = 0.555\ldots, \qquad 10x = 5.555\ldots'
      - explain: 'Subtract.'
        maths: '9x = 5'
    answer: '$\frac{5}{9}$'
  - title: 'A three-digit block'
    problem: 'Write $0.\dot{1}0\dot{8}$ as a fraction in its simplest form.'
    steps:
      - explain: 'The block 108 has three digits, so multiply by 1000.'
        maths: 'x = 0.108108\ldots, \qquad 1000x = 108.108108\ldots'
      - explain: 'Subtract.'
        maths: '999x = 108'
      - explain: 'Simplify: the HCF of 108 and 999 is 27.'
        maths: 'x = \frac{108}{999} = \frac{4}{37}'
    answer: '$\frac{4}{37}$'
  - title: 'Part recurring, bigger than 1'
    problem: 'Write $2.0\dot{4}\dot{5}$ as a mixed number.'
    steps:
      - explain: 'Deal with the whole number at the end. Let $x = 0.0\dot{4}\dot{5} = 0.04545\ldots$'
        maths: '10x = 0.4545\ldots, \qquad 1000x = 45.4545\ldots'
      - explain: 'Subtract the two with matching tails.'
        maths: '990x = 45 \;\Rightarrow\; x = \frac{45}{990} = \frac{1}{22}'
      - explain: 'Add the 2 back.'
        maths: '2.0\dot{4}\dot{5} = 2\tfrac{1}{22}'
    answer: '$2\frac{1}{22}$'
practice: fractions-05
---

[[activity: predict]]

## Why multiplying and subtracting works

Every recurring decimal is a fraction, and algebra finds it. The trick is to make two
numbers with **exactly the same infinite tail**, then subtract so the tail disappears.

$$\begin{aligned} x &= 0.4444\ldots \\ 10x &= 4.4444\ldots \\ 10x - x = 9x &= 4 \quad\Rightarrow\quad x = \tfrac{4}{9} \end{aligned}$$

[[activity: which-power]]

## Longer repeating blocks

If two digits repeat, multiply by $100$; if three, by $1000$. The tails only line up when
you shift by a **whole block**.

[[activity: two-digit]]

## When only part of the decimal recurs

In $0.1\dot{6}$ the 1 does not repeat. Multiply first to move it in front of the decimal
point, then multiply again by the block length. Subtract those two — both have tail
$.666\ldots$

[[activity: mixed-recurring]]

## Writing it as a proof

"Show that $0.\dot{2}\dot{7} = \frac{3}{11}$" needs every step. Converting $\frac{3}{11}$
to a decimal on a calculator does **not** count.

[[activity: proof]]
