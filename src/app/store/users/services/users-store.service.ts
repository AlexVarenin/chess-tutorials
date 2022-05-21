import { Injectable } from '@angular/core';
import { select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { Student, UsersState } from "../models";
import { requestStudents } from '../actions';
import { filter } from 'rxjs/operators';
import { selectStudents } from '../selectors';

@Injectable({
  providedIn: 'root'
})

export class UsersStoreService {

  public get students$(): Observable<Student[]> {
    return this.store.pipe(select(selectStudents), filter(Boolean)) as Observable<Student[]>;
  }

  constructor(private store: Store<UsersState>) {}

  public requestStudents(): void {
    this.store.dispatch(requestStudents());
  }

}
