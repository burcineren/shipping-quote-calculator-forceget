import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'be-atom-selectbox',
  imports: [NzSelectModule,NzFormModule],
  templateUrl: './atom-selectbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtomSelectboxComponent {
  value = input('');
  label = input('');
}
