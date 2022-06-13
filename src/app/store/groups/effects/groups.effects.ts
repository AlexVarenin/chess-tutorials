import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import * as ActionList from '../actions';
import { GroupsApiService } from '../services/groups-api.service';
import { Group, GroupInfo } from '../models';

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

  public requestStudentGroups$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.requestStudentGroups),
      exhaustMap( () =>
        this.groupsApiService.getStudentGroups()
          .pipe(
            map((groups: Group[]) => ActionList.requestStudentGroupsSuccess({ groups })),
            catchError((error: HttpErrorResponse) => of(ActionList.requestStudentGroupsFailure({ error })))
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
      exhaustMap( ({ group }) =>
        this.groupsApiService.addGroup({ name: group.name, lessons: group.lessons })
          .pipe(
            map(({ id }) => ActionList.addGroupSuccess({ group: { ...group, id } as Group})),
            catchError((error: HttpErrorResponse) => of(ActionList.addGroupFailure({ error })))
          )
      )
    )
  );

  public updateGroup$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.updateGroup),
      exhaustMap( ({ id, group }) =>
        this.groupsApiService.updateGroup(id, group)
          .pipe(
            map(() => ActionList.updateGroupSuccess({ group })),
            catchError((error: HttpErrorResponse) => of(ActionList.updateGroupFailure({ error })))
          )
      )
    )
  );

  public removeGroup$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.removeGroup),
      exhaustMap(({ id }) =>
        this.groupsApiService.removeGroup(id)
          .pipe(
            map(() => ActionList.removeGroupSuccess({ id })),
            catchError((error: HttpErrorResponse) => of(ActionList.removeGroupFailure({ error })))
          )
      )
    )
  );

  public addStudentToGroup$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.addStudentToGroup),
      exhaustMap( ({ groupId, student }) =>
        this.groupsApiService.addStudentToGroup(groupId, student.id)
          .pipe(
            map(() => ActionList.addStudentToGroupSuccess({ student })),
            catchError((error: HttpErrorResponse) => of(ActionList.addStudentToGroupFailure({ error })))
          )
      )
    )
  );

  public addLessonToGroup$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.addLessonToGroup),
      exhaustMap( ({ groupId, lesson }) =>
        this.groupsApiService.addLessonToGroup(groupId, lesson.id)
          .pipe(
            map(() => ActionList.addLessonToGroupSuccess({ lesson })),
            catchError((error: HttpErrorResponse) => of(ActionList.addLessonToGroupFailure({ error })))
          )
      )
    )
  );

  public removeLessonFromGroup$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.removeLessonFromGroup),
      exhaustMap( ({ groupId, lesson }) =>
        this.groupsApiService.removeLessonFromGroup(groupId, lesson.id)
          .pipe(
            map(() => ActionList.removeLessonFromGroupSuccess({ lesson })),
            catchError((error: HttpErrorResponse) => of(ActionList.removeLessonFromGroupFailure({ error })))
          )
      )
    )
  );

  public removeStudentFromGroup$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.removeStudentFromGroup),
      exhaustMap( ({ groupId, student }) =>
        this.groupsApiService.removeStudentFromGroup(groupId, student.id)
          .pipe(
            map(() => ActionList.removeStudentFromGroupSuccess({ student })),
            catchError((error: HttpErrorResponse) => of(ActionList.removeStudentFromGroupFailure({ error })))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private groupsApiService: GroupsApiService
  ) {}
}
