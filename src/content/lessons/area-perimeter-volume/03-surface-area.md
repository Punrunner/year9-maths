---
title: Surface Area of Prisms and Cylinders
topic: area-perimeter-volume
order: 3
minutes: 25
difficulty: core
summary: 'Adding up the areas of every face — and the net that makes a cylinder make sense.'
objectives:
  - 'Say what makes a solid a prism'
  - 'Find the total surface area of a prism by adding its faces'
  - 'Use a net to keep track of every face'
  - 'Find the total surface area of a cylinder'
keyRules:
  - title: 'What a prism is'
    body: 'A solid with the **same cross-section all the way along**. Slice it anywhere parallel to its ends and you get an identical shape. A cylinder is a prism with a circular cross-section; a cone and a sphere are not prisms.'
  - title: 'Total surface area of a prism'
    formula: '\text{TSA} = 2 \times (\text{area of cross-section}) + (\text{perimeter of cross-section}) \times (\text{length})'
    body: 'The two ends, plus the "wrapper" round the outside. You can also simply add up every face one by one — slower, but harder to get wrong.'
  - title: 'Total surface area of a cylinder'
    formula: '\text{TSA} = 2\pi r^2 + 2\pi r h'
    body: 'Two circular ends ($2 \times \pi r^2$), plus the curved surface. Unrolled, that curved surface is a **rectangle** whose width is the circumference $2\pi r$ and whose height is $h$.'
  - title: 'Units'
    body: 'Surface area is an area, so $\text{cm}^2$ — never $\text{cm}^3$, however solid the object looks.'
visual:
  widget: prism
  title: 'Cuboid explorer'
  caption: 'Change the three dimensions and watch the surface area change. Notice that doubling one side does **not** double the surface area — only the faces that use that side grow.'
  config:
    unit: cm
    start:
      l: 6
      w: 3
      h: 4
workedExamples:
  - title: 'A cuboid'
    problem: 'Find the total surface area of a cuboid measuring $6\ \text{cm}$ by $3\ \text{cm}$ by $4\ \text{cm}$.'
    steps:
      - explain: 'A cuboid has three pairs of identical faces. Work out one of each pair.'
        maths: '6 \times 3 = 18, \qquad 6 \times 4 = 24, \qquad 3 \times 4 = 12'
      - explain: 'Add the three, then double, because each one appears twice.'
        maths: '18 + 24 + 12 = 54'
      - explain: 'Double it.'
        maths: '2 \times 54 = 108'
    answer: '$108\ \text{cm}^2$'
  - title: 'A triangular prism'
    problem: 'A triangular prism has a right-angled triangular cross-section with sides $3\ \text{cm}$, $4\ \text{cm}$ and $5\ \text{cm}$, and a length of $12\ \text{cm}$. Find its total surface area.'
    steps:
      - explain: 'Find the area of the triangular cross-section. There are two of these ends.'
        maths: '\tfrac{1}{2} \times 3 \times 4 = 6 \text{ cm}^2 \quad\text{each}'
      - explain: 'Two ends, so double it.'
        maths: '2 \times 6 = 12 \text{ cm}^2'
      - explain: 'The three rectangles around the outside each have length 12. Their widths are the three sides of the triangle.'
        maths: '(12 \times 3) + (12 \times 4) + (12 \times 5) = 36 + 48 + 60 = 144'
      - explain: 'Add the ends and the wrapper.'
        maths: '12 + 144 = 156'
    answer: '$156\ \text{cm}^2$'
  - title: 'A cylinder'
    problem: 'Find the total surface area of a cylinder with radius $6\ \text{cm}$ and height $10\ \text{cm}$. Use $\pi = 3.14$.'
    steps:
      - explain: 'Find the area of one circular end.'
        maths: '\pi r^2 = 3.14 \times 36 = 113.04'
      - explain: 'There are two ends.'
        maths: '2 \times 113.04 = 226.08'
      - explain: 'The curved surface unrolls into a rectangle: circumference wide, height tall.'
        maths: '2\pi r h = 2 \times 3.14 \times 6 \times 10 = 376.8'
      - explain: 'Add the two parts.'
        maths: '226.08 + 376.8 = 602.88'
    answer: '$602.88\ \text{cm}^2$'
practice: area-03
---

## What counts as a prism

A **prism** has the same cross-section all the way through. Imagine slicing it like a
loaf of bread: every slice is identical.

| Solid | Prism? | Why |
| --- | --- | --- |
| Cuboid | Yes | Every slice is the same rectangle |
| Triangular prism | Yes | Every slice is the same triangle |
| Cylinder | Yes | Every slice is the same circle |
| Cone | **No** | The circles get smaller towards the point |
| Sphere | **No** | The circles change size throughout |
| Pyramid | **No** | The cross-section shrinks towards the apex |

This matters because the prism formulas only work for prisms.

## Surface area means every face

Total surface area is exactly what it sounds like: add up the area of every face on
the outside.

Two ways to do it:

**The careful way** — list every face, work out each area, add them up. Slower, but
you can see what you have done and check nothing is missing.

**The formula way** — two ends plus a wrapper:

$$\text{TSA} = 2 \times \text{(cross-section area)} + \text{(cross-section perimeter)} \times \text{length}$$

Both give the same answer. Use the formula once you trust it; use the careful way when
the shape is unusual.

## Nets: the trick that stops you missing a face

Sketch the solid **unfolded flat**. Once every face is drawn side by side, it is very
hard to forget one — and forgetting a face is the most common error in this topic.

For a cuboid you get six rectangles in a cross shape. For a triangular prism, two
triangles and three rectangles. Count the faces on your net and check the number is
right before you start calculating.

## Why the cylinder formula looks like that

Take a label off a tin and flatten it out. You get a **rectangle**.

- Its **height** is the height of the cylinder, $h$.
- Its **width** is the distance round the tin — the circumference, $2\pi r$.

So the curved surface area is $2\pi r \times h$. Add the two circular ends, $2 \times \pi r^2$, and you have

$$\text{TSA} = 2\pi r^2 + 2\pi r h$$

Once you have seen the label unroll, the formula stops being something to memorise.

> **Watch for open shapes.** A tin without a lid has only *one* circle, not two. A
> pipe has none. Read the question and count the faces the object actually has.
