

import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthState } from '@beng-core/states/auth-state';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private store = inject(Store);
  private router = inject(Router);
  canActivate(): boolean {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);

    if (!isAuthenticated) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}

