import { Routes } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { AddCourseComponent } from '../components/add-course/add-course.component';
import { ShowCourseComponent } from '../components/show-course/show-course.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';

export const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'courses', component: CoursesComponent },
    { path: 'courses/:id', component: ShowCourseComponent },
    { path: 'add-course', component: AddCourseComponent },
    {path:'lessons/add-lesson/:id',component:AddLessonComponent}
  ];

  