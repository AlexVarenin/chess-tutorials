import {Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import localeUa from '@angular/common/locales/uk';
import { registerLocaleData } from "@angular/common";
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

import { UsersStoreService } from '../../store/users/services/users-store.service';
import { GroupsStoreService } from '../../store/groups/services/groups-store.service';
import { StatisticsRecord, StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'chess-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  providers: [StatisticsService]
})
export class StatisticsComponent {
  displayedColumns = ['student', 'lesson', 'createdAt', 'failures', 'progress'];
  dataSource$ = this.statisticsService.prepareStatistics$().pipe(
    map(data => new MatTableDataSource(data))
  );
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private groupsStoreService: GroupsStoreService,
    private router: Router,
    private usersStoreService: UsersStoreService,
    private statisticsService: StatisticsService,
    public translateService: TranslateService
  ) {
    registerLocaleData(localeUa, 'ua');
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<StatisticsRecord>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();
  }
}
