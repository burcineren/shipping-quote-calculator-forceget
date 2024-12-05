import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BeValidators } from '@beng-core/utils/form-validators.utils';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { OrganismRegisterFormComponent } from 'src/app/components/organism-register-form/organism-register-form.component';
import { RegisterForm } from 'src/app/types/register-form';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule,OrganismRegisterFormComponent],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  private store = inject(Store);

  registerForm: FormGroup<RegisterForm> = new FormGroup({
    email: new FormControl('', BeValidators.email),
    password: new FormControl('', BeValidators.required('validation.password')),
    confirmPassword: new FormControl('', BeValidators.required('validation.password')),
  });

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      this.toastrService.error('Please enter a valid login form');
      return;
    }
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      // this.store.dispatch(new Login({ email: email, password })).subscribe({
      //   next: () => {
      //     this.toastrService.success('Login successful');
      //     this.router.navigate(['/']);
      //   },
      //   error: (err) => {
      //     console.error('Dispatch hatası:', err);
      //     this.toastrService.error('Login failed. Please check your credentials.');
      //   },
      // });
    }

  }
}
