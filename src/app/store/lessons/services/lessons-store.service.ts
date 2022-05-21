import { Injectable } from '@angular/core';
import { select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { Lesson, LessonInfo, LessonsState } from '../models';
import { addLesson, removeLesson, requestLessonInfo, requestLessons } from '../actions';
import { filter } from 'rxjs/operators';
import { selectLessonInfo, selectLessons } from '../selectors';

@Injectable({
  providedIn: 'root'
})

export class LessonsStoreService {

  public get lessons$(): Observable<Lesson[]> {
    return this.store.pipe(select(selectLessons), filter(Boolean)) as Observable<Lesson[]>;
  }

  public get lessonInfo$(): Observable<LessonInfo> {
    return this.store.pipe(select(selectLessonInfo), filter(Boolean)) as Observable<LessonInfo>;
  }

  constructor(private store: Store<LessonsState>) {}

  public requestLessons(): void {
    this.store.dispatch(requestLessons());
  }

  public requestLessonInfo(id: string): void {
    this.store.dispatch(requestLessonInfo({ id }));
  }

  public addLesson(lesson: Omit<Lesson, 'id'>): void {
    this.store.dispatch(addLesson({ lesson }))
  }

  public removeLesson(id: string): void {
    this.store.dispatch(removeLesson({ id }));
  }

}
