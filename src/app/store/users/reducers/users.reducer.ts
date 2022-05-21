import { ActionReducerMap } from '@ngrx/store';
import { UsersState} from '../models';
import { usersListReducer } from './users-list.reducer';

export const usersReducers: ActionReducerMap<UsersState> = {
  usersList: usersListReducer
};
