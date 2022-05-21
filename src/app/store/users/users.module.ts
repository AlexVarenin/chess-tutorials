import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStateName } from './models';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './effects';
import { usersReducers } from './reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(UsersStateName, usersReducers),
    EffectsModule.forFeature([ UsersEffects ])
  ]
})
export class UsersModule { }
