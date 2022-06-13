import { createAction, props } from '@ngrx/store';
import { getFailureType, getSuccessType } from '../../utils/store-actions.helper';
import { HttpErrorResponse } from '@angular/common/http';
import { LessonStatistics } from '../models/statistics-state.models';

export const statisticsActionTypes = {
  requestStatistics: '[Statistics] Request statistics',
  addNewStatisticsRecord: '[Statistics] Add new statistics record',
  requestCompletedLessons: '[Statistics] Request completed lessons'
};

export const requestStatistics = createAction(
  statisticsActionTypes.requestStatistics
);

export const requestStatisticsSuccess = createAction(
  getSuccessType(statisticsActionTypes.requestStatistics),
  props<{ statistics: LessonStatistics[] }>()
);

export const requestStatisticsFailure = createAction(
  getFailureType(statisticsActionTypes.requestStatistics),
  props<{ error: HttpErrorResponse }>()
);

export const addNewStatisticsRecord = createAction(
  statisticsActionTypes.addNewStatisticsRecord,
  props<{ lessonId: string }>()
);

export const addNewStatisticsRecordSuccess = createAction(
  getSuccessType(statisticsActionTypes.addNewStatisticsRecord),
  props<{ lessonId: string }>()
);

export const addNewStatisticsRecordFailure = createAction(
  getFailureType(statisticsActionTypes.addNewStatisticsRecord),
  props<{ error: HttpErrorResponse }>()
);

export const requestCompletedLessons = createAction(
  statisticsActionTypes.requestCompletedLessons
);

export const requestCompletedLessonsSuccess = createAction(
  getSuccessType(statisticsActionTypes.requestCompletedLessons),
  props<{ statistics: LessonStatistics[] }>()
);

export const requestCompletedLessonsFailure = createAction(
  getFailureType(statisticsActionTypes.requestCompletedLessons),
  props<{ error: HttpErrorResponse }>()
);
