import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsersStoreService } from '../../store/users/services/users-store.service';

@Component({
  selector: 'chess-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  public students$ = this.usersStoreService.students$.pipe(filter(Boolean));

  constructor(
    private router: Router,
    private usersStoreService: UsersStoreService
  ) {}

  ngOnInit(): void {
    this.usersStoreService.requestStudents();
  }

}
