import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@beng-core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoginForm } from 'src/app/types/login-form';
import { McValidators } from '@beng-core/utils/form-validators.utils';
import { OrganismLoginFormComponent } from 'src/app/components/organism-login-form/organism-login-form.component';

@Component({
  selector: 'be-login',
  standalone: true,
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, OrganismLoginFormComponent],
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);

  loginForm: FormGroup<LoginForm> = new FormGroup({
    email: new FormControl('', McValidators.email),
    password: new FormControl('', McValidators.required('validation.password')),
  });

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.toastrService.error('Please enter a valid login form');
      return;
    }

    this.authService.login(this.loginForm.value.email).subscribe(() => {
      this.toastrService.success('login successful');
      this.router.navigate(['/']);
    });
  }
}
