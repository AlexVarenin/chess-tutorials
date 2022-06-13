export const LessonsStateName = 'lessons';

export interface LessonsState {
  lessonsList: Lesson[] | undefined;
  lessonInfo: LessonInfo | undefined;
}

export interface Lesson {
  id: string;
  title: string;
  initialState: string;
  orientation: 'black' | 'white';
}

export interface LessonInfo extends Lesson {
  moves: Move[];
  description: string;
  notationType: 'cyr' | 'lat';
  disableDrag: boolean;
}

export interface Move {
  piece: string;
  notation: string;
  fen: string;
}

export interface MoveStatusResponse {
  status: MoveStatus;
  nextMove: Move;
}

export enum MoveStatus {
  SUCCEED = 'SUCCEED',
  FAILED = 'FAILED',
  FINISHED = 'FINISHED'
}
