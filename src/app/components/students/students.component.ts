import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { first, takeUntil, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { UsersStoreService } from '../../store/users/services/users-store.service';
import { Student } from '../../store/users/models';
import { ChessConfirmationDialogComponent } from '../chess-confirmation-dialog/chess-confirmation-dialog.component';

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

  private destroy$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private usersStoreService: UsersStoreService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.usersStoreService.requestStudents();
  }

  public copyContent(): void {
    navigator.clipboard.writeText(this.inviteStudent.value);
  }

  public goToGroup(groupId: string): void {
    this.router.navigate(['groups', groupId]);
  }

  public removeStudent(student: Student): void {
    const dialogRef = this.dialog.open(ChessConfirmationDialogComponent, {
      width: '400px',
      autoFocus: false,
      disableClose: true,
      data: {
        title:  'STUDENTS.DELETE_CONFIRMATION',
        description: 'STUDENTS.ALL_DATA_WILL_BE_REMOVED'
      }
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this.usersStoreService.removeStudent(student.id);
        }
      });
  }
}


