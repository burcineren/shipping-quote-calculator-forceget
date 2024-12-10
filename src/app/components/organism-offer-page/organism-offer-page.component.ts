import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterState } from '@angular/router';
import { AtomButtonComponent } from '@beng-core/components/atom-button';
import { AtomSelectboxComponent } from '@beng-core/components/atom-selectbox/atom-selectbox.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { OfferService } from '@beng-core/services/offer.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'be-organism-offer-page',
  imports: [
    NzSelectModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AtomButtonComponent,
    RouterLink,
    AtomSelectboxComponent,
    NzInputModule,
    NzButtonModule,
    NzAutocompleteModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
  ],
  standalone:true,
  templateUrl: './organism-offer-page.component.html',
  styleUrls: ['./organism-offer-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganismOfferPageComponent {
  formGroup!: FormGroup;
  filteredCountries: string[] = [];
  countries = [
    'USA: New York',
    'USA: Los Angeles',
    'USA: Miami',
    'China: Beijing',
    'China: Shanghai',
    'Turkey: Istanbul',
    'Turkey: Izmir',
  ];

  unit1Options = ['CM', 'IN'];
  unit2Options = ['KG', 'LB'];
  packageTypes = ['Cartons', 'Boxes', 'Pallets'];
  modes = ['LCL', 'FCL', 'Air'];
  movementTypes = ['Door to Door', 'Port to Door', 'Door to Port', 'Port to Port'];
  incoterms = ['Delivered Duty Paid (DDP)', 'Delivered At Place (DAT)'];
  currencies = ['USD', 'CNY', 'TRY'];

  constructor(private fb: FormBuilder, private offerService: OfferService, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      mode: ['', Validators.required],
      movementType: ['', Validators.required],
      incoterms: ['', Validators.required],
      countriesCities: ['', Validators.required],
      packageType: ['', Validators.required],
      unit1: ['', Validators.required],
      unit2: ['', Validators.required],
      currency: ['', Validators.required],
    });

    // Ülke search filtreleme 
    this.formGroup.get('countriesCities')?.valueChanges.subscribe(value => {
      this.filteredCountries = this.filterCountries(value);
    });
  }

  filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;

      this.offerService.createOffer(formData).subscribe(
        () => {
          alert('Offer created successfully!');
          this.router.navigate(['/offer-list']); // Liste sayfasına yönlendir
        },
        error => {
          console.error('Error creating offer:', error);
          alert('Failed to create offer.');
        }
      );
    } else {
      alert('Please fill all required fields.');
    }
  }
}

