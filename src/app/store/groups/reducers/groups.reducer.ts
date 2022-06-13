import { ActionReducerMap } from '@ngrx/store';
import { GroupsState } from '../models';
import { groupsListReducer } from './groups-list.reducer';
import { groupInfoReducer } from './group-info.reducer';

export const groupsReducers: ActionReducerMap<GroupsState> = {
  groupsList: groupsListReducer,
  groupInfo: groupInfoReducer
};
