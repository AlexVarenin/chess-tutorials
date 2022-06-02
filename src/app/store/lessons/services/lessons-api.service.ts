import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Lesson, LessonInfo, Move, MoveStatusResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LessonsApiService {

  constructor(private httpClient: HttpClient) {}

  public getLessons(): Observable<Lesson[]> {
    return this.httpClient.get<Lesson[]>('lessons/my');
  }

  public getStudentLessons(): Observable<Lesson[]> {
    return this.httpClient.get<Lesson[]>('lessons/student');
  }

  public getLessonInfo(id: string): Observable<LessonInfo> {
    return this.httpClient.get<LessonInfo>(`lessons/${id}`);
  }

  public addLesson(newLesson: Omit<LessonInfo, 'id'>): Observable<{ id: string }> {
    return this.httpClient.post<{ id: string }>('lessons', newLesson);
  }

  public removeLesson(id: string): Observable<null> {
    return this.httpClient.delete<null>(`lessons/${id}`);
  }

  public updateLesson(id: string, patch: Omit<LessonInfo, 'id'>): Observable<LessonInfo> {
    return this.httpClient.patch<LessonInfo>(`lessons/${id}`, patch);
  }

  public checkStudentMove(id: string, moveIndex: number, move: Move): Observable<MoveStatusResponse> {
    return this.httpClient.post<MoveStatusResponse>(`lessons/${id}/check-move/${moveIndex}`, move);
  }
}
