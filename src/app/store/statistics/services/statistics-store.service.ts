import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { addNewStatisticsRecord, requestCompletedLessons, requestStatistics } from '../actions';
import { LessonStatistics, StatisticsState } from '../models/statistics-state.models';
import {selectLessonIsCompleted, selectStatistics} from '../selectors';

@Injectable({
  providedIn: 'root'
})

export class StatisticsStoreService {

  public get statistics$(): Observable<LessonStatistics[]> {
    return this.store.pipe(select(selectStatistics), filter(Boolean)) as Observable<LessonStatistics[]>;
  }

  public get completedLessons$(): Observable<LessonStatistics[]> {
    return this.store.pipe(select(selectStatistics), filter(Boolean)) as Observable<LessonStatistics[]>;
  }

  constructor(private store: Store<StatisticsState>) {}

  public requestStatistics(): void {
    this.store.dispatch(requestStatistics());
  }

  public addNewStatisticsRecord(lessonId: string): void {
    this.store.dispatch(addNewStatisticsRecord({ lessonId }));
  }

  public requestCompletedLessons(): void {
    this.store.dispatch(requestCompletedLessons());
  }

  public selectLessonIsCompleted(lessonId: string): Observable<boolean> {
    return this.store.pipe(select(selectLessonIsCompleted(lessonId)));
  }
}
