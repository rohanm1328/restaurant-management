import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  // Registration API
  register(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/register`,
      data
    );
  }

  // Login API
  login(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/login`,
      data
    );
  }

  // Get user profile
  getProfile(): Observable<any> {
    const token =
      sessionStorage.getItem('token') ||
      localStorage.getItem('token');

    return this.http.get(
      `${this.baseUrl}/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}