import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Student, StudentInfo, User, UsersState, UsersStateName } from '../models';

export const selectUsersState = createFeatureSelector<UsersState>(UsersStateName);

export const selectUserMe: MemoizedSelector<UsersState, User | undefined> = createSelector(
  selectUsersState,
  (usersState: UsersState): User | undefined => usersState?.userMe
);

export const selectUsers: MemoizedSelector<UsersState, User[] | undefined> = createSelector(
  selectUsersState,
  (usersState: UsersState): User[] | undefined => usersState?.usersList
);

export const selectStudents: MemoizedSelector<UsersState, StudentInfo[] | undefined> = createSelector(
  selectUsers,
  (users: User[] | undefined): StudentInfo[] | undefined => users?.filter((user: User) => (user as Student).role === 'student') as StudentInfo[]
);
