import { Student } from '../../users/models';
import { Lesson } from '../../lessons/models';

export const GroupsStateName = 'groups';

export interface GroupsState {
  groupsList: Group[] | undefined;
  groupInfo: GroupInfo | undefined;
}

export interface Group {
  id: string;
  name: string;
  students: Student[];
  lessons: string[];
}

export type GroupInfo = Omit<Group, 'lessons'> & { lessons: Lesson[] };
