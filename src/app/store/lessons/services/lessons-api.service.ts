import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Lesson } from '../models';
import { createRandomString } from '../../../services/helper.helper';

@Injectable({
  providedIn: 'root'
})
export class LessonsApiService {

  constructor(private httpClient: HttpClient) {}

  addLesson(newLesson: Omit<Lesson, 'id'>): Observable<Lesson> {
    // return this.httpClient.post<Lesson>('lessons', newLesson)
    return of({ id: createRandomString(10), ...newLesson });
  }

  removeLesson(id: string): Observable<unknown> {
    return of({});
  }
}
