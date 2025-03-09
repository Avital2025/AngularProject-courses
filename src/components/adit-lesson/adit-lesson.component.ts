import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AditCourseComponent } from '../adit-course/adit-course.component';
import { LessonsService } from '../../services/lessons.service';
import { lesson } from '../../models/lessons';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-adit-lesson',
  standalone: true,
  imports: [MatDialogModule,
      ReactiveFormsModule,MatFormFieldModule,],
  templateUrl: './adit-lesson.component.html',
  styleUrl: './adit-lesson.component.css'
})
export class AditLessonComponent implements OnInit{
 editLessonForm!: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AditCourseComponent>,
    private lessonService: LessonsService,
    @Inject(MAT_DIALOG_DATA) public data: { lesson: lesson, } // מקבל את הקורס שנבחר לעדכון
  ) {}

ngOnInit(): void {
  this.editLessonForm = this.fb.group({
    title: [this.data.lesson.title, Validators.required],
    content: [this.data.lesson.content, Validators.required],
  });
}


  onNoClick(): void {
    this.dialogRef.close(); // סוגר את המודל
  }

  onSubmit(): void {

    if (this.editLessonForm.valid) {
      const updatedLesson = {
        title: this.editLessonForm.value.title,
        content: this.editLessonForm.value.content,
        courseId:this.data.lesson.courseId,
        id:this.data.lesson.id
      };

      
      this.lessonService.updateLesson(this.data.lesson.id,this.data.lesson.courseId, updatedLesson).subscribe({
        next: (response) => {
          console.log('Course updated successfully:', response);
          alert('lesson updated successfully!');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error updating course:', err);
          alert('Failed to update lesson');
        }
      });
    }
  }

  
}
