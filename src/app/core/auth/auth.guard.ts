import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

/** Protects CRM dashboard/list routes: redirect to CRM signin if not logged in */
export const crmAuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    return true;
  }
  router.navigate(['/crm/signin']);
  return false;
};

/** Use on CRM signin: redirect to CRM dashboard if already logged in */
export const crmGuestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) {
    return true;
  }
  router.navigate(['/crm/dashboard']);
  return false;
};
