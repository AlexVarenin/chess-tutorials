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
}

export interface Move {
  from: string;
  to: string;
  piece: string;
  fen: string;
}
