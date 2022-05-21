import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from './root-state.reducer';
import { LessonsModule } from './lessons/lessons.module';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LessonsModule,
    UsersModule,
    GroupsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule { }
