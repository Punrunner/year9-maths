---
title: Scales and Bearings on Maps
topic: shapes-drawings
order: 3
minutes: 30
difficulty: core
summary: 'Using map scales and three-figure bearings together to plot journeys and find distances.'
objectives:
  - 'Measure and write a three-figure bearing'
  - 'Convert between map distances and real distances using a scale'
  - 'Make a scale drawing of a journey to find distances East/West and North/South'
  - 'Find the back bearing of a journey'
keyRules:
  - title: 'Three-figure bearings'
    body: 'A bearing is an angle measured **clockwise from North**, always written with three figures: East is $090^\circ$, South is $180^\circ$, and $47^\circ$ is written $047^\circ$.'
  - title: 'Always start at the “from” point'
    body: '*The bearing of B **from** A* means: stand at A, face North, turn clockwise until you face B. Draw the North line at A.'
  - title: 'Back bearings'
    formula: '\text{back bearing} = \text{bearing} \pm 180^\circ'
    body: 'If B is on a bearing of $070^\circ$ from A, then A is on a bearing of $250^\circ$ from B. Add $180^\circ$ if the bearing is under $180^\circ$, otherwise subtract it.'
  - title: 'Scales'
    body: 'A scale of $1 : 100\,000$ means 1 cm on the map is $100\,000$ cm $= 1$ km in real life. A scale like "1 cm to 20 km" works the same way.'
visual:
  widget: bearing
  title: 'Bearing explorer'
  caption: 'Drag the pointer, or use the slider. This one is set for a 100 km journey: watch how the East/West and North/South distances change as you turn. Try $147^\circ$ from the first worked example.'
  config:
    distance: 100
    unit: 'km'
workedExamples:
  - title: 'A scale drawing of a journey'
    problem: 'A ship sails from port on a bearing of $147^\circ$ for 100 km. Using 1 cm to represent 20 km, find how far East and how far South it has gone.'
    steps:
      - explain: 'Work out the length to draw.'
        maths: '100 \div 20 = 5\ \text{cm}'
      - explain: 'Draw a North line at the port. Measure $147^\circ$ clockwise from North and draw a 5 cm line.'
      - explain: 'From the end, draw a line straight across to the North–South line. Measure the two sides of the right-angled triangle.'
        maths: '\text{East} \approx 2.7\ \text{cm}, \quad \text{South} \approx 4.2\ \text{cm}'
      - explain: 'Convert back using the scale.'
        maths: '2.7 \times 20 = 54\ \text{km East}, \quad 4.2 \times 20 = 84\ \text{km South}'
    answer: 'About 54 km East and 84 km South.'
  - title: 'Finding a position from two bearings'
    problem: 'Town C is on a bearing of $070^\circ$ from town A and on a bearing of $310^\circ$ from town B. How do you find C?'
    steps:
      - explain: 'Draw a North line at A. Measure $70^\circ$ clockwise and draw a long line.'
      - explain: 'Draw a North line at B. $310^\circ$ is more than $180^\circ$, so it is easier to measure $360^\circ - 310^\circ = 50^\circ$ **anticlockwise** from North.'
        maths: '360^\circ - 310^\circ = 50^\circ'
      - explain: 'C is where the two lines cross.'
    answer: 'C is the intersection of the two bearing lines.'
  - title: 'Back bearing and a map scale'
    problem: 'On a $1 : 400\,000$ map, ship C is 7.5 cm from ship A. How far apart are they in real life? And if C is on a bearing of $060^\circ$ from A, what is the bearing of A from C?'
    steps:
      - explain: 'Multiply the map distance by the scale.'
        maths: '7.5 \times 400\,000 = 3\,000\,000\ \text{cm}'
      - explain: 'Convert to km: $100\,000$ cm $= 1$ km.'
        maths: '3\,000\,000 \div 100\,000 = 30\ \text{km}'
      - explain: 'The back bearing adds $180^\circ$.'
        maths: '060^\circ + 180^\circ = 240^\circ'
    answer: '30 km apart; A is on a bearing of $240^\circ$ from C.'
practice: shapes-03
---

## Why this matters

Pilots, sailors, hikers and search-and-rescue teams all navigate with bearings. Combined
with a scale, a bearing turns "that way, a long way" into a precise instruction such as
*"sail $147^\circ$ for 100 km"* — and lets you work out exactly where you will end up.

## Reading a bearing

| Direction | Bearing |
| --- | --- |
| North | $000^\circ$ |
| North-East | $045^\circ$ |
| East | $090^\circ$ |
| South | $180^\circ$ |
| South-West | $225^\circ$ |
| West | $270^\circ$ |
| North-West | $315^\circ$ |

Bearings between $000^\circ$ and $090^\circ$ point somewhere North-East; $090^\circ$–$180^\circ$
South-East; $180^\circ$–$270^\circ$ South-West; $270^\circ$–$360^\circ$ North-West.

## Map scales

| Map scale | 1 cm on the map is … |
| --- | --- |
| $1 : 50\,000$ | $50\,000$ cm $= 500$ m |
| $1 : 100\,000$ | $100\,000$ cm $= 1$ km |
| $1 : 400\,000$ | $400\,000$ cm $= 4$ km |

To go **map → real**, multiply by the scale. To go **real → map**, divide.

## Working backwards

If a ship ends 10 km East and 20 km South of port, draw the right-angled triangle to scale,
join the port to the finishing point and measure the angle **from North, clockwise**. Here the
line points South-East, a little East of due South, so the bearing is about $153^\circ$. The
length of that line, converted with the scale, is the distance sailed (about 22 km).

> **Protractor tip.** For bearings over $180^\circ$, measure the angle anticlockwise from
> North and subtract it from $360^\circ$ — it is much easier than measuring round the long
> way.
