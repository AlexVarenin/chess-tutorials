import { Component, Input } from '@angular/core';
import { User } from '../../store/users/models';

@Component({
  selector: 'chess-chess-avatar',
  templateUrl: './chess-avatar.component.html',
  styleUrls: ['./chess-avatar.component.scss']
})
export class ChessAvatarComponent {

  @Input() public user: User;
  @Input() public size = 50;
  @Input() public displayName = false;
  @Input() public displayTooltip = false;
  public name: string;

  constructor() { }

}
