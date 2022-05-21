import { createAction, props } from '@ngrx/store';
import { getFailureType, getSuccessType } from '../../utils/store-actions.helper';
import { HttpErrorResponse } from "@angular/common/http";
import {Lesson, LessonInfo} from "../models";

export const lessonsActionTypes = {
  requestLessons: '[Lessons] Request lessons',
  addLesson: '[Lessons] Add lesson',
  removeLesson: '[Lessons] Remove lesson',
  requestLessonInfo: '[Lessons] Request lesson info'
};

export const requestLessons = createAction(
  lessonsActionTypes.requestLessons
);

export const requestLessonsSuccess = createAction(
  getSuccessType(lessonsActionTypes.requestLessons),
  props<{ lessons: Lesson[] }>()
);

export const requestLessonsFailure = createAction(
  getFailureType(lessonsActionTypes.requestLessons),
  props<{ error: HttpErrorResponse }>()
);

export const requestLessonInfo = createAction(
  lessonsActionTypes.requestLessonInfo,
  props<{ id: string }>()
);

export const requestLessonInfoSuccess = createAction(
  getSuccessType(lessonsActionTypes.requestLessonInfo),
  props<{ lessonInfo: LessonInfo }>()
);

export const requestLessonInfoFailure = createAction(
  getFailureType(lessonsActionTypes.requestLessonInfo),
  props<{ error: HttpErrorResponse }>()
);


export const addLesson = createAction(
  lessonsActionTypes.addLesson,
  props<{ lesson: Omit<Lesson, 'id'> }>()
);

export const addLessonSuccess = createAction(
  getSuccessType(lessonsActionTypes.addLesson),
  props<{ lesson: Lesson }>()
);

export const addLessonFailure = createAction(
  getFailureType(lessonsActionTypes.addLesson),
  props<{ error: HttpErrorResponse }>()
);

export const removeLesson = createAction(
  lessonsActionTypes.removeLesson,
  props<{ id: string }>()
);

export const removeLessonSuccess = createAction(
  getSuccessType(lessonsActionTypes.removeLesson),
  props<{ id: string }>()
);

export const removeLessonFailure = createAction(
  getFailureType(lessonsActionTypes.removeLesson),
  props<{ error: HttpErrorResponse }>()
);
