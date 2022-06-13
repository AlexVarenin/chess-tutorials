import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { StatisticsStoreService } from '../store/statistics/services/statistics-store.service';
import { UserNamePipe } from '../pipes/user-name/piece-name.pipe';
import { GroupsStoreService } from '../store/groups/services/groups-store.service';
import { LessonStatistics } from '../store/statistics/models/statistics-state.models';
import { GroupInfo } from '../store/groups/models';
import { User } from '../store/users/models';
import { UsersStoreService } from '../store/users/services/users-store.service';

export interface StatisticsRecord {
  student: string;
  lesson: string;
  progress: number;
  failures: number;
  createdAt: string;
}

@Injectable()
export class StatisticsService {
  constructor(
    private statisticsStoreService: StatisticsStoreService,
    private groupsStoreService: GroupsStoreService,
    private usersStoreService: UsersStoreService,
    private userNamePipe: UserNamePipe
  ) {
  }

  public prepareStatistics$(): Observable<StatisticsRecord[]> {
    return this.usersStoreService.userMe$.pipe(
      filter(({ role }) => role === 'tutor'),
      tap(() => this.statisticsStoreService.requestStatistics()),
      switchMap(() => combineLatest(
      this.statisticsStoreService.statistics$,
      this.groupsStoreService.group$
    ).pipe(
      map(([statistics, group]: [LessonStatistics[], GroupInfo]) => statistics.reduce((res, item) => {
        const { studentId, lessonId, progress, failures, createdAt } = item;
        const student = this.normaliseUserName(group, studentId);
        const lesson = this.normaliseLessonName(group, lessonId);
        if (!!student && !!lesson) {
          res.push({ student, lesson, progress, failures, createdAt });
        }
        return res;
      }, [] as StatisticsRecord[]))
    )));
  }

  private normaliseUserName(group: GroupInfo, id: string) {
    return this.userNamePipe.transform(group.students.find(student => student.id === id) as User);
  }

  private normaliseLessonName(group: GroupInfo, id: string) {
    return group.lessons.find(student => student.id === id)?.title;
  }
}


