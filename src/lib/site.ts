/* ==========================================================================
   SITE STRUCTURE HELPERS
   --------------------------------------------------------------------------
   Reads the content collections and assembles the strand → topic → lesson
   tree that every page needs, plus the small "catalog" the progress code uses
   to work out completion percentages and badges.

   These run at build time only.
   ========================================================================== */

import { getCollection, type CollectionEntry } from 'astro:content';
import type { Catalog } from './progress';

export type Strand = CollectionEntry<'strands'>;
export type Topic = CollectionEntry<'topics'>;
export type Lesson = CollectionEntry<'lessons'>;
export type Quiz = CollectionEntry<'quizzes'>;

export interface TopicNode {
  topic: Topic;
  strand: Strand;
  lessons: Lesson[];
  quiz?: Quiz;
  href: string;
  quizHref?: string;
}

export interface StrandNode {
  strand: Strand;
  topics: TopicNode[];
  href: string;
}

/** Everything, sorted, in one pass. Cached for the whole build. */
let treeCache: StrandNode[] | null = null;

export async function getTree(): Promise<StrandNode[]> {
  if (treeCache) return treeCache;

  const [strands, topics, lessons, quizzes] = await Promise.all([
    getCollection('strands'),
    getCollection('topics'),
    getCollection('lessons'),
    getCollection('quizzes'),
  ]);

  const byStrand = (t: Topic) => t.data.strand.id;

  treeCache = strands
    .sort((a, b) => a.data.order - b.data.order)
    .map((strand): StrandNode => ({
      strand,
      href: `/strands/${strand.id}/`,
      topics: topics
        .filter((t) => byStrand(t) === strand.id)
        .sort((a, b) => a.data.order - b.data.order)
        .map((topic): TopicNode => {
          const quiz = quizzes.find((q) => q.data.topic.id === topic.id);
          return {
            topic,
            strand,
            href: `/topics/${topic.id}/`,
            lessons: lessons
              .filter((l) => l.data.topic.id === topic.id)
              .sort((a, b) => a.data.order - b.data.order),
            ...(quiz ? { quiz, quizHref: `/quiz/${topic.id}/` } : {}),
          };
        }),
    }));

  return treeCache;
}

/** A flat list of every topic, in course order. */
export async function getTopicNodes(): Promise<TopicNode[]> {
  const tree = await getTree();
  return tree.flatMap((s) => s.topics);
}

/** Every lesson in the order a student would work through the site. */
export async function getLessonSequence(): Promise<Array<{ lesson: Lesson; topic: TopicNode }>> {
  const nodes = await getTopicNodes();
  return nodes.flatMap((topic) => topic.lessons.map((lesson) => ({ lesson, topic })));
}

/** The previous / next lesson within the same topic, for the lesson footer. */
export async function getNeighbours(lessonId: string) {
  const seq = await getLessonSequence();
  const i = seq.findIndex((s) => s.lesson.id === lessonId);
  return {
    prev: i > 0 ? seq[i - 1] : undefined,
    next: i >= 0 && i < seq.length - 1 ? seq[i + 1] : undefined,
    position: i + 1,
    total: seq.length,
  };
}

/** The compact structure the browser-side progress code needs. */
export async function getCatalog(): Promise<Catalog> {
  const tree = await getTree();
  return {
    strands: tree.map((s) => ({ id: s.strand.id, topicIds: s.topics.map((t) => t.topic.id) })),
    topics: tree.flatMap((s) => s.topics.map((t) => ({
      id: t.topic.id,
      strandId: s.strand.id,
      lessonIds: t.lessons.map((l) => l.id),
      extension: t.topic.data.extension,
    }))),
  };
}

/** Everything the search box needs, as one small JSON payload. */
export async function getSearchIndex() {
  const tree = await getTree();
  const rows: Array<{
    title: string; kind: 'Topic' | 'Lesson'; href: string;
    strand: string; text: string; difficulty: string;
  }> = [];

  for (const s of tree) {
    for (const t of s.topics) {
      rows.push({
        title: t.topic.data.title,
        kind: 'Topic',
        href: t.href,
        strand: s.strand.data.short,
        difficulty: t.topic.data.difficulty,
        text: [t.topic.data.description, ...t.topic.data.keywords, ...t.topic.data.objectives].join(' '),
      });
      for (const l of t.lessons) {
        rows.push({
          title: l.data.title,
          kind: 'Lesson',
          href: `/lessons/${l.id}/`,
          strand: s.strand.data.short,
          difficulty: l.data.difficulty,
          text: [l.data.summary, t.topic.data.title, ...l.data.objectives].join(' '),
        });
      }
    }
  }
  return rows;
}

/** Total counts for the home page banner. */
export async function getCounts() {
  const tree = await getTree();
  const topics = tree.flatMap((s) => s.topics);
  return {
    strands: tree.length,
    topics: topics.length,
    lessons: topics.reduce((n, t) => n + t.lessons.length, 0),
    quizzes: topics.filter((t) => t.quiz).length,
  };
}
