export const LessonsStateName = 'lessons';

export interface LessonsState {
  lessonsList: Lesson[] | undefined;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  initialState: string;
  moves: Move[];
  orientation: 'black' | 'white';
  notationType: 'cyr' | 'lat';
  disableDrag: boolean;
}

export interface Move {
  piece: string;
  notation: string;
  fen: string;
}
