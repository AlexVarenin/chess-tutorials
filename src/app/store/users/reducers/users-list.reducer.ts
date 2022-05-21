import { Action, createReducer, on } from '@ngrx/store';
import { User} from '../models';
import { requestStudentsSuccess } from '../actions';

const reducer = createReducer<User[] | undefined>(
  undefined,
  on(requestStudentsSuccess, (state, { students }) => students)
);

export function usersListReducer(state: User[] | undefined, action: Action) {
  return reducer(state, action);
}
