import { Action, createReducer, on } from '@ngrx/store';
import { GroupInfo } from '../models';
import {
  addLessonToGroupSuccess,
  addStudentToGroupSuccess,
  removeLessonFromGroupSuccess,
  removeStudentFromGroupSuccess, requestGroupInfo,
  requestGroupInfoSuccess, updateGroupSuccess
} from '../actions';

const reducer = createReducer<GroupInfo | undefined>(
  undefined,
  on(requestGroupInfo, () => undefined),
  on(requestGroupInfoSuccess, (state, { groupInfo }) => groupInfo),
  on(addStudentToGroupSuccess, (state, { student }) => state
    ? { ...state, students: [student, ...state.students]}
    : state),
  on(addLessonToGroupSuccess, (state, { lesson }) => state
    ? { ...state, lessons: [lesson, ...state.lessons]}
    : state),
  on(updateGroupSuccess, (state, { group }) => state
    ? { ...state, ...group } as GroupInfo
    : state),
  on(removeLessonFromGroupSuccess, (state, { lesson }) => {
    if (state) {
      const lessons = state.lessons.filter(item => item.id !== lesson.id);
      return { ...state, lessons };
    }
    return state;
  }),
  on(removeStudentFromGroupSuccess, (state, { student }) => {
    if (state) {
      const students = state.students.filter(item => item.id !== student.id);
      return { ...state, students };
    }
    return state;
  })
);

export function groupInfoReducer(state: GroupInfo | undefined, action: Action) {
  return reducer(state, action);
}
