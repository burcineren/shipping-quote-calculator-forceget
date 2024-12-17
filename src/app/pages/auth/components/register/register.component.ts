import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterAction } from '@beng-core/states/auth-state'; 
import { BeValidators } from '@beng-core/utils/form-validators.utils';
import { Store } from '@ngxs/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
  private notification = inject(NzNotificationService);
  private store = inject(Store);

  registerForm: FormGroup<RegisterForm> = new FormGroup({
    email: new FormControl('', BeValidators.email),
    password: new FormControl('', BeValidators.required('validation.password')),
    confirmPassword: new FormControl('', BeValidators.required('validation.confirmPassword')),
  });

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      this.notification.create('error', 'Registration Failed', 'Please fill out the form correctly.');
      return;
    }

    const { email, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.notification.create('error', 'Registration Failed', 'Passwords do not match.');
      return;
    }

    this.store.dispatch(new RegisterAction({ email: email!, password: password!, confirmPassword: confirmPassword! })).subscribe({
      next: () => {
        this.notification.create('success', 'Registration Successful', 'You have successfully registered.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Dispatch error:', err);
        this.notification.create('error', 'Registration Failed', 'Registration failed. Please try again.');
      },
    });
  }
}
