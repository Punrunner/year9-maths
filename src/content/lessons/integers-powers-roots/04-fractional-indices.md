---
title: Fractional Indices
topic: integers-powers-roots
order: 4
minutes: 30
difficulty: challenge
summary: 'What $a^{\frac{1}{n}}$ and $a^{\frac{m}{n}}$ mean, evaluating them without a calculator — including negative fractional indices — and solving equations with powers.'
objectives:
  - 'Explain why $a^{\frac{1}{2}} = \sqrt{a}$ and $a^{\frac{1}{3}} = \sqrt[3]{a}$ using the index laws'
  - 'Evaluate $a^{\frac{m}{n}}$ by taking the root first, then the power'
  - 'Evaluate negative fractional indices such as $8^{-\frac{2}{3}}$'
  - 'Solve equations such as $2^x = \frac{1}{32}$ and $x^{\frac{3}{2}} = 27$'
activities:
  predict:
    label: 'Predict first'
    question:
      type: mcq
      prompt: 'Using the rule $a^m \times a^n = a^{m+n}$: what must $9^{\frac{1}{2}}$ be, if $9^{\frac{1}{2}} \times 9^{\frac{1}{2}} = 9^1$?'
      options:
        - { id: a, text: '$3$' }
        - { id: b, text: '$4.5$' }
        - { id: c, text: '$81$' }
        - { id: d, text: '$\frac{1}{9}$' }
      answer: a
      hints: ['Which number multiplied by itself gives 9?']
      explanation: 'A number times itself gives 9, so $9^{\frac{1}{2}} = \sqrt{9} = 3$. Halving the base (4.5) is the most common wrong answer — the index is not a multiplier.'
  unit-fractions:
    label: 'Quick check'
    question:
      type: fill-blank
      prompt: 'Evaluate.'
      text: '$49^{\frac{1}{2}} =$ [[a]]     $64^{\frac{1}{3}} =$ [[b]]     $81^{\frac{1}{4}} =$ [[c]]     $(-125)^{\frac{1}{3}} =$ [[d]]'
      blanks:
        - { id: a, accept: ['7'], size: 4 }
        - { id: b, accept: ['4'], size: 4 }
        - { id: c, accept: ['3'], size: 4 }
        - { id: d, accept: ['-5', '−5'], size: 4 }
      explanation: '$\sqrt{49} = 7$, $\sqrt[3]{64} = 4$, $\sqrt[4]{81} = 3$ (since $3^4 = 81$), $\sqrt[3]{-125} = -5$.'
  root-first:
    label: 'Your turn'
    question:
      type: steps
      prompt: 'Evaluate $32^{\frac{3}{5}}$.'
      steps:
        - kind: numeric
          prompt: 'The denominator is the root. Find $\sqrt[5]{32}$.'
          answer: 2
          hint: 'Which number to the power 5 is 32?'
          feedback: '$2^5 = 32$, so $\sqrt[5]{32} = 2$.'
        - kind: numeric
          prompt: 'The numerator is the power. Find $2^3$.'
          answer: 8
          feedback: '$2^3 = 8$.'
      explanation: '$32^{\frac{3}{5}} = (\sqrt[5]{32})^3 = 2^3 = 8$. Root first keeps the numbers small.'
  negative:
    label: 'Quick check'
    question:
      type: numeric
      prompt: 'Evaluate $16^{-\frac{3}{4}}$. Give your answer as a fraction.'
      answer: '1/8'
      hints: ['The minus sign means "one over".', '$16^{\frac{3}{4}} = (\sqrt[4]{16})^3 = 2^3$.']
      explanation: '$16^{-\frac{3}{4}} = \frac{1}{16^{\frac{3}{4}}} = \frac{1}{(\sqrt[4]{16})^3} = \frac{1}{2^3} = \frac{1}{8}$.'
  fraction-base:
    label: 'Your turn'
    question:
      type: numeric
      prompt: 'Evaluate $\left(\frac{27}{8}\right)^{-\frac{2}{3}}$. Give your answer as a fraction.'
      answer: '4/9'
      hints: ['A negative index flips the fraction: $\left(\frac{8}{27}\right)^{\frac{2}{3}}$.', 'Cube root of top and bottom, then square.']
      explanation: '$\left(\frac{27}{8}\right)^{-\frac{2}{3}} = \left(\frac{8}{27}\right)^{\frac{2}{3}} = \left(\frac{2}{3}\right)^2 = \frac{4}{9}$.'
  solve:
    label: 'Spot the mistake'
    question:
      type: mcq
      prompt: 'Solve $x^{\frac{2}{3}} = 25$. Kiet says $x = 25^{\frac{2}{3}}$. What should he have done?'
      options:
        - { id: a, text: 'Raise both sides to the power $\frac{3}{2}$: $x = 25^{\frac{3}{2}} = 125$' }
        - { id: b, text: 'Nothing — $x = 25^{\frac{2}{3}}$' }
        - { id: c, text: 'Multiply both sides by $\frac{3}{2}$: $x = 37.5$' }
        - { id: d, text: 'Square root both sides: $x = 5$' }
      answer: a
      explanation: 'To undo the power $\frac{2}{3}$, raise to its reciprocal $\frac{3}{2}$, because $(x^{\frac{2}{3}})^{\frac{3}{2}} = x^1$. So $x = 25^{\frac{3}{2}} = (\sqrt{25})^3 = 125$. Check: $125^{\frac{2}{3}} = 5^2 = 25$ ✓.'
keyRules:
  - title: 'Unit fraction indices are roots'
    formula: 'a^{\frac{1}{n}} = \sqrt[n]{a}'
    body: 'Because $a^{\frac{1}{n}}$ multiplied by itself $n$ times gives $a^1 = a$.'
  - title: 'General fractional indices'
    formula: 'a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^m'
    body: '**Denominator = root, numerator = power.** Take the root first so the numbers stay small.'
  - title: 'Negative fractional indices'
    formula: 'a^{-\frac{m}{n}} = \frac{1}{a^{\frac{m}{n}}} \qquad \left(\frac{a}{b}\right)^{-n} = \left(\frac{b}{a}\right)^{n}'
    body: 'Deal with the minus sign (flip), the root and the power — in any order, but one at a time.'
  - title: 'Solving equations'
    body: 'To undo a power $\frac{m}{n}$, raise both sides to $\frac{n}{m}$. To solve $2^x = \frac{1}{32}$, write both sides as powers of 2: $2^x = 2^{-5}$, so $x = -5$.'
workedExamples:
  - title: 'Root, then power'
    problem: 'Evaluate $27^{\frac{4}{3}}$.'
    steps:
      - explain: 'The denominator 3 means cube root.'
        maths: '\sqrt[3]{27} = 3'
      - explain: 'The numerator 4 means to the power 4.'
        maths: '3^4 = 81'
    answer: '$81$'
  - title: 'A negative fractional index'
    problem: 'Evaluate $125^{-\frac{2}{3}}$.'
    steps:
      - explain: 'Negative index: one over.'
        maths: '125^{-\frac{2}{3}} = \frac{1}{125^{\frac{2}{3}}}'
      - explain: 'Root then power.'
        maths: '125^{\frac{2}{3}} = (\sqrt[3]{125})^2 = 5^2 = 25'
    answer: '$\frac{1}{25}$'
  - title: 'Solving an exponential equation'
    problem: 'Solve $9^x = 27$.'
    steps:
      - explain: 'Write both sides as powers of 3.'
        maths: '(3^2)^x = 3^3 \;\Rightarrow\; 3^{2x} = 3^3'
      - explain: 'The indices must be equal.'
        maths: '2x = 3'
    answer: '$x = \frac{3}{2}$'
  - title: 'Simplifying with letters'
    problem: 'Simplify $(16x^8)^{\frac{3}{4}}$.'
    steps:
      - explain: 'Apply the power to each factor.'
        maths: '16^{\frac{3}{4}} \times (x^8)^{\frac{3}{4}}'
      - explain: '$16^{\frac{3}{4}} = 2^3 = 8$ and $8 \times \frac{3}{4} = 6$.'
        maths: '= 8x^6'
    answer: '$8x^6$'
practice: integers-04
---

[[activity: predict]]

## Where fractional indices come from

The index laws you already know have to keep working. Since
$a^{\frac{1}{2}} \times a^{\frac{1}{2}} = a^{\frac{1}{2} + \frac{1}{2}} = a^1$, the number
$a^{\frac{1}{2}}$ multiplied by itself gives $a$ — so it must be $\sqrt{a}$. In the same way
$a^{\frac{1}{3}} \times a^{\frac{1}{3}} \times a^{\frac{1}{3}} = a$, so $a^{\frac{1}{3}} = \sqrt[3]{a}$.

[[activity: unit-fractions]]

## Any fraction as an index

Split the fraction using the power law $(a^m)^n = a^{mn}$:

$$a^{\frac{m}{n}} = \left(a^{\frac{1}{n}}\right)^m = \left(\sqrt[n]{a}\right)^m$$

**The denominator is the root; the numerator is the power.** Do the root first:
$8^{\frac{2}{3}} = 2^2 = 4$ is far easier than $\sqrt[3]{64}$.

[[activity: root-first]]

## Negative fractional indices

A negative index still means "one over", so there are three jobs: **flip**, **root**,
**power**. With a fraction as the base, flipping turns it upside down.

[[activity: negative]]

[[activity: fraction-base]]

## Solving equations with indices

Two methods come up again and again:

- **Same base:** write both sides as a power of the same number and compare the indices.
  $4^x = 32 \Rightarrow 2^{2x} = 2^5 \Rightarrow x = 2.5$.
- **Reciprocal power:** to undo $x^{\frac{m}{n}}$, raise both sides to $\frac{n}{m}$.

[[activity: solve]]
