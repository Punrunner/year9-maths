---
title: Reverse Percentages and Percentage Error
topic: decimals-percentages
order: 4
minutes: 30
difficulty: challenge
summary: 'Finding the original amount after a percentage change, reversing repeated changes, and measuring how far an estimate or measurement is from the true value.'
objectives:
  - 'Find the original amount when you know the amount after a percentage increase or decrease'
  - 'Explain why you divide by the multiplier rather than taking the percentage off again'
  - 'Reverse a repeated percentage change, such as compound interest'
  - 'Calculate a percentage error'
activities:
  predict:
    label: 'Predict first'
    question:
      type: mcq
      prompt: 'A jacket costs 1380 baht **after** a $15\%$ rise. What did it cost before the rise?'
      options:
        - { id: a, text: '1200 baht' }
        - { id: b, text: '1173 baht' }
        - { id: c, text: '1365 baht' }
        - { id: d, text: '1587 baht' }
      answer: a
      hints: ['1380 baht is $115\%$ of the old price — not $100\%$.']
      explanation: '$1380$ is $115\%$ of the original, so $1\% = 1380 \div 115 = 12$ and $100\% = 1200$ baht. Taking $15\%$ off 1380 gives 1173 — wrong, because the $15\%$ was of the *old* price, which was smaller.'
  bar:
    label: 'Try it'
    visual:
      widget: percent-bar
      title: 'Work back to 100%'
      caption: 'The price after a $15\%$ rise is 1380 baht, so the bar is marked at $115\%$. Slide to $1\%$ … then to $100\%$. Compare with $85\%$ — what you get by wrongly taking $15\%$ off.'
      config: { known: 1380, knownPercent: 115, unit: 'baht', max: 150, step: 1, start: { p: 115 } }
  multiplier:
    label: 'Quick check'
    question:
      type: match
      prompt: 'Match each change to what you **divide** by to find the original.'
      left:
        - { id: l1, text: 'After a $20\%$ increase' }
        - { id: l2, text: 'After a $20\%$ decrease' }
        - { id: l3, text: 'After a $7\%$ increase' }
        - { id: l4, text: 'After a $35\%$ decrease' }
      right:
        - { id: r1, text: '$1.2$' }
        - { id: r2, text: '$0.8$' }
        - { id: r3, text: '$1.07$' }
        - { id: r4, text: '$0.65$' }
      solution: { l1: r1, l2: r2, l3: r3, l4: r4 }
      explanation: 'original × multiplier = new, so original = new ÷ multiplier. An increase of $x\%$ has multiplier $1 + \frac{x}{100}$; a decrease has $1 - \frac{x}{100}$.'
  sale:
    label: 'Your turn'
    question:
      type: numeric
      prompt: 'In a $30\%$-off sale a phone costs 8750 baht. What was the original price?'
      answer: 12500
      unit: 'baht'
      hints: ['The sale price is $70\%$ of the original.', 'Divide by $0.7$.']
      explanation: '$8750 \div 0.7 = 12\,500$ baht. Check: $0.7 \times 12\,500 = 8750$ ✓.'
  compound-back:
    label: 'Your turn'
    question:
      type: numeric
      prompt: 'Money is invested at $4\%$ compound interest per year. After 3 years it is worth $\$6749.18$. How much was invested? Give your answer to the nearest dollar.'
      answer: 6000
      tolerance: 1
      unit: '$'
      hints: ['After 3 years: original $\times 1.04^3$.', 'Divide by $1.04^3$.']
      explanation: '$6749.18 \div 1.04^3 = 6749.18 \div 1.124864 = 6000.00$, so $\$6000$.'
  error-trap:
    label: 'Spot the mistake'
    question:
      type: mcq
      prompt: 'Mai estimates a room is $4.5$ m long. It is really $4$ m. She says her percentage error is $\frac{0.5}{4.5} \times 100 = 11.1\%$. What should it be?'
      options:
        - { id: a, text: '$12.5\%$' }
        - { id: b, text: '$11.1\%$' }
        - { id: c, text: '$0.5\%$' }
        - { id: d, text: '$50\%$' }
      answer: a
      hints: ['Percentage error compares the error with the **true** value.']
      explanation: '$\frac{0.5}{4} \times 100 = 12.5\%$. Like percentage change, the error is divided by the true (actual) value, not the estimate.'
keyRules:
  - title: 'Reverse percentages'
    formula: '\text{original} = \frac{\text{new amount}}{\text{multiplier}}'
    body: 'After a $15\%$ increase the multiplier is $1.15$; after a $15\%$ decrease it is $0.85$. Or: new amount $= 115\%$, so find $1\%$ and then $100\%$.'
  - title: 'Never take the percentage off again'
    body: 'The percentage was of the **original**. Taking $15\%$ of the new amount uses the wrong starting value, so it never gets you back.'
  - title: 'Repeated changes'
    formula: '\text{original} = \frac{\text{final amount}}{m^n}'
    body: 'For $n$ changes by the same multiplier $m$, e.g. compound interest.'
  - title: 'Percentage error'
    formula: '\text{percentage error} = \frac{|\text{estimate} - \text{true value}|}{\text{true value}} \times 100'
    body: 'Always divide by the **true** value, not the estimate or measurement.'
workedExamples:
  - title: 'After an increase'
    problem: 'After a $12\%$ pay rise, Somchai earns 33 600 baht a month. What did he earn before?'
    steps:
      - explain: 'The new salary is $112\%$ of the old one, so the multiplier is $1.12$.'
        maths: '\text{old} \times 1.12 = 33\,600'
      - explain: 'Divide by the multiplier.'
        maths: '\text{old} = 33\,600 \div 1.12 = 30\,000'
    answer: '30 000 baht'
  - title: 'After a decrease'
    problem: 'A car loses $18\%$ of its value in a year and is now worth 574 000 baht. Find its value a year ago.'
    steps:
      - explain: '$100\% - 18\% = 82\%$, so the multiplier is $0.82$.'
        maths: '\text{old} = 574\,000 \div 0.82'
      - explain: 'Calculate.'
        maths: '= 700\,000'
    answer: '700 000 baht'
  - title: 'VAT included'
    problem: 'A price of 856 baht includes $7\%$ VAT. How much of it is VAT?'
    steps:
      - explain: 'Find the price before VAT.'
        maths: '856 \div 1.07 = 800'
      - explain: 'The VAT is the difference.'
        maths: '856 - 800 = 56'
    answer: '56 baht'
  - title: 'Percentage error'
    problem: 'A bag of rice is labelled $5$ kg but actually weighs $4.85$ kg. Find the percentage error in the label.'
    steps:
      - explain: 'The error is the difference.'
        maths: '5 - 4.85 = 0.15\ \text{kg}'
      - explain: 'Divide by the true value and multiply by 100.'
        maths: '\frac{0.15}{4.85} \times 100 = 3.09\ldots'
    answer: '$3.09\%$ (3 s.f.)'
practice: decimals-04
---

[[activity: predict]]

## Working back to 100%

After a percentage change you have a **different** percentage of the original — $115\%$
after a $15\%$ rise, $85\%$ after a $15\%$ fall. To get back, find $1\%$ and then $100\%$,
or divide by the multiplier.

[[activity: bar]]

[[activity: multiplier]]

## Increases and decreases

The multiplier method handles both in one step:

$$\text{original} \times \text{multiplier} = \text{new} \quad\Longrightarrow\quad \text{original} = \frac{\text{new}}{\text{multiplier}}$$

[[activity: sale]]

## Reversing repeated changes

Compound interest multiplies by the same multiplier every year, so undoing $n$ years means
dividing by $m^n$.

[[activity: compound-back]]

## Percentage error

Percentage error measures how far an estimate or a measurement is from the true value, as
a percentage **of the true value**.

[[activity: error-trap]]
