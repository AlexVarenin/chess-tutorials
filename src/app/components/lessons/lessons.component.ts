import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsStoreService } from '../../store/lessons/services/lessons-store.service';
import { UsersStoreService } from '../../store/users/services/users-store.service';
import { StatisticsStoreService } from '../../store/statistics/services/statistics-store.service';


@Component({
  selector: 'chess-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit, OnDestroy {

  public lessons$ = this.lessonsStoreService.lessons$;

  private destroy$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private lessonsStoreService: LessonsStoreService,
    private usersStoreService: UsersStoreService,
    private activatedRoute: ActivatedRoute,
    private statisticsStoreService: StatisticsStoreService
  ) { }

  public ngOnInit(): void {
    this.usersStoreService.userMe$.pipe(takeUntil(this.destroy$))
      .subscribe(({ role }) => {
        if (role === 'tutor') {
          this.lessonsStoreService.requestLessons();
        }
        if (role === 'student') {
          this.lessonsStoreService.requestStudentLessons();
          this.statisticsStoreService.requestCompletedLessons();
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public addNew(): void {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }
}
