export const LessonsStateName = 'lessons';

export interface LessonsState {
  lessonsList: Lesson[] | undefined;
  lessonInfo: LessonInfo | undefined;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  initialState: string;
  orientation: 'black' | 'white';
}

export interface LessonInfo extends Lesson {
  moves: Move[];
  notationType: 'cyr' | 'lat';
  disableDrag: boolean;
}

export interface Move {
  piece: string;
  notation: string;
  fen: string;
}
