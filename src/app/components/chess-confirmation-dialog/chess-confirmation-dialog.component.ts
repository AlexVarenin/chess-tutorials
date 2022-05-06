import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'chess-confirmation-dialog',
  templateUrl: './chess-confirmation-dialog.component.html',
  styleUrls: ['./chess-confirmation-dialog.component.scss']
})
export class ChessConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<ChessConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; description: string; hideCancel?: boolean }
  ) { }
}
