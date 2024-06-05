import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

interface SelectedService {
  service: string;
  cost: number;
}

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css'],
})
export class PropertyFormComponent implements OnInit {

  propertyForm: FormGroup;
  hiddenvalue = true;
  countries = [
    {
      name: 'USA',
      services: {
        currentOwner: 85,
        twoOwnerSearch: 110,
        fullSearch: 150,
        documentRetrieval: 40,
      },
      states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia']
    },
    {
      name: 'Canada',
      services: {
        currentOwner: 80,
        twoOwnerSearch: 100,
        fullSearch: 140,
        documentRetrieval: 35,
      },
      states: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan']
    },
    {
      name: 'India',
      services: {
        currentOwner: 90,
        twoOwnerSearch: 120,
        fullSearch: 160,
        documentRetrieval: 45,
      },
      states: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']
    },
    {
      name: 'Australia',
      services: {
        currentOwner: 95,
        twoOwnerSearch: 125,
        fullSearch: 155,
        documentRetrieval: 50,
      },
      states: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory']
    },
    {
      name: 'United Kingdom',
      services: {
        currentOwner: 75,
        twoOwnerSearch: 95,
        fullSearch: 130,
        documentRetrieval: 30,
      },
      states: ['England', 'Scotland', 'Wales', 'Northern Ireland']
    },
  ];

  states: string[] = [];
  selectedCountryServices: any = {};
  totalCost: number = 0;
  selectedServices: SelectedService[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.propertyForm = this.fb.group({
      propertyAddress: this.fb.group({
        address: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
        country: ['']
      }),
      additionalInformation: this.fb.group({
        city: [''],
        parcel: [''],
        ownerName: [''],
        additionalInfo: [''],
      }),
      country: [''],
      services: this.fb.group({
        currentOwner: [false],
        twoOwnerSearch: [false],
        fullSearch: [false],
        documentRetrieval: [false],
      }),
    });
  }

  ngOnInit(): void {
    this.propertyForm.get('propertyAddress.country')?.valueChanges.subscribe((value) => {
      const selectedCountry = this.countries.find((c) => c.name === value);
      this.selectedCountryServices = selectedCountry?.services || {};
      this.states = selectedCountry?.states || [];
      this.resetServices();
    });

    this.propertyForm.get('services')?.valueChanges.subscribe(() => {
      this.calculateTotalCost();
      this.updateSelectedServices();
    });
  }

  onCountryChange(event: Event): void {
        this.hiddenvalue = false;

    const country = (event.target as HTMLSelectElement).value;
    const selectedCountry = this.countries.find(c => c.name === country);
    this.states = selectedCountry ? selectedCountry.states : [];
    this.propertyForm.get('propertyAddress.state')?.reset('');

  }

  resetServices(): void {
    this.propertyForm.get('services')?.reset({
      currentOwner: false,
      twoOwnerSearch: false,
      fullSearch: false,
      documentRetrieval: false,
    });
    this.totalCost = 0;
    this.selectedServices = [];
  }

  calculateTotalCost(): void {
    const services = this.propertyForm.get('services')?.value;
    this.totalCost = 0;

    for (const service in services) {
      if (services[service]) {
        this.totalCost += this.selectedCountryServices[service];
      }
    }
  }

  updateSelectedServices(): void {
    const services = this.propertyForm.get('services')?.value;
    this.selectedServices = [];

    for (const service in services) {
      if (services[service]) {
        this.selectedServices.push({
          service,
          cost: this.selectedCountryServices[service],
        });
      }
    }

    // Log the selected services to the console
    console.log('Selected Services:', this.selectedServices);
  }
  theFormValue:any

  onSubmit(): void {
    console.log(this.propertyForm.value);
    this.theFormValue=this.propertyForm;
    console.log(this.theFormValue.value,"this.formvalue");


    this.dataService.setData(
      this.propertyForm.value,
      this.totalCost,
      this.selectedServices
    );
    this.router.navigate(['./property-info']);
  }
}
