

// courses.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/Cours';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses';  // עדכון לכתובת ה-API שלך

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<Course[]>(this.apiUrl, { headers });
  }

  addCourse(title: string, description: string): Observable<any> {
    const userId = sessionStorage.getItem('userId');
    const teacherId: number = userId ? +userId : 0;
    const body = { title, description, teacherId };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  getCourseById(id: string): Observable<Course> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<Course>(`${this.apiUrl}/${id}`, { headers });
  }

  updateCourse(id: string, updates: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.put(`${this.apiUrl}/${id}`, updates, { headers });
  }

  deleteCourse(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  enrollInCourse(userId: string | null, courseId: string): Observable<any> {
    const body = { userId };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.post<any>(`http://localhost:3000/api/courses/${courseId}/enroll`, body, { headers });
  }
  
  unenrollFromCourse(userId: string | null, courseId: string): Observable<any> {
    const body = { userId };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.delete<any>(`http://localhost:3000/api/courses/${courseId}/unenroll`, { body, headers });
  }
}