import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { BuilderComponent } from './components/builder/builder.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { StudentsComponent } from './components/students/students.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupComponent } from './components/group/group.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationTutorComponent } from './components/registration-tutor/registration-tutor.component';
import { RegistrationStudentComponent } from './components/registration-student/registration-student.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { RolesGuardGuard } from './guards/roles-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'groups',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationTutorComponent
  },
  {
    path: 'student-registration',
    component: RegistrationStudentComponent
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuardGuard],
    canActivateChild: [RolesGuardGuard],
    children: [
      {
        path: 'lessons/create',
        component: BuilderComponent,
        data: { roles: ['tutor'], redirectTo: 'groups' },
      },
      {
        path: 'lessons/:id/edit',
        component: BuilderComponent,
        data: { roles: ['tutor'], redirectTo: 'groups' },
      },
      {
        path: 'lessons/:id',
        component: LessonComponent,
        data: { roles: ['tutor', 'student', 'admin'], redirectTo: 'login' },
      },
      {
        path: 'lessons',
        component: LessonsComponent,
        data: { roles: ['tutor', 'student', 'admin'], redirectTo: 'login' },
      },
      {
        path: 'students',
        component: StudentsComponent,
        data: { roles: ['tutor'], redirectTo: 'groups' },
      },
      {
        path: 'groups/:id',
        component: GroupComponent,
        data: { roles: ['tutor', 'student', 'admin'], redirectTo: 'login' },
      },
      {
        path: 'groups',
        component: GroupsComponent,
        data: { roles: ['tutor', 'student', 'admin'], redirectTo: 'login' },
      },
      {
        path: '**',
        redirectTo: 'lessons'
      }
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
