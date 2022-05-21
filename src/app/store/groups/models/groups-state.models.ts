import { User } from '../../users/models';
import { Lesson } from '../../lessons/models';

export const GroupsStateName = 'groups';

export interface GroupsState {
  groupsList: Group[] | undefined;
  groupInfo: GroupInfo | undefined;
}

export interface Group {
  id: string;
  name: string;
  students: GroupUser[];
}

export interface GroupInfo extends Group {
  lessons: Lesson[]
}

export type GroupUser = Omit<User, 'type'>;
