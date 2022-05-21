import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import * as ActionList from '../actions';
import { GroupsApiService } from '../services/groups-api.service';
import { Group, GroupInfo } from '../models';
import {Student} from "../../users/models";
import {Lesson} from "../../lessons/models";

@Injectable()
export class GroupsEffects {

  public requestGroups$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.requestGroups),
      exhaustMap( () =>
        this.groupsApiService.getGroups()
          .pipe(
            map((groups: Group[]) => ActionList.requestGroupsSuccess({ groups })),
            catchError((error: HttpErrorResponse) => of(ActionList.requestGroupsFailure({ error })))
          )
      )
    )
  );

  public requestGroupInfo$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.requestGroupInfo),
      exhaustMap( ({ id }) =>
        this.groupsApiService.getGroupInfo(id)
          .pipe(
            map((groupInfo: GroupInfo) => ActionList.requestGroupInfoSuccess({ groupInfo })),
            catchError((error: HttpErrorResponse) => of(ActionList.requestGroupInfoFailure({ error })))
          )
      )
    )
  );

  public addGroup$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.addGroup),
      exhaustMap( ({ name }) =>
        this.groupsApiService.addGroup(name)
          .pipe(
            map((group: Group) => ActionList.addGroupSuccess({ group })),
            catchError((error: HttpErrorResponse) => of(ActionList.addGroupFailure({ error })))
          )
      )
    )
  );

  public addStudentToGroup$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.addStudentToGroup),
      exhaustMap( ({ groupId, student }) =>
        this.groupsApiService.addStudentToGroup(groupId, student)
          .pipe(
            map((student: Student) => ActionList.addStudentToGroupSuccess({ student })),
            catchError((error: HttpErrorResponse) => of(ActionList.addStudentToGroupFailure({ error })))
          )
      )
    )
  );

  public addLessonToGroup$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.addLessonToGroup),
      exhaustMap( ({ groupId, lesson }) =>
        this.groupsApiService.addLessonToGroup(groupId, lesson)
          .pipe(
            map((lesson: Lesson) => ActionList.addLessonToGroupSuccess({ lesson })),
            catchError((error: HttpErrorResponse) => of(ActionList.addLessonToGroupFailure({ error })))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private groupsApiService: GroupsApiService
  ) {}
}
