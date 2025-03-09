import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../models/Cours';
import { CoursesService } from '../../services/courses.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-adit-course',
  standalone: true,
  imports: [MatDialogModule,
    ReactiveFormsModule,MatFormFieldModule,
    ],
  templateUrl: './adit-course.component.html',
  styleUrl: './adit-course.component.css'
})
export class AditCourseComponent{
  editCourseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AditCourseComponent>,
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA) public data: { course: Course } // מקבל את הקורס שנבחר לעדכון
  )  {
    
    this.editCourseForm = this.fb.group({
      title: [this.data.course.title, Validators.required],
      description: [this.data.course.description, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close(); // סוגר את המודל
  }

  onSubmit(): void {
    
    if (this.editCourseForm.valid) {
      const updatedCourse = {
        title: this.editCourseForm.value.title,
        description: this.editCourseForm.value.description,
        teacherId:this.data.course.teacherId
      };
      this.coursesService.updateCourse(this.data.course.id, updatedCourse).subscribe({
        next: (response) => {
          console.log('Course updated successfully:', response);
          alert('Course updated successfully!');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error updating course:', err);
          alert('Failed to update course');
        }
      });
    }
  }
}
