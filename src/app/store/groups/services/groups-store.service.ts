import { Injectable } from '@angular/core';
import { select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { Group, GroupInfo, GroupsState } from '../models';
import { filter } from 'rxjs/operators';
import { selectGroupInfo, selectGroups } from '../selectors';
import { addGroup, addLessonToGroup, addStudentToGroup, requestGroupInfo, requestGroups } from '../actions';
import { Student } from '../../users/models';
import { Lesson } from '../../lessons/models';

@Injectable({
  providedIn: 'root'
})

export class GroupsStoreService {

  public get groups$(): Observable<Group[]> {
    return this.store.pipe(select(selectGroups), filter(Boolean)) as Observable<Group[]>;
  }

  public get group$(): Observable<GroupInfo> {
    return this.store.pipe(select(selectGroupInfo), filter(Boolean)) as Observable<GroupInfo>;
  }

  constructor(private store: Store<GroupsState>) {}

  public requestGroups(): void {
    this.store.dispatch(requestGroups());
  }

  public requestGroupInfo(id: string): void {
    this.store.dispatch(requestGroupInfo({ id }));
  }

  public addGroup(name: string): void {
    this.store.dispatch(addGroup({ name }));
  }

  public addStudentToGroup(groupId: string, student: Student): void {
    this.store.dispatch(addStudentToGroup({ groupId, student }));
  }

  public addLessonToGroup(groupId: string, lesson: Lesson): void {
    this.store.dispatch(addLessonToGroup({ groupId, lesson }));
  }

}
