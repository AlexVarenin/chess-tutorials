import { Action, createReducer, on } from '@ngrx/store';
import { LessonInfo } from '../models';
import { requestLessonInfo, requestLessonInfoSuccess } from '../actions';

const reducer = createReducer<LessonInfo | undefined>(
  undefined,
  on(requestLessonInfo, () => undefined),
  on(requestLessonInfoSuccess, (state, { lessonInfo }) => lessonInfo),
);

export function lessonInfoReducer(state: LessonInfo | undefined, action: Action) {
  return reducer(state, action);
}
