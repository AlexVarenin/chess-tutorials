export const StatisticsStateName = 'statistics';

export interface StatisticsState {
  statistics: LessonStatistics[] | undefined;
}

export interface LessonStatistics {
  id: string;
  lessonId: string;
  studentId: string;
  failures: number;
  tutorId: string;
  progress: number;
  createdAt: string;
}

