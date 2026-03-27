import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = localStorage.getItem('user_logged') === 'true';

  if (isLoggedIn) {
    return true; 
  } else {
    return router.parseUrl('/login');
  }
};