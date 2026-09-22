---
title: The Modal Class and the Median Class
topic: grouped-data-sampling
order: 2
minutes: 20
difficulty: core
summary: 'Finding the class with the highest frequency and the class that contains the median, and seeing how regrouping can change them.'
objectives:
  - 'Identify the modal class of a grouped frequency table'
  - 'Find the position of the median using $\frac{n + 1}{2}$'
  - 'Use a running total to find the class the median lies in'
  - 'Explain how changing the groups can change the modal class'
keyRules:
  - title: 'Modal class'
    body: 'The class interval with the **highest frequency**. It is the easiest "average" to find — just look for the biggest number in the frequency column.'
  - title: 'Position of the median'
    formula: '\text{median position} = \frac{n + 1}{2}'
    body: 'With $n = 100$ values, the median is the $\frac{101}{2} = 50.5$th value — halfway between the 50th and 51st.'
  - title: 'Running totals find the median class'
    body: 'Add up the frequencies from the first class until the running total reaches the median position. The class where that happens contains the median.'
  - title: 'Groups change the answer'
    body: 'The modal class depends on how the data is grouped. Regroup the same data with wider classes and a different class can become the modal one.'
visual:
  widget: histogram
  title: 'Find the median class'
  caption: 'The masses of 100 school children. The median is the 50.5th value. The first three classes hold 34 children, and the next holds 30 more — so the running total passes 50.5 inside $45 \le m < 50$.'
  config:
    boundaries: [30, 35, 40, 45, 50, 55, 60, 65, 70]
    freqs: [4, 7, 23, 30, 16, 11, 5, 4]
    maxFreq: 32
    label: 'Mass, m (kg)'
workedExamples:
  - title: 'Modal class and median class'
    problem: 'Masses of 100 children: $30$–$35$: 4, $35$–$40$: 7, $40$–$45$: 23, $45$–$50$: 30, $50$–$55$: 16, $55$–$60$: 11, $60$–$65$: 5, $65$–$70$: 4 (kg). Find the modal class and the class containing the median.'
    steps:
      - explain: 'The highest frequency is 30.'
        maths: '\text{modal class: } 45 \le m < 50'
      - explain: 'Find the position of the median.'
        maths: '\frac{100 + 1}{2} = 50.5\text{th value}'
      - explain: 'Keep a running total of the frequencies.'
        maths: '4 + 7 + 23 = 34, \qquad 34 + 30 = 64'
      - explain: 'The 35th to 64th values are all in the fourth class, and 50.5 is in that range.'
        maths: '\text{median class: } 45 \le m < 50'
    answer: 'Both the modal class and the median class are $45 \le m < 50$.'
  - title: 'When regrouping changes the mode'
    problem: 'Puzzle times: $15$–$19$: 5, $19$–$23$: 3, $23$–$27$: 15, $27$–$31$: 12, $31$–$35$: 13, $35$–$39$: 2 seconds. Farook took 24 s, which is in the modal class. He regroups into $15 \le t < 27$ and $27 \le t < 39$. Is he still in the modal class?'
    steps:
      - explain: 'Add up the frequencies in the new first group.'
        maths: '5 + 3 + 15 = 23'
      - explain: 'And in the new second group.'
        maths: '12 + 13 + 2 = 27'
      - explain: 'The second group now has the higher frequency, and 24 s is not in it.'
    answer: 'No — the new modal class is $27 \le t < 39$.'
practice: grouped-02
---

## Why this matters

The mean is not always the most useful average. A shop ordering stock cares about which
size range sells **most often** (the mode). A government setting a minimum wage may care
about the **middle** earner (the median), because a few very high earners pull the mean up.

## Mode of the raw data vs modal class

These are not the same thing. Fifteen long-jump distances (cm):

$$152, 152, 155, 161, 163, 164, 165, 166, 168, 169, 170, 172, 175, 181, 182$$

The **mode** is 152 cm (the only value that appears twice). But grouped into tens:

| Length ($l$, cm) | Frequency |
| --- | --- |
| $150 \le l < 160$ | 3 |
| $160 \le l < 170$ | 7 |
| $170 \le l < 180$ | 3 |
| $180 \le l < 190$ | 2 |

the **modal class** is $160 \le l < 170$ — and 152 is not in it.

## Reading a histogram

In a histogram with equal class widths, the modal class is simply the **tallest bar**. To
find the median class, add the heights of the bars from the left until you pass the middle
position.

> **Remember.** From grouped data you can only say which **class** the median is in — not its
> exact value.
