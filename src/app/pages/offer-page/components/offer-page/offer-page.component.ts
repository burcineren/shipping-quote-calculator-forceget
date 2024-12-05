import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganismOfferPageComponent } from 'src/app/components/organism-offer-page/organism-offer-page.component';

@Component({
  selector: 'be-Offer-page',
  standalone: true,
  imports: [OrganismOfferPageComponent],
  templateUrl: './Offer-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferPageComponent {}
