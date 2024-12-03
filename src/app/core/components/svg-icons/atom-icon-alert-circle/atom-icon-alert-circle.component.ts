import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { AtomIconComponent } from '@beng-core/icons/atom-icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'be-atom-icon-alert-circle',
  templateUrl: './atom-icon-alert-circle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AtomIconComponent,
      useExisting: forwardRef(() => AtomIconAlertCircleComponent),
    },
  ],
  standalone: true,
  imports: [NgClass],
})
export class AtomIconAlertCircleComponent extends AtomIconComponent {}
