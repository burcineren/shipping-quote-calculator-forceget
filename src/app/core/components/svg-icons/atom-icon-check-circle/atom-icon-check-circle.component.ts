import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { AtomIconComponent } from '@beng-core/icons/atom-icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'be-atom-icon-check-circle',
  templateUrl: './atom-icon-check-circle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AtomIconComponent,
      useExisting: forwardRef(() => AtomIconCheckCircleComponent),
    },
  ],
  standalone: true,
  imports: [NgClass],
})
export class AtomIconCheckCircleComponent extends AtomIconComponent {}
