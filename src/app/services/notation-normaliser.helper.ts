export function normaliseNotation(
  notation: string,
  orientation: 'white' | 'black',
  notationType: 'cyr' | 'lat',): { notation: string, piece: string | null } {
  const prefix = orientation.charAt(0);
  if (notation === 'O-O' || notation === 'O-O-O') {
    return { notation, piece: `${prefix}K`};
  }
  const pieceMatch = notation.match(notationRegExp);
  if (pieceMatch) {
    const parsedPiece = notationDenormaliseMap[notationType][pieceMatch[1]];
    const piece = prefix + (parsedPiece || 'P');
    const normalisedNotation = pieceMatch[2];
    return { notation: normalisedNotation, piece };
  }
  return { notation, piece: null };
}

export const notationDenormaliseMap: { [key: string]: { [key: string]: string} } = {
  cyr: {
    С: 'B',
    Кр: 'K',
    К: 'N',
    Ф: 'Q',
    Л: 'R'
  },
  lat: {
    B: 'B',
    K: 'K',
    N: 'N',
    Q: 'Q',
    R: 'R'
  }
};

const notationRegExp = /(С|Кр|К|Ф|Л|B|K|N|Q|R{0,1})([a-h][1-8].[a-h][1-8])/;
