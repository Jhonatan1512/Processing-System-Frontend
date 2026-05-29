import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if(token){
    return true;
  }

  console.warn("Acceso denegado. Intento de navegación si inicio de sesión");
  router.navigate(['/login'], {replaceUrl: true})
  return false;
  
};
