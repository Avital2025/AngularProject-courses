import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { lesson } from '../models/lessons';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private http: HttpClient) { }
  private apiUrl="http://localhost:3000/api/courses"


  // Get all lessons by course ID
  getLessonsByCourseId(courseId: string): Observable<any> { 
    return this.http.get<lesson[]>(`${this.apiUrl}/${courseId}/lessons`);
  }
 

  // שליפת שיעור לפי ID
  getLessonById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/lessons`);
  }

  // יצירת שיעור חדש
  createLesson(courseId: string, title: string, content: string): Observable<any> {
    const body = { title, content,courseId };
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, body);
  }


  // עדכון שיעור לפי ID
  updateLesson(id: number,courseId:string, updates: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${id}`, updates);
  }

  // מחיקת שיעור לפי ID
  deleteLesson(id: number,courseId:string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${id}`);
  }
}



