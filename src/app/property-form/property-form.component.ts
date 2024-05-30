import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

interface SelectedService {
  service: string;
  cost: number
}
@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {
  propertyForm: FormGroup;
  countries = [
    {
      name: 'USA',
      services: {
        currentOwner: 85,
        twoOwnerSearch: 110,
        fullSearch: 150,
        documentRetrieval: 40
      }
    },
    {
      name: 'Canada',
      services: {
        currentOwner: 80,
        twoOwnerSearch: 100,
        fullSearch: 140,
        documentRetrieval: 35
      }
    }
    // add more countries as needed
  ];
  selectedCountryServices: any = {};
  totalCost: number = 0;
  selectedServices:any;
  // selectedServices!: SelectedService;

  constructor(private fb: FormBuilder,private dataService: DataService,private router:Router) {
    this.propertyForm = this.fb.group({
      propertyAddress: this.fb.group({
        address: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      additionalInformation: this.fb.group({
        city: [''],
        parcel: [''],
        ownerName: [''],
        additionalInfo: ['']
      }),
      country: [''],
      services: this.fb.group({
        currentOwner: [false],
        twoOwnerSearch: [false],
        fullSearch: [false],
        documentRetrieval: [false],
        totalCost:[]

      })
    });
  }

  ngOnInit(): void {
    this.propertyForm.get('country')?.valueChanges.subscribe(value => {
      this.selectedCountryServices = this.countries.find(c => c.name === value)?.services || {};
    //  console.log(this.selectedCountryServices,'sele');

      this.resetServices();
    });

    this.propertyForm.get('services')?.valueChanges.subscribe(() => {
      // console.log(valueChanges);

      this.calculateTotalCost();
    });
  }

  resetServices(): void {
    this.propertyForm.get('services')?.reset({
      currentOwner: false,
      twoOwnerSearch: false,
      fullSearch: false,
      documentRetrieval: false
    });
    this.totalCost = 0;
  }
newarrayOfservice={}

  calculateTotalCost(): void {
    const services = this.propertyForm.get('services')?.value;
    // console.log(services.currentOwner,'khk');
    // this.updateSelectedServices()
    this.totalCost = 0;

    for (const service in services) {
      if (services[service]) {
        this.totalCost += this.selectedCountryServices[service];
        console.log(this.selectedCountryServices[service]);


      }
    }
  }

  onSubmit(): void {
    console.log(this.propertyForm.value);
    this.dataService.setData(this.propertyForm.value,this.totalCost,this.countries);
    this.router.navigate(['./property-info']);


  }


  updateSelectedServices(): void {
    const services = this.propertyForm.get('services')?.value;

    for (const service in services) {
      if (services[service]) {
        this.selectedServices.push({ "service": service, cost: this.selectedCountryServices[service] });
      }
    }
    console.log(this.selectedServices,'selecteedservs');

  }



}
