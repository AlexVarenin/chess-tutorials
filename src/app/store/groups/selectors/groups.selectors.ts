import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Group, GroupInfo, GroupsState, GroupsStateName } from '../models';

export const selectGroupsState = createFeatureSelector<GroupsState>(GroupsStateName);

export const selectGroups: MemoizedSelector<GroupsState, Group[] | undefined> = createSelector(
  selectGroupsState,
  (groupsState: GroupsState): Group[] | undefined => groupsState?.groupsList
);

export const selectGroupInfo: MemoizedSelector<GroupsState, GroupInfo | undefined> = createSelector(
  selectGroupsState,
  (groupsState: GroupsState): GroupInfo | undefined => groupsState?.groupInfo
);
