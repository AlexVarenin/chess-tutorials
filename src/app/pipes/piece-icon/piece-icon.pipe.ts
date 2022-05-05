import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pieceIcon'
})
export class PieceIconPipe implements PipeTransform {

  transform(piece: string): string {
    return `assets/chesspieces/${ piece }.png`;
  }

}
