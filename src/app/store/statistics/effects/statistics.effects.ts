import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import * as ActionList from '../actions';
import { StatisticsApiService } from '../services/statistics-api.service';
import { LessonStatistics } from '../models/statistics-state.models';

@Injectable()
export class StatisticsEffects {

  public requestStatistics$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.requestStatistics),
      exhaustMap(() =>
        this.statisticsApiService.getStatistics()
          .pipe(
            map((statistics: LessonStatistics[]) => ActionList.requestStatisticsSuccess({ statistics })),
            catchError((error: HttpErrorResponse) => of(ActionList.requestStatisticsFailure({ error })))
          )
      )
    )
  );

  public requestCompletedLessons$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.requestCompletedLessons),
      exhaustMap(() =>
        this.statisticsApiService.getCompletedLessons()
          .pipe(
            map((statistics: LessonStatistics[]) => ActionList.requestCompletedLessonsSuccess({ statistics })),
            catchError((error: HttpErrorResponse) => of(ActionList.requestCompletedLessonsFailure({ error })))
          )
      )
    )
  );

  public addNewStatisticsRecord$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActionList.addNewStatisticsRecord),
      exhaustMap(({ lessonId }) =>
        this.statisticsApiService.addNewStatisticsRecord(lessonId)
          .pipe(
            map(({ id }) => ActionList.addNewStatisticsRecordSuccess({ lessonId: id })),
            catchError((error: HttpErrorResponse) => of(ActionList.addNewStatisticsRecordFailure({ error })))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private statisticsApiService: StatisticsApiService
  ) {}
}
