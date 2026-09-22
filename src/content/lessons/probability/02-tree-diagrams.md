---
title: Tree Diagrams
topic: probability
order: 2
minutes: 25
difficulty: core
summary: 'Drawing a tree to keep track of two or more events, multiplying along the branches and adding down the ends.'
objectives:
  - 'Draw a tree diagram for two successive events'
  - 'Label every branch with its probability'
  - 'Multiply **along** branches to find the probability of a combined outcome'
  - 'Add **down** the end column when more than one outcome counts as a success'
  - 'Handle problems with and without replacement'
keyRules:
  - title: 'Multiply along the branches'
    formula: 'P(\text{A then B}) = P(\text{A}) \times P(\text{B})'
    body: 'Travelling left to right along one path through the tree gives one combined outcome. Multiply the probabilities you pass.'
  - title: 'Add down the outcome column'
    body: 'If several different paths would count as a success, work out each one and then add them together. This is where most marks are lost — read the question carefully to see how many paths qualify.'
  - title: 'Each set of branches sums to 1'
    body: 'Every time the tree splits, those branch probabilities must add to 1. It is a free check: if a pair of branches reads $0.3$ and $0.6$, something is wrong.'
  - title: 'With or without replacement'
    body: 'If the object is **put back**, the second set of branches is identical to the first. If it is **not put back**, the second set has a denominator one smaller — and the numerator depends on which branch you came along.'
  - title: 'The whole tree sums to 1'
    body: 'Add every outcome in the final column. It must come to exactly 1. Do this every time — it catches arithmetic slips instantly.'
workedExamples:
  - title: 'Two spins, with replacement'
    problem: 'A spinner has 3 red sections and 1 blue section. It is spun twice. Find the probability of getting exactly one red.'
    steps:
      - explain: 'Write down the probabilities for a single spin. There are 4 sections, 3 of them red.'
        maths: 'P(\text{R}) = \frac{3}{4}, \qquad P(\text{B}) = \frac{1}{4}'
      - explain: 'The spinner is unchanged by the first spin, so the second set of branches is the same as the first. Four paths exist: RR, RB, BR, BB.'
      - explain: 'Exactly one red means RB **or** BR. Work each out by multiplying along its path.'
        maths: 'P(\text{RB}) = \frac{3}{4} \times \frac{1}{4} = \frac{3}{16}'
      - explain: 'And the other path.'
        maths: 'P(\text{BR}) = \frac{1}{4} \times \frac{3}{4} = \frac{3}{16}'
      - explain: 'Two paths qualify, so add them.'
        maths: '\frac{3}{16} + \frac{3}{16} = \frac{6}{16} = \frac{3}{8}'
    answer: '$\frac{3}{8}$'
  - title: 'Without replacement'
    problem: 'A bag holds 5 green counters and 3 white counters. Two are taken out, one after the other, without replacement. Find the probability that both are green.'
    steps:
      - explain: 'First pick: 5 green out of 8 counters altogether.'
        maths: 'P(\text{green first}) = \frac{5}{8}'
      - explain: 'A green counter has gone. Now there are 4 green left out of 7 counters.'
        maths: 'P(\text{green second} \mid \text{green first}) = \frac{4}{7}'
      - explain: 'Multiply along that path.'
        maths: '\frac{5}{8} \times \frac{4}{7} = \frac{20}{56}'
      - explain: 'Cancel by dividing top and bottom by 4.'
        maths: '\frac{20}{56} = \frac{5}{14}'
    answer: '$\frac{5}{14}$'
  - title: 'At least one'
    problem: 'Using the same bag (5 green, 3 white, without replacement), find the probability of getting **at least one white**.'
    steps:
      - explain: 'Three of the four paths contain a white counter — GW, WG and WW. Adding all three works, but there is a much quicker route.'
      - explain: 'The only way to get *no* white at all is GG, which we already found.'
        maths: 'P(\text{GG}) = \frac{5}{14}'
      - explain: 'Everything else is "at least one white", so subtract from 1.'
        maths: 'P(\text{at least one white}) = 1 - \frac{5}{14} = \frac{9}{14}'
    answer: '$\frac{9}{14}$'
practice: probability-02
---

## The problem tree diagrams solve

Once you have two events, keeping track of every possibility in your head stops
working. A tree diagram does the bookkeeping for you: every path through it is one
possible way the world could turn out, and no path is ever missed.

## Building one

Work left to right.

1. **Draw the first split.** One branch for each outcome of the first event.
2. **Label each branch with its probability.** Check they add to 1.
3. **Draw the second split from the end of every first branch.** Every first outcome
   must lead to a full set of second outcomes.
4. **Label those too.** This is the step where "with or without replacement" matters.
5. **Write the combined outcome at the end of each path**, and its probability, found
   by multiplying along the path.

## Multiply along, add down

Two directions, two operations, and mixing them up is the classic mistake:

- **Along** a path (left to right) means *this happened **and** then that happened* —
  so **multiply**.
- **Down** the final column means *this outcome **or** that outcome would do* —
  so **add**.

## "At least one" — the shortcut worth knowing

Questions that ask for the probability of **at least one** of something usually have
several qualifying paths, and adding them all is slow and error-prone.

Instead, find the probability of **none** and subtract from 1:

$$P(\text{at least one}) = 1 - P(\text{none})$$

There is only ever *one* path with none of the thing, so this turns a three- or
four-step calculation into a one-step one. With three or more events the saving is
enormous.

## With and without replacement

This is the detail examiners test hardest. Read the question for what happens to the
first object:

| Wording | Second set of branches |
| --- | --- |
| "…and replaces it" | Identical to the first set |
| "…and does not replace it" | Denominator drops by 1 |
| "…takes two at once" | Same as without replacement |
| "…eats it" | Same as without replacement |

When the denominator drops, the numerator only drops on the branches where you
actually removed one of that colour — which is why the two second-level splits end up
different from each other.
