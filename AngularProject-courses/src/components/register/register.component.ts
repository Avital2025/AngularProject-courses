import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Roles } from '../../models/eroles';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { UserService } from '../../services/user.service';
import { user } from '../../models/user';
import { Router } from '@angular/router';
import { ErrorsComponent } from '../errors/errors.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatNativeDateModule,
    ErrorsComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  errormessage: string = '';  // משתנה לשמירת השגיאה
  showError: boolean = false; 
 constructor(public dialogRef: MatDialogRef<RegisterComponent>,private fb: FormBuilder,private userService:UserService,private router: Router) {}
 addUserForm!: FormGroup;
 roles = Object.values(Roles).filter(value => typeof value === 'string')as string[]; // מסנן את הערכים של ה-enum

  closeDialog() {
    this.dialogRef.close(); 
  }
  ngOnInit(): void {

    
    this.addUserForm = this.fb.group({
      userGroup: this.fb.group({
          email: ['', Validators.compose([Validators.required, Validators.email])],
          password : ['', Validators.required],
          name: ['', Validators.required],
          role : ['', Validators.required],
      })
    }) }

  
      onSubmit(){
        if (this.addUserForm.valid) {
       const user:user=this.addUserForm.value.userGroup;
          const { name, email, password, role } = user
      
          // קריאה לפונקציה register מהשירות
          this.userService.register(name, email, password, role).subscribe({
            next: (response) => {
              // במקרה של הצלחה
              sessionStorage.setItem('role',role)
              console.log('User registered successfully',response);
              sessionStorage.setItem('token', response.token);
              sessionStorage.setItem('userId', response.userId);
              this.dialogRef.close(); // סוגר את הדיאלוג
              this.router.navigate(['/courses']);

            },
            error: (err) => {
              // במקרה של שגיאה, נבדוק את קוד השגיאה
              if (err.status === 400) {
                // שגיאה בהגשות נתונים (Bad Request)
               this.errormessage='Invalid data, please check your input and try again.';
              } else if (err.status === 404) {
                // משתמש לא נמצא
                alert('User not found.');
              } else if (err.status === 500) {
                // שגיאה בשרת
                this.errormessage='There was an error with the server. Please try again later.';
              } else {
                // שגיאה כללית
               this.errormessage='An unexpected error occurred. Please try again.';
              }
              this.showError = true; 
              console.error('Error registering user', err);
            }
          });
        } else {
          this.showError = true; 
          // אם הטופס לא תקין
         this.errormessage='Please fill in all fields correctly.';
        }
      }
      onErrorClosed() {
        this.showError = false;  // הסתרת השגיאה לאחר סגירתה
      }
}
