---
title: Enlargement
topic: transformations
order: 1
minutes: 25
difficulty: core
summary: 'Enlarging a shape from a centre by a scale factor, finding the centre and scale factor, and what happens to perimeter and area.'
objectives:
  - 'Enlarge a shape using a centre and a scale factor, including fractional scale factors'
  - 'Find the scale factor and the centre of an enlargement'
  - 'Know that lengths and perimeters multiply by $k$'
  - 'Know that areas multiply by $k^2$'
keyRules:
  - title: 'Two things define an enlargement'
    body: 'The **centre of enlargement** and the **scale factor**. Every point of the image is $k$ times as far from the centre as the matching point of the object, in the same direction.'
  - title: 'Counting squares'
    body: 'From O to A is 2 right and 2 up. With scale factor 2, from O to A′ is 4 right and 4 up.'
  - title: 'Scale factors less than 1'
    body: 'A scale factor between 0 and 1 makes the shape **smaller** and moves it towards the centre. It is still called an enlargement.'
  - title: 'Perimeter and area'
    formula: '\text{perimeter} \times k \qquad \text{area} \times k^2'
    body: 'Every length is multiplied by $k$, so the perimeter is too. Area uses two lengths multiplied together, so it grows by $k \times k = k^2$.'
visual:
  widget: enlargement
  title: 'Enlargement explorer'
  caption: 'Move the centre and change the scale factor. The dashed rays from the centre pass through matching corners of the object and the image. Try a scale factor of 0.5.'
workedExamples:
  - title: 'Drawing an enlargement'
    problem: 'OA = 3 cm, OB = 2 cm and OC = 4 cm. Enlarge triangle ABC with centre O and scale factor 2.'
    steps:
      - explain: 'Multiply each distance from the centre by 2.'
        maths: 'OA'' = 6\ \text{cm}, \quad OB'' = 4\ \text{cm}, \quad OC'' = 8\ \text{cm}'
      - explain: 'Measure each distance along the ray from O through the original point, and join the new points.'
    answer: 'A′, B′ and C′ are twice as far from O as A, B and C.'
  - title: 'Finding the centre and scale factor'
    problem: 'Triangle BCD is enlarged to B′C′D′. CB = 3 and C′B′ = 9. How do you describe the enlargement?'
    steps:
      - explain: 'Compare matching sides.'
        maths: 'k = \frac{9}{3} = 3'
      - explain: 'Join each point to its image and extend the lines. They meet at the centre.'
    answer: 'Enlargement, scale factor 3, centre where the lines meet (here $(-3, 1)$).'
  - title: 'Area after enlargement'
    problem: 'A triangle has perimeter 12 cm and area 6 cm². Find the perimeter and area of its image after an enlargement with scale factor 3.'
    steps:
      - explain: 'Perimeter multiplies by $k$.'
        maths: '12 \times 3 = 36\ \text{cm}'
      - explain: 'Area multiplies by $k^2$.'
        maths: '6 \times 3^2 = 54\ \text{cm}^2'
    answer: 'Perimeter 36 cm, area 54 cm²'
practice: transformations-01
---

## Why this matters

Enlargements are how photographs are resized, maps are drawn to scale and models are built.
Understanding the effect on area matters too: a poster twice as wide needs **four** times as much
paper.

## Virenda's mistake

Virenda's trapezium has perimeter 16 cm and area 16 cm². He enlarges it until the perimeter is
96 cm and thinks the area must be 96 cm² too. The scale factor is $96 \div 16 = 6$, so the area is
$16 \times 6^2 = 576$ cm², not 96.

## Finding a scale factor from areas

A hexagon of area 21 cm² is enlarged to 525 cm². The area has multiplied by $525 \div 21 = 25$, so
$k^2 = 25$ and $k = 5$.

> **Congruent or similar?** An enlargement changes the size but not the shape, so the image is
> **similar** to the object. Reflections, rotations and translations give **congruent** images.
