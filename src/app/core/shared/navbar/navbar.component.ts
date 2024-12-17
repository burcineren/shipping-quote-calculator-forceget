import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@beng-core/services/auth.service';
import { AuthState, Logout } from '@beng-core/states/auth-state';
import { Store } from '@ngxs/store';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Observable } from 'rxjs';
@Component({
  selector: 'navbar',
  imports: [CommonModule,NzMenuModule],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(AuthState.isAuthenticated);
  }

  onLogout(): void {
    this.store.dispatch(new Logout()).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
        
      },
      error: () => {
        console.warn('Logout process completed with errors, navigating to login.');
        this.router.navigate(['/auth/login']); 
      },
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
