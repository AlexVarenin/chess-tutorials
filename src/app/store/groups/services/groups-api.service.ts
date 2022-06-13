import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Group, GroupInfo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GroupsApiService {

  constructor(private httpClient: HttpClient) {}

  public getGroups(): Observable<Group[]> {
    return this.httpClient.get<Group[]>('groups/my');
  }

  public getStudentGroups(): Observable<Group[]> {
    return this.httpClient.get<Group[]>('groups/student');
  }

  public getGroupInfo(id: string): Observable<GroupInfo> {
    return this.httpClient.get<GroupInfo>(`groups/${id}`);
  }

  public addGroup(group: Partial<Group>): Observable<{ id: string }> {
    return this.httpClient.post<{ id: string }>('groups', group);
  }

  public updateGroup(id: string, group: Partial<Group>): Observable<Group> {
    return this.httpClient.patch<Group>(`groups/${id}`, group);
  }

  public removeGroup(id: string): Observable<null> {
    return this.httpClient.delete<null>(`groups/${id}`);
  }

  public addStudentToGroup(groupId: string, studentId: string): Observable<{id: string}> {
    return this.httpClient.post<{id: string}>(`groups/${groupId}/student`, { studentId });
  }

  public removeStudentFromGroup(groupId: string, studentId: string): Observable<null> {
    return this.httpClient.delete<null>(`groups/${groupId}/student/${studentId}`);
  }

  public addLessonToGroup(id: string, lessonId: string): Observable<{id: string}> {
    return this.httpClient.post<{id: string}>(`groups/${id}/lesson`, { lessonId });
  }

  public removeLessonFromGroup(id: string, lessonId: string): Observable<null> {
    return this.httpClient.delete<null>(`groups/${id}/lesson/${lessonId}`);
  }

}
