import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginForm } from 'src/app/types/login-form';

@Component({
  selector: 'be-organism-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './organism-register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganismRegisterFormComponent {
  private formGroupDirective = inject(FormGroupDirective);

  onSubmit = output();

  formGroup: FormGroup<LoginForm>;

  ngOnInit() {
    // if (!this.formGroupDirective) {
    //   throw new Error('be-organism-register-form must be used within a FormGroup.');
    // }
    // this.formGroup = this.formGroupDirective.control;
  }
}
