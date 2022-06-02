import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Lesson, LessonInfo, LessonsState, Move, MoveStatus } from '../models';
import {
  addLesson,
  checkStudentMove,
  checkStudentMoveSuccess,
  removeLesson,
  requestLessonInfo,
  requestLessons,
  requestStudentLessons,
  updateLesson
} from '../actions';
import { filter } from 'rxjs/operators';
import { selectLessonInfo, selectLessons } from '../selectors';
import { ActionsListenerService } from '../../actions-listener.service';

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

  constructor(private store: Store<LessonsState>, private actionsListenerService: ActionsListenerService) {}

  public requestLessons(): void {
    this.store.dispatch(requestLessons());
  }

  public requestStudentLessons(): void {
    this.store.dispatch(requestStudentLessons());
  }

  public requestLessonInfo(id: string): void {
    this.store.dispatch(requestLessonInfo({ id }));
  }

  public addLesson(lesson: Omit<LessonInfo, 'id'>): void {
    this.store.dispatch(addLesson({ lesson }))
  }

  public removeLesson(id: string): void {
    this.store.dispatch(removeLesson({ id }));
  }

  public updateLesson(id: string, lesson: Omit<LessonInfo, 'id'>): void {
    this.store.dispatch(updateLesson({ id, lesson }))
  }

  public checkStudentMove(id: string, moveIndex: number, move: Move): void {
    this.store.dispatch(checkStudentMove({ id, moveIndex, move }));
  }

  public getCheckMoveSuccessAction(): Observable<{ status: MoveStatus; move: Move; nextMove: Move; }> {
    return this.actionsListenerService.getAction$<{ status: MoveStatus; move: Move; nextMove: Move; }>(checkStudentMoveSuccess);
  }

}
