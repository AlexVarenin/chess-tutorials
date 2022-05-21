import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Lesson, LessonInfo} from '../models';
import { createRandomString } from '../../../services/helper.helper';

@Injectable({
  providedIn: 'root'
})
export class LessonsApiService {

  constructor(private httpClient: HttpClient) {}

  getLessons(): Observable<Lesson[]> {
    return of([{
      description: '<h1><strong>Хід білих</strong></h1><ol><li><p>Білі ходять першими</p></li><li><p>Пішак а2а3</p></li></ol>',
      id: 'hy1z6nn441',
      initialState: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
      orientation: 'white',
      title: 'Тестовий урок № 1',
    }])
  }

  getLessonInfo(id: string): Observable<LessonInfo> {
    return of({
      description: '<h1><strong>Хід білих</strong></h1><ol><li><p>Білі ходять першими</p></li><li><p>Пішак а2а3</p></li></ol>',
      id: 'hy1z6nn441',
      initialState: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
      moves: [{from: 'a2', to: 'a3', piece: 'wP', notation: 'a2-a3', fen: 'rnbqkbnr/pppppppp/8/8/8/P7/1PPPPPPP/RNBQKBNR'}],
      orientation: 'white',
      notationType: 'cyr',
      title: 'Тестовий урок № 1',
      disableDrag: false
    })
  }

  addLesson(newLesson: Omit<Lesson, 'id'>): Observable<Lesson> {
    // return this.httpClient.post<Lesson>('lessons', newLesson)
    return of({ id: createRandomString(10), ...newLesson });
  }

  removeLesson(id: string): Observable<unknown> {
    return of({});
  }
}
