import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; // כאן תשים את ה-URL של ה-API שלך

  constructor(private http: HttpClient) { }


  register(name: string, email: string, password: string, role: string): Observable<any> {
    const user = { name, email, password, role };
    return this.http.post(`${this.apiUrl}/api/auth/register` , user);
  }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post(`${this.apiUrl}/api/auth/login` , credentials);
  }
}