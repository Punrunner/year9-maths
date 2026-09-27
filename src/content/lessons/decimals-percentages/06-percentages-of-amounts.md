---
title: Percentages of Amounts
topic: decimals-percentages
order: 3
minutes: 30
difficulty: foundation
summary: 'Finding a percentage of an amount with and without a calculator, writing one amount as a percentage of another, and increasing or decreasing by a percentage.'
objectives:
  - 'Find 10%, 5%, 1% and build other percentages from them, without a calculator'
  - 'Find any percentage of an amount with a calculator'
  - 'Write one quantity as a percentage of another'
  - 'Increase or decrease an amount by a percentage'
  - 'Find a percentage change'
activities:
  predict:
    label: 'Before we start'
    question:
      type: mcq
      prompt: 'A jacket costs 800 baht. It is in a "$15\%$ off" sale. Without a calculator, how much do you save?'
      options:
        - { id: a, text: '120 baht' }
        - { id: b, text: '150 baht' }
        - { id: c, text: '80 baht' }
        - { id: d, text: '15 baht' }
      answer: a
      hints: ['What is $10\%$ of 800? What is $5\%$?']
      explanation: '$10\%$ of 800 is 80, and $5\%$ is half of that, 40. So $15\% = 80 + 40 = 120$ baht. This "build it from 10%" method is the heart of this lesson.'
  bar:
    label: 'Try it'
    visual:
      widget: percent-bar
      title: 'Percentages of 800 baht'
      caption: 'Slide to $10\%$, $50\%$, $25\%$ and $15\%$. Watch the readout build every percentage from $1\%$. Then go past $100\%$ — what does $115\%$ mean?'
      config: { total: 800, unit: 'baht', max: 150, step: 5, start: { p: 10 } }
  build:
    label: 'Quick check'
    question:
      type: fill-blank
      prompt: 'Find these percentages of 240 baht without a calculator.'
      text: '$10\% =$ [[a]] baht     $5\% =$ [[b]] baht     $1\% =$ [[c]] baht     $35\% =$ [[d]] baht     $12\% =$ [[e]] baht'
      blanks:
        - { id: a, accept: ['24'], size: 5 }
        - { id: b, accept: ['12'], size: 5 }
        - { id: c, accept: ['2.4', '2.40'], size: 5 }
        - { id: d, accept: ['84'], size: 5 }
        - { id: e, accept: ['28.8', '28.80'], size: 5 }
      hints: ['$10\%$: divide by 10. $5\%$: halve $10\%$. $1\%$: divide by 100.', '$35\% = 10\% + 10\% + 10\% + 5\%$; $12\% = 10\% + 1\% + 1\%$.']
      explanation: '$10\% = 24$, $5\% = 12$, $1\% = 2.4$. So $35\% = 3 \times 24 + 12 = 84$ and $12\% = 24 + 2 \times 2.4 = 28.8$.'
  as-percent:
    label: 'Your turn'
    question:
      type: numeric
      prompt: 'Mali scores 42 out of 60 in a test. What is her score as a percentage?'
      answer: 70
      unit: '%'
      hints: ['Write it as a fraction: $\frac{42}{60}$.', 'Then $\times 100$.']
      explanation: '$\frac{42}{60} \times 100 = 0.7 \times 100 = 70\%$.'
  inc-dec:
    label: 'Quick check'
    question:
      type: sort
      prompt: 'Sort each one: does the amount **go up** or **go down**?'
      groups:
        - id: up
          text: 'Goes up'
          items:
            - { id: a, text: 'Add $7\%$ VAT' }
            - { id: b, text: 'A $4\%$ pay rise' }
            - { id: c, text: 'Multiply by $1.2$' }
        - id: down
          text: 'Goes down'
          items:
            - { id: d, text: '$30\%$ off in a sale' }
            - { id: e, text: 'A car loses $15\%$ of its value' }
            - { id: f, text: 'Multiply by $0.9$' }
      explanation: 'Multiplying by more than 1 increases an amount; multiplying by less than 1 decreases it. $\times 1.2$ is a $20\%$ increase; $\times 0.9$ is a $10\%$ decrease.'
  change-trap:
    label: 'Spot the mistake'
    question:
      type: mcq
      prompt: 'A price goes from 50 baht to 60 baht. Beam says: *"It went up by 10, so that''s a $10\%$ increase."* What is the real percentage increase?'
      options:
        - { id: a, text: '$20\%$' }
        - { id: b, text: '$10\%$' }
        - { id: c, text: '$16.7\%$' }
        - { id: d, text: '$120\%$' }
      answer: a
      hints: ['Percentage change $= \frac{\text{change}}{\text{original}} \times 100$.']
      explanation: '$\frac{10}{50} \times 100 = 20\%$. The change must be compared with the **original** amount. ($16.7\%$ comes from dividing by the new price, 60 — the other common mistake.)'
keyRules:
  - title: 'Without a calculator'
    body: '$10\%$: divide by 10. $5\%$: half of $10\%$. $1\%$: divide by 100. $50\%$: halve. $25\%$: quarter. Build everything else from these.'
  - title: 'With a calculator'
    formula: 'x\% \text{ of } A = \frac{x}{100} \times A'
    body: '$17\%$ of 350: $0.17 \times 350 = 59.5$.'
  - title: 'One amount as a percentage of another'
    formula: '\frac{\text{part}}{\text{whole}} \times 100'
    body: 'Both amounts must be in the same units first.'
  - title: 'Increase and decrease'
    body: 'Find the percentage, then **add** it (increase) or **subtract** it (decrease). Or use a multiplier: increase by $20\%$ is $\times 1.2$, decrease by $20\%$ is $\times 0.8$.'
  - title: 'Percentage change'
    formula: '\frac{\text{change}}{\text{original}} \times 100'
    body: 'Always divide by the **original** amount, not the new one.'
workedExamples:
  - title: 'Building a percentage'
    problem: 'Find $35\%$ of 60 kg without a calculator.'
    steps:
      - explain: 'Find $10\%$ and $5\%$.'
        maths: '10\% = 6\ \text{kg}, \qquad 5\% = 3\ \text{kg}'
      - explain: '$35\% = 3 \times 10\% + 5\%$.'
        maths: '3 \times 6 + 3 = 21'
    answer: '$21$ kg'
  - title: 'As a percentage'
    problem: '18 of the 24 students in a class walk to school. What percentage is that?'
    steps:
      - explain: 'Write it as a fraction: part over whole.'
        maths: '\frac{18}{24} = \frac{3}{4}'
      - explain: 'Multiply by 100.'
        maths: '\frac{3}{4} \times 100 = 75'
    answer: '$75\%$'
  - title: 'A decrease'
    problem: 'A phone costs 12 500 baht. It is reduced by $20\%$. Find the sale price.'
    steps:
      - explain: 'Find $20\%$: $10\%$ is 1250, so $20\%$ is 2500.'
        maths: '20\% \text{ of } 12\,500 = 2500'
      - explain: 'Subtract, because it is a decrease.'
        maths: '12\,500 - 2500 = 10\,000'
      - explain: 'Check with a multiplier: $100\% - 20\% = 80\%$.'
        maths: '0.8 \times 12\,500 = 10\,000\ \checkmark'
    answer: '10 000 baht'
  - title: 'Percentage change'
    problem: 'A town''s population grew from 8000 to 8600. Find the percentage increase.'
    steps:
      - explain: 'Find the change.'
        maths: '8600 - 8000 = 600'
      - explain: 'Divide by the original and multiply by 100.'
        maths: '\frac{600}{8000} \times 100 = 7.5'
    answer: '$7.5\%$'
practice: decimals-06
---

[[activity: predict]]

## Building percentages from 10%

Without a calculator, almost every percentage can be built from a few easy ones:

| Percentage | How to find it | Of 800 |
| --- | --- | --- |
| $50\%$ | halve | 400 |
| $25\%$ | halve again | 200 |
| $10\%$ | $\div 10$ | 80 |
| $5\%$ | half of $10\%$ | 40 |
| $1\%$ | $\div 100$ | 8 |

So $65\% = 50\% + 10\% + 5\%$, and $3\% = 3 \times 1\%$.

[[activity: bar]]

[[activity: build]]

With a calculator, change the percentage to a decimal and multiply:
$23\%$ of $640 = 0.23 \times 640 = 147.2$.

## One amount as a percentage of another

Write it as a fraction — **part over whole** — then multiply by 100.

[[activity: as-percent]]

## Increasing and decreasing

To increase by a percentage, work out the percentage and **add** it on. To decrease,
**subtract** it. A shortcut is to multiply by the percentage you end up with:
a $20\%$ increase leaves you with $120\%$, so multiply by $1.2$; a $20\%$ decrease
leaves $80\%$, so multiply by $0.8$. The *Percentage Change and Compound Interest*
lesson takes this idea further.

[[activity: inc-dec]]

## Percentage change

To say how big a change was as a percentage, compare it with the **original** amount:

$$\text{percentage change} = \frac{\text{change}}{\text{original}} \times 100$$

[[activity: change-trap]]
