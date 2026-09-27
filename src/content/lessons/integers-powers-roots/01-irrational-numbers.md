---
title: Rational and Irrational Numbers
topic: integers-powers-roots
order: 1
minutes: 20
difficulty: core
summary: 'Sorting numbers into natural, whole, integer, rational and irrational — and knowing why each one belongs where it does.'
objectives:
  - 'Tell natural numbers, whole numbers and integers apart'
  - 'Explain why a number is rational by writing it as a fraction'
  - 'Recognise the three kinds of irrational number you meet in Year 9'
  - 'Know what a surd is and why we often leave answers in surd form'
activities:
  first-sort:
    label: 'Before we start'
    question:
      type: sort
      prompt: 'No rules yet — go with your gut. Which of these numbers could you write **exactly** as one whole number divided by another?'
      groups:
        - id: frac
          text: 'Can be written as a fraction'
          items:
            - { id: a, text: '$0.3$' }
            - { id: b, text: '$-7$' }
            - { id: c, text: '$\sqrt{16}$' }
            - { id: d, text: '$0.\dot{8}$' }
        - id: nofrac
          text: 'Cannot'
          items:
            - { id: e, text: '$\sqrt{2}$' }
            - { id: f, text: '$\pi$' }
            - { id: g, text: '$\sqrt[3]{6}$' }
      hints:
        - '$0.3 = \frac{3}{10}$ and $-7 = \frac{-7}{1}$.'
        - '$0.\dot{8}$ goes on forever — but it repeats. Does that stop it being a fraction?'
      explanation: 'The left-hand group are all **rational**: $\frac{3}{10}$, $\frac{-7}{1}$, $\frac{4}{1}$ and $\frac{8}{9}$. The right-hand group are **irrational** — their decimals never end and never repeat, so no fraction is exactly equal to them. If you got $0.\dot{8}$ wrong, you are in good company; read on.'
  pi-predict:
    label: 'Predict'
    question:
      type: truefalse
      prompt: 'Your calculator says $\frac{22}{7} = 3.142857\dots$ and $\pi = 3.141592\dots$ Your friend says: *"$\frac{22}{7}$ **is** $\pi$ — people use it all the time."*'
      labels: ['Friend is right', 'Friend is wrong']
      answer: false
      explanation: 'They already differ in the third decimal place. $\frac{22}{7}$ is a handy *approximation*, but it is rational and $\pi$ is not — so they can never be equal.'
  root-two:
    label: 'Try it'
    visual:
      widget: number-line
      title: 'Where does √2 live?'
      caption: 'Drag the marker to where you think $\sqrt{2}$ sits. $1^2 = 1$ and $2^2 = 4$, so it must be between 1 and 2 — but where exactly? Its decimal, $1.41421\dots$, never ends and never repeats.'
      config: { min: 0, max: 3, step: 0.01, majorStep: 0.5, label: 'Value', start: { x: 0.5 } }
  negative-root:
    label: 'Think about it'
    reveal:
      prompt: 'You can find $\sqrt[3]{-8}$ — it is $-2$. So why does your calculator give an **error** for $\sqrt{-4}$?'
      answer: '$(-2)^3 = -2 \times -2 \times -2 = -8$, so a cube root of a negative number is fine. But *any* number squared is positive or zero: $2^2 = 4$ and $(-2)^2 = 4$ too. No ordinary number squares to $-4$. Numbers like $\sqrt{-4}$ belong to a different system called **imaginary numbers** — they are neither rational nor irrational, and you will not need them until much later.'
  family-check:
    label: 'Quick check'
    question:
      type: mcq
      prompt: 'Which is the **smallest** family that $-3$ belongs to?'
      options:
        - { id: a, text: 'Integers' }
        - { id: b, text: 'Natural numbers' }
        - { id: c, text: 'Whole numbers' }
        - { id: d, text: 'Irrational numbers' }
      answer: a
      explanation: 'Natural and whole numbers are never negative, so $-3$ first appears among the **integers**. (It is rational too, but "integer" is the smaller, more precise family.)'
keyRules:
  - title: 'The number families'
    body: '**Natural numbers** are the counting numbers $1, 2, 3, \dots$ **Whole numbers** add 0. **Integers** add the negatives: $\dots, -2, -1, 0, 1, 2, \dots$'
  - title: 'Rational numbers'
    formula: '\text{rational} = \frac{p}{q}, \quad p, q \text{ integers}, \; q \neq 0'
    body: 'Every integer, fraction, terminating decimal and recurring decimal is rational.'
  - title: 'Irrational numbers'
    body: '$\pi$ and its multiples; square roots of whole numbers that are not square numbers, like $\sqrt{2}$; cube roots of whole numbers that are not cube numbers, like $\sqrt[3]{6}$.'
  - title: 'Surds'
    body: 'An irrational root such as $\sqrt{2}$ is a **surd**. Writing $\sqrt{2}$ is exact; writing $1.414$ is rounded.'
workedExamples:
  - title: 'Rational or irrational?'
    problem: 'Decide whether each number is rational or irrational: $0.3,\ \sqrt{16},\ \frac{9}{17},\ \sqrt{7},\ 0.\dot{8},\ \frac{\pi}{2}$'
    steps:
      - explain: '$0.3$ is a terminating decimal.'
        maths: '0.3 = \frac{3}{10} \quad \text{rational}'
      - explain: '16 is a square number.'
        maths: '\sqrt{16} = 4 = \frac{4}{1} \quad \text{rational}'
      - explain: '$\frac{9}{17}$ is already one integer over another.'
        maths: '\frac{9}{17} \quad \text{rational}'
      - explain: '7 is not a square number.'
        maths: '\sqrt{7} = 2.6457513\dots \quad \text{irrational}'
      - explain: 'A recurring decimal can always be written as a fraction.'
        maths: '0.\dot{8} = \frac{8}{9} \quad \text{rational}'
      - explain: 'Any fraction of $\pi$ is still irrational.'
        maths: '\frac{\pi}{2} = 1.5707963\dots \quad \text{irrational}'
    answer: 'Rational: $0.3,\ \sqrt{16},\ \frac{9}{17},\ 0.\dot{8}$. Irrational: $\sqrt{7},\ \frac{\pi}{2}$.'
practice: integers-01
---

Engineers work out square roots constantly — the length of a diagonal brace, the side
of a square room with a given floor area. Sometimes the answer is a tidy whole number.
Usually it is not, and it matters which kind you have got: one is exact, the other has
been rounded.

[[activity: first-sort]]

## What you were really sorting

A number is **rational** if you can write it as one integer divided by another. Look
back at the left-hand group — every one of them hides a fraction:

$$0.3 = \frac{3}{10} \qquad -7 = \frac{-7}{1} \qquad \sqrt{16} = \frac{4}{1} \qquad 0.\dot{8} = \frac{8}{9}$$

That last one surprises people. "Goes on forever" is **not** enough to make a number
irrational. $0.888\dots$ goes on forever but it *repeats*, and any decimal that repeats can
be turned into a fraction (you will see how in the recurring decimals lesson).

An **irrational** number's decimal goes on forever *and never settles into a pattern*.
That is what $\pi$, $\sqrt{2}$ and $\sqrt[3]{6}$ do.

[[activity: pi-predict]]

## Three places irrational numbers come from

In Year 9 you only meet three kinds:

1. **$\pi$** — and anything made from it, such as $5\pi$ or $\frac{\pi}{2}$.
2. **Square roots of non-square whole numbers** — $\sqrt{2}$, $\sqrt{3}$, $\sqrt{10}$ …
   If the number *is* a square ($\sqrt{25}$), the root is a whole number and rational.
3. **Cube roots of non-cube whole numbers** — $\sqrt[3]{2}$, $\sqrt[3]{6}$ …
   but $\sqrt[3]{27} = 3$ and $\sqrt[3]{-125} = -5$ are rational.

[[activity: root-two]]

An irrational root like $\sqrt{2}$ is called a **surd**. Leaving an answer as $\sqrt{2}$ keeps
it exact; writing $1.41$ throws a little accuracy away. That is why exam questions often
say *"leave your answer in surd form"*.

[[activity: negative-root]]

## Families inside families

The number families nest inside each other like boxes:

| Family | Contains | Examples |
| --- | --- | --- |
| Natural | the counting numbers | $1, 2, 50$ |
| Whole | natural numbers **and 0** | $0, 1, 2$ |
| Integer | whole numbers **and their negatives** | $-3, 0, 7$ |
| Rational | anything that is one integer over another | $-\frac{7}{8},\ 1\frac{2}{3},\ 0.21$ |

Every natural number is whole, every whole number is an integer, every integer is rational —
but never the other way round: $\frac{1}{2}$ is rational without being an integer.

[[activity: family-check]]
