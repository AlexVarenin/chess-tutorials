import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StatisticsEffects } from './effects';
import { statisticsReducers } from './reducers';
import { StatisticsStateName } from './models/statistics-state.models';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(StatisticsStateName, statisticsReducers),
    EffectsModule.forFeature([ StatisticsEffects ])
  ]
})
export class StatisticsModule { }
