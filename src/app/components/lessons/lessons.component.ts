import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject} from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { LessonsStoreService } from '../../store/lessons/services/lessons-store.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Lesson } from '../../store/lessons/models';
import { UsersStoreService } from '../../store/users/services/users-store.service';


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
  ) { }

  public ngOnInit(): void {
    this.usersStoreService.userMe$.pipe(takeUntil(this.destroy$))
      .subscribe(({ role }) => {
        if (role === 'tutor') {
          this.lessonsStoreService.requestLessons();
        }
        if (role === 'student') {
          this.lessonsStoreService.requestStudentLessons();
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

  public edit(lesson: Lesson): void {
    this.router.navigate([lesson.id, 'edit'], { relativeTo: this.activatedRoute })
  }

  public goToLesson(lesson: Lesson): void {
    this.router.navigate([lesson.id], { relativeTo: this.activatedRoute })
  }

  public remove(lesson: Lesson): void {
    this.lessonsStoreService.removeLesson(lesson.id);
  }
}
