import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { LessonsStoreService } from '../../store/lessons/services/lessons-store.service';
import { Router } from '@angular/router';
import { Lesson } from '../../store/lessons/models';


@Component({
  selector: 'chess-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  public lessons$ = this.lessonsStoreService.lessons$.pipe(filter(Boolean));

  constructor(
    private router: Router,
    private lessonsStoreService: LessonsStoreService) { }

  public ngOnInit(): void {
  }

  public addNew(): void {
    this.router.navigate(['/lessons', 'create']);
  }

  public edit(lesson: Lesson): void {
    this.router.navigate(['/lessons', lesson.id, 'edit'])
  }

  public goToLesson(lesson: Lesson): void {
    this.router.navigate(['/lessons', lesson.id])
  }

  public remove(lesson: Lesson): void {
    this.lessonsStoreService.removeLesson(lesson.id);
  }
}
