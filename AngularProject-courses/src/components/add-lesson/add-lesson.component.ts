import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonsService } from '../../services/lessons.service';
import { lesson } from '../../models/lessons';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { log } from 'console';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
  addLessonForm!: FormGroup;
  courseId!: string
  constructor(private activatedRoute: ActivatedRoute, public lessonService: LessonsService, private fb: FormBuilder, private router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.courseId = params.get('id') || '';
    }); 

    this.addLessonForm = this.fb.group({
      lessonGroup: this.fb.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.addLessonForm.valid) {
      const lesson: lesson = this.addLessonForm.value.lessonGroup;

      const { title, content } = lesson

      this.lessonService.createLesson(this.courseId, title, content,).subscribe({

        next: (response) => {
          alert('lesson added successfully!');
          this.router.navigate([`/courses/${this.courseId}`]);
        },
        error: (err) => {
          console.error('Error adding course', err);
          alert('Failed to add lesson');
        }
      });

    }
  }
  goBacklessons(): void {
    this.router.navigate([`/courses/${this.courseId}`]);
  }

}
