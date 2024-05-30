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
  hiddenvalue=true;
  countries = [
    {
      name: 'USA',
      services: {
        currentOwner: 85,
        twoOwnerSearch: 110,
        fullSearch: 150,
        documentRetrieval: 40,
      },
    },
    {
      name: 'Canada',
      services: {
        currentOwner: 80,
        twoOwnerSearch: 100,
        fullSearch: 140,
        documentRetrieval: 35,
      },
    },
    // Add more countries as needed
  ];
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
    this.propertyForm.get('country')?.valueChanges.subscribe((value) => {
      this.selectedCountryServices =
        this.countries.find((c) => c.name === value)?.services || {};
      this.resetServices();
    });

    this.propertyForm.get('services')?.valueChanges.subscribe(() => {
      this.calculateTotalCost();
      this.updateSelectedServices();
    });
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
    this.hiddenvalue=false
  }

  onSubmit(): void {
    console.log(this.propertyForm.value);
    this.dataService.setData(
      this.propertyForm.value,
      this.totalCost,
      this.selectedServices
    );
    this.router.navigate(['./property-info']);
  }
}
