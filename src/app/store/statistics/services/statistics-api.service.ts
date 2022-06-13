import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LessonStatistics } from "../models/statistics-state.models";

@Injectable({
  providedIn: 'root'
})
export class StatisticsApiService {

  constructor(private httpClient: HttpClient) {}

  public getStatistics(): Observable<LessonStatistics[]> {
    return this.httpClient.get<LessonStatistics[]>('statistics');
  }

  public getCompletedLessons(): Observable<LessonStatistics[]> {
    return this.httpClient.get<LessonStatistics[]>('statistics/completed');
  }

  public addNewStatisticsRecord(lessonId: string): Observable<{ id: string }> {
    return this.httpClient.post<{ id: string }>('statistics', { lessonId });
  }

}
