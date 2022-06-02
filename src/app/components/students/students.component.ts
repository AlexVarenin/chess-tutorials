import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { UsersStoreService } from '../../store/users/services/users-store.service';

@Component({
  selector: 'chess-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  public inviteStudent = new FormControl({ value: '', disabled: true });

  public students$ = this.usersStoreService.students$;
  public userMe$ = this.usersStoreService.userMe$.pipe(
    first(),
    tap(( { id }) => this.inviteStudent.setValue(`${location.origin}/student-registration?code=${id}`))
  );

  constructor(
    private router: Router,
    private usersStoreService: UsersStoreService
  ) {}

  ngOnInit(): void {
    this.usersStoreService.requestStudents();
  }

  public copyContent(): void {
    navigator.clipboard.writeText(this.inviteStudent.value);
  }

  public goToGroup(groupId: string): void {
    this.router.navigate(['groups', groupId]);
  }
}


