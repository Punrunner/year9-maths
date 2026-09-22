---
title: Experimental Probability
topic: probability
order: 3
minutes: 20
difficulty: core
summary: 'What actually happens when you run a trial, how it compares with the theory, and how to predict a frequency.'
objectives:
  - 'Calculate experimental probability from the results of a trial'
  - 'Explain why more trials give a more reliable estimate'
  - 'Decide from results whether a dice or spinner looks biased'
  - 'Calculate an expected frequency'
keyRules:
  - title: 'Experimental probability (relative frequency)'
    formula: 'P(\text{event}) \approx \frac{\text{number of times it happened}}{\text{total number of trials}}'
    body: 'This is what you *measure*. It changes every time you repeat the experiment.'
  - title: 'Theoretical probability'
    formula: 'P(\text{event}) = \frac{\text{number of favourable outcomes}}{\text{total number of equally likely outcomes}}'
    body: 'This is what you *calculate*, assuming the dice or spinner is fair. It never changes.'
  - title: 'More trials, closer agreement'
    body: 'As the number of trials grows, the experimental probability settles down towards the theoretical one. Ten spins tells you almost nothing; a thousand tells you a great deal.'
  - title: 'Expected frequency'
    formula: '\text{expected frequency} = \text{number of trials} \times P(\text{event})'
    body: 'Use it to predict how often something should happen. It rarely comes out as a whole number — round sensibly and say it is an estimate.'
visual:
  widget: spinner
  title: 'How many spins is enough?'
  caption: 'Press **+10 spins** a few times and watch the relative frequency for Red jump around. Then press **+100 spins** twice and watch it settle near $0.25$. That settling is the whole idea of this lesson.'
  config:
    sectors: ['Red', 'Blue', 'Green', 'Yellow']
    focus: 0
workedExamples:
  - title: 'Experimental probability from results'
    problem: 'A drawing pin is dropped 200 times. It lands point up 130 times. Estimate the probability that it lands point up.'
    steps:
      - explain: 'You cannot calculate this one from theory — a drawing pin is not symmetrical, so there is no "equally likely" argument to make. An experiment is the only way.'
      - explain: 'Divide the number of successes by the number of trials.'
        maths: 'P(\text{point up}) \approx \frac{130}{200}'
      - explain: 'Simplify or convert to a decimal.'
        maths: '\frac{130}{200} = \frac{13}{20} = 0.65'
    answer: '$0.65$ (or $\frac{13}{20}$)'
  - title: 'Is the dice biased?'
    problem: 'A six-sided dice is rolled 600 times. A six comes up 145 times. Does the dice look biased?'
    steps:
      - explain: 'Work out what a fair dice would be expected to give.'
        maths: '\text{expected} = 600 \times \frac{1}{6} = 100'
      - explain: 'Compare with what actually happened.'
        maths: '145 \text{ sixes, against } 100 \text{ expected}'
      - explain: 'That is 45 more than expected, out of 600 rolls — a big gap over a large number of trials. With only 6 rolls a gap like that would mean nothing, but 600 is plenty.'
    answer: 'Yes — the dice appears biased towards six. The experimental probability is $\frac{145}{600} \approx 0.24$, noticeably above $\frac{1}{6} \approx 0.17$.'
  - title: 'Expected frequency'
    problem: 'The probability a football team wins any match is $0.65$. How many of their next 20 matches would you expect them to win?'
    steps:
      - explain: 'Use the expected frequency formula.'
        maths: '\text{expected frequency} = \text{trials} \times P(\text{event})'
      - explain: 'Substitute the numbers.'
        maths: '= 20 \times 0.65'
      - explain: 'Work it out.'
        maths: '= 13'
    answer: '13 matches — though they will not win exactly 13 every season; it is the best single prediction, not a guarantee.'
practice: probability-03
---

## Two different things called "probability"

There are two ways to put a number on how likely something is, and it matters which
one you are doing.

**Theoretical probability** is worked out by reasoning. A fair dice has six equally
likely faces, so $P(6) = \frac{1}{6}$. You never touch a dice to work this out.

**Experimental probability** is worked out by doing it. Roll the dice 60 times, count
12 sixes, and your estimate is $\frac{12}{60} = 0.2$. It is also called **relative
frequency**.

## Why experimental probability wobbles

Roll a fair dice six times and you will very rarely get exactly one six. That is not
because the dice is broken — it is because six trials is a tiny sample.

The more trials you run, the less the wobble matters:

| Trials | A typical estimate of $P(6)$ | How far from $\frac{1}{6} \approx 0.167$ |
| --- | --- | --- |
| 6 | $0$ or $0.33$ | miles off |
| 60 | around $0.15$ to $0.20$ | close |
| 600 | around $0.16$ to $0.175$ | very close |

Use the spinner above to see this for yourself. It is much more convincing when you
watch it happen than when you read about it.

## When you have no choice but to experiment

Theoretical probability needs **equally likely outcomes**. Plenty of real situations
do not have any:

- Will a drawing pin land point up? The two ways it can land are not symmetrical.
- Will this bus be late? There is no list of equally likely outcomes.
- Will this particular biased dice show a 6? It is biased — that is the whole point.

For all of these, running trials is the only route to a number.

## Is it biased?

To judge fairness, compare what happened with what a fair object would be expected to
give — and then ask whether the gap is big enough to matter *for that number of
trials*.

$$\text{expected frequency} = \text{number of trials} \times P(\text{event})$$

A gap of 10 out of 30 trials proves nothing. The same gap out of 3000 trials is
damning. Always mention the number of trials when you give your verdict.

## Predicting with expected frequency

The same formula works forwards. If a seed has a $0.8$ probability of germinating and
you plant 250, you expect $250 \times 0.8 = 200$ to come up.

> Expected frequency is an **estimate**, not a promise. Saying "exactly 200 will
> germinate" is wrong; saying "about 200" is right.
