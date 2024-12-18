import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { OrganismLoginFormComponent } from 'src/app/components/organism-login-form/organism-login-form.component';
import { LoginForm } from 'src/app/types/login-form';
import { BeValidators } from '@beng-core/utils/form-validators.utils';
import { LoginAction } from '@beng-core/states/auth-state';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'be-login',
  standalone: true,
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, OrganismLoginFormComponent],
})
export class LoginComponent {
  private router = inject(Router);
  private notification = inject(NzNotificationService);
  private store = inject(Store);

  loginForm: FormGroup<LoginForm> = new FormGroup({
    email: new FormControl('', BeValidators.email),
    password: new FormControl('', BeValidators.required('validation.password')),
  });

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.notification.create('error', 'Login Failed', 'Please enter a valid login form');
      return;
    }
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.store.dispatch(new LoginAction({ email: email, password })).subscribe({
        next: () => {
          this.notification.create('success', 'Login Successful', 'You have logged in successfully');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Dispatch hatası:', err);
          this.notification.create('error', 'Login Failed', 'Login failed. Please check your credentials.');
        },
      });
    }
  }
}
