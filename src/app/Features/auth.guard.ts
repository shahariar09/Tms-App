// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './login/services/auth.service';  
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;  // Allow access if logged in
  } else {
    router.navigate(['/login/userLogin']);  // Redirect to login if not logged in
    return false;
  }
};





