---
title: Area and Volume Units, and Similar Solids
topic: area-perimeter-volume
order: 6
minutes: 35
difficulty: challenge
summary: 'Converting squared and cubed units, capacity, and the length, area and volume scale factors of similar shapes and solids — including working backwards.'
objectives:
  - 'Convert between mm², cm², m², hectares and km², and between mm³, cm³, m³ and litres'
  - 'Put every length in the same unit before calculating, including in multi-step problems'
  - 'Use the length, area and volume scale factors $k$, $k^2$ and $k^3$ of similar shapes'
  - 'Work backwards from an area or volume ratio to a length ratio'
  - 'Solve problems with similar solids, such as finding a mass or capacity'
activities:
  predict:
    label: 'Predict first'
    question:
      type: mcq
      prompt: 'Two similar bottles have heights $10$ cm and $20$ cm. The small one holds $250$ mL. How much does the large one hold?'
      options:
        - { id: a, text: '$2000$ mL' }
        - { id: b, text: '$1000$ mL' }
        - { id: c, text: '$500$ mL' }
        - { id: d, text: '$750$ mL' }
      answer: a
      hints: ['Every length doubles — height, width **and** depth.']
      explanation: 'The length scale factor is 2, so the volume scale factor is $2^3 = 8$: $250 \times 8 = 2000$ mL. Answering 500 mL is the classic mistake — doubling the height alone does not double the capacity.'
  grid:
    label: 'Try it'
    visual:
      widget: unit-grid
      title: 'Why units square and cube'
      caption: 'Switch between **Length**, **Area** and **Volume**, and between the unit pairs. The conversion factor is multiplied once, twice or three times — the same reason similar solids scale by $k$, $k^2$ and $k^3$.'
      config: { start: { d: 3, p: 1 } }
  units-check:
    label: 'Quick check'
    question:
      type: fill-blank
      prompt: 'Complete the conversions.'
      text: '$4.2\ \text{m}^2 =$ [[a]] $\text{cm}^2$     $3\ \text{km}^2 =$ [[b]] ha     $75\,000\ \text{cm}^3 =$ [[c]] $\text{m}^3$     $0.4\ \text{m}^3 =$ [[d]] L'
      blanks:
        - { id: a, accept: ['42000', '42 000', '42,000'], size: 7 }
        - { id: b, accept: ['300'], size: 7 }
        - { id: c, accept: ['0.075'], size: 7 }
        - { id: d, accept: ['400'], size: 7 }
      explanation: '$4.2 \times 10\,000 = 42\,000$; $1\ \text{km}^2 = 1\,000\,000\ \text{m}^2 = 100$ ha, so $300$ ha; $75\,000 \div 1\,000\,000 = 0.075$; $0.4 \times 1000 = 400$ L.'
  scale:
    label: 'Try it'
    visual:
      widget: unit-grid
      title: 'Enlarging a solid'
      caption: 'Set $k = 3$. How many copies of the original fit inside? Now switch to **Area**: how many copies of one face fit on the enlarged face?'
      config: { mode: scale, max: 5, start: { d: 3, k: 1 } }
  backwards:
    label: 'Your turn'
    question:
      type: steps
      prompt: 'Work backwards from a volume ratio.'
      scenario: 'Two similar cylinders have volumes $54\ \text{cm}^3$ and $250\ \text{cm}^3$. The smaller has height $6$ cm. Find the height of the larger.'
      steps:
        - kind: numeric
          prompt: 'Find the volume scale factor, $k^3$ (as a fraction or decimal).'
          answer: '125/27'
          tolerance: 0.01
          hint: '$\frac{250}{54}$ — simplify.'
          feedback: '$\frac{250}{54} = \frac{125}{27}$.'
        - kind: numeric
          prompt: 'Find the length scale factor, $k$.'
          answer: '5/3'
          tolerance: 0.01
          hint: 'Take the cube root of the top and the bottom.'
          feedback: '$\sqrt[3]{125} = 5$ and $\sqrt[3]{27} = 3$, so $k = \frac{5}{3}$.'
        - kind: numeric
          prompt: 'Find the height of the larger cylinder.'
          answer: 10
          unit: 'cm'
          feedback: '$6 \times \frac{5}{3} = 10$ cm.'
      explanation: '$k^3 = \frac{250}{54} = \frac{125}{27}$, so $k = \frac{5}{3}$ and the height is $6 \times \frac{5}{3} = 10$ cm. Using $\frac{250}{54}$ directly on a length is the mistake to avoid.'
  area-to-volume:
    label: 'Spot the mistake'
    question:
      type: mcq
      prompt: 'Two similar statues have surface areas in the ratio $4 : 9$. Lek says their volumes are in the ratio $8 : 27$ … no, $16 : 81$. Which is right?'
      options:
        - { id: a, text: '$8 : 27$' }
        - { id: b, text: '$16 : 81$' }
        - { id: c, text: '$4 : 9$' }
        - { id: d, text: '$2 : 3$' }
      answer: a
      hints: ['Go back to lengths first.']
      explanation: 'Area ratio $4 : 9$ means length ratio $\sqrt{4} : \sqrt{9} = 2 : 3$. Volume ratio is $2^3 : 3^3 = 8 : 27$. Squaring the area ratio ($16 : 81$) jumps to the fourth power.'
keyRules:
  - title: 'Converting squared and cubed units'
    formula: '1\ \text{m}^2 = 100^2\ \text{cm}^2 = 10\,000\ \text{cm}^2 \qquad 1\ \text{m}^3 = 100^3\ \text{cm}^3 = 1\,000\,000\ \text{cm}^3'
    body: 'Square the length conversion for area, cube it for volume. Also: $1$ ha $= 10\,000\ \text{m}^2$, $1\ \text{km}^2 = 100$ ha, $1\ \text{cm}^3 = 1$ mL, $1\ \text{m}^3 = 1000$ L.'
  - title: 'Similar shapes and solids'
    formula: '\text{lengths} \times k \qquad \text{areas} \times k^2 \qquad \text{volumes (and masses, capacities)} \times k^3'
    body: '$k$ is the length scale factor, e.g. $\frac{\text{new height}}{\text{old height}}$. Mass and capacity behave like volume when the material is the same.'
  - title: 'Working backwards'
    body: 'Given an area ratio, **square root** it to get the length ratio. Given a volume ratio, **cube root** it. Always go back to lengths before going forward to the other measure.'
workedExamples:
  - title: 'Rain on a roof (mixed units)'
    problem: 'A roof is $12\ \text{m}$ by $8.5\ \text{m}$. $18\ \text{mm}$ of rain falls on it. How many litres is that?'
    steps:
      - explain: 'Put every length in metres.'
        maths: '18\ \text{mm} = 0.018\ \text{m}'
      - explain: 'Volume = area × depth.'
        maths: 'V = 12 \times 8.5 \times 0.018 = 1.836\ \text{m}^3'
      - explain: 'Change to litres.'
        maths: '1.836 \times 1000 = 1836'
    answer: '1836 litres'
  - title: 'Similar solids: area to volume'
    problem: 'Two similar jugs have surface areas $180\ \text{cm}^2$ and $405\ \text{cm}^2$. The smaller holds $0.8$ litres. How much does the larger hold?'
    steps:
      - explain: 'Area scale factor.'
        maths: 'k^2 = \frac{405}{180} = \frac{9}{4}'
      - explain: 'Square root to get the length scale factor.'
        maths: 'k = \frac{3}{2}'
      - explain: 'Cube it for volume.'
        maths: 'k^3 = \frac{27}{8}'
      - explain: 'Multiply the capacity.'
        maths: '0.8 \times \frac{27}{8} = 2.7'
    answer: '$2.7$ litres'
  - title: 'Similar solids: mass to length'
    problem: 'Two similar solid metal cones have masses $320$ g and $40$ g. The larger has radius $6$ cm. Find the radius of the smaller.'
    steps:
      - explain: 'Mass behaves like volume (same metal).'
        maths: 'k^3 = \frac{40}{320} = \frac{1}{8}'
      - explain: 'Cube root.'
        maths: 'k = \frac{1}{2}'
      - explain: 'Scale the radius.'
        maths: '6 \times \frac{1}{2} = 3'
    answer: '$3$ cm'
practice: area-07
---

[[activity: predict]]

## Squared and cubed units

A square metre is $100$ cm by $100$ cm, so $1\ \text{m}^2 = 10\,000\ \text{cm}^2$ — not 100.
A cubic metre is $100 \times 100 \times 100 = 1\,000\,000\ \text{cm}^3$. Whatever the length
conversion is, **square it for area and cube it for volume**.

[[activity: grid]]

| Length | Area | Volume |
| --- | --- | --- |
| $1\ \text{cm} = 10\ \text{mm}$ | $1\ \text{cm}^2 = 100\ \text{mm}^2$ | $1\ \text{cm}^3 = 1000\ \text{mm}^3 = 1$ mL |
| $1\ \text{m} = 100\ \text{cm}$ | $1\ \text{m}^2 = 10\,000\ \text{cm}^2$ | $1\ \text{m}^3 = 1\,000\,000\ \text{cm}^3 = 1000$ L |
| $1\ \text{km} = 1000\ \text{m}$ | $1\ \text{km}^2 = 1\,000\,000\ \text{m}^2 = 100$ ha | — |

In a problem with mixed units, convert **every length first**, then calculate. Converting a
finished area or volume is possible but needs the squared or cubed factor.

[[activity: units-check]]

## Similar solids

Two solids are **similar** if one is an enlargement of the other. If every length is
multiplied by $k$:

- every **area** (a face, the surface area, a cross-section) is multiplied by $k^2$;
- every **volume** — and so every capacity, and every mass if the material is the same —
  is multiplied by $k^3$.

[[activity: scale]]

## Working backwards

Often you are given an area ratio or a volume ratio and asked for something else. The
route always goes **through the lengths**:

$$\text{area ratio} \xrightarrow{\sqrt{\ }} \text{length ratio} \xrightarrow{(\ )^3} \text{volume ratio}$$

[[activity: backwards]]

[[activity: area-to-volume]]
