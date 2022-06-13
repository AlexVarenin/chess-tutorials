import { Action, createReducer, on } from '@ngrx/store';
import { requestCompletedLessonsSuccess, requestStatisticsSuccess } from '../actions';
import { LessonStatistics } from '../models/statistics-state.models';

const reducer = createReducer<LessonStatistics[] | undefined>(
  undefined,
  on(requestStatisticsSuccess, requestCompletedLessonsSuccess, (state, { statistics }) => statistics),
);

export function statisticsListReducer(state: LessonStatistics[] | undefined, action: Action) {
  return reducer(state, action);
}
