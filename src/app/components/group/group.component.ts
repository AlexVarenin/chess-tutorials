import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsStoreService } from '../../store/groups/services/groups-store.service';
import { Lesson } from '../../store/lessons/models';
import { FormControl, Validators } from '@angular/forms';
import {distinctUntilChanged, map, shareReplay, startWith, switchMap, tap} from 'rxjs/operators';
import { Student } from '../../store/users/models';
import { UserNamePipe } from '../../pipes/user-name/piece-name.pipe';
import { UsersStoreService } from '../../store/users/services/users-store.service';
import { LessonsStoreService } from '../../store/lessons/services/lessons-store.service';
import { GroupInfo } from '../../store/groups/models';

@Component({
  selector: 'chess-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  providers: [UserNamePipe]
})
export class GroupComponent implements OnInit {

  public groupId = this.activatedRoute.snapshot.paramMap.get('id');
  public group$: Observable<GroupInfo>;
  public title = new FormControl('Some title', Validators.required);
  public textMode = true;
  public studentToAdd = new FormControl('');
  public lessonToAdd = new FormControl('');
  public availableStudents$: Observable<Student[]>;
  public availableLessons$: Observable<Lesson[]>;
  public isStudentsAddDisabled$: Observable<boolean>;
  public isLessonsAddDisabled$: Observable<boolean>;
  public displayFn = (user: Student) => this.userNamePipe.transform(user);
  public displayLessonFn = (lesson: Lesson) => lesson?.title;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private groupsStoreService: GroupsStoreService,
    private usersStoreService: UsersStoreService,
    private lessonsStoreService: LessonsStoreService,
    public userNamePipe: UserNamePipe
  ) { }

  public ngOnInit(): void {
    this.groupsStoreService.requestGroupInfo(this.groupId as string);
    this.usersStoreService.requestStudents();
    this.lessonsStoreService.requestLessons();

    this.group$ = this.groupsStoreService.group$.pipe(
      tap((group: GroupInfo) => this.title.setValue(group.name, { emitEvent: false }))
    );

    const studentValueChanges$ = this.studentToAdd.valueChanges.pipe(
      startWith(''),
      shareReplay()
    );
    this.isStudentsAddDisabled$ = studentValueChanges$.pipe(map(
      value => !value || typeof value === 'string'
    ));

    this.availableStudents$ = studentValueChanges$.pipe(
      distinctUntilChanged(),
      map(value => (typeof value === 'string' ? value : this.userNamePipe.transform(value))),
      switchMap(name => this.usersStoreService.students$.pipe(
        map(students => this.filterStudents(name, students))
      ))
    );

    const lessonsValueChanges$ = this.lessonToAdd.valueChanges.pipe(
      startWith(''),
      shareReplay()
    );
    this.isLessonsAddDisabled$ = lessonsValueChanges$.pipe(
      map(
      value => !value || typeof value === 'string'
    ));

    this.availableLessons$ = lessonsValueChanges$.pipe(
      distinctUntilChanged(),
      map(value => (typeof value === 'string' ? value : value?.title)),
      switchMap(name => this.lessonsStoreService.lessons$.pipe(
        map(lessons => this.filterLessons(name, lessons))
      ))
    );
  }

  public goToLesson(lesson: Lesson): void {
    this.router.navigate(['lessons', lesson.id]);
  }

  public toggleTitleInput() {
    if (this.title.valid) {
      this.textMode = !this.textMode;
    }
  }

  addStudent(): void {
    this.groupsStoreService.addStudentToGroup(this.groupId as string, this.studentToAdd.value);
    this.studentToAdd.reset();
  }

  addLesson(): void {
    this.groupsStoreService.addLessonToGroup(this.groupId as string, this.lessonToAdd.value);
    this.lessonToAdd.reset();
  }

  private filterStudents(name: string, students: Student[]): Student[] {
    if (!name) {
      return [...students];
    }
    const filterValue = name.toLowerCase();
    return students.filter(student => this.userNamePipe.transform(student).toLowerCase().includes(filterValue)
    );
  }

  private filterLessons(title: string, lessons: Lesson[]): Lesson[] {
    if (!title) {
      return [...lessons];
    }
    const filterValue = title.toLowerCase();
    return lessons.filter(lesson => lesson.title.toLowerCase().includes(filterValue)
    );
  }

}
