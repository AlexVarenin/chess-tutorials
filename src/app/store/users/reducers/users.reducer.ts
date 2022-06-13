import { ActionReducerMap } from '@ngrx/store';
import { UsersState} from '../models';
import { usersListReducer } from './users-list.reducer';
import { userMeReducer } from './user-me.reducer';

export const usersReducers: ActionReducerMap<UsersState> = {
  userMe: userMeReducer,
  usersList: usersListReducer
};
