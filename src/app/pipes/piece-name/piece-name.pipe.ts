import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pieceName'
})
export class PieceNamePipe implements PipeTransform {

  transform(piece: string, notationType: 'lat' | 'cyr', notation?: string, ): string | null {
    if (!piece) {
      return '';
    }
    if (notation === 'O-O' || notation === 'O-O-O') {
      return '';
    }
    const pieceName = piece.replace(/w|b/, '');
    return notationMap[pieceName][notationType];
  }

}


const notationMap: {[key: string]: { lat: string; cyr: string}} = {
  B: { lat: 'B', cyr: 'С'},
  K: { lat: 'K', cyr: 'Кр'},
  N: { lat: 'N', cyr: 'К'},
  P: { lat: '', cyr: ''},
  Q: { lat: 'Q', cyr: 'Ф'},
  R: { lat: 'R', cyr: 'Л'}
};
