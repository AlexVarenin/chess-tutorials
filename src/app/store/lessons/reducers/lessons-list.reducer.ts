import { Action, createReducer, on } from '@ngrx/store';
import { Lesson } from '../models';
import { removeLessonSuccess, requestLessonsSuccess, requestStudentLessonsSuccess } from '../actions';

const reducer = createReducer<Lesson[] | undefined>(
  undefined,
  on(requestLessonsSuccess, (state, { lessons }) => lessons),
  on(requestStudentLessonsSuccess, (state, { lessons }) => lessons),
  on(removeLessonSuccess, (state, { id }) => state?.filter(lesson => lesson.id !== id))
);

export function lessonsListReducer(state: Lesson[] | undefined, action: Action) {
  return reducer(state, action);
}
