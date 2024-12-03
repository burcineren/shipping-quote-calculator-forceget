import { ChangeDetectionStrategy, Component, computed, forwardRef, input } from '@angular/core';
import { AtomIconComponent } from '@beng-core/icons/atom-icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'be-atom-icon-loader',
  templateUrl: './atom-icon-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AtomIconComponent,
      useExisting: forwardRef(() => AtomIconLoaderComponent),
    },
  ],
  standalone: true,
  imports: [NgClass],
})
export class AtomIconLoaderComponent extends AtomIconComponent {
  spin = input(false);

  iconLoaderClasses = computed(() => {
    if (this.spin()) {
      return `${this.computedClasses()} spin-animation`;
    }
    return this.computedClasses();
  });
}
