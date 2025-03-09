import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/Cours';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  addCourseForm!: FormGroup;

  constructor(public courseService: CoursesService, private fb: FormBuilder, private router: Router
  ) { }

  ngOnInit(): void {
    this.addCourseForm = this.fb.group({
      courseGroup: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      }),
    });
  }

  onSubmit() {

    if (this.addCourseForm.valid) {
      const course: Course = this.addCourseForm.value.courseGroup;
      const { title, description } = course

      this.courseService.addCourse(title, description).subscribe({
        next: (response) => {
          alert('Course added successfully!');
          this.router.navigate(['/courses']);

        },
        error: (err) => {
          console.error('Error adding course', err);
          alert('Failed to add course');
        }
      });

    }
  }
  goBack(): void {
    this.router.navigate(['/courses']);  // פקודת הניווט לרשימת הקורסים
  }
}