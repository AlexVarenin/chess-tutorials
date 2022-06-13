import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import * as ActionList from '../actions';
import { UsersApiService } from '../services/users-api.service';
import { Student, User } from '../models';

@Injectable()
export class UsersEffects {

  public requestUserMe$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.requestUserMe),
      exhaustMap(() =>
        this.usersApiService.requestUserMe()
          .pipe(
            map((userMe: User) => ActionList.requestUserMeSuccess({ userMe })),
            catchError((error: HttpErrorResponse) => of(ActionList.requestUserMeFailure({ error })))
          )
      )
    )
  );

  public requestStudents$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.requestStudents),
      exhaustMap(() =>
        this.usersApiService.getStudents()
          .pipe(
            map((students: Student[]) => ActionList.requestStudentsSuccess({ students })),
            catchError((error: HttpErrorResponse) => of(ActionList.requestStudentsFailure({ error })))
          )
      )
    )
  );

  public removeStudent$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.removeStudent),
      exhaustMap(({ id }) =>
        this.usersApiService.removeStudent(id)
          .pipe(
            map(() => ActionList.removeStudentSuccess({ id })),
            catchError((error: HttpErrorResponse) => of(ActionList.removeStudentFailure({ error })))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersApiService: UsersApiService
  ) {};
}
