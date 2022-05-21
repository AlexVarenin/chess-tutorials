import { Component, Input } from '@angular/core';
import { GroupUser } from '../../store/groups/models';

@Component({
  selector: 'chess-chess-avatar',
  templateUrl: './chess-avatar.component.html',
  styleUrls: ['./chess-avatar.component.scss']
})
export class ChessAvatarComponent {

  @Input() public user: GroupUser;
  @Input() public size = 50;
  @Input() public displayName = false;
  public name: string;

  constructor() { }

}
