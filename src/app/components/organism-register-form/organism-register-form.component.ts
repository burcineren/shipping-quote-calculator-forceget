import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AtomButtonComponent } from '@beng-core/components/atom-button';
import { AtomTextboxComponent } from '@beng-core/components/atom-textbox';
import { TranslocoPipe } from '@jsverse/transloco';
import { RegisterForm } from 'src/app/types/register-form';

@Component({
  selector: 'be-organism-register-form',
  standalone: true,
  templateUrl: './organism-register-form.component.html',
  styleUrl: './organism-register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, ReactiveFormsModule,AtomTextboxComponent, AtomButtonComponent, TranslocoPipe],
})
export class OrganismRegisterFormComponent {
  private formGroupDirective = inject(FormGroupDirective);

  onSubmit = output();

  formGroup: FormGroup<RegisterForm>;

  ngOnInit() {
    if (!this.formGroupDirective) {
      throw new Error('be-organism-register-form must be used within a FormGroup.');
    }
    this.formGroup = this.formGroupDirective.control;
  }
}
