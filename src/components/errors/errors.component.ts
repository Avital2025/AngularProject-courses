import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-errors',
  standalone: true,
  imports: [    MatButtonModule,
    MatIconModule],
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.css'
})
export class ErrorsComponent {
  @Input() errorMessage: string = '';  // קבלת הודעת שגיאה מההורה
  @Input() showError: boolean = false; // משתנה לצורך הצגת השגיאה
  @Output() errorClosed = new EventEmitter<void>(); // פלט לאות על סגירת השגיאה

  closeError() {
    this.showError = false;  // הסתרת השגיאה
    this.errorClosed.emit();  // שליחת פלט להורה על סגירת השגיאה
  }
}
