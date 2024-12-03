import { ChangeDetectionStrategy, Component, inject, OnInit, output } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { AtomButtonComponent } from '@beng-core/components/atom-button';
import { AtomTextboxComponent } from '@beng-core/components/atom-textbox';
import { LoginForm } from 'src/app/types/login-form';

@Component({
  selector: 'be-organism-login-form',
  standalone: true,
  templateUrl: './organism-login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, AtomTextboxComponent, AtomButtonComponent, TranslocoPipe],
})
export class OrganismLoginFormComponent implements OnInit {
  private formGroupDirective = inject(FormGroupDirective);

  onSubmit = output();

  formGroup: FormGroup<LoginForm>;

  ngOnInit() {
    if (!this.formGroupDirective) {
      throw new Error('be-organism-login-form must be used within a FormGroup.');
    }
    this.formGroup = this.formGroupDirective.control;
  }
}
