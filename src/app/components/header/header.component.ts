import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { UsersStoreService } from '../../store/users/services/users-store.service';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'chess-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public userMe$ = this.usersStoreService.userMe$;

  constructor(
    private usersStoreService: UsersStoreService,
    private authorizationService: AuthorizationService
  ) { }

  public logout(): void {
    this.authorizationService.logout();
  }

}
