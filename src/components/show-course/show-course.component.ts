import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/Cours';  // יש לוודא שאתה מייבא את המודל המתאים
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { lesson } from '../../models/lessons';
import { MatDialog } from '@angular/material/dialog';
import { LessonsService } from '../../services/lessons.service';
import { AditLessonComponent } from '../adit-lesson/adit-lesson.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-course',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule, MatCardModule,RouterModule],
  templateUrl: './show-course.component.html',
  styleUrl: './show-course.component.css'
})

export class ShowCourseComponent implements OnInit {
  courseId: string = '';
  course!: Course;
  lessons: lesson[] = [];  
  role:string= sessionStorage.getItem('role')||''
  
  constructor(
    private dialog: MatDialog,
   private activatedRoute: ActivatedRoute,
   private coursesService: CoursesService,
   private lessonService: LessonsService,
   private router: Router
 ) {}

 ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(params => {
    this.courseId = params.get('id') || '';       
    if (this.courseId) {
      this.getCourseDetails()
       this.getLessons();
    }    
  });
}


getLessons(): void {


  this.lessonService.getLessonsByCourseId(this.courseId).subscribe({

    next: (data) => {
      this.lessons = data;
    },
    error: (error) => {
      console.error('Error fetching courses:', error);
      
    }
  });
 
  
}

getCourseDetails(): void {
  
  this.coursesService.getCourseById(this.courseId).subscribe({
    next: (data) => {
      
      this.course = data;
    },
    error: (error) => {
      console.error('Error fetching course:', error);
    }
  });

}

deleteLesson(id:number){
  this.lessonService.deleteLesson(id,this.courseId).subscribe(
    (response) => {
      console.log('Course deleted successfully:', response);
      this.lessons = this.lessons.filter(l => l.id !== id);

    },
    (error) => {
      console.error('Error deleting course:', error);
    }
  );
}

editLesson(lesson:lesson){
const dialogRef = this.dialog.open(AditLessonComponent, {
  data: { lesson}, // שולחים את הקורס למודל
});

dialogRef.afterClosed().subscribe(result => {
  if (result) {
    console.log('Course was updated successfully!');
    this.getLessons(); // רענון קורסים
  }
});
}

  goBack(): void {
    this.router.navigate(['/courses']);  // פקודת הניווט לרשימת הקורסים
  }
}
