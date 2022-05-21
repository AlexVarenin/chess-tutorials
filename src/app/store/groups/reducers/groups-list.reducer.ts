import { Action, createReducer, on } from '@ngrx/store';
import { Group } from '../models';
import {addGroupSuccess, requestGroupsSuccess} from '../actions';

const reducer = createReducer<Group[] | undefined>(
  undefined,
  on(addGroupSuccess, (state, { group }) => [ group, ...(state || []) ]),
  on(requestGroupsSuccess, (state, { groups }) => groups)
);

export function groupsListReducer(state: Group[] | undefined, action: Action) {
  return reducer(state, action);
}
