import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';

@Component({
  selector: 'be-organism-offer-list',
  imports: [
    DxDataGridModule,
  ],
  templateUrl: './organism-offer-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganismOfferListComponent {
  dataSource = [
    {
      mode: 'AIR',
      movementType: 'PORT TO PORT',
      incoterms: 'DDP',
      countriesCities: 'USA',
      packageType: 'CARTONS',
      unit1: '10IN',
      unit2: '10LB',
      currency: 'USD',
    },
    {
      mode: 'LCL',
      movementType: 'DOOR TO DOOR',
      incoterms: 'DAT',
      countriesCities: 'TURKEY',
      packageType: 'BOXES',
      unit1: '5CM',
      unit2: '5KG',
      currency: 'TRY',
    },
  ];

  columns = [
    { dataField: 'mode', caption: 'Mode' },
    { dataField: 'movementType', caption: 'Movement Type' },
    { dataField: 'incoterms', caption: 'Incoterms' },
    { dataField: 'countriesCities', caption: 'Countries-Cities' },
    { dataField: 'packageType', caption: 'Package Type' },
    { dataField: 'unit1', caption: 'Unit-1' },
    { dataField: 'unit2', caption: 'Unit-2' },
    { dataField: 'currency', caption: 'Currency' },
  ];
}
