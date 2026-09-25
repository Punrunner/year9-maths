/* ==========================================================================
   EXERCISE REGISTRY
   --------------------------------------------------------------------------
   Maps each question `type` to the component that renders it and the rules
   that mark it. Adding a sixteenth question type means adding it here, to
   the Zod schema, and to src/lib/types.ts — nothing else changes.
   ========================================================================== */

import type { QuestionType } from '../../lib/types';
import type { WidgetModule } from './kit';

import { mcqModule, multiModule, trueFalseModule } from './ChoiceWidgets';
import { numericModule, fillBlankModule, algebraicModule } from './EntryWidgets';
import { matchModule, orderModule } from './DragWidgets';
import { tableModule, stepsModule } from './StructuredWidgets';
import { hotspotModule, manipulableModule } from './MediaWidgets';
import { flashcardsModule, drillModule } from './FluencyWidgets';
import { sortModule } from './SortWidget';

export const WIDGETS: Record<QuestionType, WidgetModule<any, any>> = {
  'mcq': mcqModule,
  'multi': multiModule,
  'truefalse': trueFalseModule,
  'numeric': numericModule,
  'fill-blank': fillBlankModule,
  'algebraic': algebraicModule,
  'match': matchModule,
  'order': orderModule,
  'table': tableModule,
  'steps': stepsModule,
  'hotspot': hotspotModule,
  'manipulable': manipulableModule,
  'flashcards': flashcardsModule,
  'drill': drillModule,
  'sort': sortModule,
};
