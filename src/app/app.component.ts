import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutLoaderComponent } from '@beng-core/components/layout-loader';
import { NavbarComponent } from "./core/shared/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutLoaderComponent, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent { }
