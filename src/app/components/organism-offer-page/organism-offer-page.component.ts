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
import { calculateCounts } from '@beng-core/utils/calculateCount.utils';
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
      unit1Type: ['', Validators.required], 
      unit2: ['', Validators.required], 
      unit2Type: ['', Validators.required], 
      currency: ['', Validators.required],
    });
  
    // Ülke filtreleme
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
      const { boxCount, palletCount } = calculateCounts(
        formData.packageType,
        formData.mode
      );
  
      if (formData.mode === "LCL" && palletCount && palletCount >= 24) {
        alert("For pallet count 24 or more, choose mode FCL.");
        return;
      }
  
      if (formData.mode === "FCL" && palletCount && palletCount > 24) {
        alert("Cannot ship more than 24 pallets with FCL.");
        return;
      }
  
      const payload = {
        ...formData,
        boxCount,
        palletCount,
      };
      console.log("payload::",payload);
      this.offerService.createOffer(payload).subscribe(
        () => {
          alert("Offer created successfully!");
          this.router.navigate(["/offer-list"]);
        },
        (error) => {
          console.error("Error creating offer:", error);
          alert("Failed to create offer.");
        }
      );
    } else {
      alert("Please fill all required fields.");
    }
  }
}

