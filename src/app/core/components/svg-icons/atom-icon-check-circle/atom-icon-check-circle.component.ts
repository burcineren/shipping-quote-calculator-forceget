import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { AtomIconComponent } from '@beng-core/icons/atom-icon';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'be-atom-icon-check-circle',
  templateUrl: './atom-icon-check-circle.component.html',
  styleUrl: './atom-icon-check-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AtomIconComponent,
      useExisting: forwardRef(() => AtomIconCheckCircleComponent),
    },
  ],
  standalone: true,
  imports: [NzIconModule],
})
export class AtomIconCheckCircleComponent extends AtomIconComponent {}
