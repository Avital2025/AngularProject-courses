import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/Cours';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AditCourseComponent } from '../adit-course/adit-course.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatButtonModule, RouterLinkActive, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  userId: string | null = null;
  enrolledCourses: Set<string> = new Set();
  role: string = sessionStorage.getItem('role') || '';
  courses: Course[] = [];
 // studentCourse:Course[]=[]


  constructor(
    private dialog: MatDialog,
    private courseService: CoursesService, 
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) { // בדיקה אם רץ בדפדפן
      this.userId = sessionStorage.getItem('userId');
    }
  }

ngOnInit(): void {
  this.getCourses();
  this.loadEnrolledCourses();
 }
  getCourses(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  deleteCourse(id: string): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.courses = this.courses.filter(course => course.id !== id);
    }, error => {
      console.error('Error deleting course:', error);
    });
  }

  editCourse(course: Course): void {
    const dialogRef = this.dialog.open(AditCourseComponent, {
      data: { course },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCourses();
      }
    });
  }
  isEnrolled(course: Course): boolean {
    return this.enrolledCourses.has(course.id);
  }

  enrollInCourse(course: Course): void {
    this.courseService.enrollInCourse(this.userId, course.id).subscribe(() => {
      this.enrolledCourses.add(course.id);
      this.saveEnrolledCourses(); // שמירה ב-SessionStorage
      console.log('Successfully enrolled in course', course.title);
    }, error => {
      console.error('Error enrolling in course:', error);
    });
  }

  unenrollFromCourse(course: Course): void {
    this.courseService.unenrollFromCourse(this.userId, course.id).subscribe(() => {
      this.enrolledCourses.delete(course.id);
      this.saveEnrolledCourses(); // עדכון ב-SessionStorage
      console.log('Successfully unenrolled from course', course.title);
    }, error => {
      console.error('Error unenrolling from course:', error);
    });
  }

  saveEnrolledCourses(): void {
    sessionStorage.setItem('enrolledCourses', JSON.stringify(Array.from(this.enrolledCourses)));
  }

  loadEnrolledCourses(): void {
    const storedCourses = sessionStorage.getItem('enrolledCourses');
    if (storedCourses) {
      this.enrolledCourses = new Set(JSON.parse(storedCourses));
    }
  }
}
