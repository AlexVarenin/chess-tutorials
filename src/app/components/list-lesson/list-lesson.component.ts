import {Component, Input, OnInit} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, first, mergeMap, shareReplay, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LessonsStoreService } from '../../store/lessons/services/lessons-store.service';
import { Lesson } from '../../store/lessons/models';
import { UsersStoreService } from '../../store/users/services/users-store.service';
import { StatisticsStoreService } from '../../store/statistics/services/statistics-store.service';
import { ChessConfirmationDialogComponent } from '../chess-confirmation-dialog/chess-confirmation-dialog.component';

@Component({
  selector: 'chess-list-lesson',
  templateUrl: './list-lesson.component.html',
  styleUrls: ['./list-lesson.component.scss']
})
export class ListLessonComponent implements OnInit {

  public isCompleted$: Observable<boolean>;
  @Input() public lesson: Lesson;

  private destroy$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private lessonsStoreService: LessonsStoreService,
    private usersStoreService: UsersStoreService,
    private activatedRoute: ActivatedRoute,
    private statisticsStoreService: StatisticsStoreService,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.isCompleted$ = this.usersStoreService.userMe$.pipe(
      first(),
      filter(({ role }) => role === 'student'),
      mergeMap(() => this.statisticsStoreService.selectLessonIsCompleted(this.lesson.id)),
      shareReplay()
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public edit(): void {
    this.router.navigate(['lessons', this.lesson.id, 'edit'])
  }

  public goToLesson(): void {
    this.router.navigate(['lessons', this.lesson.id])
  }

  public remove(): void {
    const dialogRef = this.dialog.open(ChessConfirmationDialogComponent, {
      width: '400px',
      autoFocus: false,
      disableClose: true,
      data: {
        title:  'LESSONS.DELETE_CONFIRMATION',
        description: 'LESSONS.ALL_DATA_WILL_BE_REMOVED'
      }
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this.lessonsStoreService.removeLesson(this.lesson.id);
        }
      });
  }
}
