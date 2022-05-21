import { Component, OnInit } from '@angular/core';
import { GroupsStoreService } from '../../store/groups/services/groups-store.service';
import { Group } from '../../store/groups/models';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'chess-students',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  public groups$ = this.groupsStoreService.groups$;
  public newGroupTitle = new FormControl('', Validators.required);
  public formIdDisplayed = false;

  constructor(
    private groupsStoreService: GroupsStoreService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.groupsStoreService.requestGroups();
  }

  public goToGroupInfo(group: Group): void {
    this.router.navigate(['/groups', group.id]);
  }

  public createGroup(): void {
    this.formIdDisplayed = true;
  }

  public saveGroup(): void {
    this.formIdDisplayed = false;
    this.groupsStoreService.addGroup(this.newGroupTitle.value);
    this.newGroupTitle.reset();
  }
}
