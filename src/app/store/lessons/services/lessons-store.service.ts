import {Injectable} from '@angular/core';
import { select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { Lesson, LessonsState } from "../models";
import { addLesson, removeLesson, requestLessons } from '../actions';
import { filter } from 'rxjs/operators';
import { selectLessonInfo, selectLessons } from '../selectors';

@Injectable({
  providedIn: 'root'
})

export class LessonsStoreService {

  public get lessons$(): Observable<Lesson[]> {
    return this.store.pipe(select(selectLessons), filter(Boolean)) as Observable<Lesson[]>;
  }

  constructor(private store: Store<LessonsState>) {}

  public getLessonInfo$(id: string): Observable<Lesson> {
    return this.store.pipe(select(selectLessonInfo(id)), filter(Boolean)) as Observable<Lesson>;
  }

  public requestLessons(): void {
    this.store.dispatch(requestLessons());
  }

  public addLesson(lesson: Omit<Lesson, 'id'>): void {
    this.store.dispatch(addLesson({ lesson }))
  }

  public removeLesson(id: string): void {
    this.store.dispatch(removeLesson({ id }));
  }

}
