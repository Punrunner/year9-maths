---
title: Index Laws and Negative Indices
topic: integers-powers-roots
order: 3
minutes: 30
difficulty: core
summary: 'The four index laws, what a negative index really means, and using the order of operations with powers.'
objectives:
  - 'Use the multiplication, division, zero and power laws of indices'
  - 'Explain why $a^{-n} = \frac{1}{a^n}$'
  - 'Write numbers such as $\frac{1}{16}$ and $0.001$ as a power'
  - 'Simplify expressions with several index laws, working in the right order'
activities:
  halving:
    label: 'Investigate'
    question:
      type: table
      prompt: 'Start at $2^3 = 8$. Each step **right**, the power goes down by 1 — and the value halves. Keep the pattern going past zero.'
      columns: ['Power', '$2^3$', '$2^2$', '$2^1$', '$2^0$', '$2^{-1}$', '$2^{-2}$', '$2^{-3}$']
      rows:
        - [{ given: 'Value' }, { given: '8' }, { answer: '4' }, { answer: '2' }, { answer: '1' }, { answer: '1/2', accept: ['0.5'] }, { answer: '1/4', accept: ['0.25'] }, { answer: '1/8', accept: ['0.125'] }]
      hints: ['Half of 2 is 1. Half of 1 is $\frac{1}{2}$.', 'Keep halving: $\frac{1}{2} \div 2 = \frac{1}{4}$.']
      explanation: 'The pattern never stops at zero. It forces $2^0 = 1$, $2^{-1} = \frac{1}{2}$, $2^{-2} = \frac{1}{4}$ and $2^{-3} = \frac{1}{8}$. Negative powers are not negative numbers — they are **fractions**.'
  negative-predict:
    label: 'Predict'
    question:
      type: mcq
      prompt: 'Without looking back, what is $5^{-2}$?'
      options:
        - { id: a, text: '$\frac{1}{25}$' }
        - { id: b, text: '$-25$' }
        - { id: c, text: '$-10$' }
        - { id: d, text: '$\frac{1}{10}$' }
      answer: a
      explanation: '$5^{-2} = \frac{1}{5^2} = \frac{1}{25}$. The two most common wrong answers treat the minus sign as making the number negative ($-25$) or multiply $5 \times -2$ ($-10$).'
  same-base:
    label: 'Sort'
    question:
      type: sort
      prompt: 'Which of these can be simplified to a **single power** using an index law?'
      groups:
        - id: yes
          text: 'Yes — one power'
          items:
            - { id: a, text: '$3^4 \times 3^2$' }
            - { id: b, text: '$7^9 \div 7^2$' }
            - { id: c, text: '$(5^3)^2$' }
            - { id: d, text: '$x^5 \times x^{-2}$' }
        - id: no
          text: 'No — different bases'
          items:
            - { id: e, text: '$3^4 \times 2^4$' }
            - { id: f, text: '$5^2 \div 4^2$' }
            - { id: g, text: '$x^3 \times y^3$' }
      hints: ['The index laws only combine powers of the **same** number or letter.']
      explanation: 'Same base: $3^6$, $7^7$, $5^6$, $x^3$. With different bases (3 and 2, 5 and 4, $x$ and $y$) the laws do not apply — you can only work the numbers out.'
  bracket-think:
    label: 'Think about it'
    reveal:
      prompt: 'In $\dfrac{(3^6 \times 3^4)^2}{3^2 \times 3^3}$, why can''t you start by cancelling a $3^2$ from the top?'
      answer: 'The long fraction line acts like a bracket round the top and another round the bottom. The top is a single thing — $(3^{10})^2 = 3^{20}$ — so finish it first, finish the bottom ($3^5$), then divide: $3^{15}$. Brackets before indices, and the division comes last.'
  order-steps:
    label: 'Your turn'
    question:
      type: steps
      prompt: 'Simplify one step at a time.'
      scenario: 'Simplify $\dfrac{(2^3 \times 2^4)^2}{2^{16}}$ and give the answer as a fraction.'
      steps:
        - { kind: numeric, prompt: 'Inside the bracket: $2^3 \times 2^4 = 2^{\square}$', answer: 7 }
        - { kind: numeric, prompt: 'Apply the power: $(2^7)^2 = 2^{\square}$', answer: 14 }
        - { kind: numeric, prompt: 'Divide: $2^{14} \div 2^{16} = 2^{\square}$', answer: -2 }
        - { kind: numeric, prompt: 'So what is the value, as a fraction?', answer: '1/4', accept: ['0.25'] }
      explanation: '$(2^7)^2 = 2^{14}$, then $2^{14-16} = 2^{-2} = \frac{1}{4}$.'
keyRules:
  - title: 'Multiplying — add the powers'
    formula: 'a^x \times a^y = a^{x+y}'
    body: 'Only for the **same** base.'
  - title: 'Dividing — subtract the powers'
    formula: 'a^x \div a^y = a^{x-y}'
    body: 'The answer can be negative — that is fine.'
  - title: 'Power of a power — multiply'
    formula: '(a^x)^y = a^{xy}'
    body: '$(3^{10})^2 = 3^{10} \times 3^{10} = 3^{20}$.'
  - title: 'Zero and negative indices'
    formula: 'a^0 = 1 \qquad a^{-n} = \frac{1}{a^n}'
    body: 'A negative index means **one over**. It never makes the number negative.'
workedExamples:
  - title: 'Two ways to see a negative power'
    problem: 'Work out $6^3 \div 6^5$ in two ways.'
    steps:
      - explain: 'Write it out and cancel.'
        maths: '\frac{6 \times 6 \times 6}{6 \times 6 \times 6 \times 6 \times 6} = \frac{1}{6^2}'
      - explain: 'Use the division law.'
        maths: '6^{3-5} = 6^{-2}'
      - explain: 'Both must be the same.'
        maths: '6^{-2} = \frac{1}{36}'
    answer: '$\frac{1}{36}$'
  - title: 'Several laws at once'
    problem: 'Simplify $\dfrac{(3^6 \times 3^4)^2}{3^2 \times 3^3}$.'
    steps:
      - explain: 'Top, inside the bracket.'
        maths: '3^6 \times 3^4 = 3^{10}'
      - explain: 'Top, the power.'
        maths: '(3^{10})^2 = 3^{20}'
      - explain: 'Bottom.'
        maths: '3^2 \times 3^3 = 3^5'
      - explain: 'Divide.'
        maths: '3^{20 - 5} = 3^{15}'
    answer: '$3^{15}$'
practice: integers-03
---

You already know that $2^3$ means $2 \times 2 \times 2$. But what could $2^{-3}$ possibly mean?
You can't multiply 2 by itself *minus three* times. Instead of being told, work it out:

[[activity: halving]]

## The pattern decides

Nobody invented negative powers by decree — the pattern forced them. Every step to the
right divides by 2 and lowers the power by 1, and there is no reason for that to stop at
$2^0$. So

$$a^{-n} = \frac{1}{a^n}$$

and in particular $a^0 = 1$ for any number except 0. We call $a^{-n}$ the **reciprocal**
of $a^n$.

[[activity: negative-predict]]

The same pattern works in tens, which is why you will see these all the time in standard
form: $10^{-1} = 0.1$, $10^{-2} = 0.01$, $10^{-3} = 0.001$.

## The laws — and the catch

Write $a^5 \times a^3$ out in full and you get eight $a$s multiplied together, so the powers
**add**. Dividing cancels $a$s from top and bottom, so the powers **subtract**. And $(a^5)^3$
is three lots of $a^5$, so the powers **multiply**.

The catch: all of that only works when the base is the same.

[[activity: same-base]]

## Several laws in one go

Order of operations still rules — **B**rackets, **I**ndices, **D**ivision/**M**ultiplication,
**A**ddition/**S**ubtraction — and a long fraction line counts as brackets.

[[activity: bracket-think]]

[[activity: order-steps]]
