import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import * as ActionList from '../actions';
import { UsersApiService } from '../services/users-api.service';
import { Student } from '../models';

@Injectable()
export class UsersEffects {

  public requestStudents$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.requestStudents),
      exhaustMap( () =>
        this.usersApiService.getStudents()
          .pipe(
            map((students: Student[]) => ActionList.requestStudentsSuccess({ students })),
            catchError((error: HttpErrorResponse) => of(ActionList.requestStudentsFailure({ error })))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersApiService: UsersApiService
  ) {};
}
