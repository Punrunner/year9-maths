---
title: Calculating with Negative Numbers
topic: integers-powers-roots
order: 1
minutes: 25
difficulty: foundation
summary: 'Adding, subtracting, multiplying and dividing integers — hops on a number line, the two-signs rule, and the sign rules for × and ÷.'
objectives:
  - 'Order integers and compare them using $<$ and $>$'
  - 'Add and subtract integers using a number line'
  - 'Replace two signs next to each other with one'
  - 'Multiply and divide integers using the sign rules'
  - 'Use the order of operations with negative numbers'
activities:
  predict:
    label: 'Before we start'
    question:
      type: mcq
      prompt: 'At 6 am it is $-4\degree$C. By noon it has risen by $9\degree$C. What is the temperature at noon?'
      shuffleOptions: false
      options:
        - { id: a, text: '$-13\degree$C' }
        - { id: b, text: '$-5\degree$C' }
        - { id: c, text: '$5\degree$C' }
        - { id: d, text: '$13\degree$C' }
      answer: c
      hints: ['Picture a thermometer. Start at $-4$ and go up 9.']
      explanation: 'From $-4$, it takes 4 degrees to reach 0, and there are 5 more to go: $-4 + 9 = 5\degree$C. A number line is a thermometer turned on its side.'
  order-check:
    label: 'Quick check'
    question:
      type: order
      prompt: 'Put these in order, **smallest first**.'
      items:
        - { id: a, text: '$-8$' }
        - { id: b, text: '$-3$' }
        - { id: c, text: '$0$' }
        - { id: d, text: '$2$' }
        - { id: e, text: '$-12$' }
      solution: [e, a, b, c, d]
      explanation: 'Further left on the number line means smaller. $-12$ is the furthest left, so it is the smallest — even though 12 looks big.'
  hops:
    label: 'Try it'
    visual:
      widget: integer-hops
      title: 'Hops on a number line'
      caption: 'Start somewhere, choose add or subtract, then choose a number. Try $3 + (-5)$, then $3 - 5$ — the same hops. Now try $3 - (-5)$: subtracting a negative turns you round.'
      config: { start: { a: 3, op: 0, b: -5 } }
  two-signs:
    label: 'Your turn'
    question:
      type: fill-blank
      prompt: 'Replace the two signs with one, then work it out.'
      text: '$7 + (-10) =$ [[a]]     $-2 - (-6) =$ [[b]]     $-5 - 4 =$ [[c]]     $-1 + (-8) =$ [[d]]'
      blanks:
        - { id: a, accept: ['-3', '−3'], size: 5 }
        - { id: b, accept: ['4'], size: 5 }
        - { id: c, accept: ['-9', '−9'], size: 5 }
        - { id: d, accept: ['-9', '−9'], size: 5 }
      hints: ['Same signs next to each other make $+$. Different signs make $-$.']
      explanation: '$7 - 10 = -3$; $-2 + 6 = 4$; $-5 - 4 = -9$; $-1 - 8 = -9$.'
  sign-rules:
    label: 'Quick check'
    question:
      type: sort
      prompt: 'Is each answer **positive** or **negative**? (You do not need to work it out.)'
      groups:
        - id: pos
          text: 'Positive'
          items:
            - { id: a, text: '$-6 \times -3$' }
            - { id: b, text: '$-20 \div -4$' }
            - { id: c, text: '$5 \times 7$' }
            - { id: d, text: '$(-2)^2$' }
        - id: neg
          text: 'Negative'
          items:
            - { id: e, text: '$-6 \times 3$' }
            - { id: f, text: '$20 \div -4$' }
            - { id: g, text: '$-1 \times 9$' }
            - { id: h, text: '$(-2)^3$' }
      explanation: 'Same signs give a positive answer; different signs give a negative one. $(-2)^2 = -2 \times -2 = 4$, but $(-2)^3 = 4 \times -2 = -8$.'
  spot:
    label: 'Spot the mistake'
    question:
      type: mcq
      prompt: 'Sam works out $-3^2$ on a calculator and gets $-9$. Sam''s friend says it should be $9$. Who is right?'
      options:
        - { id: a, text: 'Sam: $-3^2$ means $-(3^2) = -9$' }
        - { id: b, text: 'The friend: a negative squared is always positive' }
        - { id: c, text: 'Neither: it is $-6$' }
      answer: a
      explanation: 'Indices come before the minus sign, so $-3^2 = -(3 \times 3) = -9$. To square negative 3 you need brackets: $(-3)^2 = 9$. Both are fair questions to ask in a test.'
keyRules:
  - title: 'Adding and subtracting'
    body: 'Start at the first number. **Adding** a positive moves right; **subtracting** a positive moves left.'
  - title: 'Two signs together'
    formula: '+\,(+) \to + \qquad -\,(-) \to + \qquad +\,(-) \to - \qquad -\,(+) \to -'
    body: 'Same signs make $+$, different signs make $-$. So $5 - (-3) = 5 + 3 = 8$.'
  - title: 'Multiplying and dividing'
    formula: '(-) \times (-) = + \qquad (-) \times (+) = -'
    body: 'Work out the numbers as normal, then decide the sign: **same signs positive, different signs negative**. The same rule works for $\div$.'
  - title: 'Order of operations'
    body: 'BIDMAS still applies. Put negative numbers in brackets when you substitute them, e.g. $(-4)^2 = 16$.'
workedExamples:
  - title: 'Adding a negative'
    problem: 'Work out $6 + (-9)$.'
    steps:
      - explain: '$+$ and $-$ are different signs, so they make $-$.'
        maths: '6 + (-9) = 6 - 9'
      - explain: 'Start at 6 and move 9 left.'
        maths: '6 - 9 = -3'
    answer: '$-3$'
  - title: 'Subtracting a negative'
    problem: 'Work out $-4 - (-7)$.'
    steps:
      - explain: 'Two minus signs make a plus.'
        maths: '-4 - (-7) = -4 + 7'
      - explain: 'Start at $-4$ and move 7 right.'
        maths: '-4 + 7 = 3'
    answer: '$3$'
  - title: 'Multiplying and dividing'
    problem: 'Work out (a) $-8 \times 5$ (b) $-36 \div -4$.'
    steps:
      - explain: '(a) $8 \times 5 = 40$. The signs are different, so the answer is negative.'
        maths: '-8 \times 5 = -40'
      - explain: '(b) $36 \div 4 = 9$. The signs are the same, so the answer is positive.'
        maths: '-36 \div -4 = 9'
    answer: '(a) $-40$ (b) $9$'
  - title: 'Order of operations'
    problem: 'Work out $-2 \times (5 - 8) + (-3)^2$.'
    steps:
      - explain: 'Brackets first.'
        maths: '5 - 8 = -3'
      - explain: 'Indices next: $(-3)^2 = -3 \times -3$.'
        maths: '(-3)^2 = 9'
      - explain: 'Multiply: $-2 \times -3$, same signs.'
        maths: '-2 \times -3 = 6'
      - explain: 'Finally add.'
        maths: '6 + 9 = 15'
    answer: '$15$'
practice: integers-04
---

[[activity: predict]]

**Integers** are the whole numbers and their negatives: $\dots, -3, -2, -1, 0, 1, 2, 3, \dots$
You meet negative numbers whenever something can go below zero — temperatures, bank
balances, floors below ground, heights below sea level.

## Ordering integers

On a number line, numbers get **bigger to the right** and **smaller to the left**. So
$-2 > -7$, because $-2$ is further right. A handy check: $-2\degree$C is warmer than
$-7\degree$C.

[[activity: order-check]]

## Adding and subtracting: hops on a number line

Start at the first number. Adding a positive number means hopping **right**;
subtracting a positive number means hopping **left**.

What about adding or subtracting a *negative* number? Adding a negative takes you
**left** — like adding a debt. Subtracting a negative turns you around and takes you
**right** — like having a debt cancelled.

[[activity: hops]]

## The two-signs shortcut

When two signs sit next to each other, replace them with one:

| Signs | Become | Example |
| --- | --- | --- |
| $+\,(+)$ | $+$ | $4 + (+2) = 4 + 2 = 6$ |
| $-\,(-)$ | $+$ | $4 - (-2) = 4 + 2 = 6$ |
| $+\,(-)$ | $-$ | $4 + (-2) = 4 - 2 = 2$ |
| $-\,(+)$ | $-$ | $4 - (+2) = 4 - 2 = 2$ |

**Same signs make plus, different signs make minus.**

[[activity: two-signs]]

## Multiplying and dividing

Look at this pattern. Each answer goes up by 3 as we count down, so it has to carry on
past zero:

| $3 \times -3$ | $2 \times -3$ | $1 \times -3$ | $0 \times -3$ | $-1 \times -3$ | $-2 \times -3$ |
| --- | --- | --- | --- | --- | --- |
| $-9$ | $-6$ | $-3$ | $0$ | $3$ | $6$ |

That is why a negative times a negative is **positive**. The rule for $\times$ and $\div$:
work out the numbers, then **same signs → positive, different signs → negative**.

[[activity: sign-rules]]

## Order of operations with negatives

BIDMAS works exactly the same. The one trap is squaring: brackets decide what gets
squared.

[[activity: spot]]
