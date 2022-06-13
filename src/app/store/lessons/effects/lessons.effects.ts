import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import * as ActionList from '../actions';
import { LessonsApiService } from '../services/lessons-api.service';
import { Lesson, LessonInfo } from '../models';
import { Router } from "@angular/router";

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

  public requestStudentLessons$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.requestStudentLessons),
      exhaustMap( () =>
        this.lessonsApiService.getStudentLessons()
          .pipe(
            map((lessons: Lesson[]) => ActionList.requestStudentLessonsSuccess({ lessons })),
            catchError((error: HttpErrorResponse) => of(ActionList.requestStudentLessonsFailure({ error })))
          )
      )
    )
  );

  public requestLessonInfo$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.requestLessonInfo),
      exhaustMap( ({ id }) =>
        this.lessonsApiService.getLessonInfo(id)
          .pipe(
            map((lessonInfo: LessonInfo) => ActionList.requestLessonInfoSuccess({ lessonInfo })),
            catchError((error: HttpErrorResponse) => of(ActionList.requestLessonInfoFailure({ error })))
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
            map(({ id }) => ActionList.addLessonSuccess({ lesson: { ...lesson, id } as LessonInfo })),
            catchError((error: HttpErrorResponse) => of(ActionList.addLessonFailure({ error })))
          )
      )
    )
  );

  public updateLesson$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.updateLesson),
      exhaustMap( ({ id, lesson }) =>
        this.lessonsApiService.updateLesson(id, lesson)
          .pipe(
            map((lesson: LessonInfo) => ActionList.updateLessonSuccess({ id, lesson })),
            catchError((error: HttpErrorResponse) => of(ActionList.updateLessonFailure({ error })))
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

  public checkStudentMove$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.checkStudentMove),
      exhaustMap( ({ id, move, moveIndex }) =>
        this.lessonsApiService.checkStudentMove(id, moveIndex, move)
          .pipe(
            map(({ status, nextMove }) => ActionList.checkStudentMoveSuccess({ status, move, nextMove })),
            catchError((error: HttpErrorResponse) => of(ActionList.checkStudentMoveFailure({ error })))
          )
      )
    )
  );

  public redirectToList$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.updateLessonSuccess, ActionList.addLessonSuccess),
      tap(() => this.router.navigate(['/lessons']))
    ), { dispatch: false }
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private lessonsApiService: LessonsApiService
  ) {}
}
