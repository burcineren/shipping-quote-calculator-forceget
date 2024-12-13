import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { OfferService } from '@beng-core/services/offer.service';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'be-organism-offer-list',
  imports: [
    CommonModule,
    NzDividerModule,
    NzTableModule,
    NzPaginationModule
  ],
  templateUrl: './organism-offer-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganismOfferListComponent {
  displayedColumns: string[] = [
    'mode',
    'movementType',
    'incoterms',
    'countriesCities',
    'packageType',
    'unit1',
    'unit2',
    'currency',
  ];
  dataSet: any[] = [];

  constructor(private offerService: OfferService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchOffers();
  }

  fetchOffers(): void {
    this.offerService.getOffers().subscribe(
      (offers) => {
        this.dataSet = offers.map((offer) => {
          const carton = { width: 12, length: 12, height: 12 };
          const box = { width: 24, length: 16, height: 12 };
          const pallet = { width: 40, length: 48, height: 60 };

          let boxCount: number | null = null;
          let palletCount: number | null = null;

          if (offer.packageType === "Cartons") {
            boxCount = Math.floor(box.width / carton.width) *
              Math.floor(box.length / carton.length) *
              Math.floor(box.height / carton.height);
            palletCount = Math.floor(pallet.width / box.width) *
              Math.floor(pallet.length / box.length) *
              Math.floor(pallet.height / box.height);
          } else if (offer.packageType === "Boxes") {
            palletCount = Math.floor(pallet.width / box.width) *
              Math.floor(pallet.length / box.length) *
              Math.floor(pallet.height / box.height);
          } else if (offer.packageType === "Pallets") {
            palletCount = 1;
          }

          return {
            ...offer,
            boxCount,
            palletCount,
          };
        });

        this.cdr.detectChanges();
      },
      (error) => {
        console.error("Error fetching offers:", error);
      }
    );
  }
}
