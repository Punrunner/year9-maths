---
title: Bounds in Calculations
topic: place-value
order: 4
minutes: 35
difficulty: challenge
summary: 'Which bounds to use for the largest and smallest possible answer — adding, subtracting, multiplying and dividing measurements — and giving an answer to a suitable accuracy.'
objectives:
  - 'Find the upper and lower bounds of a sum, difference, product and quotient'
  - 'Explain why the upper bound of $a - b$ uses the lower bound of $b$'
  - 'Use bounds in formulas such as speed, density and area'
  - 'Decide an appropriate degree of accuracy by comparing the bounds of an answer'
activities:
  predict:
    label: 'Predict first'
    question:
      type: mcq
      prompt: 'A car travels $100$ km (to the nearest km) in $2$ hours (to the nearest 0.1 h). To get the **greatest** possible average speed, which values should you use?'
      options:
        - { id: a, text: 'Largest distance, smallest time' }
        - { id: b, text: 'Largest distance, largest time' }
        - { id: c, text: 'Smallest distance, smallest time' }
        - { id: d, text: 'Smallest distance, largest time' }
      answer: a
      hints: ['Speed $= \frac{\text{distance}}{\text{time}}$. What makes a fraction as big as possible?']
      explanation: 'A fraction is largest with the biggest top and the smallest bottom: $\frac{100.5}{1.95} = 51.5$ km/h. Using both upper bounds is the common mistake.'
  choose:
    label: 'Quick check'
    question:
      type: sort
      prompt: '$a$ and $b$ are rounded measurements. To find the **upper bound** of each calculation, do you need the upper or the lower bound of $b$?'
      groups:
        - id: ub
          text: 'Upper bound of $b$'
          items:
            - { id: a, text: '$a + b$' }
            - { id: b, text: '$a \times b$' }
        - id: lb
          text: 'Lower bound of $b$'
          items:
            - { id: c, text: '$a - b$' }
            - { id: d, text: '$\frac{a}{b}$' }
      explanation: 'To make $a - b$ as big as possible, take away as little as possible. To make $\frac{a}{b}$ as big as possible, divide by as little as possible. Adding and multiplying are simpler: upper with upper.'
  difference:
    label: 'Your turn'
    question:
      type: steps
      prompt: 'A plank is $3.4$ m long, to the nearest 0.1 m. A piece $85$ cm long, to the nearest cm, is cut off. Find the bounds of the length left, in cm.'
      steps:
        - kind: numeric
          prompt: 'Upper bound of the plank, in cm.'
          answer: 345
          feedback: '$3.4$ m to the nearest 0.1 m: $3.35 \le L < 3.45$ m, so UB $= 345$ cm.'
        - kind: numeric
          prompt: 'Lower bound of the piece cut off, in cm.'
          answer: 84.5
          feedback: '$84.5 \le p < 85.5$ cm.'
        - kind: numeric
          prompt: 'Upper bound of the length left.'
          answer: 260.5
          unit: 'cm'
          feedback: '$345 - 84.5 = 260.5$ cm.'
        - kind: numeric
          prompt: 'Lower bound of the length left.'
          answer: 249.5
          unit: 'cm'
          feedback: '$335 - 85.5 = 249.5$ cm.'
      explanation: 'Upper bound of a difference = UB − LB; lower bound = LB − UB. The length left is between $249.5$ and $260.5$ cm.'
  accuracy:
    label: 'Think about it'
    reveal:
      prompt: 'The bounds of an answer are $6.2371$ and $6.2849$. To how many significant figures can you give the answer and be sure it is correct?'
      answer: 'Round both bounds: to 2 s.f. both give $6.2$; to 3 s.f. they give $6.24$ and $6.28$, which disagree. So the answer is $6.2$ (2 s.f.) — the most accurate value that both bounds agree on.'
  density-trap:
    label: 'Spot the mistake'
    question:
      type: mcq
      prompt: 'Mass $= 240$ g (nearest 10 g), volume $= 30\ \text{cm}^3$ (nearest $\text{cm}^3$). Kai finds the **lower** bound of the density as $\frac{235}{29.5}$. What should it be?'
      options:
        - { id: a, text: '$\frac{235}{30.5} = 7.70\ \text{g/cm}^3$' }
        - { id: b, text: '$\frac{235}{29.5} = 7.97\ \text{g/cm}^3$' }
        - { id: c, text: '$\frac{245}{30.5} = 8.03\ \text{g/cm}^3$' }
        - { id: d, text: '$\frac{230}{29} = 7.93\ \text{g/cm}^3$' }
      answer: a
      explanation: 'The smallest density needs the smallest mass and the **largest** volume: $\frac{235}{30.5} = 7.70\ \text{g/cm}^3$ (3 s.f.). Kai divided by the lower bound, which makes the answer bigger.'
keyRules:
  - title: 'Adding and multiplying'
    formula: '\text{UB}(a + b) = \text{UB}_a + \text{UB}_b \qquad \text{UB}(ab) = \text{UB}_a \times \text{UB}_b'
    body: 'Upper with upper, lower with lower (for positive measurements).'
  - title: 'Subtracting'
    formula: '\text{UB}(a - b) = \text{UB}_a - \text{LB}_b \qquad \text{LB}(a - b) = \text{LB}_a - \text{UB}_b'
    body: 'To make a difference as big as possible, take away as little as possible.'
  - title: 'Dividing'
    formula: '\text{UB}\left(\frac{a}{b}\right) = \frac{\text{UB}_a}{\text{LB}_b} \qquad \text{LB}\left(\frac{a}{b}\right) = \frac{\text{LB}_a}{\text{UB}_b}'
    body: 'This covers speed, density, pressure and any "per" measure.'
  - title: 'A suitable degree of accuracy'
    body: 'Round the upper and lower bounds of the answer to fewer and fewer significant figures until they agree. That common value is the answer you can be sure of.'
workedExamples:
  - title: 'Area of a rectangle'
    problem: 'A rectangle is $8.4$ cm by $5.2$ cm, both to 1 d.p. Find the upper bound of its area.'
    steps:
      - explain: 'Upper bounds of the sides.'
        maths: '8.45\ \text{cm}, \quad 5.25\ \text{cm}'
      - explain: 'Multiply upper by upper.'
        maths: '8.45 \times 5.25 = 44.3625'
    answer: '$44.3625\ \text{cm}^2$'
  - title: 'Speed'
    problem: 'A runner covers $400$ m, to the nearest metre, in $52.3$ s, to the nearest 0.1 s. Find the lower bound of her average speed.'
    steps:
      - explain: 'Smallest distance, largest time.'
        maths: '\text{LB}_d = 399.5, \quad \text{UB}_t = 52.35'
      - explain: 'Divide.'
        maths: '\frac{399.5}{52.35} = 7.6313\ldots'
    answer: '$7.63$ m/s (3 s.f.)'
  - title: 'Finding a suitable accuracy'
    problem: '$x = 3.67$ and $y = 1.24$, both to 2 d.p. Find $\frac{x}{y}$ to a suitable degree of accuracy.'
    steps:
      - explain: 'Upper bound: largest over smallest.'
        maths: '\frac{3.675}{1.235} = 2.9757\ldots'
      - explain: 'Lower bound: smallest over largest.'
        maths: '\frac{3.665}{1.245} = 2.9437\ldots'
      - explain: 'To 2 s.f. both round to $2.9$ and $3.0$ — they disagree. To 1 s.f. both round to $3$.'
        maths: '\frac{x}{y} = 3 \ (1\text{ s.f.})'
    answer: '$3$ (1 s.f.)'
practice: place-value-04
---

[[activity: predict]]

## Which bound goes where?

For every calculation, ask: **what makes the answer as big as possible?** Then do the
opposite for the smallest possible answer.

| To make it as big as possible | Use |
| --- | --- |
| $a + b$ | $\text{UB}_a + \text{UB}_b$ |
| $a - b$ | $\text{UB}_a - \text{LB}_b$ |
| $a \times b$ | $\text{UB}_a \times \text{UB}_b$ |
| $a \div b$ | $\text{UB}_a \div \text{LB}_b$ |

[[activity: choose]]

## Subtracting

The biggest difference comes from the biggest starting value and the **smallest** amount
taken away. Watch the units, too — convert before you find the bounds.

[[activity: difference]]

## How accurate is my answer?

Measurements that are only rounded give an answer that is only known within a range. Find
the upper and lower bounds of the answer, then round both to fewer and fewer significant
figures until they **agree**.

[[activity: accuracy]]

## Bounds in formulas

In a formula, work out what each measurement does to the answer. In a fraction, a bigger
**numerator** increases it; a bigger **denominator** decreases it.

[[activity: density-trap]]
