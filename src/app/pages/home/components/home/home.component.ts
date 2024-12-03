import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'be-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
