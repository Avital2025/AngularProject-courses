import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ErrorsComponent } from '../errors/errors.component';
import { MatError, } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorsComponent, ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, MatIconModule,
    MatCardModule, MatError],  // הוספת קומפוננטת השגיאה לקומפוננטה
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  addUserForm!: FormGroup;
  errormessage: string = '';  // משתנה לשמירת השגיאה
  showError: boolean = false;  // משתנה לניהול הצגת השגיאה

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      userGroup: this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required],
      }),
    });
  }
  onSubmit() {
    if (this.addUserForm.valid) {
      const { email, password } = this.addUserForm.value.userGroup;
  
      // לוגין עם השירות הראשון
      this.userservice.login(email, password).subscribe({
        next: (response) => {
         
          // שמירה של token בתקשורת עם השרת
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('role', response.role);
          sessionStorage.setItem('userId', response.userId);
  
          // ניווט לעמוד הבית
          this.dialogRef.close();
          this.router.navigate(['/courses']);
        },
        error: (err) => {
          // טיפול בשגיאות
          if (err.status === 400) {
            this.errormessage = 'Invalid credentials';
          } else if (err.status === 404) {
            this.errormessage = 'User not found. Please Sign up';
          } else {
            this.errormessage = 'An unexpected error occurred';
          }
          this.showError = true; // הצגת השגיאה
        }
      });
  
    } else {
      this.errormessage = 'Please fill in all fields correctly.';
      this.showError = true;
    }
  
  }


  onErrorClosed() {
    this.showError = false;  // הסתרת השגיאה לאחר סגירתה
  }
}