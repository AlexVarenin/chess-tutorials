import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import {
  Lesson,
  LessonsState,
  LessonsStateName
} from '../models';

export const selectLessonsState = createFeatureSelector<LessonsState>(LessonsStateName);

export const selectLessons: MemoizedSelector<LessonsState, Lesson[] | undefined> = createSelector(
  selectLessonsState,
  (lessonsState: LessonsState): Lesson[] | undefined => lessonsState?.lessonsList
);


export const selectLessonInfo: (id: string) => MemoizedSelector<LessonsState, Lesson | undefined> = (id: string) =>
  createSelector(selectLessons, (lessons: Lesson[] | undefined): Lesson | undefined =>
    lessons?.find((lesson: Lesson) => lesson.id === id));
