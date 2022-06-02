import { Component, OnDestroy, OnInit } from '@angular/core';
import { GroupsStoreService } from '../../store/groups/services/groups-store.service';
import { Group } from '../../store/groups/models';
import {ActivatedRoute, Router} from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { UsersStoreService } from '../../store/users/services/users-store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
}
