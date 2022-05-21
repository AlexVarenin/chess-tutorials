import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsStateName } from './models';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GroupsEffects } from './effects';
import { groupsReducers } from './reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(GroupsStateName, groupsReducers),
    EffectsModule.forFeature([ GroupsEffects ])
  ]
})
export class GroupsModule { }
