import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '@beng-core/states/auth-state'; // Register action import edildi
import { BeValidators } from '@beng-core/utils/form-validators.utils';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { OrganismRegisterFormComponent } from 'src/app/components/organism-register-form/organism-register-form.component';
import { RegisterForm } from 'src/app/types/register-form';

@Component({
  selector: 'be-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, OrganismRegisterFormComponent],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  private store = inject(Store);

  registerForm: FormGroup<RegisterForm> = new FormGroup({
    email: new FormControl('', BeValidators.email),
    password: new FormControl('', BeValidators.required('validation.password')),
    confirmPassword: new FormControl('', BeValidators.required('validation.confirmPassword')),
  });

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      this.toastrService.error('Please fill out the form correctly.');
      return;
    }

    const { email, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.toastrService.error('Passwords do not match.');
      return;
    }

    this.store.dispatch(new Register({ email: email!, password: password!, confirmPassword: confirmPassword! })).subscribe({
      next: () => {
        this.toastrService.success('Registration successful');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Dispatch error:', err);
        this.toastrService.error('Registration failed. Please try again.');
      },
    });
  }
}