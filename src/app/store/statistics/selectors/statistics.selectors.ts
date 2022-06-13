import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { LessonStatistics, StatisticsState, StatisticsStateName } from '../models/statistics-state.models';

export const selectStatisticsState = createFeatureSelector<StatisticsState>(StatisticsStateName);

export const selectStatistics: MemoizedSelector<StatisticsState, LessonStatistics[] | undefined> = createSelector(
  selectStatisticsState,
  (statisticsState: StatisticsState): LessonStatistics[] | undefined => statisticsState?.statistics
);

export const selectLessonIsCompleted: (lessonId: string) =>
  MemoizedSelector<StatisticsState, boolean> = (lessonId: string) =>
  createSelector(
    selectStatistics,
    (statistics: LessonStatistics[] | undefined): boolean => !!(statistics?.find(item => item.lessonId === lessonId))
  );
