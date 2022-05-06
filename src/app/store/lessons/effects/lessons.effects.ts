import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import * as ActionList from '../actions';
import { LessonsApiService } from '../services/lessons-api.service';
import { Lesson } from "../models";

@Injectable()
export class LessonsEffects {

  public requestLessons$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.requestLessons),
      exhaustMap( () =>
        this.lessonsApiService.getLessons()
          .pipe(
            map((lessons: Lesson[]) => ActionList.requestLessonsSuccess({ lessons })),
            catchError((error: HttpErrorResponse) => of(ActionList.requestLessonsFailure({ error })))
          )
      )
    )
  );

  public addLesson$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.addLesson),
      exhaustMap( ({ lesson }) =>
        this.lessonsApiService.addLesson(lesson)
          .pipe(
            map((lesson: Lesson) => ActionList.addLessonSuccess({ lesson })),
            catchError((error: HttpErrorResponse) => of(ActionList.addLessonFailure({ error })))
          )
      )
    )
  );

  public removeLesson$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.removeLesson),
      exhaustMap( ({ id }) =>
        this.lessonsApiService.removeLesson(id)
          .pipe(
            map(() => ActionList.removeLessonSuccess({ id })),
            catchError((error: HttpErrorResponse) => of(ActionList.removeLessonFailure({ error })))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private lessonsApiService: LessonsApiService
  ) {};
}
