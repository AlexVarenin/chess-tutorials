export const UsersStateName = 'users';

export interface UsersState {
  usersList: User[] | undefined;
}

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  type: 'admin' | 'tutor' | 'student'
}

export interface Student extends User {
  group: Group;
  role: 'student';
}

export interface Group {
  id: string;
  name: string;
}
