import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AtomButtonComponent } from '@beng-core/components/atom-button';
@Component({
  selector: 'be-organism-offer-page',
  standalone: true,
  templateUrl: './organism-offer-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormGroup, NzSelectModule,NzFormModule,ReactiveFormsModule,AtomButtonComponent],

})
export class OrganismOfferPageComponent {
  formGroup: FormGroup<any>;
}
