# Year 9 Mathematics — The Thai Guy

An interactive Year 9 maths site. Students get lessons with hide/reveal worked
solutions, fourteen kinds of self-marking practice question, interactive diagrams,
scored quizzes and progress tracking — all running in their browser, with no login and
no server.

**This guide is for you, not for a developer.** If you can edit a text file, you can
add lessons and questions. You never need to touch the design or the code.

---

## Contents

1. [Running it on your computer](#1-running-it-on-your-computer)
2. [Putting it online](#2-putting-it-online)
3. [Updating the live site](#3-updating-the-live-site)
4. [How the folders are organised](#4-how-the-folders-are-organised)
5. [Adding a topic](#5-adding-a-topic)
6. [Adding a lesson](#6-adding-a-lesson)
7. [Writing questions — all 14 types](#7-writing-questions--all-14-types)
8. [Hints and explanations](#8-hints-and-explanations)
9. [Writing maths](#9-writing-maths)
10. [Adding a quiz](#10-adding-a-quiz)
11. [Interactive diagrams](#11-interactive-diagrams)
12. [Checking your work](#12-checking-your-work)
13. [When something goes wrong](#13-when-something-goes-wrong)

---

## 1. Running it on your computer

You need [Node.js](https://nodejs.org) (the "LTS" version). Install it once.

Open a terminal in this folder and run:

```bash
npm install     # once, the first time only
npm run dev     # every time you want to work on the site
```

Then open **http://localhost:4321** in your browser.

Leave `npm run dev` running while you work. Every time you save a file the browser
updates by itself. Press `Ctrl+C` in the terminal to stop it.

> **A note about OneDrive.** This project lives in a OneDrive folder. OneDrive tries to
> sync the `node_modules` folder, which contains tens of thousands of files and will
> slow your machine down. Right-click `node_modules` → **Free up space**, or move the
> whole project somewhere outside OneDrive. Nothing in `node_modules` needs backing up
> — `npm install` recreates it.

---

## 2. Putting it online

The site is free to host. These steps take about ten minutes, once.

### Step 1 — Put the project on GitHub

```bash
cd "path/to/year9-maths"
git init
git add .
git commit -m "Year 9 Maths site"
```

Go to [github.com/new](https://github.com/new), create a repository called
`year9-maths`, and leave every tick box unticked. GitHub then shows you two commands
— run them:

```bash
git remote add origin https://github.com/YOUR-USERNAME/year9-maths.git
git branch -M main
git push -u origin main
```

### Step 2 — Connect Netlify

1. Go to [netlify.com](https://netlify.com) and sign up **with your GitHub account**.
2. Click **Add new site → Import an existing project**.
3. Choose GitHub, then choose your `year9-maths` repository.
4. Netlify reads `netlify.toml` and fills the settings in for you. Check they say:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy**.

After a minute or two you get a link like
`https://cheerful-marzipan-a1b2c3.netlify.app`. That is your shareable link.

### Step 3 — Give it a nicer name

In Netlify: **Site configuration → Change site name**. Pick something like
`thaiguy-year9-maths`, and your link becomes
`https://thaiguy-year9-maths.netlify.app`.

Finally, open `astro.config.mjs` and put that address in the `site:` line, then push
the change (see below).

> **Prefer GitHub Pages?** It also works. In `astro.config.mjs` add
> `base: '/year9-maths'`, then in your repository go to **Settings → Pages** and set
> the source to **GitHub Actions**. Netlify is simpler, which is why it is the
> recommendation.

---

## 3. Updating the live site

**The easy way — no terminal at all.** Go to your repository on github.com, click
into the file you want to change, click the pencil icon, edit, and click **Commit
changes**. Netlify rebuilds automatically and the live site updates in about a minute.

**The terminal way**, if you have been editing on your computer:

```bash
git add .
git commit -m "Added the ratio and proportion topic"
git push
```

That is it. Netlify does the rest. Watch the progress on your Netlify dashboard.

---

## 4. How the folders are organised

```
year9-maths/
├── src/
│   ├── content/                ← EVERYTHING YOU EDIT IS IN HERE
│   │   ├── strands.json            the three NSW strands
│   │   ├── topics/                 one .json file per topic
│   │   ├── lessons/                one .md file per lesson, in topic folders
│   │   ├── exercises/              one .json file per practice set
│   │   └── quizzes/                one .json file per topic quiz
│   │
│   ├── components/             the exercise widgets and diagrams (leave alone)
│   ├── layouts/                page templates (leave alone)
│   ├── lib/                    marking, progress, maths rendering (leave alone)
│   ├── pages/                  the site's URLs (leave alone)
│   ├── styles/
│   │   ├── tokens.css          ← colours, fonts and spacing live here
│   │   ├── global.css          base styles
│   │   └── exercises.css       question styles
│   └── content.config.ts       the rules your content is checked against
│
├── scripts/                    helper scripts (audit, tests)
├── public/                     the favicon
└── netlify.toml                hosting settings
```

**You will spend all your time in `src/content/`.** If you want to adjust a colour or
a font size, `src/styles/tokens.css` is the one place to do it — every part of the
site reads its values from there.

---

## 5. Adding a topic

Create a file in `src/content/topics/`. The **file name becomes the web address**, so
use lower-case words joined by hyphens: `ratio-proportion.json` becomes
`/topics/ratio-proportion/`.

```json
{
  "title": "Ratio & Proportion",
  "description": "Solving ratio problems, direct proportion and inverse proportion.",
  "strand": "number-algebra",
  "order": 11,
  "difficulty": "core",
  "objectives": [
    "Share a quantity in a given ratio",
    "Recognise and use direct proportion",
    "Recognise and use inverse proportion"
  ],
  "keywords": ["ratio", "proportion", "share", "scale"]
}
```

| Field | What it does |
| --- | --- |
| `title` | Shown on the card and at the top of the page |
| `description` | One line on the topic card |
| `strand` | One of `number-algebra`, `measurement-geometry`, `statistics-probability` |
| `order` | Chapter number — controls the order topics appear in |
| `difficulty` | `foundation`, `core` or `challenge` |
| `objectives` | "By the end of this topic you can…" list |
| `keywords` | Extra words to help the search box find it |
| `extension` | Optional. `true` leaves the topic out of the overall completion % |

All sixteen topics already exist, so you will mostly be *adding lessons* to them.

---

## 6. Adding a lesson

Create a Markdown file inside `src/content/lessons/<topic-id>/`. Name it with a number
first so the files sort sensibly: `01-solving-ratios.md`.

A lesson has two parts: **frontmatter** (the settings between the `---` lines) and the
**body** (the prose below it).

```markdown
---
title: Solving Ratio Problems
topic: ratio-proportion
order: 1
minutes: 20
difficulty: core
summary: 'Sharing an amount in a given ratio, and working back from one part.'
objectives:
  - 'Share a quantity in a given ratio'
  - 'Find the whole when you know one part'
keyRules:
  - title: 'Adding the parts'
    formula: '\text{one part} = \frac{\text{total}}{\text{sum of the ratio parts}}'
    body: 'Add the numbers in the ratio to find how many parts there are altogether.'
workedExamples:
  - title: 'Sharing in a ratio'
    problem: 'Share $\pounds 60$ in the ratio $2 : 3$.'
    steps:
      - explain: 'Add the parts of the ratio.'
        maths: '2 + 3 = 5'
      - explain: 'Divide the total by the number of parts.'
        maths: '60 \div 5 = 12'
      - explain: 'Multiply each share.'
        maths: '2 \times 12 = 24, \qquad 3 \times 12 = 36'
    answer: '$\pounds 24$ and $\pounds 36$'
visual:
  widget: number-line
  title: 'Try it'
  caption: 'Drag the marker.'
  config:
    min: 0
    max: 10
practice: ratio-01
---

## Why this matters

Write your explanation here in ordinary Markdown. Use `##` for headings, `-` for
bullet points, `**bold**` for emphasis, and `$x^2$` for maths.

Tables work too:

| Ratio | Parts | Each part |
| --- | --- | --- |
| $2:3$ | 5 | $\pounds 12$ |
```

### The frontmatter fields

| Field | Required? | What it does |
| --- | --- | --- |
| `title` | yes | The lesson heading |
| `topic` | yes | Must match a topic file name exactly |
| `order` | yes | Position inside the topic, starting at 1 |
| `summary` | yes | One sentence, shown in the lesson list |
| `objectives` | yes | At least one. Shown in the red box near the top |
| `minutes` | no | Estimated time (default 15) |
| `difficulty` | no | `foundation`, `core` or `challenge` |
| `keyRules` | no | The rules and formulas panel |
| `workedExamples` | no | Solutions that reveal one step at a time |
| `visual` | no | An interactive diagram (see section 11) |
| `practice` | no | The name of a file in `exercises/`, without `.json` |

### Two rules about frontmatter

1. **Indent with spaces, never tabs.** YAML refuses tabs.
2. **Wrap any text containing maths in single quotes**, like
   `summary: 'Finding $x$ when...'`. Without the quotes the special characters can
   confuse the file format. If your text itself contains an apostrophe, double it:
   `'the student''s answer'`.

---

## 7. Writing questions — all 14 types

Practice sets live in `src/content/exercises/`. One file per lesson, and the file name
is what you put in the lesson's `practice:` field.

The skeleton of every file:

```json
{
  "title": "Practice: solving ratios",
  "intro": "Optional line of text above the questions.",
  "questions": [
    ...questions go here...
  ]
}
```

Optional extras on the file:

- `"pick": 6` — show 6 random questions from the bank instead of all of them, and
  give the student a **New questions** button.
- `"shuffle": true` — show all the questions but in a random order.

### Fields every question has

```json
{
  "id": "r1-q1",
  "type": "numeric",
  "prompt": "The question text. Supports $maths$ and **bold**.",
  "hints": ["Shown one at a time when the student presses Hint.", "A second hint."],
  "explanation": "The worked explanation, revealed after answering.",
  "difficulty": "core",
  "marks": 1,
  "needsReview": false
}
```

`id` must be unique **within its own file**. `hints`, `difficulty`, `marks` and
`needsReview` are all optional.

Set `"needsReview": true` on any question you have not checked yet — it shows a
**Draft** chip on the page, and `npm run audit` lists them all for you.

---

Below is a complete, copy-paste example of every single type.

### 1. Multiple choice

One right answer. Options are shuffled unless you say otherwise.

```json
{
  "id": "q1",
  "type": "mcq",
  "prompt": "What is the gradient of $y = 5x - 2$?",
  "options": [
    { "id": "a", "text": "$5$" },
    { "id": "b", "text": "$-2$" },
    { "id": "c", "text": "$3$" }
  ],
  "answer": "a",
  "hints": ["Compare it with $y = mx + c$."],
  "explanation": "The gradient is the number multiplying $x$, so **5**."
}
```

Add `"shuffleOptions": false` to keep your order — useful when an option says
"none of these".

### 2. Multiple select

Several right answers, with partial credit. A wrong tick cancels out a right one.

```json
{
  "id": "q2",
  "type": "multi",
  "prompt": "Select **every** line parallel to $y = 4x + 1$.",
  "options": [
    { "id": "a", "text": "$y = 4x - 7$" },
    { "id": "b", "text": "$y = 4x$" },
    { "id": "c", "text": "$y = -4x + 1$" },
    { "id": "d", "text": "$y = x + 4$" }
  ],
  "answers": ["a", "b"],
  "explanation": "Parallel lines share a gradient, so any line with $m = 4$."
}
```

### 3. True / False

```json
{
  "id": "q3",
  "type": "truefalse",
  "prompt": "**Every square is a rectangle.**",
  "answer": true,
  "explanation": "True — a square meets every condition for a rectangle."
}
```

Rename the buttons with `"labels": ["Rational", "Irrational"]`.

### 4. Numeric entry

Accepts equivalent forms automatically: `0.75`, `3/4` and `75%` all match each other.

```json
{
  "id": "q4",
  "type": "numeric",
  "prompt": "Find the area of a circle with radius $4.5$ cm. Use $\\pi = 3.14$.",
  "answer": 63.585,
  "tolerance": 0.4,
  "accept": ["63.59"],
  "unit": "cm²",
  "placeholder": "Answer",
  "explanation": "$A = \\pi r^2 = 3.14 \\times 20.25 = 63.585$."
}
```

- `answer` can be a number, or a string like `"3/4"`, `"2 1/2"` or `"1.5e8"`.
- `tolerance` allows rounding. `0.4` means anything within 0.4 counts.
- `accept` lists extra wordings you want to allow.
- `unit` is shown beside the box; the student does not type it.

### 5. Fill in the blank

Mark each gap with `[[name]]` in the text, then describe it in `blanks`.

```json
{
  "id": "q5",
  "type": "fill-blank",
  "prompt": "Complete the rule.",
  "text": "For independent events, $P(\\text{A and B}) = P(\\text{A}) \\;[[op]]\\; P(\\text{B})$, and all outcomes total [[total]].",
  "blanks": [
    { "id": "op", "accept": ["multiply", "times", "x"], "size": 8 },
    { "id": "total", "accept": ["1", "one"], "size": 4 }
  ],
  "explanation": "AND means multiply, and a full set of outcomes always totals 1."
}
```

Each gap is marked separately, so partial credit comes for free. `size` is roughly how
many characters wide the box should be.

**Answers in any order.** Give gaps the same `group` and the student can fill them in
either order — ideal for the two solutions of a quadratic:

```json
"text": "$x =$ [[a]] or $x =$ [[b]]",
"blanks": [
  { "id": "a", "accept": ["-3"], "size": 4, "group": "roots" },
  { "id": "b", "accept": ["4"], "size": 4, "group": "roots" }
]
```

### 6. Short algebraic input

Checked by **maths, not spelling** — `12 + 3x` and `3(x + 4)` both pass for `3x + 12`.

```json
{
  "id": "q6",
  "type": "algebraic",
  "prompt": "Find the nth term of $7,\\ 11,\\ 15,\\ 19,\\ \\dots$",
  "answer": "4n + 3",
  "variables": ["n"],
  "placeholder": "e.g. 4n + 3",
  "explanation": "The difference is 4, and $4n$ is 3 short, so **$4n + 3$**."
}
```

- `variables` tells the marker which letters are unknowns. Use `["a", "b"]` for two.
- Students type `^` for powers: `n^2` means $n^2$. A symbol pad appears under the box
  for phones.
- Add `"requireForm": true` when the *shape* matters, such as "factorise" questions —
  then an expanded answer is rejected even though it is equal.
- Letters next to each other multiply, as in normal algebra: a student can type `3xz/y`
  or `6pr` and it is read as $3 \times x \times z \div y$. Just list every letter in
  `variables`.

### 7. Drag-and-drop matching

```json
{
  "id": "q7",
  "type": "match",
  "prompt": "Match each term to its meaning.",
  "left": [
    { "id": "l1", "text": "Theoretical probability" },
    { "id": "l2", "text": "Experimental probability" }
  ],
  "right": [
    { "id": "r1", "text": "Worked out by reasoning" },
    { "id": "r2", "text": "Measured by running trials" }
  ],
  "solution": { "l1": "r1", "l2": "r2" },
  "explanation": "One is calculated; the other is measured."
}
```

Students can drag, or tap one answer and then tap its row — so it works on a phone and
with a keyboard.

### 8. Drag-and-drop ordering

```json
{
  "id": "q8",
  "type": "order",
  "prompt": "Put the steps in the right order.",
  "items": [
    { "id": "s1", "text": "Find the common difference" },
    { "id": "s2", "text": "Write down $dn$" },
    { "id": "s3", "text": "Compare with the sequence" },
    { "id": "s4", "text": "Add or subtract to match" }
  ],
  "solution": ["s1", "s2", "s3", "s4"],
  "explanation": "Find $d$, build the skeleton, compare, adjust."
}
```

`solution` lists the ids from first to last. Each item in the right place scores.

### 9. Complete the table

Each cell is either `given` (already filled in) or an `answer` (a gap to fill).

```json
{
  "id": "q9",
  "type": "table",
  "prompt": "Complete the table of values for $y = 2x - 1$.",
  "columns": ["$x$", "$0$", "$1$", "$2$"],
  "rows": [
    [
      { "given": "$y$" },
      { "answer": "-1" },
      { "answer": "1" },
      { "answer": "3" }
    ]
  ],
  "explanation": "Substitute each $x$ into $2x - 1$."
}
```

Cells take `tolerance` and `accept` just like numeric questions. Set
`"rowHeader": false` if the first column is not a heading.

### 10. Step-by-step guided solver

Each step must be right before the next appears.

```json
{
  "id": "q10",
  "type": "steps",
  "prompt": "Work through this one step at a time.",
  "scenario": "A cylinder has radius 6 cm and height 10 cm. Use $\\pi = 3.14$.",
  "steps": [
    {
      "kind": "numeric",
      "prompt": "Find the area of one circular end.",
      "answer": 113.04,
      "tolerance": 0.5,
      "feedback": "$\\pi r^2 = 3.14 \\times 36$.",
      "hint": "Use $\\pi r^2$ with $r = 6$."
    },
    {
      "kind": "mcq",
      "prompt": "How many circular ends does a closed cylinder have?",
      "options": [
        { "id": "a", "text": "Two" },
        { "id": "b", "text": "One" }
      ],
      "answer": "a",
      "feedback": "Two — top and bottom."
    },
    {
      "kind": "algebraic",
      "prompt": "Write the formula for the curved surface area.",
      "answer": "2*pi*r*h",
      "variables": ["r", "h"],
      "feedback": "Circumference times height."
    }
  ],
  "explanation": "Two ends plus the curved surface."
}
```

Each step's `kind` is `numeric`, `mcq` or `algebraic`, and takes the same fields as the
matching full question type. `feedback` and `hint` are optional.

### 11. Diagram hotspot

The student clicks the right part of a diagram.

```json
{
  "id": "q11",
  "type": "hotspot",
  "prompt": "**Click the hypotenuse.**",
  "figure": "right-triangle",
  "config": { "a": "3 cm", "b": "4 cm", "c": "5 cm" },
  "answer": "hypotenuse",
  "explanation": "The side opposite the right angle."
}
```

The diagrams available, and what you can click on each:

| `figure` | Things you can click (`answer`) |
| --- | --- |
| `right-triangle` | `hypotenuse`, `leg-a`, `leg-b`, `right-angle`, `vertex-a`, `vertex-b`, `vertex-c` |
| `circle-parts` | `centre`, `radius`, `diameter`, `circumference`, `chord` |
| `line-graph` | `y-intercept`, `x-intercept`, `origin`, `rise`, `run`, `point-on-line` |
| `distance-time` | `fastest`, `stationary`, `slowest`, `start`, `finish` |
| `cylinder` | `curved-surface`, `top-face`, `bottom-face`, `height`, `radius` |
| `tree-diagram` | `branch-a`, `branch-b`, `branch-aa`, `branch-ab`, `branch-ba`, `branch-bb` |
| `parallel-lines` | `p-tl`, `p-tr`, `p-bl`, `p-br` (top crossing), `q-tl`, `q-tr`, `q-bl`, `q-br` (bottom crossing) |
| `scatter-graph` | `p0`, `p1`, `p2`, … — one per point, in the order you list them |

Use a list for `answer` when more than one region is acceptable:
`"answer": ["radius", "diameter"]`.

`line-graph` takes `"config": { "m": 2, "c": -2 }`; `tree-diagram` takes
`"config": { "first": ["H", "T"], "second": ["H", "T"], "p1": "½", "p2": "½" }`.

`parallel-lines` shows two parallel lines cut by a transversal. In the region names, `t`/`b`
mean above/below the line and `l`/`r` mean left/right of the crossing line. Shade the
known angle with `"config": { "given": "p-tr", "givenLabel": "a" }` — then ask for its
corresponding (`q-tr`), alternate (`q-bl`), co-interior (`q-br`) or vertically opposite
(`p-bl`) angle.

`scatter-graph` takes `"config": { "points": [[3, 2.1], [4, 3.5], …], "xLabel": "…",
"yLabel": "…", "xRange": [2, 10], "yRange": [0, 10] }` and optionally
`"line": [[x1, y1], [x2, y2]]` for a line of best fit. Great for "click the outlier".

### 12. Manipulable

The student moves sliders or drags points until they match a target.

```json
{
  "id": "q12",
  "type": "manipulable",
  "prompt": "Move the sliders so the line matches $y = 3x - 4$.",
  "widget": "line-mc",
  "config": { "start": { "m": 1, "c": 0 } },
  "target": { "m": 3, "c": -4 },
  "tolerance": 0.01,
  "explanation": "$m = 3$ and $c = -4$."
}
```

| `widget` | Values you can target |
| --- | --- |
| `line-mc` | `m`, `c` |
| `parabola` | `a`, `b`, `c` |
| `number-line` | `x` |
| `pythagoras` | `a`, `b` |
| `prism` | `l`, `w`, `h` |
| `polygon-angles` | `n` |
| `enlargement` | `k`, `ox`, `oy` |
| `spinner` | `spins` (use a large `tolerance` — see below) |
| `area-model` | `a`, `b` — the rectangle for $(x + a)(x + b)$ |
| `bearing` | `b` — a three-figure bearing, 0 to 359 |
| `histogram` | `f0`, `f1`, `f2`, … — the frequency of each class |
| `axis-trick` | `lo`, `hi` — where the $y$-axis starts and ends |

Leave `target` out entirely and the question becomes a free exploration that always
counts as complete.

For the spinner, `"target": { "spins": 100 }, "tolerance": 400` means "do at least
100 spins" — the tolerance is deliberately wide so more spins still count.

`config` options: `number-line` takes `min`, `max`, `step`, `majorStep`, `label`;
`pythagoras` and `prism` take `min`, `max`, `step`, `unit`; `spinner` takes `sectors`
(a list of names) and `focus` (which one to report on).

More `config` options:

- `number-line` with `"inequality": true` adds an arrow direction and an open/closed
  circle. Target all three: `"target": { "x": 9, "dir": 1, "closed": 1 }` means
  $x \ge 9$ (`dir` is `1` right / `-1` left; `closed` is `1` for ≤ ≥, `0` for < >).
- `polygon-angles` with `"inscribed": true` draws the circle and radii.
- `bearing` takes `distance` and `unit` to show how far East/West and North/South a
  journey goes.
- `histogram` takes `boundaries` (e.g. `[10, 20, 30, 40, 50]`), `freqs`, `maxFreq`,
  `label`, `"polygon": true` for a frequency polygon, and `"bars": false` to hide the bars.
  It shows the estimated mean, modal class and median class live.
- `axis-trick` takes `values`, `labels` and `unit` — a bar chart for misleading-graph lessons.
- Any widget takes `"start": { … }` to choose its starting values. **Make sure the target
  is different from the start**, or the question is marked right before the student
  touches anything.

### 13. Flashcards

Not marked — a revision tool. Students flip, sort into "got it" and "review again",
and can reshuffle.

```json
{
  "id": "q13",
  "type": "flashcards",
  "prompt": "Flip through these until you can recall each one.",
  "cards": [
    { "id": "c1", "front": "Area of a circle", "back": "$A = \\pi r^2$" },
    { "id": "c2", "front": "Circumference", "back": "$C = 2\\pi r$" }
  ],
  "explanation": "These two cover most circle questions."
}
```

### 14. Quick-fire timed drill

A burst of short questions against a clock, for fluency.

```json
{
  "id": "q14",
  "type": "drill",
  "prompt": "Quick-fire: expected frequency.",
  "durationSec": 90,
  "count": 8,
  "pool": [
    { "id": "d1", "prompt": "100 trials, $P = 0.3$?", "accept": ["30"] },
    { "id": "d2", "prompt": "50 trials, $P = 0.4$?", "accept": ["20"] },
    { "id": "d3", "prompt": "80 trials, $P = \\frac{1}{4}$?", "accept": ["20"] },
    { "id": "d4", "prompt": "60 trials, $P = \\frac{1}{6}$?", "accept": ["10"] }
  ],
  "explanation": "Every one is trials $\\times$ probability."
}
```

`count` items are drawn at random from `pool` each run, so it is different every time.
Put at least twice as many in the pool as `count`. Items can take a `tolerance`.

---

## 8. Hints and explanations

**Hints** are revealed one at a time, so write them getting progressively more
helpful. Three is usually plenty:

```json
"hints": [
  "What is the common difference?",
  "The difference is 4, so start with $4n$.",
  "Compare $4, 8, 12$ with $7, 11, 15$ — what has been added?"
]
```

**Explanations** appear after answering, whether the student was right or wrong. The
best ones do three things: give the answer, show the working, and name the mistake
people usually make.

```json
"explanation": "$r = 10 \\div 2 = 5$, so $A = 3.14 \\times 25 = 78.5$ cm². Using 10 instead of 5 gives four times too much — the classic slip."
```

Every question **must** have an explanation. The site will not build without one.

---

## 9. Writing maths

Maths goes between dollar signs and uses LaTeX, the standard maths notation.

| You want | You type |
| --- | --- |
| $x^2$ | `$x^2$` |
| $x_1$ | `$x_1$` |
| $\frac{3}{4}$ | `$\frac{3}{4}$` |
| $\sqrt{16}$ | `$\sqrt{16}$` |
| $\sqrt[3]{27}$ | `$\sqrt[3]{27}$` |
| $\pi$ | `$\pi$` |
| $\times \div \pm$ | `$\times \div \pm$` |
| $\le \ge \ne \approx$ | `$\le \ge \ne \approx$` |
| $45\degree$ | `$45\degree$` |
| plain words in maths | `$\text{speed} = 5$` |
| a whole line, centred | `$$a^2 + b^2 = c^2$$` |

### The one thing that trips everyone up

**Inside a `.json` file every backslash must be doubled.**

| In a `.md` lesson file | In a `.json` question file |
| --- | --- |
| `$\frac{1}{2}$` | `"$\\frac{1}{2}$"` |
| `$\pi r^2$` | `"$\\pi r^2$"` |

Markdown lessons take single backslashes. JSON question files take double. If maths
shows up as red code on the page, a missing second backslash is almost always why.

---

## 10. Adding a quiz

Create a file in `src/content/quizzes/` named after its topic —
`ratio-proportion.json`. The questions use exactly the same format as practice.

```json
{
  "title": "Ratio and proportion quiz",
  "topic": "ratio-proportion",
  "description": "Ten questions drawn from a bank of fourteen.",
  "pick": 10,
  "timeLimitSec": 900,
  "passMark": 70,
  "questions": [ ... ]
}
```

- `pick` — how many to draw each attempt. Make the bank bigger than `pick` so a retry
  gives a genuinely different paper.
- `timeLimitSec` — for the optional timed mode. Students choose whether to use it.
- `passMark` — the percentage needed to pass.
- `marks` on a question — worth more than one mark. Partial-credit types award a
  fraction of them.

A quiz marks everything at the end, not as the student goes, and then shows every
question with the right answer and your explanation.

**Do not use `flashcards` or `drill` in a quiz** — they run their own loop and do not
fit a marked paper. Every other type is fine.

Quiz questions are also the pool for the **Exam practice** page, which builds mixed
papers from across the topics a student has finished.

---

## 11. Interactive diagrams

Add one to a lesson with the `visual` block in the frontmatter:

```yaml
visual:
  widget: pythagoras
  title: 'Drag the triangle'
  caption: 'Try $a = 3$, $b = 4$ and see what the hypotenuse comes out as.'
  config:
    min: 1
    max: 10
    step: 1
    unit: cm
```

The twelve available widgets are listed in the manipulable table in section 7. In a
lesson there is no target and nothing to mark — it is purely something to play with.

The same widget can be used as a question by giving it a `target` (type 12).

---

## 12. Checking your work

Three commands, all safe to run any time:

```bash
npm run audit    # what is in the site, and whether anything is broken
npm run keys     # marks every answer key with the real marker — catches typos
npm test         # checks the answer-marking rules still work
npm run build    # the full check — run this before pushing
```

`npm run audit` prints a summary like this:

```
Lessons            61
Questions total    798
  mcq           13  █████████████
  numeric       50  ██████████████████████████████
  ...
  All 14 question types are in use.

  ✓ Every reference resolves and all question ids are unique.
```

It also lists anything you flagged with `"needsReview": true`.

`npm run keys` takes every question's own answer and marks it exactly as the site
would. If it reports a problem, the site would mark a correct student wrong — fix it
before publishing. Add a name to check one topic only: `npm run keys -- quadratics`.

`npm run build` is the strict one. **If your content has a mistake, the build stops
and tells you the file and the field**, for example:

```
[InvalidContentEntryDataError] exercises → ratio-01
  questions.3.explanation: Required
```

That means the fourth question in `ratio-01.json` has no `explanation`. Fix it and
build again. This is the safety net: a broken question can never reach your students.

---

## 13. When something goes wrong

| What you see | What it means |
| --- | --- |
| `questions.2.answer: Required` | The third question in that file is missing its answer |
| `Invalid discriminator value. Expected 'mcq' \| 'multi' \| ...` | A `type` is misspelt |
| `topic: Reference to topics invalid` | The `topic:` name does not match a file in `topics/` |
| `lesson ... wants practice set "x", which does not exist` | The `practice:` name has no matching file in `exercises/` |
| Maths shows as red code | A missing double backslash in a `.json` file |
| `Unexpected token } in JSON` | A stray or missing comma — every item needs a comma except the last |
| `bad indentation of a mapping entry` | A tab in the frontmatter. Use spaces |
| A lesson does not appear | Check `topic:` matches, and that the file ends in `.md` |
| Nothing updates in the browser | Stop `npm run dev` with `Ctrl+C` and start it again |

### Resetting a student's progress

Progress lives in each student's own browser. They can clear it themselves at
**My progress → Reset progress**. Nothing is stored anywhere else, so there is nothing
for you to manage — and nothing of theirs that you can see.

---

## Design notes

Colours, fonts, spacing and rounding are all defined once in
`src/styles/tokens.css`. Change a value there and it updates everywhere. The site is
white by default; students can switch to dark with the toggle in the header, and their
choice is remembered.

The site respects `prefers-reduced-motion`, works fully from the keyboard, and never
signals right or wrong with colour alone — there is always an icon and a word.
