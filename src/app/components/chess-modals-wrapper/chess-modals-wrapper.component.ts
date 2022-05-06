import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'chess-modals-wrapper',
  templateUrl: './chess-modals-wrapper.component.html',
  styleUrls: ['./chess-modals-wrapper.component.scss']
})
export class ChessModalsWrapperComponent<T> {
  @Input() dialogRef!: MatDialogRef<T>;
}
