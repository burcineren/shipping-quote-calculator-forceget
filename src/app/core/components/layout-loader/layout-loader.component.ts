import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoaderService } from '@beng-core/services/loader.service';
import { AtomFullPageLoaderComponent } from '../atom-full-page-loader/atom-full-page-loader.component';

@Component({
  selector: 'be-layout-loader',
  templateUrl: './layout-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AtomFullPageLoaderComponent],
})
export class LayoutLoaderComponent {
  loaderService = inject(LoaderService);
}
