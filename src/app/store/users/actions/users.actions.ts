import { createAction, props } from '@ngrx/store';
import { getFailureType, getSuccessType } from '../../utils/store-actions.helper';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from '../models';

export const lessonsActionTypes = {
  requestStudents: '[Users] Request users'
};

export const requestStudents = createAction(
  lessonsActionTypes.requestStudents
);

export const requestStudentsSuccess = createAction(
  getSuccessType(lessonsActionTypes.requestStudents),
  props<{ students: Student[] }>()
);

export const requestStudentsFailure = createAction(
  getFailureType(lessonsActionTypes.requestStudents),
  props<{ error: HttpErrorResponse }>()
);
