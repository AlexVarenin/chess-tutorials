import { Action, createReducer, on } from '@ngrx/store';
import { Lesson } from '../models';
import { addLessonSuccess, removeLessonSuccess, requestLessonsSuccess } from '../actions';

const reducer = createReducer<Lesson[] | undefined>(
  undefined,
  on(requestLessonsSuccess, (state, { lessons }) => lessons),
  on(addLessonSuccess, (state, { lesson }) => state ? [ ...state, lesson ] : [lesson]),
  on(removeLessonSuccess, (state, { id }) => state?.filter(lesson => lesson.id !== id) )
);

export function lessonsListReducer(state: Lesson[] | undefined, action: Action) {
  return reducer(state, action);
}
