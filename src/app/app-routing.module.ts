import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { BuilderComponent } from './components/builder/builder.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { LessonComponent } from './components/lesson/lesson.component';

const routes: Routes = [
  { path: '', component: DefaultLayoutComponent, children: [
      { path: 'lessons/create', component: BuilderComponent },
      { path: 'lessons/:id/edit', component: BuilderComponent },
      { path: 'lessons/:id', component: LessonComponent },
      { path: 'lessons', component: LessonsComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
