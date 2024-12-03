import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutLoaderComponent } from '@beng-core/components/layout-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutLoaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
