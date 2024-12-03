import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AtomIconComponent {
  classes = input('');

  mutableClasses = signal('');

  computedClasses = computed(() => this.mutableClasses() || this.classes());
}
