import { Component, Input } from '@angular/core';
import { User } from '../../store/users/models';

@Component({
  selector: 'chess-progress',
  templateUrl: './chess-progress.component.html',
  styleUrls: ['./chess-progress.component.scss']
})
export class ChessProgressComponent {

  @Input() public progress = 0;

  constructor() { }

}
