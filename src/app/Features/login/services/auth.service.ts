// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   isLoggedIn(): boolean {
//     const token = localStorage.getItem('authToken');
//     return !!token; // Returns true if the token exists
//   }

//   logout(): void {
//     localStorage.removeItem('authToken');
//   }
// }


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // Returns true if the token exists
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Optional: To manage login (setting token)
  login(token: string): void {
    localStorage.setItem('authToken', token);
  }
}



