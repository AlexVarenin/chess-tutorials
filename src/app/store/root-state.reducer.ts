import { RootState } from './root-state.interface';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from '../../environments/environment';
import { usersActionTypes } from './users/actions';

export function logger(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return storeLogger({ collapsed: true })(reducer);
}

export function clearOnLogout(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return function(state, action) {
    if(action.type === usersActionTypes.logout) {
      return reducer(undefined, action);
    }
    return reducer(state, action);
  }
}

export const reducers: ActionReducerMap<RootState> = {};

export const metaReducers: Array<MetaReducer<RootState>> = environment.production ? [clearOnLogout] : [logger, clearOnLogout];
