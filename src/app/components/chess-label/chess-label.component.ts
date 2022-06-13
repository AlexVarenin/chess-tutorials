import { Component, Input } from '@angular/core';

@Component({
  selector: 'chess-chess-label',
  templateUrl: './chess-label.component.html',
  styleUrls: ['./chess-label.component.scss']
})
export class ChessLabelComponent {
  @Input() text: string | undefined;
}
