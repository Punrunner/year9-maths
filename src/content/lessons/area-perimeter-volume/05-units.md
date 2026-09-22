---
title: Small and Large Units of Measurement
topic: area-perimeter-volume
order: 5
minutes: 18
difficulty: core
summary: 'Milli, micro and nano going down; kilo, mega, giga and tera going up — and how to convert between them.'
objectives:
  - 'Name the prefixes for small and large units'
  - 'Convert between milli, micro and nano'
  - 'Convert between kilo, mega, giga and tera'
  - 'Choose a sensible unit for a given quantity'
keyRules:
  - title: 'Going smaller'
    formula: '\text{milli (m)} \xrightarrow{\times 1000} \text{micro } (\mu) \xrightarrow{\times 1000} \text{nano (n)}'
    body: 'Each step down makes the unit a thousand times smaller, so the **number** gets a thousand times bigger. Going back the other way, divide by 1000 each time.'
  - title: 'Going larger'
    formula: '\text{kilo (k)} \xrightarrow{\div 1000} \text{mega (M)} \xrightarrow{\div 1000} \text{giga (G)} \xrightarrow{\div 1000} \text{tera (T)}'
    body: 'Each step up makes the unit a thousand times bigger, so the number gets a thousand times smaller.'
  - title: 'The prefixes as powers of ten'
    body: 'nano $= 10^{-9}$, micro $= 10^{-6}$, milli $= 10^{-3}$, kilo $= 10^{3}$, mega $= 10^{6}$, giga $= 10^{9}$, tera $= 10^{12}$.'
  - title: 'The sense check'
    body: 'Ask yourself: **is my answer bigger or smaller than what I started with?** Converting to a *smaller* unit must give a *bigger* number. Getting this the wrong way round is the only real mistake available here.'
workedExamples:
  - title: 'Nanoseconds to microseconds'
    problem: 'Convert $34\,000$ nanoseconds to microseconds.'
    steps:
      - explain: 'A microsecond is bigger than a nanosecond, so the number must get smaller. That means dividing.'
        maths: '1 \, \mu\text{s} = 1000 \text{ ns}'
      - explain: 'Divide by 1000.'
        maths: '34\,000 \div 1000 = 34'
      - explain: 'Check: 34 is smaller than 34 000, and we moved to a bigger unit. Correct.'
    answer: '$34\ \mu\text{s}$'
  - title: 'Gigabytes to megabytes'
    problem: 'Convert $4\ \text{GB}$ to megabytes.'
    steps:
      - explain: 'A megabyte is smaller than a gigabyte, so the number must get bigger. Multiply.'
        maths: '1 \text{ GB} = 1000 \text{ MB}'
      - explain: 'Multiply by 1000.'
        maths: '4 \times 1000 = 4000'
    answer: '$4000\ \text{MB}$'
  - title: 'Two steps at once'
    problem: 'Convert $800\,000\,000\ \text{km}$ to gigametres.'
    steps:
      - explain: 'From kilo to mega is one step up, and mega to giga is another. Two steps means dividing by 1000 twice.'
        maths: '\div 1000 \text{ then } \div 1000 = \div 1\,000\,000'
      - explain: 'Divide.'
        maths: '800\,000\,000 \div 1\,000\,000 = 800'
    answer: '$800\ \text{Gm}$'
  - title: 'Milligrams to micrograms'
    problem: 'Convert $70\ \text{mg}$ to micrograms.'
    steps:
      - explain: 'A microgram is smaller than a milligram, so the number gets bigger. Multiply by 1000.'
        maths: '70 \times 1000'
      - explain: 'Work it out.'
        maths: '= 70\,000'
    answer: '$70\,000\ \mu\text{g}$'
practice: area-05
---

## Why these prefixes exist

Nobody wants to write that a computer chip switches in
$0.000000002$ seconds, or that a hard drive holds $2\,000\,000\,000\,000$ bytes. The
prefixes give the number a sensible size: $2$ nanoseconds, $2$ terabytes.

Every step in the chain is a **factor of 1000**.

## The chain, smallest to largest

| Prefix | Symbol | Multiplier | In powers of ten |
| --- | --- | --- | --- |
| nano | n | $\div 1\,000\,000\,000$ | $10^{-9}$ |
| micro | $\mu$ | $\div 1\,000\,000$ | $10^{-6}$ |
| milli | m | $\div 1000$ | $10^{-3}$ |
| *(base unit)* | — | $1$ | $10^{0}$ |
| kilo | k | $\times 1000$ | $10^{3}$ |
| mega | M | $\times 1\,000\,000$ | $10^{6}$ |
| giga | G | $\times 1\,000\,000\,000$ | $10^{9}$ |
| tera | T | $\times 10^{12}$ | $10^{12}$ |

Two details worth noting: micro uses the Greek letter $\mu$ (mu), and milli is a
*lower-case* m while mega is a *capital* M. Getting those two confused changes the
answer by a factor of a billion.

## The only rule you need

**Moving to a smaller unit makes the number bigger. Moving to a larger unit makes the
number smaller.**

That is it. If you are converting metres to millimetres, millimetres are smaller, so
the number must grow: multiply. If you are converting bytes to gigabytes, gigabytes
are bigger, so the number must shrink: divide.

Do the conversion, then look at your answer and ask whether it moved in the direction
you expected. This catches every error.

## Counting the steps

Each step in the table is $\times 1000$ or $\div 1000$. For a jump of more than one
step, apply it once per step:

- kilo → giga is **two** steps up: $\div 1000$ twice, so $\div 1\,000\,000$.
- milli → nano is **two** steps down: $\times 1000$ twice, so $\times 1\,000\,000$.
- milli → kilo is **two** steps up from milli to the base and one more to kilo —
  count through the table carefully, it is $\div 1\,000\,000$.

Writing out the chain and ticking off the steps takes five seconds and is far safer
than guessing.

## Choosing a sensible unit

A good unit gives a number that is easy to say — roughly between 1 and 1000.

| Quantity | Sensible | Not sensible |
| --- | --- | --- |
| Thickness of paper | $0.1\ \text{mm}$ | $0.0000001\ \text{km}$ |
| A film file | $1.4\ \text{GB}$ | $1\,400\,000\,000$ bytes |
| Distance to the Sun | $150$ Gm | $150\,000\,000\,000\ \text{m}$ |
| A dose of medicine | $500\ \text{mg}$ | $0.0005\ \text{kg}$ |

Both columns are correct; only one is useful.
