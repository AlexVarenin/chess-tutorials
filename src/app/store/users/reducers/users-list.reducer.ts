import { Action, createReducer, on } from '@ngrx/store';
import { User} from '../models';
import { removeStudentSuccess, requestStudentsSuccess } from '../actions';

const reducer = createReducer<User[] | undefined>(
  undefined,
  on(requestStudentsSuccess, (state, { students }) => students),
  on(removeStudentSuccess, (state, { id }) => state?.filter(student => student.id !== id))
);

export function usersListReducer(state: User[] | undefined, action: Action) {
  return reducer(state, action);
}
