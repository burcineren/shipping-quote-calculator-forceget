import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganismOfferListComponent } from 'src/app/components/organism-offer-list/organism-offer-list.component';

@Component({
  selector: 'be-offer-list',
  imports: [
    OrganismOfferListComponent
  ],
  templateUrl: './offer-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferListComponent {
  
}
