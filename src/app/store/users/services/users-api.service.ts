import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private httpClient: HttpClient) {}

  public requestUserMe(): Observable<User> {
    return this.httpClient.get<User>('users/me');
  }

  public getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>('users/students');
  }

}
