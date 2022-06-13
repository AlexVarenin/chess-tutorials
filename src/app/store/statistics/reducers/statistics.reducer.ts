import { ActionReducerMap } from '@ngrx/store';
import { statisticsListReducer } from './statistics-list.reducer';
import { StatisticsState } from '../models/statistics-state.models';

export const statisticsReducers: ActionReducerMap<StatisticsState> = {
  statistics: statisticsListReducer
};
