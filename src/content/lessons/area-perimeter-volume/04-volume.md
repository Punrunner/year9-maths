---
title: Volume of Prisms and Cylinders
topic: area-perimeter-volume
order: 4
minutes: 22
difficulty: core
summary: 'One formula for every prism — cross-section times length — and what to do when you are given the volume instead.'
objectives:
  - 'Find the volume of any prism using cross-section × length'
  - 'Find the volume of a cylinder'
  - 'Work backwards from a volume to find a missing dimension'
  - 'Convert between $\text{cm}^3$, litres and $\text{m}^3$'
keyRules:
  - title: 'Volume of any prism'
    formula: 'V = A \times h'
    body: 'where $A$ is the area of the cross-section and $h$ is the length (or height) between the two identical ends. This single formula covers cuboids, triangular prisms and cylinders.'
  - title: 'Volume of a cylinder'
    formula: 'V = \pi r^2 h'
    body: 'Just $A \times h$ with $A = \pi r^2$. Nothing new to remember.'
  - title: 'Working backwards'
    body: 'Given the volume and asked for a dimension, substitute what you know and solve. For a cylinder: $r = \sqrt{\dfrac{V}{\pi h}}$.'
  - title: 'Volume units'
    formula: '1\ \text{cm}^3 = 1\ \text{ml} \qquad 1000\ \text{cm}^3 = 1\ \text{litre} \qquad 1\ \text{m}^3 = 1\,000\,000\ \text{cm}^3'
    body: 'Volume is always **cubed**: $\text{cm}^3$, $\text{m}^3$. The jump from cm to m is $100^3 = 1\,000\,000$, not 100 — this catches people out constantly.'
visual:
  widget: prism
  title: 'Volume and surface area together'
  caption: 'Change the dimensions and watch both numbers. Try making a long thin box and a near-cube with a similar volume — the long thin one has far more surface area. That is why packaging tends towards cubes.'
  config:
    unit: cm
    start:
      l: 5
      w: 4
      h: 3
workedExamples:
  - title: 'A triangular prism'
    problem: 'A prism has a triangular cross-section of area $60\ \text{m}^2$ and is $15\ \text{m}$ long. Find its volume.'
    steps:
      - explain: 'Use the general prism formula.'
        maths: 'V = A \times h'
      - explain: 'Substitute the values given.'
        maths: 'V = 60 \times 15'
      - explain: 'Multiply, and use cubed units.'
        maths: 'V = 900'
    answer: '$900\ \text{m}^3$'
  - title: 'A cylinder'
    problem: 'Find the volume of a cylinder with radius $3\ \text{cm}$ and height $10\ \text{cm}$. Use $\pi = 3.14$.'
    steps:
      - explain: 'Find the area of the circular cross-section first.'
        maths: 'A = \pi r^2 = 3.14 \times 9 = 28.26 \text{ cm}^2'
      - explain: 'Multiply by the height.'
        maths: 'V = 28.26 \times 10'
      - explain: 'Work it out.'
        maths: 'V = 282.6'
    answer: '$282.6\ \text{cm}^3$'
  - title: 'Working backwards'
    problem: 'A cylinder has volume $1570\ \text{cm}^3$ and height $20\ \text{cm}$. Find its radius. Use $\pi = 3.14$.'
    steps:
      - explain: 'Write the formula and substitute what you know.'
        maths: '1570 = 3.14 \times r^2 \times 20'
      - explain: 'Multiply the two known numbers together to simplify.'
        maths: '1570 = 62.8 \, r^2'
      - explain: 'Divide both sides.'
        maths: 'r^2 = \frac{1570}{62.8} = 25'
      - explain: 'Square root.'
        maths: 'r = 5'
    answer: '$r = 5\ \text{cm}$'
  - title: 'Volume to litres'
    problem: 'A tank measures $50\ \text{cm} \times 40\ \text{cm} \times 30\ \text{cm}$. How many litres does it hold?'
    steps:
      - explain: 'Find the volume in cubic centimetres.'
        maths: '50 \times 40 \times 30 = 60\,000 \text{ cm}^3'
      - explain: 'Convert, using $1000\ \text{cm}^3 = 1$ litre.'
        maths: '60\,000 \div 1000 = 60'
    answer: '60 litres'
practice: area-04
---

## One formula for all of them

Every prism has the same volume formula:

$$V = \text{area of cross-section} \times \text{length}$$

That is genuinely all of it. The reason it works: a prism is the cross-section
"extruded" — pushed along in a straight line. Stack $h$ layers, each one unit thick and
each of area $A$, and you have $A \times h$.

| Prism | Cross-section | Volume |
| --- | --- | --- |
| Cuboid | rectangle, $l \times w$ | $l \times w \times h$ |
| Triangular prism | triangle, $\frac{1}{2}bh$ | $\frac{1}{2}bh \times \text{length}$ |
| Cylinder | circle, $\pi r^2$ | $\pi r^2 h$ |

So there is only one formula to learn, plus the area formulas you already know.

## The method

1. **Identify the cross-section** — the face that repeats all the way along.
2. **Find its area.**
3. **Multiply by the length** between the two ends.
4. **Use cubed units.**

Step 1 is the one worth slowing down for. On a triangular prism lying on its side, the
cross-section is the *triangle*, not the rectangle underneath it — so the "length" you
multiply by is the horizontal distance, not the vertical height of the triangle.

## Working backwards

If the question gives you the volume and asks for a missing dimension, put everything
you know into the formula and solve the equation:

$$V = \pi r^2 h \quad\Rightarrow\quad r^2 = \frac{V}{\pi h} \quad\Rightarrow\quad r = \sqrt{\frac{V}{\pi h}}$$

As with circles, divide first and square root last.

## Units: the bit that catches everyone

$$1\ \text{cm}^3 = 1\ \text{ml} \qquad 1000\ \text{cm}^3 = 1\ \text{litre} \qquad 1\ \text{m}^3 = 1\,000\,000\ \text{cm}^3$$

That last one surprises people. A metre is 100 cm, but a **cubic** metre is
$100 \times 100 \times 100 = 1\,000\,000$ cubic centimetres, because all three
dimensions scale.

The same logic applies to areas: $1\ \text{m}^2 = 10\,000\ \text{cm}^2$, not 100.

> **A quick sense check.** Volumes get big fast. A cylinder with radius 3 cm and
> height 10 cm holds about 283 ml — roughly a small can of drink. If your answer comes
> out as 28 ml or 2830 ml, check your working.
