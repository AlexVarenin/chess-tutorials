import { Action, createReducer, on } from '@ngrx/store';
import { GroupInfo } from '../models';
import {addLessonToGroupSuccess, addStudentToGroupSuccess, requestGroupInfoSuccess} from '../actions';

const reducer = createReducer<GroupInfo | undefined>(
  undefined,
  on(requestGroupInfoSuccess, (state, { groupInfo }) => groupInfo),
  on(addStudentToGroupSuccess, (state, { student }) => state
    ? { ...state, students: [student, ...state.students]}
    : state),
  on(addLessonToGroupSuccess, (state, { lesson }) => state
    ? { ...state, lessons: [lesson, ...state.lessons]}
    : state),
);

export function groupInfoReducer(state: GroupInfo | undefined, action: Action) {
  return reducer(state, action);
}
