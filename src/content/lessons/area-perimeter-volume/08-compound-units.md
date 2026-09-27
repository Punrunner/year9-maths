---
title: Compound Units — Speed, Density and Rates
topic: area-perimeter-volume
order: 7
minutes: 35
difficulty: challenge
summary: 'Speed, density, pressure and other rates; converting compound units such as km/h to m/s and g/cm³ to kg/m³; and average speed for a journey in stages.'
objectives:
  - 'Use speed $= \frac{\text{distance}}{\text{time}}$, density $= \frac{\text{mass}}{\text{volume}}$ and pressure $= \frac{\text{force}}{\text{area}}$, rearranged as needed'
  - 'Change between hours and minutes as decimals, e.g. 2 h 15 min $= 2.25$ h'
  - 'Convert compound units such as km/h ↔ m/s and g/cm³ ↔ kg/m³'
  - 'Find the average speed of a journey made in several stages'
activities:
  predict:
    label: 'Predict first'
    question:
      type: mcq
      prompt: 'Nok cycles to school at $12$ km/h and home again, by the same route, at $24$ km/h. What is her average speed for the round trip?'
      options:
        - { id: a, text: '$16$ km/h' }
        - { id: b, text: '$18$ km/h' }
        - { id: c, text: '$20$ km/h' }
        - { id: d, text: 'It depends on how far away school is' }
      answer: a
      hints: ['Try a distance: say school is 24 km away. How long does each way take?']
      explanation: 'Say it is 24 km each way: 2 hours there, 1 hour back. Total $48$ km in $3$ h $= 16$ km/h. She spends *longer* at the slow speed, so the average is below 18. Average speed is always total distance ÷ total time — never the average of the speeds.'
  time-check:
    label: 'Quick check'
    question:
      type: fill-blank
      prompt: 'Write each time in hours, as a decimal.'
      text: '2 h 15 min $=$ [[a]] h     45 min $=$ [[b]] h     1 h 12 min $=$ [[c]] h     3 h 20 min $=$ [[d]] h (to 2 d.p.)'
      blanks:
        - { id: a, accept: ['2.25'], size: 5 }
        - { id: b, accept: ['0.75'], size: 5 }
        - { id: c, accept: ['1.2'], size: 5 }
        - { id: d, accept: ['3.33'], size: 5 }
      hints: ['Divide the minutes by 60.']
      explanation: '$15 \div 60 = 0.25$; $45 \div 60 = 0.75$; $12 \div 60 = 0.2$; $20 \div 60 = 0.333\ldots$. Writing 2 h 15 min as $2.15$ h is the mistake to avoid.'
  kmh:
    label: 'Your turn'
    question:
      type: steps
      prompt: 'Convert $90$ km/h to m/s.'
      steps:
        - kind: numeric
          prompt: 'How many metres is $90$ km?'
          answer: 90000
          feedback: '$90 \times 1000 = 90\,000$ m.'
        - kind: numeric
          prompt: 'How many seconds are in one hour?'
          answer: 3600
          feedback: '$60 \times 60 = 3600$ s.'
        - kind: numeric
          prompt: 'So $90$ km/h $=$ ? m/s'
          answer: 25
          unit: 'm/s'
          feedback: '$90\,000 \div 3600 = 25$ m/s.'
      explanation: '$90$ km/h means $90\,000$ m in $3600$ s: $90\,000 \div 3600 = 25$ m/s. Shortcut: km/h $\div 3.6 =$ m/s.'
  density-check:
    label: 'Quick check'
    question:
      type: numeric
      prompt: 'Aluminium has density $2.7\ \text{g/cm}^3$. Write this in $\text{kg/m}^3$.'
      answer: 2700
      unit: 'kg/m³'
      hints: ['$1\ \text{m}^3 = 1\,000\,000\ \text{cm}^3$, so $1\ \text{m}^3$ of aluminium has mass $2.7 \times 1\,000\,000$ g.', 'Then change grams to kilograms.']
      explanation: '$2.7 \times 1\,000\,000 = 2\,700\,000$ g per $\text{m}^3$ $= 2700\ \text{kg/m}^3$. (Overall, $\text{g/cm}^3 \times 1000 = \text{kg/m}^3$.)'
  stages:
    label: 'Spot the mistake'
    question:
      type: mcq
      prompt: 'A train travels $120$ km in $1.5$ h, stops for $30$ min, then travels $80$ km in $1$ h. Ploy says the average speed is $\frac{80 + 80}{2} = 80$ km/h. What is it really?'
      options:
        - { id: a, text: '$66.7$ km/h' }
        - { id: b, text: '$80$ km/h' }
        - { id: c, text: '$100$ km/h' }
        - { id: d, text: '$57.1$ km/h' }
      answer: a
      hints: ['Total distance ÷ total time — and the stop counts as time.']
      explanation: 'Total distance $200$ km; total time $1.5 + 0.5 + 1 = 3$ h. Average speed $= 200 \div 3 = 66.7$ km/h. Averaging the two speeds ignores both the different times and the stop.'
keyRules:
  - title: 'Speed, density, pressure'
    formula: '\text{speed} = \frac{\text{distance}}{\text{time}} \qquad \text{density} = \frac{\text{mass}}{\text{volume}} \qquad \text{pressure} = \frac{\text{force}}{\text{area}}'
    body: 'Each is "something **per** something". The unit tells you the formula: km/h is km ÷ h; $\text{g/cm}^3$ is g ÷ $\text{cm}^3$; $\text{N/m}^2$ is N ÷ $\text{m}^2$. Rearrange as usual: distance $=$ speed × time, mass $=$ density × volume.'
  - title: 'Time as a decimal'
    body: 'Minutes $\div 60$ gives hours: $2$ h $24$ min $= 2.4$ h. Hours $\times 60$ gives minutes: $0.35$ h $= 21$ min.'
  - title: 'Converting compound units'
    formula: '\text{km/h} \xrightarrow{\ \times 1000 \div 3600\ } \text{m/s} \qquad \text{g/cm}^3 \xrightarrow{\ \times 1000\ } \text{kg/m}^3'
    body: 'Convert the top unit and the bottom unit separately, then divide. Take care with squared and cubed units on the bottom.'
  - title: 'Average speed'
    formula: '\text{average speed} = \frac{\text{total distance}}{\text{total time}}'
    body: 'Include any stops in the total time. Never average the speeds.'
workedExamples:
  - title: 'Speed with minutes'
    problem: 'A bus travels $51$ km in $1$ hour $15$ minutes. Find its average speed in km/h.'
    steps:
      - explain: 'Write the time in hours.'
        maths: '1\ \text{h}\ 15\ \text{min} = 1.25\ \text{h}'
      - explain: 'Speed = distance ÷ time.'
        maths: '51 \div 1.25 = 40.8'
    answer: '$40.8$ km/h'
  - title: 'Density, rearranged'
    problem: 'Gold has density $19.3\ \text{g/cm}^3$. Find the volume of a $500$ g gold bar, to 3 s.f.'
    steps:
      - explain: 'Rearrange: volume = mass ÷ density.'
        maths: 'V = \frac{500}{19.3}'
      - explain: 'Calculate.'
        maths: 'V = 25.906\ldots'
    answer: '$25.9\ \text{cm}^3$'
  - title: 'm/s to km/h'
    problem: 'A cheetah runs at $30$ m/s. Write this in km/h.'
    steps:
      - explain: 'In one hour it runs $3600$ times as far as in one second.'
        maths: '30 \times 3600 = 108\,000\ \text{m per hour}'
      - explain: 'Change metres to kilometres.'
        maths: '108\,000 \div 1000 = 108'
    answer: '$108$ km/h'
  - title: 'Pressure'
    problem: 'A box weighing $600$ N rests on a face measuring $40$ cm by $50$ cm. Find the pressure in $\text{N/m}^2$.'
    steps:
      - explain: 'Put the area in $\text{m}^2$.'
        maths: 'A = 0.4 \times 0.5 = 0.2\ \text{m}^2'
      - explain: 'Pressure = force ÷ area.'
        maths: 'P = 600 \div 0.2 = 3000'
    answer: '$3000\ \text{N/m}^2$'
practice: area-08
---

[[activity: predict]]

## "Per" means divide

A **compound unit** is made from two units: km/h is kilometres **per** hour, $\text{g/cm}^3$
is grams **per** cubic centimetre. The unit tells you the formula — divide the first
quantity by the second.

| Measure | Formula | Units |
| --- | --- | --- |
| Speed | $\dfrac{\text{distance}}{\text{time}}$ | km/h, m/s |
| Density | $\dfrac{\text{mass}}{\text{volume}}$ | $\text{g/cm}^3$, $\text{kg/m}^3$ |
| Pressure | $\dfrac{\text{force}}{\text{area}}$ | $\text{N/m}^2$ |
| Other rates | $\dfrac{\text{amount}}{\text{time}}$, $\dfrac{\text{cost}}{\text{quantity}}$ … | L/min, baht/kg |

## Time in hours

Calculators need time as a **decimal** of an hour. There are 60 minutes in an hour, not
100, so divide the minutes by 60.

[[activity: time-check]]

## Converting compound units

Convert the top and the bottom **separately**. For km/h to m/s: $1$ km $= 1000$ m and
$1$ h $= 3600$ s, so

$$1\ \text{km/h} = \frac{1000\ \text{m}}{3600\ \text{s}} = \frac{1}{3.6}\ \text{m/s}$$

[[activity: kmh]]

For density, the bottom is **cubed**: $1\ \text{m}^3 = 1\,000\,000\ \text{cm}^3$, while
$1$ kg $= 1000$ g. Together, $\text{g/cm}^3 \times 1000 = \text{kg/m}^3$. Water is
$1\ \text{g/cm}^3 = 1000\ \text{kg/m}^3$.

[[activity: density-check]]

## Average speed over a journey

For a journey in stages, add up the **total distance** and the **total time** (including
any stops), then divide. Averaging the speeds gives the wrong answer whenever the stages
take different times.

[[activity: stages]]
