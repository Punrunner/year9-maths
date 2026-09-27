---
title: Equivalent Fractions, Adding and Subtracting
topic: fractions-decimals
order: 2
minutes: 30
difficulty: foundation
summary: 'Equivalent fractions, mixed numbers, comparing fractions, and adding and subtracting with the LCM as the common denominator.'
objectives:
  - 'Make equivalent fractions and simplify a fraction fully'
  - 'Change between mixed numbers and improper fractions'
  - 'Compare fractions using a common denominator'
  - 'Add and subtract fractions using the LCM of the denominators'
  - 'Add and subtract mixed numbers'
activities:
  predict:
    label: 'Before we start'
    question:
      type: mcq
      prompt: 'Ploy says $\frac{1}{2} + \frac{1}{3} = \frac{2}{5}$. Is she right?'
      options:
        - { id: a, text: 'No — $\frac{2}{5}$ is less than $\frac{1}{2}$, and adding $\frac{1}{3}$ should make it bigger' }
        - { id: b, text: 'Yes — add the tops and add the bottoms' }
        - { id: c, text: 'No — the answer is $\frac{2}{6}$' }
      answer: a
      explanation: 'Adding the tops and the bottoms can''t be right: $\frac{2}{5}$ is *smaller* than the $\frac{1}{2}$ we started with. The real answer is $\frac{5}{6}$ — this lesson shows why.'
  equiv:
    label: 'Quick check'
    question:
      type: fill-blank
      prompt: 'Complete the equivalent fractions.'
      text: '$\frac{3}{4} = \frac{?}{12}$, ? = [[a]]     $\frac{2}{5} = \frac{8}{?}$, ? = [[b]]     $\frac{18}{24} = \frac{?}{4}$, ? = [[c]]'
      blanks:
        - { id: a, accept: ['9'], size: 3 }
        - { id: b, accept: ['20'], size: 3 }
        - { id: c, accept: ['3'], size: 3 }
      hints: ['Whatever you do to the bottom, do the same to the top.']
      explanation: '$4 \times 3 = 12$ so $3 \times 3 = 9$. $2 \times 4 = 8$ so $5 \times 4 = 20$. $24 \div 6 = 4$ so $18 \div 6 = 3$.'
  mixed:
    label: 'Your turn'
    question:
      type: match
      prompt: 'Match each mixed number to its improper fraction.'
      left:
        - { id: l1, text: '$2\frac{1}{3}$' }
        - { id: l2, text: '$1\frac{3}{4}$' }
        - { id: l3, text: '$3\frac{2}{5}$' }
        - { id: l4, text: '$4\frac{1}{2}$' }
      right:
        - { id: r1, text: '$\frac{7}{3}$' }
        - { id: r2, text: '$\frac{7}{4}$' }
        - { id: r3, text: '$\frac{17}{5}$' }
        - { id: r4, text: '$\frac{9}{2}$' }
      solution: { l1: r1, l2: r2, l3: r3, l4: r4 }
      explanation: 'Whole number × denominator, plus the numerator: $2 \times 3 + 1 = 7$, $1 \times 4 + 3 = 7$, $3 \times 5 + 2 = 17$, $4 \times 2 + 1 = 9$.'
  bars:
    label: 'Try it'
    visual:
      widget: fraction-bars
      title: 'Make the pieces the same size'
      caption: 'The two bars start with thirds and quarters, which can''t be added as they are. Press **Split the pieces** to cut both into twelfths — the LCM of 3 and 4. Then try $\frac{5}{6} - \frac{1}{4}$ and $\frac{2}{3} + \frac{3}{4}$.'
      config: { start: { n1: 1, d1: 3, n2: 1, d2: 4, op: 0, common: 0 } }
  compare:
    label: 'Quick check'
    question:
      type: order
      prompt: 'Put these fractions in order, **smallest first**.'
      items:
        - { id: a, text: '$\frac{2}{3}$' }
        - { id: b, text: '$\frac{3}{4}$' }
        - { id: c, text: '$\frac{5}{8}$' }
        - { id: d, text: '$\frac{7}{12}$' }
      solution: [d, c, a, b]
      hints: ['Write them all with denominator 24.']
      explanation: 'Over 24: $\frac{16}{24}, \frac{18}{24}, \frac{15}{24}, \frac{14}{24}$. So $\frac{7}{12} < \frac{5}{8} < \frac{2}{3} < \frac{3}{4}$.'
  add-check:
    label: 'Your turn'
    question:
      type: steps
      prompt: 'Work out $\frac{5}{6} + \frac{3}{4}$, one step at a time.'
      steps:
        - kind: numeric
          prompt: 'What is the LCM of 6 and 4?'
          answer: 12
          hint: 'Multiples of 6: 6, 12, 18 … Which is also a multiple of 4?'
          feedback: '12 is the smallest number both 6 and 4 go into.'
        - kind: numeric
          prompt: '$\frac{5}{6} = \frac{?}{12}$'
          answer: 10
          feedback: '$6 \times 2 = 12$, so $5 \times 2 = 10$.'
        - kind: numeric
          prompt: '$\frac{3}{4} = \frac{?}{12}$'
          answer: 9
          feedback: '$4 \times 3 = 12$, so $3 \times 3 = 9$.'
        - kind: mcq
          prompt: 'So the answer is …'
          options:
            - { id: a, text: '$\frac{19}{12} = 1\frac{7}{12}$' }
            - { id: b, text: '$\frac{19}{24}$' }
            - { id: c, text: '$\frac{8}{10}$' }
          answer: a
          feedback: '$\frac{10}{12} + \frac{9}{12} = \frac{19}{12} = 1\frac{7}{12}$. The denominator stays 12.'
      explanation: '$\frac{5}{6} + \frac{3}{4} = \frac{10}{12} + \frac{9}{12} = \frac{19}{12} = 1\frac{7}{12}$.'
  borrow:
    label: 'Think about it'
    reveal:
      prompt: 'How would you work out $3\frac{1}{4} - 1\frac{2}{3}$? Why is it awkward to subtract the whole numbers and the fractions separately?'
      answer: '$\frac{1}{4} - \frac{2}{3}$ is negative, so doing the parts separately gets messy. The safe way is to make both improper: $\frac{13}{4} - \frac{5}{3} = \frac{39}{12} - \frac{20}{12} = \frac{19}{12} = 1\frac{7}{12}$.'
keyRules:
  - title: 'Equivalent fractions'
    formula: '\frac{a}{b} = \frac{a \times k}{b \times k}'
    body: 'Multiply or divide the top and bottom by the **same** number. To simplify fully, divide both by their HCF.'
  - title: 'Mixed numbers and improper fractions'
    formula: '2\tfrac{3}{5} = \frac{2 \times 5 + 3}{5} = \frac{13}{5}'
    body: 'Going back: $13 \div 5 = 2$ remainder $3$, so $\frac{13}{5} = 2\frac{3}{5}$.'
  - title: 'Adding and subtracting'
    body: 'Only add or subtract fractions with the **same denominator**. Use the LCM of the denominators, change each fraction, then add or subtract the numerators. **The denominator does not change.**'
  - title: 'Mixed numbers'
    body: 'Change them to improper fractions first, then add or subtract. Simplify and change back at the end.'
workedExamples:
  - title: 'Simplifying fully'
    problem: 'Simplify $\frac{24}{36}$.'
    steps:
      - explain: 'The HCF of 24 and 36 is 12.'
        maths: '\frac{24}{36} = \frac{24 \div 12}{36 \div 12}'
      - explain: 'Divide.'
        maths: '= \frac{2}{3}'
    answer: '$\frac{2}{3}$'
  - title: 'Adding fractions'
    problem: 'Work out $\frac{2}{3} + \frac{1}{4}$.'
    steps:
      - explain: 'The LCM of 3 and 4 is 12.'
        maths: '\frac{2}{3} = \frac{8}{12}, \qquad \frac{1}{4} = \frac{3}{12}'
      - explain: 'Add the numerators. Keep the denominator.'
        maths: '\frac{8}{12} + \frac{3}{12} = \frac{11}{12}'
    answer: '$\frac{11}{12}$'
  - title: 'Subtracting fractions'
    problem: 'Work out $\frac{5}{6} - \frac{4}{9}$.'
    steps:
      - explain: 'The LCM of 6 and 9 is 18 (not $6 \times 9 = 54$, though that would also work).'
        maths: '\frac{5}{6} = \frac{15}{18}, \qquad \frac{4}{9} = \frac{8}{18}'
      - explain: 'Subtract the numerators.'
        maths: '\frac{15}{18} - \frac{8}{18} = \frac{7}{18}'
    answer: '$\frac{7}{18}$'
  - title: 'Mixed numbers'
    problem: 'Work out $2\frac{1}{2} + 1\frac{2}{3}$.'
    steps:
      - explain: 'Make both improper.'
        maths: '\frac{5}{2} + \frac{5}{3}'
      - explain: 'Common denominator 6.'
        maths: '\frac{15}{6} + \frac{10}{6} = \frac{25}{6}'
      - explain: 'Change back to a mixed number: $25 \div 6 = 4$ remainder 1.'
        maths: '\frac{25}{6} = 4\tfrac{1}{6}'
    answer: '$4\frac{1}{6}$'
practice: fractions-05
---

[[activity: predict]]

## Equivalent fractions

$\frac{1}{2}$, $\frac{2}{4}$, $\frac{3}{6}$ and $\frac{50}{100}$ all mean the same amount.
Multiplying the top and bottom by the same number cuts the same shape into more,
smaller pieces — the amount shaded doesn't change.

**Simplifying** goes the other way: divide the top and bottom by a common factor. Divide
by the **HCF** and it is fully simplified in one step:
$\frac{18}{24} = \frac{18 \div 6}{24 \div 6} = \frac{3}{4}$.

[[activity: equiv]]

## Mixed numbers and improper fractions

An **improper fraction** has a top bigger than its bottom, like $\frac{11}{4}$. As a
**mixed number** it is $2\frac{3}{4}$: four quarters make a whole, so eleven quarters
make 2 wholes and 3 quarters left over.

- Mixed → improper: $2\frac{3}{4} = \frac{2 \times 4 + 3}{4} = \frac{11}{4}$
- Improper → mixed: $11 \div 4 = 2$ remainder $3$, so $\frac{11}{4} = 2\frac{3}{4}$

[[activity: mixed]]

## Why you need a common denominator

You can only add pieces that are the **same size**. Thirds and quarters are different
sizes, so first cut both into pieces that fit both: twelfths. The best choice is the
**LCM** of the denominators — the smallest number both go into.

[[activity: bars]]

The same trick lets you **compare** fractions: write them over a common denominator and
compare the tops.

[[activity: compare]]

## Adding and subtracting

1. Find the LCM of the denominators.
2. Change each fraction to an equivalent one with that denominator.
3. Add or subtract the **numerators**. The denominator stays the same.
4. Simplify, and change to a mixed number if the answer is top-heavy.

[[activity: add-check]]

## Mixed numbers

Change mixed numbers to improper fractions, then follow the same four steps. It is one
extra line of working, but it always works — especially for subtraction.

[[activity: borrow]]
