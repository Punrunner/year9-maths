---
title: Real-Life Graphs
topic: sequences-functions-graphs
order: 5
minutes: 25
difficulty: core
summary: 'Distance–time and speed–time graphs: what the gradient means when the axes are not just x and y.'
objectives:
  - 'Read distance, time and speed from a distance–time graph'
  - 'Work out a speed from the gradient of a section'
  - 'Interpret a flat section, a steep section and a return journey'
  - 'Find acceleration and deceleration from a speed–time graph'
  - 'Calculate an average speed over a whole journey'
keyRules:
  - title: 'Speed from a distance–time graph'
    formula: '\text{speed} = \frac{\text{distance}}{\text{time}} = \text{the gradient of the line}'
    body: 'A **steeper** section means a faster speed. A **flat** section means distance is not changing — the object is stationary.'
  - title: 'Acceleration from a speed–time graph'
    formula: '\text{acceleration} = \frac{\text{change in speed}}{\text{time taken}}'
    body: 'This is the gradient again, but of a *speed*–time graph. A downward slope is a **deceleration** and comes out negative.'
  - title: 'Average speed'
    formula: '\text{average speed} = \frac{\text{total distance}}{\text{total time}}'
    body: 'Use the **whole** journey, including any time spent stopped. It is almost never the average of the individual speeds.'
  - title: 'Read the axes first'
    body: 'A flat line on a distance–time graph means *not moving*. A flat line on a speed–time graph means *moving at a steady speed*. Same shape, opposite meaning — always check the vertical axis label.'
workedExamples:
  - title: 'Speed from a section'
    problem: 'On a distance–time graph, a car travels from 0 km to 40 km in the first hour. Find its speed.'
    steps:
      - explain: 'The speed is the gradient: how far up, divided by how far across.'
        maths: '\text{speed} = \frac{\text{distance}}{\text{time}}'
      - explain: 'Substitute the values read off the graph.'
        maths: '= \frac{40 \text{ km}}{1 \text{ h}}'
      - explain: 'Work it out, and keep the units.'
        maths: '= 40 \text{ km/h}'
    answer: '40 km/h'
  - title: 'A journey with a stop'
    problem: 'A cyclist rides 40 km in 1 hour, rests for 1.5 hours, then rides a further 15 km in 2.5 hours. Find the average speed for the whole journey.'
    steps:
      - explain: 'Add up the total distance.'
        maths: '40 + 15 = 55 \text{ km}'
      - explain: 'Add up the total time, **including the rest**.'
        maths: '1 + 1.5 + 2.5 = 5 \text{ hours}'
      - explain: 'Divide total distance by total time.'
        maths: '\text{average speed} = \frac{55}{5} = 11 \text{ km/h}'
      - explain: 'Note that this is not the average of 40 km/h and 6 km/h — the rest and the different durations both matter.'
    answer: '11 km/h'
  - title: 'Deceleration'
    problem: 'On a speed–time graph, a car slows from 25 m/s to 0 m/s over 12 seconds. Find the deceleration.'
    steps:
      - explain: 'Find the change in speed. It is negative because the car is slowing.'
        maths: '0 - 25 = -25 \text{ m/s}'
      - explain: 'Divide by the time taken.'
        maths: '\frac{-25}{12} = -2.08\dots'
      - explain: 'Round sensibly and describe it in words.'
        maths: '\approx -2.1 \text{ m/s}^2'
    answer: 'A deceleration of about $2.1\ \text{m/s}^2$'
visual:
  widget: line-mc
  title: 'Gradient as a rate'
  caption: 'Imagine the horizontal axis is time in hours and the vertical axis is distance in km. Then the gradient $m$ **is** the speed. Set $m = 60$ in your head: 60 km every hour. A flat line ($m = 0$) means stopped.'
  config:
    start:
      m: 3
      c: 0
practice: sequences-05
---

## The same maths, different labels

You already know how to find a gradient. Real-life graphs simply put meaningful
quantities on the axes, and then the gradient stops being an abstract number and
becomes something you can describe in words.

| Vertical axis | Horizontal axis | The gradient means |
| --- | --- | --- |
| Distance | Time | Speed |
| Speed | Time | Acceleration |
| Cost | Number of items | Price per item |
| Volume | Time | Flow rate |

That is the whole idea of the topic. Look at the axes, and the gradient tells you the
rate.

## Reading a distance–time graph

- **A steep line** — covering a lot of distance in little time, so a high speed.
- **A gentle line** — slower.
- **A flat line** — the distance is not changing at all, so the object is
  **stationary**. This is the single most commonly misread feature: a flat line does
  *not* mean "constant speed".
- **A line coming back down** — the distance from the starting point is decreasing, so
  the object is returning.

## Average speed is not the average of the speeds

If you drive 60 km/h for one hour and 20 km/h for three hours, the average speed is
**not** 40 km/h. Work it out properly:

$$\text{average speed} = \frac{\text{total distance}}{\text{total time}} = \frac{60 + 60}{4} = 30 \text{ km/h}$$

Any time spent stopped counts in the total time. This is exactly why the answer is
lower than you might guess.

## Speed–time graphs

Swap the vertical axis to speed and everything shifts meaning:

- **A flat line** now means a **constant speed** — still moving, just not changing.
- **An upward slope** means accelerating.
- **A downward slope** means decelerating, and the gradient comes out negative.

Because the two graph types look so similar, always read the vertical axis label
before saying anything about a flat section. Getting that wrong turns a correct
calculation into a wrong answer.

> **Units follow the axes.** Distance in km and time in hours gives km/h. Distance in
> metres and time in seconds gives m/s. Speed in m/s divided by time in seconds gives
> $\text{m/s}^2$. Write the units down as you go and they will look after themselves.
