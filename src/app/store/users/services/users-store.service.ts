import { Injectable } from '@angular/core';
import { select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StudentInfo, User, UsersState } from '../models';
import {logout, removeStudent, requestStudents, requestUserMe} from '../actions';
import { selectStudents, selectUserMe } from '../selectors';

@Injectable({
  providedIn: 'root'
})

export class UsersStoreService {

  public get userMe$(): Observable<User> {
    return this.store.pipe(select(selectUserMe), filter(Boolean)) as Observable<User>;
  }

  public get students$(): Observable<StudentInfo[]> {
    return this.store.pipe(select(selectStudents), filter(Boolean)) as Observable<StudentInfo[]>;
  }

  constructor(private store: Store<UsersState>) {}

  public requestUserMe(): void {
    this.store.dispatch(requestUserMe());
  }

  public requestStudents(): void {
    this.store.dispatch(requestStudents());
  }

  public logout(): void {
    this.store.dispatch(logout());
  }

  public removeStudent(id: string): void {
    this.store.dispatch(removeStudent({ id }));
  }

}
