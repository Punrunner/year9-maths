---
title: Direct Proportion
topic: ratio-proportion
order: 2
minutes: 25
difficulty: core
summary: 'Quantities that grow at the same rate: the unitary method, multiplier tables, and straight-line graphs through the origin.'
objectives:
  - 'Recognise when two quantities are directly proportional'
  - 'Use the unitary method or a multiplier to find missing values'
  - 'Know that a direct proportion graph is a straight line through the origin'
  - 'Write and use the equation $y = mx$'
keyRules:
  - title: 'Direct proportion'
    body: 'Two quantities are directly proportional if, when one is doubled (or tripled, or halved), the other is too. The ratio between them never changes.'
  - title: 'The unitary method'
    body: 'Find the value of **one**, then multiply. 3 oranges cost 81 cents, so 1 costs 27 cents and 7 cost $7 \times 27 = 189$ cents.'
  - title: 'The multiplier'
    formula: 'y = mx'
    body: 'The number you multiply $x$ by to get $y$ is always the same. It is also the **gradient** of the graph.'
  - title: 'The graph'
    body: 'A graph of two directly proportional quantities is a **straight line through the origin** $(0, 0)$.'
visual:
  widget: line-mc
  title: 'Direct proportion is y = mx'
  caption: 'Keep $c = 0$ and change $m$: every line passes through the origin. That is what makes it direct proportion. Set $c$ to anything else and the proportion is broken — doubling $x$ no longer doubles $y$.'
workedExamples:
  - title: 'A multiplier table'
    problem: '$x$ and $y$ are directly proportional. When $x = 4$, $y = 10$. Find $y$ when $x = 7$, and $x$ when $y = 35$.'
    steps:
      - explain: 'Find the multiplier from $x$ to $y$.'
        maths: '10 \div 4 = 2.5'
      - explain: 'Multiply to go down the table.'
        maths: 'y = 7 \times 2.5 = 17.5'
      - explain: 'Divide to go back up.'
        maths: 'x = 35 \div 2.5 = 14'
    answer: '$y = 17.5$; $x = 14$'
  - title: 'Mixing paint'
    problem: 'Green paint is yellow and blue in the ratio $5 : 2$. How much blue is needed with 28 litres of yellow?'
    steps:
      - explain: 'Multiplier across the table: $28 \div 5 = 5.6$.'
      - explain: 'Apply it to the blue.'
        maths: '2 \times 5.6 = 11.2'
    answer: '11.2 litres of blue'
  - title: 'An equation'
    problem: 'I change 80 British pounds into 6584 rupees. How many rupees do I get for 75 pounds?'
    steps:
      - explain: 'The multiplier from pounds to rupees.'
        maths: '6584 \div 80 = 82.3 \;\Rightarrow\; R = 82.3P'
      - explain: 'Substitute $P = 75$.'
        maths: 'R = 82.3 \times 75 = 6172.50'
    answer: '6172.50 rupees'
practice: ratio-02
---

## Why this matters

Exchange rates, recipes, fuel costs and unit prices are all direct proportion. If you know
what one costs — or how much one litre covers — you know everything.

## Is it direct proportion?

| Situation | Direct? |
| --- | --- |
| Cost of apples and number of apples | Yes — twice as many cost twice as much |
| Paint used and area covered | Yes |
| Euros and US dollars (fixed rate) | Yes |
| Taxi fare with a fixed starting charge | **No** — the graph does not start at 0 |
| Age and height | No — you do not keep growing at the same rate |

## The gradient is the multiplier

For apples at 30 cents each, the graph goes through $(4, 120)$ and $(10, 300)$. The gradient is

$$\frac{300 - 120}{10 - 4} = \frac{180}{6} = 30$$

— exactly the cost of one apple — so the equation is $y = 30x$.
