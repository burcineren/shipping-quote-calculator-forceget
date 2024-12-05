import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AtomButtonComponent } from '@beng-core/components/atom-button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'be-organism-offer-page',
  imports: [NzSelectModule,NzFormModule,ReactiveFormsModule,CommonModule,AtomButtonComponent,RouterLink],
  templateUrl: './organism-offer-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class OrganismOfferPageComponent {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      mode: ['mode'],
      movementType: ['lucy'],
      incoterms: ['lucy'],
      countrieCities: ['lucy'],
      packageType: ['lucy'],
      unit1: ['lucy'],
      unit2: ['lucy'],
      currency: ['lucy'],
    });
  }
}
