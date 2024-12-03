import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@beng-core/services/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (!authService.isAuthenticated) {
    return inject(Router).navigate(['/auth/login']);
  }

  return true;
};
