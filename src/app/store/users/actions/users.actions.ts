import { createAction, props } from '@ngrx/store';
import { getFailureType, getSuccessType } from '../../utils/store-actions.helper';
import { HttpErrorResponse } from '@angular/common/http';
import { Student, User } from '../models';

export const usersActionTypes = {
  requestUserMe: '[Users] Request user me',
  requestStudents: '[Users] Request students',
  logout: '[Users] Logout'
};

export const requestStudents = createAction(
  usersActionTypes.requestStudents
);

export const requestStudentsSuccess = createAction(
  getSuccessType(usersActionTypes.requestStudents),
  props<{ students: Student[] }>()
);

export const requestStudentsFailure = createAction(
  getFailureType(usersActionTypes.requestStudents),
  props<{ error: HttpErrorResponse }>()
);

export const requestUserMe = createAction(
  usersActionTypes.requestUserMe
);

export const requestUserMeSuccess = createAction(
  getSuccessType(usersActionTypes.requestUserMe),
  props<{ userMe: User }>()
);

export const requestUserMeFailure = createAction(
  getFailureType(usersActionTypes.requestUserMe),
  props<{ error: HttpErrorResponse }>()
);

export const logout = createAction(
  usersActionTypes.logout
);
