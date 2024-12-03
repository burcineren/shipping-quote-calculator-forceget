import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'be-atom-full-page-loader',
  standalone: true,
  templateUrl: './atom-full-page-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class AtomFullPageLoaderComponent {}
