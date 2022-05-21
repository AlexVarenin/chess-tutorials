import { createAction, props } from '@ngrx/store';
import { getFailureType, getSuccessType } from '../../utils/store-actions.helper';
import { HttpErrorResponse } from '@angular/common/http';
import { Group, GroupInfo } from '../models';
import {Student} from "../../users/models";
import {Lesson} from "../../lessons/models";

export const lessonsActionTypes = {
  requestGroups: '[Groups] Request groups',
  requestGroupInfo: '[Groups] Request group info',
  addGroup: '[Groups] Add group',
  addStudentToGroup: '[Groups] Add student to group',
  addLessonToGroup: '[Groups] Add lesson to group'
};

export const requestGroups = createAction(
  lessonsActionTypes.requestGroups
);

export const requestGroupsSuccess = createAction(
  getSuccessType(lessonsActionTypes.requestGroups),
  props<{ groups: Group[] }>()
);

export const requestGroupsFailure = createAction(
  getFailureType(lessonsActionTypes.requestGroups),
  props<{ error: HttpErrorResponse }>()
);

export const requestGroupInfo = createAction(
  lessonsActionTypes.requestGroupInfo,
  props<{ id: string }>()
);

export const requestGroupInfoSuccess = createAction(
  getSuccessType(lessonsActionTypes.requestGroupInfo),
  props<{ groupInfo: GroupInfo }>()
);

export const requestGroupInfoFailure = createAction(
  getFailureType(lessonsActionTypes.requestGroupInfo),
  props<{ error: HttpErrorResponse }>()
);

export const addGroup = createAction(
  lessonsActionTypes.addGroup,
  props<{ name: string }>()
);

export const addGroupSuccess = createAction(
  getSuccessType(lessonsActionTypes.addGroup),
  props<{ group: Group }>()
);

export const addGroupFailure = createAction(
  getFailureType(lessonsActionTypes.addGroup),
  props<{ error: HttpErrorResponse }>()
);

export const addStudentToGroup = createAction(
  lessonsActionTypes.addStudentToGroup,
  props<{ groupId: string; student: Student }>()
);

export const addStudentToGroupSuccess = createAction(
  getSuccessType(lessonsActionTypes.addStudentToGroup),
  props<{ student: Student }>()
);

export const addStudentToGroupFailure = createAction(
  getFailureType(lessonsActionTypes.addStudentToGroup),
  props<{ error: HttpErrorResponse }>()
);

export const addLessonToGroup = createAction(
  lessonsActionTypes.addLessonToGroup,
  props<{ groupId: string; lesson: Lesson }>()
);

export const addLessonToGroupSuccess = createAction(
  getSuccessType(lessonsActionTypes.addLessonToGroup),
  props<{ lesson: Lesson }>()
);

export const addLessonToGroupFailure = createAction(
  getFailureType(lessonsActionTypes.addLessonToGroup),
  props<{ error: HttpErrorResponse }>()
);
