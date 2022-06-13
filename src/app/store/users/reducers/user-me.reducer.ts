import { Action, createReducer, on } from '@ngrx/store';
import { User} from '../models';
import { requestUserMeSuccess } from '../actions';

const reducer = createReducer<User | undefined>(
  undefined,
  on(requestUserMeSuccess, (state, { userMe }) => userMe)
);

export function userMeReducer(state: User | undefined, action: Action) {
  return reducer(state, action);
}
