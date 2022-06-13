import { createAction, props } from '@ngrx/store';
import { getFailureType, getSuccessType } from '../../utils/store-actions.helper';
import { HttpErrorResponse } from '@angular/common/http';
import { Lesson, LessonInfo, Move, MoveStatus } from "../models";

export const lessonsActionTypes = {
  requestLessons: '[Lessons] Request lessons',
  requestStudentLessons: '[Lessons] Request student lessons',
  addLesson: '[Lessons] Add lesson',
  removeLesson: '[Lessons] Remove lesson',
  requestLessonInfo: '[Lessons] Request lesson info',
  updateLesson: '[Lessons] Update lesson',
  checkStudentMove: '[Lessons] check student move'
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

export const requestStudentLessons = createAction(
  lessonsActionTypes.requestStudentLessons
);

export const requestStudentLessonsSuccess = createAction(
  getSuccessType(lessonsActionTypes.requestStudentLessons),
  props<{ lessons: Lesson[] }>()
);

export const requestStudentLessonsFailure = createAction(
  getFailureType(lessonsActionTypes.requestStudentLessons),
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
  props<{ lesson: Omit<LessonInfo, 'id'> }>()
);

export const addLessonSuccess = createAction(
  getSuccessType(lessonsActionTypes.addLesson),
  props<{ lesson: LessonInfo }>()
);

export const addLessonFailure = createAction(
  getFailureType(lessonsActionTypes.addLesson),
  props<{ error: HttpErrorResponse }>()
);

export const updateLesson = createAction(
  lessonsActionTypes.updateLesson,
  props<{ id: string; lesson: Omit<LessonInfo, 'id'> }>()
);

export const updateLessonSuccess = createAction(
  getSuccessType(lessonsActionTypes.updateLesson),
  props<{ id: string; lesson: LessonInfo }>()
);

export const updateLessonFailure = createAction(
  getFailureType(lessonsActionTypes.updateLesson),
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

export const checkStudentMove = createAction(
  lessonsActionTypes.checkStudentMove,
  props<{ id: string; moveIndex: number, move: Move; }>()
);

export const checkStudentMoveSuccess = createAction(
  getSuccessType(lessonsActionTypes.checkStudentMove),
  props<{ status: MoveStatus; move: Move; nextMove: Move; }>()
);

export const checkStudentMoveFailure = createAction(
  getFailureType(lessonsActionTypes.checkStudentMove),
  props<{ error: HttpErrorResponse }>()
);
