import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import {Student, User, UsersState, UsersStateName} from '../models';

export const selectUsersState = createFeatureSelector<UsersState>(UsersStateName);

export const selectUsers: MemoizedSelector<UsersState, User[] | undefined> = createSelector(
  selectUsersState,
  (usersState: UsersState): User[] | undefined => usersState?.usersList
);

export const selectStudents: MemoizedSelector<UsersState, Student[] | undefined> = createSelector(
  selectUsers,
  (users: User[] | undefined): Student[] | undefined => users?.filter((user: User) => (user as Student).role === 'student') as Student[]
);
