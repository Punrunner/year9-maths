---
title: Successive and Combined Events
topic: probability
order: 1
minutes: 20
difficulty: core
summary: 'Listing every outcome of two events, and multiplying probabilities when one event does not affect the other.'
objectives:
  - 'Use the fact that the probabilities of all outcomes add up to 1'
  - 'Decide whether two events are independent or dependent'
  - 'List all the outcomes of two successive events in a sample space diagram'
  - 'Find the probability of one event **and** another happening'
keyRules:
  - title: 'All the probabilities add to 1'
    formula: 'P(\text{A}) + P(\text{not A}) = 1'
    body: 'If you list every outcome that could happen and none of them overlap, their probabilities must total exactly 1. So the probability something does *not* happen is $1 - P(\text{it does})$.'
  - title: 'Independent events'
    body: 'Two events are **independent** when the first one happening does not change the chance of the second. Rolling a dice then spinning a spinner: independent. Taking two sweets out of a bag *without putting the first one back*: **not** independent, because the bag has changed.'
  - title: 'The AND rule'
    formula: 'P(\text{A and B}) = P(\text{A}) \times P(\text{B})'
    body: 'For **independent** events, multiply. This is the single most useful rule in the topic — but it only works when the events really are independent.'
  - title: 'The OR rule for outcomes that cannot both happen'
    formula: 'P(\text{A or B}) = P(\text{A}) + P(\text{B})'
    body: 'If two outcomes are mutually exclusive — they cannot both happen at once — add their probabilities.'
visual:
  widget: spinner
  title: 'Spinner and outcomes'
  caption: 'Four equal sections, so each has probability $\frac{1}{4}$. Spin it a few times — notice that the results are *not* evenly spread at first. That is normal, and the next lesson but one explains why.'
  config:
    sectors: ['Red', 'Blue', 'Green', 'Yellow']
    focus: 0
workedExamples:
  - title: 'Finding a missing probability'
    problem: 'A bag holds only red, green and black counters. $P(\text{green}) = \frac{9}{20}$ and $P(\text{black}) = \frac{1}{5}$. Find $P(\text{red})$.'
    steps:
      - explain: 'Every counter is red, green or black, so the three probabilities must add to 1.'
        maths: 'P(\text{red}) + P(\text{green}) + P(\text{black}) = 1'
      - explain: 'Put the two you know over a common denominator of 20.'
        maths: '\frac{9}{20} + \frac{1}{5} = \frac{9}{20} + \frac{4}{20} = \frac{13}{20}'
      - explain: 'Subtract that total from 1.'
        maths: 'P(\text{red}) = 1 - \frac{13}{20} = \frac{7}{20}'
    answer: '$P(\text{red}) = \frac{7}{20}$'
  - title: 'A sample space diagram'
    problem: 'A fair coin is tossed and a fair three-sided spinner numbered 1, 2, 3 is spun. Find the probability of a head **and** an odd number.'
    steps:
      - explain: 'Build a two-way table with the coin down the side and the spinner across the top. There are $2 \times 3 = 6$ outcomes.'
        maths: '\begin{array}{c|ccc} & 1 & 2 & 3 \\ \hline \text{H} & \text{H1} & \text{H2} & \text{H3} \\ \text{T} & \text{T1} & \text{T2} & \text{T3} \end{array}'
      - explain: 'Ring the outcomes that are a head *and* an odd number: H1 and H3. That is 2 of the 6 outcomes.'
        maths: 'P = \frac{2}{6} = \frac{1}{3}'
      - explain: 'Check it with the AND rule. The coin cannot affect the spinner, so they are independent.'
        maths: 'P(\text{head}) \times P(\text{odd}) = \frac{1}{2} \times \frac{2}{3} = \frac{2}{6} = \frac{1}{3} \;\checkmark'
    answer: '$\frac{1}{3}$'
  - title: 'Two events in a row'
    problem: 'A fair six-sided dice is rolled twice. Find the probability of getting a six both times.'
    steps:
      - explain: 'The first roll cannot change the second, so the two rolls are independent.'
      - explain: 'Write down the probability of a six on one roll.'
        maths: 'P(\text{six}) = \frac{1}{6}'
      - explain: 'Multiply, because we want a six **and** a six.'
        maths: 'P(\text{six, six}) = \frac{1}{6} \times \frac{1}{6} = \frac{1}{36}'
    answer: '$\frac{1}{36}$, or about 2.8%'
practice: probability-01
---

## Why this matters

Almost nothing interesting in probability involves a single coin toss. Real questions
stack events on top of each other: *rain today **and** rain tomorrow*, *pass the first
test **and** pass the second*, *pick a red counter **then** pick another*.

This lesson gives you the two tools for handling that: a way of **listing** every
outcome so nothing is missed, and a rule for **multiplying** when the events do not
interfere with each other.

## Listing outcomes without missing any

When two things happen one after the other, the trap is missing outcomes. A **sample
space diagram** stops that happening because it is systematic.

There are two common forms:

- **A two-way table** — the first event down the side, the second across the top.
  Best when both events have a small number of outcomes.
- **An ordered list** — write every combination in a strict order, such as
  HH, HT, TH, TT.

Either way, the point is the same: every cell is one outcome, all outcomes are
equally likely (if the coin and spinner are fair), and so

$$P(\text{event}) = \frac{\text{number of outcomes you want}}{\text{total number of outcomes}}$$

## Independent or not?

Before you multiply, always ask one question: **does the first event change the
second?**

| Situation | Independent? | Why |
| --- | --- | --- |
| Roll a dice, then spin a spinner | Yes | The dice has no memory and no effect |
| Toss a coin twice | Yes | The coin does not know what it did last time |
| Take a sweet, eat it, take another | **No** | There is one fewer sweet in the bag |
| Take a card, put it back, take another | Yes | The pack is back to how it was |

That phrase **"without replacement"** is the giveaway for *dependent* events. If you
see it, the second probability will have a different denominator from the first.

## The two rules, side by side

It is easy to mix these up, so keep the key word in mind:

- **AND → multiply.** $P(\text{A and B}) = P(\text{A}) \times P(\text{B})$ for
  independent events. Multiplying by a number less than 1 makes things smaller —
  which makes sense, because wanting two things to happen is harder than wanting one.
- **OR → add.** $P(\text{A or B}) = P(\text{A}) + P(\text{B})$ when A and B cannot
  both happen. Adding makes things bigger — also sensible, because you now have two
  ways to succeed.

> **A quick sanity check.** Every probability you calculate must land between 0 and 1.
> If you get a number bigger than 1, you have almost certainly added when you should
> have multiplied.
