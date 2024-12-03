import { ChangeDetectionStrategy, Component, computed, contentChild, input, output, signal } from '@angular/core';
import { AtomIconLoaderComponent } from '@beng-core/components/svg-icons/atom-icon-loader';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { AtomIconComponent } from '@beng-core/icons/atom-icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'be-atom-button',
  templateUrl: './atom-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, AtomIconLoaderComponent,NzButtonModule],
})
export class AtomButtonComponent {
  iconComponent = contentChild(AtomIconComponent);

  inlineFlex = input(true);

  type = input('button');

  classes = input('');

  disabled = input<boolean>();

  loading = input<boolean>();

  mutableClasses = signal('');

  onClick = output<MouseEvent>();

  computedClasses = computed<{ [key: string]: boolean }>(() => {
    const classes = this.mutableClasses() || this.classes();
    return {
      btn: true,
      'btn-primary': !classes,
      [classes]: !!classes,
    };
  });
}
