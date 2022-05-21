import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { BuilderComponent } from './components/builder/builder.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { StudentsComponent } from './components/students/students.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupComponent } from './components/group/group.component';
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '', component: DefaultLayoutComponent, children: [
      { path: 'lessons/create', component: BuilderComponent },
      { path: 'lessons/:id/edit', component: BuilderComponent },
      { path: 'lessons/:id', component: LessonComponent },
      { path: 'lessons', component: LessonsComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'groups/:id', component: GroupComponent },
      { path: 'groups', component: GroupsComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
