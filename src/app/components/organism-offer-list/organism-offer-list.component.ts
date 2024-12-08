import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { OfferService } from '@beng-core/services/offer.service';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'be-organism-offer-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    
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
  dataSource = new MatTableDataSource<any>();

  constructor(private offerService: OfferService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchOffers();
  }

  fetchOffers(): void {
    this.offerService.getOffers().subscribe(
      (offers) => {
        this.dataSource.data = offers;
        this.cdr.detectChanges(); 
      },
      (error) => {
        console.error('Error fetching offers:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
