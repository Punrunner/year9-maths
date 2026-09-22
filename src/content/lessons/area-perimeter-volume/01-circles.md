---
title: Circles
topic: area-perimeter-volume
order: 1
minutes: 25
difficulty: core
summary: 'Circumference and area, working backwards to find a radius, and dealing with semicircles and compound shapes.'
objectives:
  - 'Name the parts of a circle'
  - 'Find the circumference of a circle from its radius or diameter'
  - 'Find the area of a circle'
  - 'Work backwards from an area or circumference to find the radius'
  - 'Find the perimeter and area of semicircles and compound shapes'
keyRules:
  - title: 'Circumference'
    formula: 'C = 2\pi r = \pi d'
    body: 'The distance all the way round. Use $2\pi r$ if you are given the radius, $\pi d$ if you are given the diameter — they are the same formula, since $d = 2r$.'
  - title: 'Area'
    formula: 'A = \pi r^2'
    body: 'Always the **radius**, and always squared. If the question gives you the diameter, halve it first — this is the single most common mistake in the topic.'
  - title: 'Radius and diameter'
    formula: 'd = 2r \qquad r = \frac{d}{2}'
    body: 'The radius runs from the centre to the edge; the diameter runs right across through the centre.'
  - title: 'Working backwards'
    body: 'Given the area, reverse the formula: divide by $\pi$, then take the square root. Given the circumference, just divide by $2\pi$.'
  - title: 'Units'
    body: 'Circumference is a length, so cm. Area is a region, so $\text{cm}^2$. Writing the wrong unit costs a mark even when the number is right.'
visual:
  widget: polygon-angles
  title: 'Why $\pi$ turns up'
  caption: 'Drag the number of sides up towards 12 and watch the polygon get rounder. A circle is what you get as the number of sides keeps growing — which is why circle formulas cannot be built from straight-line ones, and need $\pi$ instead.'
  config:
    start:
      n: 6
workedExamples:
  - title: 'Circumference from a radius'
    problem: 'Find the circumference of a circle with radius $6\ \text{cm}$. Use $\pi = 3.14$.'
    steps:
      - explain: 'Write down the formula for circumference using the radius.'
        maths: 'C = 2\pi r'
      - explain: 'Substitute the values.'
        maths: 'C = 2 \times 3.14 \times 6'
      - explain: 'Multiply.'
        maths: 'C = 37.68'
      - explain: 'Add the unit — a circumference is a length.'
    answer: '$37.68\ \text{cm}$'
  - title: 'Area from a diameter'
    problem: 'Find the area of a circle with diameter $10\ \text{cm}$. Use $\pi = 3.14$.'
    steps:
      - explain: 'The area formula needs the **radius**, so halve the diameter first.'
        maths: 'r = \frac{10}{2} = 5 \text{ cm}'
      - explain: 'Write the formula.'
        maths: 'A = \pi r^2'
      - explain: 'Square the radius before multiplying — not $(\pi r)^2$.'
        maths: 'A = 3.14 \times 5^2 = 3.14 \times 25'
      - explain: 'Multiply out.'
        maths: 'A = 78.5'
    answer: '$78.5\ \text{cm}^2$'
  - title: 'Working backwards from an area'
    problem: 'A circle has area $50.24\ \text{cm}^2$. Find its radius, using $\pi = 3.14$.'
    steps:
      - explain: 'Start from the formula and substitute what you know.'
        maths: '50.24 = 3.14 \times r^2'
      - explain: 'Undo the multiplication by dividing both sides by $\pi$.'
        maths: 'r^2 = \frac{50.24}{3.14} = 16'
      - explain: 'Undo the square by taking the square root.'
        maths: 'r = \sqrt{16} = 4'
    answer: '$r = 4\ \text{cm}$'
  - title: 'The perimeter of a semicircle'
    problem: 'Find the perimeter of a semicircle with diameter $8.2\ \text{cm}$. Use $\pi = 3.14$.'
    steps:
      - explain: 'The curved part is half of a full circumference.'
        maths: '\tfrac{1}{2} \times \pi d = \tfrac{1}{2} \times 3.14 \times 8.2 = 12.874'
      - explain: 'A perimeter goes all the way round the shape, so the straight edge counts too. This is the step everyone forgets.'
        maths: '12.874 + 8.2'
      - explain: 'Add them.'
        maths: '= 21.074'
    answer: '$21.07\ \text{cm}$ (to 2 d.p.)'
practice: area-01
---

## The parts of a circle

Before any formula, the vocabulary — most mistakes here are really vocabulary
mistakes:

- **Centre** — the middle point.
- **Radius** ($r$) — from the centre to the edge.
- **Diameter** ($d$) — right across, through the centre. Twice the radius.
- **Circumference** ($C$) — the distance all the way round the outside.
- **Chord** — a straight line joining two points on the edge, *not* through the centre.
- **Arc** — part of the circumference.

## Where $\pi$ comes from

Measure the circumference of any circular object and divide by its diameter. A tin, a
plate, a coin — you always get the same number, roughly $3.14$. That constant ratio is
$\pi$.

So $C \div d = \pi$, which rearranges to $C = \pi d$. And since $d = 2r$, the same
formula can be written $C = 2\pi r$.

Your textbook uses $\pi \approx 3.14$, which is fine for this course. Your calculator's
$\pi$ button is more accurate, and your answers will differ very slightly — say which
you used.

## The two formulas, and the trap between them

$$C = 2\pi r \qquad\qquad A = \pi r^2$$

Almost every lost mark in this topic is one of these three:

1. **Using the diameter in the area formula.** $A = \pi r^2$ needs the radius. If you
   are given $d = 10$, use $r = 5$, not 10. Getting this wrong multiplies your answer
   by four.
2. **Squaring the wrong thing.** $\pi r^2$ means $\pi \times r \times r$. Square the
   radius *first*, then multiply by $\pi$.
3. **The wrong units.** Lengths are cm; areas are $\text{cm}^2$.

## Working backwards

Questions often give you the area or circumference and ask for the radius. Just
reverse the operations:

| You know | To find $r$ |
| --- | --- |
| Circumference $C$ | $r = \dfrac{C}{2\pi}$ |
| Area $A$ | $r = \sqrt{\dfrac{A}{\pi}}$ |

For the area one, divide by $\pi$ **first**, then square root. Doing it the other way
round gives nonsense.

## Semicircles and compound shapes

For **area**, halve the circle's area — straightforward.

For **perimeter**, halve the *curved* part, then **add the straight diameter back on**.
A perimeter is the distance round the whole edge, and the flat side is part of that
edge. Forgetting it is the classic semicircle error.

For a shape built from a rectangle and a semicircle, work out each piece separately
and combine them — and think carefully about which edges are on the *outside* of the
finished shape.
