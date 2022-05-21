import { ActionReducerMap } from '@ngrx/store';
import { LessonsState} from '../models';
import { lessonsListReducer } from './lessons-list.reducer';
import { lessonInfoReducer } from './lesson-info.reducer';

export const lessonsReducers: ActionReducerMap<LessonsState> = {
  lessonsList: lessonsListReducer,
  lessonInfo: lessonInfoReducer
};
