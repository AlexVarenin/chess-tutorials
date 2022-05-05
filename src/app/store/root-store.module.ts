import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from './root-state.reducer';
import { LessonsModule } from './lessons/lessons.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LessonsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule { }
