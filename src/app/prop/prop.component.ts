import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-prop',
  templateUrl: './prop.component.html',
  styleUrl: './prop.component.css'
})
export class PropComponent implements OnInit  {
propertyInformationForm:any;
continue() {
    // Trigger validation for property details form
    this.validateForm(this.propertyDetailsForm);

    // Trigger validation for property information form
    this.validateForm(this.propertyInformationForm);

    // Check if both forms are valid before continuing
    if (this.propertyDetailsForm.valid && this.propertyInformationForm.valid) {
      // Proceed with your logic here, e.g., navigating to the next step
      console.log('Both forms are valid. Proceeding...');
    } else {
      console.log('One or more forms are invalid. Cannot proceed.');
    }
  }
  validateForm(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }

selectedOption: string = '';
  selectedCountryServices: any = {};

totalAmount:any = 0;
selectedServices: any = {};

onSelectionChange(event: any): void {
  const selectedCountry = this.countries.find(country => country.name === event.value);
  this.selectedCountryServices = selectedCountry ? selectedCountry.services : {};
  this.totalAmount = 0;  // Reset the total amount whenever a new country is selected
  this.selectedServices = {};  // Reset selected services
}

onCheckboxChange(service: string, event: any): void {
  if (event.target.checked) {
    this.selectedServices[service] = this.selectedCountryServices[service];
  } else {
    delete this.selectedServices[service];
  }
  this.calculateTotalAmount();
}

calculateTotalAmount(): void {
  var total = 0;
  var t:any;
  for (let value of Object.values(this.selectedServices)) {
    // total += value;
    t = value;

    total=total+t

  }
  console.log(total);
  this.totalAmount = total;
}

obj={}
countries = [
  {
    name: 'India',
    services: {
      currentOwner: 85,
      twoOwnerSearch: 110,
      fullSearch: 150,
      documentRetrieval: 40
    }
  },
  {
    name: 'Dubai',
    services: {
      currentOwner: 80,
      twoOwnerSearch: 100,
      fullSearch: 140,
      documentRetrieval: 35
    }
  }]

  propertyDetailsForm: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.propertyDetailsForm = this.formBuilder.group({
      address: ['', Validators.required],
      street: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });

    this.propertyInformationForm = this.formBuilder.group({
      country: ['', Validators.required],
      parcel: ['', Validators.required],
      ownerName: ['', Validators.required],
      additionInfo: [''],
    });
  }





}
