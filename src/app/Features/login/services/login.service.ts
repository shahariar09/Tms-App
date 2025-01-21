import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7059/api/user';  // Update with your correct API endpoint

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  changePassword(payload: {
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-password`, payload);
  }
  logout() {
    // Clear session data (e.g., JWT token or user info)
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');

    // Redirect to the login page
    this.router.navigate(['/login/userLogin']);
  }
}
