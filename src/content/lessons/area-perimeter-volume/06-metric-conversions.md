---
title: Converting Metric Units
topic: area-perimeter-volume
order: 5
minutes: 25
difficulty: foundation
summary: 'Length, mass and capacity: the metric staircase, moving the decimal point, mixed units, and comparing measurements.'
objectives:
  - 'Know how many mm in a cm, cm in a m, m in a km, g in a kg, kg in a tonne and mL in a litre'
  - 'Decide whether to multiply or divide when converting'
  - 'Convert by moving the decimal point'
  - 'Write mixed units such as 3 m 45 cm as a single unit'
  - 'Convert to the same unit before comparing, adding or subtracting'
activities:
  predict:
    label: 'Before we start'
    question:
      type: mcq
      prompt: 'Which bag is heavier: one holding $2.5\ \text{kg}$, or one holding $2400\ \text{g}$?'
      shuffleOptions: false
      options:
        - { id: kg, text: 'The $2.5\ \text{kg}$ bag' }
        - { id: g, text: 'The $2400\ \text{g}$ bag' }
        - { id: same, text: 'They weigh the same' }
      answer: kg
      hints: ['How many grams are in 1 kilogram?']
      explanation: '$2.5\ \text{kg} = 2.5 \times 1000 = 2500\ \text{g}$, which is more than $2400\ \text{g}$. The bigger-looking number, 2400, belongs to the lighter bag. You can only compare two measurements once they are in the **same unit**.'
  staircase:
    label: 'Try it'
    visual:
      widget: unit-ladder
      title: 'The metric staircase'
      caption: 'Choose what you are measuring, type an amount and pick two units. Going **down** the stairs (to a smaller unit) you multiply; going **up** you divide. Try $3.5$ m to cm, then $3.5$ m to km, then switch to mass and try $750$ g to kg.'
      config: { start: { q: 0, from: 2, to: 1, n: 3.5 } }
  which-way:
    label: 'Quick check'
    question:
      type: sort
      prompt: 'Sort each conversion: do you **multiply** or **divide**?'
      groups:
        - id: mult
          text: 'Multiply (going to a smaller unit)'
          items:
            - { id: a, text: 'm → cm' }
            - { id: b, text: 'kg → g' }
            - { id: c, text: 'L → mL' }
            - { id: d, text: 'km → m' }
        - id: div
          text: 'Divide (going to a bigger unit)'
          items:
            - { id: e, text: 'mm → cm' }
            - { id: f, text: 'g → kg' }
            - { id: g, text: 'mL → L' }
            - { id: h, text: 'kg → t' }
      explanation: 'Ask whether the new unit is smaller or bigger. A smaller unit needs **more** of them, so multiply. A bigger unit needs **fewer**, so divide.'
  decimal-point:
    label: 'Your turn'
    question:
      type: fill-blank
      prompt: 'Move the decimal point.'
      text: '$4.2\ \text{m} =$ [[a]] cm     $85\ \text{mm} =$ [[b]] cm     $0.6\ \text{kg} =$ [[c]] g     $1250\ \text{mL} =$ [[d]] L'
      blanks:
        - { id: a, accept: ['420'], size: 6 }
        - { id: b, accept: ['8.5'], size: 6 }
        - { id: c, accept: ['600'], size: 6 }
        - { id: d, accept: ['1.25'], size: 6 }
      hints: ['× 100 moves the point 2 places right. ÷ 10 moves it 1 place left. × 1000 and ÷ 1000 move it 3 places.']
      explanation: '$4.2 \times 100 = 420$ cm; $85 \div 10 = 8.5$ cm; $0.6 \times 1000 = 600$ g; $1250 \div 1000 = 1.25$ L. When the point runs out of digits, fill the gap with zeros: $0.6 \to 600$.'
  mixed-trap:
    label: 'Spot the mistake'
    question:
      type: mcq
      prompt: 'Mai writes: *"$2\ \text{kg}\ 50\ \text{g} = 2.5\ \text{kg}$."* What has she done wrong?'
      options:
        - { id: a, text: '$50\ \text{g}$ is $0.05\ \text{kg}$, not $0.5\ \text{kg}$, so the answer is $2.05\ \text{kg}$' }
        - { id: b, text: 'Nothing — $2\ \text{kg}\ 50\ \text{g} = 2.5\ \text{kg}$' }
        - { id: c, text: 'She should have multiplied, giving $2050\ \text{kg}$' }
        - { id: d, text: 'The answer should be $2.50\ \text{kg}$' }
      answer: a
      explanation: 'There are 1000 g in a kilogram, so $50\ \text{g} = 50 \div 1000 = 0.05\ \text{kg}$. The answer is $2.05\ \text{kg}$. Writing the grams straight after the point only works when there are exactly three digits: $2\ \text{kg}\ 350\ \text{g} = 2.350\ \text{kg}$.'
  compare:
    label: 'Quick check'
    question:
      type: order
      prompt: 'Put these distances in order, **shortest first**.'
      items:
        - { id: a, text: '$0.8\ \text{km}$' }
        - { id: b, text: '$950\ \text{m}$' }
        - { id: c, text: '$1.2\ \text{km}$' }
        - { id: d, text: '$105\ 000\ \text{cm}$' }
      solution: [a, b, d, c]
      hints: ['Change them all to metres first.']
      explanation: 'In metres: $0.8\ \text{km} = 800$, $950$, $105\,000\ \text{cm} = 1050$, $1.2\ \text{km} = 1200$. So $0.8\ \text{km} < 950\ \text{m} < 105\,000\ \text{cm} < 1.2\ \text{km}$.'
  time-think:
    label: 'Think about it'
    reveal:
      prompt: 'A film lasts $2.5$ hours. Is that 2 hours 50 minutes?'
      answer: 'No — it is **2 hours 30 minutes**. Time is *not* metric: there are 60 minutes in an hour, not 100. So $0.5$ h $= 0.5 \times 60 = 30$ min. The decimal-point trick only works for metric units, where every step is 10, 100 or 1000.'
keyRules:
  - title: 'The conversions to know by heart'
    body: '**Length:** $10$ mm $= 1$ cm, $100$ cm $= 1$ m, $1000$ m $= 1$ km. **Mass:** $1000$ mg $= 1$ g, $1000$ g $= 1$ kg, $1000$ kg $= 1$ t (tonne). **Capacity:** $1000$ mL $= 1$ L, $1000$ L $= 1$ kL.'
  - title: 'Smaller unit → bigger number'
    formula: '\text{big unit} \xrightarrow{\ \times\ } \text{small unit} \qquad \text{small unit} \xrightarrow{\ \div\ } \text{big unit}'
    body: 'Going to a **smaller** unit you need more of them, so **multiply**. Going to a **bigger** unit, **divide**.'
  - title: 'Moving the decimal point'
    body: '$\times 10$, $\times 100$, $\times 1000$ move the point $1$, $2$, $3$ places **right**. Dividing moves it **left**. Fill empty places with zeros.'
  - title: 'Same unit first'
    body: 'Before you compare, add or subtract measurements, change them all to **one** unit.'
workedExamples:
  - title: 'Metres to centimetres'
    problem: 'Convert $3.75\ \text{m}$ to centimetres.'
    steps:
      - explain: 'A centimetre is smaller than a metre, so the number must get bigger. Multiply.'
        maths: '1\ \text{m} = 100\ \text{cm}'
      - explain: 'Multiply by 100 — the decimal point moves 2 places right.'
        maths: '3.75 \times 100 = 375'
    answer: '$375\ \text{cm}$'
  - title: 'Grams to kilograms'
    problem: 'Convert $450\ \text{g}$ to kilograms.'
    steps:
      - explain: 'A kilogram is bigger than a gram, so the number must get smaller. Divide.'
        maths: '1000\ \text{g} = 1\ \text{kg}'
      - explain: 'Divide by 1000 — the point moves 3 places left.'
        maths: '450 \div 1000 = 0.45'
    answer: '$0.45\ \text{kg}$'
  - title: 'Two steps on the staircase'
    problem: 'Convert $2.4\ \text{km}$ to centimetres.'
    steps:
      - explain: 'Kilometres to metres: down one step, multiply by 1000.'
        maths: '2.4 \times 1000 = 2400\ \text{m}'
      - explain: 'Metres to centimetres: down another step, multiply by 100.'
        maths: '2400 \times 100 = 240\,000\ \text{cm}'
    answer: '$240\,000\ \text{cm}$'
  - title: 'Adding mixed units'
    problem: 'A plank is $1.2\ \text{m}$ long. Another $35\ \text{cm}$ is added to it. How long is it now, in metres?'
    steps:
      - explain: 'Change everything to metres first.'
        maths: '35\ \text{cm} = 35 \div 100 = 0.35\ \text{m}'
      - explain: 'Now add.'
        maths: '1.2 + 0.35 = 1.55'
    answer: '$1.55\ \text{m}$'
practice: area-06
---

[[activity: predict]]

The bigger number, 2400, is on the lighter bag. A number on its own means nothing — it is
the **number and the unit together** that tell you how much there is. Converting means
changing the unit while keeping the amount the same.

## What the prefixes mean

The metric system uses one base unit for each kind of measurement — the **metre** for
length, the **gram** for mass and the **litre** for capacity — plus a prefix that
tells you the size.

| Prefix | Means | Examples |
| --- | --- | --- |
| **kilo** (k) | $1000 \times$ | $1\ \text{km} = 1000\ \text{m}$, $1\ \text{kg} = 1000\ \text{g}$ |
| **centi** (c) | $\frac{1}{100}$ | $100\ \text{cm} = 1\ \text{m}$ |
| **milli** (m) | $\frac{1}{1000}$ | $1000\ \text{mm} = 1\ \text{m}$, $1000\ \text{mL} = 1\ \text{L}$ |

A **tonne** (t) is $1000\ \text{kg}$ — used for cars, trucks and cargo.

## The staircase

Put the units on a staircase with the biggest at the top. Walking **down** to a smaller
unit, you need *more* of them, so you **multiply**. Walking **up** to a bigger unit, you
need *fewer*, so you **divide**. Each step has its own number — notice that the length
stairs are uneven (10, 100, 1000).

[[activity: staircase]]

[[activity: which-way]]

## Moving the decimal point

Multiplying or dividing by 10, 100 or 1000 does not need long multiplication. The
digits stay the same; only the **decimal point moves**, one place for each zero.

- $3.75\ \text{m} \to \text{cm}$: $\times 100$, two places right: $375$.
- $450\ \text{g} \to \text{kg}$: $\div 1000$, three places left: $0.450 = 0.45$.
- $0.6\ \text{kg} \to \text{g}$: $\times 1000$, three places right, filling with zeros: $600$.

[[activity: decimal-point]]

## Mixed units

Measurements are often written with two units, like $3\ \text{m}\ 45\ \text{cm}$.
Convert the smaller part and add it on:

$$3\ \text{m}\ 45\ \text{cm} = 3 + 0.45 = 3.45\ \text{m} \qquad\text{or}\qquad 300 + 45 = 345\ \text{cm}$$

[[activity: mixed-trap]]

## Comparing, adding and subtracting

You cannot compare $950\ \text{m}$ with $1.2\ \text{km}$ by looking at the numbers.
Change them to the **same unit** first — usually whichever unit makes the numbers
easiest.

[[activity: compare]]

The same goes for adding and subtracting: $1.2\ \text{m} + 35\ \text{cm}$ is
**not** $36.2$ of anything. Change to $1.2 + 0.35 = 1.55\ \text{m}$, or
$120 + 35 = 155\ \text{cm}$.

## The sense check

After every conversion, ask: **should the number have got bigger or smaller?** Going to
a smaller unit, the number grows. If $3.5\ \text{m}$ came out as $0.035\ \text{cm}$,
you divided when you should have multiplied.

[[activity: time-think]]
