import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Group, GroupInfo } from '../models';
import { Student } from '../../users/models';
import { Lesson } from '../../lessons/models';

@Injectable({
  providedIn: 'root'
})
export class GroupsApiService {

  constructor(private httpClient: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return of([
      {
        id: 'hy1z6nn441',
        name: 'Клас 3 Клас 3 Клас 3 Клас 3',
        students: [
          {
            id: 'hy1z6nn441',
            firstName: 'Taras',
            lastName: 'Panasenko',
            email: 'taras@gmail.com'
          },
          {
            id: 'hy1z6nn441',
            firstName: 'Taras',
            lastName: 'Panasenko',
            email: 'taras@gmail.com'
          }
      /*    {
            id: 'hy1z6nn441',
            firstName: 'Taras',
            lastName: 'Panasenko',
            email: 'taras@gmail.com'
          },
          {
            id: 'hy1z6nn441',
            firstName: 'Taras',
            lastName: 'Panasenko',
            email: 'taras@gmail.com'
          },
          {
            id: 'hy1z6nn441',
            firstName: 'Taras',
            lastName: 'Panasenko',
            email: 'taras@gmail.com'
          },
          {
            id: 'hy1z6nn441',
            firstName: 'Taras',
            lastName: 'Panasenko',
            email: 'taras@gmail.com'
          },
          {
            id: 'hy1z6nn441',
            firstName: 'Taras',
            lastName: 'Panasenko',
            email: 'taras@gmail.com'
          },
          {
            id: 'hy1z6nn441',
            firstName: 'Taras',
            lastName: 'Panasenko',
            email: 'taras@gmail.com'
          },
          {
            id: 'hy1z6nn441',
            firstName: 'Taras',
            lastName: 'Panasenko',
            email: 'taras@gmail.com'
          },
          {
            id: 'hy1z6nn441',
            firstName: 'Taras',
            lastName: 'Panasenko',
            email: 'taras@gmail.com'
          }*/
        ]
      }
    ]);
  }

  getGroupInfo(id: string): Observable<GroupInfo> {
    return of({
      id: 'hy1z6nn441',
      name: 'Клас 3 Клас 3 Клас 3 Клас 3',
      lessons: [
        {
          description: '<h1><strong>Хід білих</strong></h1><ol><li><p>Білі ходять першими</p></li><li><p>Пішак а2а3</p></li></ol>',
          id: 'hy1z6nn441',
          initialState: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
          orientation: 'white',
          title: 'Тестовий урок № 1',
        },
        {
          description: '<h1><strong>Хід білих</strong></h1><ol><li><p>Білі ходять першими</p></li><li><p>Пішак а2а3</p></li></ol>',
          id: 'hy1z6nn441',
          initialState: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
          orientation: 'black',
          title: 'Тестовий урок № 1',
        }
      ],
      students: [
        {
          id: 'hy1z6nn441',
          firstName: 'Taras',
          lastName: 'Panasenko',
          email: 'taras@gmail.com'
        },
        {
          id: 'hy1z6nn441',
          firstName: 'Taras',
          lastName: 'Panasenko',
          email: 'taras@gmail.com'
        },
        {
          id: 'hy1z6nn441',
          firstName: 'Taras',
          lastName: 'Panasenko',
          email: 'taras@gmail.com'
        },
        {
          id: 'hy1z6nn441',
          firstName: 'Taras',
          lastName: 'Panasenko',
          email: 'taras@gmail.com'
        },
        {
          id: 'hy1z6nn441',
          firstName: 'Taras',
          lastName: 'Panasenko',
          email: 'taras@gmail.com'
        },
        {
          id: 'hy1z6nn441',
          firstName: 'Taras',
          lastName: 'Panasenko',
          email: 'taras@gmail.com'
        },
        {
          id: 'hy1z6nn441',
          firstName: 'Taras',
          lastName: 'Panasenko',
          email: 'taras@gmail.com'
        },
        {
          id: 'hy1z6nn441',
          firstName: 'Taras',
          lastName: 'Panasenko',
          email: 'taras@gmail.com'
        },
        {
          id: 'hy1z6nn441',
          firstName: 'Taras',
          lastName: 'Panasenko',
          email: 'taras@gmail.com'
        },
        {
          id: 'hy1z6nn441',
          firstName: 'Taras',
          lastName: 'Panasenko',
          email: 'taras@gmail.com'
        }
      ]
    });
  }

  public addGroup(name: string): Observable<Group> {
    return of({
      id: 'hy1z6nn441',
      name,
      students: []
    });
  }

  public addStudentToGroup(groupId: string, student: Student): Observable<Student> {
    return of({ ...student });
  }

  public addLessonToGroup(groupId: string, lesson: Lesson): Observable<Lesson> {
    return of({ ...lesson });
  }

}
