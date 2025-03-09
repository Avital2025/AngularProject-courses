import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ 
    MatButtonModule, // כפתורים
    MatFormFieldModule, // מסגרת לאינפוטים
    MatInputModule, // אינפוטים מעוצבים
    MatIconModule, // אייקונים
    MatDialogModule,],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(private dialog: MatDialog) {}

  openLoginDialog() {
    this.dialog.open(LoginComponent, {
      width: '400px', // ניתן להגדיר גודל
    });
  }
  openRegisterDialog() {
    this.dialog.open(RegisterComponent, {
      width: '400px', // ניתן להגדיר גודל
    });
  }
}
