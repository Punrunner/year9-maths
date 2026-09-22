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
keyRules:
  - title: 'The number families'
    body: '**Natural numbers** are the counting numbers $1, 2, 3, \dots$ **Whole numbers** add 0: $0, 1, 2, 3, \dots$ **Integers** add the negatives: $\dots, -2, -1, 0, 1, 2, \dots$'
  - title: 'Rational numbers'
    formula: '\text{rational} = \frac{p}{q}, \quad p, q \text{ integers}, \; q \neq 0'
    body: 'A number is rational if you can write it as one integer divided by another. That includes every integer ($7 = \frac{7}{1}$), every fraction, every terminating decimal and every recurring decimal.'
  - title: 'Irrational numbers'
    body: 'Irrational numbers **cannot** be written as a fraction. As decimals they go on forever with no repeating pattern. In Year 9 they are: $\pi$ and multiples of $\pi$; square roots of whole numbers that are not square numbers, like $\sqrt{2}$; cube roots of whole numbers that are not cube numbers, like $\sqrt[3]{6}$.'
  - title: 'Surds'
    body: 'A root that is irrational, such as $\sqrt{2}$, is called a **surd**. Writing $\sqrt{2}$ is exact; writing $1.414$ is rounded. That is why we often leave answers in surd form.'
visual:
  widget: number-line
  title: 'Where does √2 live?'
  caption: 'Drag the marker to where you think $\sqrt{2}$ sits. It is between 1 and 2 because $1^2 = 1$ and $2^2 = 4$. Its decimal, $1.41421\dots$, never ends and never repeats — that is what makes it irrational.'
  config:
    min: 0
    max: 3
    step: 0.01
    majorStep: 0.5
    label: 'Value'
workedExamples:
  - title: 'Rational or irrational?'
    problem: 'Decide whether each number is rational or irrational: $0.3,\ \sqrt{16},\ \frac{9}{17},\ \sqrt{7},\ 0.\dot{8},\ \frac{\pi}{2}$'
    steps:
      - explain: '$0.3$ is a terminating decimal, so it can be written as a fraction.'
        maths: '0.3 = \frac{3}{10} \quad \text{rational}'
      - explain: '16 is a square number, so its square root is an integer.'
        maths: '\sqrt{16} = 4 = \frac{4}{1} \quad \text{rational}'
      - explain: '$\frac{9}{17}$ is already an integer divided by an integer.'
        maths: '\frac{9}{17} \quad \text{rational}'
      - explain: '7 is not a square number, so $\sqrt{7}$ is a never-ending, non-repeating decimal.'
        maths: '\sqrt{7} = 2.6457513\dots \quad \text{irrational}'
      - explain: 'A recurring decimal can always be written as a fraction.'
        maths: '0.\dot{8} = \frac{8}{9} \quad \text{rational}'
      - explain: 'Any multiple or fraction of $\pi$ is still irrational.'
        maths: '\frac{\pi}{2} = 1.5707963\dots \quad \text{irrational}'
    answer: 'Rational: $0.3,\ \sqrt{16},\ \frac{9}{17},\ 0.\dot{8}$. Irrational: $\sqrt{7},\ \frac{\pi}{2}$.'
  - title: 'Sorting into number families'
    problem: 'From the list $102,\ -7,\ 15,\ \frac{5}{13},\ 0$ write down the natural numbers, the whole numbers, the integers and the rational numbers.'
    steps:
      - explain: 'Natural numbers are the positive counting numbers — no zero, no negatives, no fractions.'
        maths: '102,\ 15'
      - explain: 'Whole numbers are the natural numbers plus 0.'
        maths: '102,\ 15,\ 0'
      - explain: 'Integers also include the negative whole numbers.'
        maths: '102,\ -7,\ 15,\ 0'
      - explain: 'Every integer is rational, and so is the fraction. So everything in the list is rational.'
        maths: '102,\ -7,\ 15,\ \frac{5}{13},\ 0'
    answer: 'Each family sits inside the next: natural ⊂ whole ⊂ integer ⊂ rational.'
practice: integers-01
---

## Why this matters

Engineers, builders and scientists work with square roots all the time — the length
of a diagonal brace, the side of a square room with a given area. Some of those
roots come out as tidy whole numbers. Most do not. Knowing *which kind* of number
you are dealing with tells you whether an answer is exact or has been rounded.

## The families fit inside each other

Think of the number families as a set of nesting boxes:

| Family | What it contains | Examples |
| --- | --- | --- |
| Natural | Counting numbers | $1, 2, 3, 50$ |
| Whole | Natural numbers **and 0** | $0, 1, 2, 3$ |
| Integer | Whole numbers **and their negatives** | $-3, 0, 7$ |
| Rational | Anything that is one integer over another | $-\frac{7}{8},\ 1\frac{2}{3},\ 0.21,\ 0.\dot{3}$ |

Every natural number is a whole number, every whole number is an integer, and every
integer is rational. It never works the other way round: $\frac{1}{2}$ is rational
but it is **not** an integer.

## Why each kind of number is rational

| Kind of number | Example | Written as a fraction |
| --- | --- | --- |
| Fractions and mixed numbers | $1\frac{2}{3}$ | $\frac{5}{3}$ |
| Integers, including 0 | $-3$ | $\frac{-3}{1}$ |
| Terminating decimals | $-0.125$ | $\frac{-1}{8}$ |
| Recurring decimals | $0.\dot{3}$ | $\frac{1}{3}$ |
| Square roots of square numbers | $\sqrt{4}$ | $\frac{2}{1}$ |
| Cube roots of cube numbers | $\sqrt[3]{-125}$ | $\frac{-5}{1}$ |

## The irrational numbers

An irrational number's decimal goes on forever **without repeating**, so it can never
be written as a fraction.

- $\pi = 3.141592\dots$ — and any multiple of it, such as $5\pi$ or $\frac{\pi}{2}$.
- $\sqrt{2} = 1.41421\dots$ — the square root of any whole number that is **not** a
  square number.
- $\sqrt[3]{6} = 1.81712\dots$ — the cube root of any whole number that is **not** a
  cube number.

> **Watch out.** $\frac{22}{7}$ is a handy approximation for $\pi$, but it is *not*
> equal to $\pi$. $\frac{22}{7}$ is rational; $\pi$ is not.

## Roots of negative numbers

You can take the cube root of a negative number: $\sqrt[3]{-8} = -2$, because
$(-2)^3 = -8$. So $\sqrt[3]{-8}$ is rational.

You **cannot** take the square root of a negative number and get a real answer, because
any number squared is positive. Numbers like $\sqrt{-5}$ belong to a different system
called **imaginary numbers**. They are neither rational nor irrational, and you
will not need them until much later.
