---
title: Pythagoras' Theorem
topic: area-perimeter-volume
order: 2
minutes: 28
difficulty: core
summary: 'Finding a missing side of a right-angled triangle — and knowing whether to add or subtract.'
objectives:
  - 'Identify the hypotenuse of a right-angled triangle'
  - 'Use $a^2 + b^2 = c^2$ to find the hypotenuse'
  - 'Rearrange it to find a shorter side'
  - 'Decide whether a triangle is right-angled'
  - 'Apply the theorem to a real problem'
keyRules:
  - title: "Pythagoras' theorem"
    formula: 'a^2 + b^2 = c^2'
    body: 'For a **right-angled** triangle only, where $c$ is the hypotenuse and $a$ and $b$ are the two shorter sides.'
  - title: 'The hypotenuse'
    body: 'The longest side, always **opposite the right angle**, never one of the two sides that form it. Find it first, every time, before writing anything down.'
  - title: 'Finding the hypotenuse — add'
    formula: 'c = \sqrt{a^2 + b^2}'
    body: 'Square both short sides, add, square root.'
  - title: 'Finding a shorter side — subtract'
    formula: 'a = \sqrt{c^2 - b^2}'
    body: 'Square the hypotenuse, **subtract** the other square, square root. Always the big square minus the small one.'
  - title: 'Is it right-angled?'
    body: 'Test whether $a^2 + b^2 = c^2$ using the longest side as $c$. If the two sides are equal, the triangle is right-angled; if not, it is not.'
visual:
  widget: pythagoras
  title: 'Drag the triangle'
  caption: 'Drag the two red corners to change the short sides, and watch $a^2 + b^2$ and $c$ update. Try $a = 3, b = 4$ and then $a = 6, b = 8$ — both give whole-number hypotenuses. These are called Pythagorean triples.'
  config:
    min: 1
    max: 10
    step: 1
    unit: cm
workedExamples:
  - title: 'Finding the hypotenuse'
    problem: 'A right-angled triangle has shorter sides $3\ \text{cm}$ and $4\ \text{cm}$. Find the hypotenuse.'
    steps:
      - explain: 'Identify what you are looking for. Both given sides form the right angle, so the missing side is the hypotenuse — you will be **adding**.'
      - explain: 'Write the theorem.'
        maths: 'a^2 + b^2 = c^2'
      - explain: 'Substitute and square each one.'
        maths: '3^2 + 4^2 = c^2 \quad\Rightarrow\quad 9 + 16 = c^2'
      - explain: 'Add.'
        maths: '25 = c^2'
      - explain: 'Take the square root. Do not stop at 25 — that is $c^2$, not $c$.'
        maths: 'c = \sqrt{25} = 5'
    answer: '$5\ \text{cm}$'
  - title: 'Finding a shorter side'
    problem: 'A right-angled triangle has hypotenuse $12\ \text{cm}$ and one shorter side $4\ \text{cm}$. Find the other shorter side, to 2 decimal places.'
    steps:
      - explain: 'The 12 is the hypotenuse, so the missing side is a shorter one — you will be **subtracting**.'
      - explain: 'Start from the theorem and substitute.'
        maths: 'a^2 + 4^2 = 12^2'
      - explain: 'Work out both squares.'
        maths: 'a^2 + 16 = 144'
      - explain: 'Subtract 16 from both sides.'
        maths: 'a^2 = 144 - 16 = 128'
      - explain: 'Square root.'
        maths: 'a = \sqrt{128} = 11.313\dots'
    answer: '$11.31\ \text{cm}$ (to 2 d.p.)'
  - title: 'Testing for a right angle'
    problem: 'Is a triangle with sides $8\ \text{cm}$, $15\ \text{cm}$ and $17\ \text{cm}$ right-angled?'
    steps:
      - explain: 'The longest side would have to be the hypotenuse, so test with $c = 17$.'
      - explain: 'Work out the two short sides squared and added.'
        maths: '8^2 + 15^2 = 64 + 225 = 289'
      - explain: 'Work out the longest side squared.'
        maths: '17^2 = 289'
      - explain: 'They are equal, so the theorem holds.'
        maths: '289 = 289 \;\checkmark'
    answer: 'Yes — it is right-angled'
  - title: 'A real problem'
    problem: 'A ladder $5\ \text{m}$ long leans against a wall with its foot $1.5\ \text{m}$ from the base. How far up the wall does it reach, to 2 decimal places?'
    steps:
      - explain: 'Sketch it. The wall is vertical, the ground horizontal, so the right angle is where they meet — and the ladder is the hypotenuse.'
      - explain: 'The ladder is the longest side, so this is a "find a shorter side" problem: subtract.'
        maths: 'h^2 + 1.5^2 = 5^2'
      - explain: 'Square both known values.'
        maths: 'h^2 + 2.25 = 25'
      - explain: 'Subtract.'
        maths: 'h^2 = 22.75'
      - explain: 'Square root.'
        maths: 'h = \sqrt{22.75} = 4.769\dots'
    answer: 'About $4.77\ \text{m}$ up the wall'
practice: area-02
---

## Find the hypotenuse first

Before touching a formula, find the **hypotenuse**: the side opposite the right angle.
It is always the longest side of the triangle.

This one habit removes almost every error in the topic, because it immediately tells
you which version of the calculation you need:

- **The hypotenuse is the missing side** → square and **add**.
- **The hypotenuse is one of the given sides** → square and **subtract**.

Use the interactive triangle above to get a feel for it: as you drag the corners,
notice that $c$ is always bigger than either short side, but always smaller than their
sum.

## The method

1. **Label** the right angle and identify the hypotenuse.
2. **Decide**: adding or subtracting?
3. **Square** the two sides you know.
4. **Add or subtract** as appropriate.
5. **Square root** — this is the step people forget, leaving the answer as $c^2$.
6. **Check it is sensible**: the hypotenuse must be the largest of the three sides.

## The sensible-answer check

This catches most slips in seconds. If you find a hypotenuse of $3\ \text{cm}$ for a
triangle with a $4\ \text{cm}$ side, you have subtracted when you should have added.

Equally, a shorter side must come out **smaller** than the hypotenuse. If it does not,
go back.

## Real problems

Pythagoras appears in disguise whenever there is a right angle:

- a ladder against a wall (ground, wall, ladder)
- the diagonal of a rectangle or a TV screen
- the straight-line distance between two points on a grid
- the height of an isosceles triangle, by cutting it in half

The first move is always the same: **sketch it, mark the right angle, and label the
hypotenuse.** Once you have done that, the rest is arithmetic.

> **Pythagorean triples.** Some triangles have whole-number sides: $3, 4, 5$;
> $5, 12, 13$; $8, 15, 17$; $7, 24, 25$. Their multiples work too, so $6, 8, 10$ and
> $9, 12, 15$ are also triples. Spotting one saves you the calculator — and examiners
> use them often.
