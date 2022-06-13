import {Component, Input, OnInit} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, first, mergeMap, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsStoreService } from '../../store/lessons/services/lessons-store.service';
import { Lesson } from '../../store/lessons/models';
import { UsersStoreService } from '../../store/users/services/users-store.service';
import { StatisticsStoreService } from '../../store/statistics/services/statistics-store.service';

@Component({
  selector: 'chess-list-group-lesson',
  templateUrl: './list-group-lesson.component.html',
  styleUrls: ['./list-group-lesson.component.scss']
})
export class ListGroupLessonComponent implements OnInit {

  public isCompleted$: Observable<boolean>;
  @Input() public lesson: Lesson;

  constructor(
    private router: Router,
    private lessonsStoreService: LessonsStoreService,
    private usersStoreService: UsersStoreService,
    private activatedRoute: ActivatedRoute,
    private statisticsStoreService: StatisticsStoreService
  ) { }

  public ngOnInit(): void {
    this.isCompleted$ = this.usersStoreService.userMe$.pipe(
      first(),
      filter(({ role }) => role === 'student'),
      mergeMap(() => this.statisticsStoreService.selectLessonIsCompleted(this.lesson.id))
    );
  }

  public goToLesson(): void {
    this.router.navigate(['lessons', this.lesson.id]);
  }
}
