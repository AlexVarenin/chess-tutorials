import { createAction, props } from '@ngrx/store';
import { getFailureType, getSuccessType } from '../../utils/store-actions.helper';
import { HttpErrorResponse } from '@angular/common/http';
import { Group, GroupInfo } from '../models';
import {Student} from "../../users/models";
import {Lesson} from "../../lessons/models";

export const groupsActionTypes = {
  requestGroups: '[Groups] Request groups',
  requestStudentGroups: '[Groups] Request student groups',
  requestGroupInfo: '[Groups] Request group info',
  addGroup: '[Groups] Add group',
  updateGroup: '[Groups] Update group',
  addStudentToGroup: '[Groups] Add student to group',
  removeStudentFromGroup: '[Groups] Remove student from group',
  addLessonToGroup: '[Groups] Add lesson to group',
  removeLessonFromGroup: '[Groups] Remove lesson from group'
};

export const requestGroups = createAction(
  groupsActionTypes.requestGroups
);

export const requestGroupsSuccess = createAction(
  getSuccessType(groupsActionTypes.requestGroups),
  props<{ groups: Group[] }>()
);

export const requestGroupsFailure = createAction(
  getFailureType(groupsActionTypes.requestGroups),
  props<{ error: HttpErrorResponse }>()
);

export const requestStudentGroups = createAction(
  groupsActionTypes.requestStudentGroups
);

export const requestStudentGroupsSuccess = createAction(
  getSuccessType(groupsActionTypes.requestStudentGroups),
  props<{ groups: Group[] }>()
);

export const requestStudentGroupsFailure = createAction(
  getFailureType(groupsActionTypes.requestStudentGroups),
  props<{ error: HttpErrorResponse }>()
);

export const requestGroupInfo = createAction(
  groupsActionTypes.requestGroupInfo,
  props<{ id: string }>()
);

export const requestGroupInfoSuccess = createAction(
  getSuccessType(groupsActionTypes.requestGroupInfo),
  props<{ groupInfo: GroupInfo }>()
);

export const requestGroupInfoFailure = createAction(
  getFailureType(groupsActionTypes.requestGroupInfo),
  props<{ error: HttpErrorResponse }>()
);

export const addGroup = createAction(
  groupsActionTypes.addGroup,
  props<{ group: Partial<Group> }>()
);

export const addGroupSuccess = createAction(
  getSuccessType(groupsActionTypes.addGroup),
  props<{ group: Group }>()
);

export const addGroupFailure = createAction(
  getFailureType(groupsActionTypes.addGroup),
  props<{ error: HttpErrorResponse }>()
);

export const updateGroup = createAction(
  groupsActionTypes.updateGroup,
  props<{ id: string, group: Partial<Group> }>()
);

export const updateGroupSuccess = createAction(
  getSuccessType(groupsActionTypes.updateGroup),
  props<{ group: Partial<Group> }>()
);

export const updateGroupFailure = createAction(
  getFailureType(groupsActionTypes.updateGroup),
  props<{ error: HttpErrorResponse }>()
);

export const addStudentToGroup = createAction(
  groupsActionTypes.addStudentToGroup,
  props<{ groupId: string; student: Student }>()
);

export const addStudentToGroupSuccess = createAction(
  getSuccessType(groupsActionTypes.addStudentToGroup),
  props<{ student: Student }>()
);

export const addStudentToGroupFailure = createAction(
  getFailureType(groupsActionTypes.addStudentToGroup),
  props<{ error: HttpErrorResponse }>()
);

export const addLessonToGroup = createAction(
  groupsActionTypes.addLessonToGroup,
  props<{ groupId: string; lesson: Lesson }>()
);

export const addLessonToGroupSuccess = createAction(
  getSuccessType(groupsActionTypes.addLessonToGroup),
  props<{ lesson: Lesson }>()
);

export const addLessonToGroupFailure = createAction(
  getFailureType(groupsActionTypes.addLessonToGroup),
  props<{ error: HttpErrorResponse }>()
);

export const removeLessonFromGroup = createAction(
  groupsActionTypes.removeLessonFromGroup,
  props<{ groupId: string; lesson: Lesson }>()
);

export const removeLessonFromGroupSuccess = createAction(
  getSuccessType(groupsActionTypes.removeLessonFromGroup),
  props<{ lesson: Lesson }>()
);

export const removeLessonFromGroupFailure = createAction(
  getFailureType(groupsActionTypes.removeLessonFromGroup),
  props<{ error: HttpErrorResponse }>()
);

export const removeStudentFromGroup = createAction(
  groupsActionTypes.removeStudentFromGroup,
  props<{ groupId: string; student: Student }>()
);

export const removeStudentFromGroupSuccess = createAction(
  getSuccessType(groupsActionTypes.removeStudentFromGroup),
  props<{ student: Student }>()
);

export const removeStudentFromGroupFailure = createAction(
  getFailureType(groupsActionTypes.removeStudentFromGroup),
  props<{ error: HttpErrorResponse }>()
);
