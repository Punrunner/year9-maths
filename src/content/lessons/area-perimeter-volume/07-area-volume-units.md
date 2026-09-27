---
title: Converting Area and Volume Units
topic: area-perimeter-volume
order: 6
minutes: 25
difficulty: core
summary: 'Why 1 m² is 10 000 cm² and 1 cm³ is 1000 mm³, how volume links to litres, and why every length must be in the same unit before you calculate.'
objectives:
  - 'Convert between mm², cm², m², hectares and km²'
  - 'Convert between mm³, cm³ and m³'
  - 'Convert between volume and capacity: cm³ ↔ mL, m³ ↔ L'
  - 'Change every length to the same unit before finding an area or volume'
  - 'Find how area and volume change when a shape is enlarged'
activities:
  predict:
    label: 'Predict first'
    question:
      type: mcq
      prompt: 'There are 100 cm in a metre. How many **square** centimetres are in a **square** metre?'
      shuffleOptions: false
      options:
        - { id: a, text: '$100\ \text{cm}^2$' }
        - { id: b, text: '$200\ \text{cm}^2$' }
        - { id: c, text: '$1000\ \text{cm}^2$' }
        - { id: d, text: '$10\,000\ \text{cm}^2$' }
      answer: d
      hints: ['Picture a square 1 m by 1 m. How many 1 cm squares fit along the bottom? How many rows are there?']
      explanation: 'A 1 m square is 100 cm wide **and** 100 cm tall, so it holds $100 \times 100 = 10\,000$ little 1 cm squares. The most common answer is 100 — which forgets that area goes in two directions.'
  grid:
    label: 'Try it'
    visual:
      widget: unit-grid
      title: 'One big unit, cut into small ones'
      caption: 'Switch between **Length**, **Area** and **Volume**. Along a line you multiply once, across a square twice, through a cube three times. The shaded piece is one small unit.'
      config: { start: { d: 2, p: 0 } }
  area-check:
    label: 'Quick check'
    question:
      type: fill-blank
      prompt: 'Complete the area conversions.'
      text: '$1\ \text{cm}^2 =$ [[a]] $\text{mm}^2$     $1\ \text{m}^2 =$ [[b]] $\text{cm}^2$     $5\ \text{m}^2 =$ [[c]] $\text{cm}^2$     $300\ \text{mm}^2 =$ [[d]] $\text{cm}^2$'
      blanks:
        - { id: a, accept: ['100'], size: 7 }
        - { id: b, accept: ['10000', '10 000', '10,000'], size: 7 }
        - { id: c, accept: ['50000', '50 000', '50,000'], size: 7 }
        - { id: d, accept: ['3'], size: 7 }
      explanation: '$10 \times 10 = 100$, $100 \times 100 = 10\,000$. Then $5 \times 10\,000 = 50\,000\ \text{cm}^2$, and $300 \div 100 = 3\ \text{cm}^2$ (going to a bigger unit, so divide).'
  cube-working:
    label: 'Complete the working'
    question:
      type: steps
      prompt: 'Convert $3\ \text{m}^3$ to $\text{mm}^3$, one step at a time.'
      scenario: 'Go m³ → cm³ → mm³.'
      steps:
        - kind: numeric
          prompt: 'How many cm³ in 1 m³? (That is $100 \times 100 \times 100$.)'
          answer: 1000000
          hint: '$100 \times 100 = 10\,000$, then $\times 100$ again.'
          feedback: '$1\ \text{m}^3 = 1\,000\,000\ \text{cm}^3$.'
        - kind: numeric
          prompt: 'So $3\ \text{m}^3 = \ ?\ \text{cm}^3$'
          answer: 3000000
          unit: 'cm³'
          feedback: '$3 \times 1\,000\,000 = 3\,000\,000\ \text{cm}^3$.'
        - kind: numeric
          prompt: 'How many mm³ in 1 cm³?'
          answer: 1000
          feedback: '$10 \times 10 \times 10 = 1000$.'
        - kind: numeric
          prompt: 'So $3\ \text{m}^3 = \ ?\ \text{mm}^3$'
          answer: 3000000000
          unit: 'mm³'
          hint: 'Multiply your $\text{cm}^3$ answer by 1000.'
          feedback: '$3\,000\,000 \times 1000 = 3\,000\,000\,000\ \text{mm}^3$ — three billion.'
      explanation: '$3\ \text{m}^3 = 3 \times 1\,000\,000 = 3\,000\,000\ \text{cm}^3 = 3\,000\,000 \times 1000 = 3\,000\,000\,000\ \text{mm}^3$.'
  capacity:
    label: 'Quick check'
    question:
      type: match
      prompt: 'Match each volume to the same amount of capacity.'
      left:
        - { id: l1, text: '$1\ \text{cm}^3$' }
        - { id: l2, text: '$1000\ \text{cm}^3$' }
        - { id: l3, text: '$1\ \text{m}^3$' }
        - { id: l4, text: '$250\ \text{cm}^3$' }
      right:
        - { id: r1, text: '$1\ \text{mL}$' }
        - { id: r2, text: '$1\ \text{L}$' }
        - { id: r3, text: '$1000\ \text{L}$' }
        - { id: r4, text: '$250\ \text{mL}$' }
      solution: { l1: r1, l2: r2, l3: r3, l4: r4 }
      explanation: '$1\ \text{cm}^3$ holds exactly $1\ \text{mL}$, so $1000\ \text{cm}^3 = 1\ \text{L}$ and $1\ \text{m}^3 = 1\,000\,000\ \text{cm}^3 = 1000\ \text{L}$.'
  same-units:
    label: 'Spot the mistake'
    question:
      type: mcq
      prompt: 'A box is $2\ \text{m}$ long, $50\ \text{cm}$ wide and $40\ \text{cm}$ tall. Leo says its volume is $2 \times 50 \times 40 = 4000\ \text{cm}^3$. What is the correct volume?'
      options:
        - { id: a, text: '$40\,000\ \text{cm}^3$ (he should have used $200$ cm)' }
        - { id: b, text: '$400\,000\ \text{cm}^3$ (he should have used $200$ cm)' }
        - { id: c, text: '$4000\ \text{cm}^3$ — he is right' }
        - { id: d, text: '$4\ \text{m}^3$' }
      answer: b
      hints: ['Write 2 m in centimetres first.']
      explanation: 'Mixing metres and centimetres gives nonsense. $2\ \text{m} = 200\ \text{cm}$, so $V = 200 \times 50 \times 40 = 400\,000\ \text{cm}^3$ (which is $0.4\ \text{m}^3$, or 400 litres).'
  scale:
    label: 'Try it'
    visual:
      widget: unit-grid
      title: 'Enlarging a box'
      caption: 'A box $5 \times 8 \times 3$ cm is enlarged by scale factor $k$. Every length is multiplied by $k$ — so how many copies of the original box fit inside the new one? Try $k = 2$ with **Volume** showing.'
      config: { mode: scale, max: 5, base: { l: 5, w: 8, h: 3, unit: cm }, start: { d: 3, k: 1 } }
  scale-check:
    label: 'Your turn'
    question:
      type: numeric
      prompt: 'A cube has volume $20\ \text{cm}^3$. Every edge is made **3 times** longer. What is the new volume?'
      answer: 540
      unit: 'cm³'
      hints: ['Volume is multiplied by the scale factor **cubed**.', '$3^3 = 27$.']
      explanation: 'Volume scales by $k^3 = 3^3 = 27$, so the new volume is $20 \times 27 = 540\ \text{cm}^3$. Multiplying by 3 (giving 60) is the usual slip.'
keyRules:
  - title: 'Area: square the length conversion'
    formula: '1\ \text{cm}^2 = 10^2 = 100\ \text{mm}^2 \qquad 1\ \text{m}^2 = 100^2 = 10\,000\ \text{cm}^2'
    body: 'Also $1$ hectare (ha) $= 10\,000\ \text{m}^2$ (a square 100 m by 100 m) and $1\ \text{km}^2 = 1\,000\,000\ \text{m}^2 = 100$ ha.'
  - title: 'Volume: cube the length conversion'
    formula: '1\ \text{cm}^3 = 10^3 = 1000\ \text{mm}^3 \qquad 1\ \text{m}^3 = 100^3 = 1\,000\,000\ \text{cm}^3'
    body: 'Going to a smaller unit, multiply by the conversion factor. Going to a bigger unit, divide.'
  - title: 'Volume and capacity'
    formula: '1\ \text{cm}^3 = 1\ \text{mL} \qquad 1000\ \text{cm}^3 = 1\ \text{L} \qquad 1\ \text{m}^3 = 1000\ \text{L}'
    body: 'Capacity is how much a container holds. Work out the volume, then change it to mL or L.'
  - title: 'Same units first'
    body: 'Before you find a perimeter, area or volume, change **every** length to the same unit — usually the unit the answer is asked for.'
  - title: 'Enlargement'
    formula: '\text{lengths} \times k \qquad \text{areas} \times k^2 \qquad \text{volumes} \times k^3'
    body: 'When every length is multiplied by a scale factor $k$, the same squaring and cubing happens as with unit conversions.'
workedExamples:
  - title: 'Mixed units in a cylinder'
    problem: 'A cylindrical candle has radius $35\ \text{mm}$ and height $0.12\ \text{m}$. Find its volume in $\text{cm}^3$, to 2 decimal places.'
    steps:
      - explain: 'The answer is wanted in cm³, so change both lengths to centimetres first.'
        maths: 'r = 35 \div 10 = 3.5\ \text{cm}, \qquad h = 0.12 \times 100 = 12\ \text{cm}'
      - explain: 'Use the cylinder formula.'
        maths: 'V = \pi r^2 h = \pi \times 3.5^2 \times 12'
      - explain: 'Work it out.'
        maths: 'V = 147\pi = 461.814\ldots'
    answer: '$461.81\ \text{cm}^3$'
  - title: 'Square metres to square centimetres'
    problem: 'Convert $2.5\ \text{m}^2$ to $\text{cm}^2$.'
    steps:
      - explain: 'Square centimetres are smaller, so multiply. The factor is $100^2$, not 100.'
        maths: '1\ \text{m}^2 = 100 \times 100 = 10\,000\ \text{cm}^2'
      - explain: 'Multiply.'
        maths: '2.5 \times 10\,000 = 25\,000'
    answer: '$25\,000\ \text{cm}^2$'
  - title: 'Rain on a garden'
    problem: 'A rectangular garden is $20\ \text{m}$ by $15\ \text{m}$. During a storm $25\ \text{mm}$ of rain falls on it. How many litres of water is that?'
    steps:
      - explain: 'The water forms a very thin box. Find the area of its base.'
        maths: 'A = 20 \times 15 = 300\ \text{m}^2'
      - explain: 'Change the depth of rain to metres, so every length is in the same unit.'
        maths: '25\ \text{mm} = 25 \div 1000 = 0.025\ \text{m}'
      - explain: 'Volume = base area × depth.'
        maths: 'V = 300 \times 0.025 = 7.5\ \text{m}^3'
      - explain: 'Change to litres: $1\ \text{m}^3 = 1000\ \text{L}$.'
        maths: '7.5 \times 1000 = 7500'
    answer: '$7500$ litres'
  - title: 'Enlarging a box'
    problem: 'A box measures $5\ \text{cm} \times 8\ \text{cm} \times 3\ \text{cm}$. A new box has every dimension doubled. Find its volume.'
    steps:
      - explain: 'Original volume.'
        maths: '5 \times 8 \times 3 = 120\ \text{cm}^3'
      - explain: 'Scale factor $k = 2$, so the volume is multiplied by $2^3 = 8$.'
        maths: '120 \times 8 = 960'
      - explain: 'Check with the new dimensions.'
        maths: '10 \times 16 \times 6 = 960\ \checkmark'
    answer: '$960\ \text{cm}^3$'
practice: area-07
---

[[activity: predict]]

If you said $100\ \text{cm}^2$, you are in good company — it is the most common mistake
in this whole topic. This lesson shows *why* the answer is ten thousand, so you never
have to memorise it blindly.

## Squares of units

A square centimetre ($\text{cm}^2$) is a square $1$ cm by $1$ cm. Cut each side into
millimetres and you get a $10 \times 10$ grid — so $1\ \text{cm}^2 = 100\ \text{mm}^2$.
Whatever the length conversion is, **square it** for area.

[[activity: grid]]

| Length | Area | Volume |
| --- | --- | --- |
| $1\ \text{cm} = 10\ \text{mm}$ | $1\ \text{cm}^2 = 100\ \text{mm}^2$ | $1\ \text{cm}^3 = 1000\ \text{mm}^3$ |
| $1\ \text{m} = 100\ \text{cm}$ | $1\ \text{m}^2 = 10\,000\ \text{cm}^2$ | $1\ \text{m}^3 = 1\,000\,000\ \text{cm}^3$ |
| $1\ \text{km} = 1000\ \text{m}$ | $1\ \text{km}^2 = 1\,000\,000\ \text{m}^2$ | — |

For land, we also use the **hectare**: a square $100\ \text{m}$ by $100\ \text{m}$, so
$1\ \text{ha} = 10\,000\ \text{m}^2$.

[[activity: area-check]]

## Cubes of units

A cubic centimetre is a cube $1$ cm on each edge. Cut it into millimetres and you get
$10$ along, $10$ across and $10$ up: $10 \times 10 \times 10 = 1000\ \text{mm}^3$. For
volume, **cube** the length conversion.

[[activity: cube-working]]

## Volume and capacity

**Capacity** is how much liquid a container holds, measured in mL and L. It links to
volume through one fact: a $1\ \text{cm}^3$ cube holds exactly $1\ \text{mL}$.

- $1000\ \text{cm}^3 = 1000\ \text{mL} = 1\ \text{L}$ — a $10 \times 10 \times 10$ cm box holds a litre.
- $1\ \text{m}^3 = 1\,000\,000\ \text{cm}^3 = 1000\ \text{L}$ — a cubic metre holds a tonne of water.

[[activity: capacity]]

## Same units before you calculate

A formula only works if every length is in the **same unit**. Change them all first —
usually to the unit the answer asks for — then calculate. Converting *after* is
possible, but you then have to use the squared or cubed factor, which is where mistakes
happen.

[[activity: same-units]]

## Enlarging a shape

If every length of a shape is multiplied by a scale factor $k$, its area is multiplied
by $k^2$ and its volume by $k^3$ — for exactly the same reason as the unit
conversions. Double every edge of a box and eight copies of the old box fit inside.

[[activity: scale]]

[[activity: scale-check]]
