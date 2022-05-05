import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsStateName } from './models';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LessonsEffects } from './effects';
import { lessonsReducers } from './reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(LessonsStateName, lessonsReducers),
    EffectsModule.forFeature([ LessonsEffects ])
  ]
})
export class LessonsModule { }
