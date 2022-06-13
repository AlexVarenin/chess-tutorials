import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GroupsStoreService } from '../../store/groups/services/groups-store.service';
import { Group } from '../../store/groups/models';
import { UsersStoreService } from '../../store/users/services/users-store.service';


import { ChessConfirmationDialogComponent } from '../chess-confirmation-dialog/chess-confirmation-dialog.component';

@Component({
  selector: 'chess-students',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {

  public groups$ = this.groupsStoreService.groups$;
  public newGroupTitle = new FormControl('', Validators.required);
  public formIdDisplayed = false;

  private destroy$ = new Subject<boolean>();

  constructor(
    private groupsStoreService: GroupsStoreService,
    private router: Router,
    private usersStoreService: UsersStoreService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.usersStoreService.userMe$.pipe(takeUntil(this.destroy$))
      .subscribe(({ role }) => {
        if (role === 'tutor') {
          this.groupsStoreService.requestGroups();
        }
        if (role === 'student') {
          this.groupsStoreService.requestStudentGroups();
        }
      });

  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public goToGroupInfo(group: Group): void {
    this.router.navigate([group.id], { relativeTo: this.activatedRoute });
  }

  public createGroup(): void {
    this.formIdDisplayed = true;
  }

  public saveGroup(): void {
    this.formIdDisplayed = false;
    this.groupsStoreService.addGroup({ name: this.newGroupTitle.value, lessons: [], students: [] });
    this.newGroupTitle.reset();
  }

  public removeGroup(group: Group): void {
    const dialogRef = this.dialog.open(ChessConfirmationDialogComponent, {
      width: '400px',
      autoFocus: false,
      disableClose: true,
      data: {
        title:  'GROUPS.DELETE_CONFIRMATION',
        description: 'GROUPS.ALL_DATA_WILL_BE_REMOVED'
      }
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this.groupsStoreService.removeGroup(group.id);
        }
      });
  }


}
