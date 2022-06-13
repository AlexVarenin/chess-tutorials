export const UsersStateName = 'users';

export interface UsersState {
  userMe: User | undefined;
  usersList: User[] | undefined;
}

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: 'admin' | 'tutor' | 'student';
  tutorId?: string;
}

export interface Student extends User {
  role: 'student';
}

export interface StudentInfo extends Student {
  groups?: Group[];
}

export interface Group {
  id: string;
  name: string;
}
