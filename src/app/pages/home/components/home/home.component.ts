import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganismOfferPageComponent } from 'src/app/components/organism-offer-page/organism-offer-page.component';

@Component({
  selector: 'be-home',
  standalone: true,
  imports: [OrganismOfferPageComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
