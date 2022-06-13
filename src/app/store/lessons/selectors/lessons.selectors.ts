import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import {
  Lesson,
  LessonInfo,
  LessonsState,
  LessonsStateName
} from '../models';

export const selectLessonsState = createFeatureSelector<LessonsState>(LessonsStateName);

export const selectLessons: MemoizedSelector<LessonsState, Lesson[] | undefined> = createSelector(
  selectLessonsState,
  (lessonsState: LessonsState): Lesson[] | undefined => lessonsState?.lessonsList
);

export const selectLessonInfo: MemoizedSelector<LessonsState, LessonInfo | undefined> = createSelector(
  selectLessonsState,
  (lessonsState: LessonsState): LessonInfo | undefined => lessonsState?.lessonInfo
);
