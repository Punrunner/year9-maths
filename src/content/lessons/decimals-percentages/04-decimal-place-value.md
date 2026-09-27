---
title: Decimal Place Value, Ordering and Rounding
topic: decimals-percentages
order: 1
minutes: 25
difficulty: foundation
summary: 'What each digit after the point is worth, ordering decimals, rounding to decimal places, and adding and subtracting with the points lined up.'
objectives:
  - 'Name the value of each digit in a decimal: tenths, hundredths, thousandths'
  - 'Order decimals by comparing place by place'
  - 'Round a decimal to a given number of decimal places'
  - 'Add and subtract decimals by lining up the decimal points'
activities:
  predict:
    label: 'Before we start'
    question:
      type: mcq
      prompt: 'Which is bigger: $0.4$ or $0.35$?'
      shuffleOptions: false
      options:
        - { id: a, text: '$0.4$' }
        - { id: b, text: '$0.35$' }
        - { id: c, text: 'They are equal' }
      answer: a
      hints: ['Write $0.4$ as $0.40$.']
      explanation: '$0.4 = 0.40$, which is 40 hundredths; $0.35$ is 35 hundredths. So $0.4$ is bigger. "35 is bigger than 4" is the trap — the digits after the point are not whole numbers.'
  place:
    label: 'Try it'
    visual:
      widget: number-line
      title: 'Where does it go?'
      caption: 'Drag the marker to $0.35$, then to $0.4$. Each small step is one hundredth. Where would $0.05$ go? And $0.5$?'
      config: { min: 0, max: 1, step: 0.01, majorStep: 0.1, label: 'Marker at', start: { x: 0.2 } }
  digit-value:
    label: 'Quick check'
    question:
      type: match
      prompt: 'In the number $4.683$, what is each digit worth?'
      left:
        - { id: l1, text: 'the 4' }
        - { id: l2, text: 'the 6' }
        - { id: l3, text: 'the 8' }
        - { id: l4, text: 'the 3' }
      right:
        - { id: r1, text: '4 ones' }
        - { id: r2, text: '6 tenths ($0.6$)' }
        - { id: r3, text: '8 hundredths ($0.08$)' }
        - { id: r4, text: '3 thousandths ($0.003$)' }
      solution: { l1: r1, l2: r2, l3: r3, l4: r4 }
      explanation: 'Reading right from the point: tenths, hundredths, thousandths. So $4.683 = 4 + 0.6 + 0.08 + 0.003$.'
  order-check:
    label: 'Your turn'
    question:
      type: order
      prompt: 'Put these in order, **smallest first**.'
      items:
        - { id: a, text: '$0.305$' }
        - { id: b, text: '$0.35$' }
        - { id: c, text: '$0.3$' }
        - { id: d, text: '$0.053$' }
        - { id: e, text: '$0.53$' }
      solution: [d, c, a, b, e]
      hints: ['Give them all three decimal places: $0.305, 0.350, 0.300, 0.053, 0.530$.']
      explanation: 'With three decimal places: $0.053 < 0.300 < 0.305 < 0.350 < 0.530$.'
  rounding:
    label: 'Quick check'
    question:
      type: fill-blank
      prompt: 'Round each number.'
      text: '$3.476$ to 1 d.p. $=$ [[a]]     $12.849$ to 2 d.p. $=$ [[b]]     $0.0962$ to 2 d.p. $=$ [[c]]     $5.97$ to 1 d.p. $=$ [[d]]'
      blanks:
        - { id: a, accept: ['3.5'], size: 6 }
        - { id: b, accept: ['12.85'], size: 6 }
        - { id: c, accept: ['0.10', '0.1'], size: 6 }
        - { id: d, accept: ['6.0', '6'], size: 6 }
      hints: ['Look at the digit just after where you are cutting. 5 or more rounds up.']
      explanation: '$3.4|76 \to 3.5$; $12.84|9 \to 12.85$; $0.09|62 \to 0.10$ (the 9 rolls over); $5.9|7 \to 6.0$. Writing $6.0$ shows it was rounded to 1 d.p.'
  line-up:
    label: 'Spot the mistake'
    question:
      type: mcq
      prompt: 'Kai works out $4.5 + 2.37$ by writing the numbers underneath each other like whole numbers and gets $2.82$. What went wrong?'
      options:
        - { id: a, text: 'He lined up the right-hand digits instead of the decimal points; the answer is $6.87$' }
        - { id: b, text: 'Nothing — the answer is $2.82$' }
        - { id: c, text: 'He should have rounded first; the answer is $7$' }
      answer: a
      explanation: 'Line up the **points**: $4.50 + 2.37 = 6.87$. A quick estimate ($4 + 2 = 6$) shows $2.82$ can''t be right.'
keyRules:
  - title: 'Place value after the point'
    formula: '0.1 = \tfrac{1}{10} \qquad 0.01 = \tfrac{1}{100} \qquad 0.001 = \tfrac{1}{1000}'
    body: 'The first digit after the point is **tenths**, then **hundredths**, then **thousandths**.'
  - title: 'Ordering'
    body: 'Give every number the same number of decimal places by adding zeros on the end, then compare. Adding zeros at the end of a decimal doesn''t change its value: $0.4 = 0.40 = 0.400$.'
  - title: 'Rounding to decimal places'
    body: 'Count the decimal places you need, then look at the **next** digit. $5$ or more: round up. $4$ or less: leave it. Keep any zeros you need: $2.996 \to 3.00$ to 2 d.p.'
  - title: 'Adding and subtracting'
    body: '**Line up the decimal points.** Fill gaps with zeros, then work as with whole numbers. The point in the answer goes straight below.'
workedExamples:
  - title: 'Ordering decimals'
    problem: 'Write $0.7$, $0.07$, $0.707$, $0.77$ in order, smallest first.'
    steps:
      - explain: 'Give them all three decimal places.'
        maths: '0.700,\ 0.070,\ 0.707,\ 0.770'
      - explain: 'Now compare as if they were whole numbers of thousandths: 700, 70, 707, 770.'
        maths: '0.070 < 0.700 < 0.707 < 0.770'
    answer: '$0.07,\ 0.7,\ 0.707,\ 0.77$'
  - title: 'Rounding'
    problem: 'Round $8.3649$ to 2 decimal places.'
    steps:
      - explain: 'Cut after the second decimal place.'
        maths: '8.36\,|\,49'
      - explain: 'The next digit is 4, so leave the 6 as it is.'
        maths: '8.36'
    answer: '$8.36$'
  - title: 'Subtracting decimals'
    problem: 'Work out $12 - 3.65$.'
    steps:
      - explain: 'Write 12 as 12.00 so the points and places line up.'
        maths: '12.00 - 3.65'
      - explain: 'Subtract column by column, exchanging as normal.'
        maths: '= 8.35'
      - explain: 'Check by adding back.'
        maths: '8.35 + 3.65 = 12.00\ \checkmark'
    answer: '$8.35$'
practice: decimals-04
---

[[activity: predict]]

## What the digits are worth

Each place is **ten times smaller** than the one to its left. After the ones come
tenths, hundredths and thousandths:

| Tens | Ones | . | Tenths | Hundredths | Thousandths |
| --- | --- | --- | --- | --- | --- |
| 2 | 4 | . | 6 | 8 | 3 |

So $24.683 = 20 + 4 + \frac{6}{10} + \frac{8}{100} + \frac{3}{1000}$.

[[activity: place]]

[[activity: digit-value]]

## Ordering decimals

Compare the **whole-number part** first. If that is the same, compare the tenths, then
the hundredths, and so on. The easy way: add zeros so every number has the same number
of decimal places, then compare them like whole numbers.

[[activity: order-check]]

## Rounding to decimal places

"To 2 decimal places" (2 d.p.) means keep two digits after the point. Draw a line after
them and look at the next digit: **5 or more rounds up**, 4 or less stays the same.

$$7.2\underline{8}\,|\,3 \to 7.28 \qquad 7.2\underline{8}\,|\,6 \to 7.29$$

[[activity: rounding]]

## Adding and subtracting

**Line up the decimal points**, fill any gaps with zeros, and work exactly as with whole
numbers. Always estimate first so you can spot a point in the wrong place.

[[activity: line-up]]
